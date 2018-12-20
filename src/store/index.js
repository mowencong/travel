import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tool from './modules/tool'
import mainInfo from './modules/mainInfo'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    tool,
    mainInfo
  },
  getters
})

export default store
