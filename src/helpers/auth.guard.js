export function authGuard(to, from, next) {
  const account = localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined

  if(!account) {
    // not logged in so redirect to login page with the return url
    return next({ path: "/login", query: { returnUrl: to.fullPath } });
  }

  // if(account && (to.path === "/login" || to.path === "/register")) {
  //   return next({ path: "/", query: { returnUrl: to.fullPath } });
  // }
  next();
}