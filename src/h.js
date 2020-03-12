import { h, createVNode } from 'vue'

export function newH() {
  const [type, _, __, stubs = {}] = [...arguments]

  if (stubs[type.name]) {
    return type.render()
  }
  return h(...arguments)
}
