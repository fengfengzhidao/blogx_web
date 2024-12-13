<script setup lang="ts">
import {reactive} from "vue";
import type {listResponse} from "@/api";
import {articleSearchApi, type articleSearchRequest, type articleSearchType} from "@/api/search_api";
import {Message} from "@arco-design/web-vue";
import {dateCurrentFormat} from "../../../utils/date";
import {goArticle, goUser} from "@/utils/go_router";

const data = reactive<listResponse<articleSearchType>>({
  list: [],
  count: 0
})

const params = reactive<articleSearchRequest>({})

async function getData() {
  const res = await articleSearchApi(params)
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
  <div class="article_search_list_com">
    <div class="head">
      <div class="left">
        <span>猜你喜欢</span>
        <span>最新发布</span>
        <span>最多回复</span>
        <span>最多点赞</span>
        <span>最多收藏</span>
      </div>
      <a-input-search placeholder="搜索你感兴趣的文章"></a-input-search>
    </div>
    <div class="list">
      <div class="item" v-for="item in data.list">
        <div class="admin_top" v-if="item.adminTop"></div>
        <div class="top_info">
          <a-avatar @click="goUser(item.userID)" :size="30" :image-url="item.userAvatar"></a-avatar>
          <span @click="goUser(item.userID)" class="nick">{{ item.userNickname }}</span>
          <span class="date">最后更新于{{ dateCurrentFormat(item.updatedAt) }}</span>
        </div>
        <div class="article_info">
          <div class="cover" v-if="item.cover">
            <img @click="goArticle(item.id)" :src="item.cover" alt="">
          </div>
          <div class="info">
            <div class="title" @click="goArticle(item.id)">{{ item.title }}</div>
            <div class="abs">
              <a-typography-text :ellipsis="{rows: 2, css: true}">{{ item.abstract }}</a-typography-text>
            </div>
            <div class="data">
              <div class="data_list">
                  <span>
                <i class="iconfont icon-liulan"></i>
                {{ item.lookCount }}
              </span>
                <span>
                <i class="iconfont icon-dianzan_kuai"></i>
                {{ item.diggCount }}
              </span>
                <span>
                <i class="iconfont icon-shoucang1"></i>
                {{ item.collectCount }}
              </span>
                <span>
                <i class="iconfont icon-pinglun1"></i>
                {{ item.commentCount }}
              </span>
              </div>

              <div class="tags">
                <a-tag v-for="tag in item.tagList">{{ tag }}</a-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.article_search_list_com {
  background-color: var(--color-bg-1);
  border-radius: 5px;

  .head {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: @f_border;

    .arco-input-wrapper {
      width: 200px;
      border-radius: 100px;
      margin-right: 0;
    }

    span {
      cursor: pointer;
      margin-right: 20px;
      color: var(--color-text-1);

      &.active {
        color: rgb(var(--arcoblue-6));
      }

    }
  }

  .list {
    .item {
      padding: 10px 20px;
      border-bottom: @f_border;

      .top_info {
        display: flex;
        align-items: center;

        .nick {
          margin-left: 10px;
          cursor: pointer;
        }

        .date {
          margin-left: 20px;
          font-size: 12px;
          color: var(--color-text-2);
        }
      }

      .article_info {
        display: flex;
        margin-top: 5px;

        .cover {
          height: 100px;
          width: 177px;
          flex-shrink: 0;
          margin-right: 10px;
          border-radius: 5px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
          }
        }

        .info {
          .title {
            font-size: 17px;
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

            .data_list {
              display: flex;
              align-items: center;
              color: var(--color-text-2);

              span {
                margin-right: 10px;

                i {
                  margin-right: 5px;
                }
              }
            }

            .tags {
              span {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>