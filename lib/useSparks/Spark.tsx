import React, {useEffect, useRef, useState} from 'react'
import range from 'lodash/range'
import random from 'lodash/random'
import last from 'lodash/last'
import {useSpring, interpolate, animated} from 'react-spring'

const SAMPLE_SIZE = 20
const DURATION = 1000

type Props = {
  origin: {x: number; y: number}
  velocity: [number, number]
  gravity: number
}

export default function(props: Props) {
  const {velocity, gravity} = props
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)

  const velocityX = random(-velocity[0], velocity[0]) * [-1, 1][random()]
  const velocityY = velocity[1]

  function generateOutputX() {
    const ratio = 0.96
    let delta = velocityX

    return range(SAMPLE_SIZE).reduce(
      output => {
        delta *= ratio
        const lastOutput = last(output) || 0
        return [...output, lastOutput + delta]
      },
      [0],
    )
  }

  function generateOutputY() {
    let delta = velocityY

    return range(SAMPLE_SIZE).reduce(
      output => {
        delta -= gravity
        const lastOutput = last(output) || 0
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

  const {x, y, opacity} = useSpring({
    from: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    x: 1,
    y: 1,
    opacity: 0,
    config: {duration: DURATION},
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
    ],
    (x, y) => `translate(${x}px, ${y}px)`,
  )

  const ref = useRef<HTMLSpanElement>(null)
  const position: 'absolute' = 'absolute'
  const display = ref.current ? 'inline-block' : 'none'

  const style = {
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
      #Yolo
    </animated.span>
  )
}
