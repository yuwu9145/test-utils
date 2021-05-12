import { h, Fragment } from 'vue'
import { mount } from '../src'

const HTMLElement = () => (<h1>My title</h1>)

it('can mount a native HTML element', () => {
  const wrapper = mount(HTMLElement)
  expect(wrapper.text()).toBe('My title')
})