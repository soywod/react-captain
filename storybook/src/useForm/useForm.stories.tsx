import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import useForm from '../../../lib/useForm'
import {User, defaultUser} from './User'
import CustomTextField from './basic/TextField'
import CustomNumberField from './basic/NumberField'
import MUISelect from './material-ui/Select'
import MUITextField from './material-ui/TextField'
import MUISwitch from './material-ui/Switch'

storiesOf('useForm', module).add('Basic', () => {
  function Demo() {
    const {Form, useField} = useForm(defaultUser)
    const TextField = useField(CustomTextField)
    const NumberField = useField(CustomNumberField)

    return (
      <Form onSubmit={action('Submit')} onChange={action('Change')}>
        <TextField name="fullName" label="Full name" required />
        <NumberField name="phone" label="Phone" required />
        <button type="submit">Submit</button>
      </Form>
    )
  }

  return <Demo />
})

storiesOf('useForm', module).add('Async model', () => {
  function Demo() {
    const [user, setUser] = useState<User | null>(null)
    const {Form, useField} = useForm(user)
    const TextField = useField(CustomTextField)
    const NumberField = useField(CustomNumberField)

    function fetchUser() {
      setUser({
        civility: 'Lord',
        fullName: 'Paul X',
        phone: 1234567890,
        isMarried: false,
      })
    }

    useEffect(() => {
      const timeout = setTimeout(() => fetchUser(), 1000)
      return () => clearTimeout(timeout)
    }, [])

    return (
      <Form onSubmit={action('Submit')} onChange={action('Change')}>
        <TextField name="fullName" label="Full name" required />
        <NumberField name="phone" label="Phone" required />
        <button type="submit">Submit</button>
      </Form>
    )
  }

  return <Demo />
})

storiesOf('useForm', module).add('Material-UI', () => {
  function Demo() {
    const {Form, useField} = useForm(defaultUser)
    const Select = useField(MUISelect)
    const TextField = useField(MUITextField)
    const Switch = useField(MUISwitch)

    return (
      <Form onSubmit={action('Submit')} onChange={action('Change')}>
        <Select name="civility" label="Civility" required />
        <TextField name="fullName" label="Full name" required />
        <TextField name="phone" label="Phone" required type="number" />
        <Switch name="isMarried" label="Married?" />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Form>
    )
  }

  return <Demo />
})
