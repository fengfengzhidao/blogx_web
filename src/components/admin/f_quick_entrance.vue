<script setup lang="ts">
import F_card from "@/components/common/f_card.vue";
import {type Component, ref} from "vue";
import {IconUser} from "@arco-design/web-vue/es/icon";
import F_component from "@/components/common/f_component.vue";
import router from "@/router";

interface quickType {
  label: string
  icon: string | Component
  name: string
}

const list: quickType[] = [
  {label: "用户列表", icon: IconUser, name: "userList"},
  {label: "文章列表", icon: IconUser, name: "articleList"},
  {label: "网站设置", icon: IconUser, name: "siteManageSite"},
  {label: "AI设置", icon: IconUser, name: "siteManageAi"},
  {label: "Banner设置", icon: IconUser, name: "bannerList"},
  {label: "日志列表", icon: IconUser, name: "logList"},
]

function goRouter(item: quickType) {
  router.push({name: item.name})
}

</script>

<template>
  <f_card title="快捷入口" class="f_quick_entrance">
    <div class="item" v-for="item in list">
      <div class="icon" @click="goRouter(item)">
        <f_component :is="item.icon"></f_component>
      </div>
      <div class="label">{{ item.label }}</div>
    </div>
  </f_card>
</template>

<style lang="less">
.f_quick_entrance {
  .body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 20px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;

      &:last-child {
        margin-right: 0;
      }

      .icon {
        width: 60px;
        height: 60px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        background-color: var(--color-fill-2);
        cursor: pointer;
        transition: all .3s;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.08);
        }
      }

      .label {
        margin-top: 5px;
        color: var(--color-text-2);
      }
    }
  }
}
</style>