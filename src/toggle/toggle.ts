import {useState} from "react"
import isBoolean from "lodash/fp/isBoolean"

import {Toggle} from "./toggle.types"

export const useToggle: Toggle = (defaultValue?: any) => {
  const [value, setValue] = useState(defaultValue === true)

  function toggler(override?: any) {
    setValue(isBoolean(override) ? override : !value)
  }

  return [value, toggler]
}

export default useToggle
