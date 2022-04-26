import { BehaviorSubject } from "rxjs";
import Router from "@/router";
import Store from "@/store";

const accountSubject = new BehaviorSubject(null);
const accountsKey = "vue-login-accounts";
let accounts = JSON.parse(localStorage.getItem(accountsKey)) || [];

export const accountService = {
  loginFacebook,
  logoutFacebook,
  loginGoogle,
  logoutGoogle,
  account: accountSubject.asObservable(),
  get accountValue() {
    return accountSubject.value;
  },
};

async function loginFacebook(FB) {
  // login with facebook then authenticate with the API to get a JWT auth token
  const { authResponse } = await new Promise(FB.login);
  if (!authResponse) return;

  await apiAuthenticateFacebook(authResponse.accessToken, FB);
  Store.commit("SET_LOGGED_IN", true);

  await Router.push("/");
}

async function apiAuthenticateFacebook(accessToken, FB) {
  FB.api(
    "/me",
    "GET",
    { fields: "id,email,first_name,last_name" },
    (response) => {
      if (response.error) return accounts;

      let account = false;
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id === response.id) {
          account = true;
        }
      }

      if (!account) {
        // create new account if first time logging in
        account = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          accessToken: accessToken,
          provider: "facebook"
        };
        localStorage.setItem(accountsKey, JSON.stringify(account));

        accountSubject.next(account);
        startAuthenticateTimer(FB);
        return account;
      }
    }
  );
}

function logoutFacebook() {
  // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
  // FB.api("/me/permissions", "delete", null, () => FB.logout());
  stopAuthenticateTimer();
  accountSubject.next(null);
  localStorage.removeItem(accountsKey)
  Store.commit("SET_LOGGED_IN", false);
  window.location.reload();
}

let authenticateTimeout;

function startAuthenticateTimer(FB) {
  const jwtToken = JSON.parse(localStorage.getItem(accountsKey)).accessToken;

  // set a timeout to re-authenticate with the api one minute before the token expires
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  const { accessToken } = FB.getAuthResponse();
  authenticateTimeout = setTimeout(() => apiAuthenticateFacebook(accessToken, FB), timeout);
}

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
        provider: "google"
      };
      localStorage.setItem(accountsKey, JSON.stringify(account));
      accountSubject.next(account);
      Store.commit("SET_LOGGED_IN", true);

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
    // console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
    localStorage.removeItem(accountsKey);
    Store.commit("SET_LOGGED_IN", false);
    await Router.push("/");
  } catch (error) {
    console.error(error);
  }
}
