	
//lineType show
$("#header ul.tool li.line").click(function(){
	$("#header .lineType").slideDown(300);
});
$("#header .lineType p").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
	$("#header .lineType").slideUp(500);
});

//button active
$("#header ul.tool li").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
});
$("#header ul.tool .lineType p").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
});



//绑定事件
addEventHander(penType[0],"click",Pencil,false);
addEventHander(penType[1],"click",Pen,false);
addEventHander(penType[2],"click",Tuya,false);
addEventHander(lineType[0],"click",Line,false);
addEventHander(lineType[1],"click",Square,false);
addEventHander(lineType[2],"click",Circular,false);
addEventHander(lineType[3],"click",Poly,false);
addEventHander(lineType[4],"click",SquareFill,false);
addEventHander(lineType[5],"click",CircularFill,false);
addEventHander(lineType[6],"click",PolyFill,false);
addEventHander(colorType[0],"click",Color,false);
addEventHander(colorType[1],"click",FrontColor,false);
addEventHander(colorType[2],"click",Straw,false);
addEventHander(colorType[3],"click",Font,false);
addEventHander(colorType[4],"click",Eraser,false);
addEventHander(colorType[5],"click",Magnifier,false);
addEventHander(funcType[0],"click",Redo,false);
addEventHander(funcType[1],"click",CancelPrev,false);
addEventHander(funcType[2],"click",ClearSceen,false);
addEventHander(funcType[3],"click",Download,false);
addEventHander(funcType[4],"click",Saveimg,false);
addEventHander(lineWidths[0],"click",LineW1,false);
addEventHander(lineWidths[1],"click",LineW3,false);
addEventHander(lineWidths[2],"click",LineW5,false);
addEventHander(lineWidths[3],"click",LineW8,false);

//初始化
window.onload = init;

function init(){
	//默认选择pencil
	Pencil();

	
	//默认线宽
	setLineWidth(2);
	
}

