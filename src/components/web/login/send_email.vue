<script setup lang="ts">

import {Button, Form, FormItem, Input, Message} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import {sendEmailApi, type sendEmailType} from "@/api/user_api";
import {userStorei} from "@/stores/user_store";

const store = userStorei()
const emits = defineEmits(["ok"])
const form = reactive<sendEmailType>({
  type: 3,
  email: "",
  captchaID: "",
  captchaCode: "",
})
const formRef = ref()

async function handler() {
  const val = await formRef.value.validate()
  if (val) return
  const res = await sendEmailApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits("ok", res.data)
}


</script>

<template>
  <Form ref="formRef" :model="form" :label-col-props="{span: 0}" :wrapper-col-props="{span: 24}">
    <FormItem field="email" :rules="[{required: true, message:'请输入邮箱'}]">
      <Input v-model="form.email" placeholder="邮箱"></Input>
    </FormItem>
    <FormItem content-class="captcha_item"  v-if="store.siteInfo.login.captcha">
      <Input v-model="form.captchaCode" placeholder="图形验证码"></Input>
      <img src="https://modao.cc/uploads7/images/13792/137926380/v2_sk3ooq.png" alt="">
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handler" long>验证邮箱</Button>
    </FormItem>
  </Form>
</template>

<style lang="less">
.captcha_item{
  img {
    width: 93px;
    height: 32px;
    border-radius: 5px;
    margin-left: 10px;
  }
}
</style>