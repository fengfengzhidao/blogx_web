<script setup lang="ts">
import {nextTick, ref, watch} from "vue";

interface Props {
  value?: string[]
}

const props = defineProps<Props>()
const emits = defineEmits(["ok"])
const tags = ref<string[]>([]);

watch(()=>props.value, ()=>{
  if (props.value){
    tags.value = JSON.parse(JSON.stringify(props.value))
  }
}, {immediate: true})

const inputRef = ref(null);
const showInput = ref(false);
const inputVal = ref('');

const handleEdit = () => {
  showInput.value = true;

  nextTick(() => {
    if (inputRef.value) {
      inputRef.value?.focus();
    }
  });
};

const handleAdd = () => {
  if (inputVal.value) {
    tags.value.push(inputVal.value);
    inputVal.value = '';
    emits("ok", tags.value)
  }
  showInput.value = false;

};

const handleRemove = (key: string) => {
  tags.value = tags.value.filter((tag) => tag !== key);

  emits("ok", tags.value)
};
</script>

<template>
  <a-space wrap>
    <a-tag
        v-for="(tag, index) of tags"
        :key="tag"
        closable
        @close="handleRemove(tag)"
    >
      {{ tag }}
    </a-tag>

    <a-input
        v-if="showInput"
        ref="inputRef"
        :style="{ width: '90px'}"
        size="mini"
        v-model.trim="inputVal"
        @keyup.enter="handleAdd"
        @blur="handleAdd"
    />
    <a-tag
        v-else
        :style="{
        width: '90px',
        backgroundColor: 'var(--color-fill-2)',
        border: '1px dashed var(--color-fill-3)',
        cursor: 'pointer',
      }"
        @click="handleEdit"
    >
      <template #icon>
        <icon-plus/>
      </template>
      Add Tag
    </a-tag>
  </a-space>
</template>

<style scoped lang="less">

</style>