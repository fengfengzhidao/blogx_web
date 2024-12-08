<script setup lang="ts">
import {type commentCreateRequest, type commentListType} from "@/api/comment_api";
import {dateTimeFormat} from "@/utils/date";
import F_a from "@/components/common/f_a.vue";
import F_label from "@/components/common/f_label.vue";
import {relationOptions} from "@/options/options";
import Comment_list from "@/components/web/comment/comment_list.vue";
import {reactive, ref} from "vue";
import {commentCreateApi} from "@/api/comment_api";
import {Message} from "@arco-design/web-vue";

const form = reactive<commentCreateRequest>({
  articleID: 0,
  parentID: 0,
  content: "",
})
const commentListRef = ref()

async function apply(item: commentListType) {
  form.articleID = item.articleID
  form.parentID = item.id
  if (form.content.trim() === "") {
    Message.warning("请输入回复内容")
    return
  }
  const res = await commentCreateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  form.content = ""
  commentListRef.value.getData()
}
const textareaRef = ref()

function show() {
  textareaRef.value?.focus()
}
function hide() {

}

</script>

<template>
  <div class="article_comment_view">
    <comment_list ref="commentListRef" :type="1" v-slot="{item}:{item: commentListType}">
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
          <a-trigger @show="show" @hide="hide" trigger="click" content-class="apply_comment_trigger" :unmount-on-close="false">
            <f_a class="apply">回复</f_a>
            <template #content>
              <a-button type="primary" size="mini" @click="apply(item)">回复</a-button>
              <a-textarea ref="textareaRef" :auto-size="{minRows: 3}" placeholder="请输入回复的内容" @keydown.enter="apply(item)"
                          v-model="form.content"></a-textarea>
            </template>
          </a-trigger>

        </div>
      </div>
      <div class="cover" v-if="item.articleCover">
        <img :src="item.articleCover" alt="">
        <span>
            <a-typography-text :ellipsis="{rows: 1, css: true}">文章：{{ item.articleTitle }}</a-typography-text>
          </span>
      </div>
    </comment_list>
  </div>
</template>

<style lang="less">
.article_comment_view {
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


}

.apply_comment_trigger {
  width: 300px;
  border-radius: 5px;
  border: @f_border;
  background: var(--color-bg-1);
  position: relative;
  padding: 5px;

  .arco-btn {
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 2;
  }

  .arco-textarea-wrapper {

  }
}
</style>