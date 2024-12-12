<script setup lang="ts">
import type {commentTreeType} from "@/api/comment_api";
import {dateCurrentFormat} from "@/utils/date";

interface Props {
  list: commentTreeType[]
}

const props = defineProps<Props>()
</script>

<template>
  <a-comment v-for="item in props.list" :author="item.userNickname" :datetime="dateCurrentFormat(item.createdAt)">
    <template #actions>
      <span class="action" key="heart">
          <i class="iconfont icon-dianzan_kuai"></i> 点赞（{{ item.diggCount }}）
      </span>
      <span class="action" key="reply">
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
    <template #content>
      <div>
        {{ item.content }}
      </div>
    </template>
    <comment_tree :list="item.subComments" v-if="item.subComments?.length"></comment_tree>
  </a-comment>
</template>

<style lang="less">

</style>