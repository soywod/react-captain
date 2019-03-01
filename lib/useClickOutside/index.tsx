import {RefObject, useEffect, useState} from 'react'
import isNull from 'lodash/isNull'

// -------------------------------------------------------------------- # Hook #

export default function<T extends HTMLElement>(nextRef: RefObject<T>) {
  return (callback: () => void) => {
    const [ref, setRef] = useState(nextRef)

    useEffect(() => {
      setRef(nextRef)
      document.addEventListener('click', handleClick, {passive: true})

      return () => document.removeEventListener('click', handleClick)
    }, [nextRef.current])

    function handleClick(event: MouseEvent) {
      if (isNull(ref.current) || isNull(event.target)) {
        return
      }

      const targetRef = event.target as Node
      const isSameOrigin = ref.current.isEqualNode(targetRef)
      const containsRef = ref.current.contains(targetRef)

      if (!isSameOrigin && !containsRef) {
        callback()
      }
    }
  }
}
