<template>
    <div class="form-container">
        <form @submit.prevent="submitHandler($event)" ref="userForm">
            <div class="fields">
                <!-- image -->
                <label>Thumbnail</label>
                <div class="field img-field">
                    <input 
                        type="file" 
                        name="img" 
                        id="img" 
                        accept="image/*"
                        @change="saveImage($event)"
                    >
                    <div class="user-img-container" v-if="user.image">
                        <img class="user-img" :src="user.image">
                    </div>
                </div>
                <!-- name -->
                <label>Name</label>
                <div class="field">
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Insert your name here" 
                        v-model="user.name"
                        required
                        :class="hasErrorClass('name')"
                    >
                </div>
                <span v-if="errors.hasErrors()" v-for="error in errors.name">{{error}}</span>
                <!-- email -->
                <label>E-mail</label>
                <div class="field">
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="example@site.com" 
                        v-model="user.email"
                        required
                        :class="hasErrorClass('email')"
                    >
                </div>
                <span v-if="errors.hasErrors()" v-for="error in errors.email">{{error}}</span>
                <!-- dob -->
                <label>Date of birth</label>
                <div class="field">
                    <input 
                        type="date" 
                        name="dob" 
                        id="dob" 
                        v-model="user.dob"
                        required
                        :class="hasErrorClass('dob')"
                    >
                </div>
                <span v-if="errors.hasErrors()" v-for="error in errors.dob">{{error}}</span>
                <!-- sex -->
                <label>Sex</label>
                <div class="field radio-btns">
                    <input
                        type="radio" 
                        name="sex" 
                        id="sex_null" 
                        value="null" 
                        v-model="user.isMale"
                        checked 
                        required
                        class="inv-btn" 
                    >
                    <div>
                        <input 
                            type="radio" 
                            name="sex" 
                            id="sex_male" 
                            value="true"
                            v-model="user.isMale"
                            required
                        >
                        <label>Male</label>
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            name="sex" 
                            id="sex_female" 
                            value="false"
                            v-model="user.isMale"
                            required
                        >
                        <label>Female</label>
                    </div>
                </div>
                <span v-if="errors.hasErrors()" v-for="error in errors.isMale">{{error}}</span>
            </div>
            <div class="buttons" v-if="isEditing">
                <input type="button" value="Save user" @click="editHandler($event)">
            </div>
            <div class="buttons" v-else>
                <input type="submit" value="Add user">
                <input type="reset" value="Clear">
            </div>
        </form>
    </div>
    <Toast v-if="toast.isEnabled" :text="toast.text" :isNice="!toast.isError" :timer="toast.timer"></Toast>
</template>

<script>
    import User from "../models/User";
    import UserError from "../models/UserError";
    import UserValidator from "../validators/UserValidator";
import Toast from "./Toast.vue";
    export default {
    name: "UserFrom",
    props: [
        "userToEdit"
    ],
    data() {
        return {
            user: new User(),
            errors: new UserError(),
            isEditing: false,
            toast: {
                isEnabled: false,
                text: '',
                isError: false,
                timer: 5
            }
        };
    },
    emits:[
        'new-user', 'edited-user'
    ],
    methods: {
        submitHandler() {
            //validates user
            if (!this.getErrors(this.user)) return;
            //Submits user to the list and clears form
            this.$emit("new-user", this.user);
            this.clearUser();
            this.toastConfirmationUserAdded();
        },
        editHandler() {
            //validates user
            if (!this.getErrors(this.user))
                return;
            //Submits edited user
            this.$emit("edited-user", this.user);
            this.isEditing = false;
            this.clearUser();
        },
        getErrors() {
            //validate and return all errors
            this.errors = UserValidator(this.user);
            //if there's errors, returns false
            if (this.errors.hasErrors())
                return false;
            return true;
        },
        toastConfirmationUserAdded(){
            this.toast.text = 'User added!'
            this.toast.isEnabled = true;
            setTimeout(() => {
                this.toast.isEnabled = false;
            }, this.toast.timer*1000)
        },
        clearUser() {
            this.user = new User();
            this.clearInputs();
        },
        clearInputs(){
            this.$refs.userForm.reset()
        },
        hasErrorClass(term) {
            return this.errors[term].length > 0 ? "error" : "";
        },
        saveImage(e){
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                this.user.image = reader.result
            })
            reader.readAsDataURL(e.target.files[0])
        }
    },
    watch: {
        userToEdit() {
            this.isEditing = true;
            this.clearUser();
            this.clearInputs();
            this.user = this.userToEdit.user;
        },
        "user.isMale"() {
            //only continues if a valid value isn't already assigned
            if (this.user.isMale === true || this.user.isMale === false)
                return;
            this.user.isMale = (this.user.isMale == "true") ? true
                : (this.user.isMale == "false") ? false : null;
        }
    },
    components: { Toast }
}
</script>

<style scoped>
form{
    display: flex;
    flex-direction: column;
    gap: 25px;
    max-width: max-content;
}
.fields{
    display: grid;
    grid-template-columns: auto 250px;
    justify-items: end;
    align-items: center;
    gap: 25px;
}
.fields>.field{
    width: 100%;
}
.field.img-field{
    display: grid;
    gap: 10px;
}
.fields input[type='file']{
    padding: 4px 0 0 0;
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
input:not([type='radio']){
    width: 100%;
    height: 30px;
    box-sizing: border-box;
}
.field.radio-btns{
    display: flex;
    gap: 20px;
}
.fields input{
    padding: 0 10px;
}
.fields span{
    grid-column: span 2;
    width: 100%;
    color: red;
    text-align: center;
}
.buttons{
    grid-column: span 2;
    display: flex;
    gap: 20px;
}
input.inv-btn{
    display: none;
}
.error{
    box-shadow: red 0 0 5px 1px;
}
</style>