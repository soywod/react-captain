import {useEffect, useRef, useState} from "react"
import invokeMap from "lodash/fp/invokeMap"
import isNumber from "lodash/fp/isNumber"
import noop from "lodash/fp/noop"

import {Function, UseDebounce, defaultOpts} from "./debounce.types"

export const useDebounce: UseDebounce = overrideOpts => {
  const opts = Object.assign(
    defaultOpts,
    isNumber(overrideOpts) ? {delay: overrideOpts} : overrideOpts,
  )

  return function useDebounceInternal<T extends Function>(fn: T) {
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
          fn(...params)
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
        timeout.current = setTimeout(wrapper, opts.delay)
      }

      setReady(true)
    }, [fn, ready])

    return Object.assign(wrapper.current, {
      abort: () => abort.current(),
      terminate: () => terminate.current(),
    })
  }
}

export default useDebounce
