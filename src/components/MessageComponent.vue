<template>
    <div class="d-flex message">
        <img class="profile-picture" v-bind:src="`data:${this.$props.type};base64,${this.$props.base64}`"/>
        <div class="flex-grow-1 padding padding-top">
            <div class="text">
                <span v-on:click="routeToProfile" class="name">{{firstName}}&nbsp;</span>
                <span v-on:click="routeToProfile" class="name">{{lastName}}</span>
                <span class="timestamp">&nbsp;{{timestamp}}</span>
            </div>
            <div class="text" v-html="editedContent"></div>
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
        userId:{
            type: Number,
            required: true,
        },
        type:{
            type: String,
            required: true,
        },
        base64:{
            type: String,
            required: true,
        }
    },
    data(){
        return{
            editedContent: this.$props.content
        }
    },
    methods:{
        routeToProfile(){
            if (this.$props.userId!=localStorage.getItem("userId")) {
                localStorage.setItem("lenderId", this.$props.userId)
                this.$router.push({name:"UserProfile"}) 
            }else{
                this.$router.push("../my_profile")
            }
            
        },
        urlify() {
            let urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
            if (this.editedContent.match(urlRegex)) {
                let urls = this.editedContent.match(urlRegex)
                for (let i = 0; i < urls.length; i++) {
                    let url = urls[i];
                    url = url.link(url)
                    this.editedContent = this.editedContent.replace(urlRegex, url);
                }
            }
        }
    },
    mounted(){
        this.urlify()
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
    max-width: 100%;
    overflow-wrap: break-word;
}
.timestamp{
    font-size: 10px;
}
.padding{
    padding: 10px;
    max-width: 80vw;
}
.name{
    text-decoration: underline;
    color: blue;
    cursor: pointer;
}
.padding-top{
    padding-top: 0px;
}
</style>