<script setup lang="ts">
import F_card from "@/components/web/f_card.vue";
import {reactive} from "vue";
import type {listResponse} from "@/api";
import {
  articleRecommendListApi,
  type articleRecommendListType,
} from "@/api/article_api";

const data = reactive<listResponse<articleRecommendListType>>({
  list: [],
  count: 0
})

async function getData() {
  const res = await articleRecommendListApi({limit: 6, page: 1})
  data.list = res.data.list
}

getData()

</script>

<template>
  <f_card title="文章推荐" class="article_recommend_com">
    <div class="item" v-for="item in data.list">
      <router-link :to="{name: 'articleDetail', params: {id: item.id}}">
        <a-typography-text :ellipsis="{rows: 1}">{{ item.title }}</a-typography-text>
      </router-link>
    </div>
  </f_card>
</template>

<style lang="less">
.article_recommend_com {
  .item {
    padding: 5px 0;
  }
}
</style>