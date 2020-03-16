# useClickOutside

Capture click event outside of the given HTMLElement.

## Definition

```typescript
export type UseClickOutsideParams = {
  ref: React.RefObject<HTMLElement>
  listener: (e: Event) => void
  listenerType?: keyof DocumentEventMap
  listenerOpts?: boolean | AddEventListenerOptions
}
```

## Usage

```typescript
import {useClickOutside} from 'react-captain'
// or
import useClickOutside from 'react-captain/lib/click-outside'

const Component: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const listener = () => console.log("Clicked outside!")
  useClickOutside({ref, listener})

  return (
    <div ref={ref}>
      Click outside
    </div>
  )
}
```
