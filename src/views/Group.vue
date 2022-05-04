<template>
<div class="d-flex flex-column screen">
  <div class="d-flex flex-column groups">
      <!-- <div v-if="!groups.length">Ser ut som du har ingen chatter</div>
      <div>Start en chat:</div>
      <div>
          <input type="text" placeholder="Epost" class="add">
      </div>
      <button></button> -->
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

</style>