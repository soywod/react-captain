import useForm from './Form'

import hookField from './Field'
import DefaultTextField from './Field/Text'
import DefaultNumberField from './Field/Number'

import {TextFieldProps} from './Field/Text/types'
import {NumberFieldProps} from './Field/Number/types'

export default function<T>(defaultModel?: T | null) {
  const {FormContext, Form, submit} = useForm<T>(defaultModel || null)

  const useTextField = hookField<T, string>(FormContext, DefaultTextField)
  const useNumberField = hookField<T, number>(FormContext, DefaultNumberField)

  return {
    Form,
    submit,
    useTextField,
    useNumberField,
  }
}

export {TextFieldProps, NumberFieldProps}
