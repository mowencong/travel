/**
 * 接口服务
 */
import { http } from 'bzcommon'

/**
 * 获取用户信息
 */
export function getUser() {
  return http.$httpPostForm(
    `${window.IP.resourcesPortIP}system/serviceuser/search/app/v2/query/getUserInfoForAppLogin`,
    {}
  )
}
