<script setup lang="ts">

import router from "@/router";

function handleSelect(val: string) {
  if (val === "logout"){
    // 注销流程
    return
  }
  router.push({name: val})
}

interface OptionType {
  name: string
  title: string
}

const options: OptionType[] = [
  {title: "个人信息", name: "userInfo"},
  {title: "用户列表", name: "userList"},
  {title: "系统信息", name: "settings"},
  {title: "注销退出", name: "logout"},
]


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
      <a-doption v-for="item in options" :value="item.name">{{ item.title }}</a-doption>
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