<script setup lang="ts">


import F_theme from "@/components/common/f_theme.vue";
</script>

<template>
  <div class="f_admin">
    <div class="f_aside">
      <div class="f_logo">

      </div>
      <div class="f_menu">

      </div>
    </div>
    <div class="f_main">
      <div class="f_head">
        <div class="f_breadcrumbs">
          <a-button type="primary">你好</a-button>
        </div>
        <div class="f_actions">
          <icon-home/>
          <f_theme></f_theme>
          <icon-fullscreen/>
          <icon-fullscreen-exit/>
          <div class="f_user_info_action">

          </div>
        </div>
      </div>
      <div class="f_tabs">

      </div>
      <div class="f_container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.f_admin {
  display: flex;
  background-color: @color-fill-1;
  color: @color-text-1;

  .f_aside {
    width: 240px;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: @f_border;

    .f_logo {
      width: 100%;
      height: 90px;
      border-bottom: @f_border;
    }
  }

  .f_main {
    width: calc(100% - 240px);

    .f_head {
      width: 100%;
      height: 60px;
      border-bottom: @f_border;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
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
    }
  }
}
</style>