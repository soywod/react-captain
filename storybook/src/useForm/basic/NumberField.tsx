import React, {ChangeEvent} from 'react'
import isNil from 'lodash/fp/isNil'
import isEmpty from 'lodash/fp/isEmpty'

import {FieldComponent} from '../../../../lib/useForm'
import {User} from '../User'

type HTMLFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const CustomField: FieldComponent<User, number, HTMLFieldProps> = props => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = parseValue(event.currentTarget.value)
    props.onChange(value)
  }

  function parseValue(value: any): number | null {
    if (isNil(value)) return null
    if (isEmpty(String(value))) return null

    const numberValue = Number(value)
    if (isNaN(numberValue)) return null

    return numberValue
  }

  return (
    <input
      {...props}
      type="number"
      placeholder={props.label}
      value={isNil(props.value) ? '' : props.value}
      onChange={handleChange}
    />
  )
}

export default CustomField
