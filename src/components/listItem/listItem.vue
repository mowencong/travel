<template>
  <div class="padding-primary bg-fff margin-b-8">
    <div class="item_top" flex="main:justify">
      <div class="item_main" flex="main:justify">
        <div flex="dir:top main:justify" class="item_main_info color-30">
          <div class="f-21 fh-21 item_time text-bold">{{item.departTimeStr}}</div>
          <div class="f-12 fh-12 item_time">{{item.departStation}}</div>
        </div>
        <div flex="dir:top main:center cross:center" class="f-10 fh-10">
          <div>{{item.trainNo}}</div>
          <div class="f-0 roto_img"><img src="../../assets/images/line@2x.png" width="50"/></div>
          <div>{{item.trainTime}}</div>
        </div>
        <div flex="dir:top main:justify" class="item_main_info">
          <div class="f-21 fh-21 item_time text-right text-bold">{{item.arriveTimeStr}}</div>
          <div class="f-12 fh-12 item_time text-right">{{item.arriveStation}}</div>
        </div>
      </div>
      <div class="color-e54 " v-if="item.priceList.length!=0">
        <span class="f-12">￥</span><span class="f-21 fh-21 text-bold">{{item.minPrice}}</span><span class="f-12 color-99">起</span>
      </div>
    </div>
    <div class="item_bottom f-10 fh-16" >
      <div v-if="item.priceList.length==0" class="color-e54 no_ticket_tips" >
        {{item.note}}
      </div>
      <div v-else v-for="(ticket,index) in item.priceList" :key="index" class="inline_block">
        <span :class="(ticket.yuPiao==0)?'color-99':'color-30'">{{ticket.seatType}}:</span>
        <span :class="(ticket.yuPiao==0)?'color-99':(ticket.yuPiao!='有票')?'color-e54':'color-30'">{{ticket.yuPiao | traffic}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['item'],
  }
</script>
<style lang="less" scoped>
  .item_top{
    border-bottom:1px dashed #ACACAC;
    padding-top:15px;
    padding-bottom:10px;
    width:100%;
    .item_main{
      width:75%;
      .item_time{
        width:60px;
      }
      .roto_img{
        margin-top:5px;
      }
      .item_main_info{
        height:38px;
      }
    }
  }
  .inline_block{
    display: inline-block;
  }
  .item_bottom{
    padding:7px 0px 12px;
    div:nth-child(1){
      text-align: left;
    };
    div:nth-child(2){
      text-align: center;
    };
    div:nth-child(3){
      text-align: right;
    };
    div:nth-child(4){
      text-align: right;
    };
    &>div{
      width:25%;
    }
  }
  .no_ticket_tips{
    /*height:40px;*/
  }
</style>
