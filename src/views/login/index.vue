<script setup lang="ts">
import {useRoute} from "vue-router";
import router from "@/router";

const route = useRoute()

async function qqLogin() {
  const code = route.query.code
  if (!code) {
    return
  }
  if (window.opener === null){
    // 用户手动访问这个页面
    router.push("/")
    return
  }
  window.opener.postMessage({code}, '*');
}

qqLogin()

</script>

<template>
  <div class="login_view">
  </div>
</template>

<style lang="less">

</style>