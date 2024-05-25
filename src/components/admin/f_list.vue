<script setup lang="ts">
import type {baseResponse, listResponse, optionsFunc, optionsType, paramsType} from "@/api";
import {reactive, ref} from "vue";
import {Message, type TableColumnData, type TableData, type TableRowSelection} from "@arco-design/web-vue";
import {dateTemFormat, type dateTemType} from "@/utils/date";
import {defaultDeleteApi, defaultPostApi, defaultPutApi} from "@/api";
import type {emitFnType, formListType} from "@/components/admin/f_modal_form.vue";
import F_modal_form from "@/components/admin/f_modal_form.vue";

export interface columnType extends TableColumnData {
  dateFormat?: dateTemType
}

export interface actionGroupType {
  label: string
  value?: number
  callback: (keyList: number[]) => void
}

export interface filterGroupType {
  label: string
  source: optionsType[] | optionsFunc
  options?: optionsType[]
  column?: string
  params?: paramsType
  callback?: (value: number | string) => void
  width?: number
}


interface Props {
  url: (params?: paramsType) => Promise<baseResponse<listResponse<any>>>
  columns: columnType[]
  rowKey?: string
  noDefaultDelete?: boolean // 不启用默认删除
  noAdd?: boolean
  noEdit?: boolean
  noDelete?: boolean
  noBatchDelete?: boolean // 是否没有批量删除
  searchPlaceholder?: string
  addLabel?: string
  editLabel?: string
  deleteLabel?: string
  noActionGroup?: boolean
  noCheck?: boolean
  actionGroup?: actionGroupType[]
  filterGroup?: filterGroupType[]
  noPage?: boolean
  limit?: number
  formList?: formListType[]
  addFormLabel?: string
  editFormLabel?: string
}

const props = defineProps<Props>()

const {
  rowKey = "id",
  noDefaultDelete = false,
  searchPlaceholder = "搜索",
  addLabel = "添加",
  editLabel = "编辑",
  deleteLabel = "删除",
  limit = 10,
} = props
const actionGroupOptions = ref<actionGroupType[]>([])


function initActionGroup() {
  let index = 0
  if (!props.noBatchDelete) {
    actionGroupOptions.value.push({
      label: "批量删除",
      value: 1,
      callback: (keyList: number[]) => {
        baseDelete(keyList)
        selectedKeys.value = []
      }
    })
    index = 1
  }
  index++
  const actionGroup = props.actionGroup || []
  for (const action of actionGroup) {
    actionGroupOptions.value.push({
      label: action.label,
      value: index,
      callback: action.callback,
    })
  }
}

initActionGroup()


const filterGroups = ref<filterGroupType[]>([])

async function initFilterGroup() {
  filterGroups.value = []
  for (const f of props.filterGroup || []) {
    if (typeof f.source === 'function') {
      const res = await f.source(f.params)
      if (res.code) {
        Message.error(res.msg)
        continue
      }
      f.options = res.data
    } else {
      f.options = f.source
    }
    if (!f.callback) {
      // 如果没有callback，那就走默认行为
      f.callback = (value) => {
        if (f.column) {
          const p: { [key: string]: any } = {}
          p[f.column] = value
          getList(p)
        }
      }
    }

    filterGroups.value.push(f)
  }
}

initFilterGroup()

const loading = ref(false)

const data = reactive<listResponse<any>>({
  list: [],
  count: 0,
})

const params = reactive<paramsType>({
  limit: props.noPage ? -1 : limit,
})

async function getList(newParams?: paramsType) {
  loading.value = true
  if (newParams) {
    Object.assign(params, newParams)
  }
  const res = await props.url(params)
  loading.value = false
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list || []
  data.count = res.data.count
}

getList()
const emits = defineEmits<{
  (e: 'delete', keyList: number[] | string[]): void
  (e: 'add'): void
  (e: 'edit', record: any): void
  (e: "row-click", record: any): void
}>()

async function remove(record: any) {
  const key = record[rowKey]
  baseDelete([key])
}

async function baseDelete(keyList: number[]) {
  if (noDefaultDelete) {
    // 不启用默认删除
    emits("delete", keyList)
    return
  }

  const array = /\"(.*?)\"/.exec(props.url.toString())
  if (array?.length !== 2) {
    return
  }
  const url = array[1]

  const res = await defaultDeleteApi(url, keyList)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  getList()
  Message.success(res.msg)

}

