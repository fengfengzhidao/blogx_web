<script setup lang="ts">
import {type fansListRequest, focusListApi, type userListType} from "@/api/focus_api";
import {reactive} from "vue";
import type {listResponse} from "@/api";
import {useRoute} from "vue-router";
import router from "@/router";
import {userStorei} from "@/stores/user_store";
import {Message} from "@arco-design/web-vue";

const store = userStorei()
const route = useRoute()
const data = reactive<listResponse<userListType>>({
  list: [],
  count: 0
})
const params = reactive<fansListRequest>({
  userID: Number(route.params.id),
  isMe: false,
  limit: 10,
  page: 1
})

async function getData() {
  params.isMe = store.userInfo.userID == Number(route.params.id)
  const res = await focusListApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.count = res.data.count
}

getData()


</script>

<template>
  <div class="focus_list_view">
    <div class="user_list">
      <div class="item" v-for="item in data.list">
        <a-avatar :size="60" :image-url="item.userAvatar">{{ item.userNickname[0] }}</a-avatar>
        <div class="info">
          <div class="nick">{{ item.userNickname }}</div>
          <div class="abs">
            <a-typography-text :ellipsis="{rows: 1, css: true}">{{ item.userAbstract }}</a-typography-text>
          </div>
          <div class="action">
            <a-button type="outline" size="mini">关注</a-button>
          </div>
        </div>
      </div>
    </div>
    <div class="no_data" v-if="data.list.length === 0">
      <a-empty></a-empty>
    </div>
    <div class="page" v-if="data.list.length">
      <a-pagination :page-size="params.limit" v-model:current="params.page" :total="data.count" show-total
                    @change="getData"></a-pagination>
    </div>
  </div>
</template>

<style lang="less">
.focus_list_view {
  padding: 20px;

  .user_list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    width: 100%;


    .item {
      width: 100%;
      display: flex;

      .arco-avatar-circle {
        flex-shrink: 0;
      }

      .info {
        margin-left: 10px;

        .abs {
          height: 1.5rem;
        }
      }

    }

  }
  .page{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

}
</style>