<script setup lang="ts">
import F_title from "@/components/common/f_title.vue";
import {reactive, ref} from "vue";
import F_image_upload from "@/components/common/f_image_upload.vue";
import type {TreeNodeData} from "@arco-design/web-vue";

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

function updateHandler() {
  console.log(form.siteInfo)
}

const treeData = ref([
  {title: "标签云", key: 1},
  {title: "作者推荐", key: 2},
  {title: "关于我们", key: 3},
  {title: "独家推广", key: 4},
  {title: "意见反馈", key: 5},
  {title: "文章推荐", key: 6},
])

function onDrop({dragNode, dropNode, dropPosition}:{
  dragNode: TreeNodeData,
  dropNode: TreeNodeData,
  dropPosition: number
}) {
  const data = treeData.value;
  const loop = (data: TreeNodeData[], key: string|number, callback: any ) => {
    data.some((item, index, arr) => {
      if (item.key === key) {
        callback(item, index, arr);
        return true;
      }
      if (item.children) {
        return loop(item.children, key, callback);
      }
      return false;
    });
  };

  loop(data, dragNode.key as number, (_, index, arr) => {
    arr.splice(index, 1);
  });

  if (dropPosition === 0) {
    loop(data, dropNode.key as number, (item) => {
      item.children = item.children || [];
      item.children.push(dragNode);
    });
  } else {
    loop(data, dropNode.key as number, (_, index, arr) => {
      arr.splice(dropPosition < 0 ? index : index + 1, 0, dragNode);
    });
  }
}

function allowDropHandler(options: { dropNode: TreeNodeData; dropPosition: -1 | 0 | 1 }): boolean {
  return options.dropPosition !== 0
}


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
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="logo">
                <f_image_upload v-model="form.siteInfo.logo" placeholder="logo地址"></f_image_upload>
              </a-form-item>
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="备案号">
                <a-input placeholder="备案号" v-model="form.siteInfo.beian"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="运行模式">
                <a-radio-group v-model="form.siteInfo.mode">
                  <a-radio :value="1">社区模式</a-radio>
                  <a-radio :value="2">博客模式</a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </div>
          <div class="form project_form">
            <f_title>项目设置</f_title>
            <div class="body">
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="网站title">
                <a-input placeholder="网站title" v-model="form.project.title"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="网站icon">
                <f_image_upload v-model="form.project.icon" placeholder="网站icon地址"></f_image_upload>
              </a-form-item>
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="前端地址">
                <a-input placeholder="前端地址" v-model="form.project.webPath"></a-input>
              </a-form-item>
            </div>
          </div>
          <div class="form seo_form">
            <f_title>SEO设置</f_title>
            <div class="body">
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="keywords">
                <a-input placeholder="keywords" v-model="form.seo.keywords"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="description">
                <a-textarea placeholder="description" :auto-size="{minRows: 2, maxRows: 3}"
                            v-model="form.seo.description"></a-textarea>
              </a-form-item>
            </div>
          </div>
          <a-button @click="updateHandler" type="primary">更新</a-button>
        </a-col>
        <a-col :span="8">
          <div class="form about_form">
            <f_title>关于我们</f_title>
            <div class="body">
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="建站日期">
                <a-input placeholder="建站日期" v-model="form.about.siteDate"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="网站版本">
                <span>10.0.1</span>
                <span>/</span>
                <span>{{ form.about.version }}</span>
              </a-form-item>
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="qq二维码">
                <f_image_upload shape="square" v-model="form.about.qq" placeholder="qq二维码地址"></f_image_upload>
              </a-form-item>
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="微信二维码">
                <f_image_upload shape="square" v-model="form.about.wechat"
                                placeholder="微信二维码地址"></f_image_upload>
              </a-form-item>
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="gitee">
                <a-input placeholder="gitee" v-model="form.about.gitee"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="bilibili">
                <a-input placeholder="bilibili" v-model="form.about.bilibili"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="github">
                <a-input placeholder="github" v-model="form.about.github"></a-input>
              </a-form-item>
            </div>
          </div>
          <div class="form login_form">
            <f_title>登录设置</f_title>
            <div class="body">
              <a-form-item :label-col-props="{span: 6}" :wrapper-col-props="{span: 16}" label="启用QQ登录">
                <a-switch v-model="form.login.qqLogin"></a-switch>
              </a-form-item>
              <a-form-item :label-col-props="{span: 6}" :wrapper-col-props="{span: 16}" label="用户名密码登录">
                <a-switch v-model="form.login.usernamePwdLogin"></a-switch>
              </a-form-item>
              <a-form-item :label-col-props="{span: 6}" :wrapper-col-props="{span: 16}" label="启用邮箱注册">
                <a-switch v-model="form.login.emailLogin"></a-switch>
              </a-form-item>
              <a-form-item :label-col-props="{span: 6}" :wrapper-col-props="{span: 16}" label="启用图片验证码">
                <a-switch v-model="form.login.captcha"></a-switch>
              </a-form-item>
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="form index_right_form">
            <f_title>首页右侧组件展示</f_title>
            <div class="body">
              <a-tree
                  class="index_right_tree"
                  draggable
                  blockNode
                  checkable
                  :data="treeData"
                  :allow-drop="allowDropHandler"
                  @drop="onDrop"
              />
            </div>
          </div>
          <div class="form article_form">
            <f_title>文章设置</f_title>
            <div class="body">
              <a-form-item :label-col-props="{span: 5}" :wrapper-col-props="{span: 13}" label="文章免审核">
                <a-switch v-model="form.article.noExamine"></a-switch>
              </a-form-item>
              <a-form-item :label-col-props="{span: 5}" :wrapper-col-props="{span: 13}" label="评论层数">
                <a-input-number placeholder="评论层数" v-model="form.article.commentLine"></a-input-number>
              </a-form-item>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-form>

  </div>
</template>

<style lang="less">
.site_view {
  padding: 20px;

  .form {
    margin-bottom: 20px;

    .body {
      margin-top: 10px;
    }
  }
  .index_right_form{
    .body{
      width: 400px;
      padding: 10px;
      border-radius: 5px;
      border: @f_border;

      .arco-tree-node{
        background: var(--color-fill-1);
        border-radius: 5px;
        margin-bottom: 3px;
      }
    }
  }
}
</style>