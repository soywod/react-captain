# useClickOutside

Capture click event outside of the given HTMLElement.

## Definition

```typescript
type ClickOutside = (
  ref: React.RefObject<Node>,
  listener: ClickOutsideListener,
  opts?: Partial<ClickOutsideOpts>,
) => void

type ClickOutsideListener = (evt: Event) => void
type ClickOutsideOpts = {
  root: React.RefObject<Node>
  except: React.RefObject<Node>[]
  listenerType: keyof DocumentEventMap
  listenerOpts: boolean | AddEventListenerOptions
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
