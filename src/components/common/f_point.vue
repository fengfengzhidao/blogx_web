<script setup lang="ts">
interface Props {
  count: number
}

const props = defineProps<Props>()
</script>

<template>
  <a-badge class="f_point_com" :count="props.count" dot :dotStyle="{ width: '5px', height: '5px' }">
    <slot></slot>
  </a-badge>
</template>

<style  lang="less">
.f_point_com{
  .arco-badge-dot{
    top: 1px;
    right: -3px;
  }
}
</style>