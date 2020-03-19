# useToggle

A `useState` for booleans.

## Definition

```typescript
type UseToggle = (defaultVal?: any) => ToggleState
type ToggleState = [boolean, (val?: any) => void]
```

## Usage

```typescript
import {useToggle} from "react-captain"
// or
import useToggle from "react-captain/lib/toggle"

const Component: FC = () => {
  const [isOn, toggle] = useToggle(false)

  return (
    <div>
      <button onClick={toggle}>
        Switch status: {isOn ? "ON" : "OFF"}
      </button>
      <button onClick={() => toggle(false)}>
        Reset toggle
      </button>
    </div>
  )
}
```
