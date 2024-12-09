<script setup lang="ts">
import {reactive, ref} from "vue";
import type {listResponse, baseResponse} from "@/api";
import {
  categoryCreateApi,
  type categoryCreateRequest,
  categoryListApi,
  type categoryListType, categoryRemoveApi
} from "@/api/category_api";
import {Message} from "@arco-design/web-vue";
import {useRoute} from "vue-router";
import F_a from "@/components/common/f_a.vue";
import router from "@/router";

import {type collectListType, collectListApi} from "@/api/collect_api";
import {type collectCreateRequest, collectRemoveApi, collectCreateApi} from "@/api/collect_api";

const route = useRoute()

interface Props {
  userId: number
  isMe: boolean
}

const props = defineProps<Props>()

const categoryData = reactive<listResponse<collectListType>>({
  list: [],
  count: 0
})

async function getCollectData() {
  const res = await collectListApi({
    userID: props.userId,
    type: 2,
  })
  if (res.code) {
    Message.error(res.msg)
    return
  }
  categoryData.list = res.data.list
  categoryData.count = res.data.count
}

const form = reactive<collectCreateRequest>({
  id: 0,
  title: "",
  abstract: "",
})
const visible = ref(false)

function addCategory() {
  form.id = 0
  form.title = ""
  form.abstract = ""
  visible.value = true
}

function showEdit(item: collectListType) {
  form.id = item.id
  form.title = item.title
  form.abstract = item.abstract
  visible.value = true
}

const formRef = ref()

async function addCategoryHandler() {
  const val = await formRef.value.validate()
  if (val) return
  let res: baseResponse<string>
  res = await collectCreateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getCollectData()
}

async function remove(item: collectListType) {
  const res = await collectRemoveApi([item.id])
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getCollectData()
}

function go(item: categoryListType) {

  // 判断现在是不是已经点了它
  const collectID = Number(route.query.collectID)
  let _id: number | undefined = item.id
  if (collectID === item.id) {
    _id = undefined
  }

  router.push({
    name: route.name as string,
    query: {
      ...route.query,
      collectID: _id,
    },
    params: route.params
  })
}

getCollectData()
</script>

<template>
  <div class="f_category_list_com">
    <div class="add" v-if="props.isMe">
      <a-button long type="outline" @click="addCategory">
        <template #icon>
          <icon-plus></icon-plus>
        </template>
        创建
      </a-button>
    </div>
    <a-modal v-if="props.isMe" width="30%" :title="form.id ? '编辑收藏夹' : '创建收藏夹'" v-model:visible="visible"
             :on-before-ok="addCategoryHandler">
      <a-form ref="formRef" :model="form" :label-col-props="{span: 7}" :wrapper-col-props="{span: 17}">
        <a-form-item label="收藏夹标题" field="title" :validate-trigger="'blur'"
                     :rules="[{required: true, message:'请输入收藏夹标题'}]">
          <a-input placeholder="收藏夹标题" v-model="form.title"></a-input>
        </a-form-item>
        <a-form-item label="收藏夹简介">
          <a-textarea placeholder="收藏夹简介" :auto-size="{minRows: 2, maxRows: 4}"
                      v-model="form.abstract"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
    <div class="list">
      <div class="item" :class="{active: item.id===Number(route.query.collectID)}" v-for="item in categoryData.list">
        <a-trigger v-if="props.isMe" content-class="category_trigger" trigger="contextMenu" align-point>
          <f_a @click="go(item)">
            <span>
              <a-typography-text :ellipsis="{css: true, rows: 1}">{{ item.title }}</a-typography-text>
            </span>
            <span>{{ item.articleCount }}</span>
          </f_a>
          <template #content>
            <div class="item" @click="showEdit(item)">编辑</div>
            <div class="item delete" @click="remove(item)">删除</div>
          </template>
        </a-trigger>
        <f_a v-else @click="go(item)">
            <span>
              <a-typography-text :ellipsis="{css: true, rows: 1}">{{ item.title }}</a-typography-text>
            </span>
          <span>{{ item.articleCount }}</span>
        </f_a>

      </div>
    </div>
  </div>
</template>

<style lang="less">
.f_category_list_com {
  width: 100%;
  border-right: @f_border;
  padding: 10px;

  .arco-btn {
    border-radius: 100px;
  }

  .list {
    margin-top: 10px;

    .item {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;

      &:hover {
        background: var(--color-fill-1);
      }

      a {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: var(--color-text-2);

        span:nth-child(1) {
          width: 5rem;
        }
      }
    }

    .item.active {
      a {
        color: rgb(var(--arcoblue-6));

        span {
          color: rgb(var(--arcoblue-6));
        }
      }
    }
  }
}

.category_trigger {
  background: var(--color-bg-1);
  border-radius: 5px;
  border: @f_border;
  padding: 5px 0;

  .item {
    padding: 10px 20px;
    cursor: pointer;


    &:hover {
      background: var(--color-fill-1)
    }
  }

  .delete {
    color: red;
  }
}
</style>