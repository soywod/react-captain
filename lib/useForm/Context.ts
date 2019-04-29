export type ModelValue = string | null | undefined

type DefaultModel<T> = T | null
type SetModelPart<T> = (key: keyof T, value: ModelValue) => void | boolean
type FormContext<T> = [DefaultModel<T>, SetModelPart<T>]
export default FormContext
