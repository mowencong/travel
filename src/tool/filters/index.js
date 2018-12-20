/**
 Time：2018/8/6 0006
 Author：湛永胜
 Content：考虑到前端进度损失问题，接受的类型必须是字符串
 */
function idHide (value) {
  if( typeof value == "string"&&value != ''){
    return value.slice(0,6).concat('********')+value.slice(value.length-4)
  }else {
    return value
  }
}

/**
 Time：2018/8/7 0007
 Author：湛永胜
 Content：日期格式化
 */

function dateFormat(str) {
  console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
  console.log("222222222",typeof str);
  console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
  if(str.indexOf(' ')>-1){
    let arr = str.split(' ')[0].split('-');
    return arr[1]+'月'+arr[2]+'日';
  }else{
    let arr = str.split('-');
    return arr[1]+'月'+arr[2]+'日';
  }
}

/**
 Time：2018/8/8 0008
 Author：湛永胜
 Content:余票过滤功能
 */

function traffic(value) {
  if(value==0){
    return '无票'
  }else if(value!='有票'){
    return value+'张'
  }else {
    return value
  }
}
// 座位类型对应编号
function seatCode(index){
  switch (index){
    case '0':
      return '无座';
      break;
    case '1':
      return '一等座';
      break;
    case '2':
      return '二等座';
      break;
    case '3':
      return '硬座';
      break;
    case '4':
      return '软座';
      break;
    case '7':
      return '硬卧';
      break;
    case '9':
      return '软卧';
      break;
    case '10':
      return '高级软座';
      break;
    case '11':
      return '商务座';
      break;
    case '12':
      return '特等座';
      break;
    case '15':
      return '动卧';
      break;
    case '16':
      return '高级动卧';
      break;
    case '17':
      return '一等软座';
      break;
    case '18':
      return '二等软座';
      break;
    case '19':
      return '包厢硬卧';
      break;
  }
}

export default {
  idHide,
  dateFormat,
  traffic,
  seatCode
}

