<template>
  <view-box ref="viewBox">
    <x-header slot="header" :left-options="{backText:'',preventGoBack:true}" @on-click-back="goBack()">
      订单详情
    </x-header>
    <div class="main_list"  :style="{'padding-bottom':((orderStatus==0)?'52px':'0px')}">
      <bz-scroll-list style="height: 100%" :pulldown="true" :pullup="false" @pullingDown="handleTop"  ref="scrollList" :data="orderList">
        <div style="height:100%">
          <!--订单详情头部-->
          <div class="pending" flex="">
            <div class="f-0">
              <img :src="(orderStatus==5 || orderStatus==4)?imgPath[0]:(orderStatus==6)?imgPath[1]:imgPath[2]" width="28"/>
            </div>
            <div class="pending_time">
              <p class="f-20 fh-28">{{orderStatusTip}}</p>
              <p class="f-12 fh-16" v-if="orderStatus==4">预计10分钟内为您出票，出票成功后短信告知 若出票失败全额退款</p>
              <p class="f-12 fh-16" v-if="orderStatus==0||(orderStatus==10&&retreatingStatus==2)">座位已经成功预订！请在<span class="color-e54">{{remainTime}}</span>内完成支付</p>
              <p class="f-12 fh-16" v-if="orderStatus==5 || orderStatus==8">请凭购票证件进站取票</p>
              <p class="f-12 fh-16" v-if="orderStatus==6">购票费用将全额退还至您的支付账户</p>
              <p class="f-12 fh-16" v-if="orderStatus==7">您的订单已取消</p>
            </div>
          </div>
          <!--订单详情-->
          <order-detail-item  :item="item" v-for="(item,index) in orderList" :orderSn="orderSn" :gtgjOrderId="orderDetail.orderDetail.gtgjOrderId" :key="index"></order-detail-item>
          <!--查看退款金额-->
          <div v-if="refundMoney>0" class="orderAmount refund bg-fff margin-content" flex="main:justify cross:center">
            <div flex="cross:center">
              <img src="../../assets/images/ticketPrice@2x.png" height="15" />
              <span class="c-30">有{{refundMoney.toFixed(2)}}元退款</span>
            </div>
            <div @click="goRefund()">
              查看进度
            </div>
          </div>
          <!--订单概要-->
          <div class="order_outline f-16" v-if="orderDetail.orderDetail">
            <div class="bg-fff">
              <div flex="main:justify cross:center" class="vux-1px-b">
                <div class="color-99">创建时间</div>
                <div class="color-30">{{orderDetail.orderDetail.createTime}}</div>
              </div>
            </div>
            <div class="bg-fff" >
              <div flex="main:justify cross:center" class="vux-1px-b">
                <div class="color-99">订单编号</div>
                <div class="color-30">{{orderDetail.orderDetail.orderSn}}</div>
              </div>
            </div>
            <div class="bg-fff" >
              <div flex="main:justify cross:center">
                <div class="color-99">商家订单号</div>
                <div class="color-30">{{orderDetail.orderDetail.gtgjOrderId}}</div>
              </div>
            </div>
          </div>
        </div>
      </bz-scroll-list>
    </div>
    <!--原票-->
    <foote v-if="orderStatus==0&&orderDetail.orderDetail" primary="取消订单" main="去支付" :amount="orderDetail.orderDetail.orderTotal" @btnPrimary="cancelOrder" @btnMain="goPay" slot="bottom"></foote>
    <!--改签票实际支付金额-->
    <foote v-if="((orderStatus==10&&retreatingStatus==2))&&orderDetail.orderDetail&&(orderDetail.orderDetail.amountOfPayment>0)" primary="取消订单" main="去支付" :amount="orderDetail.orderDetail.amountOfPayment" @btnPrimary="cancelOrder" @btnMain="goPay" slot="bottom"></foote>
    <!--改签票退款金额-->
    <!--<foote content="退款金额" v-if="((orderStatus==10&&retreatingStatus==2))&&orderDetail.orderDetail&&(orderDetail.orderDetail.amountOfPayment<=0)" primary="取消订单" main="确定" :amount="-orderDetail.orderDetail.amountOfPayment" @btnPrimary="cancelOrder" @btnMain="confirmOrder" slot="bottom"></foote>-->
  </view-box>

