import {useEffect, useRef, useState} from "react"
import localForage from "localforage"
import getOr from "lodash/fp/getOr"

import {StoredStateState, StoredStateDriver, StoredStateOpts} from "./stored-state.types"

function useStoredState<T>(name: string, opts: StoredStateOpts<T> = {}): StoredStateState<T> {
  const defaultValue: T = getOr(opts, "defaultValue", opts)
  const storage = useRef<LocalForage | null>(null)
  const [value, setValue] = useState<T>(defaultValue)
  const [ready, setReady] = useState(false)

  function changeValue(value: T) {
    if (storage.current) {
      setValue(value)
      storage.current.setItem(name, value)
    }
  }

  useEffect(() => {
    if (!ready) {
      const driver: StoredStateDriver = getOr("LOCALSTORAGE", "driver", opts)
      storage.current = localForage.createInstance({name, driver: localForage[driver]})
      storage.current.getItem<T>(name).then(setValue)
      setReady(true)
    }
  }, [defaultValue, name, opts, ready, setValue])

  return [value, changeValue]
}

export default useStoredState
