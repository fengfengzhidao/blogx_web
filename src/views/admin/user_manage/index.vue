<script setup lang="ts">

import F_list from "@/components/admin/f_list.vue";
import {userListApi, type userListType} from "@/api/user_api";

const columns = [
  {title: "ID", dataIndex: 'id'},
  {title: "昵称", dataIndex: 'nick_name'},
  {title: "头像", slotName: 'avatar'},
  {title: "角色", dataIndex: 'role'},
  {title: "时间", dataIndex: 'created_at'},
  {title: "操作", slotName: 'action'},
]

</script>

<template>
  <div>
    <f_list :url="userListApi" :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <a-avatar :image-url="record.avatar"></a-avatar>
      </template>
      <template #action_left>
        <a-button>预览</a-button>
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>