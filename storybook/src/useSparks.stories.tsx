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

  useSparks({ref, velocity: [velocityX, velocityY], gravity, quantity})

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
          min={1}
          max={100}
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
    </div>
  )
}

// ----------------------------------------------------------------- # Stories #

storiesOf('useSparks', module).add('Default', () => {
  return <Demo />
})
