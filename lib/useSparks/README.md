# useSparks

Turn a HTMLElement into a particle generator.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useSparks&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

## Parameters

```typescript
type Range = [number, number]

type SparksOptions = {
  ref: RefObject<HTMLElement>                 // The target element
  shapes: JSX.Element | JSX.Element[]         // The particle element list (one is taken randomly by the hook on mount)
  velocity?: [number | Range, number | Range] // The speed vector, default: [[-10, 10], [17, 23]]
  gravity?: number                            // The gravity, default: 2
  quantity?: number                           // The amount (unit/s in stream mode, unit in chunk mode), default: 10
  duration?: number                           // The duration in ms, default: 1000
  mass?: number                               // The particle mass factor, default: 0.96
  wind?: [x: number, y: number]               // The wind vector, default: [0, 0]
  mode?: 'chunk' | 'stream'                   // The mode (stream = infinite flow, chunk = finite block), default: 'chunk'
}

function useSparks(options?: SparksOptions)
```

## Return

```typescript
[enabled: boolean, switchOn: React.Dispatch<React.SetStateAction<boolean>>]
```

## Usage

```typescript
import {useSparks} from 'react-captain'
// or
import useSparks from 'react-captain/useSparks'

function Demo() {
  const ref = useRef()
  const [enabled, switchOn] = useSparks({ref})

  return (
    <button ref={ref} onClick={() => switchOn(!enabled)}>
      Particle generator!
    </button>
  )
}
```
