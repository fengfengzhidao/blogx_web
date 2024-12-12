<script setup lang="ts">

import Comment_tree from "@/components/web/comment/comment_tree.vue";
import {reactive, ref, watch} from "vue";
import type {listResponse} from "@/api";
import {commentCreateApi, type commentCreateRequest, commentTreeApi, type commentTreeType} from "@/api/comment_api";
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


const form = reactive<commentCreateRequest>({
  content: "",
  articleID: props.articleId,
  parentID: undefined,
})

async function create() {
  form.articleID = props.articleId
  if (form.content.trim() === "") {
    Message.warning("请输入评论内容")
    return
  }
  const res = await commentCreateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getData()
  form.content = ""
}

watch(() => props.articleId, () => {
  getData()
}, {immediate: true})

const textareaRef = ref()

function focus() {
  textareaRef.value.focus()
}

defineExpose({focus})


</script>

<template>
  <div class="article_comment_com">
    <div class="add_comment">
      <a-textarea v-model="form.content" ref="textareaRef" @keydown.enter="create" :auto-size="{minRows: 5, maxRows: 6}"
                  placeholder="请输入评论内容"></a-textarea>
      <a-button type="primary" @click="create" size="mini">发布评论</a-button>
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

  .comment_list {
    padding: 0 20px;

    .arco-comment-inner-comment {
      margin-top: 10px;
    }

    .arco-comment-actions {
      display: flex;
      align-items: center;
      margin-top: 5px;
    }

    .action {
      display: inline-flex;
      align-items: center;

      i {
        cursor: pointer;
        margin-right: 5px;
      }

      .icon-pinglun1 {
        font-size: 16px;
        padding-top: 2px;
      }
    }
  }
}
</style>