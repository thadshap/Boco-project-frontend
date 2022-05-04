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
                password: password
            }
        };
        return axios.request(options);
    },
    //TODO picture handling
    getUserById(userId){
        const options = {
            method: 'GET',
            url: `${url}${port}/user/` + userId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '
            },
        };
        return axios.request(options);
    },
    getProfilePicture(userId) {
        const options = {
            method: 'GET',
            url: `${url}${port}/user/profilePicture/${userId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer' + localStorage.getItem("token")
            }
        };
        return axios.request(options);
    },
    updateProfilePicture(userId, formData) {
        const options = {
            method: 'PUT',
            url: `${url}${port}/user/profilePicture/${userId}`,
            headers: {
                "Content-Type": "multipart/form-data; boundary=---011000010111000001101001",
                Authorization: 'Bearer ' + localStorage.getItem("token")
            },
            data: formData
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
