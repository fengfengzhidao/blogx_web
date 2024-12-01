<script setup lang="ts">
import F_welcome from "@/components/admin/f_welcome.vue";
import F_quick_entrance from "@/components/admin/f_quick_entrance.vue";
import F_version from "@/components/common/f_version.vue";
import F_title from "@/components/common/f_title.vue";
import {reactive} from "vue";
import {dataGrowthApi, type dataGrowthType} from "@/api/data_api";
import {Message} from "@arco-design/web-vue";
import Echarts_v1 from "@/components/echarts/echarts_1/echarts_v1.vue";

const data = reactive<dataGrowthType>({
  growthRate: 0,
  growthNum: 0,
  countList: [],
  dateList: [],
})

async function getData() {
  const res = await dataGrowthApi(1)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}

getData()


</script>

<template>
  <div class="home_view">
    <div class="left">
      <f_welcome></f_welcome>
      <div class="charts charts_3">
        <div class="item">
          <f_title :type="2">访问人数</f_title>
          <div class="body">
            <div class="left">

            </div>
            <div class="right">
              <echarts_v1 class="user_growth" :count-list="data.countList" :date-list="data.dateList"></echarts_v1>
            </div>
          </div>
        </div>
        <div class="item">
          <f_title :type="2">发布文章</f_title>
        </div>
        <div class="item">
          <f_title :type="2">新增用户</f_title>
        </div>
      </div>
      <div class="charts charts_2">
        <div class="item">
          <f_title :type="2">发布文章</f_title>
        </div>
        <div class="item">
          <f_title :type="2">系统资源</f_title>
        </div>
      </div>
    </div>
    <div class="right">
      <f_quick_entrance></f_quick_entrance>
      <f_version></f_version>
    </div>
  </div>
</template>

<style lang="less">
.home_view {
  background-color: inherit !important;
  display: flex;
  justify-content: space-between;

  > .left {
    width: 75%;

    .charts {
      margin-bottom: 20px;
      grid-column-gap: 20px;
      display: grid;

      .item {
        background: var(--color-bg-1);
        border-radius: 5px;
        padding: 20px 10px;
      }
    }

    .charts_3 {
      grid-template-columns: repeat(3, 1fr);

      .body {
        display: flex;
        justify-content: space-between;
        height: 200px;
      }

      .left {
        width: 40%;
      }

      .right {
        width: 60%;
      }
    }

    .charts_2 {
      grid-template-columns: 7fr 3fr;
    }

  }

  > .right {
    width: calc(25% - 20px);

    .f_quick_entrance {
      margin-bottom: 20px;
    }
  }
}
</style>