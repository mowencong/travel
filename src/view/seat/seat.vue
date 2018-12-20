<template>
  <view-box ref="viewBox" class="form">
    <div slot="header" class="bz_header">
      <x-header slot="header" :left-options="{backText:''}">
        <div flex="cross:center main:center">{{Info.departStation}}
          <span class="head_right">→</span>{{Info.arriveStation}}
          <span v-if="type">（改签）</span>
        </div>
        <div slot="right" @click="goTips()">改签须知</div>
      </x-header>
      <train-top :detail="Info"></train-top>
    </div>
    <div ref="a" v-if="!type" style="min-height:100%;">
      <!--座位类型-->
      <div class="margin-b-8 margin-t-8">
        <input-r right=true :title="alreadySeat" @inputClick="show = true">
          <div>
            <span>{{seat.seatType}}</span>
            <span class="price">￥{{seat.price}}</span>
          </div>
        </input-r>
      </div>
      <!--乘车人-->
      <div class="bg-fff">
        <div class="per_header vux-1px-b padding-primary" flex="cross:center main:justify">
          <div>
            <span class="color-30 f-16">乘车人</span>
            <span class="color-99 f-12 limit">最多添加五名乘客人</span>
          </div>
          <div class="f-0" @click="addPassenger()">
            <img src="../../assets/images/addPeople@2x.png" width="20" />
          </div>
        </div>
        <div v-for="(item,index) in parssengerList" :key="index" class="passenger_item bg-fff" flex="box:first cross:center">
          <div class="f-0 passenger_item_img" @click="deletePassenger(item.id,index)">
            <img src="../../assets/images/delete@2x.png" width="20" />
          </div>
          <div class="vux-1px-b passenger_item_info" flex="main:justify cross:center">
            <div>
              <div class="color-30 f-16">{{item.name}}</div>
              <div class="color-99 f-12">{{certificateObj[item.documenttype]}} {{item.documentNo | idHide}}</div>
            </div>
            <div class="f-0 passenger_item_info_r" @click="editPassenger(item)">
              <img src="../../assets/images/modify@2x.png" width="20" />
            </div>
          </div>
        </div>
      </div>
      <!--在线选座-->
      <div v-if="!(seat.seatType!='二等座'&&seat.seatType!='一等座'&&seat.seatType!='商务座')" class="seat_type padding-primary bg-fff">
        <div class="seat_type_header color-30" flex="main:justify cross:center">
          <div class="f-16">在线选座</div>
          <div class="f-12">
            已选座
            <span class="color-e54">{{seatarr.length}}</span>/{{parssengerList.length}}个
          </div>
        </div>
        <div class="seat_type_item f-0 " flex="cross:center">
          <div class="color-99 f-12 ">靠窗</div>
          <div flex="" @click="selectSeat('1A')">
            <seat text="A" seatType="1A" :clickAble="clickAble" :seat="seat" @cb="selected" />
          </div>
          <div flex="main:center">
            <seat v-if="seat.seatType=='二等座'" text="B" seatType="1B" :clickAble="clickAble" :seat="seat" @cb="selected" />
          </div>
          <div flex="main:right">
            <seat text="C" seatType="1C" :clickAble="clickAble" :seat="seat" @cb="selected" />
          </div>
          <div class="color-99 f-12 text-center">过道</div>
          <div flex="">
            <seat v-if="seat.seatType=='二等座'||seat.seatType=='一等座'" text="D" seatType="1D" :clickAble="clickAble" :seat="seat" @cb="selected" />
          </div>
          <div flex="main:right">
            <seat text="F" seatType="1F" :clickAble="clickAble" :seat="seat" @cb="selected" />
          </div>
          <div class="color-99 f-12 text-right">靠窗</div>
        </div>
        <div class="seat_type_item f-0 " flex="cross:center">
          <div class="color-99 f-12 ">靠窗</div>
          <div flex="" @click="selectSeat('2A')">
            <seat text="A" seatType="2A" :clickAble="clickAble" :seat="seat" @cb="selected" />
          </div>
          <div flex="main:center">
            <seat v-if="seat.seatType=='二等座'" text="B" seatType="2B" :clickAble="clickAble" :seat="seat" @cb="selected" />
          </div>
          <div flex="main:right">
            <seat text="C" seatType="2C" :clickAble="clickAble" :seat="seat" @cb="selected" />
          </div>
          <div class="color-99 f-12 text-center">过道</div>
          <div flex="">
            <seat v-if="seat.seatType=='二等座'||seat.seatType=='一等座'" text="D" seatType="2D" :clickAble="clickAble" :seat="seat" @cb="selected" />
          </div>
          <div flex="main:right">
            <seat text="F" seatType="2F" :clickAble="clickAble" :seat="seat" @cb="selected" />
          </div>
          <div class="color-99 f-12 text-right">靠窗</div>
        </div>
      </div>
      <Notice v-if="!(seat.seatType!='二等座'&&seat.seatType!='一等座'&&seat.seatType!='商务座')" text="指定座位余票不足时将随机为您分配座位" />
      <!--联系手机-->
      <div class="new_item color-30 f-16 contactPhone bg-fff">
        <x-input text-align="right" title="联系人手机" placeholder="请输入联系人手机号码" type="number" is-type="china-mobile" v-model="contactPhone"></x-input>
      </div>
      <!--发票-->
      <!--<div v-if="orInvoice==1" class="invoice padding-primary bg-fff" flex="main:justify cross:center" @click.self="goInvoice()">-->
      <!--<div flex="cross:center" >-->
      <!--<Multi type="3" :selection="invoice==1" />-->
      <!--<div class="color-33 f-16">发票</div>-->
      <!--</div>-->
      <!--<div class="f-0">-->
      <!--<img src="../../assets/img/right.png" height="14"/>-->
      <!--</div>-->
      <!--</div>-->
      <div style="height:132px"></div>
    </div>
    <!--预定-->
    <foote v-foot v-if="!type" primary="立即预定" @btnPrimary="reserve()" :amount="(seat.price*addPassengerId.size).toFixed(2)" slot="bottom"></foote>
    <div v-if="type" style="min-height:100%;">
      <notice text="已取票、已退票或已改签的车票无法改签、每张车票只能改签一次， 改签成功后的车票不能再次改签" />
      <!--退票联系人-->
      <div class="contacts bg-fff">
        <div class="contacts_title vux-1px-b color-30 f-16 padding-primary" flex="cross:center">
          请选择需改签的乘车人
        </div>
        <div class="contacts_info">
          <div class="contacts_info_item" v-for="(item,index) in list" :key="index">
            <div class="vux-1px-b" flex="main:justify cross:center">
              <div flex="dir:top main:center">
                <div class="color-30 f-16 fh-16" style="margin-bottom: 7px">{{item.name}}</div>
                <div class="color-99 f-12 f-12">身份证 {{item.documentNo | idHide}}</div>
              </div>
              <div class="f-0" @click="selectTicketChange(item.riderId)">
                <img :src="idArr.indexOf(item.riderId)>-1?imgPath[1]:imgPath[0]" width="16" style="margin-right:12px" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--<div style="height:132px"></div>-->
    </div>
    <!--改签-->
    <foote v-foot v-if="type" primary="改签" @btnPrimary="changeTicket()" :amount="(seat.price*idArr.length).toFixed(2)" slot="bottom"></foote>
    <!--占空位置-->

    <!--选座位等级-->
    <div v-transfer-dom>
      <popup v-model="show">
        <!--<popup-header-->
        <!--left-text="取消"-->
        <!--right-text="确定"-->
        <!--title=""-->
        <!--:show-bottom-border="false"-->
        <!--@on-click-left="show = false"-->
        <!--@on-click-right="show = false">-->
        <!--</popup-header>-->
        <group gutter="0">
          <div class="padding-primary f-14">
            <div v-if="item.yuPiao!=0" v-for="(item,index) in Info.priceList" :key="index" class="train_item vux-1px-b" flex="cross:center">
              <div>{{item.seatType}}</div>
              <div>{{item.yuPiao | traffic}}</div>
              <div class="text-right color-e54">￥{{item.price}}</div>
              <div flex="main:right" @click="select(item)">
                <multi v-if="or" :selection="item.seatType==seat.seatType" type="2" style="margin-right: 0" />
              </div>
            </div>
          </div>
        </group>
      </popup>
    </div>
    <!--占座过程-->
    <div v-transfer-dom>
      <x-dialog v-model="occupiedOr">
        <div class="cover_main">
          <div v-if="seatProcess=='00'" class="custom">
            <div class="custom_main">
              <div class=" custom_header color-99 f-12 fh-12 relative">
                请确认火车票信息
                <div class="close f-0" @click="goOrderDetail()">
                  <img src="../../assets/images/close@2x.png" width="15" />
                </div>
              </div>
              <div class="hidden" ref="item1" flex="main:justify cross:center box:last">
                <div class="color-30 f-16 line1" flex="main:left">· {{Info.departStation}} - {{Info.arriveStation}}</div>
                <div class="f-0 custom_progress" flex="cross:center">
                  <img src="../../assets/images/single-y@2x.png" width="15" />
                </div>
              </div>
              <div class="hidden" ref="item2" flex="main:justify cross:center">
                <div class="color-30 f-16" v-if="Info.departTime">· {{Info.departTime.split(' ')[0]}} {{weekDay[index]}}</div>
                <div class="f-0 custom_progress" flex="cross:center">
                  <img src="../../assets/images/single-y@2x.png" width="15" />
                </div>
              </div>
              <div class="hidden" ref="item3" flex="main:justify cross:center">
                <div class="color-30 f-16">· {{Info.trainNo}}{{' '+Info.departTimeStr}}发车</div>
                <div class="f-0 custom_progress" flex="cross:center">
                  <img src="../../assets/images/single-y@2x.png" width="15" />
                </div>
              </div>
              <div class="hidden" ref="item4" flex="main:justify cross:center box:last">
                <div class="color-30 f-16 line1 text-left" v-if="!type">· 乘车人:{{selectPeople}}</div>
                <div class="color-30 f-16 line1 text-left" v-if="type">· 乘车人:{{ticketPeople}}</div>
                <div class="f-0 custom_progress" flex="cross:center">
                  <img src="../../assets/images/single-y@2x.png" width="15" />
                </div>
              </div>
            </div>
            <div class="text-center loading" ref="loading">
              <progress-bar type="rect" value="90" :options="options"></progress-bar>
              <div/>
            </div>
            <div class="color-99 f-12 fh-12 text-center" flex="cross:center main:center">
              <inline-loading></inline-loading>正在核验乘车人，请耐心等候
            </div>
          </div>
          <div v-if="seatProcess=='01'" class="custom">
            <div class="custom_main">
              <div class="custom_success_header" flex="main:center">
                <div class="f-0 custom_success_img">
                  <img src="../../assets/images/seat-y@2x.png" width="20" />
                </div>
                <div class="color-primary f-16 fh-16">占座成功</div>
                <div class="close f-0" @click="goOrderDetail()">
                  <img src="../../assets/images/close@2x.png" width="15" />
                </div>
              </div>
              <div v-for="(item,index) in orderRiderList" :key="index" class="custom_success_info color-30 f-12" flex="main:justify cross:center">
                <div>{{item.name}}</div>
                <div flex="cross:center">
                  <div class="f-0 custom_success_side">
                    <img v-if="/AF/.test(item.seatName)" src="../../assets/images/beside@2x.png" width="32" />
                    <img v-if="/CD/.test(item.seatName)" src="../../assets/images/center@2x.png" width="32" />
                  </div>
                  <div>{{item.seatType | seatCode}} {{item.coachName}}车厢{{item.seatName}} ￥{{item.ticketPrice}}</div>
                </div>
              </div>
              <div class="order_price f-12 vux-1px-t" flex="main:justify cross:center">
                <div class="color-33">订单金额</div>
                <div class="color-e54">￥{{orderDetail.orderTotal}}</div>
              </div>
              <div>
                <x-button action-type="button" @click.native="goPay()">去支付</x-button>
              </div>
            </div>
          </div>
          <div v-if="seatProcess=='02'" class="custom">
            <div class="custom_main">
              <div class="custom_success_header" flex="main:center cross:center">
                <div class="f-0 custom_success_img">
                  <img src="../../assets/images/seat-n@2x.png" width="20" />
                </div>
                <div class="color-primary f-16 fh-16">占座失败</div>
                <div class="close f-0" @click="goOrderDetail()">
                  <img src="../../assets/images/close@2x.png" width="15" />
                </div>
              </div>
              <div class="seat_fail_tip color-30 f-14 text-center" flex="cross:center main:center">
                <div>{{orderDetail.remark}}</div>
              </div>
              <div>
                <x-button action-type="button" @click.native="goTicketList()">重新选择车次</x-button>
              </div>
            </div>
          </div>
          <div v-if="seatProcess=='03'" class="custom">
            <div class="custom_main">
              <div class="custom_success_header" flex="main:center cross:center">
                <div class="f-0 custom_success_img">
                  <img src="../../assets/images/ticketPrice@2x.png" width="20" />
                </div>
                <div class="color-primary f-16 fh-16">改签费用</div>
                <div class="close f-0" @click="goOrderDetail()">
                  <img src="../../assets/images/close@2x.png" width="15" />
                </div>
              </div>
              <div class="ticket_change vux-1px-b">
                <div flex="main:justify" class="ticket_change_item">
                  <div class="color-30 f-16 fh-16">原票价</div>
                  <div class="color-e54 f-18 fh-18">
                    <span class="f-12">￥</span>{{orderDetail.oldOrderTotal.toFixed(2)}}</div>
                </div>
                <div flex="main:justify" class="ticket_change_item">
                  <div class="color-30 f-16 fh-16">改签后票价</div>
                  <div class="color-e54 f-18 fh-18">
                    <span class="f-12">￥</span>{{orderDetail.orderTotal.toFixed(2)}}</div>
                </div>
                <div flex="main:justify" class="ticket_change_item">
                  <div class="color-30 f-16 fh-16">改签手续费</div>
                  <div class="color-e54 f-18 fh-18">
                    <span class="f-12">￥</span>{{orderDetail.orderDifference.toFixed(2)}}</div>
                </div>
              </div>
              <div flex="main:justify" class="ticket_change_total" v-if="orderDetail.changePay>=orderDetail.changeRefund">
                <div class="color-30 f-16 fh-16">需支付</div>
                <div class="color-e54 f-18 fh-18">
                  <span class="f-12">￥</span>{{(Number(orderDetail.changePay).toFixed(2)-Number(orderDetail.changeRefund).toFixed(2)).toFixed(2)}}</div>
              </div>
              <div flex="main:justify" class="ticket_change_total" v-else>
                <div class="color-30 f-16 fh-16">需退款</div>
                <div class="color-e54 f-18 fh-18">
                  <span class="f-12">￥</span>{{(Number(orderDetail.changeRefund).toFixed(2)-Number(orderDetail.changePay).toFixed(2)).toFixed(2)}}</div>
              </div>
              <div class="color-primary f-12 fh-12 text-left">
                原票款将在1-15日内原路放回支付账户
              </div>
              <div class="ticket_btn" flex="">
                <div>
                  <x-button style="background-color:#999999" action-type="button" @click.native="goOrderDetail()">取消</x-button>
                </div>
                <div>
                  <x-button v-if="orderDetail.changePay>orderDetail.changeRefund" action-type="button" @click.native="goPay()">去支付</x-button>
                  <x-button v-else action-type="button" @click.native="confirmOrder()">确定</x-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </x-dialog>
    </div>
  </view-box>
