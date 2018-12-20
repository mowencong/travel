
import Vue from 'vue'
// import FastClick from 'fastclick'
import App from './App'
// 配置
import initConfig from './config/initConfig'
import appConfig from './config/appConfig'
// 插件
import bzcommon, { init } from 'bzcommon'
import 'bzcommon/src/styles/index.less'
import  'flex.css'

// 路由
import router from './router/index'
// store
import store from './store'
import VueDND from 'awe-dnd'
import keyBoard from './tool/directive/keyboard'
Vue.use(keyBoard )
// 添加函数工具库
import BZ from './tool/method/index'
Vue.use(BZ)
// 添加全局过滤器
import filter from './tool/filters/index'
  Object.keys(filter).forEach(key => {
    Vue.filter(key, filter[key])
  })
// 注册全局滑动指令
// import slide from './tool/directive/slide'
// slide(Vue);

// 组件
import { XHeader, Cell, Group, XInput, ViewBox, XButton, XTextarea, PopupPicker, ConfirmPlugin, ToastPlugin, DatetimePlugin, LoadingPlugin, AlertPlugin,Icon,Tab,TabItem,Swiper,SwiperItem } from 'vux'
Vue.use(DatetimePlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin, { position: 'bottom', type: 'text' })
Vue.use(LoadingPlugin)
Vue.component('x-header', XHeader)
Vue.component('cell', Cell)
Vue.component('group', Group)
Vue.component('x-input', XInput)
Vue.component('view-box', ViewBox)
Vue.component('x-button', XButton)
Vue.component('x-textarea', XTextarea)
Vue.component('popup-picker', PopupPicker)
Vue.component('tab',Tab)
Vue.component('tab-item',TabItem)
Vue.component('swiper',Swiper)
Vue.component('swiper-item',SwiperItem)
Vue.use(bzcommon, { configs: initConfig })

// FastClick.attach(document.body)
Vue.use(VueDND)
Vue.config.productionTip = false

/* eslint-disable no-new */
init(initConfig, function () {
  // 如果需要登录则请求用户信息，否则直接渲染
  if (appConfig.IS_NEED_lOGIN) {
    store.dispatch('GetUserInfo',
      function (isGetInfo) {
        // 如果请求成功
        if (isGetInfo) {
          document.getElementById('app-body-load').style.display = 'none'
          new Vue({
            router,
            store,
            render: h => h(App)
          }).$mount('#app-box')
        }
      }
    )
  } else {
    document.getElementById('app-body-load').style.display = 'none'
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app-box')
  }
})
