import {useEffect, useState} from "react"
import {BehaviorSubject} from "rxjs"

import {UseBehaviorSubject} from "./behavior-subject.types"

const useBehaviorSubject: UseBehaviorSubject = <T>(subject$: BehaviorSubject<T>) => {
  const [val, setVal] = useState<T>(subject$.value)

  function next(val: T) {
    subject$.next(val)
  }

  useEffect(() => {
    const subscription = subject$.subscribe(setVal)
    return () => subscription.unsubscribe()
  }, [subject$])

  return [val, next]
}

export default useBehaviorSubject
