<script setup lang="ts">
import {useRoute} from "vue-router";
import {qqLoginApi} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import {userStorei} from "@/stores/user_store";
import router from "@/router";

const store = userStorei()
const route = useRoute()


async function qqLogin() {
  const code = route.query.code
  if (!code) {
    return
  }
  const res = await qqLoginApi(code as string)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  store.saveUserInfo(res.data)
  router.push("/")
}

qqLogin()

</script>

<template>
  <div class="login_view">
  </div>
</template>

<style lang="less">

</style>