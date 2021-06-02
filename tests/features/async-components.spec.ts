import { defineAsyncComponent, defineComponent, h, AppConfig, nextTick } from 'vue'
import { mount, flushPromises, VueWrapper } from '../../src'
import Icon from '../components/Icon.vue'

const config: Partial<AppConfig> = {
  errorHandler: (error: unknown) => {
    if ((error as Error).message.match(/Async component failed to load./)) {
      return
    }
  }
}

// AsyncComponents are documented here: https://github.com/vuejs/rfcs/blob/async-component/active-rfcs/0026-async-component-api.md
describe('defineAsyncComponent', () => {
  beforeAll(() => jest.useFakeTimers())
  afterAll(() => jest.useRealTimers())

  it('works with the basic usage', async () => {
    const AsyncHello = defineAsyncComponent(
      () => import('../components/Hello.vue')
    )
    const Comp = defineComponent({
      render() {
        return h('div', [h(AsyncHello)])
      }
    })

    const wrapper = mount(Comp, { global: { config } })
    await flushPromises()
    expect(wrapper.html()).toContain('Hello world')
  })

  it('works with options usage', async () => {
    const Async = defineAsyncComponent({
      loader: () =>
        new Promise<any>((res) => {
          setTimeout(() => {
            res({
              template: '<div>Async Component</div>'
            })
          }, 75)
        }),
      loadingComponent: {
        template: '<div>Loading Component</div>'
      },
      delay: 10
    })

    const Comp = defineComponent({
      render() {
        return h('div', [h(Async)])
      }
    })

    const wrapper = mount(Comp, { global: { config } })
    jest.runTimersToTime(35)
    await flushPromises()
    expect(wrapper.html()).toContain('Loading Component')

    jest.runTimersToTime(100)
    await flushPromises()
    expect(wrapper.html()).toContain('Async Component')
  })

  it('catches error and renders ErrorComponent', async () => {
    const Async = defineAsyncComponent({
      loader: () =>
        new Promise<any>((res, rej) => {
          rej('Async component failed to load.')
        }),
      errorComponent: {
        template: '<div>Error Component</div>'
      },
      onError(error, retry, fail, attempts) {
        fail()
      }
    })

    const Comp = defineComponent({
      render() {
        return h('div', [h(Async)])
      }
    })

    const wrapper = mount(Comp, { global: { config } })
    await flushPromises()

    expect(wrapper.html()).toContain('Error Component')
  })

  // TODO: Find out why this does not work
  // Is it valid to have an AsyncComponent as the root? Was it ever?
  it.skip('works when AsyncComponent is the root', async () => {
    const AsyncHello = defineAsyncComponent(
      () => import('../components/Hello.vue')
    )
    const Comp = defineComponent({
      render() {
        return h(AsyncHello)
      }
    })

    const wrapper = mount(Comp, { global: { config } })
    await flushPromises()
    expect(wrapper.html()).toContain('Hello world')
  })
})

describe.only('dynamic async component', () => {
  describe("Icons", () => {
    // @ts-ignore
    global.SVGElement = Element;
    let wrapper: VueWrapper<any>

    describe("test async", () => {
      beforeEach(() => {
        document.body.innerHTML = `<div id="target"></div>`

        wrapper = mount(Icon, {
          props: {
            element: 'Circle',
          },
          attachTo: document.getElementById("target")
        } as any)
      })

      it("icon exists", async () => {
        console.log(wrapper.findComponent(Icon));
        await nextTick()
        let icon = wrapper.find("svg");
        console.log(wrapper.html())

        expect(icon.exists()).toBeTruthy()
      })
    })
  })
})
