import React, {useContext, useState} from 'react'
import getOr from 'lodash/fp/getOr'
import isEmpty from 'lodash/fp/isEmpty'
import isNil from 'lodash/fp/isNil'
import noop from 'lodash/fp/noop'

import useDebounce from '../../lib/useDebounce'
import {
  FieldComponent,
  FieldProps,
  FormContext,
  PartialFieldProps,
} from './types'

export default function<T>(context: React.Context<FormContext<T>>) {
  return function<V, U = {}>(Field: FieldComponent<T, V, U>) {
    return (props: PartialFieldProps<T, V, U>) => {
      const {name, label} = props
      const debounce = useDebounce({persist: true})
      const handleChangeParent = debounce(props.onChange || noop)

      const [defaultModel, setModelPart] = useContext(context)
      const defaultValue: V | null = getOr(null, name, defaultModel)
      const [value, setValue] = useState(defaultValue)

      function handleChange(value: V | null | undefined) {
        const nextValue = parseValue(value)
        setValue(nextValue)

        if (!isNil(defaultModel)) {
          setModelPart(name, nextValue)
          handleChangeParent(nextValue)
        }
      }

      function parseValue(value: V | null | undefined) {
        if (isNil(value)) return null
        if (isEmpty(String(value).trim())) return null
        return value
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
