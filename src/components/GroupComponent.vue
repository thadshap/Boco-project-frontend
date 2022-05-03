<template>
    <div class="">
        <form action="submit">
            <div class="d-flex flex-row middle">
                <div class="flex-column temp">
                    <button v-on:click="leaveChat" class="leave"><i class="fa fa-times-circle "></i></button>
                <button class="flex-row groupButton" type="submit" v-on:click="goToChat">
                    <div class="groupName">{{groupName}}</div>  
                </button>
                </div>
            </div>
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
.temp {
  margin: 5px;
  padding: 0px;
  word-wrap: break-word;
  background-color: rgba(70, 156, 175, 0.2);
  border: 3px solid rgba(70, 156, 175, 0.2);
  min-width: 100px;
  display: flex;
  align-items: center;
  font-size: 24px;
  min-width: 50vw;
}

.groupButton:hover {
  color: rgb(70, 156, 175);
  cursor: pointer;
}

.groupName{
    text-align: center;
    padding-bottom: 20px;
    background-color: transparent;
}
.groupButton{
    background-color: transparent;
}
.leave {
  font-size: 20px;
  color: red;
  background-color: transparent;
  align-self: flex-end;
}
.leave:hover {
  color: black;
  cursor: pointer;
}
.middle{
    justify-content: center;
}
button{
    border:none;
    background-color: none;
}
</style>