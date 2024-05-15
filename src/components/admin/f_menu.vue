<script setup lang="ts">
import type {Component} from "vue";
import {IconHome, IconUser, IconSettings} from "@arco-design/web-vue/es/icon";
import F_component from "@/components/common/f_component.vue";
import {ref} from "vue";
import {collapsed} from "@/components/admin/f_menu";
import router from "@/router";
import {useRoute} from "vue-router";


const route = useRoute()

interface MenuType {
  title: string
  name: string
  icon?: string | Component
  children?: MenuType[]
}


const menuList: MenuType[] = [
  {title: "首页", name: "home", icon: IconHome},
  {
    title: "个人中心", name: "userCenter", icon: IconUser, children: [
      {title: "用户信息", name: "userInfo", icon: "iconfont icon-yonghuxinxi-"}
    ]
  },
  {
    title: "用户管理", name: "userManage", icon: "iconfont icon-yonghuguanli", children: [
      {title: "用户列表", name: "userList", icon: "iconfont icon-yonghuguanli_huaban"}
    ]
  },
  {
    title: "系统设置", name: "settingsManage", icon: "iconfont icon-xitongpeizhi", children: [
      {title: "系统信息", name: "settings", icon: IconSettings}
    ]
  },
]

function menuItemClick(key: string) {
  router.push({
    name: key
  })
}

const openKeys = ref<string[]>([])

function initRoute() {
  if (route.matched.length === 3) {
    openKeys.value = [route.matched[1].name as string]
  }
}

initRoute()

</script>

<template>
  <div class="f_menu" :class="{collapsed: collapsed}">
    <div class="f_menu_inner scrollbar">
      <a-menu
          @menu-item-click="menuItemClick"
          v-model:collapsed="collapsed"
          v-model:open-keys="openKeys"
          :default-selected-keys="[route.name]"
          show-collapse-button>
        <template v-for="menu in menuList">
          <a-menu-item :key="menu.name" v-if="!menu.children">
            <template #icon>
              <f_component :is="menu.icon"></f_component>
            </template>
            {{ menu.title }}
          </a-menu-item>
          <a-sub-menu :key="menu.name" v-else :title="menu.title">
            <template #icon>
              <f_component :is="menu.icon"></f_component>
            </template>
            <a-menu-item :key="sub.name" v-for="sub in menu.children">
              {{ sub.title }}
              <template #icon>
                <f_component :is="sub.icon"></f_component>
              </template>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </div>

  </div>
</template>

<style lang="less">
.f_menu {
  height: calc(100vh - 90px);
  position: relative;

  &.collapsed {
    .arco-menu-collapse-button {
      left: 48px !important;
    }
  }

  &:hover {
    .arco-menu-collapse-button {
      opacity: 1 !important;
    }
  }

  .f_menu_inner {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .arco-menu {
      position: inherit;

      .arco-menu-collapse-button {
        top: 50%;
        transform: translate(-50%, -50%);
        left: 240px;
        transition: all .3s;
        opacity: 0;
      }
    }
  }
}
</style>