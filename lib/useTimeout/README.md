# useTimeout

Wrapper around `setTimeout`.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useTimeout&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

## Definition

```typescript
type Callback<T> = (...params: Parameters<T>) => void
type Cancel = () => void
type Options =
  | number                // Delay in ms, default: 250
  | {
    delay?: number        // Delay in ms, default: 250
    persist?: boolean     // Should trigger .persist() if exists, default: false
    cancelable?: boolean  // Provide a method to cancel the debounce, default: false
  }

function useTimeout(options?: Options): Callback | [Callback, Cancel]
```

## Usage

```typescript
import {useTimeout} from 'react-captain'
// or
import useTimeout from 'react-captain/useTimeout'

function Demo() {
  const timeout = useTimeout({persist: true})

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
