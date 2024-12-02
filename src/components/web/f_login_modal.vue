<script setup lang="ts">
import {Modal} from "@arco-design/web-vue";
import {Button} from "@arco-design/web-vue";

interface Props {
  visible: boolean
}
const props = defineProps<Props>()
const emits = defineEmits(["update:visible", "destruction"])

function cancel(){
  emits("update:visible", false)
}

function loginSuccess(){
  emits("destruction")
}


</script>

<template>
  <Modal title="登录" :visible="props.visible" @cancel="cancel">
    <Button @click="loginSuccess">销毁</Button>
  </Modal>
</template>

<style  lang="less">

</style>