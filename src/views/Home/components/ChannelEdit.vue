<template>
  <div class="chnnel-edit">
    <!-- 我的频道 -->
    <!-- 标题 -->
    <van-cell title="我的频道">
      <van-button
        class="btn"
        size="mini"
        round
        style="color: red; border-color: red"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          :class="{ active: item.name === '推荐' }"
          v-for="(item, index) in myChannels"
          :key="item.id"
          :text="item.name"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          @click="handlemyChannel(item, index)"
        />
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <div class="recommend-pannel">
      <van-grid>
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          icon="plus"
          :text="item.name"
          @click="$emit('add-channels',item)"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
// import { getAllChannelsAPT } from '@/api'
export default {
  data() {
    return {
      isEdit: false,
      AllChannes: []
    }
  },
  props: {
    myChannels: Array
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannelsAPI()
      this.AllChannes = data.data.channels
    },
    handlemyChannel({ name, id }, index) {
      if (this.isEdit && name !== '推荐') {
        this.$emit('del-channels', id)
        // 子传父把当时点击对象的id穿给父
      } else {
        console.log(index)
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    // 当为false就表示这一项为没有就显示在推荐列表下，当时true表示有这一项就不显示在推荐列表
    recommendChannels() {
      return this.AllChannes.filter((allChanneItem) => {
        return !this.myChannels.find(
          (myChannelItem) => myChannelItem.id === allChanneItem.id
        )
      })
    }
  }
}
</script>

<style scoped lang="less">
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.chnnel-edit {
  padding-top: 92px;
}
:deep(.btn) {
  width: 100px;
  font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
