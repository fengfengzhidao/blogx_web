<script setup lang="ts">
import {bannerListApi, type bannerListType} from "@/api/banner_api";
import {reactive} from "vue";
import type {listResponse} from "@/api";
import F_card from "@/components/web/f_card.vue";

const data = reactive<listResponse<bannerListType>>({
  list: [],
  count: 0
})

async function getData() {
  const res = await bannerListApi({type: 2})
  const list: bannerListType[] = []
  res.data.list.forEach((item) => {
    if (item.show) {
      list.push(item)
    }
  })
  data.list = list
}

function goItem(item: bannerListType) {
  if (item.href == "") {
    return
  }
  window.open(item.href, "_blank")
}

getData()


</script>

<template>
  <f_card title="独家推广" class="extension_com">
    <a-carousel auto-play show-arrow="hover" class="f_banner_com" v-if="data.list.length">
      <a-carousel-item v-for="item in data.list">
        <img
            @click="goItem(item)"
            :src="item.cover"
            :class="{isHref: item.href !== ''}"
            :style="{
          width: '100%',
        }"
        />
      </a-carousel-item>
    </a-carousel>
  </f_card>

</template>

<style lang="less">
.extension_com {
  .arco-carousel {
    height: 120px;

    .arco-carousel-item-current {
      border-radius: 5px;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }

      img.isHref {
        cursor: pointer;
      }
    }
  }
}

</style>