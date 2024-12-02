<script setup lang="ts">
import {Message, Modal} from "@arco-design/web-vue";
import {Button} from "@arco-design/web-vue";
import {Form, FormItem, Input} from "@arco-design/web-vue";
import {pwdLoginApi, type pwdLoginRequest} from "@/api/user_api";
import {reactive, ref} from "vue";
import {userStorei} from "@/stores/user_store";

const store = userStorei()
interface Props {
  visible: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(["update:visible", "destruction"])

function cancel() {
  emits("update:visible", false)
}

const form = reactive<pwdLoginRequest>({
  val: "",
  password: "",
  code: ""
})

function loginSuccess() {
  emits("destruction")
}

const formRef = ref()

async function pwdLoginHandler() {
  const val = await formRef.value.validate()
  if (val) return
  const res = await pwdLoginApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }

  Message.success(res.msg)
 store.saveUserInfo(res.data)
  emits("update:visible", false)
  setTimeout(()=>{
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
    <Form ref="formRef" :model="form" :label-col-props="{span: 0}" :wrapper-col-props="{span: 24}">
      <FormItem field="val" :rules="[{required: true, message:'请输入用户名'}]">
        <Input v-model="form.val" placeholder="用户名"></Input>
      </FormItem>
      <FormItem field="password" :rules="[{required: true, message:'请输入密码'}]">
        <Input v-model="form.password" placeholder="密码"></Input>
      </FormItem>
      <FormItem>
        <Input v-model="form.code" placeholder="图形验证码"></Input>
        <img src="https://modao.cc/uploads7/images/13792/137926380/v2_sk3ooq.png" alt="">
      </FormItem>
      <FormItem>
        <Button type="primary" @click="pwdLoginHandler" long>登录</Button>
      </FormItem>
      <div class="register">
        <span>还没有账号？ <a href="javascript:void 0">去注册</a></span>
      </div>
      <div class="other">第三方登录</div>

      <div class="other_login">
        <img src="@/assets/img/QQ.svg" alt="">
      </div>
    </Form>
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
      padding: 20px;

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