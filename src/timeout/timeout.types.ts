export type Function = (...args: any[]) => void

/**
 * Wrapper around `setTimeout`.
 *
 * @param   fn    Timed out function
 * @param   opts  Timeout options
 * @returns       Timed out function wrapper
 */
export type UseTimeout = <T extends Function>(
  fn: T,
  opts?: number | Partial<TimeoutOpts>,
) => Timeout<T>

export type TimeoutOpts = {
  /**
   * Timeout delay before triggering the callback.
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

export type TimeoutsMap = Map<string, [NodeJS.Timeout, () => void]>

export const defaultOpts: TimeoutOpts = {
  delay: 300,
  persist: false,
}
