<template>
  <view-box ref="viewBox">
    <x-header slot="header" :left-options="{backText:''}">
      申请退票
      <div slot="right" @click="applyTips()">退票须知</div>
    </x-header>
    <notice text="若您已在车站办理退票，款项将在15个工作日内原路退回，请您耐 心等待！" />
    <!--退票联系人-->
    <div class="contacts bg-fff">
      <div class="contacts_title vux-1px-b color-30 f-16 padding-primary" flex="cross:center">
        请选择需退票的乘车人
      </div>
      <div class="contacts_info">
        <div class="contacts_info_item " :class="(index!=list.length-1)?'vux-1px-b':''" v-for="(item,index) in list" :key="index">
          <div flex="main:justify cross:center">
            <div flex="dir:top main:center">
              <div class="color-30 f-16 fh-16" style="margin-bottom: 7px">{{item.name}}</div>
              <div class="color-99 f-12 f-12">身份证 {{item.documentNo | idHide}}</div>
            </div>
            <div class="f-0" @click="refundPassenger(item.newSubOrderId)">
              <img :src="newSubOrderId.indexOf(item.newSubOrderId)>-1?imgPath[1]:imgPath[0]" width="16" style="margin-right:12px"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--退票金额-->
    <div class="price bg-fff">
      <div flex="main:justify cross:center" class="vux-1px-b padding-primary">
        <div flex="dir:top main:center" >
          <div class="color-30 f-16 fh-16" style="margin-bottom:7px">预计退还金额</div>
          <div class="color-99 f-12 fh-12">以铁路部门实际退还为准</div>
        </div>
        <div class="color-e54 f-18"><span class="f-12">￥</span>{{(price*newSubOrderId.length*0.9).toFixed(2)}}</div>
      </div>
      <div class="padding-primary">
        <div flex="main:justify">
          <div >火车票价</div>
          <div class="f-16 color-e54"><span class="f-12">￥</span>{{(price*newSubOrderId.length).toFixed(2)}}</div>
        </div>
        <div flex="main:justify">
          <div>预估手续费</div>
          <div class="f-16 color-e54">-<span class="f-12">￥</span>{{(price*newSubOrderId.length*0.1).toFixed(2)}}</div>
        </div>
        <div class="color-99 f-12" flex="cross:center">
          <div>距发车时间24-48小时(不含)，收取票价10%</div>
          <div class="f-0"><img src="../../assets/images/time.png" width="15" style="margin-left:5px"/></div>
        </div>
      </div>
    </div>
    <!--申请退票-->
    <div class="apply">
       <x-button style="background-color:#E54100" @click.native="apply()">申请退票</x-button>
    </div>
  </view-box>
</template>
<script>
  import Notice from '../../components/notice/notice'
  import {applyRefund} from '../../servers/trafficServer'
  export default {
    data(){
      return {
        imgPath:[
          require('../../assets/images/multi-n@2x.png'),
          require('../../assets/images/multi-y@2x.png'),
        ],
        list:[],
        newSubOrderId:[],
        price:'',
        orderSn:''
      }
    },
    mounted(){
      this.list = JSON.parse(this.$route.query.list);
      this.newSubOrderId.push(this.$route.query.newSubOrderId);
      this.price = this.$route.query.price;
      this.orderSn = this.$route.query.orderSn;
    },
    methods:{
      applyTips(){
        this.$router.push({
          path:'/ticketRefund'
        })
      },
      refundPassenger(newSubOrderId){
        let index =this.newSubOrderId.indexOf(newSubOrderId);
        if(index>-1){
          this.newSubOrderId.splice(index,1);
        }else {
          this.newSubOrderId.push(newSubOrderId);
        }
      },
      apply(){

        let length = this.newSubOrderId.length;
        if(length==0){
          this.$vux.alert.show({
            title:'温馨提示',
            content:'请选择退票乘客'
          })
          return
        }else{
          this.$vux.loading.show();
          applyRefund({subOrderIds:this.newSubOrderId.join(',')}).then(res=>{
            console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
            console.log("退票",res);
            console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
            this.$vux.loading.hide();
            if(res.data.sum==length){
              this.$router.push({
                path:'/orderDetail',
                query:{
                  orderSn:this.orderSn
                }
              })
            }else {
              let msg='';
              res.data.errorMsgList.forEach(item=>{
                msg=msg+item.msg;
              });
              this.$vux.alert.show({
                title: '温馨提示',
                content: msg,
              })
            }
          })
        }
      }
    },
    components:{
      Notice
    }
  }
</script>
<style lang="less" scoped>
.contacts{
  margin-top: 8px;
  .contacts_title{
    height:45px;
  }
  .contacts_info_item{
    &>div{
      height:100%;
      &:last-child:after{
        border:0 !important;
      }
    }
    height:63px;
    padding-left:12px;
  }
}
  .price{
    margin-top:8px;
    &>div:nth-child(1){
      height:63px;
    }
    &>div:nth-child(2){
      height:93px;
      &>div:nth-child(1){
        margin:11px 0px;
      }
    }
  }
  .apply{
    margin-top:20px;
    padding:0 16px;
  }
</style>
