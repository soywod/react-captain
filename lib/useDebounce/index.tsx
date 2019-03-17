import {useEffect, useRef, useState} from 'react'
import invokeMap from 'lodash/invokeMap'
import noop from 'lodash/noop'

// ------------------------------------------------------------------- # Types #

type Callback = (...args: any[]) => void

type DefaultDebounceOptions = {
  delay: number
  persist: boolean
  cancelable: boolean
}

export const defaultOptions: DefaultDebounceOptions = {
  delay: 250,
  persist: false,
  cancelable: false,
}

type DebounceOptionsNonConcelable = Partial<DefaultDebounceOptions> & {
  cancelable?: false
}

type DebounceOptionsCancelable = Partial<DefaultDebounceOptions> & {
  cancelable: true
}

export type DebounceOptions =
  | DebounceOptionsNonConcelable
  | DebounceOptionsCancelable

type Debounce<T extends Callback> = (...params: Parameters<T>) => void
type DebounceCancelable<T extends Callback> = [Debounce<T>, () => void]

function useDebounce(
  userOptions?: DebounceOptionsNonConcelable,
): <T extends Callback>(callback: T) => Debounce<T>

function useDebounce(
  userOptions: DebounceOptionsCancelable,
): <T extends Callback>(callback: T) => DebounceCancelable<T>

// -------------------------------------------------------------------- # Hook #

function useDebounce(userOptions?: DebounceOptions) {
  const options = {...defaultOptions, ...userOptions}

  return <T extends Callback>(callback: T) => {
    const [ready, setReady] = useState(false)

    const cancel = useRef<() => void>(noop)
    const wrapper = useRef<Debounce<T>>(noop)
    const timeout = useRef<NodeJS.Timeout | null>(null)

    function clearTimeoutSafe(timeout: NodeJS.Timeout | null) {
      if (timeout) {
        clearTimeout(timeout)
      }
    }

    useEffect(() => {
      wrapper.current = (...params: Parameters<T>) => {
        const nextCallback = () => callback(...params)

        if (options.persist) {
          invokeMap(params, 'persist')
        }

        cancel.current = () => {
          clearTimeoutSafe(timeout.current)
          nextCallback()
          cancel.current = noop
        }

        clearTimeoutSafe(timeout.current)
        timeout.current = setTimeout(nextCallback, options.delay)
      }

      setReady(true)

      return () => cancel.current()
    }, [ready])

    return options.cancelable
      ? [wrapper.current, () => cancel.current()]
      : wrapper.current
  }
}

export default useDebounce
