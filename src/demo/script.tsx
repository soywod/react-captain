import React, {FC, useRef, useState} from "react"
import ReactDOM from "react-dom"

import useClickOutside from "../click-outside"
import useToggle from "../toggle"

const Demo: FC = () => {
  const clickOutsideRef = useRef<HTMLDivElement | null>(null)
  const clickOutsideTimeout = useRef<NodeJS.Timeout | null>(null)
  const [clickedOutside, clickOutside] = useState(false)
  useClickOutside({
    ref: clickOutsideRef,
    listener: () => {
      clickOutside(true)
      clickOutsideTimeout.current && clearTimeout(clickOutsideTimeout.current)
      clickOutsideTimeout.current = setTimeout(() => clickOutside(false), 500)
    },
  })

  const [isOn, toggle] = useToggle()

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
          <kbd>$ yarn add react-captain</kbd>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row">
          <div className="col-sm-6">
            <h2 className="display-5 mb-4 ">useClickOutside</h2>
            <div style={{width: 300, height: 300, background: "blue", cursor: "pointer"}}>
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
                    fontSize: 20,
                  }}
                >
                  Click outside
                </div>
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
type UseClickOutside = (params: UseClickOutsideParams) => void

type UseClickOutsideParams = {
  ref: React.RefObject<HTMLElement>
  listener: (e: Event) => void
  listenerType?: keyof DocumentEventMap = "click"
  listenerOpts?: boolean | AddEventListenerOptions = {passive: true}
}
                `}
              </code>
            </pre>
            <h4>Example</h4>
            <pre>
              <code>
                {`
const ref = useRef<HTMLDivElement | null>(null)
const listener = () => console.log("Clicked outside!")
useClickOutside({ref, listener})
                `}
              </code>
            </pre>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-sm-6">
            <h2 className="display-5 mb-4 ">
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
type UseToggle = (defaultValue?: any) => [boolean, (toggler?: any) => void]
                `}
              </code>
            </pre>
            <h4>Example</h4>
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
