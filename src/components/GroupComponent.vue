<template>
    <div class="">
        <button class="name">{{groupName}}</button>
    </div>
</template>

<script>
export default {
  name: "GroupComponent",
  props:{
      groupId:{
          type: Number,
          required: true,
      },
      groupName:{
          type: String,
          required: true,
      }
  },
  methods:{
      changeNavbarState(){
          this.$store.dispatch("setNavbarState")
      }
  }
};
</script>

<style scoped>

</style>