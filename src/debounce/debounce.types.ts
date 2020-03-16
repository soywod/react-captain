export type Callable = (...args: any[]) => void

type BaseDebounceOptions = {
  delay?: number
  persist?: boolean
  cancelable?: boolean
}

export type Debounce<T extends Callable> = (...params: Parameters<T>) => void
export type DebounceOpts = DebounceOptsCancelable | DebounceOptsNonCancelable
export type DebounceOptsCancelable = BaseDebounceOptions & {cancelable: true}
export type DebounceOptsNonCancelable = number | (BaseDebounceOptions & {cancelable?: false})
