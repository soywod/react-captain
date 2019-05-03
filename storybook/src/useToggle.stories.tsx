import React from 'react'
import {storiesOf} from '@storybook/react'

import useToggle from '../../lib/useToggle'

// ----------------------------------------------------------------- # Stories #

storiesOf('useToggle', module).add('Default', () => {
  function Demo() {
    const [toggleOn, toggle] = useToggle()

    function resetToggle() {
      toggle(false)
    }

    return (
      <div>
        <button onClick={toggle}>Switch {toggleOn ? 'ON' : 'OFF'}</button>
        <button onClick={resetToggle}>Reset toggle</button>
      </div>
    )
  }

  return <Demo />
})
