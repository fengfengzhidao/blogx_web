<script setup lang="ts">

import F_card from "@/components/common/f_card.vue";
</script>

<template>
  <div class="home_view">
    <div class="welcome">
      <div class="title">早安 枫枫，请开始一天的工作吧</div>
      <div class="weather">
        湖南 · 长沙市 今日 多云，33℃，天气较热，多在阴凉出休息
      </div>
      <div class="statistics">
        <a-statistic title="在线流量" :value="25112" show-group-separator/>
        <a-statistic title="消息总数" :value="124" show-group-separator/>
        <a-statistic title="用户总数" :value="567" show-group-separator/>
        <a-statistic title="文章总数" :value="564" show-group-separator/>
        <a-statistic title="今日登陆" :value="73" show-group-separator/>
        <a-statistic title="今日注册" :value="67" show-group-separator/>
      </div>
      <div class="extra">
        欢迎使用FengfengAdmin后台系统，可查看 <a href="">系统帮助</a> 以便更好的使用本系统
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <f_card title="快捷入口" class="quick_room">

        </f_card>
        <f_card title="数据统计" class="statistics">

        </f_card>
      </div>
      <div class="right">
        <f_card title="更新日志" class="version">

        </f_card>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.home_view {
  background-color: inherit !important;

  .welcome {
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

    .extra{
      margin-top: 20px;
      a{
        text-decoration: none;
        color: @primary-6;
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;

    .left {
      width: 70%;

      .statistics {
        margin-top: 20px;
      }
    }

    .right {
      width: 30%;
      margin-left: 20px;
    }
  }
}
</style>