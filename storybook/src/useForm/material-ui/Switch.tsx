import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch, {SwitchProps} from '@material-ui/core/Switch'

import {FieldComponent} from '../../../../lib/useForm'
import {User} from '../User'

const CustomField: FieldComponent<User, boolean, SwitchProps> = props => (
  <FormGroup>
    <FormControlLabel
      label={props.label}
      control={
        <Switch
          checked={Boolean(props.value)}
          onChange={({target}) => props.onChange(target.checked)}
          name={props.name}
        />
      }
    />
  </FormGroup>
)

export default CustomField
