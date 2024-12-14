<script setup lang="ts">
import {reactive, ref} from "vue";
import F_nav_msg from "@/components/web/f_nav_msg.vue";
import F_nav_avatar from "@/components/web/f_nav_avatar.vue";
import type {listResponse, paramsType} from "@/api";
import {textSearchApi, type textSearchType} from "@/api/search_api";
import {Message} from "@arco-design/web-vue";
import F_text_search_modal from "@/components/web/f_text_search_modal.vue";

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
const visible = ref(false)
const key = ref("")
const textSearchRef = ref()
function search(){
  visible.value = true
  if (key.value){
    textSearchRef.value.setSearch(key.value)
  }
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
     <f_text_search_modal ref="textSearchRef" v-model:visible="visible"></f_text_search_modal>
      <div class="center">
        <i class="iconfont icon-dengpao"></i>
        <a-input-search v-model="key" @search="search" @keydown.enter="search" placeholder="搜索你喜欢的文章"></a-input-search>
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



</style>