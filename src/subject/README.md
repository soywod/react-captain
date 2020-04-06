# useSubject

A wrapper around
[`rxjs.Subject`](https://www.learnrxjs.io/learn-rxjs/subjects/subject).

## Installation

```bash
yarn add rxjs
```

## Definition

```typescript
type UseSubject = <T>(subject$: Subject<T>, fn: SubjectFn<T>) => void
type SubjectFn<T> = (val: T) => void
```

## Usage

```typescript
import {Subject} from "rxjs"
import {useSubject} from "react-captain"

const subject$ = new Subject<number>()

const Component: FC = () => {
  const [counter, setCounter] = useState(0)
  useSubject(subject$, counter => {
    console.log("New counter received:", counter)
    setCounter(counter)
  })

  return <button onClick={() => subject$(counter + 1)}>{counter}</button>
}
```
