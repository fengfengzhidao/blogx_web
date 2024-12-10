<script setup lang="ts">
import {
  fansListApi,
  type fansListRequest,
  focusListApi,
  focusUserApi,
  focusUserRemoveApi,
  type userListType
} from "@/api/focus_api";
import {reactive, watch} from "vue";
import type {listResponse} from "@/api";
import {userStorei} from "@/stores/user_store";
import {Message} from "@arco-design/web-vue";
import F_label from "@/components/common/f_label.vue";
import {relationOptions} from "@/options/options";
import type {baseResponse} from "@/api";
import router from "@/router";
import {useRoute} from "vue-router";
import {goUser} from "@/utils/go_router";

const route = useRoute()

interface Props {
  userId: number
  type: "focus" | "fans"
}

const props = defineProps<Props>()

const store = userStorei()
const data = reactive<listResponse<userListType>>({
  list: [],
  count: 0
})
const params = reactive<fansListRequest>({
  userID: props.userId,
  isMe: false,
  limit: 10,
  page: 1
})

async function getData() {
  params.isMe = store.userInfo.userID == props.userId
  let res: baseResponse<listResponse<userListType>>
  if (props.type === "focus") {
    res = await focusListApi(params)
  } else {
    res = await fansListApi(params)
  }
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.count = res.data.count
}

async function focus(userID: number, isFocus: boolean) {
  let res: baseResponse<string>
  if (isFocus) {
    res = await focusUserApi({focusUserID: userID})
  } else {
    res = await focusUserRemoveApi({focusUserID: userID})
  }
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getData()
}


getData()

watch(() => route.query.key, ()=>{
  if (route.query.key !== undefined){
    params.key = route.query.key as string
    getData()
  }
})


</script>

<template>
  <div class="f_focus_list_com">
    <div class="user_list">
      <div class="item" v-for="item in data.list">
        <a-avatar @click="goUser(item.userID)" :size="60" :image-url="item.userAvatar">{{ item.userNickname[0] }}</a-avatar>
        <div class="info">
          <div class="nick">
            <span @click="goUser(item.userID)" class="nickname">{{ item.userNickname }}</span>
            <f_label v-if="item.relationship !== 1" :options="relationOptions" :value="item.relationship"></f_label>
          </div>
          <div class="abs">
            <a-typography-text :ellipsis="{rows: 1, css: true}">{{ item.userAbstract }}</a-typography-text>
          </div>
          <div class="action">
            <a-button v-if="item.relationship === 2 || item.relationship === 4" type="primary" size="mini"
                      @click="focus(item.userID, false)">已关注
            </a-button>
            <a-button v-else type="outline" size="mini" @click="focus(item.userID, true)">关注</a-button>
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
.f_focus_list_com {
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

        .nick {
          height: 1.5rem;
          display: flex;
          align-items: center;

          .nickname{
            cursor: pointer;
          }
        }

        .arco-tag {
          margin-left: 10px;
          transform: scale(0.9);
        }

        .abs {
          height: 1.5rem;
        }
      }

    }

  }

  .page {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

}
</style>