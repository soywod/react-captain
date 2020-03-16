import {useState} from "react"
import isBoolean from "lodash/fp/isBoolean"

import {UseToggle} from "./toggle.types"

export const useToggle: UseToggle = (defaultValue?: any) => {
  const [value, setValue] = useState(defaultValue === true)

  function toggler(override?: any) {
    setValue(isBoolean(override) ? override : !value)
  }

  return [value, toggler]
}

export default useToggle
