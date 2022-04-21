<template>
    <div class="d-flex message">
        <img class="profile-picture" src="{{profilePicture}}">
        <div class="flex-grow-1 data">
            <div>
                <span class="username">{{username}}</span>
                <span class="timestamp">{{timestamp}}</span>
            </div>
            <div class="message-content">{{content}}</div>
        </div>
    </div>
</template>
<script>

export default {
    name: "MessageComponent",
    props:{
        username:{
            type: String,
            required: true,
        },
        timestamp:{
            type: String,
            required: true,
        },
        content:{
            type: null,
            required: true,
        },
        profilePicture:{
            type: Image,
            required: true,
        }
    }
}
</script>
<style scoped>
.message{
    width: 100%;
}
.profile-picture{
    width: 100px;
    height: 100px;
    margin: 10px;
    border-radius: 10px;
}
.data{
    margin: 10px;
}
.username{
    
}
.timestamp{
    font-size: 10px;
    margin-left: 10px;
}
.message-content{

}
</style>