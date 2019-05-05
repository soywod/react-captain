type BaseStoredStateOptions = {
  name: string
  driver?: StoredStateDriver
}

export type StoredStateDriver = 'LOCAL' | 'WEBSQL' | 'INDEXEDDB'
export type StoredStateOptions = string | BaseStoredStateOptions
