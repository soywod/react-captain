# useToggle

A toggler built on `useState`.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useToggle&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

## Parameters

```typescript
function useToggle(defaultToggleOn?: boolean)
```

## Return

```typescript
type ToggleState = [boolean, (toggleOn?: boolean) => void]
```

## Usage

```typescript
import {useToggle} from 'react-captain'
// or
import useToggle from 'react-captain/useToggle'

function Demo() {
  const [toggleOn, toggle] = useToggle(false)

  function resetToggle() {
    toggle(false)
  }

  return (
    <>
      <button onClick={toggle}>
        {toggleOn ? 'Switch ON' : 'Switch OFF'}
      </button>
      <button onClick={resetToggle}>
        Reset toggle
      </button>
    </>
  )
}
```
