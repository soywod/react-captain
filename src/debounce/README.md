# useDebounce

Add debounce to a handler.

## Definition

```typescript
type UseDebounce = <T extends Function>(
  fn: T,
  opts?: number | Partial<DebounceOpts>,
) => Debounce<T>

type DebounceOpts = {
  delay: number
  persist: boolean
}

type Debounce<T extends Function> = {
  (...params: Parameters<T>): void
  abort: () => void
  terminate: () => void
}
```

## Usage

```typescript
import {useDebounce} from "react-captain"

function Component() {
  const debounce = useDebounce()
  const handler = debounce(() => console.log("Hello!"))

  return (
    <>
      <button onClick={handler}>
        Say hello with delay
      </button>
      <button onClick={handler.abort}>
        Abort
      </button>
      <button onClick={handler.terminate}>
        Terminate
      </button>
    </>
  )
}
```
