<script setup lang="ts">
import F_card from "@/components/web/f_card.vue";
</script>

<template>
  <div class="platform_article_add_view">
    <f_card title="编辑文章">

    </f_card>
  </div>
</template>

<style lang="less">
.platform_article_add_view {
  .f_card_com {
    .body {
      overflow-y: auto;
      max-height: calc(100vh - 160px);
    }
  }
}
</style>