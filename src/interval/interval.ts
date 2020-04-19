import {useCallback, useEffect, useRef} from "react"
import isNumber from "lodash/fp/isNumber"

import useToggle from "../toggle"
import {UseInterval, defaultOpts} from "./interval.types"

export const useInterval: UseInterval = (fn, overrideOpts) => {
  const callback = useCallback(fn, [])
  const opts = Object.assign(
    defaultOpts,
    isNumber(overrideOpts) ? {delay: overrideOpts} : overrideOpts,
  )

  const timeout = useRef(0)
  const [isIntervalOn, toggleInterval] = useToggle(opts.autoStart)

  useEffect(() => {
    function clearTimeoutSafe() {
      clearTimeout(timeout.current)
      timeout.current = 0
    }

    if (isIntervalOn) {
      timeout.current = window.setInterval(callback, opts.delay)
    } else {
      clearTimeoutSafe()
    }

    return () => {
      clearTimeoutSafe()
    }
  }, [callback, isIntervalOn, opts.delay])

  return [isIntervalOn, toggleInterval]
}

export default useInterval
