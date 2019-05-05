import {useState} from 'react'
import isBoolean from 'lodash/fp/isBoolean'

import {ToggleState} from './types'

function useToggle(defaultToggleOn?: boolean): ToggleState {
  const [toggleOn, setToggle] = useState(Boolean(defaultToggleOn))

  function toggle(forceToggleOn?: any) {
    setToggle(isBoolean(forceToggleOn) ? forceToggleOn : !toggleOn)
  }

  return [toggleOn, toggle]
}

export default useToggle
