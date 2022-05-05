<template>
    <div class="">
        <div class="d-flex flex-column popup" v-if="!popup">
            <button v-on:click="showPopup" class="leave"><i class="fa fa-times-circle "></i></button>
            Do you really want to leave {{groupName}}?
            <button v-on:click="leaveChat" class="confirm">Confirm</button>
        </div>
        <div>
            <div class="d-flex flex-row middle">
                <div class="flex-column temp">
                    <button v-on:click="showPopup" class="leave"><i class="fa fa-times-circle "></i></button>
                <button class="flex-row groupButton" v-on:click="goToChat">
                    <div class="groupName">{{groupName}}</div>
                </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import chatService from "@/services/chatService";
import userService from "@/services/userService";
export default {
  name: "GroupComponent",
  data(){
      return{
          popup: true
      }
  },
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
          this.$router.push({
                path: "/chat/:id",
                name : "Chat",
                params : {
                id : this.$props.groupId
                }
            })
      },
      async leaveChat(){
          this.$router.push("/")
          await chatService.leaveChat(this.$props.groupId, localStorage.getItem("userId"))
          alert(`Left group: ${this.$props.groupName}`)
      },
      showPopup(){
          this.popup = !this.popup
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
    background-color: transparent;
}
.popup{
    position: absolute;
    top: 40%;
    right: 30%;
    left: 30%;
    background-color:rgba(85, 171, 200, 1);
}
.confirm:hover{
    background-color: rgba(70, 156, 175, 1);
}
</style>