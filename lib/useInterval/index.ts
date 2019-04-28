import {useEffect, useRef, useState} from 'react'
import getOr from 'lodash/fp/getOr'
import isNumber from 'lodash/fp/isNumber'

import {Callback, IntervalOptions} from './types'
import {clearIntervalSafe} from './utils'

export default function(callback: Callback, options?: IntervalOptions) {
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const state = useState(false)

  const [enable, setEnable] = state
  const autoStart = getOr(false, 'autoStart', options)
  const frequency = isNumber(options)
    ? options
    : getOr(1000, 'frequency', options)

  useEffect(() => {
    if (enable) {
      timeout.current = setInterval(callback, frequency)
    } else {
      clearIntervalSafe(timeout.current)
      timeout.current = null
    }

    return () => clearIntervalSafe(timeout.current)
  }, [enable])

  useEffect(() => {
    if (autoStart) {
      setEnable(true)
    }
  }, [])

  return state
}
