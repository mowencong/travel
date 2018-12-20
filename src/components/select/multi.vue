<template>
  <div class="multi f-0">
    <img v-if="type==2" :src="flag?path[1]:path[0]" width="16" @click.once="select()"/>
    <img v-if="type==1" :src="flag?path[1]:path[0]" width="16" @click="select()"/>
    <img v-if="type==3" :src="flag?path[1]:path[0]" width="16"/>
  </div>
</template>
<script>
  export default {
    props:{
      selection:{
        type:Boolean,
        default:false
      },
      type:{
        type:String,
        default:'1' //type:1表示多选 2表示单选 3表示不可点击
      }
    },
    data(){
      return {
        path:[
          require('../../assets/images/multi-n@2x.png'),
          require('../../assets/images/multi-y@2x.png'),
        ],
        flag:false
      }
    },
    watch:{
      selection(){
        this.flag = this.selection
      }
    },
    mounted(){
      this.flag = this.selection
    },
    methods:{
      select(){
        console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
        console.log("66666666666666");
        console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
        this.flag = !this.flag;
        this.$emit('select',this.flag);
      }
    }
  }
</script>

<style lang="less" scoped>
  .multi{
    margin-right:10px;
  }
</style>
