<script setup lang="ts">
import {userStorei} from "@/stores/user_store";

const store = userStorei()
</script>

<template>
  <a-trigger trigger="click" :unmount-on-close="false">
    <a-avatar :image-url="store.userInfo.avatar" :size="30"></a-avatar>
    <template #content>
      <div class="f_nav_avatar_com">
        <div class="nickname">fengfeng</div>
        <div class="data">
          <a-statistic extra="粉丝" :value="89"/>
          <a-statistic extra="关注" :value="45"/>
          <a-statistic extra="文章" :value="342"/>
        </div>
        <div class="menu">
          <div class="item"><i class="iconfont icon-list"></i> <span>个人中心</span></div>
          <div class="item"><i class="iconfont icon-wenzhangguanli"></i> <span>文章管理</span></div>
          <div class="item"><i class="iconfont icon-xiaoxi"></i> <span>我的消息</span></div>
        </div>
        <div class="exit">
          <div class="item"><i class="iconfont icon-liulanliang"></i> <span>退出</span></div>
        </div>
      </div>
    </template>
  </a-trigger>
</template>

<style lang="less">
.f_nav_avatar_com {
  width: 180px;
  border-radius: 5px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  background: var(--color-bg-1);
  color: var(--color-text-2);

  .nickname {
    text-align: center;
    padding: 40px 20px 10px 20px;
  }

  .data {
    border-top: @f_border;
    border-bottom: @f_border;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 10px 20px;

    .arco-statistic{
      line-height: 1.5rem;
    }

    .arco-statistic-content {
      display: flex;
      flex-direction: column;
      align-items: center;

      .arco-statistic-value-integer {
        font-size: 20px;
        color: var(--color-text-1);
      }

      .arco-statistic-extra {
        margin-top: 0;
      }
    }
  }

  .item {
    height: 35px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background: var(--color-fill-1);
    }

    i {
      margin-right: 10px;
    }
  }

  .menu {
    border-bottom: @f_border;
    padding: 10px 0;
  }

  .exit {
    padding: 10px 0;
  }
}
</style>