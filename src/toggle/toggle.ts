import {useState} from "react"
import isBoolean from "lodash/fp/isBoolean"

import {UseToggle} from "./toggle.types"

export const useToggle: UseToggle = defaultVal => {
  const [val, setVal] = useState(defaultVal === true)

  function toggler(override?: any) {
    setVal(isBoolean(override) ? override : !val)
  }

  return [val, toggler]
}

export default useToggle
