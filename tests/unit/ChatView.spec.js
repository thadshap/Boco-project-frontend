import { mount } from '@vue/test-utils'
import Chat from "@/views/Chat";

describe("Chatview", () => {

    test('Renders menu button', () => {
    const wrapper = mount(Chat)

    const button = wrapper.get('[class="btn btn-primary menu-button"]')

    expect(button.exists()).toBe(true)
  })
  test('Renders username', () => {
    const wrapper = mount(Chat)

    const username = wrapper.get('[class="name"]')
    //TODO: Fix expected text when chat name shows
    expect(username.text()).toEqual("Username")
  })
  test('Renders picture', () => {
    const wrapper = mount(Chat)

    const picture = wrapper.get('[class="profile-picture"]')
    //TODO: Fix expected text when chat name shows
    expect(picture.exists()).toBe(true)
  })
})

