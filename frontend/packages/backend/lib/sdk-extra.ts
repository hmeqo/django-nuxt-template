import type { FormItemRule, FormRules } from 'naive-ui'
import {
  RequestCompleteEvent,
  RequestErrorEvent,
  RequestStartEvent,
  RequestSuccessEvent,
  type ErrorResponse
} from './core'
import * as sdk from './sdk'

export type Schema = {
  properties: Record<
    string,
    {
      type: 'string' | 'number' | 'boolean' | 'all-of' | (string & {})
      isRequired?: boolean
      isReadOnly?: boolean
      isNullable?: boolean
      maxLength?: number
      minLength?: number
      minimum?: number
      maximum?: number
      description?: string
      pattern?: string
      format?: string
    }
  >
}

export const schemaToDefaults = <T>(schema: Schema, overrides?: Partial<T>): T => {
  return (Object.entries(schema.properties) as [keyof T, Schema['properties'][keyof Schema['properties']]][]).reduce(
    (acc, [k, { type, isNullable, format, isRequired }]) => {
      if (overrides && overrides[k] !== undefined) {
        acc[k] = overrides[k]
      } else if (isRequired) {
        if (isNullable) acc[k] = null as T[keyof T]
        else if (type === 'string') {
          if (format === 'date-time') acc[k] = new Date().toISOString() as T[keyof T]
          else acc[k] = '' as T[keyof T]
        } else if (type === 'number') acc[k] = 0 as T[keyof T]
        else if (type === 'boolean') acc[k] = false as T[keyof T]
        else if (type === 'all-of') acc[k] = null as T[keyof T]
        else if (type === 'array') acc[k] = [] as T[keyof T]
        else if (type === 'dictionary') acc[k] = {} as T[keyof T]
        else {
          const subSchema = sdk[`$${type}` as keyof typeof sdk] as Schema
          if (subSchema === undefined) throw new Error(`Unknown type: ${type}`)
          acc[k] = schemaToDefaults(subSchema)
        }
      }
      return acc
    },
    <T>{}
  )
}

export const schemaToNaiveRules = (schema: Schema): FormRules => {
  return Object.entries(schema.properties).reduce(
    (acc, [k, v]) => {
      const rules: FormItemRule[] = (acc[k] = [])
      if (v.isRequired === true) rules.push(naiveRulePresets.required())
      if (v.isNullable !== true) rules.push(naiveRulePresets.notNull())
      if (v.minLength !== undefined || v.maxLength !== undefined)
        rules.push(naiveRulePresets.length({ min: v.minLength, max: v.maxLength }))
      if (v.minimum !== undefined || v.maximum !== undefined)
        rules.push(naiveRulePresets.number({ min: v.minimum, max: v.maximum }))
      if (v.pattern !== undefined) rules.push(naiveRulePresets.pattern({ pattern: v.pattern }))
      return acc
    },
    <FormRules>{}
  )
}

export const withLifecycle = async <T>(
  req: () => sdk.CancelablePromise<T>,
  opts?: {
    before?: () => unknown | Promise<unknown>
    onSuccess?: ((data: T) => void | Promise<void>) | ((data: T) => T | Promise<T>)
    onError?: (e: unknown) => unknown | Promise<unknown>
    onComplete?: () => unknown | Promise<unknown>
    fireEvents?: boolean
  }
) => {
  await opts?.before?.()
  if (opts?.fireEvents) new RequestStartEvent().emit()
  try {
    let data = await req()
    data = (await opts?.onSuccess?.(data)) ?? data
    if (opts?.fireEvents) new RequestSuccessEvent(data).emit()
    return data
  } catch (e) {
    await opts?.onError?.(e)
    if (opts?.fireEvents) new RequestErrorEvent(e as ErrorResponse).emit()
    throw e
  } finally {
    await opts?.onComplete?.()
    if (opts?.fireEvents) new RequestCompleteEvent().emit()
  }
}
