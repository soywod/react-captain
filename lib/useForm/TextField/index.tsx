import React, {useContext, useState} from 'react'
import getOr from 'lodash/fp/getOr'
import isNil from 'lodash/fp/isNil'
import isEmpty from 'lodash/fp/isEmpty'
import noop from 'lodash/fp/noop'

import useDebounce from '../../../lib/useDebounce'
import FormContext from '../Context'
import {
  TextFieldProps,
  TextFieldComponent,
  PartialTextFieldProps,
  TextFieldValue,
  UseTextField,
} from './types'

export default function<T>(context: React.Context<FormContext<T>>) {
  return function<U>(TextField?: TextFieldComponent<T, U> | null) {
    return (props: PartialTextFieldProps<T, U>) => {
      const debounce = useDebounce({persist: true})
      const {name: key, label} = props
      const handleChangeParent = debounce(props.onChange || noop)

      const [defaultModel, setModelPart] = useContext(context)
      const defaultValue: TextFieldValue = getOr(null, key, defaultModel)
      /* const overrideValue = props.value */

      const [value, setValue] = useState(defaultValue)

      function parseValue(value: TextFieldValue | undefined): TextFieldValue {
        if (isNil(value)) return null
        if (isEmpty(value.trim())) return null
        return value
      }

      function setRawValue(rawValue: TextFieldValue | undefined) {
        const nextValue = parseValue(rawValue)
        setValue(nextValue)

        if (!isNil(defaultModel)) {
          setModelPart(key, nextValue)
          handleChangeParent(nextValue)
        }
      }

      function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        return setRawValue(event.currentTarget.value)
      }

      /* useEffect(() => { */
      /*   if (!isNil(overrideValue)) { */
      /*     setRawValue(overrideValue) */
      /*   } */
      /* }, [overrideValue]) */

      if (TextField) {
        return (
          <TextField
            disabled={isNil(defaultModel)}
            {...props}
            onChange={setRawValue}
            name={key}
            value={value}
            label={label}
          />
        )
      }

      return (
        <input
          disabled={isNil(defaultModel)}
          {...props}
          onChange={handleChange}
          value={isNil(value) ? '' : value}
          name={key}
          placeholder={label}
        />
      )
    }
  }
}

export {TextFieldProps, UseTextField}
