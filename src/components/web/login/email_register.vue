<script setup lang="ts">

import {Button, Form, FormItem, Input, Message} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import {emailRegisterApi, type emailRegisterType} from "@/api/user_api";

const formRef = ref()
const emits = defineEmits(["ok"])

interface Props {
  emailId: string
}

const props = defineProps<Props>()
const form = reactive<emailRegisterType>({
  emailID: "",
  emailCode: "",
  pwd: "",
  rePwd: ""
})

async function handler() {
  const val = await formRef.value.validate()
  if (val) return
  form.emailID = props.emailId
  const res = await emailRegisterApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  emits("ok", res.data)
}
</script>

<template>
  <Form ref="formRef" :model="form" :label-col-props="{span: 0}" :wrapper-col-props="{span: 24}">
    <FormItem field="val" :rules="[{required: true, message:'请输入邮箱验证码'}]">
      <Input v-model="form.emailCode" placeholder="用户名"></Input>
    </FormItem>
    <FormItem field="pwd" :rules="[{required: true, message:'请输入密码'}]">
      <Input v-model="form.pwd" type="password" placeholder="密码"></Input>
    </FormItem>
    <FormItem field="rePwd" :rules="[{required: true, message:'请输入确认密码'}]">
      <Input v-model="form.rePwd" type="password" placeholder="密码"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handler" long>注册</Button>
    </FormItem>
  </Form>
</template>