<script setup lang="ts">
import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import type {columnType} from "@/components/admin/f_list.vue";
import {type formListType} from "@/components/admin/f_modal_form.vue";
import {type bannerType} from "@/api/banner_api";
import {reactive, ref} from "vue";
import type {articleListType} from "@/api/article_api";
import {articleListApi} from "@/api/article_api";
import F_label from "@/components/common/f_label.vue";
import {articleStatusOptions} from "@/options/options";

const columns = [
  {title: "ID", dataIndex: 'id'},
  {title: "文章标题", dataIndex: 'title'},
  {title: "发布用户", slotName: 'user'},
  {title: "文章封面", slotName: 'cover'},
  {title: "浏览量", dataIndex: 'lookCount'},
  {title: "评论数", dataIndex: 'commentCount'},
  {title: "点赞", dataIndex: 'diggCount'},
  {title: "收藏", dataIndex: 'collectCount'},
  {title: "状态", slotName: 'status'},
  {title: "分类", slotName: 'category'},
  {title: "发布时间", slotName: 'createdAt'},
  {title: "最后更新时间", slotName: 'updateAt'},
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
        <a-image :src="record.cover" height="50px"></a-image>
      </template>
      <template #user="{record}:{record: articleListType}">
        <a-avatar :image-url="record.userAvatar" size="40"></a-avatar>
        <span style="margin-left: 2px">{{ record.userNickname }}</span>
      </template>
      <template #category="{record}:{record: articleListType}">
        <span>{{ record.categoryTitle ? record.categoryTitle : '-' }}</span>
      </template>
      <template #status="{record}:{record: articleListType}">
        <f_label :options="articleStatusOptions" :value="record.status"></f_label>
      </template>
    </f_list>
  </div>
</template>