import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import useTimeout from '../../lib/useTimeout'

// ----------------------------------------------------------------- # Stories #

storiesOf('useTimeout', module).add('Default', () => {
  function Demo() {
    const timeout = useTimeout()
    const actionWithTimeout = timeout(action('Action'))

    return (
      <div>
        <button onClick={() => actionWithTimeout()}>Click me...</button>
      </div>
    )
  }

  return <Demo />
})

storiesOf('useTimeout', module).add('Persist', () => {
  function Demo() {
    const timeout = useTimeout({persist: true})
    const actionWithTimeout = timeout(action('Action'))

    return (
      <div>
        <button onClick={actionWithTimeout}>Click me...</button>
      </div>
    )
  }

  return <Demo />
})

storiesOf('useTimeout', module).add('Delay', () => {
  function Demo() {
    const timeout = useTimeout({persist: true, delay: 1000})
    const actionWithTimeout = timeout(action('Action'))

    return (
      <div>
        <button onClick={actionWithTimeout}>Click me...</button>
      </div>
    )
  }

  return <Demo />
})

storiesOf('useTimeout', module).add('Cancelable', () => {
  function Demo() {
    const timeout = useTimeout({persist: true, delay: 1000, cancelable: true})
    const [actionWithTimeout, cancel] = timeout(action('Action'))

    return (
      <div>
        <button onClick={actionWithTimeout}>Click me...</button>
        <button onClick={() => cancel()}>Clear stack</button>
      </div>
    )
  }

  return <Demo />
})
