<script setup lang="ts">
import {pwdLoginApi, type pwdLoginRequest} from "@/api/user_api";
import {Button, Form, FormItem, Input, Message} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import {userStorei} from "@/stores/user_store";
import F_captcha from "@/components/web/f_captcha.vue";

const store = userStorei()
const form = reactive<pwdLoginRequest>({
  val: "",
  password: "",
  captchaID: "",
  captchaCode: "",
})

const formRef = ref()
const emits = defineEmits(["ok"])
const captchaRef = ref()
async function handler() {
  const val = await formRef.value.validate()
  if (val) return
  const res = await pwdLoginApi(form)
  if (res.code) {
    Message.error(res.msg)
    // 只要失败，图形验证码就得从来
    captchaRef.value?.getData()
    return
  }
  emits("ok", res.data)
}
</script>

<template>
  <Form ref="formRef" :model="form" :label-col-props="{span: 0}" :wrapper-col-props="{span: 24}">
    <FormItem field="val" :rules="[{required: true, message:'请输入用户名'}]">
      <Input v-model="form.val" placeholder="用户名"></Input>
    </FormItem>
    <FormItem field="password" :rules="[{required: true, message:'请输入密码'}]">
      <Input v-model="form.password" type="password" placeholder="密码"></Input>
    </FormItem>
    <FormItem content-class="captcha_item" field="captchaCode"  :rules="[{required: true, message:'请输入图形验证码'}]" v-if="store.siteInfo.login.captcha">
      <Input v-model="form.captchaCode" placeholder="图形验证码"></Input>
      <f_captcha ref="captchaRef" v-model="form.captchaID"></f_captcha>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handler" long>登录</Button>
    </FormItem>
  </Form>
</template>

<style lang="less">
.captcha_item {
  img {
    width: 93px;
    height: 32px;
    border-radius: 5px;
    margin-left: 10px;
  }
}
</style>