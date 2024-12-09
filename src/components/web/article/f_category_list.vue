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

const route = useRoute()

interface Props {
  userId: number
}

const props = defineProps<Props>()

const categoryData = reactive<listResponse<categoryListType>>({
  list: [],
  count: 0
})

async function getCategoryData() {
  const res = await categoryListApi({
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

const form = reactive<categoryCreateRequest>({
  id: 0,
  title: ""
})
const visible = ref(false)

function addCategory() {
  form.id = 0
  form.title = ""
  visible.value = true
}

function showEdit(item: categoryListType) {
  form.id = item.id
  form.title = item.title
  visible.value = true
}

async function addCategoryHandler() {
  if (form.title.trim() === "") {
    Message.warning("请输入分类名称")
    return
  }
  let res: baseResponse<string>
  res = await categoryCreateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getCategoryData()
}

async function remove(item: categoryListType) {
  const res = await categoryRemoveApi([item.id])
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getCategoryData()
}
getCategoryData()
</script>

<template>
  <div class="f_category_list_com">
    <div class="add">
      <a-button long type="outline" @click="addCategory">
        <template #icon>
          <icon-plus></icon-plus>
        </template>
        创建
      </a-button>
    </div>
    <a-modal width="30%" :title="form.id ? '编辑分类' : '创建分类'" v-model:visible="visible"
             :on-before-ok="addCategoryHandler">
      <a-input placeholder="分类名称" v-model="form.title"></a-input>
    </a-modal>
    <div class="list">
      <div class="item" :class="{active: item.id===Number(route.query.categoryID)}" v-for="item in categoryData.list">
        <a-trigger content-class="category_trigger" trigger="contextMenu" align-point>
          <router-link :to="{name: 'userArticle', params: {id:  props.userId}, query: {categoryID: item.id}}">
            <span>
              <a-typography-text :ellipsis="{css: true, rows: 1}">{{ item.title }}</a-typography-text>
            </span>
            <span>{{ item.articleCount }}</span>
          </router-link>
          <template #content>
            <div class="item" @click="showEdit(item)">编辑</div>
            <div class="item delete" @click="remove(item)">删除</div>
          </template>
        </a-trigger>

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

        span:nth-child(1){
          width: 5rem;
        }
      }
    }

    .item.active {
      a {
        color: rgb(var(--arcoblue-6));
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