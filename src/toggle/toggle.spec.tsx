import React, {FC, useEffect, useState} from "react"
import {shallow, mount} from "enzyme"

import useToggle from "./toggle"

test("default", () => {
  const Wrapper: FC = () => {
    const [isOn] = useToggle()
    return <div className="status">{isOn ? "ON" : "OFF"}</div>
  }
  const wrapper = shallow(<Wrapper />)
  const status = wrapper.find(".status")

  expect(status.text()).toBe("OFF")
})

test("with default value = true", () => {
  const Wrapper: FC = () => {
    const [isOn] = useToggle(true)
    return <div className="status">{isOn ? "ON" : "OFF"}</div>
  }
  const wrapper = shallow(<Wrapper />)
  const status = wrapper.find(".status")

  expect(status.text()).toBe("ON")
})

test("with default value = false", () => {
  const Wrapper: FC = () => {
    const [isOn] = useToggle(false)
    return <div className="status">{isOn ? "ON" : "OFF"}</div>
  }
  const wrapper = shallow(<Wrapper />)
  const status = wrapper.find(".status")

  expect(status.text()).toBe("OFF")
})

test("with default value = any", () => {
  const Wrapper: FC = () => {
    const [isOn] = useToggle({})
    return <div className="status">{isOn ? "ON" : "OFF"}</div>
  }
  const wrapper = shallow(<Wrapper />)
  const status = wrapper.find(".status")

  expect(status.text()).toBe("OFF")
})

test("toggle", () => {
  const Wrapper: FC = () => {
    const [init, setInit] = useState(false)
    const [isOn, toggle] = useToggle()

    useEffect(() => {
      if (!init) {
        setInit(true)
        toggle()
      }
    }, [init, toggle])

    return <div className="status">{isOn ? "ON" : "OFF"}</div>
  }
  const wrapper = mount(<Wrapper />)
  const status = wrapper.find(".status")

  expect(status.text()).toBe("ON")
})

test("toggle with override = true", () => {
  const Wrapper: FC = () => {
    const [init, setInit] = useState(false)
    const [isOn, toggle] = useToggle()

    useEffect(() => {
      if (!init) {
        setInit(true)
        toggle(true)
      }
    }, [init, toggle])

    return <div className="status">{isOn ? "ON" : "OFF"}</div>
  }
  const wrapper = mount(<Wrapper />)
  const status = wrapper.find(".status")

  expect(status.text()).toBe("ON")
})

test("toggle with override = false", () => {
  const Wrapper: FC = () => {
    const [init, setInit] = useState(false)
    const [isOn, toggle] = useToggle()

    useEffect(() => {
      if (!init) {
        setInit(true)
        toggle(false)
      }
    }, [init, toggle])

    return <div className="status">{isOn ? "ON" : "OFF"}</div>
  }
  const wrapper = mount(<Wrapper />)
  const status = wrapper.find(".status")

  expect(status.text()).toBe("OFF")
})

test("toggle with override = any", () => {
  const Wrapper: FC = () => {
    const [init, setInit] = useState(false)
    const [isOn, toggle] = useToggle()

    useEffect(() => {
      if (!init) {
        setInit(true)
        toggle({})
      }
    }, [init, toggle])

    return <div className="status">{isOn ? "ON" : "OFF"}</div>
  }
  const wrapper = mount(<Wrapper />)
  const status = wrapper.find(".status")

  expect(status.text()).toBe("ON")
})
