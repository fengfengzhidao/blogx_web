<script setup lang="ts">
import {ref} from 'vue';
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import F_card from "@/components/web/f_card.vue";
import {reactive} from "vue";
import {articleAddApi, type articleAddType, articleTagOptionsApi} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";
import router from "@/router";
import F_cover_cutter from "@/components/web/f_cover_cutter.vue";
import {IconImage} from "@arco-design/web-vue/es/icon";
import {getOptions, type optionsType} from "@/api";
import {articleCategoryOptionsApi} from "@/api/article_api";
import {userStorei} from "@/stores/user_store";
import {aiAnalysisApi, type aiAnalysisType} from "@/api/ai_api";
import {onUploadImg} from "@/api/image_api";

const store = userStorei()
const form = reactive<articleAddType>({
  title: "",
  content: "",
  abstract: "",
  status: 1, // 2是发布，1是草稿
  // categoryID: null,
  cover: "",
  tagList: [],
  openComment: true
})

const categoryOptions = ref<optionsType[]>([])
const tagOptions = ref<optionsType[]>([])

getOptions(categoryOptions, articleCategoryOptionsApi)
getOptions(tagOptions, articleTagOptionsApi)


const formRef = ref()

async function create(status: 1 | 2) {
  form.status = status
  const val = await formRef.value.validate()
  if (val) return
  const res = await articleAddApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  router.push({name: 'platformArticle'})
}

function coverBack(data: string) {
  form.cover = data
}

const aiData = reactive<aiAnalysisType>({
  title: "",
  abstract: "",
  category: "",
  tag: []
})

async function paste(e: ClipboardEvent) {
  if (!store.siteInfo.ai.enable){
    return
  }
  // const text = e.clipboardData?.getData('text');
  // 获取图片
  // 读取到图片对象
  const file = e.clipboardData?.files[0];
  if (file){
    // 粘贴的是图片
    return
  }
  const res = await aiAnalysisApi(form.content)
  if (res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  Object.assign(aiData, res.data)
  if (form.title == ""){
    form.title = aiData.title
  }
  if (form.abstract == ""){
    form.abstract = aiData.abstract
  }
  if (form.tagList.length == 0){
    form.tagList = aiData.tag
  }

}



</script>

<template>
  <div class="platform_article_add_view">
    <f_card title="发布文章">
      <a-form ref="formRef" :model="form" :label-col-props="{span: 0}" :wrapper-col-props="{span: 24}">
        <a-form-item field="title" validate-trigger="blur" :rules="[{required: true, message:'请输入文章标题'}]">
          <a-input v-model="form.title" placeholder="请输入标题（建议20字以内）"></a-input>
        </a-form-item>
        <a-form-item>
          <a-textarea v-model="form.abstract" :auto-size="{minRows: 3, maxRows: 4}" placeholder="文章简介"></a-textarea>
        </a-form-item>
        <a-form-item field="content" validate-trigger="blur" :rules="[{required: true, message:'请输入文章内容'}]">
          <MdEditor @onUploadImg="onUploadImg" @paste="paste" v-model="form.content" placeholder="请输入文章内容"></MdEditor>
        </a-form-item>
        <a-collapse :default-active-key="[1]" :bordered="false">
          <a-collapse-item header="更多设置" :key="1">
            <a-form :label-col-props="{span: 4}" :wrapper-col-props="{span: 8}" class="form2" label-align="left"
                    :model="form">
              <a-form-item label="请选择文章分类">
                <a-select v-model="form.categoryID" placeholder="文章分类" :options="categoryOptions"></a-select>
                <template #help>
                  <span v-if="aiData.category">基于ai推荐 适合的分类名称： {{ aiData.category }}</span>
                </template>
              </a-form-item>
              <a-form-item content-class="article_cover_col" label="设置文章封面">
                <div class="up">
                  <f_cover_cutter style="width: 100%" @ok="coverBack">
                    <div class="cover_mask">
                      <IconImage></IconImage>
                      <span>点击上传封面图（选填）</span>
                    </div>
                  </f_cover_cutter>
                </div>
                <div class="show" v-if="form.cover">
                  <a-image :src="form.cover" :height="60"></a-image>
                </div>
              </a-form-item>
              <a-form-item label="文章标签">
                <a-select allow-create allow-clear multiple :options="tagOptions"  v-model="form.tagList" placeholder="请输入标签"></a-select>
              </a-form-item>
              <a-form-item label="设置评论状态">
                <a-checkbox v-model="form.openComment">开启评论</a-checkbox>
              </a-form-item>
            </a-form>
          </a-collapse-item>
        </a-collapse>

        <div class="actions">
          <a-button type="primary" @click="create(2)">发布文章</a-button>
          <a-button @click="create(1)">存为草稿</a-button>
        </div>
      </a-form>
    </f_card>
  </div>
</template>

<style lang="less">
.platform_article_add_view {
  .f_card_com {
    .body {
      overflow-y: auto;
      max-height: calc(100vh - 160px);
    }
  }

  .arco-collapse {
    margin-bottom: 10px;
  }

  .arco-collapse-item {
    .arco-collapse-item-header {
      padding: 0;
      border: none;

      .arco-collapse-item-icon-hover {
        left: 62px;
      }
    }

    .arco-collapse-item-content {
      padding-right: 0;
      background: transparent;
      padding-left: 0;
    }
  }

  .form2 {
    .arco-row {
      display: flex;
      flex-direction: column;
    }

    .cover_mask {
      width: 100%;
      height: 120px;
      cursor: pointer;
      border: @f_border;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--color-text-2);

      span {
        font-size: 12px;
      }

      svg {
        font-size: 30px;
      }
    }

    .article_cover_col {
      flex-direction: column;

      > div {
        width: 100%;
      }

      .show {
        margin-top: 10px;
      }
    }
  }

  .actions {
    .arco-btn {
      margin-right: 10px;
    }
  }
}
</style>