export function rentalApprovalGuard(to, from, next){
    const account = localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined
    if(!account) {
        // not logged in so redirect to login page with the return url
        return next({ path: "/login", query: { returnUrl: to.fullPath } });
    }

    //TODO sjekk i store om rental approval er in progress eller ikke

    next()
}