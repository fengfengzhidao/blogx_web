<script setup lang="ts">

import F_site from "@/components/admin/site/f_site.vue";
import F_title from "@/components/common/f_title.vue";
import type {emailResponse} from "@/api/site_api";
</script>

<template>
  <div class="email_view">
    <a-row>
      <a-col :span="8">
        <f_site name="email" v-slot="{form}:{form: emailResponse}">
          <f_title>邮箱设置</f_title>
          <div class="body">
            <a-alert type="info">配置邮箱之后，系统的邮箱注册功能才能正常使用</a-alert>
            <a-form :label-col-props="{span: 4}" :wrapper-col-props="{span: 20}">
              <a-form-item label="邮箱域名">
                <a-input placeholder="邮箱域名" v-model="form.domain"></a-input>
                <template #help>
                  邮箱域名配置参考 <a href="https://www.kdun.com/ask/1264131.html" target="_blank">如何设置SMTP邮件服务器</a>
                </template>
              </a-form-item>
              <a-form-item label="邮箱端口">
                <a-input-number placeholder="邮箱端口" v-model="form.port"></a-input-number>
              </a-form-item>
              <a-form-item label="发信邮箱">
                <a-input placeholder="发信邮箱" v-model="form.sendEmail"></a-input>
              </a-form-item>
              <a-form-item label="授权码">
                <a-input placeholder="授权码" type="password" v-model="form.authCode"></a-input>
              </a-form-item>
              <a-form-item label="发信名称">
                <a-input placeholder="发信名称" v-model="form.sendNickname"></a-input>
              </a-form-item>
              <a-form-item label="ssl">
                <a-switch v-model="form.ssl"></a-switch>
              </a-form-item>
              <a-form-item label="tls">
                <a-switch v-model="form.tls"></a-switch>
              </a-form-item>
              <div class="site_update_btn"></div>
            </a-form>
          </div>
        </f_site>
      </a-col>
    </a-row>

  </div>
</template>

<style lang="less">
.email_view{
  .arco-form{
    margin-top: 10px;
  }
}
</style>