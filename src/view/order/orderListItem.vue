<template>
  <div class="bg-fff btn_item">
    <div class="order_num f-12 padding-primary" flex="main:justify cross:center">
      <div class="color-99">
        订单编号: {{item.orderSn}}
      </div>
      <div class="order_state" :class="item.orderStatus=='7'?'color-99':'color-e54'">
        {{orderDescription.get(item.orderStatus)}}
      </div>
    </div>
    <div class="order_main">
      <div class="f-16 fh-16 color-30" flex="main:justify">
        <div>{{item.departureArea}}-{{item.destinationArea}}</div>
        <div v-if="item.orderStatus!=10">￥{{item.orderTotal}}</div>
      </div>
      <div class="order_time color-99 f-12 fh-12">
        {{item.trainDate}}  {{item.departureDate}}-{{item.destinationDate}}
      </div>
      <div class="color-99 f-12 fh-12">
        {{item.trainNumber}}
      </div>
    </div>
    <div class="order_btn padding-primary" flex="main:justify cross:center">
      <div class="f-0" flex="cross:center">
        <img class="order_btn_img" src="../../assets/images/train@2x.png"  width="12"/>
        <span class="f-12 color-primary">火车票</span>
      </div>
      <div flex="">
        <order-btn v-if="item.orderStatus==0||(item.orderStatus==10&&item.retreatingStatus==2)" @click.native.stop="cancelOrder(item)">取消订单</order-btn>
        <order-btn v-if="item.orderStatus==0||(item.orderStatus==10&&item.retreatingStatus==2)" @click.native.stop="goPay(item)">去支付</order-btn>
        <order-btn v-if="item.orderStatus==7||item.orderStatus==6||(item.orderStatus==10&&item.retreatingStatus==12)" @click.native.stop="deleteOrder(item)">删除订单</order-btn>
        <order-btn v-if="item.orderStatus==5" >退改签</order-btn>
      </div>
    </div>
  </div>
</template>
<script>
  import OrderBtn from '../../components/button/orderBtn'
  import {cancelOrder,deleteOrder,getPaymentOrder} from '../../servers/trafficServer'
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return {
        orderStatus:'0'//【0待支付，1占座中，3占座失败，4支付成功（出票中），5购票成功，6购票失败，7取消订单，8改签中，9退票中，10有退改记录【改签受理中，改签成功，已改签，改签失败；退票受理中，退票成功，退票失败】，11已取票，12已出行】
      }
    },
    props:['item','cancel'],
    computed:{
      ...mapGetters(['userInfo']),
      orderDescription(){
        return BZ.orderDescription()
      }
    },
    components:{
      OrderBtn
    },
    methods:{
      cancelOrder(item){//取消订单
        let _this = this;
        this.$vux.confirm.show({
          title:'温馨提示',
          content:'确定取消订单吗',
          onConfirm () {
            _this.$vux.loading.show();
            cancelOrder({
              orderSn:item.orderSn,
              xqcUserId:_this.userInfo.id
            }).then(res=>{
              _this.$vux.loading.hide();
              console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
              console.log("取消订单",res);
              console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
              if(res.data.result.status=='SUCCESS'){
                _this.cancel();
              }else {
                _this.$vux.alert.show({
                  title:'温馨提示',
                  content:res.data.result.msg
                })
              }
            })
          }
        })
      },
      deleteOrder(item){//删除订单
        let _this= this;
        this.$vux.confirm.show({
          title:'温馨提示',
          content:'确定删除订单吗',
          onConfirm () {
            _this.$vux.loading.show();
            deleteOrder({
              orderSn:item.orderSn,
              xqcUserId:_this.userInfo.id
            }).then(res=>{
              console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
              console.log("删除订单",res);
              console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
              _this.$vux.loading.hide();
              if(res.data>0){
                _this.$emit('delete');
              }
            })
          }
        })
      },
      goPay(item){
        let _this = this;
        getPaymentOrder({
          userid:this.userInfo.id,
          orderSn:item.orderSn,
        }).then(res=>{
          cordova.exec(
            function(success) {
              //支付成功的回调
              _this.$router.push({
                path:'/orderDetail',
                query:{
                  orderSn:item.orderSn
                }
              })
            },
            function(error) {
              //支付失败的回调
              console.log(error);
            },
            "XqcUser", //接口类名
            "unifiedPayment", //调用原生统一支付方法
            [
              {
                orderInfo: {
                  orderNumber: res.data.orderNumber, // 订单编号
                  orderAmount: res.data.orderAmount, // 订单金额
                  orderChannel: res.data.orderChannel, // 订单渠道：美团订单/京东订单/还款...
                  orderSummary: res.data.orderSummary, // 订单摘要
                  getChannelsURL: res.data.getChannelsURL, // 获取支付渠道列表的接口(不带域名及"api/")
                  mrchCode: res.data.mrchCode, // 商户编号
                  mrchName: res.data.mrchName, // 商户名称
                  returnURL: "", // 支付成功后跳转的页面
                }
              }
            ]
          );
        })
      },
    }
  }
</script>
<style lang="less" scoped>
  .btn_item{
    margin-bottom: 8px;
  }
  .order_num{
    height:42px;
  }
  .order_state{

  }
  .order_main{
    background: #f9f9f9;
    padding:15px 12px;
    .order_time{
      margin:15px 0 10px;
    }
  }
  .order_btn{
    height:46px;
    .order_btn_img{
      margin-right:10px;
    }
  }
</style>
