# useStoredState

A persistant useState, based on React's `useState` and
[localForage](https://github.com/localForage/localForage). Drivers supported:
localStorage, WebSQL and IndexedDB.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useStoredState&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

## Parameters

```typescript
type StorageOptions =
  | string
  | {
      name: string
      driver?: 'LOCAL' | 'WEBSQL' | 'INDEXEDDB' // Default: 'LOCAL'
    }

function useStoredState<T>(options?: StorageOptions, defaultState?: T | null)
```

## Return

```typescript
[T | null, Dispatch<SetStateAction<T | null>>]
```

## Usage

```typescript
import {useStoredState} from 'react-captain'
// or
import useStoredState from 'react-captain/useStoredState'

function Demo() {
  const [value, setValue] = useStoredState('storage-key', 'Default value')

  return (
    <button onClick={() => setValue('Value changed!')}>
      {String(value)}
    </button>
  )
}
```
