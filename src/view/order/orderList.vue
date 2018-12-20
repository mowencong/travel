<template>
  <!--<div class="main_list" >-->
    <bz-scroll-list style="height: 100%" :pulldown="true" :pullup="true" @pullingDown="handleTop" @pullingUp="handleBottom" ref="scrollList" :data="orderArr">
        <Item :item="item" v-for="(item,index) in orderArr" :key="index" @delete="deleteOrder(index)" :cancel="cancel" @click.native="goOrderDetail(item.orderSn)"/>
    </bz-scroll-list>
  <!--</div>-->
</template>
<script>
  import Item from './orderListItem'
  import LoadRefresh from '../../components/loadRefresh/loadRefresh'
  import { orderList } from '../../servers/trafficServer'
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return {
        num:5,
        scrollData: {
          noFlag: false //暂无更多数据显示（本页面无用处）
        },
        httpShow:false,  //用于请求数据后判断页面显示状态
        orderArr:[],
        page:1, //当前页数
        rows:7 //每页显示条数
      }
    },
    props:['orderState'],
    computed:{
      ...mapGetters(['userInfo']),
    },
    mounted(){
    },
    watch:{
      orderState(){
        this.page = 1;
        this.orderArr = [];
        this.getOrderList('up')
        setTimeout(()=>{
          this.$refs.scrollList.scrollTo(0,0)
        },100)
      }
    },
    methods:{
      getOrderList(type){
        this.httpShow = false;
        this.$vux.loading.show();
        orderList({
          orderType:this.orderState,
          xqcUserId:this.userInfo.id,
          // xqcUserId:48034,
          page:this.page,
          rows:this.rows
        }).then(res=>{
          this.$vux.loading.hide();
          this.httpShow = true;
          console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
          console.log("订单列表",res.data.list);
          console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
          if(type=='down'){
            this.$refs['scrollList'].finishPullDown();
            this.$nextTick(()=>{
              this.$refs.scrollList.scrollTo(0,0)
            })
          }else if(type=='up'){
            if(res.data.list.length<this.rows){
              this.$refs['scrollList'].finishPullUp(3)
            }else{
              this.$refs['scrollList'].finishPullUp(1)
            }
          }
          this.orderArr =this.orderArr.concat(res.data.list);
        })
      },
      cancel(){
        this.page = 1;
        this.orderArr = [];
        this.getOrderList()
        setTimeout(()=>{
          this.$refs.scrollList.scrollTo(0,0)
        },100)
      },
      deleteOrder(index){
        this.orderArr.splice(index,1);
      },
      async handleTop(){
        this.page = 1;
        this.orderArr = [];
        await this.getOrderList('down');
      },
      async handleBottom(){
        this.page = this.page+1;
        await this.getOrderList('up');
      },
      goOrderDetail(orderSn){
        this.$router.push({
          path:'/orderDetail',
          query:{
            orderSn:orderSn
          }
        })
      }
    },

    components:{
      Item,
      LoadRefresh,
    }
  }
</script>
<style scoped>

</style>
