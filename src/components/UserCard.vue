<template>
    <div class="user-card">
        <span>{{user.name}}</span>
        <span>{{user.email}}</span>
        <span>{{user.dob}}</span>
        <span>{{sexString}}</span>
        <input type="button" @click="editUser()" value="Edit user"/>
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
        emits:[
            'editing-user'
        ]
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
input{
    height: 30px;
}
</style>