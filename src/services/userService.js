import axios from "axios";
let url = 'http://localhost:'
let port = "8443"

export default {
    updateUser(firstName, lastName, email, password, userId){
        const options = {
            method: 'PUT',
            url: `${url}${port}/user/` + userId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
        };
        return axios.request(options);
    },


    getUserById(userId){
        const options = {
            method: 'GET',
            url: `${url}${port}/user/` + userId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        };

        return axios.request(options);
    },
    deleteUser(userId){
        const options = {
            method: 'DELETE',
            url: `${url}${port}/user/` + userId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            data: {}
        };

        return axios.request(options);
    },
}
