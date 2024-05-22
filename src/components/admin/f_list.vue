<script setup lang="ts">
import type {baseResponse, listResponse, paramsType} from "@/api";
import {reactive} from "vue";
import {Message, type TableColumnData} from "@arco-design/web-vue";



interface Props {
  url: (params?: paramsType) => Promise<baseResponse<listResponse<any>>>
  columns: TableColumnData[]
}

const props = defineProps<Props>()

const data = reactive<listResponse<any>>({
  list: [],
  count: 0,
})

const params = reactive<paramsType>({})

async function getList() {
  const res = await props.url(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list || []
  data.count = res.data.count
  console.log(data)
}

getList()


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
        <a-input placeholder="搜索"></a-input>
      </div>
      <div class="action_search_slot">

      </div>

      <div class="action_flush">
        <icon-refresh></icon-refresh>
      </div>
    </div>
    <div class="f_list_body">
      <a-spin>
        <div class="f_list_table">
          <a-table :data="data.list">
            <template #columns>
              <template v-for="col in props.columns">
                <a-table-column v-if="col.dataIndex" v-bind="col"></a-table-column>
                <a-table-column v-else-if="col.slotName" v-bind="col">
                  <template #cell="{ record }">
                    <slot :name="col.slotName" :record="record"></slot>
                  </template>
                </a-table-column>
              </template>
            </template>
          </a-table>
        </div>
        <div class="f_list_page">
          <a-pagination :total="100"></a-pagination>
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
  }
}
</style>