<script setup lang="ts">
import F_nav from "@/components/web/f_nav.vue";
import F_main from "@/components/web/f_main.vue";
import {MdPreview, MdCatalog} from "md-editor-v3";
import "md-editor-v3/lib/preview.css"
import {articleDetailApi, type articleDetailType, articleDiggApi} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";
import {type articleCollectRequest, articleCollectApi} from "@/api/article_api";

const scrollElement = document.documentElement;
import {useRoute} from "vue-router";
import {reactive, ref, watch} from "vue";
import {dateTimeFormat} from "@/utils/date";
import {theme} from "@/components/common/f_theme";
import F_article_collect_modal from "@/components/web/article/f_article_collect_modal.vue";
import Article_comment from "@/components/web/comment/article_comment.vue";
import {goUser} from "@/utils/go_router";

const route = useRoute()
const data = reactive<articleDetailType>({
  id: 0,
  createdAt: "",
  updatedAt: "",
  title: "",
  abstract: "",
  content: "",
  categoryID: 0,
  categoryTitle: "",
  tagList: [],
  cover: "",
  userID: 0,
  lookCount: 0,
  diggCount: 0,
  commentCount: 0,
  collectCount: 0,
  openComment: false,
  status: 0,
  username: "",
  nickname: "",
  userAvatar: "",
  "isDigg": false,
  "isCollect": false
})

async function getData() {
  const res = await articleDetailApi(Number(route.params.id))
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}

watch(() => route.params.id, () => {
  getData()
}, {immediate: true})


const isFixed = ref(false)

function scroll() {
  const top = document.documentElement.scrollTop
  if (top >= 210) {
    isFixed.value = true
  } else {
    isFixed.value = false
  }
}

window.addEventListener("scroll", scroll)


async function digg() {
  const res = await articleDiggApi(data.id)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  data.isDigg = !data.isDigg
  if (data.isDigg) {
    data.diggCount++
  } else {
    data.diggCount--
  }
}

const visible = ref(false)

async function collect() {
  if (data.isCollect) {
    // 取消收藏
    // const res = await articleCollectApi({articleID: data.id, collectID: 1})
  }
  visible.value = true
}

async function collectArticle(id: number) {
  const res = await articleCollectApi({articleID: data.id, collectID: id})
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  return
}

function goTop() {
  document.documentElement.scrollTo({top: 0, behavior: "smooth"})
}

const articleCommentRef = ref()

function goComment() {
  const div = document.querySelector(".add_comment") as HTMLDivElement
  const top = div.offsetTop
  document.documentElement.scrollTo({top: top, behavior: "smooth"})

  setTimeout(() => {
    articleCommentRef.value.focus()
  }, 800)
}


</script>

<template>
  <div class="article_detail_view">
    <f_nav no-scroll></f_nav>
    <f_main>
      <f_article_collect_modal @select="collectArticle" v-model:visible="visible"></f_article_collect_modal>
      <div class="article_container">
        <div class="article_content">
          <div class="head">
            <div class="title">{{ data.title }}</div>
            <div class="date">{{ dateTimeFormat(data.createdAt) }}</div>
            <div class="tags">
              <a-tag v-for="item in data.tagList">{{ item }}</a-tag>
            </div>
          </div>
          <div class="body">
            <MdPreview :id="`md_${data.id}`" :theme="theme" :model-value="data.content"></MdPreview>
          </div>
        </div>

        <article_comment v-if="data.openComment" ref="articleCommentRef" :article-id="Number(route.params.id)"></article_comment>
        <div v-else class="no_comment">作者已关闭文章评论</div>
      </div>
      <div class="article_info">
        <div class="user_info">
          <div class="user">
            <a-avatar @click="goUser(data.userID)" :size="60" :image-url="data.userAvatar"></a-avatar>
          </div>
          <div class="nick" @click="goUser(data.userID)">{{ data.nickname }}</div>
          <div class="data">
            <div class="item">
              <span>{{ data.lookCount }}</span>
              <span><i class="iconfont icon-liulan"></i></span>
            </div>
            <div class="item">
              <span>{{ data.diggCount }}</span>
              <span><i class="iconfont icon-dianzan_kuai"></i></span>
            </div>
            <div class="item">
              <span>{{ data.collectCount }}</span>
              <span><i class="iconfont icon-shoucang1"></i></span>
            </div>
            <div class="item">
              <span>{{ data.commentCount }}</span>
              <span><i class="iconfont icon-pinglun1"></i></span>
            </div>
          </div>
        </div>
        <div class="catalog_action" :class="{isFixed: isFixed}">
          <div class="catalog">
            <div class="head">文章目录</div>
            <div class="body">
              <MdCatalog :offsetTop="61" :scrollElementOffsetTop="60" :editorId="`md_${data.id}`"
                         :scrollElement="scrollElement"
                         :theme="theme"></MdCatalog>
            </div>
          </div>
          <div class="article_action">
            <i title="点赞" @click="digg" class="iconfont icon-dianzan_kuai" :class="{active: data.isDigg}"></i>
            <i title="收藏" @click="collect" class="iconfont icon-shoucang1" :class="{active: data.isCollect}"></i>
            <i title="回到顶部" @click="goTop" class="iconfont icon-zhiding"></i>
            <i title="去评论" @click="goComment" class="iconfont icon-pinglun1"></i>
          </div>
        </div>

      </div>
    </f_main>
  </div>
