<script setup lang="ts">

import F_site from "@/components/admin/site/f_site.vue";
</script>

<template>
  <div class="email_view">
    <f_site name="email" v-slot="{data}">
      {{ data }}
    </f_site>
  </div>
</template>

<style scoped lang="less">

</style>