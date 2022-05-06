import axios from "axios";
let url = "http://localhost";
let port = "8443"


/**
 * Methods for login and registration for user
 */

/**
 * Method to log in a user with email and password
 * @param emailEntered is the email the user entered
 * @param passwordEntered is the password the user entered
 */
export function logIn(emailEntered, passwordEntered) {
  const options = {
    method: 'POST',
    url: `${url}:${port}/auth/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {email: emailEntered, password: passwordEntered}
  };

  return axios.request(options)
  //     .then(function (response) {
  //   console.log(response.data);
  // }).catch(function (error) {
  //   console.error(error);
  }
  // );
// }
/**
 * Method to sign in a user through the users facebook account
 * @param facebookLoginRequest
 */
export function facebookLogin(facebookLoginRequest) {
  const options = {
    method: 'POST',
    url: `${url}:${port}/auth/facebook/signin`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      id_token: facebookLoginRequest
    }
  };

  return axios.request(options)
}

/**
 * Method to sign in a user through the users google account
 * @param googleLoginRequest
 */
export function googleLogin(googleLoginRequest) {
  const options = {
    method: "POST",
    url: `${url}:${port}/auth/google/signin`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      id_token: googleLoginRequest
    }
  };

  return axios.request(options)
}

/**
 * Gets user info from server, except profile picture
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getUserInfo() {
  const userId = localStorage.getItem("userId")

  const options = {
    method: "GET",
    url: `${url}:${port}/user/${userId}`,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request(options)
}
