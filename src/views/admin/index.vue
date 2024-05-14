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
          <icon-home />
          <icon-sun-fill />
          <icon-moon-fill />
          <icon-fullscreen />
          <icon-fullscreen-exit />
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

</style>