<template>
  <div class="mb-5">
    <nav class="navbar navbar-light navbar-expand-md navbarStyle">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center navbarBrandStyle" href="#">

          <router-link to="/" class="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon text-decoration-none">
            <img class="img-fluid" src="@/assets/img/BoCo.png" alt="BorrowCommunity-logo">
            <span class="text-dark">BorrowCommunity</span>
          </router-link>

        </a>
      <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-2">
        <span class="visually-hidden">Toggle navigation</span>
        <span class="navbar-toggler-icon"></span>
      </button>
        <div class="collapse navbar-collapse" id="navcol-2">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">

              <router-link to="/new_ad" class="nav-link active text-end">
                <i class="fa fa-plus-square"></i>
                &nbsp;Ny annonse
              </router-link>
              
            </li>
            <li class="nav-item">
              
              <router-link to="/" class="nav-link active text-end">
                <i class="fa fa-envelope"></i>
                &nbsp;Meldinger
              </router-link>
              
            </li>
            <li class="nav-item">
              
              <router-link to="/my_profile" class="nav-link active text-end">
                <i class="fa fa-user"></i>
                &nbsp;Min profil
              </router-link>
              
            </li>

            <li class="nav-item">

              <router-link to="/login" class="nav-link active text-end">
                <i class="material-icons">arrow_forward</i>
                &nbsp;Log in
              </router-link>

            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name:"HeaderComponent"
  }
</script>
<style scoped>
.bs-icon {
  --bs-icon-size: .75rem;
  --bs-primary: #0d6efd;
  --bs-primary-rgb: 13,110,253;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  font-size: var(--bs-icon-size);
  width: calc(var(--bs-icon-size) * 2);
  height: calc(var(--bs-icon-size) * 2);
  color: var(--bs-primary);
}

.bs-icon-xs {
  --bs-icon-size: 1rem;
  width: calc(var(--bs-icon-size) * 1.5);
  height: calc(var(--bs-icon-size) * 1.5);
}

.bs-icon-sm {
  --bs-icon-size: 1rem;
}

.bs-icon-md {
  --bs-icon-size: 1.5rem;
}

.bs-icon-lg {
  --bs-icon-size: 2rem;
}

.bs-icon-xl {
  --bs-icon-size: 2.5rem;
}

.bs-icon.bs-icon-primary {
}

.bs-icon.bs-icon-primary-light {
  color: var(--bs-primary);
  background: rgba(var(--bs-primary-rgb), .2);
}

.bs-icon.bs-icon-semi-white {
  color: var(--bs-primary);
  background: rgba(255, 255, 255, .5);
}

.bs-icon.bs-icon-rounded {
  border-radius: .5rem;
}

.bs-icon.bs-icon-circle {
  border-radius: 50%;
}

.navbarStyle {
  padding: 1vh 1vw;
  background: rgb(120, 147, 173);
}

.navbarBrandStyle {
  padding: 0;
  height: auto;
}
</style>