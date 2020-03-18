# React Captain [![Build Status](https://travis-ci.org/soywod/react-captain.svg?branch=master)](https://travis-ci.org/soywod/react-captain) [![codecov](https://codecov.io/gh/soywod/react-captain/branch/master/graph/badge.svg)](https://codecov.io/gh/soywod/react-captain)

A collection of strongly typed React hooks and contexts.

*Live demo at https://react-captain.soywod.me.*

## Table of contents

  - [Installation](#installation)
  - [Hooks overview](#hooks-overview)
    - [Click outside](#clickoutside)
    - [Toggle](#toggle)
    - [Debounce](#debounce)
    - [Stored state](#storedstate)
  - [Examples](#examples)
  - [Development](#development)
  - [Tests](#tests)
    - [Unit tests](#unittests)
    - [End-to-end tests](#end-to-endtests)
  - [Changelog](#changelog)

## Installation

```bash
yarn add react-captain
# or
npm install react-captain
```

## Hooks overview
### [Click outside](https://github.com/soywod/react-captain/tree/master/src/click-outside)

Capture click event outside of the given HTMLElement.

```typescript
import {useClickOutside} from 'react-captain'

const Component: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  useClickOutside(ref, () => console.log("Clicked outside!"))

  return (
    <div ref={ref}>
      Click outside
    </div>
  )
}
```

### [Toggle](https://github.com/soywod/react-captain/tree/master/src/toggle)

A `useState` for booleans.

```typescript
import {useToggle} from 'react-captain'

const Component: FC = () => {
  const [isOn, toggle] = useToggle(false)

  return (
    <div>
      <button onClick={toggle}>
        Switch status: {isOn ? 'ON' : 'OFF'}
      </button>
      <button onClick={() => toggle(false)}>
        Reset toggle
      </button>
    </div>
  )
}
```

### [Debounce](https://github.com/soywod/react-captain/tree/master/src/debounce)

Add debounce to a handler.

```typescript
import {useDebounce} from "react-captain"

function Component() {
  const debounce = useDebounce()
  const handler = debounce(() => console.log("Hello!"))

  return (
    <>
      <button onClick={handler}>
        Say hello with delay
      </button>
      <button onClick={handler.abort}>
        Abort
      </button>
      <button onClick={handler.terminate}>
        Terminate
      </button>
    </>
  )
}
```

### [Stored state](https://github.com/soywod/react-captain/tree/master/src/stored-state)

A persistant useState, based on React's `useState` and
[localForage](https://github.com/localForage/localForage). Drivers supported:
localStorage, WebSQL and IndexedDB.

```typescript
import {useStoredState} from 'react-captain'

function Component() {
  const [value, setValue] = useStoredState("storage-key", "Default value")

  return (
    <button onClick={() => setValue("Value changed!")}>
      {String(value)}
    </button>
  )
}
```

## Examples

See the [live demo](https://react-captain.soywod.me).

## Development

```bash
git clone https://github.com/soywod/react-captain.git
cd react-captain
yarn install
```

To start the development server:

```bash
yarn start
```

To build the lib:

```bash
yarn build
```

To build the demo:

```bash
yarn build:demo
```

## Tests
### Unit tests

Unit tests are handled by [Jest](https://jestjs.io/) (`.test` files) and
[Enzyme](https://airbnb.io/enzyme/) (`.spec` files).

```bash
yarn test:unit
```

### End-to-end tests

End-to-end tests are handled by [Cypress](https://www.cypress.io) (`.e2e`
files).

```bash
yarn start
yarn test:e2e
```

## Changelog

See [CHANGELOG.md](https://github.com/soywod/react-captain/blob/master/CHANGELOG.md).

## License

[MIT](https://github.com/soywod/react-captain/blob/master/LICENSE) -
Copyright (c) 2019 Clément DOUIN.
