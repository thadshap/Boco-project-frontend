import { shallowMount } from "@vue/test-utils";
import CategoryComponent from "@/components/CategoryComponent";
import { createStore } from "vuex";

const store = createStore({
  state:{
    isLoggedIn:true
  },
  getters: {
    loggedIn(state) {
      return state.isLoggedIn;
    },
  }
})

describe("CategoryComponent.vue", () => {
  it("renders props.title when passed", () => {
    const title = "Verktøy";
    const wrapper = shallowMount(CategoryComponent, {
      props: { title },
      global:{
        plugins:[store]
      }
    });
    expect(wrapper.text()).toMatch(title);
  });
});
