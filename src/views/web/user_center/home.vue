<script setup lang="ts">

import F_card from "@/components/web/f_card.vue";
import {userCenterStorei} from "@/stores/user_center_store";
import {userDetailUpdateApi, type userDetailUpdateRequest} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";

const store = userCenterStorei()

async function userUpdateColumn() {

  const res = await userDetailUpdateApi({
    homeStyleID: store.userDetail.homeStyleID,
  })
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}


</script>

<template>
  <div class="user_center_home_view">
    <f_card title="主页设置">
      <a-form :model="store.userDetail" :label-col-props="{span: 4}" label-align="left">
        <a-form-item class="home_style_item" label="主页样式">
          <a-radio-group v-model="store.userDetail.homeStyleID">
            <a-radio :value="1">
              <img src="@/assets/img/home/img.png" alt="">
              <div class="text">默认样式</div>
            </a-radio>
            <a-radio :value="2">
              <img src="@/assets/img/home/img_1.png" alt="">
              <div class="text">海底探索</div>
            </a-radio>
            <a-radio :value="3">
              <img src="@/assets/img/home/img_2.png" alt="">
              <div class="text">恋人分别</div>
            </a-radio>
            <a-radio :value="4">
              <img src="@/assets/img/home/img_3.png" alt="">
              <div class="text">雷达探索</div>
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
      <a-button @click="userUpdateColumn" type="primary">更新</a-button>
    </f_card>
  </div>
</template>

<style lang="less">
.user_center_home_view {
  .arco-form {
    .home_style_item {
      flex-direction: column;

      .arco-radio-group {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-row-gap: 20px;
        grid-column-gap: 20px;
      }

      .arco-radio {
        width: 100%;
        border: @f_border;
        border-radius: 5px;
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        padding: 10px;

        .arco-radio-label {
          margin-left: 0;

          img {
            width: 100%;
          }

          .text {
            text-align: center;
            margin-bottom: 5px;
            color: var(--color-text-2);
          }
        }
      }
    }
  }
}
</style>