const modalFormRef = ref()

function edit(record: any) {
  if (props.formList?.length) {
    modalFormRef.value.setForm(record)
    visible.value = true
    return
  }
  emits("edit", record)
}

function add() {
  if (props.formList?.length) {
    visible.value = true
    return
  }

  emits("add")
}

function pageChange() {
  getList()
}

function search() {
  getList()
}

function refresh() {
  getList()
  Message.success("刷新成功")
}


const selectedKeys = ref([]);

const rowSelection = reactive<TableRowSelection>({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});
const actionValue = ref()

function actionGroupAction() {
  const action = actionGroupOptions.value.find((value) => value.value === actionValue.value)
  if (action) {
    action.callback(selectedKeys.value)
  }
}

function rowClick(record: TableData, ev: Event) {
  emits("row-click", record)
}


const visible = ref(false)


async function create(form: any, fn?: emitFnType) {
  const array = /\"(.*?)\"/.exec(props.url.toString())
  if (array?.length !== 2) {
    return
  }
  const url = array[1]

  const res = await defaultPostApi(url, form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  getList()
  fn(true)
}

async function update(form: any, fn?: emitFnType) {
  const array = /\"(.*?)\"/.exec(props.url.toString())
  if (array?.length !== 2) {
    return
  }
  const url = array[1]

  const res = await defaultPutApi(url, form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  getList()
  fn(true)
}


defineExpose({
  getList,
  data,
})


</script>

<template>
  <div class="f_list_com">

    <f_modal_form
        ref="modalFormRef"
        @create="create"
        @update="update"
        v-if="props.formList?.length"
        :add-label="props.addFormLabel"
        :edit-label="props.editFormLabel"
        v-model:visible="visible"
        :form-list="props.formList"></f_modal_form>
    <div class="f_list_head">
      <slot name="action_add">
        <div class="action_create" v-if="!noAdd">
          <a-button type="primary" @click="add">{{ addLabel }}</a-button>
        </div>
      </slot>

      <div class="action_group" v-if="!noActionGroup">
        <a-select style="width: 140px;" placeholder="操作" v-model="actionValue"
                  :options="actionGroupOptions"></a-select>
        <a-button type="primary" status="danger" @click="actionGroupAction" v-if="actionValue">执行</a-button>
      </div>
      <div class="action_search">
        <a-input-search :placeholder="searchPlaceholder" v-model="params.key" @search="search"></a-input-search>
      </div>
      <div class="action_filter">

        <a-select v-for="item in filterGroups" :style="{width: item.width + 'px'}" allow-clear
                  @change="item.callback as any" :placeholder="item.label"
                  :options="item.options as optionsType[]"></a-select>
      </div>
      <div class="action_search_slot">
        <slot name="search_other"></slot>
      </div>

      <div class="action_flush" @click="refresh">
        <icon-refresh></icon-refresh>
      </div>
    </div>
    <div class="f_list_body">
      <a-spin :loading="loading" tip="加载中...">
        <div class="f_list_table">
          <a-table @row-click="rowClick" :data="data.list" :row-key="rowKey" v-model:selectedKeys="selectedKeys"
                   :row-selection="props.noCheck ? undefined : rowSelection " :pagination="false">
            <template #columns>
              <template v-for="col in props.columns">
                <a-table-column v-if="col.dataIndex" v-bind="col"></a-table-column>
                <a-table-column v-else-if="col.slotName" v-bind="col">
                  <template #cell="data">
                    <div class="col_actions" v-if="col.slotName === 'action'">
                      <slot v-bind="data" name="action_left"></slot>
                      <a-button v-if="!noEdit" type="primary" @click="edit(data.record)">{{ editLabel }}</a-button>
                      <a-popconfirm v-if="!noDelete" @ok="remove(data.record)" content="确定要删除该记录吗？">
                        <a-button type="primary" status="danger">{{ deleteLabel }}</a-button>
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
        <div class="f_list_page" v-if="!props.noPage">
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

    .action_group {
      display: flex;
      align-items: center;

      button {
        margin-left: 10px;
      }

    }

    .action_filter {
      .arco-select {
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
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