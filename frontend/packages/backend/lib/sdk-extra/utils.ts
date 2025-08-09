import type { FormItemRule, FormRules } from 'naive-ui'
import * as sdk from '../sdk'

export type SchemaValue = {
  type?: 'string' | 'number' | 'boolean' | 'all-of' | (string & {})
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
  contains?: unknown
}

export type Schema = {
  type?: string
  properties: Record<string, SchemaValue>
}

export const schemaToDefaults = <T>(
  schema: Schema,
  overrides?: Partial<T>,
  opts?: { type?: string; forceRequired?: boolean }
): T => {
  if (schema.type && opts?.type) {
    return Object.values(sdk[opts?.type as keyof typeof sdk])[0]
  }
  const override = (acc: T, k: keyof T) => {
    if (overrides && k in overrides) {
      acc[k] = overrides[k] as T[keyof T]
      return true
    }
    return false
  }
  return (Object.entries(schema.properties) as [keyof T, Schema['properties'][keyof Schema['properties']]][]).reduce(
    (acc, [k, { type, isNullable, format, isRequired }]) => {
      if (override(acc, k)) return acc

      if (!type) return acc
      if (!(opts?.forceRequired || isRequired)) return acc
      if (isNullable) {
        acc[k] = null as T[keyof T]
        return acc
      }
      switch (type) {
        case 'string':
          if (format === 'date-time') acc[k] = new Date().toISOString() as T[keyof T]
          else acc[k] = '' as T[keyof T]
          break
        case 'number':
          acc[k] = 0 as T[keyof T]
          break
        case 'boolean':
          acc[k] = false as T[keyof T]
          break
        case 'all-of':
          acc[k] = null as T[keyof T]
          break
        case 'array':
          acc[k] = [] as T[keyof T]
          break
        case 'dictionary':
          acc[k] = {} as T[keyof T]
          break
        default: {
          const subSchema = sdk[`$${type}` as keyof typeof sdk] as Schema
          if (subSchema === undefined) throw new Error(`Unknown type: ${type}`)
          acc[k] = schemaToDefaults(subSchema, {
            type,
            overrides: overrides?.[k],
            forceRequired: opts?.forceRequired
          }) as T[keyof T]
          break
        }
      }
      return acc
    },
    <T>{}
  )
}
