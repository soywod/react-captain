# useTimeout

Wrapper around setTimeout.

## Definition

```typescript
type UseTimeout = (
  opts?: number | Partial<TimeoutOpts>,
) => <T extends Function>(fn: T) => Timeout<T>

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
import useTimeout from "react-captain/timeout"

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
