<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="标题" class="nav-bar" />
    <!-- 表单 -->
    <!-- rule {required:是否必添，message：错误的提示信息
    } -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        ref="form"
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 发送验证框 -->
        <!-- 给验证按钮加上一个round改变他的形状  宽是152高是46-->
        <template #button>
          <van-button
            v-if="isShowCodeBtn"
            round
            size="small"
            type="default"
            class="btn"
            native-type="button"
            @click="sendCode"
            >发送验证码
          </van-button>

          <van-count-down
            v-else
            :time="3 * 1000"
            format="ss秒"
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule'
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  // 只有在表单验证正确的时候才会被触发
  methods: {
    ...mapMutations(['SET_TOKEN']),
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        // 如果是自己输入错误的电话号码或验证码则提示服务器返回给你message的信息
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // console.dir(error)
          this.$toast.clear() // 如果是服务器的错误就把他抛给服务器然后要把加载清除
          throw error
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async sendCode() {
      await this.$refs.form.validate('mobile')
      this.loading()
      try {
        await sendCodeAPI(this.mobile)
        this.isShowCodeBtn = false
        this.$toast.success('发送成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.caller()
          throw error()
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.62rem;
  background-color: #eee;
  color: #a58594;
}
</style>
