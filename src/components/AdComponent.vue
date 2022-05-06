<template>
  <div class="project-card-container" @click="goToDetailedView">
    <div class="project-card d-flex justify-content-center">
      <div class="ad-img-container-style d-flex align-items-center justify-content-center">
        <div class="div-img-size">
          <img :src="image" class="ad-img-style rounded-top rounded-bottom"/>
        </div>
      </div>
      <div class="d-flex flex-column ad-details-container-style">
        <div class="d-flex flex-column align-items-start text-left">
          <h3 class="ad-heading-style" style="margin-bottom: 10px;">
            <b>{{ title }}</b>
          </h3>
          <h4>{{ price }} kr</h4>
          <h5 class="opacity-75 d-flex flex-row align-items-center">
            <i class="fas fa-map-marked-alt"></i>
            <label class="address">
              {{ streetAddress }}<br>
              {{ postalCode }} {{ city }}
            </label>
          </h5>
        </div>
        <div class="d-flex flex-column h-100">
          <a class="btn btn-outline-primary btn-sm rounded-pill my-3 mw-100" role="button" v-if="!this.$data.isMyAd && isLoggedIn" @click="startChat">
            <i class="fa fa-envelope" style="margin-right: 5px;"></i>
            Send melding
          </a>
          <a class="btn btn-outline-primary btn-sm rounded-pill mw-100" role="button" @click="goToDetailedView">
            <i class="fa fa-arrow-circle-right" style="margin-right: 5px;"></i>
            Til annonse
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chatService from "@/services/chatService";
export default {
  name: "AdComponent",
  created() {
    this.checkIfMyAd()
    this.checkIsLoggedIn()
  },
  data(){
    return{
      isMyAd: false,
      isLoggedIn: false
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true
    },
    streetAddress: {
      type: String,
      required: true
    },
    image: {
      type: String,
    },
    userId: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },
  methods: {
    goToDetailedView(){
      this.$store.dispatch("setCurrentAd", this.$props);
      console.log(this.$store.getters.currentAd)


      this.$router.push({
        path: "/ad/:id",
        name : "Ad",
        params : {
          id : this.$props.id,
          lat : this.$props.lat,
          lng : this.$props.lng,
        }
      })
    },
    checkIfMyAd(){
      this.$data.isMyAd = parseInt(localStorage.getItem("userId")) === this.$props.userId;
    },
    checkIsLoggedIn() {
      this.isLoggedIn = localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined
    },
    async startChat() {
      if (this.$store.getters.loggedIn) {
        const userId = parseInt( localStorage.getItem("userId"))
        if (userId !== this.$props.userId) {
          let groupId
          const users = [userId, this.$props.userId]
          await chatService.createGroupChat(this.$props.title, users)
          .then(response => {
            groupId = response.data.groupId
          })
          .catch(error =>{
            console.log(error)
          })
          this.$store.dispatch("setGroupId", groupId)
          this.$store.dispatch("setGroupName", this.$props.title)
          await this.$router.push(`/chat/${groupId}`)
        }else{
          alert('Cannot create chat with self')
        }
      } else {
        await this.$router.push("/login")
      }      
    },
  }
};
</script>

<style scoped>
@import url('../../node_modules/fontawesome-free/css/all.css');
@import url('../../node_modules/fontawesome-free/css/brands.css');
@import url('../../node_modules/fontawesome-free/css/fontawesome.css');
@import url('../../node_modules/fontawesome-free/css/v4-shims.css');
@import url('../../node_modules/fontawesome-free/css/solid.css');
@import url('../../node_modules/font-awesome/css/font-awesome.css');
.project-card-container {
  padding: 20px;
}

.project-card {
  background-color: white;
  box-shadow: 0 2px 5px 0 #000000;
  border-top: 5px solid #0EA0FF;
  border-radius: 20px;
  padding: 20px;
  min-height: 100%;
}

.project-card:hover {
  cursor: pointer;
  box-shadow: 0 0 20px 5px #007FD1;
}

.ad-img-container-style {
  width: 100%;
}

.div-img-size {
  max-height: 300px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ad-img-style {
  object-fit: contain;
  max-width: 100%;
}

.ad-heading-style {
  font-size: 2.5em;
}

b{
  font-weight: inherit;
  font-size: 35px;
}

.address {
  margin-left: 5px;
  text-align: left;
  font-size: 0.9rem;
}

.text-left {
  text-align: left;
}

.btn-container {
  position: relative;
}

.btn-send-message {
  position: absolute;
  bottom: 0;
}

@media screen and (min-width: 992px) {
  .project-card-container {
    width: 50%;
  }
}

@media screen and (max-width: 992px) {
  .project-card-container {
    /*display: flex;*/
    /*justify-content: center;*/
    width: 100%;
  }

  .project-card {
    max-width: 100%;
  }
}

@media screen and (max-width: 576px) {
  .project-card {
    flex-flow: column;
  }

  .ad-details-container-style {
    padding: 0;
  }
}

@media screen and (min-width: 576px) {
  .ad-details-container-style {
    padding-left: 20px;
    width: 50%;
  }
}
</style>
