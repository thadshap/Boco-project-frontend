import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    currentAd : {},
  },
  mutations: {
    SET_LOGGED_IN(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn
    },
    SET_CURRENT_AD(state, currentAd) {
      state.currentAd = currentAd
    }
  },
  actions: {
    setLoggedIn({ commit }, isLoggedIn) {
      commit("SET_LOGGED_IN", isLoggedIn)
    },
    setCurrentAd({ commit }, currentAd) {
      commit("SET_CURRENT_AD", currentAd)
    }
  },
  getters: {
    loggedIn(state) {
      return state.isLoggedIn
    },
    currentAd(state) {
      return state.currentAd
    }
  },
});
