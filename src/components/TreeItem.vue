<template>
  <div class="tree-item">
    <img class="flag" src="@/assets/down.png">
  </div>
</template>

<script setup>
</script>

<style lang="stylus" scoped>
.tree-item {
  .flag {
    transform: rotate(90deg);
    transition: .3s;
  }
}
</style>