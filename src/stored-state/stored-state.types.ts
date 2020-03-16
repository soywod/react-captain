export type StoredState<T> = (name: string, opts?: StoredStateOpts<T>) => StoredStateState<T>
export type StoredStateState<T> = [T, (a: T) => void]
export type StoredStateDriver = "LOCALSTORAGE" | "WEBSQL" | "INDEXEDDB"
export type StoredStateOpts<T> =
  | T
  | {
      defaultValue?: T
      driver?: StoredStateDriver
    }
