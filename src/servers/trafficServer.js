import { http } from 'bzcommon'

/**
 * 火车票车次列表查询
 */
export function ticketList(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficBuyTickets/h5/v1/spareTicketList`,
    {...obj}
  )
}

/**
 * 新增联系人
 */
export function newPassenger(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficRider/h5/v1/saveAndUpdateRider`,
    {...obj}
  )
}

/**
 * 根据薪起程用户id查询乘车人列表
 */
export function selectPassenger(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficRider/h5/v1/queryRiderListByUserId`,
    {...obj}
  )
}

/**
 * 删除联系人
 */
export function deletePassenger(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficRider/h5/v1/deleteRider`,
    {...obj}
  )
}

/**
 * 占座
 */
export function occupiedSeat(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficBookOrder/h5/v1/bookOrder`,
    {...obj}
  )
}


/**
 * 占座查询
 */
export function querySeat(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficQueryOrder/h5/v1/queryOrderDetail`,
    {...obj}
  )
}


/**
 * 订单列表查询
 */
export function orderList(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficQueryOrder/h5/v1/queryOrderList`,
    {...obj}
  )
}

/**
 * 订单详情查询
 */
export function orderDetail(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficQueryOrder/h5/v1/queryOrderDetail`,
    {...obj}
  )
}


/**
 * 获取去支付需要的参数信息
 */
export function getPaymentOrder(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficPaymentOrder/h5/v1/getPaymentOrder`,
    {...obj}
  )
}

/**
 * 退票
 */
export function applyRefund(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficBuyTickets/h5/v1/refundTicket`,
    {...obj}
  )
}

/**
 * 改签占座
 */
export function ticketChange(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficBuyTickets/h5/v1/changeSeat`,
    {...obj}
  )
}

/**
 * 确认改签
 */
export function changeConfirm(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficBuyTickets/h5/v1/changeConfirm`,
    {...obj}
  )
}


/**
 * 	根据车次和出发日期查询列车时刻表
 */
export function trainTime(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficBuyTickets/h5/v1/queryTrainTime`,
    {...obj}
  )
}

/**
 * 	取消订单
 */
export function cancelOrder(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficBuyTickets/h5/v1/changeCancels`,
    {...obj}
  )
}

/**
 * 	删除订单
 */
export function deleteOrder(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficBuyTickets/h5/v1/deleteOrderByOrderSn`,
    {...obj}
  )
}

/**
 * 	查询是否可以开发票
 */
export function queryInvoice(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/hotel/invoice/h5/v1/queryInvoiceProjectInfo`,
    {...obj}
  )
}

/**
 * 	查询退款订单列表
 */
export function queryRefundOrderList(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficQueryOrder/h5/v1/queryRefundOrderList`,
    {...obj}
  )
}

/**
 * 	新改签接口
 */
export function newTicketChange(obj) {
  return http.$httpPost(
    `${window.IP.resourcesPortIP}travel/railway/trafficChangeTickets/h5/v1/changeTicket`,
    {...obj}
  )
}
