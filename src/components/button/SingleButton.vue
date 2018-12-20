<template>
  <div class="single_btn" :style="{padding:customized?'0px':'8px 12px'}">
    <x-button :type="type" action-type="button" @click.native="$emit('btnFunc')">{{text}}</x-button>
  </div>
</template>

<script>
import { XButton } from 'vux'
export default {
  props: {
    text:{
      type:String,
      default:''
    },
    customized:{
      type:Boolean,
      default:false
    },
    bg:{
      type:String,
      default:''
    },
    type:{
      type:String,
      default:'default' // 可选值 default（#ba8833）、primary（#999999）、warn（#E54100）
    }
  },
  data() {
    return {
      
    }
  },
  components: {
    XButton
  }
}
</script>


<style lang="less" scoped>
.single_btn {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 8px 12px;
  background: #ffffff;
}
</style>
