import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: true
  },
  mutations: {
    SET_LOGGED_IN(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn
    }
  },
  actions: {
    setLoggedIn({ commit }, isLoggedIn) {
      commit("SET_LOGGED_IN", isLoggedIn)
    }
  },
  getters: {
    loggedIn(state) {
      return state.isLoggedIn
    }
  },
});
