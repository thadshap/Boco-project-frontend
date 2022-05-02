// import { accountService } from "@/_services/account.service";

export function authGuard(to, from, next) {
  // const account = accountService.accountValue;
  const account = localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined
  //  const account = localStorage.getItem("vue-login-accounts") !== null && localStorage.getItem("vue-login-accounts") !== undefined

  console.log("To path")
  console.log(to.fullPath)

  console.log("From path")
  console.log(from.fullPath)

  if(!account) {
    // not logged in so redirect to login page with the return url
    return next({ path: "/login", query: { returnUrl: to.fullPath } });
  }

  // if(account && (to.path === "/login" || to.path === "/register")) {
  //   return next({ path: "/", query: { returnUrl: to.fullPath } });
  // }
  next();
}