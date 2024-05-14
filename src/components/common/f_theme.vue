<script setup lang="ts">
import {theme, setTheme, loadTheme} from "@/components/common/f_theme";

loadTheme()
</script>

<template>
  <icon-sun-fill v-if="theme === 'dark'" @click="setTheme('')"/>
  <icon-moon-fill v-if="theme === ''" @click="setTheme('dark')"/>
</template>

<style scoped>

</style>