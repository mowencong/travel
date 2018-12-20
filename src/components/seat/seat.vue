<template>
  <div class="relative" @click.stop="select()">
    <img :src="flag?seatPath[1]:seatPath[0]" width="35"/>
    <div class="letter f-12" flex="main:center cross:center">
      <span :class="flag?'color-ff':'color-99'">{{text}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    props:['text','seatType','clickAble','seat'],
    data(){
      return {
        seatPath:[
          require('../../assets/images/seat_type-n@2x.png'),
          require('../../assets/images/seat_type-y@2x.png')
        ],
        flag:false
      }
    },
    watch:{
      seat(){
        this.flag=false;
      }
    },
    methods:{
      select(){
        if(this.flag){
          this.flag = !this.flag;
          this.$emit('cb',{type:this.flag,seatType:this.seatType});
        }else {
          if(this.clickAble){
            this.flag = !this.flag;
            this.$emit('cb',{type:this.flag,seatType:this.seatType});
          }
        }

      }
    }
  }
</script>
<style lang="less" scoped>
  .letter{
    position: absolute;
    color: #ffffff;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }
</style>
