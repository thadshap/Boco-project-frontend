import axios from "axios";
let url = "http://localhost:";
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
      url: `${url}${port}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { email: emailEntered, password: passwordEntered },
    };
    return axios.request(options);
  },

  /**
   * Method to sign in a user through the users facebook account
   * @param emailEntered is the email the user entered
   * @param passwordEntered is the password the user entered
   */
  signInFacebook() {
    const options = {
      method: "GET",
      url: `${url}${port}/auth/signin/facebook`,
      headers: {
        "Content-Type": "application/json"
      }
    };
    axios
      .request(options)
      .then(response => {
        console.log(response)
        window.open(response.data, "_self");
      })
      .catch(error => {
        console.error(error);
      });
  },

  /**
   * Method to sign in a user through the users google account
   * @param emailEntered is the email the user entered
   * @param passwordEntered is the password the user entered
   */
  signInGoogle() {
    const options = {
      method: "GET",
      url: `${url}${port}/auth/signin/google`,
      headers: {
        "Content-Type": "application/json",
      }
    };
    axios
      .request(options)
      .then(response => {
        console.log(response)
        window.open(response.data, "_self");
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}