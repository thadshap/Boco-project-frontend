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
  },
  actions: {
    setLastClickedMainCat({ commit }, lastClickedMainCat) {
      commit("SET_LAST_CLICKED_MAIN_CAT", lastClickedMainCat)
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
