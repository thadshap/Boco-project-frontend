import { shallowMount } from "@vue/test-utils";
import RentalComponent from "@/components/RentalComponent";
import { createStore } from 'vuex'

jest.spyOn(RentalComponent.methods, "getOwnerId")
    .mockImplementation(() => {
      RentalComponent.data().ownerId = 1

    })
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
describe("RentalComponent.vue", () => {
  it("test that addReviewBox is not visible when the owner and user is the same person", () => {
    const id = 10
    const adId = 15
    const title = "testTitle"
    const borrower = "Name testName"
    const owner = "NameTesting anotherName"
    const active = false
    const price = 100
    const rentTo = "2021-02-02"
    const userIden = 1
    const wrapper = shallowMount(RentalComponent, {
      props: { id,adId,title,borrower,owner,active,price,rentTo },
      data(){
        return{
          userId :userIden
        }
      },
    });
    expect(wrapper.find('[id="review"]').exists()).toBe(false)
  });
  it("test that addReviewBox is not visible when active is true", () => {
    const id = 10
    const adId = 15
    const title = "testTitle"
    const borrower = "Name testName"
    const owner = "NameTesting anotherName"
    const active = true
    const price = 100
    const rentTo = "2021-02-02"
    const userIden = 1
    const wrapper = shallowMount(RentalComponent, {
      props: { id,adId,title,borrower,owner,active,price,rentTo },
      data(){
        return{
          userId :userIden
        }
      },
    });
    expect(wrapper.find('[id="review"]').exists()).toBe(false)
  });
  it("test that addReviewBox is not visible when rentTo is in the future", () => {
    const id = 10
    const adId = 15
    const title = "testTitle"
    const borrower = "Name testName"
    const owner = "NameTesting anotherName"
    const active = true
    const price = 100
    const rentTo = "2023-02-02"
    const userIden = 1
    const wrapper = shallowMount(RentalComponent, {
      props: { id,adId,title,borrower,owner,active,price,rentTo },
      data(){
        return{
          userId :userIden
        }
      },
    });
    expect(wrapper.find('[id="review"]').exists()).toBe(false)
  });
  it("test that goToDetailedView button works", async () => {
    const id = 10
    const adId = 15
    const title = "testTitle"
    const borrower = "Name testName"
    const owner = "NameTesting anotherName"
    const active = true
    const price = 100
    const rentTo = "2023-02-02"
    const userIden = 1
    const mockRoute = {
      params: {
        id: 1
      }
    }
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(RentalComponent, {
      props: { id,adId,title,borrower,owner,active,price,rentTo },
      data(){
        return{
          userId :userIden
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
    await wrapper.find('[id="goToDetailedView"]').trigger('click')
    expect(mockRouter.push).toBeCalled()
  });
  it("test that goToDetailedRentalView button works", async () => {
    const id = 10
    const adId = 15
    const title = "testTitle"
    const borrower = "Name testName"
    const owner = "NameTesting anotherName"
    const active = true
    const price = 100
    const rentTo = "2023-02-02"
    const userIden = 1
    const mockRoute = {
      params: {
        id: 1
      }
    }
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(RentalComponent, {
      props: { id,adId,title,borrower,owner,active,price,rentTo },
      data(){
        return{
          userId :userIden
        }
      },
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    });
    await wrapper.find('[id="goToDetailedRentalView"]').trigger('click')
    expect(mockRouter.push).toBeCalled()
  });
});
