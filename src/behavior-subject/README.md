# useBehaviorSubject

Wrapper around `rxjs.BehaviorSubject`.

## Installation

```bash
yarn add rxjs
```

## Definition

```typescript
type UseBehaviorSubject = <T>(subject$: BehaviorSubject<T>) => BehaviorSubjectState<T>
type BehaviorSubjectState<T> = [T, (val: T) => void]
```

## Usage

```typescript
import {BehaviorSubject} from "rxjs"
import {useBehaviorSubject} from "react-captain"
// or
import useBehaviorSubject from "react-captain/lib/behavior-subject"

const subject$ = new BehaviorSubject(0)

const Component: FC = () => {
  const [counter, setCounter] = useBehaviorSubject(subject$)
  return <button onClick={() => setCounter(counter + 1)}>{counter}</button>
}
```
