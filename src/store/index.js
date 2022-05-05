import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    // chosenMainCategory: "",
    lastClickedMainCat: null,
    currentAd : {},
    groupName: null,
    groupId: null,
    messages: [],
    rentalApprovalInProgress: false
  },
  mutations: {
    SET_LOGGED_IN(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn
    },
    SET_CURRENT_AD(state, currentAd) {
      state.currentAd = currentAd
    },
    SET_RENTAL_APPROVAL_IN_PROGRESS(state, bool){
      state.rentalApprovalInProgress = bool
    },
    // SET_CHOSEN_MAIN_CATEGORY(state, chosenMainCategory) {
    //   state.chosenMainCategory = chosenMainCategory;
    // },
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
    }
  },
  actions: {
    setLoggedIn({ commit }, isLoggedIn) {
      commit("SET_LOGGED_IN", isLoggedIn)
    },
    setCurrentAd({ commit }, currentAd) {
      commit("SET_CURRENT_AD", currentAd)
    },
    setRentalApprovalInProgress({commit},bool){
      commit("SET_RENTAL_APPROVAL_IN_PROGRESS", bool)
    },
    // setChosenMainCategory({ commit }, chosenMainCategory) {
    //   commit("SET_CHOSEN_MAIN_CATEGORY", chosenMainCategory);
    // },
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
    }
  },
  getters: {
    loggedIn(state) {
      return state.isLoggedIn;
    },
    rentalApprovalInProgress(state){
      return state.rentalApprovalInProgress
    },
    // chosenMainCategory(state) {
    //   return state.chosenMainCategory;
    // },
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
    }
  },
});
