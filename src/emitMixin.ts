import { getCurrentInstance } from '../../vue-next/packages/runtime-core'

export const createEmitMixin = () => {
  const events: Record<string, unknown[]> = {}

  const emitMixin = {
    beforeCreate() {
      const originalEmit = getCurrentInstance().emit
      getCurrentInstance().emit = (event: string, ...args: unknown[]) => {
        events[event]
          ? events[event] = [...events[event], [...args]]
          : events[event] = [[...args]]

        return originalEmit.call(getCurrentInstance(), event, ...args)
      }
    }
  }

  return {
    events,
    emitMixin
  }
}
