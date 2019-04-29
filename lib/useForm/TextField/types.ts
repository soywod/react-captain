import {FunctionComponent} from 'react'

// -------------------------------------------------- # Common TextField props #

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type HTMLTextFieldProps = Omit<HTMLInputElement, 'name' | 'value' | 'onChange'>
type TextFieldCommonProps<T> = Partial<HTMLTextFieldProps> & {
  name: string & keyof T
  label: string
}

// ------------------------------------------------ # Optional TextField props #

export type TextFieldValue = string | null
type TextFieldOptionalProps = {
  value: TextFieldValue
  onChange: (value: TextFieldValue) => void
}

// ------------------------------------------------- # Partial TextField props #

export type PartialTextFieldProps<T, U> = U &
  TextFieldCommonProps<T> &
  Partial<TextFieldOptionalProps>

type PartialTextFieldComponent<T, U> = FunctionComponent<
  PartialTextFieldProps<T, U>
>

// --------------------------------------------------------- # TextField props #

export type TextFieldProps<T> = TextFieldCommonProps<T> & TextFieldOptionalProps
export type TextFieldComponent<T, U> = FunctionComponent<TextFieldProps<T> & U>

// -------------------------------------------------------------------- # Hook #

export type UseTextField<T> = <U>(
  component?: TextFieldComponent<T, U> | null,
) => PartialTextFieldComponent<T, U>
