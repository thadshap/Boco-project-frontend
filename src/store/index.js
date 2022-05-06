import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [
    createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    isLoggedIn: false,
    lastClickedMainCat: null,
    currentAd : {},
    groupName: null,
    groupId: null,
    messages: [],
    mainCategories: [],
    subCategories: [],
    subSubCategories: [],
    profile: {
      email: "",
      firstName: "",
      lastName: "",
      verified: null,
      picture: null,
      rating: null,
      nrOfReviews: null
    }
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
    },
    SET_PROFILE(state, profile){
      state.profile = profile
    },
    SET_PROFILE_EMAIL(state, email){
      state.profile.email = email
    },
    SET_PROFILE_FIRSTNAME(state, firstName){
      state.profile.firstName = firstName
    },
    SET_PROFILE_LASTNAME(state, lastName){
      state.profile.lastName = lastName
    },
    SET_PROFILE_VERIFIED(state, verified){
      state.profile.verified = verified
    },
    SET_PROFILE_PICTURE(state, picture){
      state.profile.picture = picture
    },
    SET_PROFILE_RATING(state, rating){
      state.profile.rating = rating
    },
    SET_PROFILE_NROFREVIEWS(state, reviews){
      state.profile.nrOfReviews = reviews
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
    },
    setProfile({ commit }, profile){
      commit("SET_PROFILE", profile)
    },
    setProfileEmail({ commit }, email){
      commit("SET_PROFILE_EMAIL", email)
    },
    setProfileFirstName({ commit }, firstName){
      commit("SET_PROFILE_FIRSTNAME", firstName)
    },
    setProfileLastName({ commit }, lastName){
      commit("SET_PROFILE_LASTNAME", lastName)
    },
    setProfileVerified({ commit }, verified){
      commit("SET_PROFILE_VERIFIED", verified)
    },
    setProfilePicture({ commit }, picture){
      commit("SET_PROFILE_PICTURE", picture)
    },
    setProfileRating({ commit }, rating){
      commit("SET_PROFILE_RATING", rating)
    },
    setProfileReviews({ commit }, reviews){
      commit("SET_PROFILE_NROFREVIEWS",reviews)
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
    },
    getProfile(state){
      return state.profile
    },
    getProfileEmail(state){
      return state.profile.email
    },
    getProfileFirstName(state){
      return state.profile.firstName
    },
    getProfileLastName(state){
      return state.profile.lastName
    },
    getProfileVerified(state){
      return state.profile.verified
    },
    getProfilePicture(state){
      return state.profile.picture
    },
    getProfileRating(state){
      return state.profile.rating
    },
    getProfileReviews(state){
      return state.profile.nrOfReviews
    }
  },
});
