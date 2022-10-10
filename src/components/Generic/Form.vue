<template>
    <div class="form-container">
        <form @submit.prevent="submitHandler($event)" @reset="resetHandler($event)">
            <div class="fields">
                <slot name="fields"></slot>
            </div>
            <div class="buttons">
                <slot name="buttons"></slot>
            </div>
        </form>
        <slot name="extras"></slot>
    </div>
</template>

<script>
    export default {
        name: "UserFrom",
        props: [
            "userToEdit"
        ],
        data() {
            return {
                isEditing: false
            };
        },
        emits:[
            'form-submited', 'form-reset'
        ],
        methods: {
            submitHandler(event) {
                this.$emit("form-submited", event);
            },
            resetHandler(event){
                this.$emit("form-reset", event);
            }
        }
    }
</script>

<style>
.form-container{
    display: grid;
    place-items: center;
}
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
.field.radio-btns .radio-btn-container{
    display: flex;
    gap: 8px;
}
input[type='radio']{
    margin: 0;
    padding: 0;
}
.fields input{
    padding: 0 10px;
    width: 100%;
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
.error{
    box-shadow: red 0 0 5px 1px;
}
</style>