<script setup lang="ts">

import Comment_tree from "@/components/web/comment/comment_tree.vue";
import {reactive, watch} from "vue";
import type {listResponse} from "@/api";
import {commentTreeApi, type commentTreeType} from "@/api/comment_api";
import {Message} from "@arco-design/web-vue";

interface Props {
  articleId: number
}

const props = defineProps<Props>()

const data = reactive<listResponse<commentTreeType>>({
  list: [],
  count: 0
})

async function getData() {
  const res = await commentTreeApi(props.articleId)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.count = res.data.count
}

watch(() => props.articleId, () => {
  getData()
}, {immediate: true})


</script>

<template>
  <div class="article_comment_com">
    <div class="add_comment">
      <a-textarea ref="textareaRef" :auto-size="{minRows: 5, maxRows: 6}"
                  placeholder="请输入评论内容"></a-textarea>
      <a-button type="primary" size="mini">发布评论</a-button>
    </div>
    <div class="comment_list">
      <comment_tree :list="data.list"></comment_tree>
    </div>
  </div>
</template>

<style lang="less">
.article_comment_com {
  margin-top: 20px;
  border-radius: 5px;
  background: var(--color-bg-1);

  .add_comment {
    padding: 20px;
    position: relative;

    .arco-btn {
      position: absolute;
      right: 30px;
      bottom: 30px;
      z-index: 2;
    }
  }
}
</style>