import {FunctionComponent} from 'react'

// ------------------------------------------------------ # Common Field props #

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type HTMLFieldProps = Omit<HTMLInputElement, 'name' | 'value' | 'onChange'>
type FieldCommonProps<T> = Partial<HTMLFieldProps> & {
  name: string & keyof T
  label: string
}

// ---------------------------------------------------- # Optional Field props #

type FieldOptionalProps<V> = {
  value: V | null
  onChange: (value: V | null) => void
}

// ----------------------------------------------------- # Partial Field props #

export type PartialFieldProps<T, U, V> = U &
  FieldCommonProps<T> &
  Partial<FieldOptionalProps<V>>

export type PartialFieldComponent<T, U, V> = FunctionComponent<
  PartialFieldProps<T, U, V>
>

// ------------------------------------------------------------- # Field props #

export type FieldProps<T, V> = FieldCommonProps<T> & FieldOptionalProps<V>
export type FieldComponent<T, U, V> = FunctionComponent<FieldProps<T, V> & U>

// ------------------------------------------------------------------ # Render #

export type DefaultFieldComponent<V> = <T, U>(
  props: FieldProps<T, V> & U,
) => JSX.Element

// -------------------------------------------------------------------- # Hook #

export type UseField<T, V> = <U>(
  component?: FieldComponent<T, U, V> | null,
) => PartialFieldComponent<T, U, V>
