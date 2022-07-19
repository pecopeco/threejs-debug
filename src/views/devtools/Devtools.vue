<template>
  <div class="devtools">devtools 2</div>
</template>

<script setup>
import { onMounted } from 'vue'

const initPanel = () => {
  chrome.devtools.panels.create(
    'three.js debug 1',
    'assets/logo.png"',
    'views_devtools.html',
    function (panel) {
    }
  )
}

onMounted(() => {
  initPanel()
})
</script>

<style scoped>
.devtools {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 16px;
}
</style>