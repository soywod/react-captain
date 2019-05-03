import {useState} from 'react'
import isBoolean from 'lodash/fp/isBoolean'

import {ToggleState} from './types'

export default function(defaultToggleOn?: boolean): ToggleState {
  const [toggleOn, setToggle] = useState(Boolean(defaultToggleOn))

  function toggle(forceToggleOn?: any) {
    setToggle(isBoolean(forceToggleOn) ? forceToggleOn : !toggleOn)
  }

  return [toggleOn, toggle]
}
