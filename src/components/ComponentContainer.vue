<template>
    <div class="content">
      <UserForm @new-user="newUser($event)" :userToEdit="userToEdit" @edited-user="editedUser($event)"></UserForm>
      <UserList v-if="users.length > 0" :users="users" @editing-user="editingUser($event)"></UserList>
    </div>
</template>

<script>
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
        }
    },
    onUpdated(){
        console.log(this.userToEdit)
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