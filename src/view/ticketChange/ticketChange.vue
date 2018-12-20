
<template>
    <view-box ref="viewBox" style="background:#fff;">
        <x-header slot="header" :left-options="{backText:''}">
            火车票改签说明
        </x-header>
        <div class="eight"></div>
        <div class="f-16 title padding-primary vux-1px-b">
            <span class="">改签说明</span>
         </div>
        <ul class="padding-primary words f-16">
            <li>在线改签时间：6:00-23:00</li>
            <li>改签条件：未取纸质票，且离发车时间大于30分钟。 </li>
            <li>进藏列车等其他不能在线改签的情况需在发车前至火车站窗口办理。</li>
        </ul>
        <div class="eight"></div>
        <div class="f-16 title padding-primary vux-1px-b">
            <span class="">改签规则及手续费</span>
        </div>
        <ul class="padding-primary words f-16">
            <li class="distance">开车前48小时（不含）以上，可改签预售期内 有余票的车次。</li>
            <li class="distance">开车前48小时以内，可改签至票面当天24:00之前有余票的车次，不办理票面日期次日及以后的改签。新车票票价低于原车票的，退还差额，对差额部分核收退票费并执行现行退票费标准。新车票票价高于原车票的，需重新支付车票费用，原车票费用15个工作日内退回。</li>
            <li class="distances">铁路局规定，高价票改签低价票时，将对差额部分收取退票费。规则如下：</li>
            <li>1）发车前15天（不含）以上的，不收取手续费。</li>
            <li>2）48小时～15天（含），收取票面5%手续费。</li>
            <li>3）24小时～48小时，收取票面10%手续费。</li>
            <li>4）24小时以内，收取票面20%手续费。</li>
            <li style="margin-bottom: 20px;">最终退款以铁路局实退为准（需收费情况下，四舍五入最低收取2元）</li>
        </ul>
        
    </view-box>
    
</template>

<style lang="less" scoped>
.title{
    height: 46px;
    line-height: 46px; 
    background: #fff; 
    font-weight: 800;
}
.words{
    background: #fff;
    padding: 15px 12px;
}
.words .distance{
    margin-bottom: 35px;
    text-indent: 2em; 
}
.words .distances{
    text-indent: 2em; 
}
     
.eight{ 
    height: 8px;
    background: #F5F5F5;
}
</style>