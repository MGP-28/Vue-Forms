<template>
    <Form @form-submited="submitHandler($event)" @form-reset="resetHandler($event)">
        <template #fields>
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
            <ErrorFormField v-if="errors.hasErrorsTerm('name')" :errors="errors.name"></ErrorFormField>
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
            <ErrorFormField v-if="errors.hasErrorsTerm('email')" :errors="errors.email"></ErrorFormField>
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
            <ErrorFormField v-if="errors.hasErrorsTerm('dob')" :errors="errors.dob"></ErrorFormField>
            <!-- sex -->
            <label>Sex</label>
            <div class="field radio-btns">
                <input v-if="!isLoaded"
                    type="radio" 
                    name="sex" 
                    id="sex_null" 
                    value="null" 
                    v-model="user.isMale"
                    checked 
                    required
                >
                <div class="radio-btn-container">
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
                <div class="radio-btn-container">
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
            <ErrorFormField v-if="errors.hasErrorsTerm('isMale')" :errors="errors.isMale"></ErrorFormField>
        </template>
        <template #buttons>
            <input v-if="isEditing" type="button" value="Save user" @click="editHandler($event)">
            <input v-if="!isEditing" type="submit" value="Add user">
            <input v-if="!isEditing" type="reset" value="Clear">
        </template>
        <template #extras>
            <Toast v-if="toast.isEnabled" :text="toast.text" :isNice="!toast.isError" :timer="toast.timer"></Toast>
        </template>
    </Form>
</template>

<script>
import User from "../models/User";
import UserError from "../models/UserError";
import UserValidator from "../validators/UserValidator";
import Toast from "./Toast.vue";
import Form from "./Generic/Form.vue";
import ErrorFormField from "./Form/Error.vue";
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
            },
            isLoaded: false
        };
    },
    mounted() {
        this.isLoaded = true
    },
    emits:[
        'new-user', 'edited-user'
    ],
    methods: {
        submitHandler(event) {
            //validates user
            if (!this.getErrors(this.user)) return;
            //Submits user to the list and clears form
            this.$emit("new-user", this.user);
            this.clearUser(event);
            this.toastConfirmationUserAdded();
        },
        resetHandler(event) {
            this.clearInputs(event)
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
        clearUser(event) {
            this.user = new User();
            this.clearInputs(event);
        },
        clearInputs(event){
            if(event) event.target.reset()
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
    components: { Toast, Form, ErrorFormField }
}
</script>

<style scoped>

</style>