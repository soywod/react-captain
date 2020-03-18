export type StoredState<T> = (name: string, opts?: StoredStateOpts<T>) => StoredStateState<T>
export type StoredStateState<T> = [T, (val: T) => Promise<void>, boolean]
export type StoredStateDriver = "LOCALSTORAGE" | "WEBSQL" | "INDEXEDDB"
export type StoredStateOpts<T> =
  | T
  | {
      /**
       * Default value.
       */
      defaultVal: T
      /**
       * LocalForage driver.
       * @default "LOCALSTORAGE"
       */
      driver?: StoredStateDriver
    }
