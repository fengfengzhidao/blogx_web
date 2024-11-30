<script setup lang="ts">
import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import {userListApi, type userListType} from "@/api/user_api";
import type {columnType} from "@/components/admin/f_list.vue";
import {type formListType} from "@/components/admin/f_modal_form.vue";
import F_user from "@/components/common/f_user.vue";
import {reactive, ref} from "vue";
import {userUpdateAdminApi} from "@/api/user_api";
import type {userUpdateAdminRequest} from "@/api/user_api";
import F_image_upload from "@/components/common/f_image_upload.vue";
import {Message} from "@arco-design/web-vue";
import {roleOptions} from "@/options/options";

const columns = [
  {title: "ID", dataIndex: 'id'},
  {title: "头像", slotName: 'avatar'},
  {title: "用户名", dataIndex: 'username'},
  {title: "角色", dataIndex: 'role', type: "options", options: roleOptions},
  {title: "地址", slotName: 'addr'},
  {title: "发文数", dataIndex: 'articleCount'},
  {title: "注册时间", dataIndex: 'createdAt', type: "date"},
  {title: "最后一次登录时间", dataIndex: 'lastLoginDate', type: "date"},
  {title: "操作", slotName: 'action'},
]
const visible = ref(false)
const form = reactive<userUpdateAdminRequest>({
  userID: 0,
  username: "",
  nickname: "",
  avatar: "",
  // abstract: "",
  // role: 2,
})

function edit(record: userListType) {
  form.userID = record.id
  form.username = record.username
  form.nickname = record.nickname
  form.avatar = record.avatar
  visible.value = true
}

const fListRef = ref()

async function handler() {
  const res = await userUpdateAdminApi(form)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  fListRef.value.getList()
  return true
}
</script>

<template>
  <div>
    <a-modal v-model:visible="visible" title="编辑用户信息" :on-before-ok="handler">
      <a-form :model="form">
        <a-form-item label="昵称">
          <a-input placeholder="昵称" v-model="form.nickname"></a-input>
        </a-form-item>
        <a-form-item label="用户名">
          <a-input placeholder="用户名" v-model="form.username"></a-input>
        </a-form-item>
        <a-form-item label="头像">
          <f_image_upload v-model="form.avatar"></f_image_upload>
        </a-form-item>
        <a-form-item label="简介">
          <a-textarea placeholder="简介" v-model="form.abstract"></a-textarea>
        </a-form-item>
        <a-form-item label="角色">
          <a-select v-model="form.role" :options="roleOptions" placeholder="角色"></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <f_list
        ref="fListRef"
        no-add
        @edit="edit"
        :url="userListApi"
        :columns="columns">
      <template #avatar="{record}:{record: userListType}">
        <f_user :nickname="record.nickname" :avatar="record.avatar"></f_user>
      </template>
      <template #addr="{record}:{record: userListType}">
        {{ record.ip }}({{ record.addr }})
      </template>
    </f_list>
  </div>
</template>

<style scoped>

</style>