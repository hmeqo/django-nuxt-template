import type { FormRules } from 'naive-ui'

/**
 * try to get the .$rules property from the object
 * @example
 * getRulesFromModel(classObj) | getRulesFromModel(obj)
 */
export function getRulesFromModel<T, M extends { new (): T; $rules: FormRules }>(obj: T | M): FormRules {
  if ('$rules' in (obj as Record<string, unknown>)) return (obj as { $rules: FormRules }).$rules
  const classObj = Object.getPrototypeOf(obj).constructor
  if ('$rules' in classObj) return classObj.$rules
  throw new Error('model has no rules')
}
