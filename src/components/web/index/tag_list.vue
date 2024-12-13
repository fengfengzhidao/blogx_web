<script setup lang="ts">
import F_card from "@/components/web/f_card.vue";
import {reactive} from "vue";
import type {listResponse} from "@/api";
import {tagListApi, type tagListType} from "@/api/search_api";
import router from "@/router";
import {useRoute} from "vue-router";

const route = useRoute()
const data = reactive<listResponse<tagListType>>({
  list: [],
  count: 0
})

async function getData() {
  const res = await tagListApi({limit: 10, page: 1})
  data.list = res.data.list
}




async function goTag(item: tagListType){
  let tag = item.tag
  if (route.query.tag === item.tag){
    tag = ""
  }
  router.push({
    name: route.name as string,
    query: {
      tag: tag
    }
  })
}


getData()
</script>

<template>
  <f_card title="标签云" class="f_tag_list_com">
    <div class="tag_list">
      <div class="item" @click="goTag(item)" :class="{active: item.tag === route.query.tag}" v-for="item in data.list">
        <span>
          <a-typography-text :ellipsis="{rows: 1, css: true}">{{ item.tag }}</a-typography-text>
        </span>
        <span>{{ item.articleCount }}</span>
      </div>
    </div>
  </f_card>
</template>

<style lang="less">
@keyframes box_move {
  0% {
    left: 0;
    top: 0
  }

  25% {
    left: calc(100% - 20px);
    top: 0;
  }

  50% {
    left: calc(100% - 20px);
    top: calc(100% - 20px);
  }

  75% {
    top: calc(100% - 20px);
    left: 0;
  }

  to {
    left: 0;
    top: 0;
  }
}

.f_tag_list_com {
  .body {
    padding: 20px;
    position: relative;

    &::before{
      display: block;
      content: "";
      width: 20px;
      height: 20px;
      background-color: rgb(var(--arcoblue-6));
      position: absolute;
      left: 0;
      top: 0;
      animation-name: box_move;
      animation-duration: 5s;
      animation-iteration-count: infinite;
    }

    .tag_list {
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 50%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--color-text-1);
        &.active{
         color: rgb(var(--arcoblue-6));
          .arco-typography{
            color: rgb(var(--arcoblue-6));
          }
        }

        &:nth-child(4n+3), &:nth-child(4n+4) {
          background-color: var(--color-fill-1);
        }
        &:nth-child(4n+1), &:nth-child(4n+2) {
          background-color: var(--color-fill-2);
        }
        span:nth-child(1){
          max-width: 4rem;
        }
        span:nth-child(2){
          font-size: 12px;
          margin-left: 12px;
        }
      }
    }
  }
}
</style>