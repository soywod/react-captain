import {Callback} from '../utils'

type BaseDebounceOptions = {
  delay?: number
  persist?: boolean
  cancelable?: boolean
}

export type DebounceOptionsCancelable = BaseDebounceOptions & {
  cancelable: true
}

export type DebounceOptionsNonCancelable =
  | number
  | BaseDebounceOptions & {cancelable?: false}

export type DebounceOptions =
  | DebounceOptionsCancelable
  | DebounceOptionsNonCancelable

export type Debounce<T extends Callback> = (...params: Parameters<T>) => void
