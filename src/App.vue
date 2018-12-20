<template>
  <div id="app" ref="app">
    <div class="statebar"></div>
    <div class="content" :style="{top: platform == 'ios'?'20px':0}">
      <keep-alive>
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      platform: window.APP_PLATFORM || 'pc',
    }
  },

  methods:{
  },
  filters:{

  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import 'flex.css/dist/flex.css';
  @import '~vux/src/styles/1px.less';
  @import './styles/enter.less';
  html {
    height: 100%;
    overflow: hidden;
  }
  body {
    background: #f5f5f5;
    font-size: 16px;
    height: 100%;
    overflow: hidden;
  }
  div {
    box-sizing: border-box;
  }
  #app {
    height: 100%;
    color: #303030;
    position: relative;
  }
  .statebar {
    height: 20px;
    width: 100%;
    background: #303030;
  }
  .content {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
</style>
