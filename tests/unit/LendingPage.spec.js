import { mount } from "@vue/test-utils";
import LendingPage from "../../src/views/LendingPage";
import { createStore } from "vuex";

const store = createStore({
  state:{
    mainCat:[{title:"bil", id:2}]
  },
  getters:{
    getMainCategories(state) {
      return state.mainCat
    }
  }
})

jest.spyOn(LendingPage.methods, "getAllCategories")
  .mockImplementation(() => {
    LendingPage.data().categories.push({title:"bil", id:2})
  })
jest.spyOn(LendingPage.methods, "getAllCategories")
  .mockImplementation(() => {
    LendingPage.data().categories.push({title:"bil", id:2})
  })
describe("LendingPage", () => {
  it('should render a title input field and its belonging label', () => {
    const wrapper = mount(LendingPage,{
      global:{
        plugins:[store]
      }
    });
    expect(wrapper.find('[id="titleOfTheAd"]').exists());
    expect(wrapper.find('label[htmlFor="titleOfTheAd"]').exists());
  });
  it('should render a describe text field and its belonging label', () => {
    const wrapper = mount(LendingPage,{
      global:{
        plugins:[store]
      }
    });
    expect(wrapper.find('[id="describe"]').exists());
    expect(wrapper.find('label[htmlFor="describe"]').exists());
  });
  it('should render a price input field and its belonging label', () => {
    const wrapper = mount(LendingPage,{
      global:{
        plugins:[store]
      }
    });
    expect(wrapper.find('[id="price"]').exists());
    expect(wrapper.find('label[htmlFor="price"]').exists());
  });
  it('should render a street address input field and its belonging label', () => {
    const wrapper = mount(LendingPage,{
      global:{
        plugins:[store]
      }
    });
    expect(wrapper.find('[id="streetAddress"]').exists());
    expect(wrapper.find('label[htmlFor="streetAddress"]').exists());
  });
  it('should render a phone number input field and its belonging label', () => {
    const wrapper = mount(LendingPage,{
      global:{
        plugins:[store]
      }
    });
    expect(wrapper.find('[id="phoneNumber"]').exists());
    expect(wrapper.find('label[htmlFor="phoneNumber"]').exists());
  });
  it('should render a postal code input field and its belonging label', () => {
    const wrapper = mount(LendingPage,{
      global:{
        plugins:[store]
      }
    });
    expect(wrapper.find('[id="postalCode"]').exists());
    expect(wrapper.find('label[htmlFor="postalCode"]').exists());
  });
})