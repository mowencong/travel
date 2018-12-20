<template>
  <div class='cover'>
    <popup v-model="show" should-rerender-on-show="true">

    </popup>
    <div v-if="show" class="cover_main bg-fff absolute">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import { Popup } from 'vux'
  export default {
    data(){
      return {
        show:true
      }
    },
    components:{
      Popup
    }
  }
</script>
<style lang="less" scoped>
  .cover{
    .cover_main{
      width:86%;
      padding:20px;
      z-index:10000;
      top:25%;
      margin-left:7%;
      border-radius: 4px;
    }
  }
</style>
