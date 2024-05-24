<script setup lang="ts">

import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import {articleCategoryOptionsApi, userListApi, type userListType} from "@/api/user_api";
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


const filters: filterGroupType[] = [
  {
    label: "角色过滤",
    source: [
      {label: "管理员", value: 1},
      {label: "用户", value: 2},
    ],
    column: "role",
    width: 140,
    // callback: (value: number)=>{
    //   console.log("父", value)
    // }
  },
  {
    label: "文章分类",
    source: articleCategoryOptionsApi,
    column: "category",
    width: 140,
    // callback: (value: number)=>{
    //   console.log("父", value)
    // }
  }
]

function remove(keyList: number[]) {
  console.log(keyList)
}
</script>

<template>
  <div>
    <f_list :actionGroup="actionGroup" :filter-group="filters" :url="userListApi" :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <a-avatar :image-url="record.avatar"></a-avatar>
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>