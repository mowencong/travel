<template>
  <div class="input bg-fff color-30 f-16 padding-primary" flex="main:justify cross:center" @click="fun()">
    <div>{{title}}</div>
    <div flex="" >
      <slot></slot>
      <div class="f-0" v-if="right" flex="cross:center">
        <img src="../../assets/img/right.png" height="14"/>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['title',"right"],
    methods:{
      fun(){
        if(this.right){
          this.$emit('inputClick')
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .input{
    height:46px;
  }
</style>
