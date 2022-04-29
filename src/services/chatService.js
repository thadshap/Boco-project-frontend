import axios from "axios";
let url = 'http://localhost:'
let port = "8443"
export default{
    getMessagesByGroupId(){
        const options = {
            method: 'GET',
            url: `${url}${port}/api/group/messages/1096`,
            headers: {
              Authorization: localStorage.getItem("userId")
            }
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });
    }
}