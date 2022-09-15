<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @focus="isShowsearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!--  -->
    <!-- 搜索 -->
    <!-- <SearchHistory></SearchHistory>
    <SearchSuggestion></SearchSuggestion>
    <SearchResult></SearchResult> -->
    <component
      :is="componentName"
      :keywords="keywords"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
// vue自动帮你把calss和style合并到组件的根节点上'
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SeachSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      keywords: '',
      isShowsearchResult: false
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistory' // 搜索历史
      }

      if (this.isShowsearchResult) {
        return 'SearchResult' // 搜索结果
      }

      return 'SearchSuggestion' // 搜索建议
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowsearchResult = true
    }
  }
}
</script>
<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
