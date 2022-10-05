<template>
    <div class="content">
      <UserForm @new-user="newUser($event)" :userToEdit="userToEdit" @edited-user="editedUser($event)"></UserForm>
      <UserList v-if="users.length > 0" :users="users" @editing-user="editingUser($event)"></UserList>
    </div>
</template>

<script>
import User from '../models/User';
import UserForm from './UserForm.vue';
import UserList from './UserList.vue';
    export default {
    name: "ComponentContainer",
    data() {
        return {
            users: [],
            userToEdit: null
        };
    },
    created() {
        this.localStorageGetUsers()
    },
    methods: {
        newUser(user) {
            this.users.push(user);
        },
        editingUser(idx){
            //JSON parsing the user in array to remove any references
            this.userToEdit = {
                user: JSON.parse(JSON.stringify(this.users[idx])), 
                idx: idx
            };
        },
        editedUser(editedUser){
            this.users[this.userToEdit.idx] = editedUser
        },
        localStorageSetUsers(){
            localStorage.setItem('users', JSON.stringify(this.users));
        },
        localStorageGetUsers(){
            const users = JSON.parse(localStorage.getItem('users'));
            if(!users) return
            users.forEach(user => {
                this.users.push(
                    new User(
                        user.name, 
                        user.email, 
                        user.dob, 
                        user.isMale,
                        user.image
                    )
                )
            });
        }
    },
    watch: {
        users:{
            handler: function (val, oldVal){
                this.localStorageSetUsers()
            },
            deep: true
        }
    },
    components: { UserForm, UserList }
}
</script>

<style scoped>
.content{
  display: grid;
  place-items: center;
  gap: 50px;
}
</style>