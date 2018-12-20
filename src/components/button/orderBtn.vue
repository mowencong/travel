<template>
  <div class="bg-fff color-30 btn f-12 fh-12 vux-1px" flex="main:center cross:center">
    <slot></slot>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
  .btn{
    border-radius: 2px;
    margin-right:15px;
    width:72px;
    height:26px;
    &:before{
      border-radius: 8px !important;
    }
    &:last-child{
      margin-right:0px;
    }
  }
</style>
