<script setup lang="ts">
import {IconClose} from "@arco-design/web-vue/es/icon";
import {useRoute} from "vue-router";
import router from "@/router";
import {ref, watch} from "vue";

const route = useRoute()

interface TabType {
  name: string
  title: string
}

const tabs = ref<TabType[]>([
  {title: "首页", name: "home"},
])

function check(item: TabType) {
  router.push({
    name: item.name,
  })
  saveTabs()
}

function saveTabs() {
  localStorage.setItem("f_tabs", JSON.stringify(tabs.value))
}

function removeItem(item: TabType) {
  if (item.name === "home") {
    return
  }
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
  saveTabs()
}

function removeAllItem() {
  tabs.value = [{title: "首页", name: "home"}]
  router.push({name: "home"})
  saveTabs()
}


function loadTabs() {
  const f_tabs = localStorage.getItem("f_tabs")
  if (f_tabs) {
    try {
      tabs.value = JSON.parse(f_tabs)
    } catch (e) {
      console.log(e)
    }
  }
}

loadTabs()


watch(() => route.name, () => {
  // 判断当前路由的名称，在不在tabs里面，如果不在就加入进去
  const index = tabs.value.findIndex((value) => route.name === value.name)
  if (index === -1) {
    tabs.value.push({
      name: route.name as string,
      title: route.meta.title,
    })
  }
}, {immediate: true})


</script>

<template>
  <div class="f_tabs">
    <div class="swiper">
      <div class="item" @click="check(item)" @mousedown.middle.stop="removeItem(item)"
           :class="{active: route.name === item.name}" v-for="item in tabs">
        {{ item.title }}
        <span class="close" @click.stop="removeItem(item)" title="删除" v-if="item.name !== 'home'">
          <IconClose></IconClose>
        </span>
      </div>
    </div>
    <div class="item" @click="removeAllItem">
      删除全部
    </div>
  </div>
</template>

<style lang="less">
.f_tabs {
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;

  .swiper {
    width: calc(100% - 100px);
    display: flex;
    overflow-y: hidden;
    overflow-x: auto;
  }

  .item {
    padding: 3px 8px;
    background-color: var(--color-bg-1);
    border: @f_border;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 5px;
    flex-shrink: 0;

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