<script setup lang="ts">
import {reactive, ref} from "vue";
import {type dataSumType, dataSumApi, type weatherType} from "@/api/data_api";
import {userStorei} from "@/stores/user_store";
import {computed} from "vue";
import {Message} from "@arco-design/web-vue";

interface Props {
  noWeather?: boolean
  noHelp?: boolean
}

const props = defineProps<Props>()
const store = userStorei()
const data = reactive<dataSumType>({
  flowCount: 0,
  userCount: 0,
  articleCount: 0,
  messageCount: 0,
  commentCount: 0,
  newLoginCount: 0,
  newSignCount: 0,
})

async function getData() {
  const res = await dataSumApi()
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}
getData()
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
      <a-statistic animation title="当日流量" :value="data.flowCount" show-group-separator/>
      <a-statistic animation title="用户总数" :value="data.userCount" show-group-separator/>
      <a-statistic animation title="文章总数" :value="data.articleCount" show-group-separator/>
      <a-statistic animation title="消息总数" :value="data.messageCount" show-group-separator/>
      <a-statistic animation title="评论总数" :value="data.commentCount" show-group-separator/>
      <a-statistic animation title="今日登录" :value="data.newLoginCount" show-group-separator/>
      <a-statistic animation title="今日注册" :value="data.newSignCount" show-group-separator/>
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