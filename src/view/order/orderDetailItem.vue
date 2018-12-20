<template>
  <div class="order">
    <div class="order_main f-0" :class="item.orderDetail.orderStatus==7?'bgInvalid':'bgActive'">
      <div class="f-0 ticket_change" v-if="item.orderDetail.orderType==1">
        <img src="../../assets/images/ticketChange@2x.png" height="34"/>
      </div>
      <div class="order_ticket f-12 fh-12" >
        <div class="vux-1px-b" :class="item.orderDetail.orderStatus==7?'colorInvalid':'colorActive'">
          取票号：
          <span v-if="item.orderDetail&&item.orderDetail.order12306OrderId">{{item.orderDetail.order12306OrderId}}</span>
          <span v-else>暂无</span>
        </div>
      </div>
      <div flex="main:justify" class="order_info f-12 color-30">
        <div class="order_info_beside">
          <div>{{item.orderDetail.departureArea}}</div>
          <div class="f-21 text-blod">{{item.orderDetail.departureDate}}</div>
          <div v-if="item.orderDetail.departureDateFull">{{item.orderDetail.departureDateFull | dateFormat}}</div>
        </div>
        <div class="order_info_center" flex="dir:top main:center">
          <div class="text-center">{{item.orderDetail.trainNumber}}</div>
          <div @click="goTimeTable()" class="f-0"><img src="../../assets/images/trainTime30@2x.png" height="20"/></div>
          <div class="text-center">{{item.orderDetail.trainTime}}<span class="f-12 color-99">{{Day.get(item.orderDetail.trainTime)}}</span></div>
        </div>
        <div class="order_info_beside">
          <div class="text-right">{{item.orderDetail.destinationArea}}</div>
          <div class="f-21 text-right text-blod">{{item.orderDetail.destinationDate}}</div>
          <div class="text-right" v-if="item.orderDetail.destinationDateFull">{{item.orderDetail.destinationDateFull | dateFormat}}<span class="f-12 color-99">{{Day.get(item.orderDetail.destinationDateFull)}}</span></div>
        </div>
      </div>
    </div>
    <div v-for="(info,index) in item.orderRiderList" :key="index" class="order_item f-0" flex="dir:top main:justify">
      <div class="f-16 fh-16 color-30" flex="main:justify">
        <div class="text-blod">{{info.name}}</div>
        <div>{{info.seatType | seatCode}} ￥{{info.ticketPrice.toFixed(2)}}</div>
      </div>
      <div class="f-12 fh-12 color-99" flex="main:justify">
        <div>{{info.documentNo | idHide}}</div>
        <div class="color-30" v-if="info.coachName">{{info.coachName}}车厢{{info.seatName}}</div>
      </div>
      <div class="f-12 fh-12 color-e54" flex="box:last">
        <div v-if="item.orderDetail.orderStatus==0||(item.orderDetail.orderStatus==10&&info.retreatingStatus==2)" flex="dir:top main:right">待支付</div>
        <div v-if="item.orderDetail.orderStatus==4" flex="dir:top main:right">购票中</div>
        <div v-if="item.orderDetail.orderStatus==5||(item.orderDetail.orderStatus==10&&info.retreatingStatus==0)" flex="dir:top main:right">购票成功</div>
        <div v-if="item.orderDetail.orderStatus==10&&(info.retreatingStatus==8||info.retreatingStatus==3)" flex="dir:top main:right">改签受理中</div>
        <div v-if="item.orderDetail.orderStatus==10&&info.retreatingStatus==1" flex="dir:top main:right">改签占座受理中</div>
        <div v-if="item.orderDetail.orderStatus==10&&info.retreatingStatus==7" flex="dir:top main:right">购票成功（退票失败）</div>
        <div v-if="item.orderDetail.orderStatus==10&&info.retreatingStatus==5" flex="dir:top main:right">退票受理中</div>
        <div v-if="item.orderDetail.orderStatus==10&&info.retreatingStatus==9" flex="dir:top main:right">改签成功</div>
        <div v-if="item.orderDetail.orderStatus==10&&info.retreatingStatus==10" flex="dir:top main:right">已改签</div>
        <div v-if="item.orderDetail.orderStatus==10&&info.retreatingStatus==11" flex="dir:top main:right">改签失败</div>
        <div v-if="item.orderDetail.orderStatus==10&&info.retreatingStatus==12" flex="dir:top main:right">已取消</div>
        <div v-if="item.orderDetail.orderStatus==10&&info.retreatingStatus==13" flex="dir:top main:right">退款中（退票成功）</div>
        <div v-if="item.orderDetail.orderStatus==10&&info.retreatingStatus==14" flex="dir:top main:right">退款成功</div>
        <div v-if="item.orderDetail.orderStatus==10&&info.retreatingStatus==15" flex="dir:top main:right">退款失败</div>
        <div v-if="item.orderDetail.orderStatus==6" flex="dir:top main:right">购票失败</div>
        <div v-if="item.orderDetail.orderStatus==10&&info.retreatingStatus==6" flex="dir:top main:right">退票成功</div>
        <div v-if="item.orderDetail.orderStatus==7" flex="dir:top main:right">已取消</div>
        <div v-if="item.orderDetail.orderStatus==1" flex="dir:top main:right">占座中</div>
        <div v-else></div>
        <div flex="cross:center">
          <div @click="ticketChange(info.riderId)" v-if="item.orderDetail.orderStatus==5||(item.orderDetail.orderStatus==10&&info.retreatingStatus==0)||(item.orderDetail.orderStatus==10&&info.retreatingStatus==4&&info.orderType==0)" class="order_item_btn vux-1px color-e54 f-10" flex="cross:center main:center">改签</div>
          <div @click="ticketRefund(info.newSubOrderId,info.ticketPrice)" v-if="item.orderDetail.orderStatus==5||(item.orderDetail.orderStatus==10&&(info.retreatingStatus==0||info.retreatingStatus==7||info.retreatingStatus==9))||(item.orderDetail.orderStatus==10&&info.retreatingStatus==4&&info.orderType==0)" class="order_item_btn vux-1px color-e54 f-10" flex="cross:center main:center">退票</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  export default {
    props:['item','orderSn','gtgjOrderId'],
    data(){
      return {
        Day:new Map([[BZ.getDate(0),'今天'],[BZ.getDate(1),'明天'],[BZ.getDate(2),'后天']]),
      }
    },
    methods:{
      ...mapMutations('mainInfo',['DATE_CHANGE','CITY_CHANGE','ONLYHEIGHTRAIL_CHANGE','TICKETCHANGEORDER_CHANGE']),
      goTimeTable(){
        this.$router.push({
          path:'/traintTimetable',
          query:{
            departDates:this.item.orderDetail.departureDateFull.split(' ')[0], //出发日期
            trainNos:this.item.orderDetail.trainNumber, // 车次号
            startname:this.item.orderDetail.departureArea, //出发城市
            endname:this.item.orderDetail.destinationArea //终点城市
          }
        })
      },
      ticketChange(id){ //改签
        console.log("=====",this.item.orderDetail.departureDateFull);
        let ticketTime = new Date(this.item.orderDetail.departureDateFull);
        let currentTime = new Date();
        let overTime = (Date.parse(currentTime)+48*60*60*1000)>Date.parse(ticketTime)
        this.ONLYHEIGHTRAIL_CHANGE(false);
        this.DATE_CHANGE(this.item.orderDetail.departureDateFull.split(' ')[0]);
        this.CITY_CHANGE({
          beginCity:this.item.orderDetail.departureArea,
          endCity:this.item.orderDetail.destinationArea
        });
        this.TICKETCHANGEORDER_CHANGE(this.orderSn);
        let list=[];
        this.item.orderRiderList.forEach(info=>{
          if(this.item.orderDetail.orderStatus==5||(this.item.orderDetail.orderStatus==10&&info.retreatingStatus==0)||(this.item.orderDetail.orderStatus==10&&info.retreatingStatus==4&&info.orderType==0)){
            list.push(info)
          }
        });
        this.$router.push({
          path:'/ticketList',
          query:{
            type:'01', //表明是改签票
            id:id,
            list:JSON.stringify(list),
            onlyHeightRail:false,
            orderSn:this.gtgjOrderId,
            overTime:overTime?'01':'02' //超过48个小时传01，否则传02
          }
        })
      },
      ticketRefund(newSubOrderId,price){ //退票
        let list=[];
        this.item.orderRiderList.forEach(info=>{
          if(this.item.orderDetail.orderStatus==5||(this.item.orderDetail.orderStatus==10&&(info.retreatingStatus==0||info.retreatingStatus==7||info.retreatingStatus==9))||(this.item.orderDetail.orderStatus==10&&info.retreatingStatus==4&&info.orderType==0)){
            list.push(info)
          }
        })
        this.$router.push({
          path:'/applyRefund',
          query:{
            list:JSON.stringify(list),
            newSubOrderId:newSubOrderId,
            price:price,
            orderSn:this.orderSn
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .order{
    margin:8px 12px 0;
    .bgActive{
      background: url("../../assets/images/beijing1@2x.png") 0 0 no-repeat;
      background-size: 100% 117px;
    }
    .bgInvalid{
      background: url("../../assets/images/beijing4@2x.png") 0 0 no-repeat;
      background-size: 100% 117px;
    }
    .order_main{
      position: relative;
      height:117px;
      .order_ticket{
         padding:0px 10px;
        .colorActive{
          color:#ba8833;
          &::after{
            border-color:#ba8833 !important;
          }
        }
        .colorInvalid{
          color:#999999;
          &::after{
            border-color:#999999 !important;
          }
        }
        div{
          padding:9px 0px;
        }
      }
    }
    .order_item{
      height:85px;
      padding:15px 10px 11px;
      background: url("../../assets/images/beijing2@2x.png") 0 0 no-repeat;
      &:last-of-type{
        background: url("../../assets/images/beijing3@2x.png") 0 0 no-repeat;
        background-size: 100% 85px;
      }
      background-size: 100% 85px;
    }
  }
  .order_info{
    padding:7px 10px;
  }
  .order_item_btn{
    width:42px;
    height:16px;
    line-height: normal;
    margin-right:10px;
    &:last-of-type{
      margin-right:0px;
    }
    &::before{
      border-color:#E54100 !important;
    }
  }
  .ticket_change{
    position: absolute;
    right:0;
    top:0;
  }
</style>
