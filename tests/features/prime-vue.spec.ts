import PrimeVue from 'primevue/config'
// @ts-ignore - ugh
import ToggleButton from 'primevue/togglebutton/ToggleButton.cjs.js'
import { mount } from '../../src'
import PrimeVueButtons from '../components/PrimeVueButtons.vue'

describe('vm', () => {
  it('returns the component vm', async () => {
    const wrapper = mount(PrimeVueButtons, {
      global: {
        components: { ToggleButton },
        plugins: [PrimeVue]
      }
    })

    expect(wrapper.html()).toContain('I confirm')
    await wrapper.find('[role="checkbox"]').trigger('click')
    expect(wrapper.html()).toContain('I reject')
  })
})
