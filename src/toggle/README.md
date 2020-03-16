# useToggle

A `useState` for booleans.

## Definition

```typescript
type UseToggle = (defaultValue?: any) => [boolean, (toggler?: any) => void]
```

## Usage

```typescript
import {useToggle} from 'react-captain'
// or
import useToggle from 'react-captain/lib/toggle'

const Demo: FC = () => {
  const [isOn, toggle] = useToggle(false)

  return (
    <div>
      <button onClick={toggle}>
        Switch status: {isOn ? 'ON' : 'OFF'}
      </button>
      <button onClick={() => toggle(false)}>
        Reset toggle
      </button>
    </div>
  )
}
```
