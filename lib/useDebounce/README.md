# useDebounce

## Usage

```typescript
import {useDebounce} from 'react-captain'
// or
import useDebounce from 'react-captain/useDebounce'

function Demo() {
  const debounce = useDebounce()

  function handleClick(event: React.MouseEvent) {
    console.log('Clicked!')
  }

  return (
    <button onClick={debounce(handleClick)}>
      Click me...
    </div>
  )
}
```

## Signature

```typescript
useDebounce(options?: Partial<DebounceOptions>): (debounce((params: T) => K): (params: T) => K)

type DebounceOptions = {
  delay: number // default: 250
}

```
