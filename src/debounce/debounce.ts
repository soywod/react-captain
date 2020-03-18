import {useEffect, useRef, useState} from "react"
import getOr from "lodash/fp/getOr"
import invokeMap from "lodash/fp/invokeMap"
import isNumber from "lodash/fp/isNumber"
import noop from "lodash/fp/noop"

import {Function, Debounce, DebounceOpts} from "./debounce.types"

function useDebounce(options?: DebounceOpts) {
  const delay = isNumber(options) ? options : getOr(300, "delay", options)
  const persist: boolean = getOr(false, "persist", options)

  return function useDebounceInternal<T extends Function>(callback: T): Debounce<T> {
    const [ready, setReady] = useState(false)
    const timeout = useRef<NodeJS.Timeout | null>(null)
    const wrapper = useRef<(...params: Parameters<T>) => void>(noop)
    const abort = useRef<() => void>(noop)
    const terminate = useRef<() => void>(noop)

    useEffect(() => {
      wrapper.current = (...params: Parameters<T>) => {
        const wrapper = () => {
          callback(...params)
          timeout.current = null
        }

        if (persist) {
          invokeMap("persist", params)
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
        timeout.current = setTimeout(wrapper, delay)
      }

      setReady(true)
    }, [callback, ready])

    return Object.assign(wrapper.current, {
      abort: () => abort.current(),
      terminate: () => terminate.current(),
    })
  }
}

export default useDebounce
