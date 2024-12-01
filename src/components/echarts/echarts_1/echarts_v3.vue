<script setup lang="ts">
import * as echarts from 'echarts';
import {onMounted, reactive, ref, watch} from "vue";
import {theme} from "@/components/common/f_theme";
import {dataComputerApi, type dataComputerType, type dataGrowthType} from "@/api/data_api";
import {dataArticleGrowthApi} from "@/api/data_api";
import {Message} from "@arco-design/web-vue";

type EChartsOption = echarts.EChartsOption;
let myChart: echarts.ECharts | null = null

const data = reactive<dataComputerType>({
  cpuPercent: 0,
  memPercent: 0,
  diskPercent: 0,
})

async function getData() {
  const res = await dataComputerApi()
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}


function initEcharts() {
  let option: EChartsOption;

  const textColor = getComputedStyle(document.body).getPropertyValue("--color-text-1")
  const lineColor = getComputedStyle(document.body).getPropertyValue("--color-neutral-2")

  let themeColor = [
    '#1c5ae0',
    '#15c5be'
  ]
  if (theme.value === "dark") {
    themeColor = [
      '#1c5ae0',
      '#15c5be'
    ]
  }

  option = {
    color: themeColor,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params: any) => {
        const data = params[0]
        console.log(data)
        return `<div>
<div>${data.name}</div>
<div>${data.seriesName} ${(data.data as number).toFixed(1)}%</div>
</div>`
      }
    },
    grid: {
      left: '3%',
      right: '10%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        formatter: '{value}%'
      },
      splitLine: {
        lineStyle: {
          color: lineColor
        }
      }
    },
    yAxis: {
      type: 'category',
      data: ['CPU', '内存', '磁盘']
    },
    series: [
      {
        name: '使用率',
        type: 'bar',
        data: [data.cpuPercent, data.memPercent, data.diskPercent],
        label: {
          show: true,
          formatter: function (params: any) {
            return (params.data as number).toFixed(1) + "%"
          }
        }
      },
    ]
  };
  option && myChart?.setOption(option);
}

onMounted(async () => {
  await getData()
  const chartDom = document.querySelector('.data_computer') as HTMLDivElement;
  myChart = echarts.init(chartDom);
  initEcharts()
})

watch(() => theme.value, () => {
  initEcharts()
})


</script>

<template>
  <div class="data_computer"></div>
</template>

<style lang="less">
.data_computer {
  width: 100%;
  height: 300px;
  background-color: var(--color-bg-1);
  border-radius: 5px;
}
</style>