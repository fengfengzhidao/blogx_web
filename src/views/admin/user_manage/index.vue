<script setup lang="ts">

import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import {userListApi, type userListType} from "@/api/user_api";
import type {columnType} from "@/components/admin/f_list.vue";
import {reactive, ref} from "vue";
import F_modal_form, {type formListType} from "@/components/admin/f_modal_form.vue";
import {articleCategoryOptionsApi} from "@/api/user_api";

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
    label: "昵称", field: "nick_name", type: "input", rules: {required: true}, validateTrigger: "blur",
  },
  {
    label: "角色", field: "role", type:"select", rules: {required: true}, validateTrigger: "blur", source: [
      {label: "管理员", value: 1},
      {label: "用户", value: 2},
    ],
  }
]
const visible = ref(false)

function create(form: object, fn?: (val: boolean) => void) {
  console.log("create", form)
  // fn(false)
}
function update(form: object, fn?: (val: boolean) => void) {
  console.log("update", form)
  // fn(false)
}

const modalFormRef = ref()

function edit(record: userListType) {
  modalFormRef.value.setForm(record)
  visible.value = true
}

</script>

<template>
  <div>
    <f_modal_form ref="modalFormRef" @create="create" @update="update" v-model:visible="visible" add-label="创建用户" edit-label="编辑用户" :form-list="formList"></f_modal_form>
    <f_list @edit="edit" @add="visible=true" ref="fListRef" :url="userListApi" :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <a-avatar :image-url="record.avatar"></a-avatar>
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>