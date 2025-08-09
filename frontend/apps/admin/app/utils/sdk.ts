import type { FormItemRule, FormRules } from 'naive-ui'

export const schemaToNaiveRules = (schema: Schema): FormRules => {
  return Object.entries(schema.properties).reduce(
    (acc, [k, v]) => {
      const rules: FormItemRule[] = (acc[k] = [])
      if (v.isRequired === true) rules.push(naiveRulePresets.notUndefined())
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
