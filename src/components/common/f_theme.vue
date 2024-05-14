<script setup lang="ts">
import {ref} from "vue";

const theme = ref('')

function setTheme(val: string) {
  if (val === "dark") {
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
  }
  theme.value = val
  localStorage.setItem("theme", val)
}

function loadTheme() {
  const val = localStorage.getItem("theme")
  if (val) {
    if (val === "dark"){
      theme.value = val
      setTheme(val)
    }
  }
}

loadTheme()


</script>

<template>
  <icon-sun-fill v-if="theme === 'dark'" @click="setTheme('')"/>
  <icon-moon-fill v-if="theme === ''" @click="setTheme('dark')"/>
</template>

<style scoped>

</style>