<script setup lang="ts">
interface Props {
  type?: 1 | 2
}

const props = defineProps<Props>()

const {type = 1} = props


</script>

<template>
  <div class="f_title" :class="`f_title_${type}`">
    <slot></slot>
  </div>
</template>

<style lang="less">
.f_title {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;

  &::before {
    content: "";
    display: inline-block;
    background: rgb(var(--primary-6));
    margin-right: 5px;
  }

  &.f_title_1 {
    &::before {
      width: 4px;
      height: 1.5rem;
    }
  }

  &.f_title_2 {
    &::before {
      width: 5px;
      height: 5px;
      border-radius: 50%;
    }
  }
}

</style>