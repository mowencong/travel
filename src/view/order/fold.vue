<template>
    <div class="wrap bg-fff">
      <div class="price" flex="cross:center main:justify" @click="toggle()">
        <div>
          退款金额：<span>{{(-item.amountOfPayment).toFixed(2)}}</span>元
        </div>
        <div class="f-0" ref="img">
          <img src="../../assets/images/rotate.png" width="20"/>
        </div>
      </div>
      <div class="progress" ref="fold" style="display: none">
        <div class="fail c-30" >
          退票/改签成功
        </div>
        <div class="c-30" :class="item.refundStatus==9?'refunds_y':'refunds_n'">
          <p>退款中</p>
          <p class="introduction c-999" v-if="item.refundStatus==8">退款{{(-item.amountOfPayment).toFixed(2)}}元，预计24小时内退还至您的支付账户， 请留意您的支付账单明细。</p>
          <p class="introduction c-999" v-else></p>
        </div>
        <div :class="item.refundStatus==9?'account_y c-30':'account_n c-999'">
          退款已到账
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    props:['item'],
    methods:{
      toggle(){
        let or = this.$refs.fold.style.display;
        if(or=='none'){
          this.$refs.fold.style.display='block';
          this.$refs.img.style.transform='rotate(-180deg)';
        }else{
          this.$refs.fold.style.display='none';
          this.$refs.img.style.transform='rotate(0deg)';
        }
      }
    }
  }
</script>


<style lang="less" scoped>
  .wrap{
    padding:15px 12px 0px;
  }
  .progress{
    /*display: none;*/
  }
  .price{
    height:45px;
    background-color: #FFECCA;
    padding:0px 15px;
    font-size:16px;
    span{
      color:#E54100;
    }
  }
  .progress{
    margin-top:30px;
    margin-left:40px;
    /*height:205px;*/
    font-size:16px;
    line-height: 16px;
  }
  .fail{
    height:80px;
    position: relative;
    &::before{
      content:'';
      position: absolute;
      width:15px;
      height:15px;
      border-radius: 50%;
      left:-25px;
      top:0px;
      background: #BA8833;
      z-index: 10;
    }
    &::after{
      content:'';
      width:1px;
      height:72px;
      background: rgba(186,136,51,0.5);
      position: absolute;
      left:-18px;
      top:15px;
      z-index: 8;
    }
  }
  .refunds_n{
    height:80px;
    position: relative;
    &::before{
      content:'';
      position: absolute;
      width:15px;
      height:15px;
      border-radius: 50%;
      left:-25px;
      top:0px;
      background: #BA8833;
      z-index: 10;
    }
    &::after{
      content:'';
      width:1px;
      height:72px;
      background: rgba(204,204,204,0.5);
      position: absolute;
      left:-18px;
      top:15px;
      z-index: 8;
    }
  }
  .refunds_y{
    height:80px;
    position: relative;
    &::before{
      content:'';
      position: absolute;
      width:15px;
      height:15px;
      border-radius: 50%;
      left:-25px;
      top:0px;
      background: #BA8833;
      z-index: 10;
    }
    &::after{
      content:'';
      width:1px;
      height:72px;
      background: rgba(186,136,51,0.5);
      position: absolute;
      left:-18px;
      top:15px;
      z-index: 8;
    }
  }
  .account_n{
    position: relative;
    &::before{
      content:'';
      position: absolute;
      width:15px;
      height:15px;
      border-radius: 50%;
      left:-25px;
      top:0px;
      background: #CCCCCC;
      z-index: 10;
    }
  }
  .account_y{
    position: relative;
    &::before{
      content:'';
      position: absolute;
      width:15px;
      height:15px;
      border-radius: 50%;
      left:-25px;
      top:0px;
      background: #BA8833;
      z-index: 10;
    }
  }
  .introduction{
    width:92%;
    margin-top:8px;
    font-size:12px;
    line-height: 18px;
  }
</style>
