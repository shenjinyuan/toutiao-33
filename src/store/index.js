import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
// vuex-persistedstate  持久化tate
// 1.下载yarn add vuex-persistedstate@3.2.1
// 2.引入import createPersistedState from 'vuex-persistedstate'
// 3调用plugins：【createPersistedState（）】

// key：默认配置对象是vuex
// storage：存储的方式，默认值是本地存储
// reducer：指定持久化那些数据，函数，return一个对象，对象就作为存储的values 还能传一个参数state
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      reducer({ tokenObj }) {
        return { tokenObj }
      }
    })
  ],
  state: {
    tokenObj: {}
  },
  getters: {
    islogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    }
  }
})
