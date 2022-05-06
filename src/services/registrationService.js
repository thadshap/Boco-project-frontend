import axios from "axios";
let url = 'http://localhost:'
let port = "8443"

export default {

    /**
     * Method to register new user
     *
     * @param firstName
     * @param lastName
     * @param email
     * @param password
     * @param matchingPassword
     * @returns {Promise<AxiosResponse<any>>}
     */
    registerUser(firstName, lastName, email, password, matchingPassword) {
        const options = {
            method: "POST",
            url: `${url}${port}/auth/register`,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                matchingPassword: matchingPassword,
            },
        };
        return axios.request(options);
    },

    /**
     * Method to send email to user where they can change password
     *
     * @param email
     * @returns {Promise<AxiosResponse<any>>}
     */
    forgotPassword(email){
        const options = {
            method: 'POST',
            url: `${url}${port}/auth/forgotPassword`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {email: email}
        };

        return axios.request(options);
    },

    /**
     * Method to renew password
     *
     * @param password
     * @param confPassword
     * @param token the token in the url when the user clicked on the link in email
     * @returns {Promise<AxiosResponse<any>>}
     */
    renewPassword(password, confPassword, token){
        const options = {
            method: 'POST',
            url: `${url}${port}/auth/renewPassword?token=`+token,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {password: password, confirmPassword: confPassword}
        };

        return axios.request(options);

    },
}
