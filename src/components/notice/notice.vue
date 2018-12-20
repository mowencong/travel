<template>
  <div class="notice f-12 fh-20 color-primary bg-notice padding-primary" flex="cross:center">
    {{text}}
  </div>
</template>
<script>
  export default {
    props:['text'],
  }
</script>

<style lang="less" scoped>
  .notice{
    padding-top: 6px;
    padding-bottom: 6px;
  }
</style>
