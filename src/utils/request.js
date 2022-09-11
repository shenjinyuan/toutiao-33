import store from '@/store'
import axios from 'axios'
// import store from '@/store'
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

// axios.craete是axios的克隆当有多个baseURL时可以再次克隆出来一样一起暴露出去
request.interceptors.request.use(function (config) {
  const {
    getters: { isLogin },
    state: { tokenObj }
  } = store
  if (isLogin) {
    config.headers.Authorization = `Bearer ${tokenObj.token}`
  }
  return config
})

export default request
