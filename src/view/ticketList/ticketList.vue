<template>
  <view-box ref="viewBox">
    <div slot="header">
      <x-header slot="header" :left-options="{backText:''}">
        <div flex="cross:center main:center">{{beginCity}}<span class="head_right">→</span>{{endCity}}<span v-if="type">（改签）</span></div>
        <div v-if="type" slot="right" @click="changeStation('endCity')">变更到站</div>
      </x-header>
      <Date :date="date" :endTime="endTime"/>
    </div>
      <div class="main_list" >
        <bz-scroll-list style="height: 100%" :pulldown="true" :pullup="false" @pullingDown="onRefresh"  ref="scrollList" :data="trafficList">
          <div v-if="currentClass.index==1">
            <list-item v-if="/[GD]/.test(item.trainNo)"  v-for="(item,index) in trafficList" :key="index" :item="item" @click.native="goDetail(item)"></list-item>
          </div>
          <div v-else-if="currentClass.index==2">
            <list-item v-if="!/[GD]/.test(item.trainNo)"  v-for="(item,index) in trafficList" :key="index" :item="item" @click.native="goDetail(item)"></list-item>
          </div>
          <div v-else>
            <list-item v-for="(item,index) in trafficList" :key="index" :item="item" @click.native="goDetail(item)"></list-item>
          </div>
          <!--<div style="height:70px"></div>-->
          <bz-no-data style="height:100%;" v-if="noData"/>
        </bz-scroll-list>
      </div>
    <modal-bottom slot="bottom" @select="filte"></modal-bottom>
    <div>
      <div v-transfer-dom >
        <popup v-model="show1" >
          <!-- group already has a top border, so we need to hide header's bottom border-->
          <popup-header
            left-text="取消"
            right-text="确定"
            title=""
            :show-bottom-border="false"
            @on-click-left="ticketSelect"
            @on-click-right="ticketSelect"></popup-header>
          <div class="ticket_filter color-30 f-14" flex="box:first">
            <div class="ticket_l bg-fff" flex="cross:center">
              <div class="f-0">
                <img src="../../assets/images/train@2x.png" width="14"/>
              </div>
              <div>
                <span>车型选择</span>
              </div>
            </div>
            <div class="ticket_r bg-fff">
              <div v-for="(item,index) in ticketClass" :key="index" class="ticket_r_item vux-1px-b" flex="main:justify cross:center">
                <div >
                  {{item}}
                </div>
                <div @click="limited(index)">
                  <img :src="(index==currentClass.index)?path[1]:path[0]" width="16" style="margin-right:12px;"/>
                </div>
              </div>
            </div>
          </div>
        </popup>
      </div>
    </div>

  </view-box>
</template>
<script>
  import { mapState,mapMutations } from 'vuex'
  import { Popup,PopupHeader,TransferDom  } from 'vux'
  import Date from '../../components/date/date'
  import ListItem from '../../components/listItem/listItem'
  import {ticketList} from '../../servers/trafficServer'
  import ModalBottom from '../../components/modalBottom/modalBottom'
  import LoadRefresh from '../../components/loadRefresh/loadRefresh'
  import  Multi from '../../components/select/multi'
  export default {
    data(){
      return {
        trafficList:[],
        time:BZ.getDate(0),
        ordinary:false, //普通列车
        scrollData: {
          noFlag: false //暂无更多数据显示（本页面无用处）
        },
        show1:false, //控制选择火车类型的弹窗
        ticketClass:['不限','高铁动车','普通列车'],
        currentClass:{index:0},  // 0不限  1高铁动车  2普通列车
        path:[
          require('../../assets/images/multi-n@2x.png'),
          require('../../assets/images/multi-y@2x.png'),
        ],
        httpShow:false,  //用于请求数据后判断页面显示状态
        type:false, //表示是否从改签入口进来
        endTime:BZ.getDate(29), //结束时间
        a:true,
        noData:false,  //暂无数据展示
        obj:{}
      }
    },
    computed:{
      ...mapState('mainInfo',['beginCity','endCity','date'])
    },
    watch:{
      date(){
        this.getTicketList()
      },
      endCity(){
        this.getTicketList()
      }
    },
    mounted(){
      if(this.$route.query.type){
        this.type = this.$route.query.type=='01'?true:false;
        this.endTime = this.$route.query.overTime=='01'?this.date:BZ.getDate(29)
      }
      let onlyHeightRail;
      if(this.$route.query.hasOwnProperty('onlyHeightRail')){
        onlyHeightRail = this.$route.query.onlyHeightRail.toString();
      }else{
        onlyHeightRail = 'false'
      }
      this.currentClass.index = onlyHeightRail=='false'?0:1;
      this.getTicketList();
    },
    methods:{
      ...mapMutations('mainInfo',['DATE_CHANGE','CITY_CHANGE']),
      changeStation(type){
        let _this=this;
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
      getTicketList(){
        this.httpShow=false;
        this.$vux.loading.show();
        ticketList({
          departdate:this.date,
          departname:this.beginCity,
          arrivename:this.endCity
        }).then(res=>{
          this.$vux.loading.hide();
          console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
          console.log("车次列表",res);
          console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
          if(res.data.result=='fail'){
            this.$vux.alert.show({
              title:'提示',
              content:'查询异常，请稍后再试!'
            })
          }else{
            if(res.data.parsedData){
              this.trafficList = res.data.parsedData.trainInfos;
            }else{
              this.trafficList=[]
            }
            if(this.trafficList.length==0){
              this.noData =true;
            }else{
              this.noData =false;
            }
            this.filte(this.obj);
            this.$refs['scrollList'].finishPullDown()
          }
        })
      },
      filte(obj){
        this.obj=obj;
        if(obj.Index==1){
          this.trafficList.sort((a,b)=>{
            return a[obj.type] -b[obj.type]
          })
        }else if(obj.Index==2){
          this.trafficList.sort((a,b)=>{
            return b[obj.type] -a[obj.type]
          })
        } else if(obj=='筛选'){
          this.show1 =true
        }
      },
      goDetail(obj){
        if(obj.priceList.length==0){
          this.$vux.alert.show({
            title:'温馨提示',
            content:obj.note
          })
        }else{
          this.$router.push({
            path:'/trainDetail',
            query:{
              obj:JSON.stringify({
                departdate:this.date,
                departname:this.beginCity,
                arrivename:this.endCity,
                trainNo:obj.trainNo,
              }),
              type:this.$route.query.type,
              list:this.$route.query.list,
              id:this.$route.query.id,
              orderSn:this.$route.query.orderSn
            }
          })
        }
      },
      async onRefresh (){
        await this.getTicketList();
      },
      limited(index){
        this.currentClass= {index:index};
      },
      ticketSelect(){
        this.show1 = false;
        // this.getTicketList();
      }
    },
    components:{
      Date,
      ListItem,
      ModalBottom,
      LoadRefresh,
      PopupHeader,
      Popup,
      Multi
    },
    directives: {
      TransferDom
    }
  }
</script>
<style lang="less" scoped>
  .head_right{
    margin:0 6px;
  }
  .main_list{
    padding-bottom:74px;
    position: relative;
    height:100%;
  }
  .ticket_filter{
    height:218px;
    .ticket_l{
      width:125px;
      height:43px;
      img{
        margin-right:10px;
        margin-left:12px;
      }
    }
    .ticket_r{
      height:100%;
      padding-left:6px;
      .ticket_r_item{
        height:43px;
        &>div:nth-of-type(1){
          margin-left:9px;
        }
      }
    }
  }
</style>
