# useStoredState

A persistant useState, based on React's `useState` and
[localForage](https://github.com/localForage/localForage). Drivers supported:
localStorage, WebSQL and IndexedDB.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useStoredState&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

## Definition

```typescript
type UseStoredState = [T | null, Dispatch<SetStateAction<T | null>>]
type StoredStateOptions =
  | string                                      // Key used to store the state
  | {
      name: string                              // Key used to store the state
      driver?: 'LOCAL' | 'WEBSQL' | 'INDEXEDDB' // Driver, default: 'LOCAL'
    }

function useStoredState<T>(options: StoredStateOptions, defaultState?: T | null): UseStoredState
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
