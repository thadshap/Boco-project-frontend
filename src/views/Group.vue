<template>
<div class="d-flex flex-column screen">
  <div class="d-flex flex-column groups">
      <div v-if="!groups.length">Her var det tomt! Start en chat ved å trykke på knappen under</div>
      <div><button v-on:click="collapseCreateChat" v-if="collapse" style="
                                border: 1.5px solid #2A94EE7F;
                                border-radius: 5px;
                                box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
                                background-color: transparent;
                                padding: 5px;
                                margin: 5px;">Lag gruppechat</button>
                                </div>
      <div v-if="!collapse">
      <div>Start en chat:</div>
      <div>
        <input type="text" v-model="groupName" placeholder="Gruppe navn" style="margin: 5px; padding: 5px; border-radius: 5px">
    </div>
        <input type="text" placeholder="Epost" class="add" v-model="input" style="margin: 5px; padding: 5px; border-radius: 5px">
      
      <div>
          <div>
              {{this.emails}}
          </div>
          <div>
              <button v-on:click="addEmailToList" style="
                                border: 1.5px solid #2A94EE7F;
                                border-radius: 5px;
                                box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
                                background-color: transparent;
                                padding: 5px;
                                margin: 5px;">Legg til epost</button>
          </div>
          
      <button v-on:click="createGroupFromEmails" v-if="emails.length" style="
                                border: 1.5px solid #2A94EE7F;
                                border-radius: 5px;
                                box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
                                background-color: transparent;
                                padding: 5px;
                                margin: 5px;">Lag gruppe</button>
        </div>
        <button v-on:click="collapseCreateChat" v-if="!collapse" style="
                                border: 1.5px solid #2A94EE7F;
                                border-radius: 5px;
                                box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
                                background-color: transparent;
                                padding: 5px;
                                margin: 5px;">Lukk</button>
        </div>
      <GroupComponent 
      v-for="group in groups"
      :key="group"
      :groupId="group.groupId"
      :groupName="group.groupName"/>
  </div>
</div>
</template>

<script>
import GroupComponent from "@/components/GroupComponent";
import chatService from "@/services/chatService";
import userService from "@/services/userService";
export default {  
  name: "Group",
  data(){
      return{
          groups:[],
          input: '',
          groupName:'',
          emails:[],
          groupId:'',
          collapse: true
      }
  },
  components:{
      GroupComponent
  },
  methods:{
      collapseCreateChat(){
          this.collapse = !this.collapse
      },
      async getGroups(){
          await chatService.getGroupChatsByUserId(parseInt(localStorage.getItem("userId"))) 
          .then(response => {
              this.groups = response.data
          })
          .catch(error => {
              console.log(error)
          })
      },
      addEmailToList(){
          if (!this.emails.includes(this.input)) {
            this.emails.push(this.input)
            this.input = ''
          }else{
              alert("Kan ikke legge til bruker flere ganger")
          }
      },
      async createGroupFromEmails(){
          let userEmail
          let succ
          await userService.getUserById(localStorage.getItem("userId"))
          .then(response => {
              userEmail = response.data.email
          })
          this.emails.push(userEmail)
          await chatService.createGroupFromEmails(this.groupName,this.emails)
          .then(response => {
            succ = response.data.succeeded
            if (response.data.failedEmails.length) {
                alert(`Disse epostene eksisterer ikke eller har ikke tilsvarende bruker: ${response.data.failedEmails}`)
            }
            this.groupId = response.data.groupId
          })
          .catch(error =>{
            console.log(error)
          })
          if (succ) {
            this.$store.dispatch("setGroupId", this.groupId)
            this.$store.dispatch("setGroupName", this.groupName)
            this.$router.push(`/chat/${this.groupId}`)
          }
          this.emails = []
      }
  },
  mounted(){
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
.groups{
    width: 100vw;
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


/* Icons */
.bi-list{
    width: 1em;
    height: 1em;
    fill: currentColor;
    color: black;
    font-size: 32px;
}
.create-group{

}
</style>