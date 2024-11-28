<script setup lang="ts">

import F_site from "@/components/admin/site/f_site.vue";
import F_title from "@/components/common/f_title.vue";
</script>

<template>
  <div class="email_view">
    <f_site name="email" v-slot="{form}">
      <f_title>邮箱设置</f_title>
      <div class="body">
        <a-alert type="info">配置邮箱之后，系统的邮箱注册功能才能正常使用</a-alert>
        <a-form>
          <a-form-item label="邮箱域名">

          </a-form-item>
          <div class="site_update_btn"></div>
        </a-form>
      </div>
    </f_site>
  </div>
</template>

<style lang="less">

</style>