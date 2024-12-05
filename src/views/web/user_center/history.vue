<script setup lang="ts">

import F_card from "@/components/web/f_card.vue";
import F_user from "@/components/common/f_user.vue";
</script>

<template>
  <div class="user_center_history_view">
    <f_card title="足迹">
      <a-timeline>
        <a-timeline-item lineType="dashed">
          今日
          <template #label>
            <div class="article_list">
              <div class="item" v-for="item in 6">
                <div class="cover">
                  <img src="http://image.fengfengzhidao.com/gvb_1009/20231019173356__wallhaven-kxj3l1.jpg" alt="">
                </div>
                <div class="info">
                  <div class="title">文章名称</div>
                  <div class="user">
                    <f_user :size="30" nickname="xxx"
                            avatar="http://thirdqq.qlogo.cn/ek_qqapp/AQO1J0yjVaGJA3gc2NhYXG2kdGHibjf0r2EEcAS2dE1EyXIBqmGiaJeFiaciaqKGmnCxQ1ekLK7CVm6rZYbu098RyuLKv10qm39DxiaCbowL2Ptrr7XVKBtw/0"></f_user>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </a-timeline-item>
        <a-timeline-item lineType="dashed">
          今日
          <template #label>
            <div class="article_list">
              <div class="item" v-for="item in 6">
                <div class="cover">
                  <img src="http://image.fengfengzhidao.com/gvb_1009/20231019173356__wallhaven-kxj3l1.jpg" alt="">
                </div>
                <div class="info">
                  <div class="title">文章名称</div>
                  <div class="user">
                    <f_user :size="30" nickname="xxx"
                            avatar="http://thirdqq.qlogo.cn/ek_qqapp/AQO1J0yjVaGJA3gc2NhYXG2kdGHibjf0r2EEcAS2dE1EyXIBqmGiaJeFiaciaqKGmnCxQ1ekLK7CVm6rZYbu098RyuLKv10qm39DxiaCbowL2Ptrr7XVKBtw/0"></f_user>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </a-timeline-item>
      </a-timeline>
    </f_card>
  </div>
</template>

<style lang="less">
.user_center_history_view {
  .article_list {
    .item {
      height: 60px;
      margin-bottom: 20px;
      display: flex;

      .cover {
        img {
          width: 80px;
          border-radius: 5px;
          height: 100%;
          object-fit: cover;
          margin-right: 10px;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          font-size: 15px;
          font-weight: 600;
          color: var(--color-text-1);
        }

        .f_user_com {
          color: var(--color-text-2);

          .text {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>