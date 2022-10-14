<template>
    <div class="user-card-container">
        <UserCard 
            v-for="(user, idx) in usersLocal" :user="user" :key="idx" :idx="idx"
        ></UserCard>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { userList } from '../store/userList'

import UserCard from './UserCard.vue';

    export default {
    name: "UserList",
    data() {
        return {
            usersLocal: [],
        }
    },
    computed:{
        ...mapState(userList, [
            'users'
        ])
    },
    methods: {
        ...mapActions(userList, [
            'getUsersFromLC'
        ]),
        reverseUserList(){
            this.usersLocal = this.users
            this.usersLocal.reverse()
        }
    },
    created(){
        this.getUsersFromLC()
        this.reverseUserList()
    },
    updated() {
        this.reverseUserList()
    },
    components: { UserCard }
}
</script>

<style scoped>
.user-card-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;
    max-width: 1200px;
}
</style>