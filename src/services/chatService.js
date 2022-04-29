import axios from "axios";
let url = 'http://localhost:'
let port = "8080"
export default{
    getMessagesByGroupId(groupId){
        const options = {
            method: 'GET',
            url: `${url}${port}/api/group/messages/${groupId}`,
            headers: {
              Authorization: localStorage.getItem("userId")
            }
          };
          return axios.request(options)
    },
    getGroupChatsByUserId(userId){
        const options = {
            method: 'GET',
            url: `${url}${port}/api/user/groupchat/${userId}`,
            headers: {
              Authorization: localStorage.getItem("userId")
            }
          };
          return axios.request(options)
    }
}