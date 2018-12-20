function getDate(str=0,time='',move=0) { //获取当前时间
  let date;
  if(time!=''){
    date = new Date(time);
  }else {
    date = new Date();
  }
  date = new Date(date.getTime()+24*60*60*1000*str+move*24*60*60*1000);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  let currentdate = year +'-'+ month +'-'+ strDate;
  return currentdate;
}


//订单状态对应文字说明
/*【0待支付，1占座中，3占座失败，4支付成功（出票中），5购票成功，6购票失败，7取消订单，8改签中，9退票中，10有退改记录【改签受理中，改签成功，已改签，改签失败；退票受理中，退票成功，退票失败】，11已取票，12已出行】
有退改记录【1改签占座受理中，2改签占座成功，3原票已占座，4改签占座失败；5退票受理中，6退票成功，7退票失败;8改签受理中，9改签成功，10已改签，11改签失败；】*/
function orderDescription() {
  return new Map([
    ['0','待支付'],
    ['1','占座中'],
    ['3','占座失败'],
    ['4','购票受理中'],
    ['5','购票成功'],
    ['6','购票失败'],
    ['7','已取消'],
    ['8','改签受理中'],
    ['9','退票受理中'],
    ['10','有退改记录'],
    ['11','已取票'],
    ['12','已出行']
  ])
}
function ticketChangeDescription() {
  return new Map([
    ['1','改签占座受理中'],
    ['2','改签占座成功'],
    ['3','原票已占座'],
    ['4','改签占座失败'],
    ['5','退票受理中'],
    ['6','退票成功'],
    ['7','退票失败'],
    ['8','改签受理中'],
    ['9','改签成功'],
    ['10','已改签'],
    ['11','改签失败']
  ])
}
// 座位类型对应编号
function seatCode(index){
  switch (index){
    case '无座':
      return '0';
      break;
    case '一等座':
      return '1';
      break;
    case '二等座':
      return '2';
      break;
    case '硬座':
      return '3';
      break;
    case '软座':
      return '4';
      break;
    case '硬卧':
      return '7';
      break;
    case '软卧':
      return '9';
      break;
    case '高级软座':
      return '10';
      break;
    case '商务座':
      return '11';
      break;
    case '特等座':
      return '12';
      break;
    case '动卧':
      return '15';
      break;
    case '高级动卧':
      return '16';
      break;
    case '一等软座':
      return '17';
      break;
    case '二等软座':
      return '18';
      break;
    case '包厢硬卧':
      return '19';
      break;
  }
}


window.BZ = {
  getDate,
  seatCode,
  orderDescription,
  ticketChangeDescription
}
export default BZ
