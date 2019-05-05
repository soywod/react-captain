import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import useInterval from '../../lib/useInterval'

storiesOf('useInterval', module).add('Default', () => {
  function Demo() {
    const [toggleOn, toggle] = useInterval(action('Tick every 1s'))

    return (
      <div>
        <button onClick={toggle}>{toggleOn ? 'Stop' : 'Start'}</button>
      </div>
    )
  }

  return <Demo />
})

storiesOf('useInterval', module).add('Custom delay', () => {
  function Demo() {
    const [toggleOn, toggle] = useInterval(action('Tick every 500ms'), 500)

    return (
      <div>
        <button onClick={toggle}>{toggleOn ? 'Stop' : 'Start'}</button>
      </div>
    )
  }

  return <Demo />
})

storiesOf('useInterval', module).add('Custom autoStart', () => {
  function Demo() {
    const [toggleOn, toggle] = useInterval(
      action('Tick every 1s auto started'),
      {
        autoStart: true,
      },
    )

    return (
      <div>
        <button onClick={toggle}>{toggleOn ? 'Stop' : 'Start'}</button>
      </div>
    )
  }

  return <Demo />
})
