import "@testing-library/jest-dom"

import React, {FC, useRef} from "react"
import {render} from "@testing-library/react"

import useClickOutside from "./click-outside"

const evts: any = {}
const listenerMock = jest.fn()

beforeEach(jest.resetAllMocks)

it("should not trigger if same origin", () => {
  document.addEventListener = jest.fn((event, cb) => (evts[event] = cb))

  const TestComponent: FC = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    useClickOutside(ref, listenerMock)

    return <div data-testid="child" ref={ref} />
  }

  const {getByTestId} = render(<TestComponent />)
  const target = getByTestId("child")

  evts.click({target})
  expect(listenerMock).toHaveBeenCalledTimes(0)
})

it("should not trigger if child", () => {
  document.addEventListener = jest.fn((event, cb) => (evts[event] = cb))

  const TestComponent: FC = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    useClickOutside(ref, listenerMock)

    return (
      <div ref={ref}>
        <div data-testid="child" />
      </div>
    )
  }

  const {getByTestId} = render(<TestComponent />)
  const target = getByTestId("child")

  evts.click({target})
  expect(listenerMock).toHaveBeenCalledTimes(0)
})

it("should not trigger if outside of root", () => {
  document.addEventListener = jest.fn((event, cb) => (evts[event] = cb))

  const TestComponent: FC = () => {
    const outsideRootRef = useRef<HTMLDivElement | null>(null)
    const rootRef = useRef<HTMLDivElement | null>(null)
    const ref = useRef<HTMLDivElement | null>(null)
    useClickOutside(ref, listenerMock, {root: rootRef})

    return (
      <div ref={outsideRootRef} data-testid="outside-root">
        <div ref={rootRef} data-testid="root">
          <div ref={ref} />
        </div>
      </div>
    )
  }

  const {getByTestId} = render(<TestComponent />)
  const outsideRoot = getByTestId("outside-root")

  evts.click({target: outsideRoot})
  expect(listenerMock).toHaveBeenCalledTimes(0)
})

it("should trigger if parent", () => {
  document.addEventListener = jest.fn((event, cb) => (evts[event] = cb))
  document.contains = () => true

  const TestComponent: FC = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    useClickOutside(ref, listenerMock)

    return (
      <div data-testid="parent">
        <div ref={ref} />
      </div>
    )
  }

  const {getByTestId} = render(<TestComponent />)
  const parent = getByTestId("parent")

  evts.click({target: parent})
  expect(listenerMock).toHaveBeenCalledTimes(1)
})

it("should trigger if sibling", () => {
  document.addEventListener = jest.fn((event, cb) => (evts[event] = cb))

  const TestComponent: FC = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    useClickOutside(ref, listenerMock)

    return (
      <>
        <div ref={ref} />
        <div data-testid="sibling" />
      </>
    )
  }

  const {getByTestId} = render(<TestComponent />)
  const sibling = getByTestId("sibling")

  evts.click({target: sibling})
  expect(listenerMock).toHaveBeenCalledTimes(1)
})
