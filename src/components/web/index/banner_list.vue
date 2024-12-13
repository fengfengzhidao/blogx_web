<script setup lang="ts">
import {bannerListApi, type bannerListType} from "@/api/banner_api";
import {reactive} from "vue";
import type {listResponse} from "@/api";

const data = reactive<listResponse<bannerListType>>({
  list: [],
  count: 0
})

async function getData() {
  const res = await bannerListApi()
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
  <a-carousel class="f_banner_com" v-if="data.list.length">
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
</template>

<style lang="less">
.f_banner_com {
  height: 300px;

  .arco-carousel-item-current {
    border-radius: 5px;

    img.isHref {
      cursor: pointer;
    }
  }
}
</style>