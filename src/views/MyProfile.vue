<template>
  <div class="d-flex flex-column container p-5 main-container">
    <div class="d-flex flex-row justify-content-center w-100 user-info-wrapper">
      <div class="infoContainerDiv">
        <div class="infoCard">
          <div class="container d-flex justify-content-center">
            <div class="user-info">
              <div class="image-container-wrapper d-flex justify-content-center align-items-center">
              <div class="image-container image d-flex flex-column justify-content-center align-items-center">
                <img class="profilePic" height="100" width="100" :src="profilePicture">
              </div>
              </div>
              <div class="d-sm-flex flex-column justify-content-end">
                <h1> {{ firstname + " " + lastname }} </h1>
                <h6 style="opacity: 0.70;"><br> {{ email }} <br><br></h6>
                <div class="d-flex justify-content-between">
                  <p><strong>{{ rating }}/10</strong></p>
                  <p> {{ nrOfReviews }} vurderinger</p>
                </div>
                  <p v-if="verified">
                    Denne brukeren er verifisert
                    <i
                      class="fas fa-check-circle float-end pt-1"
                      style="color: var(--bs-blue); font-size: 3vh;">
                    </i>
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-row flex-wrap optionContainer w-100 mt-5">
      <div class="cardDiv">
        <div id="userSettings" class="card cardBodyStyle" @click="userSettings">
          <div class="card-body">
            <h4 class="card-title">Innstillinger</h4>
            <p class="card-text">Se og rediger dine opplysninger på BoCo</p>
          </div>
        </div>
      </div>
      <div class="cardDiv">
        <div id="myAds" class="card cardBodyStyle" @click="myAds">
          <div class="card-body">
            <h4 class="card-title">Mine annonser</h4>
            <p class="card-text">Se alle dine annonser, aktive og utløpte</p>
          </div>
        </div>
      </div>
      <div class="cardDiv">
        <div class="card cardBodyStyle">
          <div id="myRentals" class="card-body cardBodyStyle" @click="myRentals">
            <h4 class="card-title">Mine lån</h4>
            <p class="card-text">Se alle dine lån, både som utleier og låner</p>
          </div>
        </div>
      </div>
      <div class="cardDiv">
        <div class="card cardBodyStyle">
          <div class="card-body">
            <h4 class="card-title">Følger (Kommer snart)</h4>
            <p class="card-text">Se brukerne du følger og deres annonser</p>
          </div>
        </div>
      </div>
      <div class="cardDiv">
        <div class="card">
          <div class="card-body cardBodyStyle">
            <h4 class="card-title">Varslingsinnstillinger (Kommer snart)</h4>
            <p class="card-text">Bestem hvordan du vil motta varslinger</p>
          </div>
        </div>
      </div>
      <div class="cardDiv">
        <div id="logout" class="card h-100" @click="logout">
          <div class="card-body cardBodyStyle d-flex align-items-center justify-content-center sign-out-container">
            <h4 class="card-title">Logg ut</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyProfile",
    data() {
      return {
        profilePicture: null,
        firstname: "",
        lastname: "",
        email: "",
        rating: "",
        nrOfReviews: "",
        verified: false,
      }
    },
    async created() {
      this.profilePicture = this.$store.getters.getProfilePicture
      this.firstname = this.$store.getters.getProfileFirstName
      this.lastname = this.$store.getters.getProfileLastName
      this.email = this.$store.getters.getProfileEmail
      this.verified = this.$store.getters.getProfileVerified
      this.rating = this.$store.getters.getProfileRating
      this.nrOfReviews = this.$store.getters.getProfileReviews

      console.log(this.$store.getters.getProfileVerified)
      console.log(this.$store.getters.getProfileReviews)
    },
    methods: {
      myAds() {
        this.$router.push({
          name: "Profile ads",
          query: {
            redirect: "/profile/ads"
          }
        })
      },
      myRentals(){
        this.$router.push({
          name: "My Rentals",
          query:{
            redirect: "/profile/rentals"
          }
        })
      },
      userSettings() {
        this.$router.push({
          name: "Settings",
          query: {
            redirect: "/profile/settings"
          }
        })
      },
      logout() {
        this.$store.dispatch("setLoggedIn", false)
        this.$router.push("/")
        localStorage.clear()
        sessionStorage.clear()
      },
    },

  }

</script>

<style scoped>
@media (min-width: 992px) {
  .cardDiv {
    padding: 5px;
    width: 33.33%;
  }
}

.cardBodyStyle {
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: rgb(70, 156, 175);
  color: rgba(255, 255, 255, 0.9);
}

.cardBodyStyle:hover {
  background-color: #378A91FF;
  box-shadow: 0px 5px 5px 2px rgba(0,0,0,0.53);
}

.sign-out-container:hover {
  background-color: #BD0303FF;
  color: white;
  box-shadow: 0px 5px 5px 2px rgba(0,0,0,0.53);
}

.containerDiv {
  padding: 1vw;
  background-color: rgb(230,247,255);
  min-height: 100vh;
}

.main-container{
  background: rgb(230,247,255);
}
.infoContainerDiv {
}

.profilePic {
  border-radius: 50%;
  max-height: 100px;
  max-width: 100px;
}

.image-container{
  border-radius: 50%;
  height: 120px;
  width: 120px;
  background-color: rgba(88, 170, 199, 0.74);
  margin-bottom: 10px;
}
.user-info{
  display: table-row;
}
.user-info-wrapper{
  border: solid rgba(1, 87, 103, 0.4);
  background-color: rgba(70, 156, 175, 0.2);
  padding: 10px;
}
.sign-out-container{
  background-color: rgba(255, 0, 0, 0.9);
  color: rgba(255, 255, 255, 0.9);
}
@media screen and (max-width: 992px) and (min-width: 768px) {
  .cardDiv {
    width: 50%;
    padding: 5px;
  }
}

@media (max-width: 768px) {
  .cardDiv {
    padding: 5px;
    width: 100%;
  }
}

@media (min-width: 992px) {
  .infoContainerDiv {
    display: flex;
    width: 50%;
    justify-content: center;
  }
}
</style>