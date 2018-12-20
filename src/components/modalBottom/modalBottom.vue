<template>
  <div class="bot-fixed modal_footer color-ff f-14" flex="">
    <div flex="main:center cross:center" class="border-r" @click="screen('category')">{{category}}</div>
    <div flex="main:center cross:center" class="border-r" @click="screen('timeObj')">{{timeObj.selection[timeObj.Index]}}</div>
    <div flex="main:center cross:center" class="border-r" @click="screen('useTimeObj')">{{useTimeObj.selection[useTimeObj.Index]}}</div>
    <div flex="main:center cross:center" @click="screen('priceObj')">{{priceObj.selection[priceObj.Index]}}</div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        category:'筛选',
        timeObj:{
          type:'departTimeInSecond',
          selection:['时间','出发  早-晚','出发  晚-早'],
          Index:0,
        },
        useTimeObj:{
          type:'trainTimeInSecond',
          selection:['耗时','耗时 短-长','耗时  长-短'],
          Index:0,
        },
        priceObj:{
          type:'minPrice',
          selection:['价格','价格 低-高','价格  高-低'],
          Index:0,
        },
      }
    },
    methods:{
      screen(type){
        if(type=='category'){

        }else if(type=='timeObj'){
          this.timeObj.Index = this.timeObj.Index==0?1:this.timeObj.Index==1?2:1;
          this.useTimeObj.Index = 0;
          this.priceObj.Index = 0;
        }else if(type=='useTimeObj'){
          this.useTimeObj.Index = this.useTimeObj.Index==0?1:this.useTimeObj.Index==1?2:1;
          this.timeObj.Index = 0;
          this.priceObj.Index = 0;
        }else if(type=='priceObj'){
          this.priceObj.Index = this.priceObj.Index==0?1:this.priceObj.Index==1?2:1;
          this.timeObj.Index = 0;
          this.useTimeObj.Index = 0;
        };
        this.$emit('select',this[type])
      }
    }
  }
</script>
<style lang="less" scoped>
  .modal_footer{
    height:44px;
    background: rgba(0,0,0,0.8);
    padding:12px 0;
    &>div{
      width:25%;
    }
    .border-r{
      border-right:1px solid #ffffff;
    }
  }
</style>
