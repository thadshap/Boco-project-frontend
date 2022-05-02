import axios from "axios";
let url = 'http://localhost:'
let port = "8080"

export default {
    /**
     * Method to log in a user
     * @param emailEntered is the email the user entered
     * @param passwordEntered is the password the user entered
     */
    logIn(emailEntered, passwordEntered) {
        const options = {
            method: "POST",
            url: `${url}${port}/auth/login`,
            headers: {
                "Content-Type": "application/json",
            },
            data: { email: emailEntered, password: passwordEntered },
        };
        return axios.request(options);
    },

    /**
     * Method to log in a user
     * @param emailEntered is the email the user entered
     * @param passwordEntered is the password the user entered
     */
    logInSocial(name, imgUrl, email, provider) {
        const options = {
            method: "POST",
            url: `${url}${port}/auth/login/outside`,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                name: name,
                imgUrl: imgUrl,
                email: email,
                provider: provider
            },
        };
        axios
            .request(options)
            .then(function (response) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.id);
            })
            .catch(function (error) {
                console.error(error);
            });
    },

    /**
     * Method to register new user
     */
    registerUser(firstName, lastName, email, password, matchingPassword) {
        const options = {
            method: "POST",
            url: `${url}${port}/auth/register`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer",
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
     * method to send email to user where they can change password
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
     * method to renew password
     * @token the token in the url when the user clicked on the link in email
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