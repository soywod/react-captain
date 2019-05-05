import {useEffect, useRef, useState} from 'react'
import getOr from 'lodash/fp/getOr'
import invokeMap from 'lodash/fp/invokeMap'
import isNumber from 'lodash/fp/isNumber'
import noop from 'lodash/fp/noop'

import {Callback, clearTimeoutSafe} from '../utils'
import {
  Debounce,
  DebounceOptions,
  DebounceOptionsCancelable,
  DebounceOptionsNonCancelable,
} from './types'

function useDebounce(
  options: DebounceOptionsCancelable,
): <T extends Callback>(callback: T) => [Debounce<T>, () => void]

function useDebounce(
  options?: DebounceOptionsNonCancelable,
): <T extends Callback>(callback: T) => Debounce<T>

function useDebounce(options?: DebounceOptions) {
  const delay = isNumber(options) ? options : getOr(250, 'delay', options)
  const persist = getOr(false, 'persist', options)
  const cancelable = getOr(false, 'cancelable', options)

  return <T extends Callback>(callback: T) => {
    const [ready, setReady] = useState(false)
    const cancel = useRef<() => void>(noop)
    const wrapper = useRef<Debounce<T>>(noop)
    const timeout = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
      wrapper.current = (...params: Parameters<T>) => {
        const nextCallback = () => callback(...params)

        if (persist) {
          invokeMap('persist', params)
        }

        cancel.current = () => {
          clearTimeoutSafe(timeout.current)
          nextCallback()
          cancel.current = noop
        }

        clearTimeoutSafe(timeout.current)
        timeout.current = setTimeout(nextCallback, delay)
      }

      setReady(true)

      return () => cancel.current()
    }, [ready])

    return cancelable
      ? [wrapper.current, () => cancel.current()]
      : wrapper.current
  }
}

export default useDebounce
