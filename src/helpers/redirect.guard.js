export function redirectGuard(to, from, next) {
  const account = localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined

  if(account) {
    return next({ path: "/", query: { returnUrl: to.fullPath } });
  }

  console.log("Test")

  console.log(to.fullPath)
  console.log(from.fullPath)



  next();
}