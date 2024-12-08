<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import type {listResponse} from "@/api";
import {commentListApi, type commentListRequest, type commentListType, commentRemoveApi} from "@/api/comment_api";
import {Message} from "@arco-design/web-vue";
import {dateTimeFormat} from "@/utils/date";
import F_a from "@/components/common/f_a.vue";
import F_label from "@/components/common/f_label.vue";
import {relationOptions} from "@/options/options";
import {useRoute} from "vue-router";

const route = useRoute()
const data = reactive<listResponse<commentListType>>({
  list: [],
  count: 0
})

interface Props {
  type: 1 | 2
}

const props = defineProps<Props>()
const params = reactive<commentListRequest>({
  type: props.type,
  limit: 10,
})


const checkIdList = ref<number[]>([])

async function getData() {
  const res = await commentListApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}

getData()

async function removeComment() {

  const resList = await Promise.all(checkIdList.value.map((item) => commentRemoveApi(item)))
  resList.forEach((res) => {
    if (res.code) {
      Message.error(res.msg)
      return
    }
    Message.success(res.msg)
  })
  getData()
}

async function checkAll(val: boolean) {
  if (val) {
    checkIdList.value = data.list.map((item) => item.id)
    return
  }
  checkIdList.value = []
}

const isCheckAll = ref(false)


watch(() => route.query.key, () => {
  if (route.query.key) {
    params.key = route.query.key as string
    getData()
  }
})

</script>

<template>
  <div class="comment_list_com">
    <div class="actions">
      <a-checkbox v-model="isCheckAll" @change="checkAll">全选</a-checkbox>
      <a-button @click="removeComment" type="primary" status="danger" v-if="checkIdList.length" size="mini">删除
      </a-button>
    </div>
    <div class="comment_list">
      <a-checkbox-group v-model="checkIdList">
        <div class="item" v-for="item in data.list">
          <div class="check">
            <a-checkbox :value="item.id"></a-checkbox>
          </div>
          <slot :item="item"></slot>
        </div>
      </a-checkbox-group>
      <div class="page" v-if="data.list.length">
        <a-pagination :total="data.count" show-total v-model:current="params.page" :page-size="params.limit"
                      @change="getData"></a-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.comment_list_com {
  .actions {
    display: flex;
    align-items: center;
    height: 24px;

    .arco-btn {
      margin-left: 10px;
    }
  }

  > .comment_list {
    .arco-checkbox-group {
      width: 100%;
    }
  }

  .page {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>