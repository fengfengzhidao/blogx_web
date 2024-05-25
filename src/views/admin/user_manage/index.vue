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
  // {title: "操作", slotName: 'action'},
]

const formList: formListType[] = [
  {
    label: "昵称", field: "nick_name", type: "input", rules: {required: true}, validateTrigger: "blur"
  },
  {
    label: "角色", field: "role", type: "textarea", rules: {required: true}, validateTrigger: "blur", source: [
      {label : "管理员", value: 1},
      {label : "用户", value: 2},
    ],
    autoSize: {minRows: 3, maxRows: 5}
  }
]
const form = reactive({})
const visible = ref(false)

function ok(form: object, fn: (val: boolean) => void) {
  // console.log(form)
  // fn(false)
}
</script>

<template>
  <div>
    <f_modal_form @ok="ok" v-model:visible="visible" title="创建用户" :form-list="formList">
    </f_modal_form>
    <f_list @add="visible=true" ref="fListRef" :url="userListApi" :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <a-avatar :image-url="record.avatar"></a-avatar>
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>