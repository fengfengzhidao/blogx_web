<script setup lang="ts">
import {IconClose} from "@arco-design/web-vue/es/icon";
import {useRoute} from "vue-router";
import router from "@/router";
import {ref} from "vue";

const route = useRoute()

interface TabType {
  name: string
  title: string
}

const tabs = ref<TabType[]>([
  {title: "首页", name: "home"},
  {title: "个人信息", name: "userInfo"},
  {title: "用户列表", name: "userList"},
  {title: "系统信息", name: "settings"},
])

function check(item: TabType) {
  router.push({
    name: item.name,
  })
}

function removeItem(item: TabType) {
  const index = tabs.value.findIndex((value) => item.name === value.name)
  if (index !== -1) {
    // 判断我删除的这个元素，是不是就是我当前所在
    if (item.name === route.name) {
      // 因为首页那个item是100%不会被删除的，所以放心往前走
      router.push({
        name: tabs.value[index - 1].name
      })
    }
    tabs.value.splice(index, 1)
  }
}


</script>

<template>
  <div class="f_tabs">
    <div class="item" @click="check(item)" :class="{active: route.name === item.name}" v-for="item in tabs">
      {{ item.title }}
      <span class="close" @click.stop="removeItem(item)" title="删除" v-if="item.name !== 'home'">
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