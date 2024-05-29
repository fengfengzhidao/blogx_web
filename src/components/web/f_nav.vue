<script setup lang="ts">
import {slogan, enSlogan} from "@/conf/global";
import F_theme from "@/components/common/f_theme.vue";
</script>

<template>
  <div class="f_nav">
    <div class="container">
      <div class="slogan">
        <div class="n1">{{ slogan }}</div>
        <div class="n2">{{ enSlogan }}</div>
      </div>
      <div class="left">
        <router-link to="/">首页</router-link>
      </div>
      <div class="right">
        <router-link to="/login">登录</router-link>
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
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.06);

  .container {
    width: 1200px;
    display: flex;
    align-items: center;

    .slogan {
      width: 10%;

      .n1 {
        font-size: 20px;
        color: var(--color-text-1);
      }

      .n2 {
        font-size: 12px;
        color: var(--color-text-2);
        transform: scale(0.87);
        transform-origin: left center;
      }
    }

    .left {
      width: 70%;

    }

    .right {
      width: 20%;
      .theme{
        margin-left: 20px;
      }
    }

    a {
      color: var(--color-text-2);
      font-size: 16px;
      text-decoration: none;
    }
    a.router-link-exact-active{
      color: @primary-6;
    }
  }
}
</style>