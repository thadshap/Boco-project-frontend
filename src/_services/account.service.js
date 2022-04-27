import Router from "@/router";
import Store from "@/store";

const accountsKey = "vue-login-accounts";
let accounts = JSON.parse(localStorage.getItem(accountsKey)) || [];

export const accountService = {
  loginFacebook,
  logoutFacebook,
  loginGoogle,
  logoutGoogle
};

async function loginFacebook(FB) {
  const { authResponse } = await new Promise(FB.login);
  if (!authResponse) return;

  await apiAuthenticateFacebook(authResponse.accessToken, FB);

  await Router.push("/");
}

async function apiAuthenticateFacebook(accessToken, FB) {
  let account;

  FB.api(
    "/me",
    "GET",
    { fields: "id,email,first_name,last_name" },
    (response) => {

      account = true;
      if(accounts.length === 0) {
        account = false
      }

      if (!account) {
        // create new account if first time logging in
        account = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          accessToken: accessToken
        };
        localStorage.setItem("provider", "facebook")
        localStorage.setItem(accountsKey, JSON.stringify(account));
      }
    }
  );
  await Store.dispatch("setLoggedIn", true)
  // startAuthenticateTimer(FB);
}

async function logoutFacebook() {
  // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
  stopAuthenticateTimer();
  localStorage.removeItem(accountsKey);
  await Store.dispatch("setLoggedIn", false);
  await Router.push("/");
}

let authenticateTimeout;

// function startAuthenticateTimer(FB) {
//   console.log(FB.getAuthResponse())
//
//   // const jwtToken = JSON.parse(localStorage.getItem(accountsKey)).accessToken;
//
//   // set a timeout to re-authenticate with the api one minute before the token expires
//   // const expires = new Date(jwtToken.exp * 1000);
//   // const timeout = expires.getTime() - Date.now() - 60 * 1000;
//   // const { accessToken } = FB.getAuthResponse();
//   // authenticateTimeout = setTimeout(() => apiAuthenticateFacebook(accessToken, FB), timeout);
// }

function stopAuthenticateTimer() {
  // cancel timer for re-authenticating with the api
  clearTimeout(authenticateTimeout);
}

async function loginGoogle(gauth) {
  try {
    const googleUser = await gauth.signIn();
    if (!googleUser) {
      return null;
    }

    let account = true;
    if(accounts.length === 0) {
      account = false;
    }

    if (!account) {
      // create new account if first time logging in
      account = {
        id: googleUser.getBasicProfile().getId(),
        email: googleUser.getBasicProfile().getEmail(),
        accessToken: googleUser.getAuthResponse().access_token,
      };
      localStorage.setItem(accountsKey, JSON.stringify(account));
      localStorage.setItem("provider", "google")
      await Store.dispatch("setLoggedIn", true)

      await Router.push("/");
    }

  } catch (error) {
    console.error(error);
    return null;
  }
}

async function logoutGoogle(gauth) {
  try {
    await gauth.signOut();
    localStorage.removeItem(accountsKey);
    await Store.dispatch("setLoggedIn", false)
    await Router.push("/");
  } catch (error) {
    console.error(error);
  }
}
