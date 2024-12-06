<script setup lang="ts">

import F_a from "@/components/common/f_a.vue";
</script>

<template>
  <div class="platform_article_view">
    <div class="head">
      <div class="left">
        <div class="title">我的文章</div>
        <a-button type="primary">发布文章</a-button>
      </div>
      <div class="right">
        <a-input-search placeholder="搜索文章"></a-input-search>
      </div>
    </div>
    <div class="body">
      <div class="menu">
        <f_a>已发布</f_a>
        <f_a>审核中</f_a>
        <f_a>草稿箱</f_a>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.platform_article_view {
  background: var(--color-bg-1);
  border-radius: 5px;

  .head {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 10px 20px;
    border-bottom: @f_border;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .title {
        font-size: 16px;
        font-weight: 600;
        margin-right: 10px;

      }

      .arco-btn {
        border-radius: 100px;
      }
    }

    .arco-input-wrapper {
      border-radius: 100px;
    }
  }

  .body {
    padding: 10px 20px 20px 20px;

    .menu {
      a {
        color: var(--color-text-2);
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>