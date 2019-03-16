import {useEffect, useRef, useState} from 'react'
import invokeMap from 'lodash/invokeMap'
import noop from 'lodash/noop'
import uuid from 'uuid/v4'

// ------------------------------------------------------------------- # Types #

type AnyCallback = (...args: any[]) => void
type Timeout<T extends AnyCallback> = (...params: Parameters<T>) => void

type Timeouts = Map<String, NodeJS.Timeout>

export type TimeoutOptions = {
  delay: number
  persist: boolean
}

export const defaultOptions: TimeoutOptions = {
  delay: 250,
  persist: true,
}

// -------------------------------------------------------------------- # Hook #

export default function(userOptions?: Partial<TimeoutOptions>) {
  const options = {...defaultOptions, ...userOptions}

  return <T extends AnyCallback>(callback: T) => {
    const [ready, setReady] = useState(false)

    const timeout = useRef<Timeout<T>>(noop)
    const timeouts = useRef<Timeouts>(new Map())

    function clearTimeoutSafe(timeout: NodeJS.Timeout | null) {
      if (timeout) {
        clearTimeout(timeout)
      }
    }

    useEffect(() => {
      timeout.current = (...params: Parameters<T>) => {
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

      return () => {
        timeouts.current.forEach(clearTimeoutSafe)
        timeouts.current.clear()
      }
    }, [ready])

    return timeout.current
  }
}
