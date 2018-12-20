const mainInfo = {
  namespaced:true,
  state:{
    date:'', //日期
    day:'',  //天,
    beginCity:'上海', // 出发地
    endCity:'北京', // 终点站
    onlyHeightRail:false, // 是否只支持高铁
    addPassengerId:new Set(), //添加乘客信息id
    telephone:'', //订票时联系人手机号
    seat:{}, //已选座位类型
    ticketChangeOrder:'' //改签订单号
  },
  mutations:{
    DATE_CHANGE ( state, date ){
      state.date = date;
    },
    CITY_CHANGE ( state, obj={}){
      state.beginCity = obj.beginCity;
      state.endCity = obj.endCity;
    },
    ONLYHEIGHTRAIL_CHANGE ( state, only){
      state.onlyHeightRail = only;
    },
    ADDPASSENGERID_CHANGE( state, id){
      if(state.addPassengerId.has(id)){
        state.addPassengerId.delete(id);
      }else{
        state.addPassengerId.add(id);
      }
    },
    TELEPHONE_CHANGE( state,telephone){
      state.telephone = telephone
    },
    SEAT_CHANGE(state,obj){
      state.seat = obj
    },
    TICKETCHANGEORDER_CHANGE(state,str){
      state.ticketChangeOrder = str
    }
  }
}

export default mainInfo
