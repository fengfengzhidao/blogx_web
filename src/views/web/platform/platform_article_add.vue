<script setup lang="ts">
import {ref} from 'vue';
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import F_card from "@/components/web/f_card.vue";
import {reactive} from "vue";
import {articleAddApi, type articleAddType} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";
import router from "@/router";

const form = reactive<articleAddType>({
  title: "",
  content: "",
  status: 1, // 2是发布，1是草稿
  // categoryID: null,
  cover: "",
  tagList: [],
  openComment: false
})

const formRef = ref()

async function create(status: 1 | 2) {
  form.status = status
  const val = await formRef.value.validate()
  if (val) return
  const res = await articleAddApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  router.push({name: 'platformArticle'})
}


</script>

<template>
  <div class="platform_article_add_view">
    <f_card title="发布文章">
      <a-form ref="formRef" :model="form" :label-col-props="{span: 0}" :wrapper-col-props="{span: 24}">
        <a-form-item field="title" validate-trigger="blur" :rules="[{required: true, message:'请输入文章标题'}]">
          <a-input v-model="form.title" placeholder="请输入标题（建议20字以内）"></a-input>
        </a-form-item>
        <a-form-item field="content" validate-trigger="blur" :rules="[{required: true, message:'请输入文章内容'}]">
          <MdEditor v-model="form.content" placeholder="请输入文章内容"></MdEditor>
        </a-form-item>
        <div class="actions">
          <a-button type="primary" @click="create(2)">发布文章</a-button>
          <a-button @click="create(1)">存为草稿</a-button>
        </div>
      </a-form>
    </f_card>
  </div>
</template>

<style lang="less">
.platform_article_add_view {
  .actions {
    .arco-btn {
      margin-right: 10px;
    }
  }
}
</style>