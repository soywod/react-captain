import React, {FC, useRef, useState} from "react"
import ReactDOM from "react-dom"
import {Subject} from "rxjs"

import useClickOutside from "../click-outside"
import useDebounce from "../debounce"
import useTimeout from "../timeout"
import useStoredState from "../stored-state"
import useToggle from "../toggle"
import useSubject from "../subject"

const counter$ = new Subject<number>()

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

  const [counter, setCounter] = useState(0)
  useSubject(counter$, setCounter)

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
          <h1 className="display-3">⚓ React Captain</h1>
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
            <h2 className="display-5 mb-0">useClickOutside</h2>
            <div className="text-muted mb-4">
              Capture click event outside of the given HTMLElement.
            </div>
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
type UseClickOutside = (
  ref: React.RefObject<Node>,
  fn: ClickOutsideFn,
  opts?: Partial<ClickOutsideOpts>,
) => void

type ClickOutsideFn = (evt: Event) => void
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
useClickOutside(ref, fn)
                `}
              </code>
            </pre>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-sm-6 mb-4">
            <h2 className="display-5 mb-0">useDebounce</h2>
            <div className="text-muted mb-4">Add debounce to a handler.</div>
            <button onClick={sayHelloWithDebounce}>Say hello after 1000ms</button>
            <button onClick={sayHelloWithDebounce.abort}>Abort</button>
            <button onClick={sayHelloWithDebounce.terminate}>Terminate</button>
          </div>
          <div className="col-sm-6">
            <h4>Definition</h4>
            <pre>
              <code>
                {`
type UseDebounce = (
  opts?: number | Partial<DebounceOpts>,
) => <T extends Function>(fn: T) => Debounce<T>

type DebounceOpts = {
  delay: number
  persist: boolean
}

type Debounce<T extends Function> = {
  (...params: Parameters<T>): void
  abort: () => void
  terminate: () => void
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
            <h2 className="display-5 mb-0">useTimeout</h2>
            <div className="text-muted mb-4">Wrapper around setTimeout.</div>
            <button onClick={sayHelloWithTimeout}>Say hello after 1000ms</button>
            <button onClick={sayHelloWithTimeout.abort}>Abort</button>
            <button onClick={sayHelloWithTimeout.terminate}>Terminate</button>
          </div>
          <div className="col-sm-6">
            <h4>Definition</h4>
            <pre>
              <code>
                {`
type UseTimeout = (
  opts?: number | Partial<TimeoutOpts>,
) => <T extends Function>(fn: T) => Timeout<T>

type TimeoutOpts = {
  delay: number
  persist: boolean
}

type Timeout<T extends Function> = {
  (...params: Parameters<T>): void
  abort: () => void
  terminate: () => void
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
            <h2 className="display-5 mb-0">useStoredState</h2>
            <div className="text-muted mb-4">
              A persistant useState, based on React.useState and localForage.
            </div>
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
type UseStoredState = <T>(
  name: string,
  opts?: T | Partial<StoredStateOpts<T>>,
) => [T, (val: T) => Promise<void>, boolean]

type StoredStateDriver = "LOCALSTORAGE" | "WEBSQL" | "INDEXEDDB"

type StoredStateOpts<T> = {
  defaultVal: T
  driver: StoredStateDriver
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
            <h2 className="display-5 mb-0">
              useToggle
              <span className={`badge badge-${isOn ? "success" : "danger"} ml-4`}>
                {isOn ? "ON" : "OFF"}
              </span>
            </h2>
            <div className="text-muted mb-4">A React.useState for booleans.</div>
            <button onClick={toggle}>Toggle</button>
            <button onClick={() => toggle(false)}>Reset</button>
          </div>
          <div className="col-sm-6">
            <h4>Definition</h4>
            <pre>
              <code>
                {`
type UseToggle = (defaultVal?: any) => ToggleState
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

        <hr />

        <div className="row">
          <div className="col-sm-6 mb-4">
            <h2 className="display-5 mb-0">
              useSubject
              <span className="badge badge-secondary ml-4">{counter}</span>
            </h2>
            <div className="text-muted mb-4">A wrapper around rxjs.Subject.</div>
            <button onClick={() => counter$.next(counter - 1)}>-</button>
            <button onClick={() => counter$.next(counter + 1)}>+</button>
          </div>
          <div className="col-sm-6">
            <h4>Definition</h4>
            <pre>
              <code>
                {`
type UseSubject = <T>(
  subject$: Subject<T>,
  fn: SubjectFn<T>,
) => void

type SubjectFn<T> = (val: T) => void
                `}
              </code>
            </pre>
            <h4>Usage</h4>
            <pre>
              <code>
                {`
useSubject(subject$, fn)
                `}
              </code>
            </pre>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-sm-6 mb-4">
            <h2 className="display-5 mb-0">
              useBehaviorSubject
              <span className="badge badge-secondary ml-4">{counter}</span>
            </h2>
            <div className="text-muted mb-4">A wrapper around rxjs.BehaviorSubject.</div>
            <button onClick={() => counter$.next(counter - 1)}>-</button>
            <button onClick={() => counter$.next(counter + 1)}>+</button>
          </div>
          <div className="col-sm-6">
            <h4>Definition</h4>
            <pre>
              <code>
                {`
type UseBehaviorSubject = <T>(
  subject$: BehaviorSubject<T>,
  fn?: BehaviorSubjectFn<T>,
) => BehaviorSubjectState<T>

type BehaviorSubjectState<T> = [T, BehaviorSubjectFn<T>]
type BehaviorSubjectFn<T> = (val: T) => void
                `}
              </code>
            </pre>
            <h4>Usage</h4>
            <pre>
              <code>
                {`
const [val, setVal] = useBehaviorSubject(subject$, fn)
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
