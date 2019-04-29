import useForm, {FormComponent} from './Form'
import hookTextField, {TextFieldProps, UseTextField} from './TextField'

export type FormComponents<T> = {
  Form: FormComponent<T>
  submit: () => void

  useTextField: UseTextField<T>
}

export default function<T>(defaultModel?: T | null) {
  const {FormContext, Form, submit} = useForm<T>(defaultModel || null)
  const useTextField = hookTextField(FormContext)

  return {
    Form,
    submit,
    useTextField,
  }
}

export {TextFieldProps}
