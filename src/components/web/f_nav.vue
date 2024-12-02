<script setup lang="ts">
import {slogan, enSlogan} from "@/conf/global";
import F_theme from "@/components/common/f_theme.vue";
import {ref} from "vue";
import F_user_dropdown from "@/components/common/f_user_dropdown.vue";
import {userStorei} from "@/stores/user_store";

const store = userStorei()

interface Props {
  noScroll?: boolean
  scrollTop?: number
}

const props = defineProps<Props>()
const {noScroll = false, scrollTop = 200} = props

const isShow = ref(noScroll)

if (!noScroll) {
  window.onscroll = function () {
    const top = document.documentElement.scrollTop
    if (top >= scrollTop) {
      isShow.value = true
    } else {
      isShow.value = false
    }
  }
}


</script>

<template>
  <div class="f_nav" :class="{isShow: isShow}">
    <div class="container">
      <div class="logo">
        <a href="/">
          <span class="n1">Blogx</span>
          <span class="n2">社区版</span>
        </a>
      </div>
      <div class="center">
        <i class="iconfont icon-dengpao"></i>
        <a-input-search placeholder="搜索你喜欢的文章"></a-input-search>
      </div>
      <div class="right">
        <a-avatar :image-url="store.userInfo.avatar" :size="30"></a-avatar>
        <a-badge :count="9" dot :dotStyle="{ width: '5px', height: '5px' }">
          <a-dropdown>
            <a href="javascript:void 0">消息</a>
            <template #content>
              <a-doption>
                <a-badge :count="9" dot :dotStyle="{ width: '5px', height: '5px' }">
                评论和@
                </a-badge>
              </a-doption>
              <a-doption>
                <a-badge :count="9" dot :dotStyle="{ width: '5px', height: '5px' }">
                  赞和收藏
                </a-badge>
              </a-doption>
              <a-doption>
                <a-badge :count="9" dot :dotStyle="{ width: '5px', height: '5px' }">
                  私信
                </a-badge>
              </a-doption>
              <a-doption>
                <a-badge :count="9" dot :dotStyle="{ width: '5px', height: '5px' }">
                  系统通知
                </a-badge>
              </a-doption>
            </template>
          </a-dropdown>

        </a-badge>
        <a href="javascript:void 0">历史</a>
        <a-button type="primary"><i class="iconfont icon-jia"></i> <span>发布</span></a-button>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.f_nav {
  width: 100vw;
  height: 60px;
  position: fixed;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  color: white;
  transition: all .3s;


  &.isShow {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.06);
    background-color: var(--color-bg-1);
    color: var(--color-text-2);

    .n1 {
      color: var(--color-text-1);
    }

    .n2 {
      color: var(--color-text-2);
    }

    a {
      color: var(--color-text-2) !important;
    }

    .theme {
      color: var(--color-text-2) !important;
    }
  }

  .container {
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      width: 20%;

      a {
        .n1 {
          font-size: 16px;
          color: var(--color-text-1);
        }

        .n2 {
          margin-left: 10px;
          font-size: 14px;
          color: var(--color-text-2);
        }
      }
    }

    .center {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        margin-right: 10px;
        font-size: 20px;
        color: rgb(var(--arcoblue-6));
        cursor: pointer;
      }

      .arco-input-wrapper {
        width: 400px;
        border-radius: 20px;
      }
    }

    .right {
      width: 30%;
      display: flex;
      align-items: center;

      >a{
        margin-right: 20px;
      }
      .arco-avatar{
        margin-right: 20px;
      }

      .arco-badge{
        margin-right: 20px;
        .arco-badge-dot{
          top: 1px;
          right: -3px;

        }
      }


      .arco-btn {
        border-radius: 200px;
        font-size: 12px;
        display: flex;
        align-items: center;
        i{
          font-size: 14px;
          margin-right: 3px;
          margin-top: 1px;
        }
      }
    }
  }
}
</style>