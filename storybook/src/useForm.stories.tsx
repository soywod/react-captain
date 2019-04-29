import React, {useEffect, useState} from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import useForm, {TextFieldProps} from '../../lib/useForm'

type User = {
  firstName: string
  lastName: string
  email: string
}

const defaultUser: User = {firstName: '', lastName: '', email: ''}

storiesOf('useForm', module).add('Default', () => {
  function Demo() {
    const {Form, ...form} = useForm(defaultUser)
    const TextField = form.useTextField()

    return (
      <Form onSubmit={action('Submit')} onChange={action('Change')}>
        <TextField name="firstName" label="First name" required />
        <TextField name="lastName" label="Last name" required />
        <TextField name="email" label="Email" type="email" required />
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

    function fetchUser() {
      setUser({
        firstName: 'Paul',
        lastName: 'DURANT',
        email: 'paul.durant@mail.test',
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
        <TextField name="email" label="Email" type="email" required />
        <button type="submit">Submit</button>
      </Form>
    )
  }

  return <Demo />
})

type CustomTextFieldProps = TextFieldProps<User> & {border?: string}
storiesOf('useForm', module).add('Custom text field', () => {
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

  function Demo() {
    const {Form, ...form} = useForm(defaultUser)
    const TextField = form.useTextField(CustomTextField)

    return (
      <Form onSubmit={action('Submit')} onChange={action('Change')}>
        <TextField name="firstName" label="First name" border="green" />
        <TextField name="lastName" label="Last name" border="blue" />
        <TextField name="email" label="Email" type="email" />
        <button type="submit">Submit</button>
      </Form>
    )
  }

  return <Demo />
})
