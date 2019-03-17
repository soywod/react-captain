import {useEffect, useRef, useState} from 'react'
import invokeMap from 'lodash/invokeMap'
import noop from 'lodash/noop'
import uuid from 'uuid/v4'

// ------------------------------------------------------------------- # Types #

type Callback = (...args: any[]) => void
type Timeouts = Map<String, NodeJS.Timeout>

type DefaultTimeoutOptions = {
  delay: number
  persist: boolean
  cancelable: boolean
}

export const defaultOptions: DefaultTimeoutOptions = {
  delay: 250,
  persist: false,
  cancelable: false,
}

type TimeoutOptionsNonConcelable = Partial<DefaultTimeoutOptions> & {
  cancelable?: false
}

type TimeoutOptionsCancelable = Partial<DefaultTimeoutOptions> & {
  cancelable: true
}

export type TimeoutOptions =
  | TimeoutOptionsNonConcelable
  | TimeoutOptionsCancelable

type Timeout<T extends Callback> = (...params: Parameters<T>) => void
type TimeoutCancelable<T extends Callback> = [Timeout<T>, () => void]

function useTimeout(
  userOptions?: TimeoutOptionsNonConcelable,
): <T extends Callback>(callback: T) => Timeout<T>

function useTimeout(
  userOptions: TimeoutOptionsCancelable,
): <T extends Callback>(callback: T) => TimeoutCancelable<T>

// -------------------------------------------------------------------- # Hook #

function useTimeout(userOptions?: TimeoutOptions) {
  const options: DefaultTimeoutOptions = {...defaultOptions, ...userOptions}

  return <T extends Callback>(callback: T) => {
    const [ready, setReady] = useState(false)

    const wrapper = useRef<Timeout<T>>(noop)
    const timeouts = useRef<Timeouts>(new Map())

    function clearTimeoutSafe(timeout: NodeJS.Timeout | null) {
      if (timeout) {
        clearTimeout(timeout)
      }
    }

    function clearTimeouts() {
      timeouts.current.forEach(clearTimeoutSafe)
      timeouts.current.clear()
    }

    useEffect(() => {
      wrapper.current = (...params: Parameters<T>) => {
        if (options.persist) {
          invokeMap(params, 'persist')
        }

        const id = uuid()

        const nextCallback = () => {
          callback(...params)
          timeouts.current.delete(id)
        }

        const nextTimeout = setTimeout(nextCallback, options.delay)
        timeouts.current.set(id, nextTimeout)
      }

      setReady(true)

      return () => clearTimeouts()
    }, [ready])

    return options.cancelable
      ? [wrapper.current, clearTimeouts]
      : wrapper.current
  }
}

export default useTimeout
