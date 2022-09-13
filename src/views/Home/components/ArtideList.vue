<template>
  <div class="article">
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了～"
        @load="getNextPageArticle"
        v-model="loading"
        offset="100"
        :immediate-check="false"
        ><ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        >
        </ArticleItem
      ></van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// <!-- 属性 -->
//   <!-- @load: 触底的时候触发load事件 -->
//   <!-- offset: 滚动条和底部距离多少的时候触发load事件, 默认值是300px -->
//   <!-- immediate-check: 初渲染的时候是否执行load事件, 默认值是true  -->
//   <!-- v-model="loading" -->
//   <!-- loading为true,load事件不会被触发 -->
//   <!-- loading为false的时候,load事件会被触发 -->
//   <!-- loading会在load事件执行后,被van-list组件自动设置为ture, 需要手动的改为false -->
//   <!-- finished:Boolean. false:load事件会被触发 true:load事件不会被出发了, 并且显示finished-text的文本 -->
import ArticleItem from './Artideltem.vue'
import { getArticles } from '@/api'
export default {
  components: {
    ArticleItem
  },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        console.log(data)
        this.articles = data.data.results
        // console.log(this.articles)
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      // console.log('getNextPageArticle')
      // 发送请求
      try {
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          // 添加到articles
          this.articles.push(...data.data.results)
        }

        // 更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // 错误进行处理
        this.error = true
        // 语句一定会执行
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article {
  height: calc(100vh - 92px - 88px - 100px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: red;
  }
  &::-webkit-scrollbar-thumb {
    background-color: blue;
    border-radius: 10px;
  }
}
</style>
