<template>
    <div class="">
        <button class="name" v-on:click="changeNavbarState">{{groupName}}</button>
    </div>
</template>

<script>
import chatService from "@/services/chatService";
import lendingService from "@/services/lendingService";
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
          this.getMessages()
          this.getUsers()
          console.log(this.$store.getters.getGroupId)
      },
      async getMessages(){
          await chatService.getMessagesByGroupId(this.$store.getters.getGroupId)
          .then(response => {
              this.$store.dispatch("setMessages", response.data)
          })
          .catch(error => {
              console.log(error)
          })
          await this.getUsers()
      },
      async getUsers(){
        for(let i = 0; i<this.$store.getters.getMessages.length; i++){ 
                await lendingService.getUserById(this.$store.getters.getMessages[i].user_id)
                  .then(response => { 
                      this.$store.getters.getMessages[i].firstName = response.data.firstName; this.$store.getters.getMessages[i].lastName=response.data.lastName 
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
      },
  }
};
</script>

<style scoped>

</style>