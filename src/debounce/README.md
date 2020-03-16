# useDebounce

Add debounce to a handler.

## Definition

```typescript
type Callback<T> = (...params: Parameters<T>) => void
type Cancel = () => void
type Options =
  | number                // Delay in ms, default: 250
  | {
    delay?: number        // Delay in ms, default: 250
    persist?: boolean     // Should trigger .persist(), default: false
    cancelable?: boolean  // Provide a method to cancel the debounce, default: false
  }

function useDebounce(options?: Options): Callback | [Callback, Cancel]
```

## Usage

```typescript
import {useDebounce} from "react-captain"
// or
import useDebounce from "react-captain/lib/debounce"

function Demo() {
  const debounce = useDebounce(options)

  function handleClick() {
    console.log("Debounced!")
  }

  return (
    <button onClick={debounce(handleClick)}>
      Handle with debounce
    </button>
  )
}
```
