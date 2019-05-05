import {useEffect, useRef} from 'react'
import getOr from 'lodash/fp/getOr'
import isNumber from 'lodash/fp/isNumber'

import useToggle from '../useToggle'
import {clearTimeoutSafe} from '../utils'
import {IntervalCallback, IntervalOptions} from './types'

function useInterval(callback: IntervalCallback, options?: IntervalOptions) {
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const state = useToggle(false)
  const delay = isNumber(options) ? options : getOr(1000, 'delay', options)
  const autoStart = getOr(false, 'autoStart', options)
  const [toggleOn, toggle] = state

  useEffect(() => {
    if (toggleOn) {
      timeout.current = setInterval(callback, delay)
    } else {
      clearTimeoutSafe(timeout.current)
      timeout.current = null
    }

    return () => clearTimeoutSafe(timeout.current)
  }, [toggleOn])

  useEffect(() => {
    if (autoStart) {
      toggle(true)
    }
  }, [])

  return state
}

export {IntervalCallback, IntervalOptions}
export default useInterval
