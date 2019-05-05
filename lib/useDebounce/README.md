# useDebounce

Add debounce to a handler.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useDebounce&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

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

function useDebounce(options?: Options): Callback | [Callback, Cancel]
```

## Usage

```typescript
import {useDebounce} from 'react-captain'
// or
import useDebounce from 'react-captain/useDebounce'

function Demo() {
  const debounce = useDebounce(options)

  function handleClick() {
    console.log('Clicked!')
  }

  return (
    <button onClick={debounce(handleClick)}>
      Handle with debounce
    </button>
  )
}
```
