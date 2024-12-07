<script setup lang="ts">

import {Message} from "@arco-design/web-vue";
import {userStorei} from "@/stores/user_store";

const store = userStorei()
const emits = defineEmits(["ok"])

import ImgCutter from 'vue-img-cutter'
import {imageUploadApi} from "@/api/image_api";
import {qiniuUploadConfigApi, type qiniuUploadConfigType} from "@/api/site_api";
import {loadScript} from "@/utils/load_js";

async function cutDown(e: any) {
  if (!store.siteInfo.qiNiu.enable) {
    const res = await imageUploadApi(e.file)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    Message.success(res.msg)
    emits("ok", res.data)
    return
  }

  // 获取上传的配置
  const res = await qiniuUploadConfigApi()
  if (res.code) {
    Message.error(res.msg)
    return
  }

  // 前端上传图片到七牛云
  loadScript("/js/qiniu.min.js", ()=>{
    upload(e.file, res.data)
  })

}

function upload(file: File, conf: qiniuUploadConfigType) {
  const observer = {
    next(res: any) {
      // ...
      console.log("next:", res)
    },
    error(err: any) {
      // ...
      console.log("error:", err)
    },
    complete(res: any) {
      // ...
      console.log("complete:", res)
      emits("ok", conf.url)
    }
  }
  const config = {
    useCdnDomain: true,
    region: conf.region
  }
  const putExtra = {

  }
  const observable = qiniu.upload(file, conf.key, conf.token, putExtra, config)
  const subscription = observable.subscribe(observer) // 上传开始
  // console.log(subscription)
}

</script>

<template>
  <ImgCutter @cutDown="cutDown" rate="16:9">
    <template #open>
      <slot></slot>
    </template>
  </ImgCutter>
</template>

<style lang="less">

</style>