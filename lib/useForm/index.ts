import useForm from './Form'

import hookComponent from './Component'

import {FieldProps, FieldComponent, PartialFieldProps} from './types'

export default function<T>(defaultModel?: T | null) {
  const {FormContext, Form, submit} = useForm<T>(defaultModel || null)
  const useComponent = hookComponent<T>(FormContext)

  return {Form, submit, useComponent}
}

export {FieldProps, FieldComponent, PartialFieldProps}
