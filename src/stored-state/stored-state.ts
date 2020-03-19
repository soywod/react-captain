import {useEffect, useCallback, useRef, useState} from "react"
import localForage from "localforage"
import getOr from "lodash/fp/getOr"
import isNil from "lodash/fp/isNil"

import {UseStoredState, StoredStateOpts, defaultDriver} from "./stored-state.types"

const useStoredState: UseStoredState = <T>(
  name: string,
  overrideOpts?: T | Partial<StoredStateOpts<T>>,
) => {
  const defaultVal: T = getOr(overrideOpts, "defaultVal", overrideOpts)
  const opts = Object.assign({defaultVal, driver: defaultDriver}, overrideOpts)
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
      storage.current = localForage.createInstance({name, driver: localForage[opts.driver]})
      storage.current
        .getItem<T>(name)
        .then(storedVal => (isNil(storedVal) ? updateVal(defaultVal) : setVal(storedVal)))
        .then(() => setReady(true))
    }
  }, [defaultVal, isReady, name, opts.driver, updateVal])

  return [val, updateVal, isReady]
}

export default useStoredState
