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


const actionGroup = [
  {
    label: "批量升级",
    callback: function (keyList: number[]) {
      console.log(keyList)
    }
  }
]

function remove(keyList: number[]) {
  console.log(keyList)
}
</script>

<template>
  <div>
    <f_list :actionGroup="actionGroup" :url="userListApi" :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <a-avatar :image-url="record.avatar"></a-avatar>
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>