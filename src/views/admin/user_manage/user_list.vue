<script setup lang="ts">
import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import {userListApi, type userListType} from "@/api/user_api";
import type {columnType} from "@/components/admin/f_list.vue";
import {type formListType} from "@/components/admin/f_modal_form.vue";
import F_user from "@/components/common/f_user.vue";

const columns = [
  {title: "ID", dataIndex: 'id'},
  {title: "头像", slotName: 'avatar'},
  {title: "地址", slotName: 'addr'},
  {title: "发文数", dataIndex: 'articleCount'},
  {title: "注册时间", dataIndex: 'createdAt',  type: "date"},
  {title: "最后一次登录时间", dataIndex: 'lastLoginDate', type: "date"},
  {title: "操作", slotName: 'action'},
]

</script>

<template>
  <div>
    <f_list
        ref="fListRef"
        :url="userListApi"
        :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <f_user :nickname="record.nickname" :avatar="record.avatar"></f_user>
      </template>
      <template #addr="{record}:{record: userListType}">
        {{record.ip}}({{ record.addr}})
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>