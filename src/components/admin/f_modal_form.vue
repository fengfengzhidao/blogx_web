<script setup lang="ts">

import type {FieldRule} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import type {optionsFunc, optionsType} from "@/api";
import {Message} from "@arco-design/web-vue";

export interface formListType {
  label: string
  field: string
  type?: "input" | "textarea" | "select" | "switch" | "radio"
  validateTrigger?: "focus" | "input" | "blur" | "change" | ("focus" | "input" | "blur" | "change")[];
  rules?: FieldRule<any> | FieldRule<any>[]
  source?: optionsType[] | optionsFunc
  options?: optionsType[]
  autoSize?: boolean | {
    minRows?: number | undefined;
    maxRows?: number | undefined;
  }
  multiple?: boolean

}

interface Props {
  visible: boolean
  formList: formListType[]
  addLabel: string // 添加的时候，显示的名字
  editLabel?: string // 编辑的时候，显示的名字，如果没有就用添加的
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
  (e: "create", form: object, fn?: (val: boolean) => void): void
  (e: "update", form: object, fn?: (val: boolean) => void): void
}>()


function cancel() {
  formRef.value.clearValidate()
  formRef.value.resetFields()
  isEdit.value = false
  emits("update:visible", false)
}

const form = reactive<object>({})
const formRef = ref()

async function beforeOk() {
  const val = await formRef.value.validate()
  if (val) return false
  const emitFn = (val: boolean) => {
    if (val) {
      cancel()
      return
    }
  }
  if (isEdit.value) {
    emits("update", form, emitFn)
  } else {
    emits("create", form, emitFn)
  }
}

const isEdit = ref(false)

function setForm(formObj: any) {
  isEdit.value = true
  Object.assign(form, formObj)
}

defineExpose({
  setForm
})


</script>

<template>
  <a-modal :title="isEdit ? editLabel ? editLabel : addLabel : addLabel" :visible="props.visible" @cancel="cancel"
           :on-before-ok="beforeOk">
    <a-form ref="formRef" :model="form">
      <a-form-item v-for="item in formList" :field="item.field" :label="item.label" :rules="item.rules"
                   :validate-trigger="item.validateTrigger as 'blur'"
                   validate-trigger="blur">
        <template v-if="item.type === 'input'">
          <a-input v-model="form[item.field]" :placeholder="item.label"></a-input>
        </template>
        <template v-else-if="item.type === 'select'">
          <a-select :multiple="item.multiple as boolean" v-model="form[item.field]" :placeholder="item.label"
                    :options="item.options as optionsType[]" allow-clear></a-select>
        </template>
        <template v-else-if="item.type === 'switch'">
          <a-switch v-model="form[item.field]"></a-switch>
        </template>
        <template v-else-if="item.type === 'radio'">
          <a-radio-group v-model="form[item.field]" :options="item.options as optionsType[]"></a-radio-group>
        </template>
        <template v-else-if="item.type === 'textarea'">
          <a-textarea v-model="form[item.field]" :placeholder="item.label" allow-clear
                      :auto-size="item.autoSize as boolean"></a-textarea>
        </template>
        <template v-else>
          <slot :name="item.field" :form="form"></slot>
        </template>
        <template #help>
          <slot :name="`${item.field}_help`" :value="form[item.field]"></slot>
        </template>
      </a-form-item>
    </a-form>
    <template #footer>
      <slot name="footer" :form="form"></slot>
    </template>
  </a-modal>
</template>

<style scoped>

</style>