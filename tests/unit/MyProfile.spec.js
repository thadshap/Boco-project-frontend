import { shallowMount } from "@vue/test-utils";
import { createStore } from 'vuex'
import MyProfile from "@/views/MyProfile";

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
  describe("MyProfile.vue", () => {
    it("test that MyProfile leave button works", async () => {
      const mockRoute = {
        params: {
          id: 1
        }
      }
      const mockRouter = {
        push: jest.fn()
      }
    
      const wrapper = shallowMount(MyProfile, {
        data(){
          return{
            profilePicture: null,
            firstname:'Leo',
            lastName: 'Leosen',
            email: "leo@leo.no",
            rating: 10,
            nrOfReviews: "1",
            verified: true,
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
      await wrapper.find('[id="myAds"]').trigger("click");
      expect(mockRouter.push).toBeCalled()
    });
});
describe("MyProfile.vue", () => {
    it("test that MyProfile leave button works", async () => {
      const mockRoute = {
        params: {
          id: 1
        }
      }
      const mockRouter = {
        push: jest.fn()
      }
    
      const wrapper = shallowMount(MyProfile, {
        data(){
          return{
            profilePicture: null,
            firstname:'Leo',
            lastName: 'Leosen',
            email: "leo@leo.no",
            rating: 10,
            nrOfReviews: "1",
            verified: true,
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
      await wrapper.find('[id="myRentals"]').trigger("click");
      expect(mockRouter.push).toBeCalled()
    });
});
describe("MyProfile.vue", () => {
    it("test that MyProfile leave button works", async () => {
      const mockRoute = {
        params: {
          id: 1
        }
      }
      const mockRouter = {
        push: jest.fn()
      }
    
      const wrapper = shallowMount(MyProfile, {
        data(){
          return{
            profilePicture: null,
            firstname:'Leo',
            lastName: 'Leosen',
            email: "leo@leo.no",
            rating: 10,
            nrOfReviews: "1",
            verified: true,
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
      await wrapper.find('[id="userSettings"]').trigger("click");
      expect(mockRouter.push).toBeCalled()
    });
});
describe("MyProfile.vue", () => {
    it("test that MyProfile leave button works", async () => {
      const mockRoute = {
        params: {
          id: 1
        }
      }
      const mockRouter = {
        push: jest.fn()
      }
    
      const wrapper = shallowMount(MyProfile, {
        data(){
          return{
            profilePicture: null,
            firstname:'Leo',
            lastName: 'Leosen',
            email: "leo@leo.no",
            rating: 10,
            nrOfReviews: "1",
            verified: true,
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
      await wrapper.find('[id="logout"]').trigger("click");
      expect(mockRouter.push).toBeCalled()
    });
});