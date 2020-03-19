# useStoredState

A persistant useState, based on React"s `useState` and
[localForage](https://github.com/localForage/localForage). Drivers supported:
localStorage, WebSQL and IndexedDB.

## Definition

```typescript
type StoredState<T> = (name: string, opts?: StoredStateOpts<T>) => StoredStateState<T>
type StoredStateState<T> = [T, (val: T) => Promise<void>, boolean]
type StoredStateDriver = "LOCALSTORAGE" | "WEBSQL" | "INDEXEDDB"
type StoredStateOpts<T> =
  | T
  | {
      defaultVal: T
      driver?: StoredStateDriver
    }
```

## Installation

```bash
yarn add localforage
```

## Usage

```typescript
import {useStoredState} from "react-captain"
// or
import useStoredState from "react-captain/lib/stored-state"

function Demo() {
  const [value, setValue] = useStoredState("storage-key", "Default value")

  return (
    <button onClick={() => setValue("Value changed!")}>
      {String(value)}
    </button>
  )
}
```
