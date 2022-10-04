<template>
    <div class="form-container">
        <form @submit.prevent="submitHandler()">
            <div class="fields">
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
                <input type="button" value="Save user" @click="editHandler">
            </div>
            <div class="buttons" v-else>
                <input type="submit" value="Add user">
                <input type="reset" value="Clear">
            </div>
        </form>
    </div>
</template>

<script>
    import User from "../models/User";
    import UserError from "../models/UserError";
    import UserValidator from "../validators/UserValidator";
    export default {
        name: "UserFrom",
        props:[
            'userToEdit'
        ],
        data(){
            return {
                user: new User(),
                errors: new UserError(),
                isEditing: false
            }
        },
        methods:{
            submitHandler(){
                //validates user
                if(!this.getErrors(this.user)) return

                //Submits user to the list and clears form
                this.$emit('new-user', this.user)
                this.clearUser()
            },
            editHandler(){
                //validates user
                if(!this.getErrors(this.user)) return

                //Submits edited user
                this.$emit('edited-user', this.user)
                this.isEditing = false
                this.clearUser()
            },
            getErrors(){
                //validate and return all errors
                this.errors = UserValidator(this.user)

                //if there's errors, returns false
                if(this.errors.hasErrors()) return false
                return true
            },
            clearUser(){
                this.user = new User()
            }
        },
        watch:{
            userToEdit(){
                this.isEditing = true
                this.clearUser()
                this.user = this.userToEdit.user
            }
        }
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
</style>