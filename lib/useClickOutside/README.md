# useClickOutside

Capture click outside event of the given HTMLElement.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useClickOutside&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

## Definition

```typescript
type Ref<T extends HTMLElement> = React.RefObject<T>
type Callback = (e: MouseEvent) => void

function useClickOutside(ref: Ref, cb: Callback) => void
function useClickOutside(ref: Ref) => (cb: Callback) => void
```

## Usage

```typescript
import {useClickOutside} from 'react-captain'
// or
import useClickOutside from 'react-captain/useClickOutside'

function Demo() {
  const ref = useRef<HTMLDivElement | null>(null)

  // Option 1
  useClickOutside(ref, (event: MouseEvent) => {
    console.log('Clicked outside!')
  })

  // Option 2
  const onClickOutside = useClickOutside(ref)
  onClickOutside((event: MouseEvent) => {
    console.log('Clicked outside!')
  })

  return (
    <div ref={ref}>
      Click outside
    </div>
  )
}
```
