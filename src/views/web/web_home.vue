<script setup lang="ts">

import F_nav from "@/components/web/f_nav.vue";
import F_footer from "@/components/web/f_footer.vue";
import F_main from "@/components/web/f_main.vue";
import Banner_list from "@/components/web/index/banner_list.vue";
import Article_search_list from "@/components/web/index/article_search_list.vue";
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

  >  .right {
      width: 260px;
    }
  }
}
</style>