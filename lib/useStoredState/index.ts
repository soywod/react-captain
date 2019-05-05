import {useEffect, useRef, useState} from 'react'
import localForage from 'localforage'
import getOr from 'lodash/fp/getOr'
import isString from 'lodash/fp/isString'
import noop from 'lodash/fp/noop'

import useDebounce from '../useDebounce'
import {StoredStateDriver, StoredStateOptions} from './types'

function useStoredState<T>(
  options: StoredStateOptions,
  defaultState?: T | null,
) {
  const debounce = useDebounce(500)
  const hookState = useState<T | null>(defaultState || null)
  const storage = useRef<LocalForage | null>(null)
  const name = isString(options) ? options : options.name
  const updateState = debounce(storage.current ? storage.current.setItem : noop)
  const [state, setState] = hookState

  async function initState() {
    const driver = getDriver(getOr('LOCAL', 'driver', options))
    storage.current = localForage.createInstance({name, driver})
    const storedState = await storage.current.getItem<T>(name)
    setState(storedState || defaultState || null)
  }

  useEffect(() => {
    initState()
  }, [])

  useEffect(() => {
    updateState(name, state)
  }, [state])

  return hookState
}

function getDriver(driver: StoredStateDriver) {
  switch (driver) {
    case 'LOCAL':
      return localForage.LOCALSTORAGE
    case 'WEBSQL':
      return localForage.WEBSQL
    case 'INDEXEDDB':
      return localForage.INDEXEDDB
  }
}

export default useStoredState
