import axios from "axios";
let url = 'http://localhost:'
let port = "8443"

export default{
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