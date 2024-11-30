<script setup lang="ts">
import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import type {columnType} from "@/components/admin/f_list.vue";
import {type formListType} from "@/components/admin/f_modal_form.vue";
import {bannerListApi, type bannerListType} from "@/api/banner_api";

const columns = [
  {title: "ID", dataIndex: 'id'},
  {title: "图片", slotName: 'cover'},
  {title: "跳转地址", slotName: 'href'},
  {title: "是否显示", slotName: 'show'},
  {title: "时间", slotName: 'createdAt'},
  {title: "操作", slotName: 'action'},
]

</script>

<template>
  <div>
    <f_list
        ref="fListRef"
        :url="bannerListApi"
        :columns="columns">
      <template #cover="{record}:{record: bannerListType}">
        <a-image :src="record.cover" height="50px"></a-image>
      </template>
      <template #show="{record}:{record: bannerListType}">
        <a-switch :model-value="record.show"></a-switch>
      </template>
      <template #href="{record}:{record: bannerListType}">
        <a :href="record.href" v-if="record.href" target="_blank">{{ record.href }}</a>
        <span v-else>-</span>
      </template>
    </f_list>
  </div>
</template>