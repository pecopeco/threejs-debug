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
      <div class="content">
        <div class="key">
          <span>{{objKey}}</span>
          <span v-if="(typeof objVal) !== 'object'">：</span>
        </div>
        <div class="value" v-if="(typeof objVal) !== 'object'">{{objVal}}</div>
      </div>
    </div>
    <div class="item-list" v-if="typeof objVal === 'object'" :style="{ height: listHeight }">
      <TreeItem v-for="item in Object.keys(objVal)" :objKey="item" :objVal="objVal[item]" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, toRefs } from 'vue'

// 获取props传递参数
const props = defineProps({
  objKey: String,
  objVal: [String, Number, Object]
})
const { objKey, objVal } = toRefs(props)

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
    padding: 5px 0;
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