<template>
    <div class="user-card-container">
        <UserCard 
            v-for="(user, idx) in users" :user="user" :key="idx"
            @editing-user="editingUser(idx)"
        ></UserCard>
    </div>
</template>

<script>
import UserCard from './UserCard.vue';
    export default {
    name: "UserList",
    props: [
        'users'
    ],
    methods: {
        editingUser(idx){
            this.$emit('editing-user', idx)
        }
    },
    emits:[
        'editing-user'
    ],
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