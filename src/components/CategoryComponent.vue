<template>
  <div class="card card-style">
    <div
      class="card-body d-flex flex-column justify-content-center align-items-center card-body-style"
    >
      <i class="fas fa-tools icon-style"></i>
      <h4 class="card-title title-style">{{ title }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.card-style {
  width: max-content;
  border-width: 2px;
  border-color: rgb(0, 128, 255);
  margin: 5px;
}

.card-body-style {
  width: max-content;
}

.icon-style {
  font-size: 40px;
}

.title-style {
  margin-top: 5px;
}
</style>
