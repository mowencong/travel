import Vue from 'vue'
import Router from 'vue-router'
// 验证权限
import { validataRight, solveRight } from 'bzcommon/src/services/validateRight'

const Enter = () => import('../../src/view/enter/enter')
const TicketList = () => import('../../src/view/ticketList/ticketList')
const TrainDetail = () => import('../../src/view/trainDetail/trainDetail')
const Seat = () => import('../../src/view/seat/seat')
const AddPassenger = () => import('../../src/view/addPassenger/addPassenger')
const EditPassenger = () => import('../../src/view/editPassenger/editPassenger')
const NewPassenger = () => import('../../src/view/newPassenger/newPassenger')
const Order = () => import('../view/order/order')
const OrderDetail = () => import('../view/order/orderDetail')
const ApplyRefund = () => import('../view/applyRefund/applyRefund')
const traintTimetable = () => import('../view/traintTimetable/traintTimetable')
const ticketChange = () => import('../../src/view/ticketChange/ticketChange')
const ticketRefund = () => import('../../src/view/ticketRefund/ticketRefund')
const Refund = () => import('../../src/view/order/refund')

Vue.use(Router)

const router = new Router({
  // scrollBehavior,
  routes: [
    {
      path: '/',
      redirect:'/enter',
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/enter',
      name:'Enter',
      component:Enter,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/traintTimetable',
      name:'traintTimetable',
      component:traintTimetable,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/ticketRefund',
      name:'ticketRefund',
      component:ticketRefund,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/ticketList',
      name:'TicketList',
      component:TicketList,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/trainDetail',
      name:'TrainDetail',
      component:TrainDetail,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/ticketChange',
      name:'ticketChange',
      component:ticketChange,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/seat',
      name:'Seat',
      component:Seat,
      meta:{
        keepAlive:false,
        right:['login']
      }
    },
    {
      path: '/addPassenger',
      name:'AddPassenger',
      component:AddPassenger,
      meta:{
        keepAlive:false,
        right:['login']
      }
    },
    {
      path: '/editPassenger',
      name:'EditPassenger',
      component:EditPassenger,
      meta:{
        keepAlive:false,
        right:['login']
      }
    },
    {
      path: '/newPassenger',
      name:'NewPassenger',
      component:NewPassenger,
      meta:{
        keepAlive:false,
        right:['login']
      }
    },
    {
      path: '/order/:index',
      name:'Order',
      component:Order,
      meta:{
        keepAlive:false,
        right:['login']
      }
    },
    {
      path: '/orderDetail',
      name:'OrderDetail',
      component:OrderDetail,
      meta:{
        keepAlive:false,
        right:['login']
      },
    },
    {
      path: '/applyRefund',
      name:'ApplyRefund',
      component:ApplyRefund,
      meta:{
        keepAlive:false,
        right:['login']
      },
    },
    {
      path: '/refund',
      name:'Refund',
      component:Refund,
      meta:{
        keepAlive:false,
        right:['login']
      },
    }
  ],
})


export default router
