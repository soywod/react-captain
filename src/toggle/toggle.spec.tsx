import "@testing-library/jest-dom"

import React, {FC, useEffect, useState} from "react"
import {render} from "@testing-library/react"

import useToggle from "./toggle"

it("should manage no default val", () => {
  const TestComponent: FC = () => {
    const [isOn] = useToggle()
    return <div data-testid="status">{isOn ? "ON" : "OFF"}</div>
  }

  const {getByText} = render(<TestComponent />)
  expect(getByText("OFF")).toBeInTheDocument()
})

it("should manage default val = true", () => {
  const TestComponent: FC = () => {
    const [isOn] = useToggle(true)
    return <div data-testid="status">{isOn ? "ON" : "OFF"}</div>
  }

  const {getByText} = render(<TestComponent />)
  expect(getByText("ON")).toBeInTheDocument()
})

test("should manage default val = false", () => {
  const TestComponent: FC = () => {
    const [isOn] = useToggle(false)
    return <div data-testid="status">{isOn ? "ON" : "OFF"}</div>
  }

  const {getByText} = render(<TestComponent />)
  expect(getByText("OFF")).toBeInTheDocument()
})

test("should manage default val = any", () => {
  const TestComponent: FC = () => {
    const [isOn] = useToggle({})
    return <div data-testid="status">{isOn ? "ON" : "OFF"}</div>
  }

  const {getByText} = render(<TestComponent />)
  expect(getByText("OFF")).toBeInTheDocument()
})

test("should toggle", () => {
  const TestComponent: FC = () => {
    const [init, setInit] = useState(false)
    const [isOn, toggle] = useToggle()

    useEffect(() => {
      if (!init) {
        setInit(true)
        toggle()
      }
    }, [init, toggle])

    return <div data-testid="status">{isOn ? "ON" : "OFF"}</div>
  }

  const {getByText} = render(<TestComponent />)
  expect(getByText("ON")).toBeInTheDocument()
})

test("should toggle with override = true", () => {
  const TestComponent: FC = () => {
    const [init, setInit] = useState(false)
    const [isOn, toggle] = useToggle()

    useEffect(() => {
      if (!init) {
        setInit(true)
        toggle(true)
      }
    }, [init, toggle])

    return <div data-testid="status">{isOn ? "ON" : "OFF"}</div>
  }

  const {getByText} = render(<TestComponent />)
  expect(getByText("ON")).toBeInTheDocument()
})

test("should toggle with override = false", () => {
  const TestComponent: FC = () => {
    const [init, setInit] = useState(false)
    const [isOn, toggle] = useToggle()

    useEffect(() => {
      if (!init) {
        setInit(true)
        toggle(false)
      }
    }, [init, toggle])

    return <div data-testid="status">{isOn ? "ON" : "OFF"}</div>
  }

  const {getByText} = render(<TestComponent />)
  expect(getByText("OFF")).toBeInTheDocument()
})

test("should toggle with override = any", () => {
  const TestComponent: FC = () => {
    const [init, setInit] = useState(false)
    const [isOn, toggle] = useToggle()

    useEffect(() => {
      if (!init) {
        setInit(true)
        toggle({})
      }
    }, [init, toggle])

    return <div data-testid="status">{isOn ? "ON" : "OFF"}</div>
  }

  const {getByText} = render(<TestComponent />)
  expect(getByText("ON")).toBeInTheDocument()
})
