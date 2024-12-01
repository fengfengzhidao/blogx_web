<script setup lang="ts">

import F_card from "@/components/common/f_card.vue";
import F_welcome from "@/components/admin/f_welcome.vue";
import F_quick_entrance from "@/components/admin/f_quick_entrance.vue";
import F_version from "@/components/common/f_version.vue";
import User_login_echarts from "@/components/echarts/user_login_echarts.vue";
import F_title from "@/components/common/f_title.vue";
</script>

<template>
  <div class="home_view">
    <div class="left">
      <f_welcome></f_welcome>
      <div class="charts charts_3">
        <div class="item">
          <f_title :type="2">访问人数</f_title>
        </div>
        <div class="item">
          <f_title :type="2">发布文章</f_title>
        </div>
        <div class="item">
          <f_title :type="2">新增用户</f_title>
        </div>
      </div>
      <div class="charts charts_2">
        <div class="item">
          <f_title :type="2">发布文章</f_title>
        </div>
        <div class="item">
          <f_title :type="2">系统资源</f_title>
        </div>
      </div>
    </div>
    <div class="right">
      <f_quick_entrance></f_quick_entrance>
      <f_version></f_version>
    </div>
  </div>
</template>

<style lang="less">
.home_view {
  background-color: inherit !important;
  display: flex;
  justify-content: space-between;

  .left {
    width: 75%;

    .charts {
      margin-bottom: 20px;
      grid-column-gap: 20px;
      display: grid;

      .item {
        background: var(--color-bg-1);
        border-radius: 5px;
        padding: 20px 10px;
      }
    }

    .charts_3 {
      grid-template-columns: repeat(3, 1fr);
    }

    .charts_2 {
      grid-template-columns: 7fr 3fr;
    }

  }

  .right {
    width: calc(25% - 20px);

    .f_quick_entrance {
      margin-bottom: 20px;
    }
  }
}
</style>