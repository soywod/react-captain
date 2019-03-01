# useClickOutside

<p align="right">
  <a href="https://react-captain.soywod.me/?selectedKind=useClickOutside&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel">
    <img src="https://github.com/storybooks/brand/blob/master/badge/badge-storybook.svg" />
  </a>
</p>

## Parameters

```typescript
function useClickOutside(ref: React.RefObject<HTMLElement>)
```

## Return

```typescript
function () => void
```

## Usage

```typescript
import {useClickOutside} from 'react-captain'
// or
import useClickOutside from 'react-captain/useClickOutside'

function Demo() {
  const ref = useRef<HTMLButtonElement | null>(null)
  const handleClickOutside = useClickOutside(ref)

  function handleClickOutside() {
    console.log('Clicked outside!')
  }

  return (
    <button onClick={debounce(handleClickOutside)}>
      Click outside...
    </button>
  )
}
```
