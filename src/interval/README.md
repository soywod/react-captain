# useInterval

Wrapper around `setInterval` using
[toggle](https://github.com/soywod/react-captain/tree/master/src/toggle) hook.

## Definition

```typescript
type UseInterval = (
  fn: IntervalFn,
  opts?: number | Partial<IntervalOpts>,
) => ToggleState

type IntervalFn = () => void
type IntervalOpts = {
  delay: number
  autoStart: boolean
}
```

## Usage

```typescript
import useInterval from "react-captain/interval"

function Component() {
  const [isOn, toggle] = useInterval(() => console.log("Hello!"))

  return (
    <button onClick={handler}>
      {isOn ? "Stop" : "Say hello"}
    </button>
  )
}
```
