import React from 'react'
import TextField, {TextFieldProps} from '@material-ui/core/TextField'

import {FieldComponent} from '../../../../lib/useForm'
import {User} from '../User'

const CustomField: FieldComponent<User, string, TextFieldProps> = props => (
  <TextField
    {...props}
    variant="outlined"
    margin="normal"
    value={props.value || ''}
    onChange={({target}) => props.onChange(target.value)}
    style={{display: 'block'}}
  />
)

export default CustomField
