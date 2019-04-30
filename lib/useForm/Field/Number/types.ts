import {FieldProps, FieldComponent, PartialFieldComponent} from '../types'

export type NumberFieldProps<T> = FieldProps<T, number>
export type UseNumberField<T> = <U>(
  component?: FieldComponent<T, U, number> | null,
) => PartialFieldComponent<T, U, number>
