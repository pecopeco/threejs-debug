<template>
  <div class="tree">
    <img class="flag" src="@/assets/down.png">
    <div class="title">camera</div>
  </div>
</template>

<script setup>
import TreeItem from '@/components/TreeItem.vue'

const camera = {
  near: 1000,
  position: {
    x: 1, y: 2, z: 3
  },
  rotation: {
    x: 4, y: 5, z: 6
  }
}
const scene = {
  near: 1000,
  position: {
    x: 1, y: 2, z: 3
  },
  rotation: {
    x: 4, y: 5, z: 6
  }
}
</script>

<style lang="stylus" scoped>
.tree {
  .flag {
    transform: rotate(90deg);
    transition: .3s;
  }
}
</style>