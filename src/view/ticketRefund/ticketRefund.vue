<template>
    <view-box ref="viewBox" style="background:#fff;">
        <x-header slot="header" :left-options="{backText:''}">
            火车票退票说明
        </x-header>
        <div class="eight"></div>
        <div class="f-16 title padding-primary vux-1px-b">
            <span class="">退票说明</span>
         </div>
        <ul class="padding-primary words f-16">
            <li>在线退票时间：6:00-23:00。</li>
            <li>退票条件：未取纸质票，且离发车时间大于30分钟。</li>
            <li>进/出藏列车等其他不能在线退票的情况需在发车 前至火车站窗口办理。</li>


        </ul>
        <div class="eight"></div>
        <div class="f-16 title padding-primary vux-1px-b">
            <span class="">退票手续费</span>
        </div>
        <ul class=" box f-14" flex="box:mean cross：center" style="background: #FBFBFB">
            <li class="left">
                <span class="title_word f-16" >申请退票发车时间</span>
                <div flex="1 0 0" >
                    <div class="f-0 custom"><img src="../../assets/images/times.png" width="20px"/></div>
                    <div>15天(不含)以上</div>
                </div>
                <div flex="" >
                    <div class="f-0 custom"><img src="../../assets/images/times.png" width="20px"/></div>
                    <div>48小时-15天</div>
                </div>
                 <div flex="" >
                    <div class="f-0 custom"><img src="../../assets/images/times.png" width="20px"/></div>
                    <div style="text-align:left;">24小时-48小时(不含)</div>
                </div>
                 <div flex="">
                    <div class="f-0 custom"><img src="../../assets/images/times.png" width="20px"/></div>
                    <div>不足24小时</div>
                </div>
            </li>
            <li class="right">
                <div class="f-16" style="color: #E0AA5E; background:#FFE3BB">收取手续费</div>
                <div class="word_color" style="width:20%; margin-left:25%;">无</div>
                <div>票价<span class="word_color"> 5%</span></div>
                <div>票价<span class="word_color"> 10%</span></div>
                <div>票价<span class="word_color"> 20%</span></div>
            </li>
        </ul>
        <ul class="padding-primary word f-16">
            <li>开车前48小时～15天期间内，改签或变更到站至距开车15天以上的其他列车，又在距开车15天前退票的，仍核收5%的退票费。</li>
            <li>收取相关退票手续费时，手续费不足2元按2元收取，最终退款以铁路局实退为准。</li>
            <li>据铁路局规定，列车在发车后不能办理退票。高铁票可在车票始发站办理改签，改签至乘车日期（发车当天）24点之前其他有余票的车次。</li>

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
    padding: 18px 12px;
}
.word{
    background: #fff; 
    padding:0 12px ;
    text-indent: 2em; 
}
.word li{ 
    margin-bottom: 35px;
}
.eight{ 
    height: 8px; 
    background: #F5F5F5;
}
.box{ 
    margin: 20px 12px;
}
.box li{ 
    text-align:center;
}
.box .right div{ 
    text-align: center; 
    line-height: 33px;
}
.box .left div{ 
    text-align: center; 
    line-height: 33px;
}
.box .right{
    background: #FFF4E5;
}
.word_color{
    color:#E54100
}
.custom{ 
    height: 15px; 
    margin-top:6px; 
    margin-left: 11%; 
    margin-right:1px;
}
.left{ width: 20%;}
.title_word{  
    background: #E7E7E7; 
    color:#999; 
    display: inline-block; 
    height: 33px;
    width: 100%; 
    line-height: 33px;
}
</style>