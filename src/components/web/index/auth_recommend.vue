<script setup lang="ts">

import F_card from "@/components/web/f_card.vue";
import {reactive} from "vue";
import type {listResponse} from "@/api";
import {authRecommendListApi, type authRecommendListType} from "@/api/article_api";
import {focusHandler} from "@/service/focus_service";

const data = reactive<listResponse<authRecommendListType>>({
  list: [],
  count: 0
})

async function getData() {
  const res = await authRecommendListApi({limit: 6, page: 1})
  data.list = res.data.list
}

async function focus(userID: number){
  await focusHandler(userID, true)
  getData()
}

getData()

</script>

<template>
  <f_card title="作者推荐" class="auth_recommend_com">
    <div class="item" v-for="item in data.list">
      <a-avatar :image-url="item.userAvatar"></a-avatar>
      <div class="info">
        <div class="title">
          <a-typography-text :ellipsis="{rows: 1}">{{ item.userNickname }}</a-typography-text>
        </div>
        <div class="abs">
          <a-typography-text :ellipsis="{rows: 1}">{{ item.userAbstract }}</a-typography-text>
        </div>
      </div>
      <a-button type="outline" @click="focus(item.userID)" size="mini">关注</a-button>
    </div>
  </f_card>
</template>

<style lang="less">
.auth_recommend_com {
  .item {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    align-items: center;
    .info{
      .title{
        font-size: 16px;
      }
      .arco-typography{
        color: var(--color-text-2);
      }
    }
    .arco-btn{
      border-radius: 50px;
    }
  }
}
</style>