</template>
<script>
  import TrainTop from '../../components/trainTop/trainTop'
  import InputR from '../../components/inputR/inputR'
  import Multi from '../../components/select/multi'
  import Notice from '../../components/notice/notice'
  import Foote from '../../components/footer/footer'
  import Seat from '../../components/seat/seat'
  import CustomPopup from '../../components/customPopup/customPopup'
  import ProgressBar from 'svg-progress-bar'
  import {
    selectPassenger,
    occupiedSeat,
    orderDetail,
    ticketChange,
    getPaymentOrder,
    queryInvoice,
    newTicketChange,
    changeConfirm
  } from '../../servers/trafficServer'
  import {
    PopupHeader,
    Popup,
    TransferDom,
    InlineLoading,
    XButton,
    XDialog
  } from 'vux'
  import { mapGetters, mapMutations, mapState } from 'vuex'
  export default {
    data() {
      return {
        Info: {},
        alreadySeat: '已选坐席',
        // seat:{},
        show: false,
        selectedSeatNum: 0,
        or: true,
        passengerNum: 5, // 乘客人数
        seatarr: [], //已选座位个数
        orderAmount: '0.00', //订单金额
        orInvoice: 0, //是否允许开发票
        invoiceType: '', //允许开票的类型
        invoice: 0,
        invoiceInfo: {},
        occupiedOr: false, //占座弹窗
        certificateObj: {
          '1': '二代身份证',
          C: '港澳通行证',
          B: '护照',
          G: '台湾通行证'
        },
        parssengerList: [], //所选乘客人信息
        seatProcess: '11', //00代表占座中，01代表占座成功，02代表占座失败
        seatOr: true,
        contactPhone: '', //联系人号码
        weekDay: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        options: {
          rectWidth: 256,
          rectHeight: 7,
          gradientColor: ['#FFF0D5', '#FFBD4C'],
          duration: 7000,
          text: () => {
            return ''
          }
        },
        orderRiderList: [], //占座成功乘客信息
        orderDetail: {}, //占座成功订单详情
        orderSn: '',
        GHFMC: '', // 发票抬头名称
        GHF_SJ: '', // 手机号
        GHF_EMAIL: '', // 邮箱地址
        type: false, //表明是否是改签入口进来
        idArr: [], //改签人id
        list: [], //可改签人列表
        imgPath: [
          require('../../assets/images/multi-n@2x.png'),
          require('../../assets/images/multi-y@2x.png')
        ],
        platform: window.APP_PLATFORM || 'pc',
        firstClick: true,
        interval1: null,
        interval2: null,
        interval3: null,
        interval4: null
      }
    },
    watch: {
      seat() {
        this.seatarr = []
      }
    },
    computed: {
      ...mapState('mainInfo', ['addPassengerId', 'telephone', 'seat','ticketChangeOrder']),
      ...mapGetters(['userInfo']),
      index() {
        return new Date(this.Info.departTime).getDay()
      },
      selectPeople() {
        let arr = []
        this.parssengerList.forEach(item => {
          arr.push(item.name)
        })
        return arr.join('、')
      },
      clickAble() {
        return this.parssengerList.length > this.seatarr.length ? true : false
      },
      ticketPeople() {
        //改签占座人
        let str = []
        if (this.list.length > 0) {
          this.idArr.forEach(id => {
            this.list.forEach(item => {
              if (item.riderId == id) {
                str.push(item.name)
              }
            })
          })
          return str.join(',')
        } else {
          return ''
        }
      }
    },
    mounted() {
      console.log("==========",this.userInfo)
      if (this.$route.query.type == '01') {
        this.type = true
        this.idArr.push(Number(this.$route.query.id))
        this.list = JSON.parse(this.$route.query.list)
      }
      this.Info = JSON.parse(this.$route.query.obj)
      // this.seat = JSON.parse(this.$route.query.item);
      this.contactPhone = this.telephone
      this.$vux.loading.show()
      selectPassenger({
        xqcUserid: this.userInfo.id
      }).then(res => {
        this.$vux.loading.hide()
        console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓')
        console.log('乘客人列表', res)
        console.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑')
        res.data.forEach(item => {
          // 解决再次渲染bug
          if (this.addPassengerId.has(item.id)) {
            this.parssengerList.push(item)
          }
        })
      })
      // queryInvoice().then(res=>{
      //     this.orInvoice = res.data.status;
      //     this.invoiceType = res.data.invoiceType;
      // });
      // window['backGetData'] = () => {
      //   XqcH5JS.getParam((res) => {
      //     this.invoice = 1
      //     if (window.APP_PLATFORM === 'ios') {
      //       this.handleInvoiceData(JSON.parse(res).data)
      //     } else {
      //       this.handleInvoiceData(JSON.parse(res.data))
      //     }
      //   })
      // }
    },
    methods: {
      ...mapMutations('mainInfo', [
        'ADDPASSENGERID_CHANGE',
        'TELEPHONE_CHANGE',
        'SEAT_CHANGE'
      ]),
      goTips() {
        this.$router.push({
          path: '/ticketChange'
        })
      },
      // 处理开票页面返回过来的数据
      // handleInvoiceData(data) {
      //   if (data.backFptt.type === '个人') {
      //     this.invoiceInfo = {
      //       invoiceTitleType: data.backFptt.type,
      //       invoiceTitleName: data.backFptt.name,
      //       phone: data.backFptt.phone
      //     }
      //   } else {
      //     this.invoiceInfo = {
      //       invoiceTitleType: data.backFptt.type,
      //       invoiceTitleName: data.backFptt.name,
      //       phone: data.backFptt.phone,
      //       mail: data.backFptt.mail,
      //       taxpayerNo: data.backFptt.taxCode,
      //       companyPhone: data.backFptt.companyPhone,
      //       companyAddress: data.backFptt.registryAddress,
      //       bank: data.backFptt.bankName,
      //       bankNo: data.backFptt.bankAccount
      //     }
      //   }
      // },
      goOrderDetail() {
        this.occupiedOr = false
        this.seatProcess = '11'
        this.seatOr = false
        this.$router.push({
          path: '/orderDetail',
          query: {
            orderSn: this.type?this.ticketChangeOrder:this.orderSn
          }
        })
      },
      confirmOrder() {
        this.occupiedOr = false
        this.seatProcess = '11'
        this.seatOr = false
        this.$vux.loading.show()
        changeConfirm({
          orderSn: this.orderSn,
          xqcUserId: this.userInfo.id
        }).then(res => {
          this.$vux.loading.hide()
          this.$router.push({
            path: '/orderDetail',
            query: {
              orderSn: this.type?this.ticketChangeOrder:this.orderSn
            }
          })
        })
      },
      select(item) {
        // this.seat = item;
        this.SEAT_CHANGE({ ...item })
      },
      selectSeat(type) {},
      selected(obj) {
        if (obj.type) {
          this.seatarr.push(obj.seatType)
        } else {
          let index = this.seatarr.indexOf(obj.seatType)
          this.seatarr.splice(index, 1)
        }
        this.orderAmount = (this.seatarr.length * this.seat.price).toFixed(2)
      },
      addPassenger() {
        this.$router.push({
          path: '/addPassenger'
        })
      },
      close() {
        this.occupiedOr = false
        this.seatProcess = '11'
        this.seatOr = false
      },
      deletePassenger(id, index) {
        this.ADDPASSENGERID_CHANGE(id)
        this.parssengerList.splice(index, 1)
      },
      editPassenger(item) {
        this.$router.push({
          path: '/editPassenger',
          query: {
            item: JSON.stringify(item)
          }
        })
      },
      // goInvoice(){
      //   if(!this.invoice){
      //     XqcH5JS.goToHtmlAccessStyleTitle('com.bonade.h5.tykp', 'index.html#/main/fpxx'+this.invoiceType , 'com.bonade.h5.tykp/index.html', 0, '统一开票'); // TODO 跨包跳转开发票页面
      //   }else{
      //     this.invoice = 0
      //     this.invoiceInfo = {}
      //   }
      // },
      goPay() {
        let _this = this
        getPaymentOrder({
          userid: this.userInfo.id,
          orderSn: this.orderSn
        }).then(res => {
          cordova.exec(
            function(success) {
              //支付成功的回调
              _this.$router.push({
                path: '/orderDetail',
                query: {
                  orderSn: _this.type?_this.ticketChangeOrder:_this.orderSn,
                  entry:'pay'
                }
              })
            },
            function(error) {
              //支付失败的回调
              console.log(error)
            },
            'XqcUser', //接口类名
            'unifiedPayment', //调用原生统一支付方法
            [
              {
                orderInfo: {
                  orderNumber: res.data.orderNumber, // 订单编号
                  orderAmount: res.data.orderAmount, // 订单金额
                  orderChannel: res.data.orderChannel, // 订单渠道：美团订单/京东订单/还款...
                  orderSummary: res.data.orderSummary, // 订单摘要
                  getChannelsURL: res.data.getChannelsURL, // 获取支付渠道列表的接口(不带域名及"api/")
                  mrchCode: res.data.mrchCode, // 商户编号
                  mrchName: res.data.mrchName, // 商户名称
                  returnURL: '' // 支付成功后跳转的页面
                }
              }
            ]
          )
          this.$router.push({
            path: '/orderDetail',
            query: {
              orderSn: _this.type?_this.ticketChangeOrder:_this.orderSn,
            }
          })
        })
      },
      goTicketList() {
        history.go(-2)
      },
      reserve() {
        let _this = this
        if (
          this.seat.seatType == '二等座' ||
          this.seat.seatType == '一等座' ||
          this.seat.seatType == '商务座'
        ) {
          if (
            this.seatarr.length != 0 &&
            this.parssengerList.length != this.seatarr.length
          ) {
            this.$vux.alert.show({
              title: '温馨提示',
              content: '请按照乘车人个数选择对应的座位'
            })
            return
          }
        }
        if (this.parssengerList.length == 0) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '请选择乘车人'
          })
          return
        }
        if (this.contactPhone.trim() == '') {
          this.$vux.alert.show({
            title: '提示',
            content: '手机号码不能为空'
          })
          return
        }
        if (!/^1[345678]\d{9}$/.test(this.contactPhone)) {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入正确的手机号码'
          })
          return
        }
        let trafficRiderIn = []
        this.parssengerList.forEach(item => {
          trafficRiderIn.push({
            id: item.id, // traffic_rider表的id
            ticketType: '1', // 车票类型 1成人票，2儿童票
            seatType: BZ.seatCode(this.seat.seatType), // 席座编码 0.无座1.一等座 2.二等座 3.硬座 4.软座 7.硬卧9.软卧10.高级软座11.商务座12特等座15动卧16高级动卧17一等软座 18二等软座 19包厢硬卧
            ticketPrice: this.seat.price // 车票价钱
          })
        })
        //开始占座
        if (this.firstClick) {
          this.firstClick = false //解决点击多次占座bug
          occupiedSeat({
            // ...this.invoiceInfo,
            // invoice:this.invoice,
            trafficOrderDetail: {
              departureArea: this.Info.departStation, // 始发地
              destinationArea: this.Info.arriveStation, // 目的地
              trainDate: this.Info.departTime.split(' ')[0], // 火车出发时间日期（例:2016 - 5 - 20）
              trainNumber: this.Info.trainNo, //列车车次
              departureDate: this.Info.departTimeStr, // 出发时间
              destinationDate: this.Info.arriveTimeStr, //抵达时间
              departureDateFull: this.Info.departTime,
              destinationDateFull: this.Info.arriveTime,
              noSeat: '1', // 是否接受无座 【0不接受 1接受】
              orderStatus: '1', // 默认传1
              chooseSeats: this.seatarr.join(','), //座位类型
              telephone: this.contactPhone, //联系人号码
              trainTime: this.Info.trainTime
            },
            trafficRiderIn: trafficRiderIn,
            xqcUserId: this.userInfo.id,
            xqcAccount:this.userInfo.account,
            xqcUserName:this.userInfo.name,
            PrevPage: sessionStorage['PrevPage']
              ? sessionStorage['PrevPage']
              : null,
            tourId: sessionStorage['tourId'] ? sessionStorage['tourId'] : null
          }).then(res => {
            _this.orderSn = res.data.merchanOrderId
            //占座状态显示
            _this.occupiedOr = true
            _this.seatProcess = '00'
            _this.$nextTick(() => {
              let that = _this
              let index = 0
              _this.interval1 = setInterval(function() {
                if (index == 4) {
                  clearInterval(_this.interval1)
                  return
                }
                if (that.seatProcess == '00') {
                  //解决防止状态发生变化页面找不到元素
                  that.$refs['item' + ++index].style.visibility = 'visible'
                } else {
                  index = 4
                }
              }, 1500)
              // if(that.$refs.loading){
              //   let str = getComputedStyle(this.$refs.loading).width;
              //   that.options.rectWidth = str.substring(0,str.length-2); //获取模态框宽度
              // }
            })
            _this.interval2 = setInterval(function() {
              orderDetail({
                orderSn: res.data.merchanOrderId,
                xqcUserId: _this.userInfo.id
              }).then(res => {
                console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓')
                console.log('查询订单详情', res)
                console.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑')
                console.log("1",)
                let orderDetail = res.data[1].orderList[res.data[1].orderList.length - 1]
                let orderStatus = orderDetail.orderDetail.orderStatus
                _this.orderRiderList = orderDetail.orderRiderList
                _this.orderDetail = orderDetail.orderDetail
                if (orderStatus == 0 || orderStatus == 3) {
                  _this.seatProcess = orderStatus == 0 ? '01' : '02'
                  clearInterval(_this.interval2)
                }
              })
            }, 3000)
          })
        }
      },
      selectTicketChange(id) {
        let index = this.idArr.indexOf(id)
        if (index > -1) {
          this.idArr.splice(index, 1)
        } else {
          this.idArr.push(id)
        }
      },
      //改签占座
      changeTicket() {
        let _this = this
        if (this.idArr.length == 0) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '您还没有选择改签人'
          })
        } else {
          if (this.firstClick) {
            this.firstClick = false
            this.$vux.loading.show()
            newTicketChange({
              newFromStation: this.Info.departStation, // 出发站名称（例：武汉）
              newToStation: this.Info.arriveStation, // 到达站名称（例：北京西）
              newTrainDate: this.Info.departTime.split(' ')[0], // 火车出发时间日期（例:2016-5-20）
              newTrainNo: this.Info.trainNo, // 车次号（例：G402）
              newDepartTime: this.Info.departTimeStr, // 火车出发时间（例：12:51）
              newArriveTime: this.Info.arriveTimeStr, // 火车抵达时间（例：18:51）
              departureDateFull: this.Info.departTime, //火车完整出发时间
              destinationDateFull: this.Info.arriveTime, //火车完整抵达时间
              orderId: this.$route.query.orderSn, // 高铁管家订单号
              ticketType: '1', // 车票类型 1成人票，2儿童票,
              seatType: BZ.seatCode(this.seat.seatType), // 席座编码 0.无座1.一等座 2.二等座 3.硬座 4.软座 7.硬卧9.软卧10.高级软座11.商务座12特等座15动卧16高级动卧17一等软座 18二等软座 19包厢硬卧
              ticketPrice: this.seat.price, // 车票价钱
              ids: this.idArr.join(','), // 需要改签的人的id；多个改签人时时，中间用逗号割开（如：123,234,456）
              trainTime: this.Info.trainTime,
              xqcUserId: this.userInfo.id
              // xqcUserId:53927
            }).then(res => {
              console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓')
              console.log('改签占座结果', res)
              console.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑')
              this.orderSn = res.data.orderSn;
              if(res.data.amountOfPayment>0){ //跳支付
                this.$vux.loading.hide()
                this.goPay();
              } else {
                ticketChange({
                  newFromStation: this.Info.departStation, // 出发站名称（例：武汉）
                  newToStation: this.Info.arriveStation, // 到达站名称（例：北京西）
                  newTrainDate: this.Info.departTime.split(' ')[0], // 火车出发时间日期（例:2016-5-20）
                  newTrainNo: this.Info.trainNo, // 车次号（例：G402）
                  newDepartTime: this.Info.departTimeStr, // 火车出发时间（例：12:51）
                  newArriveTime: this.Info.arriveTimeStr, // 火车抵达时间（例：18:51）
                  departureDateFull: this.Info.departTime, //火车完整出发时间
                  destinationDateFull: this.Info.arriveTime, //火车完整抵达时间
                  orderId: this.$route.query.orderSn, // 高铁管家订单号
                  ticketType: '1', // 车票类型 1成人票，2儿童票,
                  seatType: BZ.seatCode(this.seat.seatType), // 席座编码 0.无座1.一等座 2.二等座 3.硬座 4.软座 7.硬卧9.软卧10.高级软座11.商务座12特等座15动卧16高级动卧17一等软座 18二等软座 19包厢硬卧
                  ticketPrice: this.seat.price, // 车票价钱
                  ids: this.idArr.join(','), // 需要改签的人的id；多个改签人时时，中间用逗号割开（如：123,234,456）
                  trainTime: this.Info.trainTime,
                  orderSn:res.data.orderSn,
                  xqcUserId: this.userInfo.id
                  // xqcUserId:53927
                }).then(result=>{
                  this.$vux.loading.hide();
                  console.log("旧改签占座",result)
                  this.$router.push({
                    path:'/orderDetail',
                    query: {
                      orderSn: this.type?this.ticketChangeOrder:this.orderSn,
                    }
                  })
                })
              }
              // if (res.data.status == 'FAILURE') {
              //   _this.$vux.alert.show({
              //     title: '温馨提示',
              //     content: res.data.msg
              //   })
              //   return
              // } else {
              //   _this.occupiedOr = true
              //   _this.seatProcess = '00'
              //   _this.orderSn = res.data.merchantOrderId
              //   _this.$nextTick(() => {
              //     let that = _this
              //     let index = 0
              //     _this.interval3 = setInterval(function() {
              //       if (index == 4) {
              //         clearInterval(_this.interval3)
              //         return
              //       }
              //       if (that.seatProcess == '00') {
              //         that.$refs['item' + ++index].style.visibility = 'visible'
              //       } else {
              //         index = 4
              //       }
              //     }, 1500)
              //     // if(that.$refs.loading){
              //     //   let str = getComputedStyle(this.$refs.loading).width;
              //     //   that.options.rectWidth = str.substring(0,str.length-2); //获取模态框宽度
              //     // }
              //   })
              //   _this.interval4 = setInterval(function() {
              //     orderDetail({
              //       orderSn: res.data.merchantOrderId,
              //       xqcUserId: _this.userInfo.id
              //     }).then(res => {
              //       console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓')
              //       console.log('查询订单详情', res)
              //       console.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑')
              //       let orderDetail = res.data[1].orderList[res.data[1].orderList.length - 1]
              //       _this.orderRiderList = orderDetail.orderRiderList
              //       _this.orderDetail = orderDetail.orderDetail
              //       let retreatingStatus =
              //         _this.orderRiderList[0].retreatingStatus
              //       if (
              //         retreatingStatus == 2 ||
              //         retreatingStatus == 3 ||
              //         retreatingStatus == 4
              //       ) {
              //         _this.seatProcess = retreatingStatus == 4 ? '02' : '03'
              //         clearInterval(_this.interval4)
              //       }
              //     })
              //   }, 3000)
              // }
            })
          }
        }
      },
      ticketChangeCancel() {
        this.occupiedOr = false
        this.seatProcess = '11'
      }
    },
    beforeDestroy() {
      this.TELEPHONE_CHANGE(this.contactPhone)
      if (this.interval1) clearInterval(this.interval1)
      if (this.interval2) clearInterval(this.interval2)
      // if (this.interval3) clearInterval(this.interval3)
      // if (this.interval4) clearInterval(this.interval4)
    },
    directives: {
      TransferDom
    },
    components: {
      TrainTop,
      InputR,
      Popup,
      PopupHeader,
      Multi,
      Notice,
      Foote,
      Seat,
      CustomPopup,
      InlineLoading,
      XButton,
      XDialog,
      ProgressBar
    }
  }
