<script setup lang="ts">

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
        <div class="f_breadcrumbs"></div>
        <div class="f_actions">
          <icon-home/>
          <icon-sun-fill/>
          <icon-moon-fill/>
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

  .f_aside {
    width: 240px;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: 1px solid var(--color-neutral-2);
    .f_logo{
      width: 100%;
      height: 90px;
      border-bottom: 1px solid var(--color-neutral-2);
    }
  }

  .f_main {
    width: calc(100% - 240px);

    .f_head {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid var(--color-neutral-2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }

    .f_tabs {
      width: 100%;
      height: 30px;
      border-bottom: 1px solid var(--color-neutral-2);
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