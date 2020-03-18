export type Function = (...args: any[]) => void

export type Debounce<T extends Function> = {
  (...params: Parameters<T>): void

  /**
   * Abort the debounce.
   */
  abort: () => void

  /**
   * Abort the debounce and trigger immediatly the callback.
   */
  terminate: () => void
}

export type DebounceOpts =
  | number
  | {
      /**
       * Debounce delay before triggering the callback.
       * @default 300
       */
      delay?: number

      /**
       * Should keep the original event by calling `.persist()`.
       * @default false
       */
      persist?: boolean
    }
