<script setup lang="ts">

import F_card from "@/components/web/f_card.vue";
import F_user from "@/components/common/f_user.vue";
import {reactive} from "vue";
import {articleHistoryListApi, type articleHistoryListRequest, type articleHistoryListType} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";
import type {listResponse} from "@/api";
import {dateFormat} from "@/utils/date";

interface historyType {
  date: string
  articleList: articleHistoryListType[]
}
const data = reactive<listResponse<historyType>>({
  list: [],
  count: 0
})
/*
[
{date:"". articleList: []}

]
 */
const params = reactive<articleHistoryListRequest>({
  type: 1,
})

async function getData() {
  const res = await articleHistoryListApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.count = res.data.count
  data.list = []
  const dateMap = {}
  for (const re of res.data.list) {
    const date = dateFormat(re.lookDate)
    const item = dateMap[date]
    if (item){
      dateMap[date].push(re)
    }else {
      dateMap[date] = [re]
    }
  }
  for (const key in dateMap) {
    const value = dateMap[key]
    data.list.push({
      date: key,
      articleList: value
    })
  }
}

getData()


</script>

<template>
  <div class="user_center_history_view">
    <f_card title="足迹">
      <a-timeline>
        <a-timeline-item v-for="date in data.list" lineType="dashed">
          {{  date.date  }}
          <template #label>
            <div class="article_list">
              <div class="item" v-for="item in date.articleList">
                <div class="cover">
                  <img v-if="item.cover" :src="item.cover" alt="">
                </div>
                <div class="info">
                  <div class="title">{{ item.title }}</div>
                  <div class="user">
                    <f_user :size="30" :nickname="item.nickname" :avatar="item.avatar"></f_user>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </a-timeline-item>
      </a-timeline>
    </f_card>
  </div>
</template>

<style lang="less">
.user_center_history_view {
  .article_list {
    .item {
      height: 60px;
      margin-bottom: 20px;
      display: flex;

      .cover {
        img {
          width: 80px;
          border-radius: 5px;
          height: 100%;
          object-fit: cover;
          margin-right: 10px;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          font-size: 15px;
          font-weight: 600;
          color: var(--color-text-1);
        }

        .f_user_com {
          color: var(--color-text-2);

          .text {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>