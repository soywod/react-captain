import {useCallback, useEffect, useRef, useState} from "react"
import {v4 as uuid} from "uuid"
import invokeMap from "lodash/fp/invokeMap"
import isNumber from "lodash/fp/isNumber"
import noop from "lodash/fp/noop"

import {Function, UseTimeout, TimeoutOpts, TimeoutsMap, defaultOpts} from "./timeout.types"

const useTimeout: UseTimeout = <T extends Function>(
  fn: T,
  overrideOpts?: number | Partial<TimeoutOpts>,
) => {
  const callback = useCallback(fn, [])
  const opts = Object.assign(
    defaultOpts,
    isNumber(overrideOpts) ? {delay: overrideOpts} : overrideOpts,
  )

  const [ready, setReady] = useState(false)
  const timeouts = useRef<TimeoutsMap>(new Map())
  const wrapper = useRef<(...params: Parameters<T>) => void>(noop)
  const abort = useRef<() => void>(noop)
  const terminate = useRef<() => void>(noop)

  useEffect(() => {
    wrapper.current = (...params: Parameters<T>) => {
      if (opts.persist) {
        invokeMap("persist", params)
      }

      const id = uuid()

      const wrapper = () => {
        callback(...params)
        timeouts.current.delete(id)
      }

      abort.current = () => {
        timeouts.current.forEach(([t]) => t && clearTimeout(t))
        timeouts.current.clear()
        abort.current = noop
        terminate.current = noop
      }

      terminate.current = () => {
        timeouts.current.forEach(([t, wrapper]) => {
          if (t) {
            clearTimeout(t)
            terminate.current = noop
            abort.current = noop
            wrapper()
          }
        })

        timeouts.current.clear()
        abort.current = noop
        terminate.current = noop
      }

      timeouts.current.set(id, [setTimeout(wrapper, opts.delay), wrapper])
    }

    setReady(true)
  }, [ready, callback, opts.delay, opts.persist])

  return Object.assign(wrapper.current, {
    abort: () => abort.current(),
    terminate: () => terminate.current(),
  })
}

export default useTimeout
