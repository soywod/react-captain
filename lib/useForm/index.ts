import useForm from './Form'
import hookField from './Field'
import {FieldComponent} from './types'

export default function<T>(defaultModel?: T | null) {
  const {FormContext, Form, submit} = useForm<T>(defaultModel || null)
  const useField = hookField<T>(FormContext)

  return {Form, submit, useField}
}

export {FieldComponent}
