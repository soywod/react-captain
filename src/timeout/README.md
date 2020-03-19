# useTimeout

Wrapper around setTimeout.

## Definition

```typescript
type Timeout<T extends Function> = {
  (...params: Parameters<T>): void
  abort: () => void
  terminate: () => void
}

type TimeoutOpts =
  | number
  | {
      delay?: number
      persist?: boolean
    }
```

## Usage

```typescript
import {useTimeout} from "react-captain"
// or
import useTimeout from "react-captain/lib/timeout"

function Component() {
  const timeout = useTimeout()
  const handler = timeout(() => console.log("Hello!"))

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
