<script setup lang="ts">

import type {FieldRule} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import type {optionsFunc, optionsType} from "@/api";
import {Message} from "@arco-design/web-vue";

export interface formListType {
  label: string
  field: string
  type: "input" | "textarea" | "select" | "switch" | "radio"
  validateTrigger?: "focus" | "input" | "blur" | "change" | ("focus" | "input" | "blur" | "change")[];
  rules?: FieldRule<any> | FieldRule<any>[]
  source?: optionsType[] | optionsFunc
  options?: optionsType[]
}

interface Props {
  visible: boolean
  formList: formListType[]
  title: string
}


const props = defineProps<Props>()

const formList = ref<formListType[]>([])

async function initForm() {
  formList.value = []
  for (const f of props.formList) {
    if (typeof f.source === 'function') {
      const res = await f.source()
      if (res.code) {
        Message.error(res.msg)
        continue
      }
      f.options = res.data
    } else {
      f.options = f.source
    }
    formList.value.push(f)
  }
}

initForm()


const emits = defineEmits<{
  (e: "update:visible", visible: boolean): void
  (e: "ok", form: object, fn?: (val: boolean) => void): void
}>()


function cancel() {
  emits("update:visible", false)
}

const form = reactive<object>({})
const formRef = ref()

async function beforeOk() {
  const val = await formRef.value.validate()
  if (val) return false
  emits("ok", form, (val: boolean) => {
    if (val) {
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
      <a-form-item v-for="item in formList" :field="item.field" :label="item.label" :rules="item.rules"
                   :validate-trigger="item.validateTrigger as 'blur'"
                   validate-trigger="blur">
        <template v-if="item.type === 'input'">
          <a-input v-model="form[item.field]" :placeholder="item.label"></a-input>
        </template>
        <template v-else-if="item.type === 'select'">
          <a-select v-model="form[item.field]" :placeholder="item.label" :options="item.options as optionsType[]" allow-clear></a-select>
        </template>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>

</style>