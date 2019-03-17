# React Captain :anchor:
A collection of strongly typed and useful [React](https://reactjs.org/) [Hooks](https://reactjs.org/docs/hooks-intro.html).

See live examples on [![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me).

## Table of contents

  - [Installation](#installation)
  - [Import](#import)
  - [Hooks overview](#hooks-overview)
    - [useClickOutside](#useclickoutside)
    - [useDebounce](#usedebounce)
    - [useSparks](#usesparks)
    - [useTimeout](#usetimeout)
    - useInterval
    - useForm

## Installation

React and ReactDOM need to be installed first, since they are required as peer
dependencies by React Captain.

```bash
npm install react-captain
# or
yarn add react-captain
```

## Import

```typescript
import {<hookName>} from 'react-captain'
// or
import <hookName> from 'react-captain/<hookName>'
```

## Hooks overview
### [useClickOutside](https://github.com/soywod/react-captain/tree/master/lib/useClickOutside)

A click outside helper.

```typescript
const ref = useRef<HTMLElement | null>(null)
const handleClickOutside = useClickOutside(ref)

handleClickOutside(() => {
  // Clicked outside
})
```
### [useDebounce](https://github.com/soywod/react-captain/tree/master/lib/useDebounce)

A debouncer.

```typescript
type DebounceOptions = {
  delay: number    // default: 250
  persist: boolean // default: true
}

const debounce = useDebounce(options)
const handlerWithDebounce = debounce(handler)
```

### [useSparks](https://github.com/soywod/react-captain/tree/master/lib/useSparks)

Turn a HTMLElement in a particle generator.

```typescript
type Range = number | [number, number]

type SparksOptions = {
  ref: RefObject<HTMLElement>
  shapes: JSX.Element | JSX.Element[]
  velocity?: [x: Range, y: Range]     // default: [[-10, 10], [17, 23]]
  gravity?: number                    // default: 2
  quantity?: number                   // default: 20
  duration?: number                   // default: 1000
  mass?: number                       // defalut: 0.96
  wind?: [x: number, y: number]       // defalut: [0, 0]
  mode?: 'stream' | 'realtime'        // default: 'stream'
}

const [isOn, setOn] = useSparks(options)
```

### [useTimeout](https://github.com/soywod/react-captain/tree/master/lib/useTimeout)

A wrapper around `setTimeout`.

```typescript
type TimeoutOptions = {
  delay: number    // default: 250
  persist: boolean // default: true
}

const timeout = useTimeout(options)
const handlerWithTimeout = timeout(handler)
```
