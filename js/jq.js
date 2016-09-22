/**
 * Created by Administrator on 2016/8/30.
 */
var flashNode=$("#flash");
var spanNode=flashNode.find('span');
var lisNode=flashNode.find('li');
var width=$("li:first").width();
var newPos, oldPos;
spanNode.mouseenter(function(){
    if($(this).hasClass(".current")){
        return;
    }
    newPos = $(this).index();
    oldPos=$("#flash .flash_btn .current").index();
    $(this).addClass('current').siblings(".current").removeClass();
    fade(newPos,oldPos);
})
flashNode.mouseenter(function(){
    $('.flash_left,.flash_right').show();
    clearInterval(timer);
})
flashNode.mouseleave(function(){
    $('.flash_left,.flash_right').hide();
    timer=setInterval(function(){
        $(".flash_right").click();
    },1000)
})
function fade(newPos,oldPos){
    lisNode.eq(newPos).stop(false,true).fadeIn(1000);
    lisNode.eq(oldPos).stop(false,true).fadeOut(1000);
}
$(".flash_left").click(function(){
    oldPos=$("#flash .flash_btn .current").index();
    lastPos=spanNode.length-1;
    newPos=oldPos>0?oldPos-1:lastPos;
    fade(newPos,oldPos);
    spanNode.eq(oldPos).removeClass();
    spanNode.eq(newPos).addClass('current');
})
$(".flash_right").click(function(){
    oldPos=$("#flash .flash_btn .current").index();
    lastPos=spanNode.length-1;
    newPos=oldPos<lastPos?oldPos+1:0;
    fade(newPos,oldPos);
    spanNode.eq(oldPos).stop(false,true).removeClass();
    spanNode.eq(newPos).stop(false,true).addClass('current');
})
var timer=setInterval(function(){
    $(".flash_right").click();
},1000)
