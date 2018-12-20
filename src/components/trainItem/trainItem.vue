<template>
  <div class="item bg-fff vux-1px-b padding-primary f-16" flex="cross:center">
    <div class="">{{item.seatType}}</div>
    <div class="text-center" :class="(item.yuPiao==0)?'color-99':'color-30'">{{item.yuPiao |traffic |trafficAgain}}</div>
    <div class="text-right color-e54"><span class="f-10">￥</span>{{item.price}}</div>
    <div flex="cross:center main:right">
      <div class="item_btn f-12 color-ff" flex="cross:center main:center" :class="(item.yuPiao==0)?'bg-99':'bg-primary'" @click="reserve(item)">预定</div>
    </div>
  </div>
</template>
<script>

  export default {
    props:['item'],
    mounted(){

    },
    filters:{
      trafficAgain(value){
        if(value=='无票'){
          return '已售完'
        }else{
          return value
        }
      }
    },
    methods:{
      reserve(item){
        if(item.yuPiao!=0){
          this.$emit('reserve',item);
        }
      }
    },
    components:{

    }
  }
</script>
<style lang="less" scoped>
  .item{
    height:46px;
    &>div{
      width:25%;
    }
  }
  .item_btn{
    width:51px;
    height:25px;
    border-radius: 4px;
  }
</style>
