<script setup lang="ts">
import * as echarts from 'echarts';
import {onMounted, ref, watch} from "vue";
import {theme} from "@/components/common/f_theme";

type EChartsOption = echarts.EChartsOption;
const myChart = ref<echarts.ECharts>()
function initEcharts(){
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
    title: {
      text: '用户登录数据',
      textStyle: {
        color: textColor
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['登录', '注册',],
      textStyle: {
        color: textColor
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: lineColor
          }
        }
      }
    ],
    series: [
      {
        name: '登录',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210],
        smooth: true,
      },
      {
        name: '注册',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        smooth: true,
        data: [220, 182, 191, 234, 290, 330, 310]
      },
    ]
  };
  option && myChart.value?.setOption(option);
}

onMounted(() => {
  const chartDom = document.querySelector('.user_login_echarts') as HTMLDivElement;
  myChart.value = echarts.init(chartDom);
  initEcharts()
})

watch(()=>theme.value, ()=>{
  initEcharts()
})


</script>

<template>
  <div class="user_login_echarts"></div>
</template>

<style lang="less">
.user_login_echarts {
  width: 100%;
  height: 300px;
  background-color: var(--color-bg-1);
  border-radius: 5px;
}
</style>