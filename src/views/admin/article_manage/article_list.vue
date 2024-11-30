<script setup lang="ts">
import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import type {columnType} from "@/components/admin/f_list.vue";
import {type formListType} from "@/components/admin/f_modal_form.vue";
import {reactive, ref} from "vue";
import type {articleListType} from "@/api/article_api";
import {articleListApi} from "@/api/article_api";
import {articleStatusOptions} from "@/options/options";

const columns: columnType[] = [
  {title: "ID", dataIndex: 'id'},
  {title: "文章标题", dataIndex: 'title'},
  {title: "发布用户", slotName: 'user'},
  {title: "文章封面", slotName: 'cover'},
  {title: "浏览量", dataIndex: 'lookCount'},
  {title: "评论数", dataIndex: 'commentCount'},
  {title: "点赞", dataIndex: 'diggCount'},
  {title: "收藏", dataIndex: 'collectCount'},
  {title: "是否开启评论", dataIndex: 'openComment', type: "switch"},
  {title: "状态", dataIndex: 'status', type: "options", options: articleStatusOptions},
  {title: "分类", slotName: 'category'},
  {title: "发布时间", dataIndex: 'createdAt', type: "date"},
  {title: "最后更新时间", dataIndex: 'updateAt', type: "date", dateFormat: "current"},
  {title: "操作", slotName: 'action'},
]
const visible = ref(false)
const fListRef = ref()

function edit(record: articleListType) {
  visible.value = true
}


async function handler() {

}

</script>

<template>
  <div>
    <f_list
        ref="fListRef"
        @edit="edit"
        :url="articleListApi"
        :default-params="{type: 3}"
        :columns="columns">
      <template #cover="{record}:{record: articleListType}">
        <a-image v-if="record.cover" :src="record.cover" height="50px"></a-image>
        <span v-else>-</span>
      </template>
      <template #user="{record}:{record: articleListType}">
        <a-avatar :image-url="record.userAvatar" size="40"></a-avatar>
        <span style="margin-left: 2px">{{ record.userNickname }}</span>
      </template>
      <template #category="{record}:{record: articleListType}">
        <span>{{ record.categoryTitle ? record.categoryTitle : '-' }}</span>
      </template>
    </f_list>
  </div>
</template>