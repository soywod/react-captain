import {useCallback, useEffect} from "react"
import {Subject} from "rxjs"

import {UseSubject, SubjectFn} from "./subject.types"

const useSubject: UseSubject = <T>(subject: Subject<T>, fn: SubjectFn<T>) => {
  const callback = useCallback(fn, [])

  useEffect(() => {
    const subscription = subject.subscribe(callback)
    return () => subscription.unsubscribe()
  }, [callback, subject])
}

export default useSubject
