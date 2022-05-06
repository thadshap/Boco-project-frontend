import axios from "axios";
let url = 'https://localhost:'
let port = "8443"

export default{

  /**
   * Gets messages for a group id
   *
   * @param groupId the group id
   * @returns {Promise<AxiosResponse<any>>}
   */
  getMessagesByGroupId(groupId){
      const options = {
          method: 'GET',
          url: `${url}${port}/api/group/messages/${groupId}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        };
        return axios.request(options)
  },

  /**
   * Gets the group chats for a user
   *
   * @param userId the user id
   * @returns {Promise<AxiosResponse<any>>}
   */
  getGroupChatsByUserId(userId){
      const options = {
          method: 'GET',
          url: `${url}${port}/api/user/groupchat/${userId}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        };
        return axios.request(options)
  },

  /**
   * Creates a new group chat
   *
   * @param chatName name of the group chat
   * @param users users to add to the chat
   * @returns {Promise<AxiosResponse<any>>}
   */
  createGroupChat(chatName, users){
      const options = {
          method: 'POST',
          url: `${url}${port}/api/create/group/list`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          data: {groupName: chatName, userIds: users}
        };
        return axios.request(options)
  },

  /**
   * Removes a user from a group chat
   *
   * @param groupId group id
   * @param userId user id
   * @returns {Promise<AxiosResponse<any>>}
   */
  leaveChat(groupId, userId){
      const options = {
          method: 'PUT',
          url: `${url}${port}/api/group/remove/user/${groupId}/${userId}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        };
        return axios.request(options)
  },

  /**
   * Change name of a group chat
   *
   * @param groupId group id
   * @param newGroupName new name of group
   * @returns {Promise<AxiosResponse<any>>}
   */
  editGroupName(groupId, newGroupName){
      const options = {
          method: 'PUT',
          url: `${url}${port}/api/group/name/${groupId}/${newGroupName}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        };
        return axios.request(options)
  },

  /**
   * Add a user to a group
   *
   * @param groupId group id
   * @param newUser the new user to add
   * @returns {Promise<AxiosResponse<any>>}
   */
  addUserToGroupByEmail(groupId, newUser){
      const options = {
          method: 'PUT',
          url: `${url}${port}/api/group/add/user/email/${groupId}/${newUser}`,
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        };
        return axios.request(options)
  },

  /**
   * Creates a new group with specified users
   *
   * @param chatName name of the group
   * @param listOfUsers list of users
   * @returns {Promise<AxiosResponse<any>>}
   */
  createGroupWithUsers(chatName, listOfUsers){
      const options = {
          method: 'POST',
          url: `${url}${port}/api/create/group/list`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          data: {groupName: chatName, userIds: listOfUsers}
        };
        return axios.request(options)
  },

  /**
   * Creates a new group with users by email
   *
   * @param chatName name of the group chat
   * @param listOfEmails list of user emails
   * @returns {Promise<AxiosResponse<any>>}
   */
  createGroupFromEmails(chatName, listOfEmails){
    const options = {
      method: 'POST',
      url: `${url}${port}/api/create/group/email`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {groupName: chatName, emails: listOfEmails}
    };
    return axios.request(options)
  }
}