import React, {ChangeEvent} from 'react'
import isEmpty from 'lodash/fp/isEmpty'
import isNaN from 'lodash/fp/isNaN'
import isNil from 'lodash/fp/isNil'

import {UseNumberField} from './types'
import {FieldProps} from '../types'

export default function<T, U>(props: FieldProps<T, number> & U) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = parseValue(event.currentTarget.value)
    props.onChange(value)
  }

  function parseValue(rawValue: any): number | null {
    if (isNil(rawValue)) return null
    if (isEmpty(String(rawValue))) return null

    const numberValue = Number(rawValue)
    if (isNaN(numberValue)) return null

    return Number(rawValue)
  }

  return (
    <input
      {...props}
      type="number"
      name={props.name}
      placeholder={props.label}
      value={isNil(props.value) ? '' : props.value}
      onChange={handleChange}
    />
  )
}

export {UseNumberField}
