<script setup lang="ts">

import F_nav from "@/components/web/f_nav.vue";
import F_footer from "@/components/web/f_footer.vue";
import F_main from "@/components/web/f_main.vue";
import Banner_list from "@/components/web/index/banner_list.vue";
import Article_search_list from "@/components/web/index/article_search_list.vue";
import Tag_list from "@/components/web/index/tag_list.vue";
import Auth_recommend from "@/components/web/index/auth_recommend.vue";
import Article_recommend from "@/components/web/index/article_recommend.vue";
import About from "@/components/web/index/about.vue";
</script>

<template>
  <div class="web_home_view">
    <f_nav no-scroll></f_nav>
    <f_main>
      <div class="left">
        <banner_list></banner_list>
        <article_search_list></article_search_list>
      </div>
      <div class="right">
        <tag_list></tag_list>
        <auth_recommend></auth_recommend>
        <article_recommend></article_recommend>
        <about></about>
      </div>
    </f_main>
    <f_footer></f_footer>
  </div>
</template>

<style lang="less">
.web_home_view {
  .f_container {
    display: flex;
    justify-content: space-between;

    > .left {
      width: calc(100% - 280px);

      .f_banner_com {
        margin-top: 20px;
      }

      .article_search_list_com {
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }

    > .right {
      width: 260px;
      padding: 20px 0;
      display: grid;
      grid-row-gap: 20px;
      align-content: start;

    }
  }
}
</style>