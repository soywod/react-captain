import React, {useState} from 'react'
import {storiesOf} from '@storybook/react'

import useStoredState from '../../lib/useStoredState'

// ----------------------------------------------------------------- # Stories #

storiesOf('useStoredState', module).add('Default', () => {
  function Demo() {
    const [string, setString] = useStoredState<string>('string')
    const [number, setNumber] = useStoredState<number>('number')
    const [object, setObject] = useStoredState<{value: number}>('object')

    function reset() {
      setString(null)
      setNumber(null)
      setObject(null)
    }

    return (
      <table>
        <tr>
          <td>String</td>
          <td>
            <input
              onChange={event => setString(event.currentTarget.value)}
              value={string || ''}
            />
          </td>
        </tr>
        <tr>
          <td>Number</td>
          <td>
            <button onClick={() => setNumber(Number(number) - 1)}>-</button>
            <span> {number} </span>
            <button onClick={() => setNumber(Number(number) + 1)}>+</button>
          </td>
        </tr>
        <tr>
          <td>Object</td>
          <td>
            <button onClick={() => setObject({value: Math.random()})}>
              Generate object
            </button>
            <span> {JSON.stringify(object)}</span>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <button onClick={reset}>Reset</button>
          </td>
        </tr>
      </table>
    )
  }

  return <Demo />
})

storiesOf('useStoredState', module).add('With default', () => {
  function Demo() {
    const [string, setString] = useStoredState('string default', 'default')
    const [number, setNumber] = useStoredState('number default', -1)
    const [object, setObject] = useStoredState('object default', {value: 0})

    function reset() {
      setString(null)
      setNumber(null)
      setObject(null)
    }

    return (
      <table>
        <tr>
          <td>String</td>
          <td>
            <input
              onChange={event => setString(event.currentTarget.value)}
              value={string || ''}
            />
          </td>
        </tr>
        <tr>
          <td>Number</td>
          <td>
            <button onClick={() => setNumber(Number(number) - 1)}>-</button>
            <span> {number} </span>
            <button onClick={() => setNumber(Number(number) + 1)}>+</button>
          </td>
        </tr>
        <tr>
          <td>Object</td>
          <td>
            <button onClick={() => setObject({value: Math.random()})}>
              Generate object
            </button>
            <span> {JSON.stringify(object)}</span>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <button onClick={reset}>Reset</button>
          </td>
        </tr>
      </table>
    )
  }

  return <Demo />
})
