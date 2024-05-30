<script setup lang="ts">
import {theme, setTheme} from "@/components/common/f_theme";
</script>

<template>
  <span title="白天模式" v-if="theme === ''"> <icon-sun-fill @click="setTheme('dark')"/></span>
  <span title="黑夜模式" v-else> <icon-moon-fill @click="setTheme('')"/></span>
</template>

<style scoped>

</style>