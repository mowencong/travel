/**
 * Created by xiaoxiaofan on 2017/7/18.
 */
import { getUser } from '../../servers/userServers'

const user = {
  state: {
    userInfo: {},
    employeeList: []
  },

  mutations: {
    // 设置用户信息
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo
    },
    // 设置该企业的信息
    SET_EMPLOYEELIST: (state, employeeList) => {
      state.employeeList = employeeList
    }
  },

  actions: {
    /**
     * 查询用户信息的action
     * @param {function} suc 成功回调
     * @param {function} err 失败回调
     */
    GetUserInfo({ commit }, suc) {
      getUser()
        .then(success => {
          commit('SET_USER', success.data.userInfo)
          commit('SET_EMPLOYEELIST', success.data.employeeList)
          suc(true)
        })
        .catch(() => {
          commit('SET_USER', {})
          commit('SET_EMPLOYEELIST', [])
          suc(false)
        })
    }
  }
}

export default user
