export type Function = (...args: any[]) => void

/**
 * Add debounce to a handler.
 *
 * @param   fn    Debounced function
 * @param   opts  Debounce options
 * @returns       The handler wrapped
 */
export type UseDebounce = <T extends Function>(
  fn: T,
  opts?: number | Partial<DebounceOpts>,
) => Debounce<T>

export type DebounceOpts = {
  /**
   * Debounce delay before triggering the handler.
   *
   * @default 300
   */
  delay: number

  /**
   * Should keep the original event by calling `.persist()`.
   *
   * @default false
   */
  persist: boolean
}

export type Debounce<T extends Function> = {
  (...params: Parameters<T>): void

  /**
   * Abort the debounce.
   */
  abort: () => void

  /**
   * Abort the debounce and trigger immediatly the handler.
   */
  terminate: () => void
}

export const defaultOpts: DebounceOpts = {
  delay: 300,
  persist: false,
}
