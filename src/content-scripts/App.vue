<template>
  <div class="contentsview">
    contentsview
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from "../store/auth"

const authStore = useUserStore()
console.log(authStore.userInfo)

onMounted(() => {
  console.log('contentsview init')
})
</script>

<style scoped>
.contentsview {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 200px;
  padding: 5px;
  border-radius: 10px;
  background-color: white;
  font-size: 12px;
  z-index: 100;
  color: black;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
</style>