import axios from "axios";
let url = "https://localhost";
let port = "8443"


/**
 * Methods for login and registration for user
 */
export default {

  /**
   * Method to log in a user with email and password
   * @param emailEntered is the email the user entered
   * @param passwordEntered is the password the user entered
   */
  logIn(emailEntered, passwordEntered) {
    const options = {
      method: "POST",
      url: `${url}:${port}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { email: emailEntered, password: passwordEntered },
    };
    return axios.request(options);
  },

  /**
   * Method to sign in a user through the users facebook account
   * @param facebookLoginRequest
   */
  facebookLogin(facebookLoginRequest) {
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

    return axios.request(options).then(function(response) {
      console.log(response.data);
    }).catch(function(error) {
      console.error(error);
    });
  },

  /**
   * Method to sign in a user through the users google account
   * @param googleLoginRequest
   */
  googleLogin(googleLoginRequest) {
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

    axios.request(options).then(function(response) {
      console.log(response.data);
    }).catch(function(error) {
      console.error(error);
    });
  }
}