<script setup lang="ts">

import F_list from "@/components/admin/f_list.vue";
import {userListApi, type userListType} from "@/api/user_api";

const columns = [
  {title: "ID", dataIndex: 'id'},
  {title: "昵称", dataIndex: 'nick_name'},
  {title: "头像", slotName: 'avatar'},
  {title: "角色", dataIndex: 'role'},
  {title: "时间", dataIndex: 'created_at'},
]

</script>

<template>
  <div>
    <f_list :url="userListApi" :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <a-avatar :image-url="record.avatar"></a-avatar>
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>