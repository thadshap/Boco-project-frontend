<template>
  <div class="card card-style" @click="clicked">
    <div
      class="card-body d-flex flex-column justify-content-center align-items-center card-body-style"
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
    clicked(e) {
      // console.log(e.getCurrentComponent)

      if(this.$store.getters.lastClickedMainCat === "") {
        console.log(this.$store.getters.lastClickedMainCat)

        e.currentTarget.classList.toggle("card-style-clicked");
        this.$store.dispatch("setLastClickedMainCat", e.currentTarget)
        this.$emit("lastClickedMainCat", this.$props.title);
        this.$store.dispatch("setLastClickedMainCat", this.$props.title)

      } else if(this.$store.getters.lastClickedMainCat !== "") {
        // console.log("LastClickedEL")
        // console.log(this.$store.getters.lastClickedMainCat)
        // if(this.$props.title === prevMainCat) {
        //
        // }

        this.$store.dispatch("setLastClickedMainCat", this.$props.title)
        this.$emit("lastClickedMainCat", this.$props.title);
        e.currentTarget.classList.toggle("card-style-clicked");
      }
    }
  }
};
</script>

<style scoped>
.card-style {
  width: max-content;
  border-width: 2px;
  border-color: rgb(0, 128, 255);
  margin: 5px;
}

.card-style:hover {
  background-color: rgb(0, 128, 255);
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
  font-size: 40px;
}

.title-style {
  margin-top: 5px;
}
</style>
