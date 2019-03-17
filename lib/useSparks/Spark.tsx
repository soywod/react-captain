import React, {useEffect, useRef, useState} from 'react'
import range from 'lodash/range'
import isArray from 'lodash/isArray'
import random from 'lodash/random'
import last from 'lodash/last'
import {useSpring, interpolate, animated} from 'react-spring'

const SAMPLE_SIZE = 20

type Range = number | [number, number]
type Props = {
  origin: {x: number; y: number}
  shapes: JSX.Element[]
  velocity: [Range, Range]
  gravity: number
  duration: number
  mass: number
  wind: [number, number]
}

export default function(props: Props) {
  const {velocity, gravity, duration, mass, wind, shapes} = props
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)

  const velocityX = isArray(velocity[0]) ? random(...velocity[0]) : velocity[0]
  const velocityY = isArray(velocity[1]) ? random(...velocity[1]) : velocity[1]
  const direction = velocityX / Math.abs(velocityX)

  function generateOutputX() {
    let delta = velocityX

    return range(SAMPLE_SIZE).reduce(
      output => {
        delta *= mass
        delta -= wind[0]
        const lastOutput = Number(last(output))
        return [...output, lastOutput + delta]
      },
      [0],
    )
  }

  function generateOutputY() {
    let delta = velocityY

    return range(SAMPLE_SIZE).reduce(
      output => {
        delta -= gravity + wind[1]
        const lastOutput = Number(last(output))
        return [...output, lastOutput - delta]
      },
      [0],
    )
  }

  function generateRange() {
    const delta = 1 / SAMPLE_SIZE
    const initialRange: number[] = []

    const midRange = range(SAMPLE_SIZE - 1).reduce(
      (output, val) => [...output, (val + 1) * delta],
      initialRange,
    )

    return [0, ...midRange, 1]
  }

  const {x, y, z, opacity} = useSpring({
    from: {
      x: 0,
      y: 0,
      z: 0,
      opacity: 1,
    },
    x: 1,
    y: 1,
    z: 40,
    opacity: 0,
    config: {duration},
    onRest: () => {
      if (ref.current && ref.current.remove) {
        ref.current.remove()
      }
    },
  })

  const transform = interpolate(
    [
      x.interpolate({
        range: generateRange(),
        output: generateOutputX(),
      }),
      y.interpolate({
        range: generateRange(),
        output: generateOutputY(),
      }),
      z.interpolate({
        range: [0, 1],
        output: [0, random(0, 15)],
      }),
    ],
    (x, y, z) => `translate(${x}px, ${y}px) rotateZ(${z * direction}deg)`,
  )

  const ref = useRef<HTMLSpanElement>(null)
  const position: 'absolute' = 'absolute'
  const pointerEvents: 'none' = 'none'
  const display = ref.current ? 'inline-block' : 'none'

  const style = {
    pointerEvents,
    position,
    left,
    top,
    display,
    opacity,
    transform,
  }

  useEffect(() => {
    if (ref.current) {
      const {width, height} = ref.current.getBoundingClientRect()
      setLeft(props.origin.x - width / 2)
      setTop(props.origin.y - height / 2)
    }
  }, [ref.current])

  return (
    <animated.span ref={ref} style={style}>
      {shapes[random(0, shapes.length - 1)]}
    </animated.span>
  )
}
