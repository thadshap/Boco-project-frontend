import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    lastClickedMainCat: null,
    currentAd : {},
    groupName: null,
    groupId: null,
    messages: [],
    mainCategories: [],
    subCategories: [],
    subSubCategories: []
  },
  mutations: {
    SET_LOGGED_IN(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn
    },
    SET_CURRENT_AD(state, currentAd) {
      state.currentAd = currentAd
    },
    SET_LAST_CLICKED_MAIN_CAT(state, lastClickedMainCat) {
      state.lastClickedMainCat = lastClickedMainCat;
    },
    SET_GROUP_NAME(state, groupName){
      state.groupName = groupName
    },
    SET_GROUP_ID(state, groupId){
      state.groupId = groupId
    },
    SET_MESSAGES(state, messages){
      state.messages = messages
    },
    ADD_MESSAGE(state, message){
      state.messages.push(message)
    },
    ADD_MAIN_CATEGORIES(state, categories){
      state.mainCategories = categories
    },
    ADD_SUB_CATEGORIES(state, categories){
      state.subCategories = categories
    },
    ADD_SUB_SUB_CATEGORIES(state, categories){
      state.subSubCategories = categories
    }
  },
  actions: {
    setLoggedIn({ commit }, isLoggedIn) {
      commit("SET_LOGGED_IN", isLoggedIn)
    },
    setCurrentAd({ commit }, currentAd) {
      commit("SET_CURRENT_AD", currentAd)
    },
    setLastClickedMainCat({ commit }, lastClickedMainCat) {
      commit("SET_LAST_CLICKED_MAIN_CAT", lastClickedMainCat)
    },
    setGroupName({commit}, groupName){
      commit("SET_GROUP_NAME", groupName)
    },
    setGroupId({commit}, groupId){
      commit("SET_GROUP_ID", groupId)
    },
    setMessages({commit}, messages){
      commit("SET_MESSAGES", messages)
    },
    addMessage({commit}, message){
      commit("ADD_MESSAGE", message)
    },
    setMainCategories({ commit }, categories){
      commit("ADD_MAIN_CATEGORIES", categories)
    },
    setSubCategories({ commit }, categories){
      commit("ADD_SUB_CATEGORIES", categories)
    },
    setSubSubCategories({ commit }, categories){
      commit("ADD_SUB_SUB_CATEGORIES", categories)
    }
  },
  getters: {
    loggedIn(state) {
      return state.isLoggedIn;
    },
    lastClickedMainCat(state) {
      return state.lastClickedMainCat;
    },
    currentAd(state) {
      return state.currentAd
    },
    getGroupName(state) {
      return state.groupName
    },
    getGroupId(state){
      return state.groupId
    },
    getMessages(state){
      return state.messages
    },
    getMainCategories(state){
      return state.mainCategories
    },
    getSubCategories(state){
      return state.subCategories
    },
    getSubSubCategories(state){
      return state.subSubCategories
    }
  },
});
