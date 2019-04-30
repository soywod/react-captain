import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select, {SelectProps} from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'

import {FieldComponent} from '../../../../lib/useForm'
import {User, Civility} from '../User'

const CustomField: FieldComponent<User, Civility, SelectProps> = props => (
  <FormControl variant="outlined">
    <InputLabel>{props.label}</InputLabel>
    <Select
      {...props}
      value={props.value || ''}
      onChange={({target}) => props.onChange(target.value as Civility | null)}
      input={<OutlinedInput labelWidth={50} />}
      style={{width: 200}}
    >
      <MenuItem value="">-</MenuItem>
      <MenuItem value="Mrs">Mrs</MenuItem>
      <MenuItem value="Mr">Mr</MenuItem>
      <MenuItem value="Ms">Ms</MenuItem>
      <MenuItem value="Doctor">Doctor</MenuItem>
      <MenuItem value="Lord">Lord</MenuItem>
    </Select>
  </FormControl>
)

export default CustomField
