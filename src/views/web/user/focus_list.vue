<script setup lang="ts">
import {type fansListRequest, focusListApi, type focusListType} from "@/api/focus_api";
import {reactive} from "vue";
import type {listResponse} from "@/api";
import {useRoute} from "vue-router";
import router from "@/router";
import {userStorei} from "@/stores/user_store";
import {Message} from "@arco-design/web-vue";

const store = userStorei()
const route = useRoute()
const data = reactive<listResponse<focusListType>>({
  list: [],
  count: 0
})
const params = reactive<fansListRequest>({
  userID: Number(route.params.id),
  isMe: false,
})

async function getData() {
  params.isMe = store.userInfo.userID == Number(route.params.id)
  const res = await focusListApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.count = res.data.count
}

getData()


</script>

<template>
  <div>关注列表</div>
</template>

<style scoped lang="less">

</style>