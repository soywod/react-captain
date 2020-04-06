# useBehaviorSubject

A wrapper around
[`rxjs.BehaviorSubject`](https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject).

## Definition

```typescript
type UseBehaviorSubject = <T>(
  subject$: BehaviorSubject<T>,
  fn?: BehaviorSubjectFn<T>,
) => BehaviorSubjectState<T>

type BehaviorSubjectState<T> = [T, BehaviorSubjectFn<T>]
type BehaviorSubjectFn<T> = (val: T) => void
```

## Usage

```typescript
import {BehaviorSubject} from "rxjs"
import {useBehaviorSubject} from "react-captain"

const subject$ = new BehaviorSubject(0)

const Component: FC = () => {
  const [counter, setCounter] = useBehaviorSubject(subject$, counter => {
    console.log("New counter received:", counter)
  })

  return <button onClick={() => setCounter(counter + 1)}>{counter}</button>
}
```
