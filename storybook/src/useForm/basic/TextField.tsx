import React from 'react'

import {FieldComponent} from '../../../../lib/useForm'
import {User} from '../User'

type HTMLFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const CustomField: FieldComponent<User, string, HTMLFieldProps> = props => (
  <input
    {...props}
    type="text"
    placeholder={props.label}
    value={props.value || ''}
    onChange={({target}) => props.onChange(target.value)}
  />
)

export default CustomField
