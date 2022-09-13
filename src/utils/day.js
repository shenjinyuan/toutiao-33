import dayjs from 'dayjs'
// import { extend } from 'vue/types/umd'
const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-cn')
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
export default dayjs
