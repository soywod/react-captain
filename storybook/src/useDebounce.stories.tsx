import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import useDebounce from '../../lib/useDebounce'

// ----------------------------------------------------------------- # Stories #

storiesOf('useDebounce', module).add('Default', () => {
  function Demo() {
    const debounce = useDebounce()
    const actionWithDebounce = debounce(action('Action'))

    return (
      <div>
        <button onClick={() => actionWithDebounce()}>Click me...</button>
      </div>
    )
  }

  return <Demo />
})

storiesOf('useDebounce', module).add('Persist', () => {
  function Demo() {
    const debounce = useDebounce({persist: true})
    const actionWithDebounce = debounce(action('Action'))

    return (
      <div>
        <button onClick={actionWithDebounce}>Click me...</button>
      </div>
    )
  }

  return <Demo />
})

storiesOf('useDebounce', module).add('Delay', () => {
  function Demo() {
    const debounce = useDebounce({persist: true, delay: 1000})
    const actionWithDebounce = debounce(action('Action'))

    return (
      <div>
        <button onClick={actionWithDebounce}>Click me...</button>
      </div>
    )
  }

  return <Demo />
})

storiesOf('useDebounce', module).add('Cancelable', () => {
  function Demo() {
    const debounce = useDebounce({persist: true, delay: 1000, cancelable: true})
    const [actionWithDebounce, cancel] = debounce(action('Action'))

    return (
      <div>
        <button onClick={actionWithDebounce}>Click me...</button>
        <button onClick={() => cancel()}>Clear stack</button>
      </div>
    )
  }

  return <Demo />
})
