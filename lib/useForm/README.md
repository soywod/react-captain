# useForm (beta)

A strongly typed form composer. Available components:

  - [X] TextField
  - [ ] TextAreaField
  - [ ] DateField
  - [ ] NumberField
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
  useTextField: UseTextField<T>       // A TextField hook component
}

// --------------------------------------------------------------- # FormProps #

type FormProps<T> = {
  className?: string
  children?: ReactNode
  onChange?: (model: T) => void
  onSubmit?: (model: T) => void
}

// ------------------------------------------------------------ # UseTextField #

type UseTextField<T> = <U>(
  component?: TextFieldComponent<T, U> | null,
) => PartialTextFieldComponent<T, U>

type TextFieldComponent<T, U> = FunctionComponent<TextFieldProps<T> & U>
type TextFieldProps<T> = {
  name: string & keyof T
  label: string
  value: string | null | undefined
  onChange: (value: string | null) => void
}

type PartialTextFieldComponent<T, U> = FunctionComponent<PartialTextFieldProps<T> & U>
type PartialTextFieldProps<T> = {
  name: string & keyof T
  label: string
  value?: string | null | undefined
  onChange?: (value: string | null) => void
}
```

## Usage

```typescript
import {useForm} from 'react-captain'
// or
import useForm from 'react-captain/useForm'

type User = {
  firstName: string
  lastName: string
  email: string
}

const defaultUser: User = {
  firstName: '',
  lastName: '',
  email: '',
}

export default function() {
  const {Form, useTextField} = useForm(defaultUser)
  const TextField = useTextField()

  return (
    <Form onSubmit={user => console.log(user)}>
      <TextField name="firstName" label="First name" required />
      <TextField name="lastName" label="Last name" required  />
      <TextField name="email" label="Email" required fullWidth />

      <button type="submit">Submit</button>
    </Form>
  )
}
```
