<template>
    <div class="">
        <form action="submit">
            <button class="groupName" type="submit" v-on:click="goToChat">{{groupName}}</button>
            <button v-on:click="leaveChat">Leave group</button>
        </form>
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
      goToChat(){
          this.$store.dispatch("setGroupName", this.$props.groupName)
          this.$store.dispatch("setGroupId", this.$props.groupId)
          this.getUsers()
          this.$router.push({
                path: "/chat/:id",
                name : "Chat",
                params : {
                id : this.$props.groupId
                }
            })
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
      async leaveChat(){
          this.$router.push("/")
          await chatService.leaveChat(this.$props.groupId, localStorage.getItem("userId"))
          alert(`Left group: ${this.$props.groupName}`)
      }
  }
};
</script>

<style scoped>

</style>