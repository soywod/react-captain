# useDebounce

Add debounce to a handler.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useDebounce&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

## Parameters

```typescript
type DebounceOptions = {
  delay?: number       // Delay in ms, default: 250
  persist?: boolean    // Should trigger .persist() method if exists, default: false
  cancelable?: boolean // Provide a method to cancel the pending timeout, default: false
}

function useDebounce(options?: DebounceOptions)
```

## Return

```typescript
type Debounce<T> = (...params: Parameters<T>) => void

# Depending on cancelable option:
function debounce<T>(T): Debounce<T> | [Debounce<T>, () => void]
```

## Usage

```typescript
import {useDebounce} from 'react-captain'
// or
import useDebounce from 'react-captain/useDebounce'

function Demo() {
  const debounce = useDebounce({persist: true})

  function handleClick() {
    console.log('Clicked!')
  }

  return (
    <button onClick={debounce(handleClick)}>
      Click me...
    </button>
  )
}
```
