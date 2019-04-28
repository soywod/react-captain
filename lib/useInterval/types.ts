export type Callback = () => void

export type DefaultIntervalOptions = {
  frequency: number
  autoStart: boolean
}

export type IntervalOptions = number | Partial<DefaultIntervalOptions>
