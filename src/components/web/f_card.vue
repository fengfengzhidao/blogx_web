<script setup lang="ts">
interface Props {
  title: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="f_card_com">
    <div class="head">{{ props.title }}</div>
    <div class="body scrollbar">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.f_card_com {
  background: var(--color-bg-1);
  border-radius: 5px;

  > .head {
    padding: 20px 20px 10px 20px;
    border-bottom: @f_border;
    font-size: 16px;
    font-weight: 600;
  }

  > .body {
    padding: 10px 20px 20px 20px;
  }
}
</style>