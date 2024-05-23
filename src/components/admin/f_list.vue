<script setup lang="ts">
import type {baseResponse, listResponse, paramsType} from "@/api";
import {reactive, ref} from "vue";
import {Message, type TableColumnData} from "@arco-design/web-vue";
import {dateTemFormat, type dateTemType} from "@/utils/date";
import {defaultDeleteApi} from "@/api";

export interface columnType extends TableColumnData {
  dateFormat?: dateTemType
}

interface Props {
  url: (params?: paramsType) => Promise<baseResponse<listResponse<any>>>
  columns: columnType[]
  rowKey?: string
  noDefaultDelete?: boolean // 不启用默认删除
}

const props = defineProps<Props>()

const {
  rowKey = "id",
  noDefaultDelete = false,
} = props

const loading = ref(false)

const data = reactive<listResponse<any>>({
  list: [],
  count: 0,
})

const params = reactive<paramsType>({
  limit: 10,
})

async function getList() {
  loading.value = true
  const res = await props.url(params)
  loading.value = false
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list || []
  data.count = res.data.count
  console.log(data)
}

getList()
const emits = defineEmits<{
  (e: 'delete', keyList: number[] | string[]): void
}>()

async function remove(record: any) {
  const key = record[rowKey]
  if (noDefaultDelete) {
    // 不启用默认删除
    emits("delete", [key])
    return
  }

  const array = /\"(.*?)\"/.exec(props.url.toString())
  if (array?.length !== 2) {
    return
  }
  const url = array[1]

  const res = await defaultDeleteApi(url, [key])
  if (res.code) {
    Message.error(res.msg)
    return
  }
  getList()
  Message.success(res.msg)
}

function update(record: any) {

}


function pageChange() {
  getList()
}

function search() {
  getList()
}


</script>

<template>
  <div class="f_list_com">
    <div class="f_list_head">
      <div class="action_create">
        <a-button type="primary">创建</a-button>
      </div>
      <div class="action_group">
        <a-select placeholder="操作"></a-select>
      </div>
      <div class="action_search">
        <a-input-search placeholder="搜索" v-model="params.key" @search="search"></a-input-search>
      </div>
      <div class="action_search_slot">

      </div>

      <div class="action_flush">
        <icon-refresh></icon-refresh>
      </div>
    </div>
    <div class="f_list_body">
      <a-spin :loading="loading" tip="加载中...">
        <div class="f_list_table">
          <a-table :data="data.list" :pagination="false">
            <template #columns>
              <template v-for="col in props.columns">
                <a-table-column v-if="col.dataIndex" v-bind="col"></a-table-column>
                <a-table-column v-else-if="col.slotName" v-bind="col">
                  <template #cell="data">
                    <div class="col_actions" v-if="col.slotName === 'action'">
                      <slot v-bind="data" name="action_left"></slot>
                      <a-button type="primary" @click="update(data.record)">编辑</a-button>
                      <a-popconfirm @ok="remove(data.record)" content="确定要删除该记录吗？">
                        <a-button type="primary" status="danger">删除</a-button>
                      </a-popconfirm>
                      <slot v-bind="data" name="action_right"></slot>
                    </div>
                    <div v-if="col.slotName === 'created_at'">
                      {{ dateTemFormat(data.record[col.slotName], col.dateFormat) }}
                    </div>
                    <slot v-else :name="col.slotName" v-bind="data"></slot>
                  </template>
                </a-table-column>
              </template>
            </template>
          </a-table>
        </div>
        <div class="f_list_page">
          <a-pagination show-total @change="pageChange" :total="data.count" v-model:current="params.page"
                        :page-size="params.limit"></a-pagination>
        </div>

      </a-spin>
    </div>
  </div>
</template>

<style lang="less">
.f_list_com {
  .f_list_head {
    padding: 20px 20px 10px 20px;
    border-bottom: @f_border;
    display: flex;
    align-items: center;
    position: relative;

    .action_create, .action_group, .action_search, .action_search_slot {
      margin-right: 10px;
    }

    .action_flush {
      position: absolute;
      right: 20px;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--color-fill-2);
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .f_list_body {
    padding: 10px 20px 20px 20px;

    > .arco-spin {
      width: 100%;
    }

    .f_list_page {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }

    .col_actions {
      button {
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>