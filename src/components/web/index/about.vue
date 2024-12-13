<script setup lang="ts">
import F_card from "@/components/web/f_card.vue";
import {userStorei} from "@/stores/user_store";

const store = userStorei()

const version = import.meta.env.VITE_VERSION
</script>

<template>
  <f_card title="关于我们" class="about_com">
    <div class="item" v-if="store.siteInfo.about.siteDate">
      <span>建站日期</span>
      <span>{{ store.siteInfo.about.siteDate }}</span>
    </div>
    <div class="item">
      <span>网站版本</span>
      <span>{{ version }}</span>
    </div>
    <div class="item">
      <span>联系作者</span>
    </div>
    <div class="item icons">
      <div class="icon qq_icon" v-if="store.siteInfo.about.qq">
        <img class="qq" :src="store.siteInfo.about.qq" alt="">
        <img src="@/assets/img/QQ.svg" alt="">
      </div>
      <div class="icon wechat_icon" v-if="store.siteInfo.about.wechat">
        <img class="wechat" :src="store.siteInfo.about.wechat" alt="">
        <img src="@/assets/img/index/微信.svg" alt="">
      </div>
      <div class="icon" v-if="store.siteInfo.about.bilibili">
        <a :href="store.siteInfo.about.bilibili" target="_blank"> <img src="@/assets/img/index/bilibili.svg" alt=""></a>
      </div>
      <div class="icon" v-if="store.siteInfo.about.gitee">
        <a :href="store.siteInfo.about.gitee" target="_blank"> <img src="@/assets/img/index/gitee-copy.svg" alt=""></a>
      </div>
      <div class="icon" v-if="store.siteInfo.about.github">
        <a :href="store.siteInfo.about.github" target="_blank"><img src="@/assets/img/index/GitHub.svg" alt=""></a>
      </div>
    </div>
    <div class="item beian" v-if="store.siteInfo.siteInfo.beian">
      <a href="http://beian.miit.gov.cn"> <img src="@/assets/img/beian.png" alt="">
        <span>{{ store.siteInfo.siteInfo.beian }}</span></a>
    </div>

  </f_card>
</template>

<style lang="less">
.about_com {
  .item {
    display: flex;
    align-items: center;
    color: var(--color-text-2);
    font-size: 15px;
    margin-bottom: 10px;

    span:nth-child(2) {
      margin-left: 5px;
    }
  }

  .icons {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;

    .icon {
      cursor: pointer;
      position: relative;

      img {
        width: 30px;
        height: 30px;
      }

      .qq, .wechat {
        position: absolute;
        width: 100px;
        height: 100px;
        bottom: 40px;
        left: -30px;
        opacity: 0;
        padding: 10px;
      }

    }

    .qq_icon{
      &:hover{
        .qq{
          opacity: 1;
        }
      }
    }
    .wechat_icon{
      &:hover{
        .wechat{
          opacity: 1;
        }
      }
    }


  }

  .beian {
    justify-content: center;

    a {
      display: flex;
      align-items: center;
      color: var(--color-text-2);
    }
  }
}
</style>