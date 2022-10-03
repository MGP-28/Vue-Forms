<template>
    <div class="form-container">
        <form @submit.prevent="submitHandler()">
            <div class="fields">
                <!-- name -->
                <label>Name</label>
                <div class="field">
                    <input type="text" name="name" id="name" placeholder="Insert your name here" v-model="user.name">
                </div>
                <span v-if="aaa" v-for="error in errors.name">{{error}}</span>
                <!-- email -->
                <label>E-mail</label>
                <div class="field">
                    <input type="email" name="email" id="email" placeholder="example@site.com" v-model="user.email">
                </div>
                <span v-if="aaa" v-for="error in errors.email">{{error}}</span>
                <!-- dob -->
                <label>Date of birth</label>
                <div class="field">
                    <input type="date" name="dob" id="dob" placeholder="01-01-2000" v-model="user.date">
                </div>
                <span v-if="aaa" v-for="error in errors.dob">{{error}}</span>
                <!-- sex -->
                <label>Sex</label>
                <div class="field radio-btns">
                    <div>
                        <input type="radio" name="sex" id="sex_male" value="true" v-model="user.isMale">
                        <label>Male</label>
                    </div>
                    <div>
                        <input type="radio" name="sex" id="sex_female" value="false" v-model="user.isMale">
                        <label>Female</label>
                    </div>
                </div>
                <span v-if="aaa" v-for="error in errors.sex">{{error}}</span>
            </div>
            <div class="buttons">
                <input type="submit" value="Submit">
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
        data(){
            return {
                aaa: false,
                user: new User(),
                errors: new UserError()
            }
        },
        methods:{
            submitHandler(){
                this.errors = UserValidator(this.user)
                console.log(this.errors)
            }
        },
        watch:{
            user(){
                this.error = new UserError()
            }
        }

    }
</script>

<style scoped>
form{
    display: flex;
    flex-direction: column;
    gap: 25px;
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
</style>