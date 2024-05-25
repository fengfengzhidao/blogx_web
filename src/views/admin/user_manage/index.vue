<script setup lang="ts">
import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import {userListApi, type userListType} from "@/api/user_api";
import type {columnType} from "@/components/admin/f_list.vue";
import {type formListType} from "@/components/admin/f_modal_form.vue";

const columns = [
  {title: "ID", dataIndex: 'id'},
  {title: "昵称", dataIndex: 'nick_name'},
  {title: "头像", slotName: 'avatar'},
  {title: "角色", dataIndex: 'role'},
  {title: "时间", slotName: 'created_at'},
  {title: "操作", slotName: 'action'},
]

const formList: formListType[] = [
  {
    label: "用户名", field: "user_name", type: "input", editDisable: true, rules: {required: true}, validateTrigger: "blur",
  },
  {
    label: "密码", field: "password", type: "password", editDisable: true, rules: {required: true}, validateTrigger: "blur",
  },
  {
    label: "昵称", field: "nick_name", type: "input", rules: {required: true}, validateTrigger: "blur",
  },
  {
    label: "角色", field: "role", type:"select", rules: {required: true}, validateTrigger: "blur", source: [
      {label: "管理员", value: 1},
      {label: "用户", value: 2},
    ],
  }
]

</script>

<template>
  <div>
    <f_list
        ref="fListRef"
        :url="userListApi"
        add-form-label="创建用户"
        edit-form-label="编辑用户"
        :form-list="formList"
        :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <a-avatar :image-url="record.avatar"></a-avatar>
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>