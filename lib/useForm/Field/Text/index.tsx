import React, {ChangeEvent} from 'react'
import isNil from 'lodash/fp/isNil'
import isEmpty from 'lodash/fp/isEmpty'

import {UseTextField} from './types'
import {FieldProps} from '../types'

export default function<T, U>(props: FieldProps<T, string> & U) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = parseValue(event.currentTarget.value)
    props.onChange(value)
  }

  function parseValue(rawValue: any): string | null {
    if (isNil(rawValue)) return null

    const stringValue = String(rawValue)
    if (isEmpty(stringValue.trim())) return null

    return stringValue
  }

  return (
    <input
      {...props}
      type="text"
      name={props.name}
      placeholder={props.label}
      value={props.value || ''}
      onChange={handleChange}
    />
  )
}

export {UseTextField}
