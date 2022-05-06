import { shallowMount } from "@vue/test-utils";
import { createStore } from 'vuex'
import GroupComponent from "@/components/GroupComponent";

const store = createStore({
    state() {
      return {
        groupName:null,
        groupId:null
      }
    },
    mutations: {
      setName(state, groupName){
        state = groupName
      }
    },
  })

jest.spyOn(window, 'alert').mockReturnValue(alert("Left group: Group One"));
describe("GroupComponent.vue", () => {
    it("test that GroupComponent leave button displays correctly", async () => {
      const groupId = 1
      const groupName = "Group One"
      const wrapper = shallowMount(GroupComponent, {
        props: { groupId, groupName },
        data(){
          return{
            popup: true
          }
        },
      });
      await wrapper.find('[class="leave"]').trigger("click");
      expect(wrapper.find('[id="confirm-leave"]').text()).toBe('Do you really want to leave Group One?')
    });
});
describe("GroupComponent.vue", () => {
    it("test that GroupComponent leave button works", async () => {
      const groupId = 1
      const groupName = "Group One"
      const mockRoute = {
        params: {
          id: 1
        }
      }
      const mockRouter = {
        push: jest.fn()
      }
    
      const wrapper = shallowMount(GroupComponent, {
        props: { groupId, groupName },
        data(){
          return{
            popup: true
          }
        },
        global: {
            mocks: {
              $route: mockRoute,
              $router: mockRouter
            }
          }
      });
      await wrapper.find('[class="leave"]').trigger("click");
      await wrapper.find('[id="confirm-leave-button"]').trigger("click");
      expect(window.alert).toBeCalledWith('Left group: Group One')
    });
});
describe("GroupComponent.vue", () => {
    it("test that GroupComponent goToChat button works", async () => {
      const groupId = 1
      const groupName = "Group One"
      const mockRoute = {
        params: {
          id: 1
        }
      }
      const mockRouter = {
        push: jest.fn()
      }
    
      const wrapper = shallowMount(GroupComponent, {
        props: { groupId, groupName },
        data(){
          return{
            popup: true
          }
        },
        global: {
            mocks: {
              $route: mockRoute,
              $router: mockRouter
            },
            plugins: [store]
          }
      });
      await wrapper.find('[class="flex-row groupButton"]').trigger('click')
      expect(mockRouter.push).toBeCalled()
    });
});