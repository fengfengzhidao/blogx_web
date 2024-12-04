<script setup lang="ts">
import ImgCutter from 'vue-img-cutter'
import {imageUploadApi} from "@/api/image_api";

async function cutDown(e: any) {
  const res = await imageUploadApi(e.file)
  console.log(res)
}

</script>

<template>
  <ImgCutter @cutDown="cutDown" rate="1:1"></ImgCutter>
</template>

<style scoped lang="less">

</style>