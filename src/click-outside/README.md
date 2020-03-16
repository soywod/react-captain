# useClickOutside

Capture click event outside of the given HTMLElement.

## Definition

```typescript
export type ClickOutside = (
  ref: React.RefObject<HTMLElement>,
  listener: (evt: Event) => void,
  listenerOpts?: Partial<ClickOutsideListenerOpts>,
) => void

export type ClickOutsideListenerOpts = {
  type: keyof DocumentEventMap
  opts: boolean | AddEventListenerOptions
}
```

## Usage

```typescript
import {useClickOutside} from 'react-captain'
// or
import useClickOutside from 'react-captain/lib/click-outside'

const Component: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  useClickOutside(ref, () => console.log("Clicked outside!"))

  return (
    <div ref={ref}>
      Click outside
    </div>
  )
}
```
