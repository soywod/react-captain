import React, {useContext, useState} from 'react'
import getOr from 'lodash/fp/getOr'
import isNil from 'lodash/fp/isNil'
import noop from 'lodash/fp/noop'

import useDebounce from '../../../lib/useDebounce'
import {FormContext} from '../types'
import {
  FieldProps,
  FieldComponent,
  PartialFieldProps,
  DefaultFieldComponent,
} from './types'

export default function<T, V>(
  context: React.Context<FormContext<T>>,
  DefaultField: DefaultFieldComponent<V>,
) {
  return function<U>(CustomField?: FieldComponent<T, U, V> | null) {
    return (props: PartialFieldProps<T, U, V>) => {
      const debounce = useDebounce({persist: true})
      const {name, label} = props
      const handleChangeParent = debounce(props.onChange || noop)
      const Field = CustomField || DefaultField

      const [defaultModel, setModelPart] = useContext(context)
      const defaultValue: V | null = getOr(null, name, defaultModel)
      const [value, setValue] = useState(defaultValue)

      function handleChange(nextValue: V | null) {
        setValue(nextValue)

        if (!isNil(defaultModel)) {
          setModelPart(name, nextValue)
          handleChangeParent(nextValue)
        }
      }

      return (
        <Field
          disabled={isNil(defaultModel)}
          {...props}
          name={name}
          label={label}
          value={value}
          onChange={handleChange}
        />
      )
    }
  }
}

export {FieldProps}
