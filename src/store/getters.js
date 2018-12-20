/**
 * Created by xiaoxiaofan on 2017/7/18.
 */
const getters = {
  // 用户信息
  userInfo: state => state.user.userInfo,
  // 企业列表
  employeeList: state => state.user.employeeList
  // 分类列表
  // categoryList: state => state.blog.categoryList
}
export default getters
