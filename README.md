# React Captain :anchor:
A collection of strongly typed and useful [React](https://reactjs.org/) [Hooks](https://reactjs.org/docs/hooks-intro.html).

<p align="right">
  <a href="https://react-captain.soywod.me">
    <img src="https://github.com/storybooks/brand/blob/master/badge/badge-storybook.svg" />
  </a>
</p>

## Table of contents

  - [Installation](#installation)
  - [Import](#import)
  - [Hooks overview](#hooks-overview)
    - [useDebounce](#usedebounce)

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
### [useDebounce](https://github.com/soywod/react-captain/tree/master/lib/useDebounce)

```typescript
type DebounceOptions = {
  delay: number    // default: 250
  persist: boolean // default: true
}

const debounce = useDebounce(options)
const handlerWithDebounce = debounce(handler)
```
