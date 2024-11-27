<script setup lang="ts">
import {userStorei} from "@/stores/user_store";
import {loadTheme} from "@/components/common/f_theme";

loadTheme()
const store = userStorei()
// store.loadUserInfo()

</script>

<template>
  <router-view></router-view>
</template>
