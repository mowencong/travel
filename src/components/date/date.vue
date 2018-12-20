<template>
  <div flex="main:justify cross:center" class="head color-primary f-12 bg-30 padding-primary">
    <div :style="{opacity:(startTime==date)?'0.5':'1'}" @click="changeDate('pre')">前一天</div>
    <div flex="cross:center" @click="selectDate">
      <img src="../../assets/images/calendar@2x.png" width="15"/>
      <span class="date_margin">{{date | dateFormat}}</span>
      <span>{{weekDay[index]}}</span>
    </div>
    <div :style="{opacity:(endTime==date)?'0.5':'1'}" @click="changeDate('after')">后一天</div>
  </div>
</template>
<script>
  import { mapState,mapMutations } from 'vuex'
  export default {
    data(){
      return {
        startTime:BZ.getDate(0),
        // endTime:BZ.getDate(29),
        weekDay:['周日','周一','周二','周三','周四','周五','周六'],
      }
    },
    props:['date','endTime'],
    mounted(){

    },
    computed:{
      index(){
        return new Date(this.date).getDay()
      }
    },
    methods:{
      ...mapMutations('mainInfo',['DATE_CHANGE']),
      changeDate(type){
        if(type=='pre'){
          if(this.startTime!=this.date){
            this.DATE_CHANGE(BZ.getDate(0,this.date,-1))
          }
        }else if(type=='after'){
          if(this.endTime!=this.date){
            this.DATE_CHANGE(BZ.getDate(0,this.date,1))
          }
        }
      },
      selectDate(){
        let _this= this;
        let startDateArr = BZ.getDate(0).split('-');
        let startDate = startDateArr[0]+'-'+startDateArr[1];
        let disabledDateStart = BZ.getDate(0);
        let disabledDateEnd = BZ.getDate(29);
        this.$selectDate(
          {
            // 标题
            title: '选择日期',
            // 起始日期
            startDate: startDate,
            // 总共几个月
            duration: 3,
            // 不可操作的时间(起始到哪一天))
            disabledDateStart: disabledDateStart,
            // 不可操作的时间(截至到哪一天))
            disabledDateEnd: disabledDateEnd,
            // 选择类型
            checkType: 'single',
            // 选择的时间
            checkDate: this.date
          },
          function(val) {
            if(val){
              _this.DATE_CHANGE(val)
            }
          }
        )
      }
    }
  }
</script>
<style lang="less" scoped>
.head{
  height:30px;
}
  .date_margin{
    margin:0 4px;
  }
</style>
