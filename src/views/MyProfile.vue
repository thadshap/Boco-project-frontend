<template>
  <div class="d-flex flex-column container p-5 bg-info">
    <div class="d-flex flex-row justify-content-center w-100">
      <div class="infoContainerDiv">
        <div class="card infoCard">
          <div class="card-body">
            <div>
            </div>
            <div class="d-flex infoDiv"><img class="profilePic" src="@/assets/img/profilePicPlaceholder.png">
              <div class="d-sm-flex flex-column justify-content-end">
                <h1> {{ firstname + " " + lastname }} </h1>
                <h6 style="opacity: 0.70;"><br> {{ email }} <br><br></h6>
                <div class="d-flex justify-content-between">
                  <p><strong> {{ rating }}/10 </strong></p>
                  <p> {{ nrOfReviews }} vurderinger</p>
                </div>
                  <p v-if="verified">Denne brukeren er verifisert</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-row flex-wrap optionContainer w-100 mt-5">
      <div class="cardDiv">
        <div class="card cardBodyStyle" @click="userSettings">
          <div class="card-body">
            <h4 class="card-title">Innstillinger</h4>
            <p class="card-text">Se og rediger dine opplysninger på BoCo</p>
          </div>
        </div>
      </div>
      <div class="cardDiv">
        <div class="card cardBodyStyle" @click="myAds">
          <div class="card-body">
            <h4 class="card-title">Mine annonser</h4>
            <p class="card-text">Se alle dine annonser, aktive og utløpte</p>
          </div>
        </div>
      </div>
      <div class="cardDiv">
        <div class="card cardBodyStyle">
          <div class="card-body cardBodyStyle" @click="myRentals">
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
        <div class="card h-100" @click="logout">
          <div class="card-body cardBodyStyle d-flex align-items-center justify-content-center">
            <h4 class="card-title">Logg ut</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import userService from "@/services/userService";

  export default {
    name: "MyProfile",
    data(){
      return{
        firstname:"",
        lastname:"",
        email:"",
        rating:"",
        nrOfReviews:"",
        verified: false,
      }
    },
    mounted() {
      this.fetchDetails()
    },
    methods: {
      fetchDetails(){
        const userId = localStorage.getItem("userId")
        userService.getUserById(userId)
        .then(response => {
          this.firstname = response.data.firstName
          this.lastname = response.data.lastName
          this.email = response.data.email
          this.rating = response.data.rating
          this.nrOfReviews = response.data.nrOfReviews
          this.verified = response.data.verified
        })
      },
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
      }
    }
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
}

.cardBodyStyle:hover {
  background-color: rgb(175, 182, 189);
  box-shadow: 0px 5px 5px 2px rgba(0,0,0,0.53);
}

.infoDiv {
  gap: 1vw;
}

.containerDiv {
  padding: 1vw;
  background-color: rgb(230,247,255);
  min-height: 100vh;
}

.infoContainerDiv {
  padding: 5px;
}

.profilePic {
  max-width: 90px;
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