import React, {FC, useRef} from "react"
import {mount} from "enzyme"

import useClickOutside from "./click-outside"

const evts: any = {}
const listenerMock = jest.fn()

beforeEach(jest.resetAllMocks)

it("should not trigger if same origin", () => {
  document.addEventListener = jest.fn((event, cb) => (evts[event] = cb))

  const Wrapper: FC = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    useClickOutside(ref, listenerMock)

    return <div ref={ref} />
  }

  const wrapper = mount(<Wrapper />)
  const el = wrapper.find("div")

  evts.click({target: el.getDOMNode()})
  expect(listenerMock).toHaveBeenCalledTimes(0)
})

it("should not trigger if child", () => {
  document.addEventListener = jest.fn((event, cb) => (evts[event] = cb))

  const Wrapper: FC = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    useClickOutside(ref, listenerMock)

    return (
      <div ref={ref}>
        <div className="child" />
      </div>
    )
  }

  const wrapper = mount(<Wrapper />)

  evts.click({target: wrapper.find(".child").getDOMNode()})
  expect(listenerMock).toHaveBeenCalledTimes(0)
})

it("should not trigger if outside of root", () => {
  document.addEventListener = jest.fn((event, cb) => (evts[event] = cb))

  const Wrapper: FC = () => {
    const outsideRootRef = useRef<HTMLDivElement | null>(null)
    const rootRef = useRef<HTMLDivElement | null>(null)
    const ref = useRef<HTMLDivElement | null>(null)
    useClickOutside(ref, listenerMock, {root: rootRef})

    return (
      <div ref={outsideRootRef} className="outside-root">
        <div ref={rootRef} className="root">
          <div ref={ref} />
        </div>
      </div>
    )
  }

  const wrapper = mount(<Wrapper />)

  evts.click({target: wrapper.find(".outside-root").getDOMNode()})
  expect(listenerMock).toHaveBeenCalledTimes(0)
})

it("should trigger if parent", () => {
  document.addEventListener = jest.fn((event, cb) => (evts[event] = cb))
  document.contains = () => true

  const Wrapper: FC = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    useClickOutside(ref, listenerMock)

    return (
      <div className="parent">
        <div ref={ref} />
      </div>
    )
  }

  const wrapper = mount(<Wrapper />)

  evts.click({target: wrapper.find(".parent").getDOMNode()})
  expect(listenerMock).toHaveBeenCalledTimes(1)
})

it("should trigger if sibling", () => {
  document.addEventListener = jest.fn((event, cb) => (evts[event] = cb))

  const Wrapper: FC = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    useClickOutside(ref, listenerMock)

    return (
      <>
        <div ref={ref} />
        <div className="sibling" />
      </>
    )
  }

  const wrapper = mount(<Wrapper />)

  evts.click({target: wrapper.find(".sibling").getDOMNode()})
  expect(listenerMock).toHaveBeenCalledTimes(1)
})
