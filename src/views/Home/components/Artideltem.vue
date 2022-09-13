<template>
  <div>
    <van-cell v-if="article.cover.type === 0" title="没有图片" :label="label" />
    <van-cell
      v-else-if="article.cover.type === 1"
      :title="article.title"
      :label="label"
    >
      <van-image width="100" height="100" :src="article.cover.images[0]" />
    </van-cell>
    <van-cell v-else :title="article.title">
      <template #label>
        <van-image
          v-for="(item, index) in article.cover.images"
          :key="index"
          width="100"
          height="100"
          :src="item"
        />
        <p>{{ label }}</p>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/day.js'
export default {
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      /* eslint-dissable */
      // eslint-disable-next-line camelcase
      const { aut_name, comm_count, pubdata } = this.article
      // eslint-disable-next-line camelcase
      return `${aut_name} ${comm_count}评价 ${dayjs(pubdata).fromNow()}}`
    }
  }
}
</script>

<style></style>
