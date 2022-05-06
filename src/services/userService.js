import axios from "axios";
let url = 'https://localhost:'
let port = "8443"

export default {

    /**
     * Updates a user info
     *
     * @param firstName
     * @param lastName
     * @param password
     * @param userId
     * @returns {Promise<AxiosResponse<any>>}
     */
    updateUser(firstName, lastName, password, userId){
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

    /**
     * Gets a user by it id
     *
     * @param userId
     * @returns {Promise<AxiosResponse<any>>}
     */
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

    /**
     * Get the the users profile picture by the users id
     *
     * @param userId
     * @returns {Promise<AxiosResponse<any>>}
     */
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

    /**
     * Method for updating a users profile picture
     *
     * @param userId
     * @param formData
     * @returns {Promise<AxiosResponse<any>>}
     */
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
    }
}
