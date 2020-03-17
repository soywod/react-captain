import React from "react"

/**
 * @param ref       Reference to the element
 * @param listener  Callback called on ref click outside
 * @param opts      Options
 */
export type ClickOutside = (
  ref: React.RefObject<Node>,
  listener: ClickOutsideListener,
  opts?: Partial<ClickOutsideOpts>,
) => void

export type ClickOutsideListener = (evt: Event) => void

export type ClickOutsideOpts = {
  /**
   * Highest parent where the listener will be attached to.
   * @default document
   */
  root: React.RefObject<Node>

  /**
   * Blacklisted elements that will not trigger any event.
   * @default []
   */
  except: React.RefObject<Node>[]

  /**
   * Listener event type.
   * @default "click"
   */
  listenerType: keyof DocumentEventMap

  /**
   * Listener options.
   * @default {passive: true}
   */
  listenerOpts: boolean | AddEventListenerOptions
}

export const defaultOpts: ClickOutsideOpts = {
  root: {current: null},
  except: [],
  listenerType: "click",
  listenerOpts: {passive: true},
}
