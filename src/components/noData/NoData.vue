<template>
  <div>
    <div class="noData" flex="dir:top cross:center main:center">
      <img src="../img/noData@2x.png" alt="" width="130">
      <p class="f-14 mt-5 c-ac">{{title?title:'暂无数据'}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'noData',
  props: ['title']
}
</script>


<style>
.noData {
  height: 192px;
  margin-top: 30px;
}
</style>
