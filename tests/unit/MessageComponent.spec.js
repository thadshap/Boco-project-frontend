import { shallowMount } from "@vue/test-utils";
import MessageComponent from "@/components/MessageComponent";

describe("MessageComponent.vue", () => {
  it("test that MessageComponent displays first name correctly", () => {
    const firstName = "Leo"
    const lastName = "Leosen"
    const timestamp = "2022-05-06 15:16:38"
    const content = "Hello world!"
    const userId = "1"
    const type = "image/jpeg"
    const base64 = ``
    const wrapper = shallowMount(MessageComponent, {
      props: { firstName,lastName,timestamp,content,userId,type,base64 },
      data(){
        return{
            editedContent: content
        }
      },
    });
    expect(wrapper.find('[id="first-name"]').text()).toBe('Leo')
  });
});
describe("MessageComponent.vue", () => {
    it("test that MessageComponent displays last name correctly", () => {
      const firstName = "Leo"
      const lastName = "Leosen"
      const timestamp = "2022-05-06 15:16:38"
      const content = "Hello world!"
      const userId = "1"
      const type = "image/jpeg"
      const base64 = ``
      const wrapper = shallowMount(MessageComponent, {
        props: { firstName,lastName,timestamp,content,userId,type,base64 },
        data(){
          return{
              editedContent: content
          }
        },
      });
      expect(wrapper.find('[id="last-name"]').text()).toBe('Leosen')
    });
});
describe("MessageComponent.vue", () => {
    it("test that MessageComponent displays timestamp correctly", () => {
      const firstName = "Leo"
      const lastName = "Leosen"
      const timestamp = "2022-05-06 15:16:38"
      const content = "Hello world!"
      const userId = "1"
      const type = "image/jpeg"
      const base64 = ``
      const wrapper = shallowMount(MessageComponent, {
        props: { firstName,lastName,timestamp,content,userId,type,base64 },
        data(){
          return{
              editedContent: content
          }
        },
      });
      expect(wrapper.find('[class="timestamp"]').text()).toBe('2022-05-06 15:16:38')
    });
});
describe("MessageComponent.vue", () => {
    it("test that MessageComponent displays content correctly", () => {
      const firstName = "Leo"
      const lastName = "Leosen"
      const timestamp = "2022-05-06 15:16:38"
      const content = "Hello world!"
      const userId = "1"
      const type = "image/jpeg"
      const base64 = ``
      const wrapper = shallowMount(MessageComponent, {
        props: { firstName,lastName,timestamp,content,userId,type,base64 },
        data(){
          return{
              editedContent: content
          }
        },
      });
      expect(wrapper.find('[id="content"]').text()).toBe('Hello world!')
    });
});
describe("MessageComponent.vue", () => {
    it("test that non-link messages display normally", () => {
      const firstName = "Leo"
      const lastName = "Leosen"
      const timestamp = "2022-05-06 15:16:38"
      const content = "Hello world!"
      const userId = "1"
      const type = "image/jpeg"
      const base64 = ``
      const wrapper = shallowMount(MessageComponent, {
        props: { firstName,lastName,timestamp,content,userId,type,base64 },
        data(){
          return{
              editedContent: content
          }
        },
      });
      expect(wrapper.find('[id="content"]').text()).toBe(content)
    });
});
describe("MessageComponent.vue", () => {
    it("test that link messages display with links", () => {
      const firstName = "Leo"
      const lastName = "Leosen"
      const timestamp = "2022-05-06 15:16:38"
      const content = "https://www.google.com/"
      const userId = "1"
      const type = "image/jpeg"
      const base64 = ``
      const wrapper = shallowMount(MessageComponent, {
        props: { firstName,lastName,timestamp,content,userId,type,base64 },
        data(){
          return{
              editedContent: content
          }
        },
      });
      expect(wrapper.find('[id="content"]').text()).toBe(content)
    });
});
describe("MessageComponent.vue", () => {
    it("test that routeToProfile works", async () => {
      const firstName = "Leo"
      const lastName = "Leosen"
      const timestamp = "2022-05-06 15:16:38"
      const content = "Hello world!"
      const userId = "1"
      const type = "image/jpeg"
      const base64 = ``
      const mockRoute = {
        params: {
          id: 1
        }
      }
      const mockRouter = {
        push: jest.fn()
      }
    
      const wrapper = shallowMount(MessageComponent, {
        props: { firstName,lastName,timestamp,content,userId,type,base64 },
        data(){
          return{
            editedContent: content
          }
        },
        global: {
            mocks: {
              $route: mockRoute,
              $router: mockRouter
            }
          }
      });
      await wrapper.find('[class="name"]').trigger('click')
      expect(mockRouter.push).toHaveBeenCalled()
    });
});
