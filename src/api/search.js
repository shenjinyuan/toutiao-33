import request from '@/utils/request'
/**
 * 获取建议
 * @param {*} q 建议
 * @returns promas
 */
export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 *搜索结果
 * @param {NUmber} page 页数可以不传默认为1
 * @param {NUmber} per_page 获取的数量
 * @param {String} q 搜索关键字
 * @returns
 */
export const getResultsAPI = (/*eslint-disable-line*/ page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
