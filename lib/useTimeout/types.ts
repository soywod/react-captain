import {Callback} from '../utils'

export type Timeouts = Map<String, NodeJS.Timeout>

type BaseTimeoutOptions = {
  delay?: number
  persist?: boolean
  cancelable?: boolean
}

export type TimeoutOptionsCancelable = BaseTimeoutOptions & {
  cancelable: true
}

export type TimeoutOptionsNonCancelable =
  | number
  | BaseTimeoutOptions & {cancelable?: false}

export type TimeoutOptions =
  | TimeoutOptionsCancelable
  | TimeoutOptionsNonCancelable

export type Timeout<T extends Callback> = (...params: Parameters<T>) => void
