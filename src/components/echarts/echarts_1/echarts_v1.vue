<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts';
import type {EChartsType} from "echarts";

interface Props {
  class: string
  countList: number[]
  dateList: number[]
}

const props = defineProps<Props>()

const chart = ref<EChartsType>()

watch(()=>props.dateList, ()=>{
  const option = {
    xAxis: {
      type: 'category',
      data: props.dateList,
      show: false
    },
    grid: {
      left: 0,
      right: 0,
      top: 20,
      bottom: 20,
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
        data: props.countList,
        type: 'line',
        smooth: true,
      }
    ],
  };
  chart.value?.setOption(option);
})

onMounted(() => {
  let chartDom = document.querySelector("."+props.class);
  if (chartDom) {
    chart.value = echarts.init(chartDom);
    return
  }


})
</script>

<template>
  <div class="echarts_v1" :class="props.class"></div>
</template>

<style lang="less">
.echarts_v1 {
  width: 100%;
  height: 100%;
}
</style>