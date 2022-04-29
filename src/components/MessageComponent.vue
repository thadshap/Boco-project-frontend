<template>
    <div class="d-flex message">
        <img class="profile-picture" src="{{profilePicture}}">
        <div class="flex-grow-1 padding">
            <div class="text">
                <span class="name">{{firstName}}&nbsp;</span>
                <span class="name">{{lastName}}&nbsp;</span>
                <span class="timestamp">{{timestamp}}</span>
            </div>
            <div class="text">{{content}}</div>
        </div>
    </div>
</template>
<script>

export default {
    name: "MessageComponent",
    props:{
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
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
.profile-picture{
    width: 50px;
    height: 50px;
    border-radius: 10px;
}
.text{
    text-align: left;
    padding-bottom: 10px;
}
.timestamp{
    font-size: 10px;
}
.padding{
    padding: 10px;
}
</style>