# useClickOutside

Capture click event outside of the given HTMLElement.

## Definition

```typescript
type UseClickOutside = (
  ref: React.RefObject<Node>,
  fn: ClickOutsideFn,
  opts?: Partial<ClickOutsideOpts>,
) => void

type ClickOutsideFn = (evt: Event) => void
type ClickOutsideOpts = {
  root: React.RefObject<Node>
  except: React.RefObject<Node>[]
  listenerType: keyof DocumentEventMap
  listenerOpts: boolean | AddEventListenerOptions
}
```

## Usage

```typescript
import useClickOutside from "react-captain/click-outside"

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
