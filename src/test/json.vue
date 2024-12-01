<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
</script>

<template>
<div>
  <vue-json-pretty :data="{ key: 'value' }" />
</div>
</template>

<style scoped lang="less">

</style>