<script setup lang="ts">
import {userCenterStorei} from "@/stores/user_center_store";
import {reactive} from "vue";
import {showUpdatePwd} from "@/components/common/f_update_password";

const userCenterStore = userCenterStorei()

const form = reactive({})



</script>

<template>
  <div class="user_center_account_view">
    <div class="head">账号设置</div>
    <div class="body">
      <a-form :model="form" :label-col-props="{span: 2}">
        <a-form-item label="密码">
          <span v-if="userCenterStore.userDetail.usePassword">
            <span class="pwd">******</span> <a href="javascript:void 0" @click="showUpdatePwd"> 修改密码</a>
          </span>
          <span v-else>未启用</span>
        </a-form-item>
        <a-form-item label="邮箱">
          {{ userCenterStore.userDetail.email}}
          <a href="javascript:void 0">{{ userCenterStore.userDetail.email === '' ? '绑定邮箱' : '修改邮箱' }}</a>
        </a-form-item>
        <a-form-item label="登录记录">
          <router-link to="/">查看记录</router-link>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style  lang="less">
.user_center_account_view{
  background: var(--color-bg-1);
  border-radius: 5px;
  .head{
    padding: 20px 20px 10px 20px;
    border-bottom: @f_border;
    font-weight: 600;
    font-size: 16px;
  }
  .body{
    padding: 10px 20px 20px 20px;
    .arco-row{
      margin-bottom: 10px;
    }
    a{
      margin-left: 10px;
    }
    .pwd{
      margin-left: 10px;
    }
  }
}
</style>