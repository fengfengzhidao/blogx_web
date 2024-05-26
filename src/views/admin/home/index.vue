<script setup lang="ts">

import F_card from "@/components/common/f_card.vue";
import F_welcome from "@/components/admin/f_welcome.vue";
</script>

<template>
  <div class="home_view">
    <f_welcome></f_welcome>
    <div class="bottom">
      <div class="left">
        <f_card title="快捷入口" class="quick_room">

        </f_card>
        <f_card title="数据统计" class="statistics">

        </f_card>
      </div>
      <div class="right">
        <f_card title="更新日志" class="version">

        </f_card>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.home_view {
  background-color: inherit !important;


  .bottom {
    display: flex;
    justify-content: space-between;

    .left {
      width: 70%;

      .statistics {
        margin-top: 20px;
      }
    }

    .right {
      width: 30%;
      margin-left: 20px;
    }
  }
}
</style>