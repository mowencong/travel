<template>
  <view-box ref="viewBox">
    <x-header slot="header" :left-options="{backText:''}">
      新建乘客信息
    </x-header>
    <div class="new_header" flex="">
      <div class="f-0">
        <img src="../../assets/images/tips@2x.png" width="28"/>
      </div>
      <div class="new_header_tip">
        <p class="f-20">重要提示</p>
        <p class="f-12 fh-18">您所建立的乘客信息仅和当前账号绑定，不与其他用户分享，您的重要信息不会泄露</p>
      </div>
    </div>
    <div class="bg-fff new_content">
      <div class="new_item color-30 f-16">
        <x-input text-align="right" title="姓名" v-model="name"></x-input>
      </div>
      <group gutter="0">
        <popup-picker title="证件类型"  :data="certificatesList" v-model="certificate"></popup-picker>
      </group>
      <div class="new_item vux-1px-b color-30 f-16">
        <x-input text-align="right" title="证件号码" v-model="documentNo"></x-input>
      </div>
      <div class="new_item color-30 f-16">
        <x-input text-align="right" title="手机号" placeholder="请输入联系人手机号码" type="number" is-type="china-mobile" v-model="telephone"></x-input>
      </div>
    </div>
    <div class="new_btn" @click="save()">
      <x-button>确定</x-button>
    </div>
  </view-box>
</template>
<script>
  import { PopupPicker, Group} from 'vux'
  import { newPassenger } from '../../servers/trafficServer'
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return {
        // certificatesList: [['二代身份证', '港澳通行证', '护照','台湾通行证']],
        certificatesList: [['二代身份证']],
        certificate:['二代身份证'],
        certificateObj:{
          '二代身份证':'1',
          '港澳通行证':'C',
          '护照':'B',
          '台湾通行证':'G'
        },
        name:'', //姓名
        documentNo:'', //证件号码
        telephone:'' //手机号码
      }
    },
    computed:{
      ...mapGetters(['userInfo']),
    },
    mounted(){

    },
    methods:{
      save(){
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
            documentType:this.certificateObj[this.certificate[0]],
            documentNo:this.documentNo,
            telephone:this.telephone,
            xqcUserid:this.userInfo.id
          }).then(res=>{
            console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
            console.log('新增编辑联系人',res);
            console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
            history.back(-1);
          })
        }
      }
    },
    components: {
      Group,
      PopupPicker
    }
  }
</script>
<style lang="less" scoped>
  .new_header{
    height:97px;
    padding:20px 0 0 40px;
    background: url("../../assets/images/pending.png") no-repeat 0 0;
    background-size:cover;
    padding-right:44px;
    .new_header_tip{
      color: #ffffff;
      line-height: 28px;
      margin-left:14px;
    }
  }
  .new_content{
    padding-left:12px;
    .new_item{
      height:44px;
      padding-right:12px;
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