</script>
<style  scoped>
  .price {
    margin: 0 10px;
  }
  .train_item {
    height: 40px;
  }
  .train_item div {
    width: 25%;
  }
  .per_header {
    height: 46px;
  }
  .limit {
    margin-left: 10px;
  }
  .seat_type {
    margin-top: 8px;
  }
  .seat_type_header {
    height: 45px;
  }
  .seat_type_item {
    height: 35px;
    padding-bottom: 15px;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    -o-box-sizing: content-box;
    -ms-box-sizing: content-box;
    box-sizing: content-box;
  }
  .seat_type_item > div {
    width: 12.5%;
    position: relative;
  }
  .letter {
    position: absolute;
    color: #ffffff;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .passenger_item {
    height: 63px;
  }
  .passenger_item:last-child div:after {
    border: 0 !important;
  }
  .passenger_item_img {
    height: 20px;
    padding: 0 15px 12px;
  }
  .passenger_item_info {
    height: 64px;
  }
  .passenger_item_info_r {
    margin-right: 12px;
  }
  .new_item {
    height: 44px;
    padding-right: 12px;
    margin-top: 8px;
  }
  .new_item_title {
    padding-right: 12px;
  }
  .id {
    margin-right: 9px;
  }
  .new_item input {
    width: 100%;
    height: 44px;
    outline: none;
    border: none;
    text-align: right;
    font-size: 16px;
  }
  .invoice {
    margin-top: 8px;
    height: 45px;
  }
  .custom {
  }
  .custom_header {
    margin-bottom: 8px;
  }
  .custom_progress {
    height: 32px;
  }
  .custom .loading {
    margin-bottom: 10px;
  }
  .custom_success_header {
    margin-bottom: 15px;
    position: relative;
  }
  .custom_success_img {
    margin-right: 10px;
  }
  .close {
    position: absolute;
    right: -7px;
    top: -7px;
  }
  .custom_success_info {
    height: 26px;
  }
  .custom_success_side {
    margin-right: 10px;
    height: 15px;
  }
  .seat_fail_tip {
    height: 100px;
  }
  .order_price {
    margin-top: 7px;
    height: 44px;
  }
  .contacts {
    margin-top: 8px;
  }
  .contacts_title {
    height: 45px;
  }
  .contacts_info_item {
    height: 63px;
    padding-left: 12px;
  }
  .contacts_info_item > div {
    height: 100%;
  }
  .contacts_info_item > div:last-child:after {
    border: 0 !important;
  }
  .ticket_change {
    padding: 5px 0px 15px;
  }
  .ticket_change_item:nth-child(1) {
    margin-bottom: 15px;
  }
  .ticket_change_item:nth-child(2) {
    margin-bottom: 15px;
  }
  .ticket_change_total {
    margin: 15px 0 7px;
  }
  .ticket_btn {
    margin-top: 15px;
  }
  .ticket_btn > div {
    width: 50%;
  }
  .ticket_btn > div:nth-child(1) {
    padding-right: 7px;
  }
  .ticket_btn > div:nth-child(2) {
    padding-left: 7px;
  }
  .contactPhone {
    padding-right: 0px !important;
    padding-left: 12px;
  }
  .form .bz_header {
    position: absolute !important;
    width: 100%;
    z-index: 100;
  }
  .form >>> .weui-tab__panel {
    padding-top: 128px !important;
    /* overflow: hidden; */
  }
</style>
