<script setup lang="ts">
import {useRoute} from "vue-router";
import {userBaseStorei} from "@/stores/user_base_store";
import F_article_list from "@/components/web/article/f_article_list.vue";
import F_collect_list from "@/components/web/article/f_collect_list.vue";
import {collectArticleRemoveApi} from "@/api/collect_api";
import {Message} from "@arco-design/web-vue";
import {ref} from "vue";

const baseStore = userBaseStorei()
const route = useRoute()
const fArticleListRef = ref()

async function dispatchDelete(idList: number[]) {
  const res = await collectArticleRemoveApi(idList)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  fArticleListRef.value.getData()

}
</script>

<template>
  <div class="user_article_list_view">
    <f_collect_list :user-id="Number(route.params.id)" :is-me="baseStore.isMe"></f_collect_list>
    <f_article_list ref="fArticleListRef" @dispatch-delete="dispatchDelete" :is-check="baseStore.isMe"></f_article_list>
  </div>
</template>

<style lang="less">
.user_article_list_view {
  display: flex;
  height: 100%;


  .f_category_list_com {
    width: 150px;
  }


}

</style>