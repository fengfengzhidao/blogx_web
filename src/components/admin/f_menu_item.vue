<script setup lang="ts">
import type {Component} from "vue";
import F_component from "@/components/common/f_component.vue";
import {userStorei} from "@/stores/user_store";
import F_menu_item from "@/components/admin/f_menu_item.vue";
const store = userStorei()

interface MenuType {
  title: string
  name: string
  icon?: string | Component
  children?: MenuType[]
  role?: number
}

interface Props {
  list: MenuType[]
}

const props = defineProps<Props>()
</script>

<template>
  <template v-for="menu in props.list">
    <template v-if="!menu.children">
      <a-menu-item :key="menu.name" v-if="menu.role === undefined || menu.role === store.userInfo.role">
        <template #icon>
          <f_component :is="menu.icon"></f_component>
        </template>
        {{ menu.title }}
      </a-menu-item>
    </template>
    <template v-else>
      <a-sub-menu :key="menu.name" v-if="menu.role === undefined || menu.role === store.userInfo.role"
                  :title="menu.title">
        <template #icon>
          <f_component :is="menu.icon"></f_component>
        </template>
        <f_menu_item :list="menu.children as MenuType[]"></f_menu_item>
      </a-sub-menu>
    </template>

  </template>
</template>

<style scoped>

</style>