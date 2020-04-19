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

  const timeout = useRef<NodeJS.Timeout | null>(null)
  const [isIntervalOn, toggleInterval] = useToggle(opts.autoStart)

  useEffect(() => {
    function clearTimeoutSafe() {
      timeout.current && clearTimeout(timeout.current)
      timeout.current = null
    }

    if (isIntervalOn) {
      timeout.current = global.setInterval(callback, opts.delay)
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
