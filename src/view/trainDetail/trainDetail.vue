<template>
  <view-box ref="viewBox">
    <x-header slot="header" :left-options="{backText:''}">
      车次详情<span v-if="type">（改签）</span>
    </x-header>
    <train-top :detail="Info"></train-top>
    <train-item v-for="(item,index) in Info.priceList" :key="index" :item="item" @reserve="reserve"/>
  </view-box>
</template>
<script>
  import TrainTop from '../../components/trainTop/trainTop';
  import TrainItem from '../../components/trainItem/trainItem'
  import {ticketList} from '../../servers/trafficServer'
  import {mapMutations} from 'vuex'
  export default {
    data(){
      return {
        Info:{},
        type:false, //表明是否是从改签入口进来
      }
    },
    mounted(){
      this.obj = JSON.parse(this.$route.query.obj);
      console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
      console.log("路由信息",this.obj);
      console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
      if(this.$route.query.type=='01'){
        this.type=true;
      }
      let obj = {departdate:this.obj.departdate,departname:this.obj.departname,arrivename:this.obj.arrivename};
      this.$vux.loading.show();
      ticketList(obj).then(res=>{
        this.$vux.loading.hide();
        console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
        console.log("列表页",res.data.parsedData.trainInfos);
        console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
        if(res.data.result=='fail'){
          this.$vux.alert.show({
            title:'提示',
            content:'查询异常，请稍后再试!'
          })
        }else{
          let arr = res.data.parsedData.trainInfos;
          arr.forEach(item=>{
            if(item.trainNo==this.obj.trainNo){
              this.Info = item;
              console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
              console.log("detail",this.Info);
              console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
              return
            }
          })
        }
      })
    },
    methods:{
      ...mapMutations('mainInfo',['SEAT_CHANGE']),
      reserve(item){
        this.SEAT_CHANGE({...item});
        this.$router.push({
          path:'/seat',
          query:{
            obj:JSON.stringify(this.Info),
            // item:JSON.stringify(item),
            type:this.$route.query.type,
            id:this.$route.query.id,
            list:this.$route.query.list,
            orderSn:this.$route.query.orderSn
          }
        })
      }
    },
    components:{
      TrainTop,
      TrainItem
    }
  }
</script>
<style lang="less" scoped>

</style>
