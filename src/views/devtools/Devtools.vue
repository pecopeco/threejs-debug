<template>
  <div class="devtools" @click="postThree">devtools 2</div>
</template>

<script setup>
import { onMounted } from 'vue'

// 监听来自content-script的消息
const getThree = () => {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log('收到来自content-script的消息：')
    console.log(request)
  })
}

// 通知content_scripts传递获取threejs对象(不生效)
const postThree = () => {
  chrome.runtime.sendMessage({})
}

// 初始化
const initPanel = () => {
  chrome.devtools.panels.create(
    'three.js debug 1',
    'assets/logo.png"',
    'views_devtools.html',
    function (panel) {
      // getThree()
      // setInterval(() => {
      //   postThree()
      // }, 1000)
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