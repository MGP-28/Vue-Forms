<script setup>
import ComponentContainer from './components/ComponentContainer.vue';
import MainLayout from './layouts/mainLayout.vue';
</script>

<template>
  <MainLayout>
    <template #vuelinks>
      <a href="https://vitejs.dev" target="_blank">Vite</a>
      <a href="https://vuejs.org/" target="_blank">Vue</a>
    </template>
    <template #content>
      <ComponentContainer></ComponentContainer>
    </template>
  </MainLayout>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.vite-vue-links{
  display: flex;
  gap: 10px;
  justify-content: space-evenly;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
