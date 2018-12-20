<template>
  <view-box ref="viewBox">
    <x-header slot="header" :left-options="{backText:'',preventGoBack:true}" @on-click-back="$exit()">
      火车票
      <div slot="right" @click="goOrder()">我的订单</div>
    </x-header>
    <Notice :text="notice"></Notice>
    <div class="city padding-primary bg-fff color-30">
      <div class="f-18 vux-1px-b relative" ref="box" flex="main:center cross:center">
        <div class="change_city absolute" flex="cross:center" ref="left" @click="selectCity('beginCity')">{{beginCity}}</div>
        <div class="f-0" @click="switchCity()">
          <img src="../../assets/images/city@2x.png" width="24"/>
        </div>
        <div class="change_city absolute" flex="cross:center" ref="right" @click="selectCity('endCity')">{{endCity}}</div>
      </div>
      <div class="vux-1px-b" flex="main:justify cross:center" @click="selectDate">
        <div>
          <span class="f-18 margin-r" >{{yearMonth | dateFormat}}</span><span class="f-12 color-99">{{days}}</span>
        </div>
        <div><img src="../../assets/img/right.png" height="14" width="8"/></div>
      </div>
      <div class="f-15" flex="cross:center">
       <Multi @select="onlyHeightRail=!onlyHeightRail" :selection="onlyHeightRail"/><span >只看高铁动车</span>
      </div>
      <div class="b-btn" @click="goList()">
        <x-button  action-type="button">搜索</x-button>
      </div>
    </div>
  </view-box>
</template>

<script>
  import { mapState,mapMutations,mapGetters } from 'vuex';
  import Notice from '../../components/notice/notice'
  import Multi from '../../components/select/multi'
  import SingleButton from '../../components/button/SingleButton'
  import  {getPaymentOrder} from '../../servers/trafficServer'
  export default {
    data(){
      return {
        notice:'欢迎使用薪起程APP购买火车票',
        onlyHeightRail:false, //是否只看高铁动车
        Day:new Map([[BZ.getDate(0),'今天'],[BZ.getDate(1),'明天'],[BZ.getDate(2),'后天']])
      }
    },
    computed:{
      ...mapState('mainInfo',['date','day','beginCity','endCity']),
      ...mapGetters(['userInfo']),
      yearMonth(){
        return this.date?this.date:BZ.getDate(0);
      },
      days(){
        return this.Day.get(this.yearMonth)
      },
    },
    mounted(){
      /*接受其他渠道传入的参数*/
      if(this.$route.query.beginCity&&this.$route.query.endCity&&this.$route.query.date){
        this.CITY_CHANGE({
          beginCity:this.$route.query.beginCity,
          endCity:this.$route.query.endCity
        });
        this.DATE_CHANGE(this.$route.query.date);
      }
    },
    components:{
      Notice,
      Multi,
      SingleButton
    },
    beforeDestroy(){
      this.DATE_CHANGE(this.yearMonth)
    },
    methods:{
      ...mapMutations('mainInfo',['CITY_CHANGE','DATE_CHANGE']),
      goList(){
        this.$router.push({
          path:'/ticketList',
          query:{
            onlyHeightRail:this.onlyHeightRail,
          }
        })
      },
      goOrder(){
        this.$router.push({
          path:'/order/0',
        })
      },
      selectCity(type){
        let _this = this;
        this.$selectCity({ title: '选择城市', type:'station' } ,function(value) {
          if(value){
            if(type=='beginCity'){
              _this.CITY_CHANGE({
                beginCity:value,
                endCity:_this.endCity
              })
            }else if(type=='endCity'){
              _this.CITY_CHANGE({
                beginCity:_this.beginCity,
                endCity:value
              })
            }
          }
        })
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
            checkDate: this.yearMonth
          },
          function(val) {
            if(val){
              _this.DATE_CHANGE(val)
            }
          }
        )
      },
      switchCity(){
        this.CITY_CHANGE({beginCity:this.endCity,endCity:this.beginCity})
      }
    }
  }
</script>

<style lang="less" scoped>
  .icon_city{

  }
  .city{
    &>div{
      height:46px;
    }
    padding-bottom:18px;
  }
  .margin-r{
    margin-right:10px;
  }
  .b-btn{
    margin-top:5px;

  }
  .change_city{
    &:first-child{
      left:0;
    }
    &:last-child{
      right:0
    }
  }
</style>
