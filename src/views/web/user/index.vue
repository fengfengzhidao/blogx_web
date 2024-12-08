<script setup lang="ts">
import F_nav from "@/components/web/f_nav.vue";
import F_main from "@/components/web/f_main.vue";
import {useRoute} from "vue-router";

const route = useRoute()
import {userBaseStorei} from "@/stores/user_base_store";

const baseStore = userBaseStorei()
baseStore.getUserBaseInfo(Number(route.params.id))
</script>

<template>
  <div class="user_view">
    <f_nav no-scroll></f_nav>
    <f_main>
      <div class="user_info">
        <div class="avatar">
          <a-avatar :image-url="baseStore.userBase.avatar"></a-avatar>
        </div>
        <div class="info">
          <div class="nick">
            <span>{{ baseStore.userBase.nickname }}</span>
            <span>码龄{{baseStore.userBase.codeAge}}年</span>
          </div>
        </div>
      </div>
      <div class="user_view_menu">
        <div class="left">
          <router-link to="">他的文章</router-link>
          <router-link to="">他的收藏</router-link>
          <router-link to="">他的关注</router-link>
          <router-link to="">他的粉丝</router-link>
        </div>
        <a-input-search placeholder="搜TA的内容"></a-input-search>
      </div>
      <div class="user_sub_view">
        <router-view></router-view>
      </div>
    </f_main>
  </div>
</template>

<style scoped lang="less">

</style>