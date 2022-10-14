<template>
    <div class="user-card">
        <div class="user-img-container">
            <img class="user-img" :src="imageUrl">
        </div>
        <span>{{user.name}}</span>
        <span>{{user.email}}</span>
        <span>{{user.dob}}</span>
        <span>{{sexString}}</span>
        <input type="button" @click="editUser()" value="Edit user"/>
    </div>
</template>

<script>
import { mapActions } from 'pinia'
import { userToEdit } from '../store/UserToEdit'
import { userList } from '../store/userList'
import User from '../models/User'

    export default {
        name:"UserCard",
        props: [
            'user',
            'idx'
        ],
        computed: {
            sexString(){
                return (this.user.isMale) ? 'Male' : 'Female'
            }
        },
        methods: {
            ...mapActions(userToEdit, [
                'startEditing'
            ]),

            //// not user rn \/
            ...mapActions(userList, [
                'removeUser'
            ]),
            //// not user rn /\
            
            editUser(){
                this.startEditing(new User(this.user), this.idx)
            }
        },
        computed: {
            imageUrl(){
                return (this.user.image) ? this.user.image : 'https://media.tenor.com/IHdlTRsmcS4AAAAC/404.gif'
            }
        }
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
    place-items: center;
}
.user-img-container{
    width: 100%;
    height: 200px;
    overflow: hidden;
}
.user-img{
    width: 100%;
    height: 100%;
}
input{
    height: 30px;
}
span{
    height: max-content;
}
</style>