<script setup lang="ts">

import {ref} from "vue";

const isFullScreen = ref(false)

// 全屏
function fullScreen(){
  document.documentElement?.requestFullscreen()
  isFullScreen.value = true
}

// 退出全屏
function exitFullScreen(){
  document?.exitFullscreen()
  isFullScreen.value = false
}

// 是否是全屏

</script>

<template>
  <icon-fullscreen v-if="!isFullScreen" title="全屏" @click="fullScreen"/>
  <icon-fullscreen-exit title="退出全屏" v-else @click="exitFullScreen"/>
</template>

<style scoped>

</style>