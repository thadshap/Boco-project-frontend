<template>
    <div class="">
        <button class="name" v-on:click="changeNavbarState">{{groupName}}</button>
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
          this.$store.dispatch("setNavbarState", !this.$store.getters.messageNavbar)
          this.$store.dispatch("setGroupName", this.$props.groupName)
          this.$store.dispatch("setGroupId", this.$props.groupId)
      }
  }
};
</script>

<style scoped>

</style>