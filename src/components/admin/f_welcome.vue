<script setup lang="ts">
import {reactive, ref} from "vue";
import type {optionsType} from "@/api";
import {dataStatisticApi} from "@/api/data_api";
import {userStorei} from "@/stores/user_store";

const store = userStorei()
const data = ref<optionsType[]>([])

async function getData() {
  const res = await dataStatisticApi()
  data.value = res.data
}

getData()

</script>

<template>
  <div class="f_welcome">
    <div class="title">早安 {{ store.userInfo.nickName }}，请开始一天的工作吧</div>
    <div class="weather">
      湖南 · 长沙市 今日 多云，33℃，天气较热，多在阴凉出休息
    </div>
    <div class="statistics">
      <a-statistic animation v-for="item in data" :title="item.label" :value="item.value" show-group-separator/>
    </div>
    <div class="extra">
      欢迎使用FengfengAdmin后台系统，可查看 <a href="">系统帮助</a> 以便更好的使用本系统
    </div>
  </div>
</template>

<style lang="less">
.f_welcome {
  width: 100%;
  background-color: var(--color-bg-1);
  border-radius: 5px;
  margin-bottom: 20px;
  background-image: url("@/assets/img/home_bg.png");
  background-size: 500px;
  background-repeat: no-repeat;
  background-position: right center;
  padding: 40px 20px;
  color: var(--color-text-2);

  .title {
    font-size: 22px;
    color: var(--color-text-1);
  }

  .weather {
    margin-top: 20px;
  }

  .statistics {
    margin-top: 20px;

    .arco-statistic {
      margin-right: 30px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .extra {
    margin-top: 20px;

    a {
      text-decoration: none;
      color: @primary-6;
    }
  }
}
</style>