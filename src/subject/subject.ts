import {useEffect} from "react"
import {Subject} from "rxjs"

import {UseSubject, SubjectFn} from "./subject.types"

const useSubject: UseSubject = <T>(subject: Subject<T>, fn: SubjectFn<T>) => {
  useEffect(() => {
    const subscription = subject.subscribe(fn)
    return () => subscription.unsubscribe()
  }, [fn, subject])
}

export default useSubject
