<script setup lang="ts">
import {userStorei} from "@/stores/user_store";
import {userCenterStorei} from "@/stores/user_center_store";
import {IconCamera} from "@arco-design/web-vue/es/icon";

const store = userStorei()
const userCenterStore = userCenterStorei()
import {IconEdit} from "@arco-design/web-vue/es/icon";
import {dateTimeFormat} from "../../../utils/date";
import F_label from "@/components/common/f_label.vue";
import {registerSourceOptions} from "@/options/options";
import {nextTick, ref} from "vue";
import F_edit_input from "@/components/common/input/f_edit_input.vue";
import {userDetailUpdateApi, type userDetailUpdateRequest} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import F_avatar_cutter from "@/components/web/f_avatar_cutter.vue";

async function userUpdateColumn(column: "username" | "nickname" | "avatar" | "abstract", value: string) {
  const data: userDetailUpdateRequest = {}
  data[column] = value
  console.log(column, value)

  const res = await userDetailUpdateApi(data)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  userCenterStore.getUserDetail()

}

</script>

<template>
  <div class="user_center_info_view">
    <div class="top">
      <div class="avatar">
        <div class="avatar_inner">
          <f_avatar_cutter v-if="userCenterStore.userDetail.registerSource !== 2" @ok="userUpdateColumn('avatar', $event)">
            <div class="camera_bg" title="头像上传">
              <IconCamera></IconCamera>
            </div>
          </f_avatar_cutter>
          <a-avatar :image-url="userCenterStore.userDetail.avatar" :size="60"></a-avatar>
        </div>
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
        <a-form :model="userCenterStore.userDetail" :label-col-props="{span: 2}" label-align="left"
                :wrapper-col-props="{span: 22}">
          <a-form-item label="用户昵称">
            <f_edit_input placeholder="用户昵称" :no-edit="userCenterStore.userDetail.registerSource === 2"
                          @ok="userUpdateColumn('nickname', $event)"
                          :value="userCenterStore.userDetail.nickname"></f_edit_input>
          </a-form-item>
          <a-form-item label="用户名">
            {{ userCenterStore.userDetail.username }}
            <template #help>登录的唯一标识，30天内可修改一次</template>
          </a-form-item>
          <a-form-item label="简介">
            <f_edit_input placeholder="用户简介"
                          type="textarea" @ok="userUpdateColumn('abstract', $event)"
                          :value="userCenterStore.userDetail.abstract"></f_edit_input>
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

      .avatar_inner {
        position: relative;
        width: 60px;

        .camera_bg {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          transition: all .3s;
          cursor: pointer;

          svg {
            color: white;
            font-size: 20px;
          }
        }

        &:hover {
          .camera_bg {
            opacity: 1;
          }
        }
      }
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