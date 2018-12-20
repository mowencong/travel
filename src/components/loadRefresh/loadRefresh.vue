<template lang="html">
  <div class="yo-scroll" :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
    <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
      <header class="pull-refresh">
        <slot name="pull-refresh">
          <span class="down-tip color-99"><img src="../../assets/images/pull@2x.png" width="16" style="margin-right:6px"/>下拉更新</span>
          <span class="up-tip color-99"><img src="../../assets/images/pull@2x.png" width="16" style="margin-right:6px"/>下拉更新</span>
          <span class="refresh-tip color-99">加载中……</span>
        </slot>
      </header>
      <slot>
      </slot>
      <footer class="load-more" v-if="pullEnable">
        <slot name="load-more">
          <span v-show="downFlag === false">上拉加载更多</span>
          <span v-show="downFlag === true">加载中……</span>
        </slot>
      </footer>
      <div class="nullData" v-show="dataList.noFlag">暂无更多数据</div>
    </section>
  </div>
</template>
<script>
  export default {
    props: {
      offset: {
        type: Number,
        default: 40 //默认高度
      },
      enableInfinite: {
        type: Boolean,
        default: true
      },
      enableRefresh: {
        type: Boolean,
        default: true
      },
      dataList: {
        default: false,
        required: false
      },
      onRefresh: {
        type: Function,
        default: undefined,
        required: false
      },
      onInfinite: {
        type: Function,
        default: undefined,
        require: false
      },
      pullEnable: {
        type: Boolean,
        default: true,
        require: false
      }
    },
    data() {
      return {
        top: 0,
        state: 0,
        startX: 0,
        startY: 0,
        touching: false,
        infiniteLoading: false,
        downFlag: false, //用来显示是否加载中
      }
    },
    mounted(){
      // this.$nextTick(()=>{
      //   this.$el.querySelector('.load-more').style.display = 'none';
      // })

    },
    methods: {
      touchStart(e) {
        // this.$el.querySelector('.load-more').style.display = 'block';
        this.startY = e.targetTouches[0].pageY;
        this.startX = e.targetTouches[0].pageX;
        this.startScroll = this.$el.scrollTop || 0;
        this.touching = true; //留着有用，不能删除

        this.dataList.noFlag = false;
        if(this.pullEnable){
          this.$el.querySelector('.load-more').style.display = 'block';
        }
      },
      touchMove(e) {
        if(!this.enableRefresh || this.dataList.noFlag || !this.touching) {
          return
        }
        let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
        if(diff > 0) e.preventDefault()
        this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)
        if(this.state === 2) { // in refreshing
          return
        }
        if(this.top >= this.offset) {
          this.state = 1
        } else {
          this.state = 0
        }
        if(this.pullEnable){
          let more = this.$el.querySelector('.load-more');
          if(!this.top && this.state === 0) {
            more.style.display = 'block';
          } else {
            more.style.display = 'none';
          }
        }
      },
      touchEnd(e) {

        if(!this.enableRefresh) {
          return
        }
        this.touching = false
        if(this.state === 2) { // in refreshing
          this.state = 2
          this.top = this.offset
          return
        }
        if(this.top >= this.offset) { // do refresh
          this.refresh()
        } else { // cancel refresh
          this.state = 0
          this.top = 0
        }

        //用于判断滑动是否在原地 ----begin
        let endX = e.changedTouches[0].pageX,
          endY = e.changedTouches[0].pageY,
          dy = this.startY - endY,
          dx = endX - this.startX;

        //如果滑动距离太短
        if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
          console.log("滑动距离太短")
          return;
        }

        //--------end--------

        if(!this.enableInfinite || this.infiniteLoading) {
          return
        }

        let outerHeight = this.$el.clientHeight,
          innerHeight = this.$el.querySelector('.inner').clientHeight,
          scrollTop = this.$el.scrollTop,
          ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0,
          bottom = innerHeight - outerHeight - scrollTop - ptrHeight;

        console.log(bottom + " __ " + this.offset)

        if(bottom <= this.offset && this.state === 0) {
          this.downFlag = true;
          this.infinite();
        } else {
          if(this.pullEnable){
            this.$el.querySelector('.load-more').style.display = 'none';
            this.downFlag = false;
          }
        }

      },
      refresh() {
        this.state = 2;
        this.top = this.offset;
        setTimeout(() => {
          this.onRefresh(this.refreshDone)
        }, 1000);
      },
      refreshDone() {
        this.state = 0
        this.top = 0
      },

      infinite() {
        this.infiniteLoading = true
        if(this.onInfinite){
          this.onInfinite(this.infiniteDone)
        }
      },

      infiniteDone() {
        this.infiniteLoading = false
      }
    }
  }
</script>
<style lang="less">
  .yo-scroll {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #f5f5f5
  }
  .yo-scroll .inner {
    position: absolute;
    top: -2rem;
    width: 100%;
    transition-duration: 300ms;
  }
  .yo-scroll .pull-refresh {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .yo-scroll.touch .inner {
    transition-duration: 0ms;
  }
  .yo-scroll.down .down-tip {
    display: block;
  }
  .yo-scroll.up .up-tip {
    display: block;
  }
  .yo-scroll.refresh .refresh-tip {
    display: block;
  }
  .yo-scroll .down-tip,
  .yo-scroll .refresh-tip,
  .yo-scroll .up-tip {
    display: none;
  }
  .yo-scroll .load-more {
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>
