# useSparks

Turn a HTMLElement in a particle generator.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useSparks&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel).

## Parameters

```typescript
type SparksOptions = {
  ref: RefObject<HTMLElement>
  velocity?: [x: number, y: number] // default: [10, 20]
  gravity?: number                  // default: 2
  quantity?: number                 // default: 20
  duration?: number                 // default: 1000
  mass?: number                     // defalut: 0.96
  wind?: [x: number, y: number]     // defalut: [0, 0]
}

function useSparks(options?: SparksOptions)
```

## Return

```typescript
void
```

## Usage

```typescript
import {useSparks} from 'react-captain'
// or
import useSparks from 'react-captain/useSparks'

function Demo() {
  const ref = useRef()
  useSparks({ref})

  return (
    <div ref={ref}>
      Particle generator!
    </div>
  )
}
```
