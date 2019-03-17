# useTimeout

Turn `setTimeout` into a hook.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useTimeout&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

## Parameters

```typescript
type TimeoutOptions = {
  delay: number    // Delay in ms, default: 250
  persist: boolean // Should trigger .persist() method if exists, default: true
}

function useTimeout(options?: Partial<TimeoutOptions>)
```

## Return

```typescript
type Callback<T> = (...params: T) => any

function timeout<T>(callback: Callback<T>): Callback<T>
```

## Usage

```typescript
import {useTimeout} from 'react-captain'
// or
import useTimeout from 'react-captain/useTimeout'

function Demo() {
  const timeout = useTimeout()

  function handleClick() {
    console.log('Clicked!')
  }

  return (
    <button onClick={timeout(handleClick)}>
      Click me...
    </button>
  )
}
```
