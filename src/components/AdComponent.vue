<template>
  <div class="project-card-container" v-on:click="goToDetailedView">
    <div class="project-card d-flex justify-content-center">
      <div class="ad-img-container-style d-flex align-items-center justify-content-center">
        <img :src="getImgUrl(image)" class="ad-img-style rounded-top rounded-bottom"/>
      </div>
      <div class="d-flex flex-column ad-details-container-style">
        <div class="d-flex flex-column align-items-start">
          <h3 class="ad-heading-style" style="margin-bottom: 10px;">
            <b>{{ title }}</b>
          </h3>
          <h4>{{ price }} kr</h4>
          <h5 class="opacity-75">{{ place }}</h5>
        </div>
        <div class="d-flex flex-column justify-content-between" :class="{ 'align-items-end, h-100': !this.$store.getters.loggedIn }">
          <a class="btn btn-outline-primary btn-sm rounded-pill my-3 mw-100" role="button" v-if="this.$store.getters.loggedIn">
            <i class="fa fa-envelope" style="margin-right: 5px;"></i>
            Send melding
          </a>
          <a class="btn btn-outline-primary btn-sm rounded-pill mw-100" role="button">
            <i class="fa fa-arrow-circle-right" style="margin-right: 5px;"></i>
            Til annonse
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdComponent",
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
    place: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  methods: {
    getImgUrl(img) {
      return require("../assets/img/" + img);
    },
    goToDetailedView(){
      console.log(this.$props.id);
      this.$router.push({
        path: "/ad/:id",
        name : "Ad",
        params : {
          id : this.$props.id
        }
      })
    },
  }
};
</script>

<style scoped>
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

.ad-img-style {
  object-fit: contain;
  max-width: 100%;
}

.ad-heading-style {
  font-size: 2.5em;
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
