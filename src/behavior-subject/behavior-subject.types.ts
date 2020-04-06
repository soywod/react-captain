import {BehaviorSubject} from "rxjs"

/**
 * Wrapper around `rxjs.BehaviorSubject`.
 *
 * @param   subject$  The behavior subject
 * @param   fn        The callback
 * @returns BehaviorSubjectState
 */
export type UseBehaviorSubject = <T>(
  subject$: BehaviorSubject<T>,
  fn?: BehaviorSubjectFn<T>,
) => BehaviorSubjectState<T>

export type BehaviorSubjectState<T> = [T, BehaviorSubjectFn<T>]

/**
 * Callback used for subscription.
 *
 * @param val T
 * @returns void
 */
export type BehaviorSubjectFn<T> = (val: T) => void
