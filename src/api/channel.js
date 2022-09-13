import request from '@/utils/request'
export const getChannelsAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
