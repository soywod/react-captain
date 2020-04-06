import {useCallback, useEffect, useState} from "react"
import {BehaviorSubject} from "rxjs"
import noop from "lodash/fp/noop"

import {UseBehaviorSubject, BehaviorSubjectFn} from "./behavior-subject.types"

const useBehaviorSubject: UseBehaviorSubject = <T>(
  subject$: BehaviorSubject<T>,
  fn?: BehaviorSubjectFn<T>,
) => {
  const callback = useCallback(fn || noop, [])
  const [val, setVal] = useState<T>(subject$.value)

  useEffect(() => {
    const subscription = subject$.subscribe(val => {
      callback(val)
      setVal(val)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [callback, subject$])

  return [val, subject$.next.bind(subject$)]
}

export default useBehaviorSubject
