<script setup lang="ts">

import F_card from "@/components/common/f_card.vue";
import {dateCurrentFormat} from "../../utils/date";

interface versionType {
  title: string
  date: string
  items?: string[]
}

const list: versionType[] = [
  {
    title: "第一代后台管理系统诞生了",
    date: "2024-05-26",
    items: [
        "普通权限管理模式",
        "定制主题"
    ]
  },
  {
    title: "第一代后台管理系统诞生了",
    date: "2024-01-26",
    items: [
      "普通权限管理模式",
      "定制主题"
    ]
  }
]
</script>

<template>
  <f_card title="更新日志" class="f_version">
    <div class="item" v-for="(item, index) in list">
      <div class="version_head">
        <span class="index">{{ index + 1 }}.</span>
        <span class="label">{{ item.title}}</span>
        <span class="date">{{ dateCurrentFormat(item.date) }}</span>
      </div>
      <ul class="version_items" v-if="item.items?.length">
        <li v-for="li in item.items">{{ li }}</li>
      </ul>
    </div>
  </f_card>
</template>

<style lang="less">
.f_version{
  .body{
    .item{
      margin-bottom: 20px;
      .version_head{
        position: relative;
        .index{
          margin-right: 5px;
        }
        .date{
          position: absolute;
          right: 0;
          color: var(--color-text-2);
        }
      }
      .version_items{
        color: var(--color-text-2);
        margin-top: 10px;
        line-height: 1.3rem;
      }
    }
  }
}
</style>