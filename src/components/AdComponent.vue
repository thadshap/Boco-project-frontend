<template>
  <div class="card ad-width ad-padding" style="border-color: rgba(33,37,41,0);">
    <div class="card-body ad-padding" style="width: 100%;background: rgb(202,216,238);box-shadow: 0px 0px 10px;">
      <img src="assets/img/ski.jpg" style="max-width: 100%;">
      <h6 style="opacity: 0.70;margin-top: 5px;">Sted</h6>
      <div class="d-flex flex-row justify-content-between align-items-center">
        <h4>Ski</h4>
        <h4>100 kr</h4>
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
      required: true
    },
    price: {
      type: Number,
      required: true
}
  }
}
</script>

<style scoped>

</style>