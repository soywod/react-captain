import {useEffect, useRef, useState} from 'react'
import invokeMap from 'lodash/invokeMap'
import noop from 'lodash/noop'

// ------------------------------------------------------------------- # Types #

type AnyCallback = (...args: any[]) => void
type Debounce<T extends AnyCallback> = (...params: Parameters<T>) => void

export type DebounceOptions = {
  delay: number
  persist: boolean
}

export const defaultOptions: DebounceOptions = {
  delay: 250,
  persist: true,
}

// -------------------------------------------------------------------- # Hook #

export default function(userOptions?: Partial<DebounceOptions>) {
  const options = {...defaultOptions, ...userOptions}

  return <T extends AnyCallback>(callback: T) => {
    const [ready, setReady] = useState(false)

    const abort = useRef<() => void>(noop)
    const debounce = useRef<Debounce<T>>(noop)
    const timeout = useRef<NodeJS.Timeout | null>(null)

    function clearTimeoutSafe(timeout: NodeJS.Timeout | null) {
      if (timeout) {
        clearTimeout(timeout)
      }
    }

    useEffect(() => {
      debounce.current = (...params: Parameters<T>) => {
        const callbackCopy = () => callback(...params)

        if (options.persist) {
          invokeMap(params, 'persist')
        }

        abort.current = () => {
          clearTimeoutSafe(timeout.current)
          callbackCopy()
        }

        clearTimeoutSafe(timeout.current)
        timeout.current = setTimeout(callbackCopy, options.delay)
      }

      setReady(true)

      return () => abort.current()
    }, [ready])

    return debounce.current
  }
}
