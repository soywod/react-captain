import React, {CSSProperties, RefObject} from 'react'
import {useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import getOr from 'lodash/fp/getOr'
import isArray from 'lodash/fp/isArray'
import range from 'lodash/range'

import Spark from './Spark'

// ------------------------------------------------------------------- # Types #

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Range = [number, number]

type DefaultSparksOptions = {
  ref: RefObject<HTMLElement> | [number, number]
  shapes: JSX.Element | JSX.Element[]
  velocity: [number | Range, number | Range]
  gravity: number
  quantity: number
  duration: number
  mass: number
  wind: [number, number]
  mode: 'chunk' | 'stream'
}

export const defaultOptions: Omit<DefaultSparksOptions, 'ref' | 'shapes'> = {
  velocity: [[-10, 10], [17, 23]],
  gravity: 2,
  quantity: 10,
  duration: 1000,
  mass: 0.96,
  wind: [0, 0],
  mode: 'chunk',
}

type SparksOptions = Partial<DefaultSparksOptions> & {
  ref: RefObject<HTMLElement> | [number, number]
  shapes: JSX.Element | JSX.Element[]
}

// -------------------------------------------------------------------- # Hook #

export default function(userOptions: SparksOptions) {
  const options: DefaultSparksOptions = {...defaultOptions, ...userOptions}
  const shapes = isArray(options.shapes) ? options.shapes : [options.shapes]

  const {quantity} = options
  const optionsRef = useRef(options)
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const status = useState(false)
  const [enabled, switchOn] = status

  function createSpark(key = 0) {
    const style: CSSProperties = {
      zIndex: getOr(1, 'current.style.zIndex', options.ref) - 1,
      position: isArray(options.ref) ? 'fixed' : 'absolute',
    }

    return (
      <Spark
        key={key}
        origin={getOrigin()}
        shapes={shapes}
        velocity={optionsRef.current.velocity}
        gravity={optionsRef.current.gravity}
        duration={optionsRef.current.duration}
        mass={optionsRef.current.mass}
        wind={optionsRef.current.wind}
        style={style}
      />
    )
  }

  function createSparks() {
    return range(optionsRef.current.quantity).map(createSpark)
  }

  function mountSparks(sparks: JSX.Element[]) {
    const root = document.createElement('div')

    ReactDOM.render(sparks, root, () => {
      const fragment = document.createDocumentFragment()
      Array.from(root.children).forEach(child => fragment.appendChild(child))
      document.body.appendChild(fragment)
    })
  }

  function getOrigin(): [number, number] {
    const {ref} = optionsRef.current
    if (isArray(ref)) return ref
    const {top, left, width, height} = ref.current!.getBoundingClientRect()
    return [left + width * 0.5, top + height * 0.5]
  }

  useEffect(() => {
    return () => clearIntervalSafe(timeout.current)
  }, [])

  useEffect(() => {
    optionsRef.current = {...defaultOptions, ...userOptions}
  }, [userOptions])

  useEffect(() => {
    clearIntervalSafe(timeout.current)
    if (!enabled) return

    switch (optionsRef.current.mode) {
      case 'stream':
        timeout.current = setInterval(() => {
          const spark = createSpark()
          mountSparks([spark])
        }, 1000 / quantity)
        break

      case 'chunk':
        const sparks = createSparks()
        mountSparks(sparks)
        switchOn(false)
        break
    }
  }, [enabled, quantity])

  /* useEffect(() => { */
  /*   if (!enabled) return */

  /*   switch (mode) { */
  /*     case 'stream': */
  /*       const timeout = setInterval(() => { */
  /*         const spark = createSpark(getOrigin()) */
  /*         mountSparks([spark]) */
  /*       }, 1000 / quantity) */

  /*       return () => clearInterval(timeout) */

  /*     case 'chunk': */
  /*       const sparks = createSparks(getOrigin()) */
  /*       mountSparks(sparks) */
  /*       switchOn(false) */
  /*   } */
  /* }, [enabled, userOptions]) */

  return status
}

function clearIntervalSafe(timeout: NodeJS.Timeout | null) {
  if (timeout) {
    clearInterval(timeout)
  }
}
