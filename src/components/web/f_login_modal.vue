<script setup lang="ts">
import {Message, Modal} from "@arco-design/web-vue";
import {Button} from "@arco-design/web-vue";
import {Form, FormItem, Input} from "@arco-design/web-vue";
import {pwdLoginApi, type pwdLoginRequest} from "@/api/user_api";
import {reactive, ref} from "vue";
import {userStorei} from "@/stores/user_store";
import Pwd_login from "@/components/web/login/pwd_login.vue";
import Email_login from "@/components/web/login/email_login.vue";

const store = userStorei()

interface Props {
  visible: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(["update:visible", "destruction"])

function cancel() {
  emits("update:visible", false)
}

function loginSuccess() {
  emits("destruction")
}

const type = ref(1) // 1 pwd 2 邮箱


async function handler(data: string) {
  Message.success("登录成功")
  store.saveUserInfo(data)
  emits("update:visible", false)
  setTimeout(() => {
    emits("destruction")
  }, 1000)
}

</script>

<template>
  <Modal width="380px" modal-class="f_login_modal" :visible="props.visible" @cancel="cancel" :footer="false">
    <div class="banner">
      <div class="title">BlogX 登录</div>
      <img src="@/assets/img/banner.png" alt="">
    </div>

    <pwd_login v-if="type === 1" @ok="handler"></pwd_login>
    <email_login v-if="type===2" @ok="handler"></email_login>

    <div class="form">
      <div class="register">
        <span v-if="type===1">还没有账号？ <a href="javascript:void 0" @click="type=2">去注册</a></span>
        <span v-if="type===2">已有账号 <a href="javascript:void 0" @click="type=1">去登录</a></span>
      </div>
      <div class="other">第三方登录</div>

      <div class="other_login">
        <img src="@/assets/img/QQ.svg" alt="">
      </div>
    </div>
  </Modal>
</template>

<style lang="less">
.f_login_modal {
  .arco-modal-header {
    display: none;
  }

  .arco-modal-body {
    padding: 0;

    .banner {
      height: 124px;
      position: relative;
      border-radius: 5px 5px 0 0;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
      }

      .title {
        position: absolute;
        width: 100%;
        text-align: center;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        color: white;
        font-weight: 600;
        font-size: 36px;
      }
    }

    .arco-form {
      padding: 20px 20px 0 20px;
    }

    .form {
      padding: 0 20px 20px 20px;

      .register {
        font-size: 14px;
        color: var(--color-text-2);
      }

      .other {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--color-text-2);
        font-size: 12px;
        margin-top: 10px;

        &::before {
          content: "";
          display: block;
          width: 35%;
          height: 1px;
          background: var(--color-fill-2);
        }

        &::after {
          content: "";
          display: block;
          width: 35%;
          height: 1px;
          background: var(--color-fill-2);
        }
      }

      .other_login {
        display: flex;
        justify-content: center;
        margin-top: 10px;

        img {
          width: 40px;
          height: 40px;
        }
      }
    }


  }
}
</style>