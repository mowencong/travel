export default new Object().install = (Vue, options = {}) => {
  Vue.directive('slide', {
    inserted(el, binding) {
      let startx,starty,endx,endy;
      function getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
      };
      function getDirection(startx,starty,endx,endy){
        let angx =endx-startx;
        let angy =endy-starty;
        let result = 0;
        if(Math.abs(angx)<2&&Math.abs(angy)<2){
          return result;
        }
        let angle = getAngle(angx,angy);
        if(angle>-135&&angle<=-45){
          result=1;
        }else if(angle>45&&angle<135){
          result = 2;
        }else if((angle>=135&&angle<=180)||(angle>=-180&&angle<-135)){
          result= 3;
        }else if(angle>=-45&&angle<=45){
          result = 4;
        }
        return result;
      };
      window.addEventListener('touchstart',(e)=>{
        startx = e.touches[0].pageX;
        starty=e.touches[0].pageY;
      });
      window.addEventListener('touchend',(e)=>{
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        let direction = getDirection(startx,starty,endx,endy);
        if(direction==3){
          console.log("向左！");
          binding.value.orderState<4?binding.value.goRoute(++binding.value.orderState):null
        }else if (direction==4){
          console.log("向右！");
          binding.value.orderState>0?binding.value.goRoute(--binding.value.orderState):null
        }
      });
    },
    unbind() {
      window.removeEventListener('touchstart',()=>{});
      window.removeEventListener('touchend',()=>{});
    }
  })
}
