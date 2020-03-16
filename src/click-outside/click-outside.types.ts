import React from "react"

export type UseClickOutside = (params: UseClickOutsideParams) => void

export type UseClickOutsideParams = {
  ref: React.RefObject<HTMLElement>
  listener: (e: Event) => void
  listenerType?: keyof DocumentEventMap
  listenerOpts?: boolean | AddEventListenerOptions
}
