import React, {RefObject, useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import isArray from 'lodash/isArray'
import isNil from 'lodash/isNil'
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

  useEffect(() => {
    if (isNil(ref.current) || !enabled) return

    const {width, height} = ref.current.getBoundingClientRect()
    const x = ref.current.offsetLeft + width * 0.5
    const y = ref.current.offsetTop + height * 0.5

    switch (mode) {
      case 'stream':
        const spark = createSpark([x, y])
        const timeout = setInterval(() => mountSparks([spark]), 1000 / quantity)
        return () => clearInterval(timeout)

      case 'chunk':
        const sparks = createSparks([x, y])
        mountSparks(sparks)
        switchOn(false)
    }
  }, [ref.current, enabled, userOptions])

  return status
}
