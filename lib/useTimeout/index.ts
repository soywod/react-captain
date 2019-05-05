import {useEffect, useRef, useState} from 'react'
import uuid from 'uuid/v4'
import getOr from 'lodash/fp/getOr'
import invokeMap from 'lodash/fp/invokeMap'
import isNumber from 'lodash/fp/isNumber'
import noop from 'lodash/fp/noop'

import {Callback, clearTimeoutSafe} from '../utils'
import {
  Timeout,
  TimeoutOptions,
  TimeoutOptionsCancelable,
  TimeoutOptionsNonCancelable,
  Timeouts,
} from './types'

function useTimeout(
  options?: TimeoutOptionsNonCancelable,
): <T extends Callback>(callback: T) => Timeout<T>

function useTimeout(
  userOptions: TimeoutOptionsCancelable,
): <T extends Callback>(callback: T) => [Timeout<T>, () => void]

function useTimeout(options?: TimeoutOptions) {
  const delay = isNumber(options) ? options : getOr(250, 'delay', options)
  const persist = getOr(false, 'persist', options)
  const cancelable = getOr(false, 'cancelable', options)

  return <T extends Callback>(callback: T) => {
    const [ready, setReady] = useState(false)

    const wrapper = useRef<Timeout<T>>(noop)
    const timeouts = useRef<Timeouts>(new Map())

    function clearTimeouts() {
      timeouts.current.forEach(clearTimeoutSafe)
      timeouts.current.clear()
    }

    useEffect(() => {
      wrapper.current = (...params: Parameters<T>) => {
        if (persist) {
          invokeMap('persist', params)
        }

        const id = uuid()

        const nextCallback = () => {
          callback(...params)
          timeouts.current.delete(id)
        }

        const nextTimeout = setTimeout(nextCallback, delay)
        timeouts.current.set(id, nextTimeout)
      }

      setReady(true)

      return () => clearTimeouts()
    }, [ready])

    return cancelable ? [wrapper.current, clearTimeouts] : wrapper.current
  }
}

export default useTimeout
