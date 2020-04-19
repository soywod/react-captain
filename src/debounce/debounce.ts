import {useCallback, useEffect, useRef, useState} from "react"
import invokeMap from "lodash/fp/invokeMap"
import isNumber from "lodash/fp/isNumber"
import noop from "lodash/fp/noop"

import {Function, UseDebounce, DebounceOpts, defaultOpts} from "./debounce.types"

export const useDebounce: UseDebounce = <T extends Function>(
  fn: T,
  overrideOpts?: number | Partial<DebounceOpts>,
) => {
  const callback = useCallback(fn, [])
  const opts = Object.assign(
    defaultOpts,
    isNumber(overrideOpts) ? {delay: overrideOpts} : overrideOpts,
  )

  const [ready, setReady] = useState(false)
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const wrapper = useRef<(...params: Parameters<T>) => void>(noop)
  const abort = useRef<() => void>(noop)
  const terminate = useRef<() => void>(noop)

  useEffect(() => {
    wrapper.current = (...params: Parameters<T>) => {
      if (opts.persist) {
        invokeMap("persist", params)
      }

      const wrapper = () => {
        callback(...params)
        timeout.current = null
      }

      abort.current = () => {
        timeout.current && clearTimeout(timeout.current)
        abort.current = noop
        terminate.current = noop
      }

      terminate.current = () => {
        if (timeout.current) {
          clearTimeout(timeout.current)
          terminate.current = noop
          abort.current = noop
          wrapper()
        }
      }

      timeout.current && clearTimeout(timeout.current)
      timeout.current = global.setTimeout(wrapper, opts.delay)
    }

    setReady(true)
  }, [ready, callback, opts.delay, opts.persist])

  return Object.assign(wrapper.current, {
    abort: () => abort.current(),
    terminate: () => terminate.current(),
  })
}

export default useDebounce
