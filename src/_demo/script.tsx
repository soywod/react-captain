import React, {FC, useRef, useState} from "react"
import ReactDOM from "react-dom"

import useClickOutside from "../click-outside"
import useDebounce from "../debounce"
import useTimeout from "../timeout"
import useStoredState from "../stored-state"
import useToggle from "../toggle"

const Demo: FC = () => {
  const debounce = useDebounce(1000)
  const timeout = useTimeout(1000)
  const sayHelloWithDebounce = debounce(() => alert("Hello!"))
  const sayHelloWithTimeout = timeout(() => alert("Hello!"))

  const clickOutsideRootRef = useRef<HTMLDivElement | null>(null)
  const clickOutsideRejectedRef = useRef<HTMLDivElement | null>(null)
  const clickOutsideRef = useRef<HTMLDivElement | null>(null)
  const [clickedOutside, clickOutside] = useState(false)
  const debounceClickOutside = debounce(clickOutside)
  useClickOutside(
    clickOutsideRef,
    () => {
      clickOutside(true)
      debounceClickOutside(false)
    },
    {root: clickOutsideRootRef, except: [clickOutsideRejectedRef]},
  )

  const [isOn, toggle] = useToggle()

  const storedStateRef = useRef<HTMLInputElement>(null)
  const [storedValue, setStoredValue] = useStoredState("key", "value")

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          React Captain
        </a>
        <ul className="navbar-nav mr-auto" />
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a
              className="nav-link"
              href="https://github.com/soywod/react-captain"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>

      <div className="jumbotron">
        <div className="container text-center">
          <h1 className="display-3">React Captain</h1>
          <p className="lead">A collection of strongly typed React hooks and contexts.</p>
          <div className="mb-4">
            <a className="mr-2" href="https://travis-ci.org/soywod/react-captain">
              <img src="https://travis-ci.org/soywod/react-captain.svg?branch=master" alt="" />
            </a>
            <a className="mr-2" href="https://codecov.io/gh/soywod/react-captain">
              <img
                src="https://codecov.io/gh/soywod/react-captain/branch/master/graph/badge.svg"
                alt=""
              />
            </a>
            <a className="mr-2" href="https://www.npmjs.com/package/react-captain">
              <img src="https://img.shields.io/npm/v/react-captain?label=npm" alt="" />
            </a>
            <kbd>$ yarn add react-captain</kbd>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row">
          <div className="col-sm-6 mb-4">
            <h2 className="display-5 mb-4">useClickOutside</h2>
            <div
              ref={clickOutsideRootRef}
              style={{width: 300, height: 300, background: "blue", cursor: "pointer"}}
            >
              <div style={{width: 200, height: 200, background: "green", cursor: "pointer"}}>
                <div
                  ref={clickOutsideRef}
                  style={{
                    width: 100,
                    height: 100,
                    background: "yellow",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "default",
                  }}
                >
                  Click outside
                </div>
              </div>
              <div
                ref={clickOutsideRejectedRef}
                style={{
                  width: 100,
                  height: 100,
                  background: "gray",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "not-allowed",
                }}
              >
                Except here
              </div>
            </div>
            {clickedOutside && (
              <span className="badge badge-pill badge-secondary">Clicked outside!</span>
            )}
          </div>
          <div className="col-sm-6">
            <h4>Definition</h4>
            <pre>
              <code>
                {`
type ClickOutside = (
  ref: React.RefObject<Node>,
  listener: ClickOutsideListener,
  opts?: Partial<ClickOutsideOpts>,
) => void

type ClickOutsideListener = (evt: Event) => void
type ClickOutsideOpts = {
  root: React.RefObject<Node>
  except: React.RefObject<Node>[]
  listenerType: keyof DocumentEventMap
  listenerOpts: boolean | AddEventListenerOptions
}
                `}
              </code>
            </pre>
            <h4>Usage</h4>
            <pre>
              <code>
                {`
const ref = useRef<HTMLDivElement | null>(null)
useClickOutside(ref, () => console.log("Clicked outside!"))
                `}
              </code>
            </pre>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-sm-6 mb-4">
            <h2 className="display-5 mb-4">useDebounce</h2>
            <button onClick={sayHelloWithDebounce}>Say hello after 1000ms</button>
            <button onClick={sayHelloWithDebounce.abort}>Abort</button>
            <button onClick={sayHelloWithDebounce.terminate}>Terminate</button>
          </div>
          <div className="col-sm-6">
            <h4>Definition</h4>
            <pre>
              <code>
                {`
type Debounce<T extends Function> = {
  (...params: Parameters<T>): void
  abort: () => void
  terminate: () => void
}

type DebounceOpts =
  | number
  | {
      delay?: number
      persist?: boolean
    }
                `}
              </code>
            </pre>
            <h4>Usage</h4>
            <pre>
              <code>
                {`
const debounce = useDebounce()
const handler = debounce(() => console.log("Hello!"))

<button onClick={handler}>
  Say hello with delay
</button>
<button onClick={handler.abort}>
  Abort
</button>
<button onClick={handler.terminate}>
  Terminate
</button>
                `}
              </code>
            </pre>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-sm-6 mb-4">
            <h2 className="display-5 mb-4">useTimeout</h2>
            <button onClick={sayHelloWithTimeout}>Say hello after 1000ms</button>
            <button onClick={sayHelloWithTimeout.abort}>Abort</button>
            <button onClick={sayHelloWithTimeout.terminate}>Terminate</button>
          </div>
          <div className="col-sm-6">
            <h4>Definition</h4>
            <pre>
              <code>
                {`
type Timeout<T extends Function> = {
  (...params: Parameters<T>): void
  abort: () => void
  terminate: () => void
}

type TimeoutOpts =
  | number
  | {
      delay?: number
      persist?: boolean
    }
                `}
              </code>
            </pre>
            <h4>Usage</h4>
            <pre>
              <code>
                {`
const timeout = useTimeout()
const handler = timeout(() => console.log("Hello!"))

<button onClick={handler}>
  Say hello with delay
</button>
<button onClick={handler.abort}>
  Abort
</button>
<button onClick={handler.terminate}>
  Terminate
</button>
                `}
              </code>
            </pre>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-sm-6 mb-4">
            <h2 className="display-5 mb-4">useStoredState</h2>
            <form
              onSubmit={evt => {
                evt.preventDefault()
                storedStateRef.current && setStoredValue(storedStateRef.current.value)
              }}
            >
              <input ref={storedStateRef} type="text" placeholder="New value" />
              <button type="submit">Save</button>
              <div>Current value: {storedValue}</div>
            </form>
          </div>
          <div className="col-sm-6">
            <h4>Definition</h4>
            <pre>
              <code>
                {`
type StoredState<T> = (name: string, opts?: StoredStateOpts<T>) => StoredStateState<T>
type StoredStateState<T> = [T, (val: T) => Promise<void>, boolean]
type StoredStateDriver = "LOCALSTORAGE" | "WEBSQL" | "INDEXEDDB"
type StoredStateOpts<T> =
  | T
  | {
      defaultVal: T
      driver?: StoredStateDriver
    }
                `}
              </code>
            </pre>
            <h4>Usage</h4>
            <pre>
              <code>
                {`
const [val, setVal, isReady] = useStoredState("key", "defaultValue")
return isReady ? val : null
                `}
              </code>
            </pre>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-sm-6 mb-4">
            <h2 className="display-5 mb-4">
              useToggle
              <span className={`badge badge-${isOn ? "success" : "danger"} ml-4`}>
                {isOn ? "ON" : "OFF"}
              </span>
            </h2>
            <button onClick={toggle}>Toggle</button>
            <button onClick={() => toggle(false)}>Reset</button>
          </div>
          <div className="col-sm-6">
            <h4>Definition</h4>
            <pre>
              <code>
                {`
type Toggle = (defaultVal?: any) => ToggleState
type ToggleState = [boolean, (val?: any) => void]
                `}
              </code>
            </pre>
            <h4>Usage</h4>
            <pre>
              <code>
                {`
const [isOn, toggle] = useToggle()
                `}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </>
  )
}

ReactDOM.render(<Demo />, document.getElementById("root"))
