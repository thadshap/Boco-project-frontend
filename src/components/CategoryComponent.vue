<template>
  <div class="card card-style card-container" @click="clicked">
    <div
      class=" d-flex flex-column justify-content-center align-items-center card-body-style"
    >
      <i :class="['fa', 'icon-style', icon]"></i>
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
    icon: {
      type: String,
      required: true
    }
  },
  methods: {
    clicked() {
      this.$emit("lastClickedMainCat", this.$props.title);
      this.$store.dispatch("setLastClickedMainCat", this.$props.title)
    }
  }
};
</script>

<style scoped>
.card-style {
  width: max-content;
  margin: 5px;
  border: none;
}

.card-container{
  padding: 2px 1rem 2px 1rem;
}

.card-style:hover {
  background-color: rgba(2, 118, 194, 0.3);
  /*background-color: rgb(230,247,255);*/
  color: white;
  cursor: pointer;
}

.card-style-clicked {
  background-color: rgb(0, 128, 255);
  color: white;
}

.card-body-style {
  width: max-content;
}

.icon-style {
  font-size: 30px;
  color: #0276c2;
}
h4{
  font-weight: inherit;
  color: #0495F3FF;
  font-size: 20px;
}
.title-style {
  margin-top: 5px;
}
</style>
