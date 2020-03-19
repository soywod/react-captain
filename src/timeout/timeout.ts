import {useEffect, useRef, useState} from "react"
import {v4 as uuid} from "uuid"
import getOr from "lodash/fp/getOr"
import invokeMap from "lodash/fp/invokeMap"
import isNumber from "lodash/fp/isNumber"
import noop from "lodash/fp/noop"

import {Function, Timeout, TimeoutOpts, TimeoutsMap} from "./timeout.types"

function useTimeout(options?: TimeoutOpts) {
  const delay = isNumber(options) ? options : getOr(300, "delay", options)
  const persist: boolean = getOr(false, "persist", options)

  return function useTimeoutInternal<T extends Function>(callback: T): Timeout<T> {
    const [ready, setReady] = useState(false)
    const timeouts = useRef<TimeoutsMap>(new Map())
    const wrapper = useRef<(...params: Parameters<T>) => void>(noop)
    const abort = useRef<() => void>(noop)
    const terminate = useRef<() => void>(noop)

    useEffect(() => {
      wrapper.current = (...params: Parameters<T>) => {
        if (persist) {
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

        timeouts.current.set(id, [setTimeout(wrapper, delay), wrapper])
      }

      setReady(true)
    }, [callback, ready])

    return Object.assign(wrapper.current, {
      abort: () => abort.current(),
      terminate: () => terminate.current(),
    })
  }
}

export default useTimeout
