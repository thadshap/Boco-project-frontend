<template>
  <div class="d-inline-flex" style="padding: 12px 7px 0px 0px;" >
    <div class="h-100">
      <input type="radio" :value="label" :name="categoryType" :id="label" class="sr-only"/>
    </div>
  <label class="mx-2 category-label" v-on:click="chosenCat" :for="label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "SubCategoryComponent",
  props: {
    label: {
      type: String,
      required: true
    },
    categoryType: {
      type: String,
      required: true
    }
  },
  methods: {
    chosenCat() {
      this.$emit("chosenSubCat", this.$props.label)
    }
  }
};
</script>

<style scoped>
.category-label{
  font-weight: inherit;
  color: #0495F3FF;
  font-size: 1.8vh;
  cursor: pointer;
}
.category-label:hover{
  color: #015d9a;
}
</style>