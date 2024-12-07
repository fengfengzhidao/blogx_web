<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import type {listResponse} from "@/api";
import {commentListApi, type commentListRequest, type commentListType, commentRemoveApi} from "@/api/comment_api";
import {Message} from "@arco-design/web-vue";
import {dateTimeFormat} from "../../../../utils/date";
import F_a from "@/components/common/f_a.vue";
import F_label from "@/components/common/f_label.vue";
import {relationOptions} from "@/options/options";
import {useRoute} from "vue-router";
const route = useRoute()
const data = reactive<listResponse<commentListType>>({
  list: [],
  count: 0
})
const params = reactive<commentListRequest>({
  type: 1,
  limit: 10,
})

const checkIdList = ref<number[]>([])

async function getData() {
  const res = await commentListApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}

getData()

async function removeComment() {

  const resList = await Promise.all(checkIdList.value.map((item) => commentRemoveApi(item)))
  resList.forEach((res) => {
    if (res.code) {
      Message.error(res.msg)
      return
    }
    Message.success(res.msg)
  })
  getData()
}

async function checkAll(val: boolean) {
  if (val) {
    checkIdList.value = data.list.map((item) => item.id)
    return
  }
  checkIdList.value = []
}

const isCheckAll = ref(false)


watch(()=>route.query.key, ()=>{
  if (route.query.key){
    params.key = route.query.key as string
    getData()
  }
})


</script>

<template>
  <div class="article_comment_view">
    <div class="actions">
      <a-checkbox v-model="isCheckAll" @change="checkAll">全选</a-checkbox>
      <a-button @click="removeComment" type="primary" status="danger" v-if="checkIdList.length" size="mini">删除
      </a-button>
    </div>
    <div class="comment_list">
      <a-checkbox-group v-model="checkIdList">
        <div class="item" v-for="item in data.list">
          <div class="check">
            <a-checkbox :value="item.id"></a-checkbox>
          </div>
          <div class="user">
            <a-avatar :image-url="item.userAvatar"></a-avatar>
          </div>
          <div class="info">
            <div class="nickname">
              <span class="nick">{{ item.userNickname }}</span>
              <span v-if="!item.isMe">
              <f_label :options="relationOptions" :value="item.relation"></f_label>
            </span>
              <span class="article" v-if="!item.articleCover">
              评论了文章： <router-link to="">{{ item.articleTitle }}</router-link>
            </span>
            </div>
            <div class="content">
              <a-typography-text :ellipsis="{rows: 2, css: true}">
                {{ item.content }}
              </a-typography-text>
            </div>
            <div class="data">
              <span class="date">{{ dateTimeFormat(item.createdAt) }}</span>
              <span class="digg">
              <i title="点赞" class="iconfont icon-dianzanliang"></i>
              <span>{{ item.diggCount }}</span>
            </span>
              <f_a class="apply">回复</f_a>
            </div>
          </div>
          <div class="cover" v-if="item.articleCover">
            <img :src="item.articleCover" alt="">
            <span>
            <a-typography-text :ellipsis="{rows: 1, css: true}">文章：{{ item.articleTitle }}</a-typography-text>
          </span>
          </div>
        </div>
      </a-checkbox-group>
      <div class="page" v-if="data.list.length">
        <a-pagination :total="data.count" show-total v-model:current="params.page" :page-size="params.limit"
                      @change="getData"></a-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.article_comment_view {
  .actions {
    display: flex;
    align-items: center;
    height: 24px;

    .arco-btn {
      margin-left: 10px;
    }
  }

  .comment_list {
    .arco-checkbox-group {
      width: 100%;
    }

    .item {
      display: flex;
      margin-top: 10px;
      border-bottom: @f_border;
      padding-bottom: 10px;

      .check {
        width: 25px;
        margin-top: 13px;
      }

      .user {
        width: 50px;
      }

      .cover {
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          object-fit: cover;
          border-radius: 5px;
          margin-bottom: 5px;
        }

        span {
          color: var(--color-text-2);
        }
      }

      .info {
        width: calc(100% - 175px);

        .nickname {
          color: var(--color-text-2);

          .nick {
            margin-right: 10px;
          }

          .article {

          }
        }

        .content {
          height: 3rem;
          margin: 5px 0;
          padding-right: 10px;
        }

        .data {
          color: var(--color-text-2);
          display: flex;
          align-items: center;
          font-size: 12px;

          .date {

          }

          .digg {
            margin: 0 10px;

            i {
              cursor: pointer;
              font-size: 12px;
              margin-right: 5px;
            }
          }

          a {
            color: var(--color-text-2);
          }
        }
      }
    }

    .page {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>