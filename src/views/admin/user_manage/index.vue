<script setup lang="ts">

import F_list from "@/components/admin/f_list.vue";
import {userListApi} from "@/api/user_api";
</script>

<template>
  <div>
    <f_list :url="userListApi"></f_list>
  </div>
</template>

<style scoped>

</style>