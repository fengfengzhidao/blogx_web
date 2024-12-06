<script setup lang="ts">

import F_nav from "@/components/web/f_nav.vue";
import F_main from "@/components/web/f_main.vue";
</script>

<template>
  <div class="platform_view">
    <f_nav no-scroll></f_nav>
    <f_main>

      <div class="menu">
        <router-link :to="{name: 'platformArticle'}">文章管理</router-link>
      </div>
      <div class="view">
        <router-view></router-view>
      </div>
    </f_main>
  </div>
</template>

<style lang="less">
.platform_view {
  .f_main_com {
    height: calc(100vh - 60px);
  }

  .f_container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    > .menu {
      width: 180px;
      background: var(--color-bg-1);
      max-height: 400px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      padding: 20px 0;

      a {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color-text-2);
      }

      a:hover {
        background: var(--color-fill-1);
      }

      a.router-link-active {
        background: var(--color-fill-1);
        color: rgb(var(--arcoblue-6));
      }
    }

    .view {
      width: calc(100% - 200px);
    }
  }
}
</style>