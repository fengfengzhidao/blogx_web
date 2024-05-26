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
  {label: "个人信息", icon: IconUser, name: "userInfo"},
  {label: "个人信息", icon: IconUser, name: "userInfo"},
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
    display: flex;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 40px;

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