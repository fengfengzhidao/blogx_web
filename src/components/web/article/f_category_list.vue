<script setup lang="ts">
import {reactive, ref} from "vue";
import type {listResponse} from "@/api";
import {
  categoryCreateApi,
  type categoryCreateRequest,
  categoryListApi,
  type categoryListType
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
  title: ""
})
const visible = ref(false)

function addCategory() {
  visible.value = true
}

async function addCategoryHandler() {
  if (form.title.trim() === "") {
    Message.warning("请输入分类名称")
    return
  }
  const res = await categoryCreateApi(form)
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
    <a-modal width="30%" title="创建分类" v-model:visible="visible" :on-before-ok="addCategoryHandler">
      <a-input placeholder="分类名称" v-model="form.title"></a-input>
    </a-modal>
    <div class="list">
      <div class="item" :class="{active: item.id===Number(route.query.categoryID)}" v-for="item in categoryData.list">
        <router-link :to="{name: 'userArticle', params: {id:  props.userId}, query: {categoryID: item.id}}">
          <span>{{ item.title }}</span>
          <span>{{ item.articleCount }}</span>
        </router-link>
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
        display: flex;
        justify-content: space-around;
        color: var(--color-text-2);
      }
    }

    .item.active {
      a {
        color: rgb(var(--arcoblue-6));
      }
    }
  }
}
</style>