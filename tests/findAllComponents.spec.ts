import { mount } from '../src'
import Hello from './components/Hello.vue'
import { defineComponent, h } from 'vue'

const compC = defineComponent({
  name: 'ComponentC',
  template: '<div class="C">C</div>'
})
const compB = defineComponent({
  template: '<div class="B">TextBefore<comp-c/>TextAfter<comp-c/></div>',
  components: { compC }
})
const compA = defineComponent({
  template: '<div class="A"><comp-b ref="b"/><hello ref="b"/></div>',
  components: { compB, Hello }
})

describe('findAllComponents', () => {
  it('finds all deeply nested vue components', () => {
    const wrapper = mount(compA)
    // find by DOM selector
    expect(wrapper.findAllComponents('.C')).toHaveLength(2)
    expect(wrapper.findAllComponents({ name: 'Hello' })[0].text()).toBe(
      'Hello world'
    )
    expect(wrapper.findAllComponents(Hello)[0].text()).toBe('Hello world')
  })

  it('https://github.com/vuejs/vue-test-utils-next/issues/689', () => {
    const Comp1 = defineComponent({
      setup(props, { slots }) {
        return () => h('div', slots?.default!())
      }
    })
    const Comp2 = defineComponent({
      setup() {
        return () => h('span')
      }
    })
    const Comp = defineComponent({
      components: { Comp1, Comp2 },
      setup() {
        const arr = ['foo']
        return () => arr.map(val => h(Comp1, () => [h(Comp2, { 'data-some-attr': 'val' })]))
      }
    })

    const wrapper = mount(Comp);
    const components = wrapper.findAllComponents('[data-some-attr="val"]');
    expect(components.length).toBe(1);
  })
})
