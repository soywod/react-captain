import {useEffect, useCallback, useRef, useState} from "react"
import localForage from "localforage"
import getOr from "lodash/fp/getOr"
import isNil from "lodash/fp/isNil"

import {StoredStateState, StoredStateDriver, StoredStateOpts} from "./stored-state.types"

function useStoredState<T>(name: string, opts: StoredStateOpts<T>): StoredStateState<T> {
  const driver: StoredStateDriver = getOr("LOCALSTORAGE", "driver", opts)
  const defaultVal: T = getOr(opts, "defaultVal", opts)
  const storage = useRef<LocalForage | null>(null)
  const [isReady, setReady] = useState(false)
  const [val, setVal] = useState(defaultVal)

  const updateVal = useCallback(
    async (val: T) => {
      if (storage.current) {
        setVal(val)
        await storage.current.setItem(name, val)
      }
    },
    [name],
  )

  useEffect(() => {
    if (!isReady) {
      storage.current = localForage.createInstance({name, driver: localForage[driver]})
      storage.current
        .getItem<T>(name)
        .then(storedVal => (isNil(storedVal) ? updateVal(defaultVal) : setVal(storedVal)))
        .then(() => setReady(true))
    }
  }, [defaultVal, driver, isReady, name, updateVal])

  return [val, updateVal, isReady]
}

export default useStoredState
