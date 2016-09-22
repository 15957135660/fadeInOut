/**
 * Created by Administrator on 2016/8/24.
 */
function ID(id){
    return document.getElementById(id);
}
function Tag(obj,tagName){
    obj=obj?obj:document;
    return obj.getElementsByTagName(tagName);
}

var flashNode=ID('flash');
var leftNode=ID('flash_left');
var rightNode=ID('flash_right');
var spanNode=Tag(flashNode,'span');
var lisNode=Tag(flashNode,'li');

for(var i=0;i<spanNode.length;i++){
    spanNode[i].index=i;
    spanNode[i].onmouseenter=function(){
        if(this.className=="current")
            return;//跳出函数

        var nowPos=this.index;
        var oldPos;

        for(var i=0;i<spanNode.length;i++)
        {
            if(spanNode[i].className=="current"){
                oldPos=i;
                break;//跳出函数
            }
        }
        fadeInOut(oldPos,nowPos,0);
    }
}

var cleartimeout;
function fadeInOut(oldPos,nowPos,num){
    if(num==0)//递归开始的时候触发一次
    {
        for(var i=0;i<lisNode.length;i++){//移动很快时，将不做递归动画的节点直接透明掉（移动很快很多递归一起触发，但是已经处理只保留最后一个递归）
            if(i!=oldPos && i!=nowPos)
            {
                lisNode[i].style.opacity=0;
                lisNode[i].style.filter="alpha(opacity=0)";
                lisNode[i].style.display="none";
            }
        }

        spanNode[oldPos].className='';
        spanNode[nowPos].className='current';

        lisNode[nowPos].style.display='';//显示，然后慢慢淡入
    }

    window.clearTimeout(cleartimeout);//移动很快很多递归一起触发，保证只保留最后一个递归
    num+=5;
    //console.log(oldPos,nowPos,num);
    if(num<=100){//淡入淡出过程中
        lisNode[oldPos].style.opacity=(100-num)/100;//兼容非IE
        lisNode[oldPos].style.filter="alpha(opacity="+(100-num)+")";//兼容IE

        lisNode[nowPos].style.opacity=num/100;//兼容非IE
        lisNode[nowPos].style.filter="alpha(opacity="+num+")";//兼容IE

        cleartimeout=window.setTimeout(function(){
            fadeInOut(oldPos,nowPos,num)
        },20);
    }
    else{//完成动画
        lisNode[oldPos].style.display="none";
    }
}
flashNode.onmouseover=function(){
    leftNode.style.display='';
    rightNode.style.display='';
    clearInterval(timer);
}
flashNode.onmouseout=function(){
    leftNode.style.display='none';
    rightNode.style.display='none';
    timer=setInterval(autoDo,2000);
}
leftNode.onclick=function(){
    var nowPos,oldPos;
    for(var i=0;i<spanNode.length;i++)
    {
        if(spanNode[i].className=="current"){
            oldPos=i;
            break;//跳出函数
        }
    }
    if(oldPos>0){
        nowPos=oldPos-1;
    }
    else{
        nowPos=2;
    }
    fadeInOut(oldPos,nowPos,0);


}
rightNode.onclick=autoDo;
    function autoDo(){
    var nowPos,oldPos;
    for(var i=0;i<spanNode.length;i++)
    {
        if(spanNode[i].className=="current"){
            oldPos=i;
            break;//跳出函数
        }
    }
    if(oldPos<2){
        nowPos=oldPos+1;
    }
    else{
        nowPos=0;
    }
    fadeInOut(oldPos,nowPos,0);
}

var timer=setInterval(autoDo,2000);