</template>
<script>
  import orderDetailItem from './orderDetailItem'
  import LoadRefresh from '../../components/loadRefresh/loadRefresh'
  import Foote from '../../components/footer/footer'
  import {orderDetail,cancelOrder,getPaymentOrder,changeConfirm} from '../../servers/trafficServer'
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return {
        scrollData: {
          noFlag: false //暂无更多数据显示（本页面无用处）
        },
        orderSn:'',
        imgPath:[
          require('../../assets/images/time.png'),
          require('../../assets/images/cancel.png'),
          require('../../assets/images/tips@2x.png')
        ],
        httpShow:false,  //用于请求数据后判断页面显示状态
        orderList:[],
        orderStatus:111,
        retreatingStatus:'',
        orderDetail:{},
        fromRoute:'',//前一页面路由
        remainTime:'', // 剩余支付时间
        refundMoney:''//退款
      }
    },
    computed:{
      ...mapGetters(['userInfo']),
      orderStatusTip(){
        if(this.orderStatus!=10){
          return BZ.orderDescription().get(this.orderStatus)
        }else{
          return BZ.ticketChangeDescription().get(this.retreatingStatus)
        }
      }
    },
    mounted(){
      this.orderSn = this.$route.query.orderSn;
      this.getOrderDetail();
    },
    beforeRouteEnter(to,from,next){
      next(vm=>{
        vm.fromRoute = from.name
      })
    },
    watch:{
      $route(to,from){
        if(to.query.entry&&to.query.entry=='pay'){
          this.getOrderDetail();
        }
      }
    },
    methods:{
      goBack(){
        if(this.fromRoute=='Order'){
          history.back()
        }else{
          this.$router.push({
            path:'order/0'
          })
        }
      },
      goRefund(){
        this.$router.push({
          path:'/refund',
          query:{
            id:this.orderDetail.orderDetail.id
          }
        })
      },
      confirmOrder(){
        this.$vux.loading.show();
        changeConfirm({
          orderSn:this.orderSn,
          xqcUserId:this.userInfo.id
        }).then(res=>{
          this.$vux.loading.hide();
          this.getOrderDetail();
        })
      },
      getOrderDetail(){
        this.httpShow = false;
        this.$vux.loading.show();
        orderDetail({
          orderSn:this.orderSn,
          xqcUserId:this.userInfo.id,
          // xqcUserId:48034,
        }).then(res=>{
          this.httpShow = true;
          this.$vux.loading.hide();
          this.orderList = res.data[1].orderList;
          this.refundMoney= res.data[0].refundMoney;
          this.orderDetail = res.data[1].orderList[res.data[1].orderList.length-1];
          this.orderStatus = this.orderDetail.orderDetail.orderStatus;
          this.retreatingStatus = this.orderDetail.orderDetail.retreatingStatus;
          if(this.orderStatus==0||(this.orderStatus==10&&this.retreatingStatus==2)){
            let startTime = this.orderDetail.orderDetail.payLimitTime && this.orderDetail.orderDetail.payLimitTime.replace(/\-/g, "/");
            let remainTimeStamp = (Date.parse(new Date(startTime)) - res.timestamp)/1000;
            if(remainTimeStamp<0){
              this.remainTime = "00:00"
            }else{
              let mint = Math.floor(remainTimeStamp/60);
              let second = parseInt(remainTimeStamp-mint*60);
              mint = mint>9?mint:'0'+mint;
              second = second>9?second:'0'+second;
              this.remainTime = mint+':'+second;
            }
          }
          this.$refs['scrollList'].finishPullDown()
          console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
          console.log("订单详情",res);
          console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
        })
      },
      async handleTop(){
        await this.getOrderDetail();
      },
      cancelOrder(){//取消订单
        let _this = this;
        this.$vux.confirm.show({
          title:'温馨提示',
          content:'确定取消订单吗',
          onConfirm () {
            _this.$vux.loading.show();
            cancelOrder({
              orderSn:_this.orderDetail.orderDetail.orderSn,
              xqcUserId:_this.userInfo.id
            }).then(res=>{
              _this.$vux.loading.hide();
              console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
              console.log("取消订单",res);
              console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
              if(res.data.result.status=='SUCCESS'){
                _this.getOrderDetail();
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
      goPay(){
        let _this = this;
        getPaymentOrder({
          userid:this.userInfo.id,
          orderSn:this.orderSn,
        }).then(res=>{
          cordova.exec(
            function(success) {
              //支付成功的回调
              _this.$router.push({
                path:'/orderDetail',
                query:{
                  orderSn:_this.orderSn,
                  entry:'pay'
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
    },
    components:{
      orderDetailItem,
      LoadRefresh,
      Foote
    }
  }
</script>
<style lang="less" scoped>
  .pending{
    height:97px;
    padding:26px 40px 0 53px;
    background: url("../../assets/images/pending.png") no-repeat 0 0;
    background-size:cover;
    .pending_time{
      color: #ffffff;
      margin-left:14px;
    }
  }
  .order_outline{
    margin:8px 12px 0px;
    border-radius: 4px; //TODO 边框圆角失效
    &>div{
      padding:0 10px;
      &>div{
        height:45px;
      }
    }
  }
  .main_list{
    /*padding-bottom:74px;*/
    position: relative;
    height:100%;
  }
  .orderAmount{
    height:45px;
    padding:0 10px;
    border-radius:5px;
    font-size:16px;
    margin-top: 8px;
    span{
      margin-left:8px;
      /*font-weight:bold;*/
    }
    div:last-child{
      color:#E54100;
    }
  }
  .refund{
    margin-top:8px;
    div:last-child{
      color:#ba8833 !important;
    }
  }
</style>
