<template>
  <div class="bg-fff color-30 btn f-12" flex="main:center cross:center">
    {{text}}
  </div>
</template>

<script>
  export default {
    props:['text']
  }
</script>

<style lang="less" scoped>
  .btn{
    border:1px solid #303030;
    border-radius: 2px;
    width:72px;
    height:26px;
  }
</style>
