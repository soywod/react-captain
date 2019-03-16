import React, {useRef, useState} from 'react'
import {storiesOf} from '@storybook/react'

import useSparks from '../../lib/useSparks'

// ---------------------------------------------------------- # Demo component #

function Demo() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [velocityX, setVectorX] = useState(10)
  const [velocityY, setVectorY] = useState(20)
  const [gravity, setGravity] = useState(2)
  const [quantity, setQuantity] = useState(20)
  const [duration, setDuration] = useState(1000)
  const [mass, setMass] = useState(0.96)
  const [windX, setWindX] = useState(0)
  const [windY, setWindY] = useState(0)

  useSparks({
    ref,
    velocity: [velocityX, velocityY],
    gravity,
    quantity,
    duration,
    mass,
    wind: [windX, windY],
  })

  function changeVectorX(event: React.ChangeEvent<HTMLInputElement>) {
    setVectorX(Number(event.target.value))
  }

  function changeVectorY(event: React.ChangeEvent<HTMLInputElement>) {
    setVectorY(Number(event.target.value))
  }

  function changeGravity(event: React.ChangeEvent<HTMLInputElement>) {
    setGravity(Number(event.target.value))
  }

  function changeQuantity(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(Number(event.target.value))
  }

  function changeDuration(event: React.ChangeEvent<HTMLInputElement>) {
    setDuration(Number(event.target.value))
  }

  function changeMass(event: React.ChangeEvent<HTMLInputElement>) {
    setMass(Number(event.target.value))
  }

  function changeWindX(event: React.ChangeEvent<HTMLInputElement>) {
    setWindX(Number(event.target.value))
  }

  function changeWindY(event: React.ChangeEvent<HTMLInputElement>) {
    setWindY(Number(event.target.value))
  }

  return (
    <div>
      <div
        style={{
          width: 400,
          height: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div ref={ref} style={{width: 20, height: 20, background: 'blue'}} />
      </div>

      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div>VelocityX: {velocityX}</div>
          <div>
            <input
              type="range"
              min={1}
              max={100}
              value={velocityX}
              onChange={changeVectorX}
            />
          </div>

          <div>VelocityY: {velocityY}</div>
          <div>
            <input
              type="range"
              min={-50}
              max={50}
              value={velocityY}
              onChange={changeVectorY}
            />
          </div>

          <div>Gravity: {gravity}</div>
          <div>
            <input
              type="range"
              min={0}
              max={10}
              step={0.1}
              value={gravity}
              onChange={changeGravity}
            />
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div>Quantity: {quantity}</div>
          <div>
            <input
              type="range"
              min={1}
              max={300}
              value={quantity}
              onChange={changeQuantity}
            />
          </div>

          <div>Duration: {duration}</div>
          <div>
            <input
              type="range"
              min={100}
              max={3000}
              value={duration}
              onChange={changeDuration}
            />
          </div>

          <div>Mass factor: {mass}</div>
          <div>
            <input
              type="range"
              min={0.8}
              max={1}
              step={0.01}
              value={mass}
              onChange={changeMass}
            />
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div>WindX: {windX}</div>
          <div>
            <input
              type="range"
              min={-5}
              max={5}
              step={0.1}
              value={windX}
              onChange={changeWindX}
            />
          </div>

          <div>WindY: {windY}</div>
          <div>
            <input
              type="range"
              min={-5}
              max={5}
              step={0.1}
              value={windY}
              onChange={changeWindY}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------- # Stories #

storiesOf('useSparks', module).add('Default', () => {
  return <Demo />
})
