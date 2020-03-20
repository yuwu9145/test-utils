import { createApp, VNode } from '../../vue-next/packages/runtime-dom'
import { defineComponent, h, transformHArgs, getCurrentInstance } from '../../vue-next/packages/runtime-core'
import stubsStorage from './stubsStorage'

import { VueWrapper, createWrapper } from './vue-wrapper'
import { createEmitMixin } from './emitMixin';

type Slot = VNode | string

interface MountingOptions<Props> {
  props?: Props
  slots?: {
    default?: Slot
    [key: string]: Slot
  },
  stubs?: Record<string, any>
  shallow?: boolean
}

export function shallowMount<P> (
    component: any,
    options?: MountingOptions<P>
): VueWrapper {
    return mount(component, {
        ...options,
        ...{ shallow: true }
    })
}

function handleStubs(hArgs, instance) {
  if (stubsStorage.has(instance?.type)) {
    const stubConfig = stubsStorage.get(instance.type)
    if (stubConfig.shallow) {
      
    }
  }
  return hArgs
}

transformHArgs(handleStubs)
export function mount<P>(
  component: any,
  options?: MountingOptions<P>
): VueWrapper {

  document.getElementsByTagName('html')[0].innerHTML = '';
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)

  const slots = options?.slots &&
    Object.entries(options.slots).reduce<Record<string, () => VNode | string>>((acc, [name, fn]) => {
    acc[name] = () => fn
    return acc
  }, {})

  const Parent = (props?: P) => defineComponent({
    render() {
      return h(component, props, slots)
    }
  })

  const instanceType = Parent(options && options.props)
  const vm = createApp(instanceType)

  if (options.stubs || options.shallow) {
    stubsStorage.set(instanceType, { stubs: options.stubs, shallow: options.shallow })
  }

  const { emitMixin, events } = createEmitMixin()
  vm.mixin(emitMixin)

  const app = vm.mount('#app')

  return createWrapper(app, events)
}
