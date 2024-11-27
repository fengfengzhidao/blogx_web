<script setup lang="ts">
import {reactive, ref} from "vue";
import type {optionsType} from "@/api";
import {dataStatisticApi, dataWeatherApi, type  weatherType} from "@/api/data_api";
import {userStorei} from "@/stores/user_store";
import {computed} from "vue";

interface Props {
  noWeather?: boolean
  noHelp?: boolean
}

const props = defineProps<Props>()
const store = userStorei()
const data = ref<optionsType[]>([])

async function getData() {
  const res = await dataStatisticApi()
  data.value = res.data
}

const weatherData = reactive<weatherType>({
  "province": "湖南",
  "city": "长沙市",
  "adcode": "430100",
  "weather": "晴",
  "temperature": "34",
  "winddirection": "西南",
  "windpower": "≤3",
  "humidity": "55",
  "reporttime": "2024-05-26 14:01:47",
  "temperature_float": "34.0",
  "humidity_float": "55.0"
})

async function getWeather() {
  if (props.noWeather) {
    return
  }
  const res = await dataWeatherApi()
  Object.assign(weatherData, res.data)
}

// getWeather()

const temperatureLabel = computed(() => {
  const num = Number(weatherData.temperature)
  if (num > 40) {
    return "天气炎热，注意避暑"
  }
  if (num > 30) {
    return "天气较热，多在阴凉出休息"
  }
  if (num > 10) {
    return "天气不错，适合工作"
  }
  if (num > 0) {
    return "天气较冷，多穿点衣服"
  }
  return "天气很冷，注意保暖"
})

const welcomeTitle = computed(() => {
  const now = new Date()
  const h = now.getHours()
  if (h < 9 && h >= 6) {
    return "早安"
  }
  if (h >= 9 && h < 12) {
    return "上午好"
  }
  if (h >= 12 && h < 14) {
    return "中午好"
  }
  if (h >= 14 && h < 16) {
    return "下午好"
  }
  if (h >= 16 && h < 20) {
    return "傍晚好"
  }
  if (h >= 20 && h < 24) {
    return "晚安"
  }
  return "早安"
})

// getData()

</script>

<template>
  <div class="f_welcome">
    <div class="title">{{ welcomeTitle }} {{ store.userInfo.nickName }}，请开始一天的工作吧</div>
    <div v-if="!props.noWeather" class="weather">
      {{ weatherData.province }} · {{ weatherData.city }} 今日 {{ weatherData.weather }}，{{
        weatherData.temperature
      }}℃，{{ temperatureLabel }}
    </div>
    <div class="statistics">
      <a-statistic animation v-for="item in data" :title="item.label" :value="item.value" show-group-separator/>
    </div>
    <div class="extra" v-if="!props.noHelp">
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