<template>
<div class="d-flex flex-column screen">
    <button class="btn btn-primary menu-button" type="button" v-on:click="showNavbar">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="bi bi-list">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path>
        </svg>
    </button>
  <div class="d-flex flex-column groups" v-if="navbar">
      <GroupComponent 
      v-for="group in groups"
      :key="group"
      :groupId="group.groupId"
      :groupName="group.groupName"/>
  </div>
  <div class="d-flex flex-column chat" v-if="!navbar">
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex flex-grow-1 justify-content-center align-items-center">
                <span class="name">Group</span>
            </div>
            <img class="profile-picture">
        </div>
        <div class="flex-grow-1 chat-container">
            <MessageComponent
            v-for="message in messages"
            :key="message"
            :firstName="message.firstName"
            :lastName="message.lastName"
            :timestamp="message.timestamp"
            :content="message.content"
            :profilePicture="message.picture"/>
        </div>
        <div class="d-flex align-items-end bottom-toolbar">
            <button class="btn btn-primary plus-button" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="bi bi-plus">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                </svg>
            </button>
            <div class="d-flex flex-grow-1 align-self-center">
                <input class="d-flex input" type="text" placeholder="Send message">
            </div>
            <button class="btn btn-primary send-button" type="button" v-on:click="send">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="bi bi-arrow-right-circle">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
                </svg>
            </button>
        </div>
    </div>
</div>
</template>

<script>
import MessageComponent from "@/components/MessageComponent";
import GroupComponent from "@/components/GroupComponent";
import chatService from "@/services/chatService";
import lendingService from "@/services/lendingService";
export default {  
  name: "Chat",
  data(){
      return{
          navbar: false,
          messages:[],
          groups:[]
      }
  },
  components:{
      MessageComponent,
      GroupComponent
  },
  methods:{
      showNavbar(){
          var navbar = this.navbar
          this.navbar = !navbar
      },
      async getMessages(){
          await chatService.getMessagesByGroupId(1096)
          .then(response => {
              this.messages = response.data
          })
          .catch(error => {
              console.log(error)
          })
          await this.getUsers()
          console.log(this.messages)
      },
      async getUsers(){
        for(let i = 0; i<this.messages.length; i++){ 
                await lendingService.getUserById(this.messages[i].user_id)
                  .then(response => { 
                      console.log(response.data)
                      this.messages[i].firstName = response.data.firstName; this.messages[i].lastName=response.data.lastName 
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
      },
      async getGroups(){
          await chatService.getGroupChatsByUserId(1) //parseInt(localStorage.getItem("userID"))
          .then(response => {
              this.groups = response.data
              console.log(response.data)
          })
          .catch(error => {
              console.log(error)
          })
      }
  },
  
  mounted(){
      this.getMessages()
      this.getGroups()
  }
};
</script>
<style scoped>
*{
    padding: 0px;
    margin: 0px;
}
.name{
    font-size: 24px;
}
.profile-picture{
    font-size: 24px;
}
.chat-container{
    height: 70vh;
    max-width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}
.bottom-toolbar{
    justify-content: space-between;
}
.input{
    flex-grow: 1;
    margin: 10px;
}
.chat{
    padding: 10px;
}
.groups{
    width: 100vw;
}
.screen{
    
}
/* Buttons */
.menu-button{
    background: transparent;
    width: 50px;
    border-radius: 5px;
    padding: 0px;
    height: 50px;
    border-width: 1px;
    border-color: #004AAD;
    margin-left: 10px;
}
.plus-button{
    background: transparent;
    border-color: #004AAD;
    padding: 0px;
    width: 50px;
    height: 50px;
    min-width: 50px;
    border-radius: 4px;
}
.send-button{
    width: 50px;
    height: 50px;
    padding: 0px;
    background: transparent;
    border-color: transparent;
    min-width: 50px;
}


/* Icons */
.bi-arrow-right-circle{
    width: 1em;
    height: 1em;
    fill: currentColor;
    color: black;
    font-size: 40px;
}
.bi-list{
    width: 1em;
    height: 1em;
    fill: currentColor;
    color: black;
    font-size: 32px;
}
.bi-plus{
    width: 1em;
    height: 1em;
    fill: currentColor;
    color: black;
    font-size: 30px;
}

</style>