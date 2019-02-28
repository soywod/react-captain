# React Captain :anchor:
A collection of strongly typed and useful [React](https://reactjs.org/) [Hooks](https://reactjs.org/docs/hooks-intro.html).

<p align="right" float="right">
  <a href="https://react-captain.soywod.me" target="_blank">
    <img src="https://github.com/storybooks/brand/blob/master/badge/badge-storybook.svg" />
  </a>
</p>

## Table of contents

  - [Installation](#installation)
  - [Import](#import)
  - [List of hooks](#list-of-hooks)
    - [useDebounce](#usedebounce)

## Installation

React and ReactDOM need to be installed first, since they are required as peer
dependencies by React Captain.

```bash
npm install react-captain
yarn add react-captain
```

## Import

```typescript
import {<hookName>} from 'react-captain'
import <hookName> from 'react-captain/<hookName>'
```

## List of hooks
### useDebounce

```typescript
type DebounceOptions = {
  delay?: number // default: 250
}

const debounce = useDebounce(options)
const handlerWithDebounce = debounce(handler)
```