</template>

<style lang="less">
.article_detail_view {

  .f_container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100vh - 100px);
  }

  .article_container {
    width: calc(100% - 280px);

    .article_content {
      background: var(--color-bg-1);
      border-radius: 5px;

      .head {
        padding: 20px 20px 10px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: @f_border;

        .title {
          font-size: 20px;
          font-weight: 600;
          color: var(--color-text-1);
        }

        .date {
          color: var(--color-text-2);
          font-size: 12px;
          margin: 10px 0;
        }

        .tags {
          span {
            margin-right: 10px;

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }

      .body {
        padding: 10px 20px 20px 20px;

        .md-editor-preview-wrapper {
          padding: 0;
        }
      }
    }


    .no_comment{
      margin-top: 20px;
      padding: 20px;
      text-align: center;
      background-color: var(--color-bg-1);
      border-radius: 5px;
      color: var(--color-text-2);
    }
  }

  .article_info {
    width: 260px;


    .user_info {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: var(--color-bg-1);
      border-radius: 5px;

      .nick {
        margin: 10px 0 20px 0;
        color: var(--color-text-1);
      }

      .data {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;

        .item {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          span:nth-child(1) {
            font-size: 16px;
            color: var(--color-text-1);
            margin-bottom: 3px;
          }

          i {
            font-size: 18px;
            color: var(--color-text-2);
          }

          .icon-liulan {
            font-size: 20px;
          }

          .icon-pinglun1 {
            font-size: 20px;
            margin-top: 3px;
          }
        }
      }
    }

    .catalog_action {
      .md-editor-catalog {
        position: relative;
      }

      &.isFixed {
        position: fixed;
        top: 60px;
        width: 260px;
      }
    }

    .catalog {
      background: var(--color-bg-1);
      border-radius: 5px;
      margin-top: 20px;

      .head {
        padding: 20px 20px 10px 20px;
        border-bottom: @f_border;
        font-weight: 600;
        color: var(--color-text-1);
      }

      .body {
        padding: 10px 20px 20px 20px;

        .md-editor-catalog-active > span {
          color: rgb(var(--arcoblue-6));
        }

        .md-editor-catalog-link span:hover {
          color: rgb(var(--arcoblue-5));
        }

        .md-editor-catalog-indicator {
          background-color: rgb(var(--arcoblue-6));
        }
      }
    }


    .article_action {
      background: var(--color-bg-1);
      border-radius: 5px;
      margin-top: 20px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      justify-items: center;
      align-items: center;
      padding: 10px 0;

      i {
        padding: 10px;
        cursor: pointer;
        border-radius: 5px;
        color: var(--color-text-2);

        &:hover {
          background: var(--color-fill-1);
        }

        &.active {
          color: rgb(var(--arcoblue-6));
        }
      }
    }
  }
}
</style>