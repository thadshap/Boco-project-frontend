import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    // chosenMainCategory: "",
    lastClickedMainCat: null,
    currentAd : {},
  },
  mutations: {
    SET_LOGGED_IN(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn
    },
    SET_CURRENT_AD(state, currentAd) {
      state.currentAd = currentAd
    },
    // SET_CHOSEN_MAIN_CATEGORY(state, chosenMainCategory) {
    //   state.chosenMainCategory = chosenMainCategory;
    // },
    SET_LAST_CLICKED_MAIN_CAT(state, lastClickedMainCat) {
      state.lastClickedMainCat = lastClickedMainCat;
    }
  },
  actions: {
    setLoggedIn({ commit }, isLoggedIn) {
      commit("SET_LOGGED_IN", isLoggedIn)
    },
    setCurrentAd({ commit }, currentAd) {
      commit("SET_CURRENT_AD", currentAd)
    },
    // setChosenMainCategory({ commit }, chosenMainCategory) {
    //   commit("SET_CHOSEN_MAIN_CATEGORY", chosenMainCategory);
    // },
    setLastClickedMainCat({ commit }, lastClickedMainCat) {
      commit("SET_LAST_CLICKED_MAIN_CAT", lastClickedMainCat)
    }
  },
  getters: {
    loggedIn(state) {
      return state.isLoggedIn;
    },
    // chosenMainCategory(state) {
    //   return state.chosenMainCategory;
    // },
    lastClickedMainCat(state) {
      return state.lastClickedMainCat;
    },
    currentAd(state) {
      return state.currentAd
    }
  },
});
