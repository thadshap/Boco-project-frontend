<template>
  <input type="radio" :value="label" :name="categoryType" :id="label" @change="chosenCat"/>
  <label class="mx-2" :for="label">{{ label }}</label>
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

</style>