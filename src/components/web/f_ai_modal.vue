<script setup lang="ts">
import {nextTick, reactive, ref} from "vue";
import {aiSiteInfoApi, type aiSiteInfoType} from "@/api/site_api";
import {Message} from "@arco-design/web-vue";

interface Props {
  visible: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(["update:visible"])
const data = reactive<aiSiteInfoType>({
  enable: false,
  nickname: "",
  avatar: "",
  abstract: "",
})

function cancel() {
  emits("update:visible", false)
}


async function send() {

}

const textareaRef = ref()

async function beforeOpen() {
  const res = await aiSiteInfoApi()
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
  nextTick(() => {
    textareaRef.value.focus()
  })
}

const key = ref("")

</script>

<template>
  <a-modal @before-open="beforeOpen" :footer="false" modal-class="f_ai_modal"
           :visible="props.visible" @cancel="cancel">
    <div class="body scrollbar">
      <div class="item ai">
        <a-avatar :image-url="data.avatar"></a-avatar>
        <div class="chat">
          {{ data.abstract }}
        </div>
      </div>
    </div>
    <div class="menu">
      <a-textarea ref="textareaRef" :auto-size="{minRows: 4, maxRows: 4}" v-model="key" @keydown.enter="send" placeholder="请输入你感兴趣的内容"></a-textarea>
      <div class="info">
        <span>按Enter发送，按Ctrl+Enter换行</span>
        <a-button @click="send" type="primary">发送</a-button>
      </div>
    </div>
  </a-modal>
</template>

<style lang="less">
.f_ai_modal {
  .arco-modal-header {
    display: none;
  }

  .arco-modal-body {
    padding: 0;
  }

  .body {
    min-height: 40vh;
    max-height: 60vh;
    overflow-y: auto;
    padding: 20px;

    .item {
      display: flex;

      .arco-avatar {
        flex-shrink: 0;
        margin-right: 10px;
      }

      .chat {
        background-color: var(--color-fill-2);
        padding: 10px;
        border-radius: 5px;
        color: var(--color-text-1);
      }
    }
  }

  .menu {
    padding: 10px 20px;
    border-top: @f_border;
    position: relative;

    .info {
      position: absolute;
      right: 30px;
      bottom: 25px;
      z-index: 2;
      >span{
        font-size: 12px;
        margin-right: 10px;
        color: var(--color-text-2);
      }
    }
  }
}
</style>