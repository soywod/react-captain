# useSubject

Wrapper around `rxjs.Subject`.

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
import useSubject from "react-captain/subject"

const subject$ = new Subject<number>()

const Component: FC = () => {
  const [counter, setCounter] = useState(0)
  useSubject(subject$, setCounter)
  return <button onClick={() => subject$(counter + 1)}>{counter}</button>
}
```
