import React, {useEffect} from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import useDebounce from '../../lib/useDebounce'

storiesOf('useDebounce', module).add('Default', () => {
  function Demo() {
    const debounce = useDebounce()
    const load = debounce(() => console.log('Loaded'))

    useEffect(() => {
      load()
    }, [load])

    return (
      <div>
        <button onClick={debounce(action('Action'))}>Click me...</button>
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
        <button onClick={actionWithDebounce}>Debounce with .persist()</button>
      </div>
    )
  }

  return <Demo />
})

storiesOf('useDebounce', module).add('Delay', () => {
  function Demo() {
    const debounceA = useDebounce(1000)
    const debounceB = useDebounce({delay: 1000})

    return (
      <div>
        <button onClick={debounceA(action('Action'))}>
          Debounce 1s via number
        </button>
        <button onClick={debounceB(action('Action'))}>
          Debounce 1s via object
        </button>
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
        <button onClick={actionWithDebounce}>1s debounce</button>
        <button onClick={cancel}>Cancel debounce</button>
      </div>
    )
  }

  return <Demo />
})
