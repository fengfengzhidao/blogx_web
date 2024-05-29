<script setup lang="ts">
import {beian} from "@/conf/global";
</script>

<template>
  <div class="f_footer">
    <div class="f_beian" v-if="beian">
      <img src="@/assets/img/gongan.png" alt="">
      <a href="https://beian.miit.gov.cn/" target="_blank">备案号：{{ beian }}</a>
    </div>
  </div>
</template>

<style lang="less">
.f_footer {
  background-color: var(--color-bg-1);
  display: flex;
  justify-content: center;

  .f_beian {
    display: flex;
    align-items: center;
    padding: 20px 0;
    a{
      margin-left: 10px;
      color: var(--color-text-2);
      text-decoration: none;
    }
  }
}
</style>