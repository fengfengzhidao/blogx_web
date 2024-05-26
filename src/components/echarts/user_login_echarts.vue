<script setup lang="ts">
import * as echarts from 'echarts';
import {onMounted} from "vue";

type EChartsOption = echarts.EChartsOption;




onMounted(()=>{
  const chartDom = document.querySelector('.user_login_echarts') as HTMLDivElement;
  const myChart = echarts.init(chartDom);
  let option: EChartsOption;

  option = {
    title: {
      text: '用户登录数据'
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
      data: ['登录', '注册',]
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
        type: 'value'
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
  option && myChart.setOption(option);
})



</script>

<template>
  <div class="user_login_echarts" ></div>
</template>

<style lang="less">
.user_login_echarts{
  width: 100%;
  height: 300px;
  background-color: white;
  border-radius: 5px;
}
</style>