<script setup lang="ts">
import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import type {columnType} from "@/components/admin/f_list.vue";
import {type formListType} from "@/components/admin/f_modal_form.vue";
import {reactive, ref} from "vue";
import {articleDetailApi, type articleDetailType, type articleListType} from "@/api/article_api";
import {articleListApi} from "@/api/article_api";
import {articleStatusOptions} from "@/options/options";
import {Message} from "@arco-design/web-vue";
import F_user from "@/components/common/f_user.vue";

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

const data = reactive<articleDetailType>({
  "id": 0,
  "createdAt": "",
  "updatedAt": "",
  "title": "",
  "abstract": "",
  "content": "",
  "tagList": [],
  cover: "",
  "userID": 0,
  "lookCount": 0,
  "diggCount": 0,
  "commentCount": 0,
  "collectCount": 0,
  "openComment": false,
  "status": 0,
  "username": "",
  "nickname": "",
  "userAvatar": ""
})

async function edit(record: articleListType) {
  if (record.id !== data.id){
    const res = await articleDetailApi(record.id)
    if (res.code){
      Message.error(res.msg)
      return
    }
    Object.assign(data, res.data)
  }
  visible.value = true
}


async function handler() {

}

</script>

<template>
  <div>
    <a-modal v-model:visible="visible" title="文章审核" modal-class="article_examine_modal">
        <a-form>
          <a-form-item label="文章标题">{{ data.title }}</a-form-item>
          <a-form-item label="文章简介">{{ data.abstract }}</a-form-item>
          <a-form-item label="发布用户">
            <f_user :nickname="data.nickname" :avatar="data.userAvatar"></f_user>
          </a-form-item>
          <a-form-item label="文章分类">{{ data.categoryTitle}}</a-form-item>
          <a-form-item label="文章标签">
            <a-tag style="margin-right: 10px" v-for="tag in data.tagList">{{ tag}}</a-tag>
          </a-form-item>
          <a-form-item label="文章正文">
            {{ data.content }}
          </a-form-item>
        </a-form>
      <template #footer>
        <a-button>取消</a-button>
        <a-button type="primary">审核通过</a-button>
        <a-button type="primary" status="danger">不通过</a-button>
      </template>
    </a-modal>
    <f_list
        ref="fListRef"
        @edit="edit"
        no-add
        :url="articleListApi"
        :default-params="{type: 3}"
        :columns="columns">
      <template #cover="{record}:{record: articleListType}">
        <a-image v-if="record.cover" :src="record.cover" height="50px"></a-image>
        <span v-else>-</span>
      </template>
      <template #user="{record}:{record: articleListType}">
        <f_user :nickname="record.userNickname" :avatar="record.userAvatar"></f_user>
      </template>
      <template #category="{record}:{record: articleListType}">
        <span>{{ record.categoryTitle ? record.categoryTitle : '-' }}</span>
      </template>
    </f_list>
  </div>
</template>