import {ReactNode} from 'react'

type DefaultModel<T> = T | null
type SetModelPart<T> = <U>(key: keyof T, value: U) => void

export type FormContext<T> = [DefaultModel<T>, SetModelPart<T>]
export type FormProps<T> = {
  className?: string
  children?: ReactNode
  onChange?: (model: T) => void
  onSubmit?: (model: T) => void
}
