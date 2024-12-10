<script setup lang="ts">
import F_focus_list from "@/components/web/f_focus_list.vue";
import {useRoute} from "vue-router";

const route = useRoute()

</script>

<template>
  <f_focus_list :user-id="Number(route.params.id)" type="focus"></f_focus_list>
</template>

<style lang="less">

</style>