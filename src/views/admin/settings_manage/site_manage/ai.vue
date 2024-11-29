<script setup lang="ts">

import F_site from "@/components/admin/site/f_site.vue";
import F_title from "@/components/common/f_title.vue";
import type {aiResponse, emailResponse} from "@/api/site_api";
import F_image_upload from "@/components/common/f_image_upload.vue";
</script>

<template>
  <div class="ai_view">
    <a-row>
      <a-col :span="8">
        <f_site name="ai" v-slot="{form}:{form: aiResponse}">
          <f_title>AI设置</f_title>
          <div class="body">
            <a-form :label-col-props="{span: 4}" :wrapper-col-props="{span: 20}">
              <a-form-item label="是否启用">
                <a-switch v-model="form.enable"></a-switch>
              </a-form-item>
              <a-form-item label="secretKey">
                <a-input placeholder="secretKey" type="password" v-model="form.secretKey"></a-input>
              </a-form-item>
              <a-form-item label="AI昵称">
                <a-input placeholder="发信邮箱" v-model="form.nickname"></a-input>
              </a-form-item>
              <a-form-item label="AI头像">
                <f_image_upload v-model="form.avatar" placeholder="头像地址"></f_image_upload>
              </a-form-item>
              <a-form-item label="开场白">
                <a-textarea placeholder="开场白" v-model="form.abstract"
                            :auto-size="{minRows: 3, maxRows: 5}"></a-textarea>
              </a-form-item>
              <div class="site_update_btn"></div>
            </a-form>
          </div>
        </f_site>
      </a-col>
    </a-row>

  </div>
</template>