<script setup lang="ts">
import {onMounted} from "vue";
import * as echarts from 'echarts';

onMounted(() => {
  let chartDom = document.getElementById('main');
  let myChart = echarts.init(chartDom);
  let option;

  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: false
    },
    grid:{
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false,
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
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      }
    ]
  };

  option && myChart.setOption(option);

})
</script>

<template>
  <div id="main" style="width: 400px; height: 300px"></div>
</template>

<style lang="less">

</style>