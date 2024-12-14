<script setup lang="ts">
import {reactive, ref} from "vue";
import type {listResponse, paramsType} from "@/api";
import {textSearchApi, type textSearchType} from "@/api/search_api";
import {Message} from "@arco-design/web-vue";

interface Props {
  visible: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(["update:visible"])

function cancel() {
  form.key = ""
  data.list = []
  data.count = 0
  emits("update:visible", false)
}

const form = reactive<paramsType>({
  key: "",
})

const data = reactive<listResponse<textSearchType>>({
  list: [],
  count: 0
})

async function search() {
  const res = await textSearchApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}

function setSearch(key: string) {
  form.key = key
  search()
}
const textRef = ref()
function beforeOpen() {
  console.log(1, textRef.value, form.key ==="")
  if (form.key ===""){
    textRef.value.focus()
  }

}
defineExpose({
  setSearch
})

</script>

<template>
  <a-modal
      title="全文搜索" @before-open="beforeOpen" :footer="false" body-class="f_article_search_modal_body"
      :visible="props.visible" @cancel="cancel">
    <div class="head">
      <a-input ref="textRef" v-model="form.key" @keydown.enter="search" placeholder="请输入搜索内容"></a-input>
      <a-button @click="search" type="primary">搜索</a-button>
    </div>
    <div class="body">
      <div class="list scrollbar">
        <div class="item" v-for="item in data.list">
          <div class="title" v-html="item.head"></div>
          <div class="abs" v-html="item.body"></div>
        </div>
      </div>
      <div class="page">
        共搜索到结果{{data.list.length}}条
      </div>
    </div>
  </a-modal>
</template>

<style lang="less">
.f_article_search_modal_body {
  padding: 0;

  .head {
    padding: 10px 20px;
    display: flex;

    .arco-btn {
      margin-left: 10px;
    }
  }

  .body {
    .list {
      max-height: 60vh;
      overflow-y: auto;
    }

    .item {
      padding: 10px 20px;
      cursor: pointer;

      .title {
        font-size: 16px;
      }

      .abs {
        margin-top: 5px;
        font-size: 12px;
      }

      em {
        color: red;
      }

      &:hover {
        background-color: var(--color-fill-1);
      }
    }

    .page {
      padding: 10px 20px;
      text-align: center;
      color: var(--color-text-2);
    }
  }
}
</style>