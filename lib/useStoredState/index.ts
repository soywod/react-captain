import {useEffect, useRef, useState} from 'react'
import localForage from 'localforage'
import getOr from 'lodash/fp/getOr'
import isString from 'lodash/fp/isString'

// ------------------------------------------------------------------- # Types #

type StorageDriver = 'LOCAL' | 'WEBSQL' | 'INDEXEDDB'
type StorageOptions =
  | string
  | {
      name: string
      driver?: StorageDriver
    }

// -------------------------------------------------------------------- # Hook #

function getDriver(driver: StorageDriver) {
  switch (driver) {
    case 'LOCAL':
      return localForage.LOCALSTORAGE
    case 'WEBSQL':
      return localForage.WEBSQL
    case 'INDEXEDDB':
      return localForage.INDEXEDDB
  }
}

export default function<T>(options: StorageOptions, defaultState?: T | null) {
  const hookState = useState<T | null>(defaultState || null)
  const storage = useRef<LocalForage | null>(null)
  const name = isString(options) ? options : options.name
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
    if (storage.current) {
      storage.current.setItem(name, state)
    }
  }, [state])

  return hookState
}
