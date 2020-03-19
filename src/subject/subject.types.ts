import {Subject} from "rxjs"

/**
 * Wrapper around `rxjs.Subject`.
 *
 * @param subject The subject
 * @param fn The callback used for subscription
 * @returns void
 */
export type UseSubject = <T>(subject$: Subject<T>, fn: SubjectFn<T>) => void

/**
 * Callback used for subscription.
 *
 * @param val T
 * @returns void
 */
export type SubjectFn<T> = (val: T) => void
