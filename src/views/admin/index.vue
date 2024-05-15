<script setup lang="ts">
import F_theme from "@/components/common/f_theme.vue";
import F_screen from "@/components/common/f_screen.vue";
import F_menu from "@/components/admin/f_menu.vue";
import {collapsed} from "@/components/admin/f_menu";
import F_breadcrumb from "@/components/admin/f_breadcrumb.vue";
import F_user_dropdown from "@/components/common/f_user_dropdown.vue";
import router from "@/router";
import F_tabs from "@/components/admin/f_tabs.vue";

function goHome() {
  router.push({name: "web"})
}


</script>

<template>
  <div class="f_admin">
    <div class="f_aside" :class="{collapsed: collapsed}">
      <div class="f_logo">

      </div>
      <f_menu></f_menu>
    </div>
    <div class="f_main">
      <div class="f_head">
        <f_breadcrumb></f_breadcrumb>
        <div class="f_actions">
          <span title="去首页" @click="goHome"><icon-home/></span>
          <f_theme></f_theme>
          <f_screen></f_screen>
          <f_user_dropdown></f_user_dropdown>
        </div>
      </div>
      <f_tabs></f_tabs>
      <div class="f_container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.f_admin {
  display: flex;
  background-color: var(--color-bg-1);
  color: @color-text-1;

  .f_aside {
    width: 240px;
    height: 100vh;
    border-right: @f_border;
    transition: width .3s;

    .f_logo {
      width: 100%;
      height: 90px;
      border-bottom: @f_border;
    }


    &.collapsed {
      width: 48px;

      & ~ .f_main {
        width: calc(100% - 48px);
      }
    }
  }


  .f_main {
    width: calc(100% - 240px);
    transition: width .3s;

    .f_head {
      width: 100%;
      height: 60px;
      border-bottom: @f_border;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;

      .f_actions {
        display: flex;
        align-items: center;

        svg {
          font-size: 18px;
          cursor: pointer;
          margin-right: 10px;
        }
      }
    }

    .f_tabs {
      width: 100%;
      height: 30px;
      border-bottom: @f_border;
    }

    .f_container {
      width: 100%;
      height: calc(100vh - 90px);
      overflow-y: auto;
      overflow-x: hidden;
      background-color: @color-fill-2;
    }
  }
}
</style>