import React, {RefObject, useEffect} from 'react'
import ReactDOM from 'react-dom'
import isArray from 'lodash/isArray'

import Spark from './Spark'

// ------------------------------------------------------------------- # Types #

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type SparksOptions = {
  ref: RefObject<HTMLElement>
  shapes: JSX.Element | JSX.Element[]
  velocity?: [number, number]
  gravity?: number
  quantity?: number
  duration?: number
  mass?: number
  wind?: [number, number]
}

type SparksOptionsFull = {
  ref: RefObject<HTMLElement>
  shapes: JSX.Element | JSX.Element[]
  velocity: [number, number]
  gravity: number
  quantity: number
  duration: number
  mass: number
  wind: [number, number]
}

export const defaultOptions: Omit<SparksOptionsFull, 'ref' | 'shapes'> = {
  velocity: [10, 20],
  gravity: 2,
  quantity: 20,
  duration: 1000,
  mass: 0.96,
  wind: [0, 0],
}

// -------------------------------------------------------------------- # Hook #

export default function(userOptions: SparksOptions) {
  const options: SparksOptionsFull = {...defaultOptions, ...userOptions}
  const {ref, velocity, gravity, quantity, duration, mass, wind} = options
  const shapes = isArray(options.shapes) ? options.shapes : [options.shapes]

  useEffect(() => {
    if (!ref.current) return

    const {width, height} = ref.current.getBoundingClientRect()
    const x = ref.current.offsetLeft + width / 2
    const y = ref.current.offsetTop + height / 2

    const timeout = setInterval(() => {
      const mount = document.createElement('div')
      ReactDOM.render(
        <Spark
          origin={{x, y}}
          shapes={shapes}
          velocity={velocity}
          gravity={gravity}
          duration={duration}
          mass={mass}
          wind={wind}
        />,
        mount,
      )

      if (ref.current && mount.firstChild) {
        document.body.appendChild(mount.firstChild)
      }
    }, 2000 / quantity)

    return () => clearInterval(timeout)
  }, [ref.current, userOptions])
}
