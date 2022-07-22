<template>
  <div class="devtools">
    <Tree :three="three" title="three" />
    <div class="checkbox">
      <input type="checkbox" v-model="isAutoRefresh">
      <span>自动刷新</span>
    </div>
    <div class="refresh" @click="() => postThree(false)">
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

// 自动更新开关
const isAutoRefresh = ref(false)
watch(isAutoRefresh, () => {
  postThree(isAutoRefresh.value)
})

// 通知content_scripts传递获取threejs对象
const postThree = (isAutoRefresh) => {
  chrome.tabs.sendMessage(tabId.value, { isAutoRefresh: isAutoRefresh }, response => {
    getThree()
  })
}

// 初始化
const tabId = ref(0)
const initPanel = () => {
  chrome.devtools.panels.create(
    'three.js debug',
    'assets/logo.png',
    'views_devtools.html',
    async function (panel) {
      // 初始化完成，通知content_scripts
      const tab = await getCurrentTab()
      tabId.value = tab.id
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
  .checkbox {
    position: absolute;
    right: 120px;
    top: 16px;
    display: flex;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    input {
      width: 16px;
      height: 16px;
    }
    span {
      padding-bottom: 1px;
    }
  }
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