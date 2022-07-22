<template>
  <div class="devtools">
    <Tree :three="three" title="three" />
    <div class="refresh" @click="postThree">
      <img src="@/assets/refresh.png">
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Tree from '@/components/Tree.vue'

// 监听来自content-script的消息
const three = ref({})
const getThree = () => {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    three.value = request
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
const postThree = () => {
  chrome.tabs.sendMessage(tabId.value, { devtoolsInit: devtoolsInit.value }, response => {
    getThree()
  })
}

// 初始化
const tabId = ref(0)
const devtoolsInit = ref(false)
const initPanel = () => {
  chrome.devtools.panels.create(
    'three.js debug',
    'assets/logo.png',
    'views_devtools.html',
    async function () {
      // 初始化完成，通知content_scripts
      const tab = await getCurrentTab()
      tabId.value = tab.id
      devtoolsInit.value = true
      postThree()
    }
  )
}

onMounted(() => {
  initPanel()
})
</script>

<style lang="stylus" scoped>
.devtools {
  position: relative;
  display: flex;
  flex-direction: column
  padding: 15px;
  .refresh {
    position: absolute;
    right: 20px;
    top: 16px;
    width: 26px;
    cursor: pointer;
    img {
      width: 100%
    }
  }
}
</style>