/**
 * A persistant useState, based on React"s `useState` and localForage.
 * Supported drivers: localStorage, WebSQL and IndexedDB.
 */
export type UseStoredState = <T>(
  name: string,
  opts?: T | Partial<StoredStateOpts<T>>,
) => [T, (val: T) => Promise<void>, boolean]

export type StoredStateOpts<T> = {
  /**
   * Default value.
   */
  defaultVal: T
  /**
   * LocalForage driver.
   *
   * @default "LOCALSTORAGE"
   */
  driver: StoredStateDriver
}

export type StoredStateDriver = "LOCALSTORAGE" | "WEBSQL" | "INDEXEDDB"
export const defaultDriver: StoredStateDriver = "LOCALSTORAGE"
