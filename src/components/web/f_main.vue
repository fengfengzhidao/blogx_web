<script setup lang="ts">

</script>

<template>
  <div class="f_main_com">
    <div class="f_container">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.f_main_com {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px;
  background-color: var(--color-neutral-2);

  > .f_container {
    width: 1200px;
    min-height: calc(100vh - 122px);
  }
}
</style>