var fadeObj={
	flashNode:$('#flash'),
	lisNode:$("#flash li"),
	spansNode:$("#flash .flash_btn span"),
	leftNode:$('#flash_left'),
	rightNode:$('#flash_right'),
	spanCurString:'#flash .flash_btn .current',
	spanCurName:"current",
	fadeInOut:function(oldPos,curPos){
		fadeObj.spansNode.eq(oldPos).removeClass();
		fadeObj.spansNode.eq(curPos).addClass(fadeObj.spanCurName);
		
		fadeObj.lisNode.eq(oldPos).stop(false,true).fadeOut();
		fadeObj.lisNode.eq(curPos).stop(false,true).fadeIn();
	},
	autoDo:null
};
fadeObj.flashNode.hover(
	function(){//移入
		fadeObj.leftNode.show();
		fadeObj.rightNode.show();
		window.clearInterval(fadeObj.autoDo);
	},
	function(){//移出
		fadeObj.leftNode.hide();
		fadeObj.rightNode.hide();
		fadeObj.autoDo=window.setInterval(function(){
			fadeObj.rightNode.click();
		},3000);
	}
);

fadeObj.spansNode.mouseenter(function(){
	if($(this).is("."+fadeObj.spanCurName))
	{
		return;
	}
	
	var oldPos=$(fadeObj.spanCurString).index();
	var curPos=$(this).index();
	
	fadeObj.fadeInOut(oldPos,curPos);
});

fadeObj.rightNode.click(function(){
	var oldPos=$(fadeObj.spanCurString).index();
	var lastPos=fadeObj.spansNode.length-1;
	var curPos=oldPos==lastPos?0:oldPos+1;
	
	fadeObj.fadeInOut(oldPos,curPos);
});
fadeObj.leftNode.click(function(){
	var oldPos=$(fadeObj.spanCurString).index();
	var lastPos=fadeObj.spansNode.length-1;
	var curPos=oldPos==0?lastPos:oldPos-1;
	
	fadeObj.fadeInOut(oldPos,curPos);
});
fadeObj.autoDo=window.setInterval(function(){
	fadeObj.rightNode.click();
},3000);
