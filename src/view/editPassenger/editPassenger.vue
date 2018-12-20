<template>
  <view-box ref="viewBox">
    <x-header slot="header" :left-options="{backText:''}">
      编辑乘客信息
    </x-header>
    <div class="bg-fff new_content">
      <div class="new_item color-30 f-16">
        <x-input text-align="right" title="姓名" v-model="name"></x-input>
      </div>
      <group gutter="0">
        <popup-picker title="证件类型"  :data="certificatesList" v-model="certificate"></popup-picker>
      </group>
      <div class="new_item vux-1px-b color-30 f-16" >
        <x-input text-align="right" title="证件号码" v-model="documentNo"></x-input>
      </div>
      <div class="new_item color-30 f-16" >
        <x-input text-align="right" title="手机号" placeholder="请输入联系人手机号码" type="number" is-type="china-mobile" v-model="telephone"></x-input>
      </div>
    </div>
    <div class="new_btn" @click="edit()">
      <x-button>确定</x-button>
    </div>
  </view-box>
</template>
<script>
  import {mapGetters} from 'vuex'
  import { newPassenger } from '../../servers/trafficServer'
  export default {
    data(){
      return {
        // certificatesList: [['二代身份证', '港澳通行证', '护照','台湾通行证']],
        certificatesList: [['二代身份证']],
        certificate:[],
        certificateObj:{
          '1':'二代身份证',
          'C':'港澳通行证',
          'B':'护照',
          'G':'台湾通行证'
        },
        certificateObjReverse:{
          '二代身份证':'1',
          '港澳通行证':'C',
          '护照':'B',
          '台湾通行证':'G'
        },
        name:'', //姓名
        documenttype:'', //证件类型
        documentNo:'', //证件号码
        telephone:'', //手机号码
        id:'', //乘车人id
      }
    },
    computed:{
      ...mapGetters(['userInfo']),
    },
    mounted(){
      let item = JSON.parse(this.$route.query.item);
      console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
      console.log(item);
      console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
      this.name=item.name;
      this.documentNo=item.documentNo;
      this.telephone=item.telephone;
      this.documenttype=item.documenttype;
      this.id=item.id;
      this.certificate[0]=this.certificateObj[this.documenttype];
    },
    methods:{
      edit(){
        if(this.name.trim()==''){
          this.$vux.alert.show({
            title: '提示',
            content: '姓名不能为空',
          })
          return
        }else if(this.documentNo.trim()==''){
          this.$vux.alert.show({
            title: '提示',
            content: '证件号码不能为空',
          })
          return
        }else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(this.documentNo) && this.certificate[0] == "二代身份证"){
          this.$vux.alert.show({
            title: '提示',
            content: '请输入正确的身份证号码！',
          })
          return
        }else if(this.telephone.trim()==''){
          this.$vux.alert.show({
            title: '提示',
            content: '手机号码不能为空',
          })
          return
        }else if(!(/^1[345678]\d{9}$/).test(this.telephone)){
          this.$vux.alert.show({
            title: '提示',
            content: '请输入正确的手机号码！',
          })
          return
        }else{
          newPassenger({
            name:this.name,
            documentType:this.certificateObjReverse[this.certificate[0]],
            documentNo:this.documentNo,
            telephone:this.telephone,
            xqcUserid:this.userInfo.id,
            id:this.id
          }).then(res=>{
            console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
            console.log('修改联系人',res);
            console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
            if(res.data>0){
              history.go(-1);
            }
          })
        }
      }
    },
  }
</script>
<style lang="less" scoped>
  .new_content{
    padding-left:12px;
    .new_item{
      height:44px;
      /*padding-right:12px;*/
      .new_item_title{
        padding-right:12px;
      }
      .id{
        margin-right:9px;
      }
      input{
        width:100%;
        height:44px;
        outline: none;
        border: none;
        text-align: right;
        font-size:16px;
      }
    }
  }
  .new_btn{
    padding:20px 15px;
  }
</style>
