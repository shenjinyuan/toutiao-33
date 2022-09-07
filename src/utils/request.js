import axios from 'axios'
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})
export default request
// axios.craete是axios的克隆当有多个baseURL时可以再次克隆出来一样一起暴露出去
