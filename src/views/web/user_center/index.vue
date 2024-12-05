<script setup lang="ts">

import F_nav from "@/components/web/f_nav.vue";
import F_main from "@/components/web/f_main.vue";
import {userCenterStorei} from "@/stores/user_center_store";

const userCenterStore = userCenterStorei()
userCenterStore.getUserDetail()

</script>

<template>
  <div class="user_center_view">
    <f_nav no-scroll></f_nav>
    <f_main>
      <div class="menu">
        <router-link :to="{name: 'userCenterInfo'}">个人资料</router-link>
        <router-link :to="{name: 'userCenterAccount'}">账号设置</router-link>
        <router-link :to="{name: 'userCenterPrivacy'}">隐私设置</router-link>
        <router-link :to="{name: 'userCenterHome'}">主页设置</router-link>
        <router-link :to="{name: 'userCenterHistory'}">浏览历史</router-link>
      </div>
      <div class="view">
        <router-view/>
      </div>
    </f_main>
  </div>

</template>

<style lang="less">
.user_center_view {
  .f_container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .menu {
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