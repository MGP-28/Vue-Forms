<template>
    <div class="user-card">
        <span>{{user.name}}</span>
        <span>{{user.email}}</span>
        <span>{{user.dob}}</span>
        <span>{{sexString}}</span>
        <button @click="editUser()">Edit</button>
    </div>
</template>

<script>
    export default {
        name:"UserCard",
        props: [
            'user'
        ],
        computed: {
            sexString(){
                return (this.user.isMale) ? 'Male' : 'Female'
            }
        },
        methods: {
            editUser(){
                this.$emit('editing-user')
            }
        },
    }
</script>

<style scoped>
.user-card{
    display: grid;
    gap: 10px;
    border: solid 1px grey;
    background-color: rgb(43, 42, 51);
    padding: 20px;
    border-radius: 4px;
    width: 250px;
}
button{
    border: white solid 0.5px;
}
button:hover{
    background-color: gray;
    color: black;
}
</style>