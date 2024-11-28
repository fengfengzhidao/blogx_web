<script setup lang="ts">
import F_title from "@/components/common/f_title.vue";
import {reactive} from "vue";

const form = reactive({
  "siteInfo": {
    "title": "",
    "logo": "",
    "beian": "",
    "mode": 1
  },
  "project": {
    "title": "",
    "icon": "",
    "webPath": ""
  },
  "seo": {
    "keywords": "",
    "description": ""
  },
  "about": {
    "siteDate": "",
    "qq": "",
    "version": "",
    "wechat": "",
    "gitee": "",
    "bilibili": "",
    "github": ""
  },
  "login": {
    "qqLogin": false,
    "usernamePwdLogin": false,
    "emailLogin": false,
    "captcha": false
  },
  "indexRight": {
    "list": []
  },
  "article": {
    "noExamine": false,
    "commentLine": 4
  }
})


</script>

<template>
  <div class="site_view">
    <a-form>
      <a-row>
        <a-col :span="8">
          <div class="form site_form">
            <f_title>网站设置</f_title>
            <div class="body">
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="网站标题">
                <a-input placeholder="网站标题" v-model="form.siteInfo.title"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}"  label="logo">

              </a-form-item>
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}"  label="备案号">
                <a-input placeholder="备案号" v-model="form.siteInfo.beian"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}"  label="运行模式">
                <a-radio-group v-model="form.siteInfo.mode">
                  <a-radio :value="1">社区模式</a-radio>
                  <a-radio :value="2">博客模式</a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </div>
          <div class="form project_form">
            <f_title>项目设置</f_title>
          </div>
          <div class="form seo_form">
            <f_title>SEO设置</f_title>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="form about_form">
            <f_title>关于我们</f_title>
          </div>
          <div class="form login_form">
            <f_title>登录设置</f_title>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="form index_right_form">
            <f_title>首页右侧组件展示</f_title>
          </div>
          <div class="form article_form">
            <f_title>文章设置</f_title>
          </div>
        </a-col>
      </a-row>
    </a-form>

  </div>
</template>

<style lang="less">
.site_view {
  padding: 20px;

  .form{
    margin-bottom: 20px;
    .body{
      margin-top: 10px;
    }
  }
}
</style>