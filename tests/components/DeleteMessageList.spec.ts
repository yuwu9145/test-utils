import { mount } from '../../src'
import MessageListView from './MessageListView.vue'
import MessageListItem from './MessageListItem.vue'

const mockDeleteById = jest.fn()

jest.mock('./deleteService', () => ({
  deleteService: {
    deleteById: (id: number) => mockDeleteById(id)
  }
}))

test('works without using implementation details', async () => {
  const wrapper = mount(MessageListView)
  await wrapper.get('button').trigger('click')
  expect(mockDeleteById).toHaveBeenCalledWith(5)
})

test('shows how to use emitted()', async () => {
  const wrapper = mount(MessageListView)
  const item = wrapper.getComponent(MessageListItem)

  // @ts-ignore 
  item.vm.handle()

  // see events and args

  console.log(item.emitted())
  // @ts-ignore
  expect(item.emitted().deleteItem[0][0]).toBe(5)
})