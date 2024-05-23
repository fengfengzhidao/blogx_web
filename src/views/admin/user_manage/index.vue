<script setup lang="ts">

import F_list from "@/components/admin/f_list.vue";
import {userListApi, type userListType} from "@/api/user_api";
import type {columnType} from "@/components/admin/f_list.vue";

const columns = [
  {title: "ID", dataIndex: 'id'},
  {title: "昵称", dataIndex: 'nick_name'},
  {title: "头像", slotName: 'avatar'},
  {title: "角色", dataIndex: 'role'},
  {title: "时间", slotName: 'created_at'},
  {title: "操作", slotName: 'action'},
]
function remove(keyList: number[]){
  console.log(keyList)
}
</script>

<template>
  <div>
    <f_list :url="userListApi" :columns="columns" no-default-delete @delete="remove">
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