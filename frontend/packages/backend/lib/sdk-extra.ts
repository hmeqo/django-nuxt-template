import type { FormItemRule, FormRules } from 'naive-ui'
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
    }
  >
}

export const schemaToDefaults = <T>(schema: Schema, overrides?: Partial<T>): T => {
  return (Object.entries(schema.properties) as [keyof T, { type: string; isNullable?: boolean }][]).reduce(
    (acc, [k, { type, isNullable }]) => {
      if (overrides && overrides[k] !== undefined) {
        acc[k] = overrides[k]
      } else {
        if (isNullable) acc[k] = null as T[keyof T]
        else if (type === 'string') acc[k] = '' as T[keyof T]
        else if (type === 'number') acc[k] = 0 as T[keyof T]
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
