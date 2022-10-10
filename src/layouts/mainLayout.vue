<template>
    <div style="position: relative">
        <div class="vite-vue-links">
            <slot name="vuelinks"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MainLayout",
    }
</script>

<style scoped>
    .vite-vue-links{
        display: flex;
        gap: 10px;
        justify-content: space-evenly;
        position: fixed;
        left: 0;
        top: 0;
    }
    .content{
        display: grid;
        place-items: center;
        gap: 50px;
    }
</style>