<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
}
const props = defineProps<Props>()
const emits = defineEmits(["update:modelValue"])

function inputHandler(val: string){
  emits("update:modelValue", val)
}

</script>

<template>
  <div class="f_image_upload">
    <a-input :model-value="props.modelValue" :placeholder="props.placeholder" @input="inputHandler"></a-input>
    <a-upload></a-upload>
  </div>
</template>

<style scoped lang="less">

</style>