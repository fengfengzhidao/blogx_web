<script setup lang="ts">

import type {FieldRule} from "@arco-design/web-vue";
import {reactive, ref} from "vue";

export interface formListType {
  label: string
  field: string
  type: "input" | "textarea" | "select" | "switch" | "radio"
  validateTrigger?: "focus" | "input" | "blur" | "change" | ("focus" | "input" | "blur" | "change")[];
  rules?: FieldRule<any> | FieldRule<any>[]
}

interface Props {
  visible: boolean
  formList: formListType[]
  title: string
}


const props = defineProps<Props>()
const emits = defineEmits<{
  (e: "update:visible", visible: boolean): void
  (e: "ok", form: object, fn?:(val: boolean)=>void): void
}>()


function cancel() {
  emits("update:visible", false)
}

const form = reactive<object>({})
const formRef = ref()

async function beforeOk() {
  const val = await formRef.value.validate()
  if (val) return false
  emits("ok", form, (val: boolean)=>{
    if (val){
      cancel()
      return
    }
    return false;
  })
}

</script>

<template>
  <a-modal :title="props.title" :visible="props.visible" @cancel="cancel" :on-before-ok="beforeOk">
    <a-form ref="formRef" :model="form">
      <a-form-item v-for="item in props.formList" :field="item.field" :label="item.label" :rules="item.rules"
                   :validate-trigger="item.validateTrigger as 'blur'"
                   validate-trigger="blur">
        <template v-if="item.type === 'input'">
          <a-input v-model="form[item.field]" :placeholder="item.label"></a-input>
        </template>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>

</style>