<script setup lang="ts">
import {userStorei} from "@/stores/user_store";
import {type FileItem, Message} from "@arco-design/web-vue";
import type {baseResponse} from "@/api";

const store = userStorei()
interface Props {
  modelValue: string
  placeholder?: string
  shape?:string
}


const props = defineProps<Props>()

const {shape="circle"} = props
const emits = defineEmits(["update:modelValue"])

function inputHandler(val: string) {
  emits("update:modelValue", val)
}

function fileUploadCallback(file: FileItem){
  const res = JSON.parse(file.response) as baseResponse<string>
  if (res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits("update:modelValue", res.data)
}

</script>

<template>
  <div class="f_image_upload">
    <a-input :model-value="props.modelValue" :placeholder="props.placeholder" @input="inputHandler"></a-input>
    <a-upload :show-file-list="false" action="/api/images" @success="fileUploadCallback" name="file" :headers="{token: store.userInfo.token}">
      <template #upload-button>
        <a-avatar :image-url="props.modelValue" :shape="shape" :size="60" ></a-avatar>
      </template>
    </a-upload>
  </div>
</template>

<style lang="less">
.f_image_upload {
  width: 100%;
  .arco-input-wrapper{
    display: flex;
    margin-bottom: 10px;
  }
}
</style>