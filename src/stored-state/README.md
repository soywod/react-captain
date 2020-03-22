# useStoredState

A persistant useState, based on React"s `useState` and
[localForage](https://github.com/localForage/localForage). Drivers supported:
localStorage, WebSQL and IndexedDB.

## Installation

```bash
yarn add localforage
```

## Definition

```typescript
type UseStoredState = <T>(
  name: string,
  opts?: T | Partial<StoredStateOpts<T>>,
) => [T, (val: T) => Promise<void>, boolean]

type StoredStateDriver = "LOCALSTORAGE" | "WEBSQL" | "INDEXEDDB"

type StoredStateOpts<T> = {
  defaultVal: T
  driver: StoredStateDriver
}
```

## Usage

```typescript
import useStoredState from "react-captain/stored-state"

function Demo() {
  const [value, setValue] = useStoredState("storage-key", "Default value")

  return (
    <button onClick={() => setValue("Value changed!")}>
      {String(value)}
    </button>
  )
}
```
