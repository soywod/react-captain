import {BehaviorSubject} from "rxjs"

/**
 * Wrapper around `rxjs.BehaviorSubject`.
 *
 * @param   subject$              The subject
 * @returns BehaviorSubjectState
 */
export type UseBehaviorSubject = <T>(subject$: BehaviorSubject<T>) => BehaviorSubjectState<T>
export type BehaviorSubjectState<T> = [T, (val: T) => void]
