# useInterval

Wrapper around `setInterval`.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useInterval&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

## Definition

```typescript
type UseInterval = [boolean, (toggle?: boolean) => void]
type IntervalCallback = () => void
type IntervalOptions =
  | number                // Delay in ms, default: 1000
  | {
    delay?: number        // Delay in ms, default: 1000
    autoStart?: boolean   // Auto start interval, default: false
  }

function useInterval(callback: IntervalCallback, options?: IntervalOptions): UseInterval
```

## Usage

```typescript
import {useInterval} from 'react-captain'
// or
import useInterval from 'react-captain/useInterval'

function Demo() {
  const [toggleOn, toggle] = useInterval(() => console.log('tick'))

  return (
    <button onClick={toggle}>
      {toggleOn ? 'Stop' : 'Start'}
    </button>
  )
}
```
