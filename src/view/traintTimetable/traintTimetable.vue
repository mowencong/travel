<template>
    <view-box ref="viewBox" style="background:#fff;">
      <div slot="header">
        <x-header slot="header" :left-options="{backText:''}">
            <span>{{trainNos }}</span>时刻表
        </x-header>
        <div class="demo f-14 padding-primary vux-1px-b text-center" flex="box:mean cross:center">
          <div>车站名称</div>
          <div>到达</div>
          <div>出发</div>
          <div>停留</div>
        </div>
      </div>

    <ul class="timeList">
        <li  v-for="(timeList,index) in numberdata" :key="index" class="demos f-14 fh-14 padding-primary text-center" flex="box:mean">
            <div  class="text-center times">
                 <span class="round">
                    <span class="line"></span>
                </span>
                <span class="listWord yellow" v-if="startname === timeList.stationName || endname === timeList.stationName">{{timeList.stationName}}</span>
                <span class="listWord" v-else>{{timeList.stationName}}</span>

            </div>
            <div v-if="endname ===timeList.stationName" class="yellow">{{timeList.arriveTime  || timeList.departTime}}</div>
            <div  v-else>{{timeList.arriveTime  || timeList.departTime}}</div>

            <div v-if="startname === timeList.stationName" class="yellow" >{{ timeList.arriveTime  || timeList.departTime}}</div>
            <div v-else >{{timeList.departTime || timeList.arriveTime  }}</div>
            <div v-if="timeList.stayTime > 0">{{timeList.stayTime}}分钟</div>
            <div v-else >---</div>
        </li>
    </ul>
    <div style="height:44px"></div>
    </view-box>

</template>

<script>
import {trainTime} from '../../servers/trafficServer'
export default {
     data(){
      return {
        numberdata:[],//这是列表数据态
        //Info:{}
        trainNos: '',
		    startname: '',
		    endname: ''
      }
    },
    //页面初始化
      mounted(){
       this.getDataList(); //执行

     },
     methods:{
         //获取时间列表
         getDataList: function(){
            // 变量
            let departDates = this.$route.query.departDates;
            this.startname = this.$route.query.startname ;
            this.endname = this.$route.query.endname ;
            this.trainNos = this.$route.query.trainNos ;
           this.$vux.loading.show();
            trainTime({ trainNo:this.trainNos, departDate:departDates}).then(res=>{
              this.$vux.loading.hide();
               var data = res.data;
               this.numberdata  = data.tableResult.trainInfo.stationList;

            })
        }

     },

}
</script>

<style lang="less" scoped>
  .times{
    position: relative;
    height: auto;
  }
  .demo{
    height: 43px;
    color: #999;
  }
  .demos{
    height: 43px;
    color: #303030;
  }
  .demos:first-child .round,.demos:last-child .round{
    background: #BA8833;
  }
  .demos:last-child .line{
    display: none;
  }
  .timeList{
    margin-top: 20px;
  }
  .yellow{
    color: #BA8833;
  }
  .round{
    border-radius: 50%;
    width: 10px; height: 10px;
    display: inline-block;
    border: 1px solid #BA8833;
    position: absolute;
    left: 0;
  }
  .line{
    display: inline-block;
    position: absolute;
    top: 10px;
    left: 50%;
    margin-left: -1px;
    color: #BA8833;
    height:33px;
    width: 1px;
    background: #BA8833;
  }
  .listWord{
    width:78%;
    text-align: left;
    display: inline-block;
    height: 100%;
    margin-left: 8px;
  }
</style>
