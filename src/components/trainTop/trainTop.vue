<template>
  <div class="train_header bg-30 color-primary f-12 padding-primary" flex="main:justify cross:center">
    <div>
      <div>{{detail.departStation}}</div>
      <div class="f-21 text-blod">{{detail.departTimeStr}}</div>
      <div v-if="detail.departTime">{{detail.departTime |dateFormat}}</div>
    </div>
    <div>
      <div class="text-center">{{detail.trainNo}}</div>
      <div @click="goTimeTable()" class="text-center f-0"><img src="../../assets/images/trainTimeba@2x.png" width="103"/></div>
      <div class="text-center">{{detail.trainTime}}</div>
    </div>
    <div>
      <div class="text-right">{{detail.arriveStation}}</div>
      <div class="f-21 text-right text-blod">{{detail.arriveTimeStr}}</div>
      <div v-if="detail.arriveTime" class="text-right">{{detail.arriveTime |dateFormat}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['detail'],
    data(){
      return {

      }
    },
    methods:{
      goTimeTable(){
        this.$router.push({
          path:'/traintTimetable',
          query:{
            departDates:this.detail.departTime.split(' ')[0], //出发日期
            trainNos:this.detail.trainNo, // 车次号
            startname:this.detail.departStation, //出发城市
            endname:this.detail.arriveStation //终点城市
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .train_header{
    height:84px;
  }
</style>
