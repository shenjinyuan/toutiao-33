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
/**
 *删除频道
 * @param {Number/String} id
 * @returns Promise
 */
export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
/**
 *
 * @param {String/Number} id
 * @param {Number} seq
 * @returns Promise
 */
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
