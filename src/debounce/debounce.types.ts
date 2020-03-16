export type Callable = (...args: any[]) => void

type BaseDebounceOptions = {
  delay?: number
  persist?: boolean
  cancelable?: boolean
}

export type Debounce<T extends Callable> = (...params: Parameters<T>) => void
export type DebounceOptions = DebounceOptionsCancelable | DebounceOptionsNonCancelable
export type DebounceOptionsCancelable = BaseDebounceOptions & {cancelable: true}
export type DebounceOptionsNonCancelable = number | (BaseDebounceOptions & {cancelable?: false})
