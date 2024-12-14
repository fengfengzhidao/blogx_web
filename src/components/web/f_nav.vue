<script setup lang="ts">
import {reactive, ref} from "vue";
import F_nav_msg from "@/components/web/f_nav_msg.vue";
import F_nav_avatar from "@/components/web/f_nav_avatar.vue";
import type {listResponse, paramsType} from "@/api";
import {textSearchApi, type textSearchType} from "@/api/search_api";
import {Message} from "@arco-design/web-vue";

interface Props {
  noScroll?: boolean
  scrollTop?: number
}

const props = defineProps<Props>()
const {noScroll = false, scrollTop = 200} = props

const isShow = ref(noScroll)

if (!noScroll) {
  window.onscroll = function () {
    const top = document.documentElement.scrollTop
    if (top >= scrollTop) {
      isShow.value = true
    } else {
      isShow.value = false
    }
  }
}
const visible = ref(true)
const data = reactive<listResponse<textSearchType>>({
  list: [],
  count: 0
})
const form = reactive<paramsType>({
  key: "",
})

async function search() {
  const res = await textSearchApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}


</script>

<template>
  <div class="f_nav" :class="{isShow: isShow}">
    <div class="container">
      <div class="logo">
        <a href="/">
          <span class="n1">Blogx</span>
          <span class="n2">社区版</span>
        </a>
      </div>
      <a-modal title="全文搜索" :footer="false" body-class="f_article_search_modal_body scrollbar"
               v-model:visible="visible">
        <div class="head">
          <a-input v-model="form.key" placeholder="请输入搜索内容"></a-input>
          <a-button @click="search" type="primary">搜索</a-button>
        </div>
        <div class="body">
          <div class="list">
            <div class="item" v-for="item in data.list">
              <div class="title" v-html="item.head"></div>
              <div class="abs" v-html="item.body"></div>
            </div>
          </div>
          <div class="page">
            共搜索到结果条
          </div>
        </div>
      </a-modal>
      <div class="center">
        <i class="iconfont icon-dengpao"></i>
        <a-input-search v-model="form.key" placeholder="搜索你喜欢的文章"></a-input-search>
      </div>
      <div class="right">
        <f_nav_avatar></f_nav_avatar>
        <f_nav_msg></f_nav_msg>
        <a class="history" href="javascript:void 0">历史</a>
        <router-link :to="{name: 'platformArticleAdd'}">
          <a-button type="primary"><i class="iconfont icon-jia"></i> <span>发布</span></a-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.f_nav {
  width: 100vw;
  height: 60px;
  position: fixed;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  color: white;
  transition: all .3s;


  &.isShow {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.06);
    background-color: var(--color-bg-1);
    color: var(--color-text-2);

    .n1 {
      color: var(--color-text-1);
    }

    .n2 {
      color: var(--color-text-2);
    }

    a {
      color: var(--color-text-2) !important;
    }

    .theme {
      color: var(--color-text-2) !important;
    }
  }

  .container {
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      width: 20%;

      a {
        .n1 {
          font-size: 16px;
          color: var(--color-text-1);
        }

        .n2 {
          margin-left: 10px;
          font-size: 14px;
          color: var(--color-text-2);
        }
      }
    }

    .center {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        margin-right: 10px;
        font-size: 20px;
        color: rgb(var(--arcoblue-6));
        cursor: pointer;
      }

      .arco-input-wrapper {
        width: 400px;
        border-radius: 20px;
      }
    }

    .right {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: end;

      .history {
        margin-right: 20px;
      }

      .arco-avatar {
        margin-right: 20px;
      }

      .f_nav_msg_com {
        margin-right: 20px;
      }


      .arco-btn {
        border-radius: 200px;
        font-size: 12px;
        display: flex;
        align-items: center;

        i {
          font-size: 14px;
          margin-right: 3px;
          margin-top: 1px;
        }
      }
    }
  }
}


.f_article_search_modal_body {
  padding: 0;
  max-height: 70vh;
  overflow-y: auto;

  .head {
    padding: 10px 20px;
    display: flex;

    .arco-btn {
      margin-left: 10px;
    }
  }

  .body {
    .item {
      padding: 10px 20px;
      cursor: pointer;

      .title {
        font-size: 16px;
      }

      .abs {
        margin-top: 5px;
        font-size: 12px;
      }

      em {
        color: red;
      }

      &:hover {
        background-color: var(--color-fill-1);
      }
    }

    .page {
      padding: 10px 20px;
      text-align: center;
      color: var(--color-text-2);
    }
  }
}
</style>