<script setup lang="ts">
import type {commentTreeType} from "@/api/comment_api";
import {dateCurrentFormat} from "@/utils/date";
import {nextTick, ref} from "vue";
import {commentCreateApi} from "@/api/comment_api";
import {Message} from "@arco-design/web-vue";
import {userStorei} from "@/stores/user_store";
import F_label from "@/components/common/f_label.vue";
import {relationOptions} from "@/options/options";

const store = userStorei()

interface Props {
  list: commentTreeType[]
  line?: number
}

const emits = defineEmits(["ok"])
const props = defineProps<Props>()

function apply(item: commentTreeType) {
  item.isApply = !item.isApply
  if (!item.isApply) {
    return
  }
  nextTick(() => {
    const div = document.querySelector(`.apply_comment_ipt_${item.id} input`) as HTMLInputElement
    div.focus()
  })
}

async function applyComment(item: commentTreeType) {
  if (item.applyContent?.trim() === "") {
    Message.warning("请输入回复内容")
    return
  }

  const res = await commentCreateApi({
    content: item.applyContent as string,
    articleID: item.articleID,
    parentID: item.id,
  })
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits("ok")
}

function ok() {
  emits("ok")
}

</script>

<template>
  <a-comment class="comment_tree_com" :content="item.content" v-for="item in props.list"
             :datetime="dateCurrentFormat(item.createdAt)">
    <template #actions>
      <span class="action">
          <i class="iconfont icon-dianzan_kuai"></i> 点赞（{{ item.diggCount }}）
      </span>
      <span class="action" v-if="props.line != store.siteInfo.article.commentLine" @click="apply(item)">
        <i class="iconfont icon-pinglun1"/> 回复（{{ item.applyCount }}）
      </span>
    </template>
    <template #author>
      <span>{{ item.userNickname }}</span>
      <f_label style="margin-left: 10px" v-if="item.userID !== store.userInfo.userID && item.relation !== 1" :options="relationOptions" :value="item.relation"></f_label>
    </template>
    <template #avatar>
      <a-avatar :image-url="item.userAvatar"></a-avatar>
    </template>
    <div class="apply_comment" v-if="item.isApply">
      <a-input v-model="item.applyContent" :class="`apply_comment_ipt_${item.id}`"
               :placeholder="`回复${item.userNickname}`"></a-input>
      <a-button type="primary" @click="applyComment(item)">回复</a-button>
    </div>
    <comment_tree :line="props.line + 1" @ok="ok" :list="item.subComments"
                  v-if="item.subComments?.length"></comment_tree>
  </a-comment>
</template>

<style lang="less">
.comment_tree_com {
  .action {
    cursor: pointer;

    &:hover {
      color: rgb(var(--arcoblue-5));
    }
  }

  .apply_comment {
    display: flex;
    align-items: center;

    .arco-btn {
      margin-left: 10px;
    }
  }
}
</style>