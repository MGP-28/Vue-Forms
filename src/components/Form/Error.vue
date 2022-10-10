<template>
    <span v-for="error in errors">{{error}}</span>
</template>

<script>
    export default {
        name: "ErrorFormField",
        props:[
            'errors'
        ]
    }
</script>

<style scoped>

</style>