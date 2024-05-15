<script setup lang="ts">

function handleSelect(val: string) {
  console.log(val)
}
</script>

<template>
  <a-dropdown @select="handleSelect" :popup-max-height="false">
    <div class="f_user_dropdown_com">
      <a-avatar :size="35"
          image-url="https://img2.baidu.com/it/u=4194115798,4169726391&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1715878800&t=82357305157980f56d5dc312d7255f02"></a-avatar>
      <span class="user_name">枫枫知道</span>
      <icon-down/>
    </div>


    <template #content>
      <a-doption>Option 1</a-doption>
      <a-doption disabled>Option 2</a-doption>
      <a-doption>Option 3</a-doption>
      <a-doption>Option 4</a-doption>
      <a-doption>Option 5</a-doption>
      <a-doption>Option 6</a-doption>
      <a-doption>Option 7</a-doption>
      <a-doption>Option 8</a-doption>
      <a-doption>Option 9</a-doption>
    </template>
  </a-dropdown>
</template>

<style lang="less">
.f_user_dropdown_com {
  cursor: pointer;

  .user_name {
    margin: 0 5px;
  }

  svg {
    margin-right: 0 !important;
  }
}
</style>