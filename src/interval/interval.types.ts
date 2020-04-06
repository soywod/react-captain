import {ToggleState} from "../toggle"

/**
 * A wrapper around `useInterval`.
 *
 * @param   fn    Interval handler
 * @param   opts  Interval options
 * @returns       A toggle state
 */
export type UseInterval = (fn: IntervalFn, opts?: number | Partial<IntervalOpts>) => ToggleState

export type IntervalFn = () => void
export type IntervalOpts = {
  /**
   * `setInterval` delay.
   *
   * @default 1000
   */
  delay: number

  /**
   * Should start the interval on mount.
   *
   * @default false
   */
  autoStart: boolean
}

export const defaultOpts: IntervalOpts = {
  delay: 1000,
  autoStart: false,
}
