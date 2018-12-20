<template>
  <view-box ref="viewBox">
    <div slot="header">
      <x-header :left-options="{backText:'',preventGoBack:true}" @on-click-back="goBack()">
        我的订单
      </x-header>
      <tab :line-width="2" custom-bar-width="70%">
        <tab-item :selected="orderState==0" @on-item-click="goRoute">全部</tab-item>
        <tab-item :selected="orderState==1" @on-item-click="goRoute">待处理</tab-item>
        <tab-item :selected="orderState==2" @on-item-click="goRoute">处理中</tab-item>
        <tab-item :selected="orderState==3" @on-item-click="goRoute">待出行</tab-item>
        <tab-item :selected="orderState==4" @on-item-click="goRoute">退款/售后</tab-item>
      </tab>
    </div>
    <div class="order_list" >
      <order-list :orderState="orderState"/>
    </div>
  </view-box>
</template>
<script>
  import { Tab, TabItem } from 'vux'
  import OrderList from './orderList'
  export default {
    data(){
      return {
        orderState:0,
        fromRoute:'' //保存上一路由名字
      }
    },
    beforeRouteEnter(to,from,next){
      next(vm=>{
        vm.fromRoute = from.name
      })
    },
    mounted(){
      this.orderState = this.$route.params.index;
    },
    methods:{
      goRoute(index){
        this.orderState = index;
        this.$router.push({
          path:`/order/${index}`,
        })
      },
      goBack(){ //为了考虑第三方渠道跳入此页面，点击回退问题
        if(this.fromRoute=='Enter'||this.fromRoute=='OrderDetail'){
          this.$router.push({
            path:'/enter'
          })
        }else{
          this.$exit();
        }
      }
    },
    components:{
      Tab,
      TabItem,
      OrderList
    }
  }
</script>
<style scoped>
.order_list{
  height:100%;
  height:calc(100% - 44px);
}
</style>
