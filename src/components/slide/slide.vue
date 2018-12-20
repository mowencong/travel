<template>
  <div class="demo_slide" flex="cross:center">
    <swipeout>
      <swipeout-item @on-close="" @on-open="" transition-mode="follow">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick()" type="warn">删除</swipeout-button>
        </div>
        <div slot="content" class="demo-content" flex="main:justify cross:center">
          <div flex="cross:center">
            <div class="f-0 icon">
              <img src="../../assets/images/single-y@2x.png" width="20"/>
            </div>
            <div>{{text}}</div>
          </div>
          <div class="f-0">
            <img src="../../assets/images/modify@2x.png" width="20"/>
          </div>
        </div>
      </swipeout-item>
    </swipeout>
  </div>
</template>
<script>
  import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

  export default {
    props:['text'],
    methods:{
      onButtonClick(){
        console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
        console.log("删除了");
        console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
      }
    },
    components:{
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    }
  }
</script>
<style lang="less" scoped>
  .demo-content {
    padding: 20px 12px;
  }
  .icon{
    margin-right:15px;
    height:20px;
  }
</style>
