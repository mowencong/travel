<template>
  <view-box ref="viewBox">
    <div slot="header">
      <x-header slot="header" :left-options="{backText:''}">
        退款详情
      </x-header>
      <div class="all_price c-main" flex="cross:center">
        退款总额：<span class="color-e54">{{(-allAmountOfPayment).toFixed(2)}}</span>元
      </div>
    </div>
    <div class="bg-fff" style="min-height:100%;">
      <fold v-for="(item,index) in list" :key="index" :item="item"></fold>
    </div>
    <div class="bg-fff" style="height:60px;"></div>
  </view-box>
</template>

<script>
import Fold from './fold'
import {queryRefundOrderList} from '../../servers/trafficServer'
export default {
  data(){
    return {
      list:[],
      allAmountOfPayment:0
    }
  },
  mounted(){
    this.$vux.loading.show();
    queryRefundOrderList({
      id:this.$route.query.id
    }).then(res=>{
      this.$vux.loading.hide();
      console.log("退款订单详情",res)
      this.list = res.data
      this.list.forEach(item=>{
        this.allAmountOfPayment=(this.allAmountOfPayment)+item.amountOfPayment
        console.log(this.allAmountOfPayment)
      })
    })
  },
  components:{
    Fold
  }
}
</script>


<style lang="less" scoped>
  .all_price{
    height:45px;
    background-color: #303030;
    padding-left:27px;
    font-size:16px;
  }
</style>
