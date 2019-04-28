# useInterval

Wrapper around `setInterval`.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useInterval&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

## Parameters

```typescript
type IntervalOptions =
  | number                // Frequency in ms, default: 1000
  | {
    frequency?: number    // Frequency in ms, default: 1000
    autoStart?: boolean   // Auto start interval, default: false
  }

function useInterval(callback: () => void, options?: IntervalOptions)
```

## Return

```typescript
[boolean, Dispatch<SetStateAction<boolean>>]
```

## Usage

```typescript
import {useInterval} from 'react-captain'
// or
import useInterval from 'react-captain/useInterval'

function Demo() {
  const [enable, setEnable] = useInterval(() => console.log('tick'))

  return enable ? (
    <button onClick={() => setEnable(false)}>
      Stop
    </button>
  ) : (
    <button onClick={() => setEnable(true)}>
      Start
    </button>
  )
}
```
