<script setup lang="ts">
import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import type {columnType} from "@/components/admin/f_list.vue";
import {type formListType} from "@/components/admin/f_modal_form.vue";
import {reactive, ref} from "vue";
import {logListApi, type logListParams, type logListType} from "@/api/log_api";

const params = reactive<logListParams>({
  logType: 2,
})

const columnsDict = reactive({
  1:[
    {title: "ID", dataIndex: 'id'},
    {title: "地址", slotName: 'addr'},
    {title: "用户名", dataIndex: 'username'},
    {title: "状态", dataIndex: 'loginStatus'},
    {title: "标题", dataIndex: 'title'},
    {title: "时间", dataIndex: 'createdAt', type: "date"},
    {title: "操作", slotName: 'action'},
  ],
  2:  [
    {title: "ID", dataIndex: 'id'},
    {title: "地址", slotName: 'addr'},
    {title: "用户", slotName: 'user'},
    {title: "等级", dataIndex: 'level'},
    {title: "标题", dataIndex: 'title'},
    {title: "时间", dataIndex: 'createdAt', type: "date"},
    {title: "操作", slotName: 'action'},
  ],
  3:  [
    {title: "ID", dataIndex: 'id'},
    {title: "服务", dataIndex: 'serviceName'},
    {title: "标题", dataIndex: 'title'},
    {title: "等级", dataIndex: 'level'},
    {title: "时间", dataIndex: 'createdAt', type: "date"},
    {title: "操作", slotName: 'action'},
  ]
})

const visible = ref(false)
const fListRef = ref()

function edit(record: logListType) {
  visible.value = true
}

function logTypeChange() {
  fListRef.value.getList(params)
}

</script>

<template>
  <div>
    <f_list
        ref="fListRef"
        no-add
        @edit="edit"
        :default-params="params"
        :url="logListApi"
        :columns="columnsDict[params.logType]">
      <template #search_other>
        <a-radio-group v-model="params.logType" @change="logTypeChange">
          <a-radio :value="1">登录日志</a-radio>
          <a-radio :value="2">操作日志</a-radio>
          <a-radio :value="3">运行日志</a-radio>
        </a-radio-group>
      </template>
    </f_list>
  </div>
</template>