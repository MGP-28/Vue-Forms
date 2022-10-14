<template>
    <div class="user-card-container">
        <UserCard 
            v-for="(user, idx) in users" :user="user" :key="idx"
        ></UserCard>
    </div>
</template>

<script>
import { mapActions, mapState, mapStores } from 'pinia'
import { userList } from '../store/userList'

import UserCard from './UserCard.vue';

    export default {
    name: "UserList",
    computed:{
        ...mapStores(userList),
        ...mapState(userList, [
            'users'
        ])
    },
    components: { UserCard }
}
</script>

<style scoped>
.user-card-container{
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: center;
    gap: 50px;
    max-width: 1200px;
}
</style>