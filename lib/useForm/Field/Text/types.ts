import {FieldProps, FieldComponent, PartialFieldComponent} from '../types'

export type TextFieldProps<T> = FieldProps<T, string>
export type UseTextField<T> = <U>(
  component?: FieldComponent<T, U, string> | null,
) => PartialFieldComponent<T, U, string>
