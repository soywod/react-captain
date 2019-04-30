import {ReactNode, FunctionComponent} from 'react'

type DefaultModel<T> = T | null
type SetModelPart<T> = <U>(key: keyof T, value: U) => void

export type FormContext<T> = [DefaultModel<T>, SetModelPart<T>]
export type FormProps<T> = {
  className?: string
  children?: ReactNode
  onChange?: (model: T) => void
  onSubmit?: (model: T) => void
}

// ------------------------------------------------------ # Common Field props #

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type OmitConflict<U> = Partial<Omit<U, 'name' | 'value' | 'onChange'>>

type FieldCommonProps<T> = {
  name: string & keyof T
  label: string
}

// ---------------------------------------------------- # Optional Field props #

type FieldOptionalProps<V> = {
  value: V | null
  onChange: (value: V | null) => void
}

// ----------------------------------------------------- # Partial Field props #

export type PartialFieldProps<T, V, U = {}> = OmitConflict<U> &
  FieldCommonProps<T> &
  Partial<FieldOptionalProps<V>>

export type PartialFieldComponent<T, V, U = {}> = FunctionComponent<
  PartialFieldProps<T, V, OmitConflict<U>>
>

// ------------------------------------------------------------- # Field props #

export type FieldProps<T, V, U = {}> = OmitConflict<U> &
  FieldCommonProps<T> &
  FieldOptionalProps<V>

export type FieldComponent<T, V, U = {}> = FunctionComponent<
  FieldProps<T, V, OmitConflict<U>>
>
