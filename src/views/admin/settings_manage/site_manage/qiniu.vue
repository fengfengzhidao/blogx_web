<script setup lang="ts">

import F_site from "@/components/admin/site/f_site.vue";
import F_title from "@/components/common/f_title.vue";
import type {aiResponse, emailResponse, qiNiuResponse} from "@/api/site_api";
import F_image_upload from "@/components/common/f_image_upload.vue";
</script>

<template>
  <div class="ai_view">
    <a-row>
      <a-col :span="8">
        <f_site name="qiNiu" v-slot="{form}:{form: qiNiuResponse}">
          <f_title>对象存储设置设置</f_title>
          <div class="body">
            <a-form :label-col-props="{span: 4}" :wrapper-col-props="{span: 20}">
              <a-form-item label="是否启用">
                <a-switch v-model="form.enable"></a-switch>
              </a-form-item>
              <a-form-item label="accessKey">
                <a-input placeholder="accessKey" v-model="form.accessKey"></a-input>
              </a-form-item>
              <a-form-item label="secretKey">
                <a-input placeholder="secretKey" type="password" v-model="form.secretKey"></a-input>
              </a-form-item>
              <a-form-item label="存储桶">
                <a-input placeholder="bucket" v-model="form.bucket"></a-input>
              </a-form-item>
              <a-form-item label="访问uri">
                <a-input placeholder="uri" v-model="form.uri"></a-input>
                <template #help>
                  一般是你的协议加你的域名 如：http://image.fengfengzhidao.com
                </template>
              </a-form-item>
              <a-form-item label="地区">
                <a-input placeholder="region" v-model="form.region"></a-input>
                <template #help>
                  参考 <a href="https://blog.csdn.net/Coin_Collecter/article/details/129813929" target="_blank">七牛云的对象存储区域和访问域名对应表</a>
                </template>
              </a-form-item>
              <a-form-item label="上传目录">
                <a-input placeholder="prefix" v-model="form.prefix"></a-input>
              </a-form-item>
              <a-form-item label="大小限制">
                <a-input-number placeholder="大小限制" v-model="form.size"></a-input-number>
                <template #help>
                  单位MB
                </template>
              </a-form-item>
              <a-form-item label="过期时间">
                <a-input-number placeholder="过期时间" v-model="form.expiry"></a-input-number>
                <template #help>
                  用于生成客户端上传凭证的过期时间，单位秒
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