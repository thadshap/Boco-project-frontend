import { shallowMount } from "@vue/test-utils";
import MessageComponent from "@/components/MessageComponent";

describe("MessageComponent.vue", () => {
  it("Renders component", () => {
    const wrapper = shallowMount(MessageComponent, {
      props: {
        firstname: "Per",
        lastName: "Per",
        timestamp: "10.22.10",
        content: "https://localhost:8443/",
        userId: 1,
        type: "image/jpg",
        base64: "abcdefghijklmnop"
      }
    })

    expect(wrapper.find("div").exists()).toBeTruthy()
  })

  it("Renders firstname", () => {
    const firstName = "Per";
    const lastName = "Per"
    const timestamp = "10.22.10";
    const content = "https://localhost:8443/";
    const userId = 1;
    const type = "image/jpg";
    const base64 = "abcdefghijklmnop";

    const wrapper = shallowMount(MessageComponent, {
      props: {
        firstName,
        lastName,
        timestamp,
        content,
        userId,
        type,
        base64
      }
    })

    expect(wrapper.findAll(".name")[0].text()).toBe(`${firstName}`)
  })
})
