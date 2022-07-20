<template>
  <div class="tree">
    <div class="header">
      <img
        class="flag"
        :class="{'show-flag': showList}"
        src="@/assets/down.png"
        @click="showList = !showList"
      >
      <div class="title">{{title}}</div>
    </div>
    <div class="item-list" :style="{ height: listHeight }">
      <TreeItem v-for="item in Object.keys(threeObj)" :objKey="item" :objVal="threeObj[item]" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import TreeItem from '@/components/TreeItem.vue'

// 获取props传递参数
const props = defineProps({
  threeObj: Object,
  title: String
})
const { threeObj, title } = toRefs(props)

// 列表高度
const showList = ref(false)
const listHeight = ref(0)
watch(showList, () => {
  listHeight.value = (Object.keys(threeObj.value).length * 24) + 24 + 'px'
  if (showList.value) {
    setTimeout(() => { listHeight.value = 'auto' }, 300)
  } else {
    setTimeout(() => { listHeight.value = 0 })
  }
})

</script>

<style lang="stylus" scoped>
.tree {
  font-size: 18px;
  .header {
    position: relative;
    display: flex;
    align-items: center;
    .flag {
      position: absolute;
      top: 8px;
      left: 0;
      width: 14px;
      transform: rotate(-90deg);
      transition: .3s;
      cursor: pointer;
      &.show-flag {
        transform: rotate(0deg);
      }
    }
    .title {
      padding-left: 16px;
    }
  }
  .item-list {
    height: 0;
    transition: .3s;
    overflow: hidden;
  }
}
</style>