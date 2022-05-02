import axios from "axios";
let url = "https://localhost";
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
    method: "POST",
    url: `${url}${port}/auth/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { email: emailEntered, password: passwordEntered },
  };
  return axios.request(options);
}

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
