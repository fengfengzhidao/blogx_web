<script setup lang="ts">

import F_card from "@/components/web/f_card.vue";
import {userCenterStorei} from "@/stores/user_center_store";
import {userDetailUpdateApi, type userDetailUpdateRequest} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";

const store = userCenterStorei()

async function userUpdateColumn(column: "openCollect" | "openFollow" | "openFans", value: boolean) {
  const data: userDetailUpdateRequest = {}
  data[column] = value

  const res = await userDetailUpdateApi(data)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}


</script>

<template>
  <div class="user_center_privacy_view">
    <f_card title="隐私设置">
      <a-form :model="store.userDetail" :label-col-props="{span: 4}" label-align="left">
        <a-form-item label="公开我的收藏">
          <a-switch v-model="store.userDetail.openCollect" @change="userUpdateColumn('openCollect', $event)"></a-switch>
        </a-form-item>
        <a-form-item label="公开我的关注列表">
          <a-switch v-model="store.userDetail.openFollow" @change="userUpdateColumn('openFollow', $event)"></a-switch>
        </a-form-item>
        <a-form-item label="公开我的粉丝列表">
          <a-switch v-model="store.userDetail.openFans" @change="userUpdateColumn('openFans', $event)"></a-switch>
        </a-form-item>
      </a-form>
    </f_card>
  </div>
</template>

<style scoped lang="less">

</style>