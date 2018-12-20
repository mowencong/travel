<template>
  <view-box ref="viewBox">
    <x-header slot="header" :left-options="{backText:''}">
      选择乘车人
      <div slot="right" @click="newPassenger()">新建</div>
    </x-header>
    <div v-for="(item,index) in parssengerList" :key="index" class="demo_slide vux-1px-b" flex="cross:center">
      <swipeout>
        <swipeout-item @on-close="" @on-open="" transition-mode="follow">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick(item.id,index)" type="warn">删除</swipeout-button>
          </div>
          <div slot="content" class="demo-content padding-primary" flex="main:justify cross:center" @click="addPassenger(item)">
            <div flex="cross:center" >
              <div class="f-0 icon">
                <img :src="(item.flag)?arr[1]:arr[0]" width="20" />
              </div>
              <div class="color-30">
                <div class="f-16">{{item.name}}</div>
                <div class="f-12">{{certificateObj[item.documenttype]}} {{item.documentNo}}</div>
              </div>
            </div>
            <div class="f-0" @click.stop="editPassenger(item)">
              <img src="../../assets/images/modify@2x.png" width="20"/>
            </div>
          </div>
        </swipeout-item>
      </swipeout>
    </div>
    <bz-no-data v-if="show&&parssengerList.length==0"/>
    <div class="footer bg-fff f-16" slot="bottom" flex="box:last cross:center">
      <div class="color-primary padding-primary">
        已选（{{addPassengerId.size}}/5）
      </div>
      <div class="finish color-ff" :class="addPassengerId.size>0?'bg-primary':'bg-99'" flex="cross:center main:center" @click="finish()">
        完成
      </div>
    </div>
  </view-box>
</template>
<script>
  import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
  import { selectPassenger,deletePassenger } from '../../servers/trafficServer'
  import { mapGetters,mapMutations,mapState } from 'vuex'
  export default {
    data(){
      return {
        arr:[
          require('../../assets/images/single-n@2x.png'),
          require('../../assets/images/single-y@2x.png'),
        ],
        parssengerList:[],
        certificateObj:{
          '1':'二代身份证',
          'C':'港澳通行证',
          'B':'护照',
          'G':'台湾通行证'
        },
        show:false
      }
    },
    computed:{
      ...mapGetters(['userInfo']),
      ...mapState('mainInfo',['addPassengerId']),
    },
    mounted(){
      this.$vux.loading.show();
      selectPassenger({
        xqcUserid:this.userInfo.id
      }).then(res=>{
        this.$vux.loading.hide();
        console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
        console.log("乘客人列表",res);
        console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
        this.show=true;
        res.data.map(item=>{ // 解决再次渲染bug
          if(this.addPassengerId.has(item.id)){
            item.flag = true
          }else {
            item.flag = false
          }
        });
        this.parssengerList = res.data;
      })
    },
    methods:{
      ...mapMutations('mainInfo',['ADDPASSENGERID_CHANGE']),
      newPassenger(){
        this.$router.push({
          path:'/newPassenger'
        })
      },
      editPassenger(item){
        // item.documenttype = this.certificateObj[item.documenttype];
        this.$router.push({
          path:'/editPassenger',
          query:{
            item:JSON.stringify(item)
          }
        })
      },
      async addPassenger(item){
        if(item.flag){
          await this.ADDPASSENGERID_CHANGE(item.id);
          item.flag = !item.flag;
        }else {
          if(this.addPassengerId.size<5){
            await this.ADDPASSENGERID_CHANGE(item.id);
            item.flag = !item.flag;
          }
        }
      },
      onButtonClick(id,index){
        this.$vux.loading.show();
        deletePassenger({riderId:id}).then(res=>{
          this.$vux.loading.hide();
          console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
          console.log("删除了",res);
          console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
          if(res.data>0){
            this.parssengerList.splice(index,1)
          }
        })
      },
      finish(){
        if(this.addPassengerId.size>0){
          history.go(-1);
        }
      },
    },
    beforeDestroy(){


    },
    components:{
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    }
  }
</script>
<style lang="less" scoped>
  .demo-content {
    /*padding: 20px 12px;*/
    height:63px;
  }
  .icon{
    margin-right:15px;
    height:20px;
  }
  .footer{
    height:45px;
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    .finish{
      width:130px;
      height:100%;
    }
  }
</style>
