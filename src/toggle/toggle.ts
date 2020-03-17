import {useState} from "react"
import isBoolean from "lodash/fp/isBoolean"

import {Toggle} from "./toggle.types"

export const useToggle: Toggle = (defaultVal?: any) => {
  const [val, setVal] = useState(defaultVal === true)

  function toggler(override?: any) {
    setVal(isBoolean(override) ? override : !val)
  }

  return [val, toggler]
}

export default useToggle
