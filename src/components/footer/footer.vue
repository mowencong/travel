<template>
  <div class="bot-fixed bg-fff bot-footer" flex="main:justify">
    <div flex="cross:center">
      <slot>
        <span class="color-30 " :class="main!=''?'f-12':'f-16'" style="margin-right:11px">{{content}}</span>
        <span class="color-e54 f-12">￥</span>
        <span class="color-e54 f-18">{{amount}}</span>
      </slot>
    </div>
    <div class="but-right color-ff" flex="">
      <div class="primary bg-primary" v-if="primary!=''" flex="main:center cross:center" @click="$emit('btnPrimary')">{{primary}}</div>
      <div class="default bg-button" v-if="main!=''" flex="main:center cross:center" @click="$emit('btnMain')">{{main}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      amount:{
        type:String | Number,
        default:'0.00'
      },
      content:{
        type:String,
        default:'订单总额'
      },
      primary:{
        type:String,
        required:true,
        default:''
      },
      main:{
        type:String,
        default:''
      },
    }
  }
</script>

<style lang="less" scoped>
.bot-footer{
  height:44px;
  padding-left:12px;
  z-index: 100;
  .but-right{
    div{
      height:44px;
      width:108px;
    }
  }
}
</style>
