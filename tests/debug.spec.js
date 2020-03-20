import { defineComponent, h } from '../../vue-next/packages/runtime-core'
import { shallowMount } from '../src'

const Hello = defineComponent({
    render() {
        return h('h1', {}, 'Hello world!')
    },
    name: 'HelloWorld'
})

test.only('Jess testing shallow mount', () => {
    const Component = defineComponent({
        render() {
            return h('div', {}, [
                h(Hello),
                h('h2', {}, 'Sibling')
            ])
        },
    })

    const wrapper = shallowMount(Component)
    console.log('content', document.body.outerHTML)
    expect(document.body.outerHTML).not.toContain('Hello world!')
    expect(document.body.outerHTML).toContain('Sibling')
})