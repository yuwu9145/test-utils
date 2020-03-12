import { h } from 'vue'

import { mount } from '../src'

const Bar = {
  render() {
    return h('span', { id: 'bar' })
  }
}

const Foo = {
  render() {
    return h('div', { id: 'foo' }, [h(Bar)])
  }
}

test('Foo renders using shallow option, stubs out Bar', () => {
  const wrapper = mount(Foo, {
    shallow: true
  })

  console.log(wrapper.html()) // we want <div id="foo"><bar-stub "></div>
})