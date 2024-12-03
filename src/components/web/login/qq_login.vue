<script setup lang="ts">
import {siteQQLoginUrlApi} from "@/api/site_api";
import {Message} from "@arco-design/web-vue";
import {qqLoginApi} from "@/api/user_api";

const emits = defineEmits(['ok'])

async function qqLogin() {
  const res = await siteQQLoginUrlApi()
  if (res.code) {
    Message.error(res.msg)
    return
  }
  const p = window.open(res.data, '_blank', 'width=400,height=300,menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes')
  window.addEventListener("message", async (ev) => {
    const code = ev.data.code
    p?.close()
    const res = await qqLoginApi(code)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    emits("ok", res.data)
  })
}
</script>

<template>
  <img @click="qqLogin" src="@/assets/img/QQ.svg" alt="">
</template>

<style scoped lang="less">

</style>