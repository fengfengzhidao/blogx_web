<script setup lang="ts">
import {IconClose} from "@arco-design/web-vue/es/icon";
import {useRoute} from "vue-router";
import router from "@/router";
import {ref, watch} from "vue";
import {Swiper, SwiperSlide} from 'swiper/vue';
import {onMounted} from "vue";

const route = useRoute()

interface TabType {
  name: string
  title: string
}

const tabs = ref<TabType[]>([
  {title: "首页很好", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
  {title: "首页", name: "home"},
])

function check(item: TabType) {
  router.push({
    name: item.name,
  })
  saveTabs()
}

function saveTabs() {
  localStorage.setItem("f_tabs", JSON.stringify(tabs.value))
}

function removeItem(item: TabType) {
  if (item.name === "home") {
    return
  }
  const index = tabs.value.findIndex((value) => item.name === value.name)
  if (index !== -1) {
    // 判断我删除的这个元素，是不是就是我当前所在
    if (item.name === route.name) {
      // 因为首页那个item是100%不会被删除的，所以放心往前走
      router.push({
        name: tabs.value[index - 1].name
      })
    }
    tabs.value.splice(index, 1)
  }
  saveTabs()
}

function removeAllItem() {
  tabs.value = [{title: "首页", name: "home"}]
  router.push({name: "home"})
  saveTabs()
}


function loadTabs() {
  const f_tabs = localStorage.getItem("f_tabs")
  if (f_tabs) {
    try {
      tabs.value = JSON.parse(f_tabs)
    } catch (e) {
      console.log(e)
    }
  }
}

// loadTabs()


watch(() => route.name, () => {
  // 判断当前路由的名称，在不在tabs里面，如果不在就加入进去
  const index = tabs.value.findIndex((value) => route.name === value.name)
  if (index === -1) {
    tabs.value.push({
      name: route.name as string,
      title: route.meta.title,
    })
  }
}, {immediate: true})

const slidesCount = ref(100)
onMounted(() => {
  // 显示的总宽度
  const swiperDom = document.querySelector(".f_tabs_swiper") as HTMLDivElement
  const swiperWidth = swiperDom.clientWidth

  // 实际的总宽度
  const wrapperDom = document.querySelector(".f_tabs_swiper .swiper-wrapper") as HTMLDivElement
  const wrapperWidth = wrapperDom.scrollWidth

  if (swiperWidth > wrapperWidth){
    return
  }
  // 如果实际总宽度大于了显示的总宽度
  // 遍历swiper-slide，然后从前往后加
  const slideList = document.querySelectorAll(".f_tabs_swiper .swiper-slide")
  let allWith = 0
  let index = 1

  for (const slideListElement of slideList) {
    allWith += (slideListElement.clientWidth + 20)
    index ++
    if (allWith >= swiperWidth){
      break
    }
  }
  slidesCount.value = index
})

</script>

<template>
  <div class="f_tabs">
    <swiper class="f_tabs_swiper" :slides-per-view="slidesCount">
      <swiper-slide v-for="item in tabs">
        <div class="item" @click="check(item)" @mousedown.middle.stop="removeItem(item)"
             :class="{active: route.name === item.name}">
          {{ item.title }}
          <span class="close" @click.stop="removeItem(item)" title="删除" v-if="item.name !== 'home'">
          <IconClose></IconClose>
        </span>
        </div>
      </swiper-slide>
    </swiper>
    <div class="item" @click="removeAllItem">
      删除全部
    </div>
  </div>
</template>

<style lang="less">
.f_tabs {
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;

  .swiper {
    width: calc(100% - 100px);
    display: flex;
    overflow-y: hidden;
    overflow-x: hidden;

    .swiper-wrapper {
      display: flex;
      align-items: center;

      .swiper-slide {
        width: fit-content !important;
        flex-shrink: 0;
      }
    }

  }

  .item {
    padding: 3px 8px;
    background-color: var(--color-bg-1);
    border: @f_border;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 5px;
    flex-shrink: 0;

    &:hover {
      background-color: var(--color-fill-1);
    }

    &.active {
      background-color: @primary-6;
      color: white;
    }
  }
}
</style>