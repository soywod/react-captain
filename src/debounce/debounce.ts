import {useEffect, useRef, useState} from "react"
import getOr from "lodash/fp/getOr"
import invokeMap from "lodash/fp/invokeMap"
import isNumber from "lodash/fp/isNumber"
import noop from "lodash/fp/noop"

import {
  Callable,
  Debounce,
  DebounceOptions,
  DebounceOptionsCancelable,
  DebounceOptionsNonCancelable,
} from "./debounce.types"

function useDebounce(
  options: DebounceOptionsCancelable,
): <T extends Callable>(callback: T) => [Debounce<T>, () => void]

function useDebounce(
  options?: DebounceOptionsNonCancelable,
): <T extends Callable>(callback: T) => Debounce<T>

function useDebounce(options?: DebounceOptions) {
  const delay = isNumber(options) ? options : getOr(250, "delay", options)
  const persist: boolean = getOr(false, "persist", options)
  const cancelable: boolean = getOr(false, "cancelable", options)

  return function useDebounceInternal<T extends Callable>(callback: T) {
    const [ready, setReady] = useState(false)
    const cancel = useRef<() => void>(noop)
    const wrapper = useRef<Debounce<T>>(noop)
    const timeout = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
      wrapper.current = (...params: Parameters<T>) => {
        const nextCallback = () => {
          callback(...params)
          timeout.current = null
        }

        if (persist) {
          invokeMap("persist", params)
        }

        cancel.current = () => {
          if (timeout.current) {
            clearTimeout(timeout.current)
            nextCallback()
          }

          cancel.current = noop
        }

        timeout.current && clearTimeout(timeout.current)
        timeout.current = setTimeout(nextCallback, delay)
      }

      setReady(true)
    }, [callback, ready])

    return cancelable ? [wrapper.current, () => cancel.current()] : wrapper.current
  }
}

export default useDebounce
