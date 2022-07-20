<template>
  <div class="devtools" @click="postThree">devtools 2</div>
  <span>{{scene}}</span>
  <span>{{camera}}</span>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 监听来自content-script的消息
const scene = ref({})
const camera = ref({})
const getThree = () => {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    scene.value = request.scene
    camera.value = request.camera
    sendResponse('get content-script message, callback')
  })
}

// 获取当前tab标签
const getCurrentTab = async () => {
	let queryOptions = { active: true }
	let [tab] = await chrome.tabs.query(queryOptions)
	return tab
}

// 通知content_scripts传递获取threejs对象
const postThree = (tab) => {
  chrome.tabs.sendMessage(tab.id, {}, response => {
    getThree()
  })
}

// 初始化
const initPanel = () => {
  chrome.devtools.panels.create(
    'three.js debug 1',
    'assets/logo.png"',
    'views_devtools.html',
    async function (panel) {
      // 初始化完成，通知content_scripts
      const tab = await getCurrentTab()
      postThree(tab)
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