# useTimeout

A wrapper around `setTimeout`.

## Definition

```typescript
type UseTimeout = <T extends Function>(
  fn: T,
  opts?: number | Partial<TimeoutOpts>,
) => Timeout<T>

type TimeoutOpts = {
  delay: number
  persist: boolean
}

type Timeout<T extends Function> = {
  (...params: Parameters<T>): void
  abort: () => void
  terminate: () => void
}
```

## Usage

```typescript
import {useTimeout} from "react-captain"

function Component() {
  const handler = useTimeout(() => console.log("Hello!"), 1000)

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
