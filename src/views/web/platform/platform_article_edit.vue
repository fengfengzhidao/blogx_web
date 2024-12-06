<script setup lang="ts">
import F_card from "@/components/web/f_card.vue";
import {articleAddApi, type articleAddType, articleUpdateApi} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";
import router from "@/router";
import F_article_form from "@/components/web/article/f_article_form.vue";
import {useRoute} from "vue-router";

const route = useRoute()

async function edit(form: articleAddType) {
  const res = await articleUpdateApi({
    ...form,
    id: Number(route.params.id)
  })
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
    <f_card title="编辑文章">
      <f_article_form @ok="edit" :article-id="Number(route.params.id)"></f_article_form>
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