<script setup lang="ts">
import {slogan, enSlogan} from "@/conf/global";
import F_theme from "@/components/common/f_theme.vue";
import {ref} from "vue";
import F_user_dropdown from "@/components/common/f_user_dropdown.vue";
import {userStorei} from "@/stores/user_store";

const store = userStorei()
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


</script>

<template>
  <div class="f_nav" :class="{isShow: isShow}">
    <div class="container">
      <div class="slogan">
        <div class="n1">{{ slogan }}</div>
        <div class="n2">{{ enSlogan }}</div>
      </div>
      <div class="left">
        <router-link to="/">首页</router-link>
      </div>
      <div class="right">
        <f_user_dropdown v-if="store.isLogin"></f_user_dropdown>
        <router-link v-else :to="{name: 'login'}">登录</router-link>
        <f_theme class="theme"></f_theme>
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

    .slogan {
      width: 10%;

      .n1 {
        font-size: 20px;

      }

      .n2 {
        font-size: 12px;

        transform: scale(0.87);
        transform-origin: left center;
      }
    }

    .left {
      width: 70%;

    }

    .right {
      width: 20%;
      display: flex;
      align-items: center;

      .theme {
        margin-left: 20px;
        color: white;
      }
    }

    a {
      font-size: 16px;
      text-decoration: none;
      color: white;
    }

    a.router-link-exact-active {
      color: @primary-6 !important;
    }
  }
}
</style>