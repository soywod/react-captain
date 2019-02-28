import {useEffect, useRef} from 'react'
import assign from 'lodash/assign'
import cloneDeep from 'lodash/cloneDeep'
import noop from 'lodash/noop'

// ------------------------------------------------------------------- # Types #

type AnyCallback = (...args: any[]) => void
type Debounce<T extends AnyCallback> = (...params: Parameters<T>) => void

export type DebounceOptions = {
  delay: number
}

export const defaultOptions: DebounceOptions = {
  delay: 250,
}

// -------------------------------------------------------------------- # Hook #

export default function(userOptions?: Partial<DebounceOptions>) {
  const options = assign({}, defaultOptions, userOptions)

  return <T extends AnyCallback>(callback: T) => {
    const timeout = useRef<NodeJS.Timeout | null>(null)
    const debounce = useRef<Debounce<T>>(noop)
    const abort = useRef<() => void>(noop)
    const callbackCopy = useRef<() => void>(noop)

    useEffect(() => {
      debounce.current = (...params: Parameters<T>) => {
        callbackCopy.current = () => callback(...cloneDeep(params))
        abort.current = () => {
          if (timeout.current) {
            clearTimeout(timeout.current)
            callbackCopy.current()
          }
        }

        if (timeout.current) {
          clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(callbackCopy.current, options.delay)
      }

      return () => abort.current()
    }, [])

    return debounce.current
  }
}
