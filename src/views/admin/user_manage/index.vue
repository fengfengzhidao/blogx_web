<script setup lang="ts">

import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import {userListApi, type userListType} from "@/api/user_api";
import type {columnType} from "@/components/admin/f_list.vue";
import {reactive, ref} from "vue";
import F_modal_form from "@/components/admin/f_modal_form.vue";

const columns = [
  {title: "ID", dataIndex: 'id'},
  {title: "昵称", dataIndex: 'nick_name'},
  {title: "头像", slotName: 'avatar'},
  {title: "角色", dataIndex: 'role'},
  {title: "时间", slotName: 'created_at'},
  // {title: "操作", slotName: 'action'},
]

const formList = [
  {
    label: "昵称", field: "nick_name",  type: "input",
  }
]
const form = reactive({})
const visible = ref(false)

</script>

<template>
  <div>
    <f_modal_form v-model:visible="visible"></f_modal_form>
    <a-modal v-model:visible="visible" title="创建用户">
      <a-form :model="form">
        <a-form-item v-for="item in formList" :field="item.field" :label="item.label" :rules="{required: true}" validate-trigger="blur">
          <template v-if="item.type === 'input'">
            <a-input v-model="form[item.field]" :placeholder="item.label"></a-input>
          </template>
        </a-form-item>
      </a-form>
    </a-modal>
    <f_list @add="visible=true" ref="fListRef"  :url="userListApi" :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <a-avatar :image-url="record.avatar"></a-avatar>
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>