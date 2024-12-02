<script setup lang="ts">

import F_point from "@/components/common/f_point.vue";
import router from "@/router";

function select(val: string) {
  router.push({
    name: val
  })
}

</script>

<template>
  <f_point :count="1" class="f_nav_msg_com">
    <a-dropdown class="f_nav_msg_dropdown" @select="select">
      <a href="javascript:void 0">消息</a>
      <template #content>
        <a-doption value="msgComment">
          <f_point :count="1">评论和@</f_point>
        </a-doption>
        <a-doption value="msgDigg">
          <f_point :count="0">赞和收藏</f_point>
        </a-doption>
        <a-doption value="msgChat">
          <f_point :count="2">用户私信</f_point>
        </a-doption>
        <a-doption value="msgSystem">
          <f_point :count="0">系统通知</f_point>
        </a-doption>
      </template>
    </a-dropdown>
  </f_point>
</template>

<style lang="less">
.f_nav_msg_dropdown {
  .arco-dropdown-option-content {
    padding: 0 6px;
  }
}
</style>