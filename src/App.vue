<script setup lang="ts">
import {userStorei} from "@/stores/user_store";
import {title, ico} from "@/conf/global";

const store = userStorei()
store.loadUserInfo()

if (title){
  document.title = title
}
if (ico){
  const link = document.querySelector('link[rel="icon"]')
  if (link){
    link.setAttribute("href", ico)
  }
}

</script>

<template>
  <router-view></router-view>
</template>
