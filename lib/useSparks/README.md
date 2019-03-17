# useSparks

Turn a HTMLElement in a particle generator.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useSparks&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel).

## Parameters

```typescript
type Range = number | [number, number]

type SparksOptions = {
  ref: RefObject<HTMLElement>         // the target element
  shapes: JSX.Element | JSX.Element[] // the particle element list (one is taken randomly by the hook on mount)
  velocity?: [x: Range, y: Range]     // default: [[-10, 10], [17, 23]]
  gravity?: number                    // default: 2
  quantity?: number                   // default: 20
  duration?: number                   // default: 1000
  mass?: number                       // defalut: 0.96
  wind?: [x: number, y: number]       // defalut: [0, 0]
  mode?: 'stream' | 'realtime'        // default: 'stream'
}

function useSparks(options?: SparksOptions)
```

## Return

```typescript
[isOn: boolean, setOn: React.Dispatch<React.SetStateAction<boolean>>]
```

## Usage

```typescript
import {useSparks} from 'react-captain'
// or
import useSparks from 'react-captain/useSparks'

function Demo() {
  const ref = useRef()
  const [isOn, setOn] = useSparks({ref})

  return (
    <button ref={ref} onClick={() => setOn(!isOn)}>
      Particle generator!
    </button>
  )
}
```
