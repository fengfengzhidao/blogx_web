<script setup lang="ts">
import {IconClose} from "@arco-design/web-vue/es/icon";
import {useRoute} from "vue-router";
import router from "@/router";

const route = useRoute()

interface TabType {
  name: string
  title: string
}

const tabs: TabType[] = [
  {title: "首页", name: "home"},
  {title: "个人信息", name: "userInfo"},
  {title: "用户列表", name: "userList"},
  {title: "系统信息", name: "settings"},
]

function check(item: TabType) {
  router.push({
    name: item.name,
  })
}


</script>

<template>
  <div class="f_tabs">
    <div class="item" @click="check(item)" :class="{active: route.name === item.name}" v-for="item in tabs">
      {{ item.title }}
      <span class="close" title="删除" v-if="item.name !== 'home'">
          <IconClose></IconClose>
        </span>
    </div>
  </div>
</template>

<style lang="less">
.f_tabs {
  display: flex;
  align-items: center;
  padding: 0 10px;

  .item {
    padding: 3px 8px;
    background-color: var(--color-bg-1);
    border: @f_border;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: var(--color-fill-1);
    }

    &.active {
      background-color: @primary-6;
      color: white;
    }
  }
}
</style>