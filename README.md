# React Captain :anchor:
A collection of strongly typed and useful [React](https://reactjs.org/)
[Hooks](https://reactjs.org/docs/hooks-intro.html).

See live examples on
[![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://react-captain.soywod.me)

## Table of contents

  - [Installation](#installation)
  - [Import](#import)
  - [Main hooks overview](#main-hooks-overview)
    - [useClickOutside](#useclickoutside)
    - [useDebounce](#usedebounce)
    - [useForm](#useform)
    - [useInterval](#useinterval)
    - [useStoredState](#usestoredstate)
    - [useTimeout](#usetimeout)
  - [Misc hooks overview](#misc-hooks-overview)
    - [useSparks](#usesparks)

## Installation

```bash
yarn install react-captain

# Peer dependencies:
# yarn install react react-dom react-spring
```

## Import

```typescript
import {<hookName>} from 'react-captain'
// or
import <hookName> from 'react-captain/<hookName>'
```

## Main hooks overview
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

### [useForm](https://github.com/soywod/react-captain/tree/master/lib/useForm)

A strongly typed form composer.

```typescript
const {Form, useTextField} = useForm(defaultUser)
const TextField = useTextField(CustomTextField)

return (
  <Form onSubmit={user => console.log(user)}>
    <TextField name="firstName" label="First name" required />
    <TextField name="lastName" label="Last name" required  />
    <TextField name="email" label="Email" required fullWidth />

    <button type="submit">Submit</button>
  </Form>
)
```

### [useInterval](https://github.com/soywod/react-captain/tree/master/lib/useInterval)

A wrapper around `setInterval`.

```typescript
type IntervalOptions =
  | number                // default: 1000
  | {
    frequency?: number    // default: 1000
    autoStart?: boolean   // default: false
  }

const [enable, setEnable] = useInterval(callback, options)
```

### [useStoredState](https://github.com/soywod/react-captain/tree/master/lib/useStoredState)

A persistant useState.

```typescript
type StorageOptions =
  | string
  | {
      name: string
      driver?: 'LOCAL' | 'WEBSQL' | 'INDEXEDDB' // Default: 'LOCAL'
    }

const [value, setValue] = useStoredState(options, defaultValue)
```

### [useTimeout](https://github.com/soywod/react-captain/tree/master/lib/useTimeout)

A wrapper around `setTimeout`.

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

## Misc hooks overview
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
