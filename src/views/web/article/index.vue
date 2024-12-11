<script setup lang="ts">
import F_nav from "@/components/web/f_nav.vue";
import F_main from "@/components/web/f_main.vue";
import {MdPreview} from "md-editor-v3";
import "md-editor-v3/lib/preview.css"
</script>

<template>
  <div class="article_detail_view">
    <f_nav no-scroll></f_nav>
    <f_main>
      <div class="article_container">
        <div class="article_content">
          <div class="head">
            <div class="title">xxx</div>
            <div class="date">xxx</div>
            <div class="tags">
              <a-tag>xxx</a-tag>
            </div>
          </div>
          <div class="body">
            <MdPreview :model-value="'# 标题'"></MdPreview>
          </div>
        </div>

        <div class="article_comment">
          <div class="add_comment">
            <a-textarea :auto-size="{minRows: 5, maxRows: 6}" placeholder="请输入评论内容"></a-textarea>
            <a-button type="primary" size="mini">发布评论</a-button>
          </div>
        </div>
      </div>
      <div class="article_info">
        <div class="user_info">
          <div class="user">
            <a-avatar :size="60"></a-avatar>
          </div>
          <div class="nick">xxx</div>
          <div class="data">
            <div class="item">
              <span>331</span>
              <span><i class="iconfont icon-jia"></i></span>
            </div>
            <div class="item">
              <span>331</span>
              <span><i class="iconfont icon-jia"></i></span>
            </div>
            <div class="item">
              <span>331</span>
              <span><i class="iconfont icon-jia"></i></span>
            </div>
            <div class="item">
              <span>331</span>
              <span><i class="iconfont icon-jia"></i></span>
            </div>
          </div>
        </div>
        <div class="catalog">
          <div class="head">文章目录</div>
          <div class="body"></div>
        </div>
        <div class="article_action">
          <i class="iconfont icon-dianzanliang"></i>
          <i class="iconfont icon-dianzanliang"></i>
          <i class="iconfont icon-dianzanliang"></i>
          <i class="iconfont icon-dianzanliang"></i>
        </div>
      </div>
    </f_main>
  </div>
</template>

<style lang="less">
.article_detail_view {

  .f_container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .article_container {
    width: calc(100% - 280px);

    .article_content {
      background: var(--color-bg-1);
      border-radius: 5px;

      .head {
        padding: 20px 20px 10px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: @f_border;

        .title {
          font-size: 20px;
          font-weight: 600;
        }

        .date {
          color: var(--color-text-2);
          font-size: 14px;
          margin: 5px 0;
        }
      }

      .body {
        padding: 10px 20px 20px 20px;

        .md-editor-preview-wrapper {
          padding: 0;
        }
      }
    }

    .article_comment{
      margin-top: 20px;
      border-radius: 5px;
      background: var(--color-bg-1);
      .add_comment{
        padding: 20px;
        position: relative;

        .arco-btn{
          position: absolute;
          right: 30px;
          bottom: 30px;
        }
      }
    }
  }

  .article_info {
    width: 260px;

    > div {
      background: var(--color-bg-1);
      border-radius: 5px;
    }

    .user_info {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .nick {
        margin: 10px 0 20px 0;
        color: var(--color-text-1);
      }

      .data {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;

        .item {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          span:nth-child(1) {
            font-size: 16px;
            color: var(--color-text-1);
            margin-bottom: 3px;
          }

          i {
            font-size: 18px;
            color: var(--color-text-2);
          }
        }
      }
    }

    .catalog {
      margin-top: 20px;

      .head {
        padding: 20px 20px 10px 20px;
        border-bottom: @f_border;
        font-weight: 600;
        color: var(--color-text-1);
      }

      .body {
        padding: 10px 20px 20px 20px;
      }
    }

    .article_action {
      margin-top: 20px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      justify-items: center;
      align-items: center;
      padding: 10px 0;

      i {
        padding: 10px;
        cursor: pointer;
        border-radius: 5px;
        color: var(--color-text-1);

        &:hover{
          background: var(--color-fill-1);
        }
      }
    }
  }
}
</style>