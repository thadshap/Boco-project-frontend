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
    createGroupChatWithTwoUsers(chatName, userOneId, userTwoId){
        const options = {
            method: 'POST',
            url: `${url}${port}/api/create/group`,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            data: {groupName: chatName, userOneId: userOneId, userTwoId: userTwoId}
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
    }
}