<script setup lang="ts">

import axios from "axios";

axios.get("/api/no_cors").then((res)=>{
  console.log(res)
})


</script>

<template>
  <router-view></router-view>
</template>
