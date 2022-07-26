<template>
  <div class="tree-item">
    <div class="item-wrap">
      <img
        class="flag"
        v-if="typeof objVal === 'object'"
        :class="{'show-flag': showList}"
        src="@/assets/down.png"
        @click="showList = !showList"
      >
      <div class="content" @click.stop="checkItem">
        <div class="key">
          <span>{{objKey}}</span>
          <span v-if="(typeof objVal) !== 'object'">：</span>
        </div>
        <div class="value" v-if="(typeof objVal) !== 'object'">
          <input v-if="showInput && allowInput" :type="typeof objVal === 'number' ? 'number' : 'text' " v-model="inputVal" @change="changeInput" />
          <span v-else>{{objVal}}</span>
        </div>
      </div>
    </div>
    <div class="item-list" v-if="typeof objVal === 'object'" :style="{ height: listHeight }">
      <TreeItem v-for="item in Object.keys(objVal)" :tabId="tabId" :objKey="item" :objVal="objVal[item]" :objParent="objParent.concat([objKey])" />
    </div>
  </div>
</template>

<script setup>
import { ref, inject, defineProps, watch, toRefs } from 'vue'

// 获取props传递参数
const props = defineProps({
  tabId: Number,
  objKey: String,
  objVal: [String, Number, Object],
  objParent: Array
})
const { tabId, objKey, objVal, objParent } = toRefs(props)

const showInput = ref(false)
const inputVal = ref(objVal.value)

// 监听全局点击事件，恢复输入状态
const allowInput = inject('allowInput')
watch(allowInput, () => {
  showInput.value = false
})

// 点击值
const checkItem = () => {
  showInput.value = true
  inputVal.value = objVal.value
}

// 监听输入框
const changeInput = (e) => {
  const val = typeof objVal.value === 'number' ? +e.target.value : e.target.value
  postThree(val)
  showInput.value = false
}

// 通知content_scripts更新threejs对象
const postThree = (val) => {
  chrome.tabs.sendMessage(tabId.value, { devtoolsInit: true, newThreeObj: { val: val, objParent: objParent.value.concat([objKey.value]) } }, response => {})
}

// 列表高度
const showList = ref(false)
const listHeight = ref(0)
watch(showList, () => {
  listHeight.value = (Object.keys(objVal.value).length * 23) + 23 + 'px'
  if (showList.value) {
    setTimeout(() => { listHeight.value = 'auto' }, 300)
  } else {
    setTimeout(() => { listHeight.value = 0 })
  }
})

</script>

<style lang="stylus" scoped>
.tree-item {
  padding-left: 13px;
  font-size: 18px;
  .item-wrap {
    position: relative;
    display: flex;
    align-items: center;
    padding: 3px 0;
    cursor: pointer;
    &:hover {
      background: rgba(135, 135, 135 ,.3)
    }
    .flag {
      position: absolute;
      top: 12px;
      left: 0;
      width: 14px;
      transform: rotate(-90deg);
      transition: .3s;
      cursor: pointer;
      &.show-flag {
        transform: rotate(0deg);
      }
    }
    .content {
      display: flex;
      padding-left: 15px;
      .key {
        color: #882880;
      }
      .value {
        color: #1a1aa6;
      }
    }
  }
  .item-list {
    height: 0;
    transition: .3s;
    overflow: hidden;
  }
}
</style>