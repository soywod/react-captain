# React Captain :anchor:
A collection of strongly typed and useful [React](https://reactjs.org/) [Hooks](https://reactjs.org/docs/hooks-intro.html).

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me)

## Table of contents

  - [Installation](#installation)
  - [Import](#import)
  - [Hooks overview](#hooks-overview)
    - [useClickOutside](#useclickoutside)
    - [useDebounce](#usedebounce)
    - [useSparks](#usesparks)
    - [useTimeout](#usetimeout)
    - useLocalStorage
    - useSessionStorage
    - useCookies
    - useInterval
    - useForm

## Installation

React and ReactDOM need to be installed first, since they are required as peer
dependencies:

```bash
npm install react react-dom

# then
npm install react-captain
```

## Import

```typescript
import {<hookName>} from 'react-captain'
// or
import <hookName> from 'react-captain/<hookName>'
```

## Hooks overview
### [useClickOutside](https://github.com/soywod/react-captain/tree/master/lib/useClickOutside)

Trigger callback on click outside from a HTMLElement.

```typescript
const ref = useRef<HTMLElement | null>(null)
const handleClickOutside = useClickOutside(ref)

handleClickOutside(() => {
  // Clicked outside
})
```
### [useDebounce](https://github.com/soywod/react-captain/tree/master/lib/useDebounce)

Add debounce to a handler.

```typescript
type DebounceOptions = {
  delay?: number       // default: 250
  persist?: boolean    // default: false
  cancelable?: boolean // default: false
}

const debounce = useDebounce(options)

// If cancelable = false
const handlerWithDebounce = debounce(handler)

// If cancelable = true
const [handlerWithDebounce, cancel] = debounce(handler)
```

### [useSparks](https://github.com/soywod/react-captain/tree/master/lib/useSparks)

Turn a HTMLElement into a particle generator.

```typescript
type Range = [number, number]

type SparksOptions = {
  ref: RefObject<HTMLElement>
  shapes: JSX.Element | JSX.Element[]
  velocity?: [number | Range, number | Range] // default: [[-10, 10], [17, 23]]
  gravity?: number                            // default: 2
  quantity?: number                           // default: 10
  duration?: number                           // default: 1000
  mass?: number                               // default: 0.96
  wind?: [x: number, y: number]               // default: [0, 0]
  mode?: 'chunk' | 'stream'                   // default: 'chunk'
}

const [enabled, switchOn] = useSparks(options)
```

### [useTimeout](https://github.com/soywod/react-captain/tree/master/lib/useTimeout)

Wrapper around `setTimeout`.

```typescript
type TimeoutOptions = {
  delay?: number       // default: 250
  persist?: boolean    // default: false
  cancelable?: boolean // default: false
}

const timeout = useTimeout(options)

// If cancelable = false
const handlerWithTimeout = timeout(handler)

// If cancelable = true
const [handlerWithTimeout, cancel] = timeout(handler)
```
