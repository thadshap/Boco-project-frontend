<template>
  <div class="card ad-width ad-padding">
    <div class="card-body ad-padding w-100 card-style">
      <img src="{{ image }}" class="mw-100" />
      <h6 class="location-style">{{ place }}</h6>
      <div class="d-flex flex-row justify-content-between align-items-center">
        <h4>{{ title }}</h4>
        <h4>{{ price }} kr</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdComponent",
  props: {
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
      required: true,
    },
  },
};
</script>

<style scoped>
.card-style {
  background: rgb(202, 216, 238);
  box-shadow: 0px 0px 10px;
}

.location-style {
  opacity: 0.7;
  margin-top: 5px;
}

@media screen and (min-width: 1200px) {
  .ad-width {
    width: 25%;
  }
}

@media screen and (max-width: 1200px) {
  .ad-width {
    width: 50%;
  }
}

@media screen and (max-width: 767px) {
  .ad-padding {
    padding: 5px;
  }
}

@media (min-width: 768px) {
  .ad-padding {
    padding: 20px;
  }
}
</style>
