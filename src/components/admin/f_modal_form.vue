<script setup lang="ts">
interface Props {
  visible: boolean
}


const props = defineProps<Props>()
const emits = defineEmits<{
  (e: "update:visible", visible: boolean): void
}>()


function cancel() {
  emits("update:visible", false)
}

</script>

<template>
  <a-modal :visible="props.visible" @cancel="cancel">

  </a-modal>
</template>

<style scoped>

</style>