import React, {RefObject, useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import getOr from 'lodash/fp/getOr'
import isArray from 'lodash/fp/isArray'
import range from 'lodash/range'

import Spark from './Spark'

// ------------------------------------------------------------------- # Types #

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Range = [number, number]

type DefaultSparksOptions = {
  ref: RefObject<HTMLElement>
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
  ref: RefObject<HTMLElement>
  shapes: JSX.Element | JSX.Element[]
}

// -------------------------------------------------------------------- # Hook #

export default function(userOptions: SparksOptions) {
  const options: DefaultSparksOptions = {...defaultOptions, ...userOptions}
  const {ref, velocity, gravity, quantity, duration, mass, wind, mode} = options
  const shapes = isArray(options.shapes) ? options.shapes : [options.shapes]

  const status = useState(false)
  const [enabled, switchOn] = status

  function createSpark(origin: [number, number], key = 0) {
    return (
      <Spark
        key={key}
        origin={origin}
        shapes={shapes}
        velocity={velocity}
        gravity={gravity}
        duration={duration}
        mass={mass}
        wind={wind}
        zIndex={getOr(0, 'style.zIndex', ref.current) - 1}
      />
    )
  }

  function createSparks(origin: [number, number]) {
    return range(quantity).map(key => createSpark(origin, key))
  }

  function mountSparks(sparks: JSX.Element[]) {
    const root = document.createElement('div')

    ReactDOM.render(sparks, root, () => {
      if (ref.current) {
        const fragment = document.createDocumentFragment()
        Array.from(root.children).forEach(child => fragment.appendChild(child))
        document.body.appendChild(fragment)
      }
    })
  }

  function getOrigin(): [number, number] {
    const {top, left, width, height} = ref.current!.getBoundingClientRect()
    const x = left + width * 0.5
    const y = top + height * 0.5

    return [x, y]
  }

  useEffect(() => {
    if (!ref.current) return
    if (!enabled) return

    switch (mode) {
      case 'stream':
        const timeout = setInterval(() => {
          const origin = getOrigin()
          const spark = createSpark(origin)
          mountSparks([spark])
        }, 1000 / quantity)

        return () => clearInterval(timeout)

      case 'chunk':
        const sparks = createSparks(getOrigin())
        mountSparks(sparks)
        switchOn(false)
    }
  }, [ref.current, enabled, userOptions])

  return status
}
