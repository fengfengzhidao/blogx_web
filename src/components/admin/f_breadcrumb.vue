<script setup lang="ts">
import {type RouteMeta, useRoute} from "vue-router";

const route = useRoute()

export interface MetaType extends RouteMeta {
  title: string
}
</script>

<template>
  <a-breadcrumb>
    <template v-for="r in route.matched">
      <a-breadcrumb-item v-if="r.name !== 'home'">{{ (r.meta as MetaType)?.title }}</a-breadcrumb-item>
    </template>

  </a-breadcrumb>
</template>