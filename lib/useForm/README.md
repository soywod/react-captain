# useForm (beta)

A strongly typed form composer. Available components:

  - [X] TextField
  - [ ] TextAreaField
  - [ ] DateField
  - [X] NumberField
  - [ ] Select
  - [ ] Switch

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useForm&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

## Parameters

```typescript
function useForm<T>(defaultModel?: T | null)
```

## Return

```typescript
{
  Form: FunctionComponent<FormProps>  // The form component
  submit: () => void                  // Helper to trigger manually the form
  useTextField: UseTextField          // A TextField hook component
  useNumberField: UseNumberField      // A NumberField hook component
}

type FormProps<T> = {
  className?: string
  children?: ReactNode
  onChange?: (model: T) => void
  onSubmit?: (model: T) => void
}

type UseTextField<T> = (component?: CustomTextFieldComponent) => TextFieldComponent 
type UseNumberField<T> = (component?: CustomNumberFieldComponent) => NumberFieldComponent 
```

## Usage

```typescript
import {useForm} from 'react-captain'
// or
import useForm from 'react-captain/useForm'

type User = {
  firstName: string | null
  lastName: string | null
  phone: number | null
}

const defaultUser: User = {
  firstName: null,
  lastName: null,
  phone: null,
}

export default function() {
  const {Form, ...form} = useForm(defaultUser)
  const TextField = form.useTextField()
  const NumberField = form.useNumberField()

  return (
    <Form onSubmit={user => console.log(user)}>
      <TextField name="firstName" label="First name" required />
      <TextField name="lastName" label="Last name" required  />
      <NumberField name="phone" label="Phone" required />

      <button type="submit">Submit</button>
    </Form>
  )
}
```
