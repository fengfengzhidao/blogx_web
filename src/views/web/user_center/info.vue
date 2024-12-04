<script setup lang="ts">
import {userStorei} from "@/stores/user_store";
import {userCenterStorei} from "@/stores/user_center_store";

const store = userStorei()
const userCenterStore = userCenterStorei()
import {IconEdit} from "@arco-design/web-vue/es/icon";
import {dateTimeFormat} from "../../../utils/date";
import F_label from "@/components/common/f_label.vue";
import {registerSourceOptions} from "@/options/options";
import {nextTick, ref} from "vue";


const showEdit = ref(false)
const inputRef = ref()
function editClick() {
  showEdit.value = true
  nextTick(()=>{
   inputRef.value.focus()
  })
}
function inputBlur(){
  showEdit.value = false
}

function inputChange(val: string){
  console.log(val)
}


</script>

<template>
  <div class="user_center_info_view">
    <div class="top">
      <div class="avatar">
        <a-avatar :image-url="userCenterStore.userDetail.avatar" :size="60"></a-avatar>
      </div>
      <div class="info">
        <div class="title">{{ userCenterStore.userDetail.nickname }}</div>
        <div class="code_age">
          <a-tag>码龄{{ userCenterStore.userDetail.codeAge }}年</a-tag>
        </div>
      </div>
    </div>
    <div class="base_info">
      <div class="head">基本信息</div>
      <div class="body">
        <a-form :label-col-props="{span: 2}" label-align="left" :wrapper-col-props="{span: 22}">
          <a-form-item label="用户昵称">

            <span v-if="!showEdit">{{ userCenterStore.userDetail.nickname }}</span>
            <a-input @change="inputChange" @blur="inputBlur" ref="inputRef" v-else v-model="userCenterStore.userDetail.nickname" placeholder="用户昵称"></a-input>

            <a class="edit" @click="editClick" href="javascript:void 0">
            <IconEdit></IconEdit>
            编辑</a></a-form-item>
          <a-form-item label="用户名">
            {{ userCenterStore.userDetail.username }}
            <template #help>登录的唯一标识，30天内可修改一次</template>
          </a-form-item>
          <a-form-item label="简介">
            <span>{{ userCenterStore.userDetail.abstract }}</span>
            <a class="edit" href="javascript:void 0">
              <IconEdit></IconEdit>
              编辑</a>

          </a-form-item>
          <a-form-item label="注册时间">{{ dateTimeFormat(userCenterStore.userDetail.createdAt) }}</a-form-item>
          <a-form-item label="注册来源">
            <f_label :options="registerSourceOptions" :value="userCenterStore.userDetail.registerSource"></f_label>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="tags">
      <div class="head">
        <div class="title">兴趣标签</div>
        <div class="abs">请您选择感兴趣的技术领域，BlogX会根据您的标签帮您找到 更适合您的内容</div>
      </div>
      <div class="body">
        <a-tag>后端开发</a-tag>
        <a-tag>前端开发</a-tag>
        <a-tag>django</a-tag>
        <a-tag>gorm</a-tag>
        <a-tag>mysql</a-tag>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.user_center_info_view {
  > div {
    background: var(--color-bg-1);
    border-radius: 5px;
  }

  .top {
    margin-bottom: 20px;
    display: flex;
    padding: 20px;
    align-items: center;

    .avatar {
      width: 80px;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        font-size: 18px;
        color: var(--color-text-1);
        margin-bottom: 10px;
      }
    }
  }

  .base_info {
    margin-bottom: 20px;

    .head {
      padding: 20px 20px 10px 20px;
      border-bottom: @f_border;
      font-weight: 600;
      color: var(--color-text-1);
      font-size: 16px;
    }

    .body {
      padding: 10px 20px 20px 20px;

      color: var(--color-text-2);

      .arco-form {
        .edit {
          margin-left: 5px;
        }
        .arco-input-wrapper{
          width: fit-content;
        }
      }
    }
  }

  .tags {
    .head {
      padding: 20px 20px 10px 20px;
      border-bottom: @f_border;
      display: flex;
      align-items: center;

      .title {
        font-weight: 600;
        color: var(--color-text-1);
        font-size: 16px;
      }

      .abs {
        margin-left: 10px;
        color: var(--color-text-2);
      }
    }

    .body {
      padding: 10px 20px 20px 20px;

      span {
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>