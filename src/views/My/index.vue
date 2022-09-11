<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <div class="login banner" v-if="islogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <van-row
              style="height: '100%'"
              type="flex"
              justify="space-around"
              align="center"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="UserInfo.photo"
              />
              <span class="mobile"> {{ UserInfo.name }} </span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="center"
              align="center"
              style="height: '100%'"
            >
              <van-button class="edit-btn" size="mini" round
                >编辑按钮</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ UserInfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon> {{ UserInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ UserInfo.follow_count }} </template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon> {{ UserInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div class="logout banner" v-else @click="$router.push('/login')">
        未登录状态的结构
        <van-image width="1.76rem" height="1.76rem" :src="mobileSrc" />
        <span class="text">登录 / 推出</span>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid column-num="2" clickable>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>

        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>

        <div class="link">
          <van-cell style="height: '100%'" title="消息通知" is-link></van-cell>
          <van-cell title="小智同学" is-link></van-cell>
        </div>
      </van-grid>
    </main>
    <!-- footer -->
    <footer>
      <van-button
        style="color: 'red'"
        :block="true"
        v-if="islogin"
        @click="logout"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileSrc from '@/images/mobile.png'
// import { getUserInfo } from '@/api'
import { getUserInfo } from '@/api'
export default {
  data() {
    return {
      mobileSrc,
      UserInfo: {}
    }
  },
  computed: {
    ...mapGetters(['islogin'])
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出账号'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    async getUserInfo() {
      try {
        if (!this.islogin) return
        const { data } = await getUserInfo()
        this.UserInfo = data.data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败，请重新登录')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.profile {
  height: 100vh;
  background-color: #f5f7f9;
}
.link {
  width: 100%;
  margin: 10px 0;
}
.toutiao {
  font-size: 40px;
}
.toutiao-shoucang {
  color: red;
}
.toutiao-lishi {
  color: orange;
}
.banner {
  width: 100%;
  height: 5.33333rem;
  background: url('../../images/banner.png') no-repeat 0 0 / cover;
}

.logout {
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-content: center;
  align-items: center;
  .text {
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
  }
}
.login {
  display: flex;
  flex-direction: column;

  > .van-row {
    padding-top: 50px;
    flex: 1;
  }
  .mobile {
    font-size: 28px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .edit-btn {
    width: 1.6rem;
    height: 0.4267rem;
    color: #666;
  }
  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
