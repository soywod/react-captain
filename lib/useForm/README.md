# useForm (beta)

A strongly typed form composer.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useForm&selectedStory=Basic&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

## Parameters

```typescript
function useForm<T>(defaultModel?: T | null)
```

## Return

```typescript
{
  Form: FunctionComponent<FormProps>                // The form component
  submit: () => void                                // Helper to trigger manually the form
  useComponent: (component?: CustomField) => Field  // A TextField hook component
}

type FormProps<T> = {
  className?: string
  children?: ReactNode
  onChange?: (model: T) => void
  onSubmit?: (model: T) => void
}
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
  const {Form, useComponent} = useForm(defaultUser)
  const TextField = useComponent(CustomTextField)
  const NumberField = useComponent(CustomNumberField)

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

See custom field examples:
  - [Basic field](https://github.com/soywod/react-captain/tree/master/storybook/src/useForm/basic).
  - [Material-UI fields](https://github.com/soywod/react-captain/tree/master/storybook/src/useForm/material-ui)
