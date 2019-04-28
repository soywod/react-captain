type DefaultIntervalOptions = {
  frequency: number
  autoStart: boolean
}

export type IntervalCallback = () => void
export type IntervalOptions = number | Partial<DefaultIntervalOptions>
