<script setup lang="ts">

import F_site from "@/components/admin/site/f_site.vue";
import F_title from "@/components/common/f_title.vue";
import type {emailResponse, qqResponse} from "@/api/site_api";
</script>

<template>
  <div class="email_view">
    <a-row>
      <a-col :span="8">
        <f_site name="qq" v-slot="{form}:{form: qqResponse}">
          <f_title>QQ设置</f_title>
          <div class="body">
            <a-form :label-col-props="{span: 4}" :wrapper-col-props="{span: 20}">
              <a-form-item label="appID">
                <a-input placeholder="appID" v-model="form.appID"></a-input>
                <template #help>
                  先去qq互联 <a href="https://connect.qq.com/" target="_blank">https://connect.qq.com/</a> 进行实名认证，然后创建网站应用
                </template>
              </a-form-item>
              <a-form-item label="appKey">
                <a-input placeholder="appKey" type="password" v-model="form.appKey"></a-input>
              </a-form-item>
              <a-form-item label="回调地址">
                <a-input placeholder="回调地址"  v-model="form.redirect"></a-input>
                <template #help>
                  这个地址必须是你线上的网址
                </template>
              </a-form-item>
              <div class="site_update_btn"></div>
            </a-form>
          </div>
        </f_site>
      </a-col>
    </a-row>

  </div>
</template>