<script setup lang="ts">
import type {commentTreeType} from "@/api/comment_api";
import {dateCurrentFormat} from "@/utils/date";
import {nextTick, ref} from "vue";

interface Props {
  list: commentTreeType[]
}

const props = defineProps<Props>()
async function apply(item: commentTreeType){
  item.isApply = !item.isApply
  nextTick(()=>{
    const div = document.querySelector(`.apply_comment_ipt_${item.id} input`) as HTMLInputElement
    div.focus()
  })
}

</script>

<template>
  <a-comment class="comment_tree_com" :content="item.content" v-for="item in props.list" :author="item.userNickname"
             :datetime="dateCurrentFormat(item.createdAt)">
    <template #actions>
      <span class="action">
          <i class="iconfont icon-dianzan_kuai"></i> 点赞（{{ item.diggCount }}）
      </span>
      <span class="action" @click="apply(item)">
        <i class="iconfont icon-pinglun1"/> 回复（{{ item.applyCount }}）
      </span>
    </template>
    <template #avatar>
      <a-avatar>
        <img
            alt="avatar"
            :src="item.userAvatar"
        />
      </a-avatar>
    </template>
    <div class="apply_comment" v-if="item.isApply">
      <a-input :class="`apply_comment_ipt_${item.id}`" :placeholder="`回复${item.userNickname}`"></a-input>
      <a-button type="primary">回复</a-button>
    </div>
    <comment_tree :list="item.subComments" v-if="item.subComments?.length"></comment_tree>
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