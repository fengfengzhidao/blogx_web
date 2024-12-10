<script setup lang="ts">
import {userStorei} from "@/stores/user_store";
import router from "@/router";
import {showLogin} from "@/components/web/f_login";
import {goUser} from "@/utils/go_router";

const store = userStorei()

function goRouter(name: string) {
  if (name === "exit") {
    store.userLogout()
    return
  }
  router.push({name: name})

}
</script>

<template>
  <a-avatar v-if="!store.isLogin" class="avatar_1" :size="30" @click="showLogin">登录</a-avatar>
  <a-trigger v-else class="f_nav_avatar_trigger" animation-name="fade" trigger="hover" :unmount-on-close="false">
    <a-avatar class="avatar_1" :image-url="store.userInfo.avatar" :size="30">{{ store.userInfo.nickName[0] }}</a-avatar>
    <template #content>
      <div class="f_nav_avatar_com">
        <div class="avatar">
          <a-avatar @click="goUser(store.userInfo.userID)" :image-url="store.userInfo.avatar"  :size="60">{{ store.userInfo.nickName[0] }}</a-avatar>
        </div>
        <div class="nickname">{{ store.userInfo.nickName }}</div>
        <div class="data">
          <a-statistic extra="粉丝" :value="store.userInfo.fansCount"/>
          <a-statistic extra="关注" :value="store.userInfo.followCount"/>
          <a-statistic extra="文章" :value="store.userInfo.articleCount"/>
        </div>
        <div class="menu">
          <div class="item" @click="goRouter('userCenterInfo')"><i class="iconfont icon-list"></i> <span>个人中心</span>
          </div>
          <div class="item" @click="goRouter('platformArticle')"><i class="iconfont icon-wenzhangguanli"></i>
            <span>文章管理</span></div>
          <div class="item" @click="goRouter('msgChat')"><i class="iconfont icon-xiaoxi"></i> <span>我的消息</span>
          </div>
          <div class="item" v-if="store.isAdmin" @click="goRouter('home')"><i class="iconfont icon-list"></i> <span>后台管理</span>
          </div>
        </div>
        <div class="exit">
          <div class="item" @click="goRouter('exit')"><i class="iconfont icon-liulanliang"></i> <span>退出</span></div>
        </div>
      </div>
    </template>
  </a-trigger>
</template>

<style lang="less">

.avatar_1 {
  cursor: pointer;
  background: rgb(var(--arcoblue-6));
}

.f_nav_avatar_com {
  width: 180px;
  border-radius: 5px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  background: var(--color-bg-1);
  color: var(--color-text-2);
  position: relative;

  .avatar {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    .arco-avatar{
      background: rgb(var(--arcoblue-6));
    }
  }

  .nickname {
    text-align: center;
    padding: 40px 20px 10px 20px;
  }

  .data {
    border-top: @f_border;
    border-bottom: @f_border;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 10px 10px;

    .arco-statistic {
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
      margin-right: 8px;
      margin-top: 4px;
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

.f_nav_avatar_trigger {
  .arco-trigger-popup-wrapper {
    transition: all .3s;
  }

  // 组件刚开始离开
  .fade-leave-active {
  }

  // 组件离开结束
  .fade-leave-to {
    transform: scale(0.8);
    transform-origin: top center;
    opacity: 0;
  }

  // 组件刚开始进入
  .fade-enter-active {
    transform: scale(0.8);
    transform-origin: top center;
    opacity: 0;
  }

  // 组件进入完成
  .fade-enter-to {
    transform: scale(1);
    transform-origin: top center;
    opacity: 1;
  }


}
</style>