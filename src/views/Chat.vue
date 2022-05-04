<template>
<div class="d-flex flex-column screen">
  <div class="d-flex flex-column chat">
        <div class="d-flex flex-column justify-content-between align-items-center">
            <div class="d-flex flex-grow-1 flex-row width">
                <button class="btn menu-button" type="button" v-on:click="toGroups">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                </button>
                <span class="name">{{this.$store.getters.getGroupName}}</span>
                <button v-on:click="changeGroupNameState">
                    <i class="fa fa-cog"></i>
                </button>
                
            </div>
            <div class="d-flex flex-column">
                <input type="text" v-if="this.changeGroupName" v-model="v$.newGroupName.$model">
                <button v-if="changeGroupName" v-on:click="editGroupName" class="editButtons">Change group name</button>
                <input type="text" v-if="this.changeGroupName" v-model.trim="v$.addUser.$model">
                <button v-if="changeGroupName" v-on:click="addUserToGroupByEmail" class="editButtons">Add user by email</button>
            </div>
        </div>
        <div class="flex-grow-1 chat-container" ref="chat">
            <MessageComponent
            v-for="message in this.$store.getters.getMessages"
            :key="message"
            :firstName="message.firstName"
            :lastName="message.lastName"
            :timestamp="message.timeStamp"
            :content="message.content"
            :type="message.type"
            :base64="message.base64"
            :userId="message.userId"/>
        </div>
        <div class="d-flex align-items-end bottom-toolbar">
            <!--<button class="btn btn-primary plus-button" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="bi bi-plus">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                </svg>
            </button>-->
            <div class="d-flex flex-grow-1 align-self-center">
                <input class="d-flex input" type="text" placeholder="Send message" v-model.trim="v$.input.$model" v-on:keyup.enter="sendMessage"   >
            </div>
            <button class="btn btn-primary send-button" type="button" v-on:click="sendMessage">
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
import chatService from "@/services/chatService";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import {required, maxLength} from "@vuelidate/validators";
import useVuelidate from '@vuelidate/core';

export default {  
  name: "Chat",
  data(){
      return{
          changeGroupName: false,
          newGroupName: '',
          addUser:'',
          input:'',
      }
  },
  setup(){
      return{
          v$: useVuelidate()
      }
  },
  validations() {
      return{
      newGroupName: {
          required,
          maxLength: maxLength(255)
      },
      addUser: {
          required,
          maxLength: maxLength(255)
      },
      input: {
          required,
          maxLength: maxLength(2000)
      }
    }
  },
  components:{
      MessageComponent
  },
  methods:{
      changeGroupNameState(){
          this.changeGroupName = !this.changeGroupName
      },
        async editGroupName(){
            const valid = await this.v$.newGroupName.$validate()
            if (!valid) {
                return
            }
          await chatService.editGroupName(this.$store.getters.getGroupId, this.newGroupName)
          .then(response => {
              alert(response.data)
          })
          this.$store.dispatch("setGroupName", this.newGroupName)
          this.newGroupName = ''
      },
      async addUserToGroupByEmail(){
          const valid = await this.v$.addUser.$validate()
            if (!valid) {
                return
            }
          await chatService.addUserToGroupByEmail(this.$store.getters.getGroupId, this.addUser)
          .then(response => {
              alert(response.data)
          })
          this.addUser = ''
      },
      toGroups(){
          this.$router.push("/groups")
      },
      async getMessages(){
          await chatService.getMessagesByGroupId(this.$store.getters.getGroupId)
          .then(response => {
              this.$store.dispatch("setMessages", response.data)
          })
          .catch(error => {
              console.log(error)
          })
      },
  async connect(){
        var socket = new SockJS(`http://localhost:8443/ws/`);
        var options = {debug: false, protocols: Stomp.VERSIONS.supportedProtocols()};
        console.log("creating socket")
        this.stompClient = Stomp.over(socket, options);
        console.log("connecting...")
        await this.stompClient.connect({Authorization: 'Bearer '+localStorage.getItem("token")}, function(frame){
            console.log("connected to socket " + frame);            
        })
        await this.sleep(1000)
        this.subscribe()    
  },
  disconnect(){
      console.log("disconnected")
      this.stompClient.disconnect()
  },
  subscribe(){
        console.log(`Subscribing to ${this.$store.getters.getGroupId}`)
        this.stompClient.subscribe(`/topic/messages/${this.$store.getters.getGroupId}`, messageOutput => {
            let messageObject = JSON.parse(messageOutput.body)
            this.$store.dispatch("addMessage", messageObject)
        })
  },
  async sendMessage() {
      const valid = await this.v$.input.$validate()
      if (!valid) {
          return
      }
    this.stompClient.send(`/app/chat/${this.$store.getters.getGroupId}`,JSON.stringify({ content: this.input , userId: localStorage.getItem("userId")}),{})
    this.input = ''
  },
  sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   },
    scroll(){
        var content = this.$refs.chat
        content.scrollTop = content.scrollHeight
    }
},
    beforeUnmount() {
      this.disconnect()
  },
  mounted(){
      this.getMessages()
      this.connect()
  },
  updated(){
      this.$nextTick(() => this.scroll());
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
    text-align: center;
}
.width{
    width: 100vw;
    justify-content: space-evenly;
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

/* Buttons */
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
.editButtons {
  margin: 5px;
  padding: 5px;
  word-wrap: break-word;
  background-color: #fff;
  border: 3px solid rgb(0, 128, 255);
  border-radius: 0.25rem;
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

.editButtons:hover {
  background-color: rgb(0, 128, 255);
  color: white;
  cursor: pointer;
}
.fa-arrow-left{
    color: black;
}
button{
    background-color: #fff;
    border: none;
}
/* Icons */
.bi-arrow-right-circle{
    width: 1em;
    height: 1em;
    fill: currentColor;
    color: black;
    font-size: 40px;
}
.bi-plus{
    width: 1em;
    height: 1em;
    fill: currentColor;
    color: black;
    font-size: 30px;
}

</style>