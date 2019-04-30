import React, {useEffect, useState} from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import useForm, {TextFieldProps, NumberFieldProps} from '../../lib/useForm'

type User = {
  firstName: string
  lastName: string
  phone?: number
}

const defaultUser: User = {firstName: '', lastName: ''}

storiesOf('useForm', module).add('Default', () => {
  function Demo() {
    const {Form, ...form} = useForm(defaultUser)
    const TextField = form.useTextField()
    const NumberField = form.useNumberField()

    return (
      <Form onSubmit={action('Submit')} onChange={action('Change')}>
        <TextField name="firstName" label="First name" required value="" />
        <TextField name="lastName" label="Last name" required />
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
    const {Form, ...form} = useForm(user)
    const TextField = form.useTextField()
    const NumberField = form.useNumberField()

    function fetchUser() {
      setUser({
        firstName: 'Paul',
        lastName: 'DURANT',
      })
    }

    useEffect(() => {
      const timeout = setTimeout(() => fetchUser(), 1000)
      return () => clearTimeout(timeout)
    }, [])

    return (
      <Form onSubmit={action('Submit')} onChange={action('Change')}>
        <TextField name="firstName" label="First name" required />
        <TextField name="lastName" label="Last name" required />
        <NumberField name="phone" label="Phone" required />
        <button type="submit">Submit</button>
      </Form>
    )
  }

  return <Demo />
})

type CustomTextFieldProps = TextFieldProps<User> & {border?: string}
type CustomNumberFieldProps = NumberFieldProps<User> & {border?: string}

storiesOf('useForm', module).add('Custom inputs', () => {
  function CustomTextField(props: CustomTextFieldProps) {
    const style = {
      display: 'block',
      margin: '16px 0',
      border: `2px solid ${props.border || 'grey'}`,
    }

    return (
      <input
        name={props.name}
        placeholder={props.label}
        onChange={({currentTarget}) => props.onChange(currentTarget.value)}
        style={style}
      />
    )
  }

  function CustomNumberField(props: CustomNumberFieldProps) {
    const style = {
      display: 'block',
      margin: '16px 0',
      border: `2px solid ${props.border || 'grey'}`,
    }

    return (
      <input
        name={props.name}
        placeholder={props.label}
        onChange={({currentTarget}) =>
          props.onChange(Number(currentTarget.value))
        }
        style={style}
      />
    )
  }

  function Demo() {
    const {Form, ...form} = useForm(defaultUser)
    const TextField = form.useTextField(CustomTextField)
    const NumberField = form.useNumberField(CustomNumberField)

    return (
      <Form onSubmit={action('Submit')} onChange={action('Change')}>
        <TextField name="firstName" label="First name" required />
        <TextField name="lastName" label="Last name" required border="blue" />
        <NumberField name="phone" label="Phone" required border="green" />
        <button type="submit">Submit</button>
      </Form>
    )
  }

  return <Demo />
})
