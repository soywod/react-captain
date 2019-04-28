import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import useInterval from '../../lib/useInterval'

storiesOf('useInterval', module).add('Default', () => {
  function Demo() {
    const [interval, enableInterval] = useInterval(action('Tick every 1s'))

    return interval ? (
      <div>
        <button onClick={() => enableInterval(false)}>Stop</button>
      </div>
    ) : (
      <div>
        <button onClick={() => enableInterval(true)}>Start</button>
      </div>
    )
  }

  return <Demo />
})

storiesOf('useInterval', module).add('Custom frequency', () => {
  function Demo() {
    const [interval, enableInterval] = useInterval(
      action('Tick every 500ms'),
      500,
    )

    return interval ? (
      <div>
        <button onClick={() => enableInterval(false)}>Stop</button>
      </div>
    ) : (
      <div>
        <button onClick={() => enableInterval(true)}>Start</button>
      </div>
    )
  }

  return <Demo />
})

storiesOf('useInterval', module).add('Custom autoStart', () => {
  function Demo() {
    const [interval, enableInterval] = useInterval(
      action('Tick every 1s auto started'),
      {
        autoStart: true,
      },
    )

    return interval ? (
      <div>
        <button onClick={() => enableInterval(false)}>Stop</button>
      </div>
    ) : (
      <div>
        <button onClick={() => enableInterval(true)}>Start</button>
      </div>
    )
  }

  return <Demo />
})
