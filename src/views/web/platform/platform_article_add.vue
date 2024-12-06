<script setup lang="ts">
import F_card from "@/components/web/f_card.vue";
import {articleAddApi, type articleAddType} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";
import router from "@/router";
import F_article_form from "@/components/web/article/f_article_form.vue";

async function create(form: articleAddType) {
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
      <f_article_form @ok="create"></f_article_form>
    </f_card>
  </div>
</template>

<style lang="less">
.platform_article_add_view {
  .f_card_com {
    .body {
      overflow-y: auto;
      max-height: calc(100vh - 160px);
    }
  }
}
</style>