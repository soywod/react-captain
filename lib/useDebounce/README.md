# useDebounce

<p align="right">
  <a href="https://react-captain.soywod.me/?selectedKind=useDebounce&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel">
    <img src="https://github.com/storybooks/brand/blob/master/badge/badge-storybook.svg" />
  </a>
</p>

## Parameters

```typescript
type DebounceOptions = {
  delay: number    // Delay in ms, default: 250
  persist: boolean // Should trigger .persist() method if exists, default: true
}

function useDebounce(options?: Partial<DebounceOptions>)
```

## Return

```typescript
type Callback<T> = (...params: T) => any

function debounce<T>(callback: Callback<T>): Callback<T>
```

## Usage

```typescript
import {useDebounce} from 'react-captain'
// or
import useDebounce from 'react-captain/useDebounce'

function Demo() {
  const debounce = useDebounce()

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
