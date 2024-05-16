<script setup lang="ts">
import {collapsed} from "@/components/admin/f_menu";
</script>

<template>
  <div class="f_logo" :class="{collapsed: collapsed}">
    <img src="https://www.fengfengzhidao.com/image/logo.png" class="logo" alt="logo">
    <div class="slogan">
      <div>枫枫知道</div>
      <div>fengfengzhidao</div>
    </div>
  </div>
</template>

<style lang="less">
.f_logo {
  display: flex;
  justify-content: center;
  align-items: center;

  &.collapsed {
    .slogan {
      transform: scale(0);
      transform-origin: left;
      opacity: 0;
    }
    .logo{
      transform: translateX(50px);
      width: 40px;
      height: 40px;
    }
  }

  .logo {
    width: 50px;
    height: 50px;
    transition: all .3s;
  }

  .slogan {
    margin-left: 10px;
    transition: all .3s;

    div:nth-child(1) {
      font-size: 22px;
      font-weight: 600;
    }

    div:nth-child(2) {
      font-size: 12px;
      margin-top: 1px;
    }
  }
}
</style>