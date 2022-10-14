<template>
    <div class="content-grid">
      <UserForm></UserForm>
      <UserList></UserList>
    </div>
</template>

<script>
import UserForm from './UserForm.vue';
import UserList from './UserList.vue';

    export default {
    name: "ComponentContainer",
    components: { UserForm, UserList }
}
</script>

<style scoped>
.content-grid{
    display: grid;
    gap: 50px;
}
</style>