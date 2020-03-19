export type Function = (...args: any[]) => void

export type TimeoutsMap = Map<string, [NodeJS.Timeout, () => void]>

export type Timeout<T extends Function> = {
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

export type TimeoutOpts =
  | number
  | {
      /**
       * Timeout delay before triggering the callback.
       * @default 300
       */
      delay?: number

      /**
       * Should keep the original event by calling `.persist()`.
       * @default false
       */
      persist?: boolean
    }
