# useToggle

A toggler built on `useState`.

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me/?selectedKind=useToggle&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

## Definition

```typescript
function useToggle(defaultToggleOn?: boolean): [boolean, (toggleOn?: boolean) => void]
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
    <div>
      <button onClick={toggle}>
        Switch status: {toggleOn ? 'ON' : 'OFF'}
      </button>
      <button onClick={resetToggle}>
        Reset toggle
      </button>
    </div>
  )
}
```
