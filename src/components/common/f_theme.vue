<script setup lang="ts">
import {theme, setTheme, loadTheme} from "@/components/common/f_theme";

loadTheme()
</script>

<template>
  <span title="白天模式" v-if="theme === 'dark'"> <icon-sun-fill @click="setTheme('')"/></span>
  <span title="黑夜模式" v-else> <icon-moon-fill @click="setTheme('dark')"/></span>
</template>

<style scoped>

</style>