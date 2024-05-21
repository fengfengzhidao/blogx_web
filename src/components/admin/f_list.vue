<script setup lang="ts">
const columns = [
  {title: "ID", dataIndex: 'id'}
]
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
          <a-table :columns="columns"></a-table>
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
    .f_list_page{
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
  }
}
</style>