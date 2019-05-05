import {RefObject, useEffect} from 'react'
import isNil from 'lodash/fp/isNil'

import {ClickOutsideCallback} from './types'

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: ClickOutsideCallback,
): void

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
): (callback: ClickOutsideCallback) => void

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  callbackA?: ClickOutsideCallback | null,
) {
  if (isNil(callbackA)) {
    return (callbackB: ClickOutsideCallback) => {
      useInternalClickOutside(ref, callbackB)
    }
  }

  useInternalClickOutside(ref, callbackA)
}

function useInternalClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: ClickOutsideCallback,
) {
  function handleClick(event: MouseEvent) {
    if (isNil(ref.current)) return
    if (isNil(event.target)) return

    const target = event.target as Node
    const isSameOrigin = ref.current.isEqualNode(target)
    const containsRef = ref.current.contains(target)

    if (!isSameOrigin && !containsRef) {
      callback(event)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick, {passive: true})
    return () => document.removeEventListener('click', handleClick, false)
  }, [ref.current])
}

export default useClickOutside
