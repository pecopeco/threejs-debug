<template>
  <div class="popupview">
    popupview
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('popup init')
})
</script>

<style scoped>
.popupview {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 16px;
}
</style>