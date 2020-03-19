import {useEffect, useRef} from "react"
import getOr from "lodash/fp/getOr"
import isNumber from "lodash/fp/isNumber"

import useToggle from "../toggle"
import {UseInterval} from "./interval.types"

export const useInterval: UseInterval = (fn, opts) => {
  const delay = isNumber(opts) ? opts : getOr(1000, "delay", opts)
  const autoStart = getOr(false, "autoStart", opts)
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const [isIntervalOn, toggleInterval] = useToggle(autoStart)

  useEffect(() => {
    function clearTimeoutSafe() {
      timeout.current && clearTimeout(timeout.current)
      timeout.current = null
    }

    if (isIntervalOn) {
      timeout.current = setInterval(fn, delay)
    } else {
      clearTimeoutSafe()
    }

    return () => {
      clearTimeoutSafe()
    }
  }, [delay, fn, isIntervalOn])

  return [isIntervalOn, toggleInterval]
}

export default useInterval
