<template>
<div class="d-flex flex-column screen">
  <div class="d-flex flex-column groups">
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
export default {  
  name: "Group",
  data(){
      return{
          groups:[],
          changeGroupName: false,
          newGroupName: null
      }
  },
  components:{
      GroupComponent
  },
  methods:{
      changeGroupNameState(){
          this.changeGroupName = !this.changeGroupName
      },
      async getGroups(){
          await chatService.getGroupChatsByUserId(parseInt(localStorage.getItem("userId"))) 
          .then(response => {
              this.groups = response.data
          })
          .catch(error => {
              console.log(error)
          })
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