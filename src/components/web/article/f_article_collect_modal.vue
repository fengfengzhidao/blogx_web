<script setup lang="ts">
import {reactive, ref} from "vue";

interface Props {
  visible: boolean
}

import {collectListApi, type collectListType} from "@/api/collect_api";
import type {listResponse} from "@/api";
import {Message} from "@arco-design/web-vue";
import F_collect_form_modal from "@/components/web/article/f_collect_form_modal.vue";

const props = defineProps<Props>()
const emits = defineEmits(["update:visible", "select"])
const data = reactive<listResponse<collectListType>>({
  list: [],
  count: 0
})

function cancel() {
  emits("update:visible", false)
}

async function beforeOpen() {
  data.list = []
  data.count = 0
  const res = await collectListApi({type: 1})
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}

const form = reactive({})
const title = ref("")

function addModal() {
  collectVisible.value = true
}

const collectVisible = ref(false)

function select(item: collectListType) {
  emits("select", item.id)
  cancel()
}

</script>

<template>
  <a-modal :footer="false" body-class="collect_modal_body" title="收藏文章" @before-open="beforeOpen" @cancel="cancel"
           :visible="props.visible">
    <f_collect_form_modal v-model:title="title" v-model:visible="collectVisible"
                          @ok="beforeOpen"></f_collect_form_modal>
    <div class="add">
      <div class="inner" @click="addModal">
        <i class="iconfont icon-jia"></i>
        <span>创建收藏夹</span>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="item in data.list">
        <div class="left">
          <div class="title">{{ item.title }}</div>
          <div class="count">{{ item.articleCount }}篇文章</div>
        </div>
        <a-button @click="select(item)" type="primary" size="mini">收藏</a-button>
      </div>
    </div>
  </a-modal>
</template>

<style lang="less">
.collect_modal_body {
  padding: 0;

  .add {
    padding: 10px 20px;

    .inner {
      border-radius: 5px;
      background-color: var(--color-fill-1);
      padding: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: var(--color-text-2);

      span {
        margin-left: 5px;
      }
    }
  }

  .list {
    width: 100%;

    .item {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;

      &:hover {
        background-color: var(--color-fill-1);
      }

      .title {
        font-size: 16px;
      }

      .count {
        font-size: 12px;
        color: var(--color-text-2);
      }

      .arco-btn {
        border-radius: 100px;
      }
    }
  }
}
</style>