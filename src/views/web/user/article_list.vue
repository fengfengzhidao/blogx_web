<script setup lang="ts">
import {reactive, ref} from "vue";
import {articleListApi, type articleListRequest, type articleListType} from "@/api/article_api";
import type {listResponse} from "@/api";
import {goArticle} from "@/utils/go_router";
import {dateCurrentFormat} from "@/utils/date";
import {IconEye, IconMessage, IconMore} from "@arco-design/web-vue/es/icon";
import {useRoute} from "vue-router";
import {Message} from "@arco-design/web-vue";
import {userBaseStorei} from "@/stores/user_base_store";
import {
  type categoryListType,
  categoryListApi,
  categoryCreateApi,
  type categoryCreateRequest
} from "@/api/category_api";
import F_category_list from "@/components/web/article/f_category_list.vue";

const baseStore = userBaseStorei()
const route = useRoute()
const data = reactive<listResponse<articleListType>>({
  list: [],
  count: 0,
})
const params = reactive<articleListRequest>({
  type: 1,
  userID: Number(route.params.id)
})

async function getData() {
  const res = await articleListApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.count = res.data.count
}


getData()

</script>

<template>
  <div class="user_article_list_view">
    <f_category_list :user-id="Number(route.params.id)"></f_category_list>
    <div class="article_list">
      <div class="item" v-for="item in data.list">
        <div class="cover">
          <img @click="goArticle(item.id)" v-if="item.cover" :src="item.cover" alt="">
        </div>
        <div v-if="item.userTop" class="user_top">
          <a-tag color="blue">用户置顶</a-tag>
        </div>
        <div class="info">
          <div class="title" @click="goArticle(item.id)">{{ item.title }}</div>
          <div class="abs">
            <a-typography-text :ellipsis="{rows: 2, css: true}">
              {{ item.abstract }}
            </a-typography-text>
          </div>
          <div class="data">
            <div class="look">
              <IconEye></IconEye>
              <span>{{ item.lookCount }}</span>
            </div>
            <div class="comment">
              <IconMessage></IconMessage>
              <span>{{ item.commentCount }}</span>
            </div>
            <div class="tags">
              <template v-if="item.tagList.length <= 3">
                <a-tag class="tag" v-for="tag in item.tagList">{{ tag }}</a-tag>
              </template>
              <a-overflow-list v-else :min="5">
                <a-tag v-for="tag in item.tagList">{{ tag }}</a-tag>
              </a-overflow-list>
            </div>
            <div class="date">最后更新于{{ dateCurrentFormat(item.updatedAt) }}</div>
          </div>
        </div>
      </div>

      <div class="page" v-if="data.count">
        <a-pagination @change="getData" v-model:current="params.page" :page-size="params.limit" :total="data.count"
                      show-total></a-pagination>
      </div>
      <div class="no_data" v-if="data.list.length === 0">
        <a-empty></a-empty>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.user_article_list_view {
  display: flex;
  height: 100%;


  .f_category_list_com {
    width: 150px;
  }

  .article_list {
    width: calc(100% - 150px);
    margin-top: 10px;

    .item {
      display: flex;
      position: relative;
      padding: 10px 20px;

      .user_top {
        position: absolute;
        right: 10px;
        top: 5px;
      }


      &:hover {
        background: var(--color-fill-1);

        .more {
          opacity: 1;
        }
      }

      .cover {
        img {
          width: 160px;
          border-radius: 5px;
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
          cursor: pointer;
        }

        .abs {
          margin: 5px 0;
        }

        .data {
          display: flex;
          align-items: center;
          color: var(--color-text-2);

          .look, .comment {
            margin-right: 10px;

            span {
              margin-left: 5px;
            }
          }

          .tags {
            margin-right: 10px;
            max-width: 400px;

            .tag {
              margin-right: 10px;
            }
          }

          .date {
            font-size: 12px;
            color: var(--color-text-2);
          }
        }
      }

      .more {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        opacity: 0;
      }
    }

    .page {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
  }
}

</style>