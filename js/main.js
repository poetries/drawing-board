	
//lineType show
$("#header ul.tool li.line").hover(function(){
	$(this).find(".lineType").show();
},function(){
	$(this).find(".lineType").hide();
});

//button active
$("#header ul.tool li").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
});
$("#header ul.tool .lineType p").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
});


//获取所有工具样式标签相关的引用

//笔触
var pencil = document.getElementById("pencil");
var pen = document.getElementById("pen");
var brush = document.getElementById("brush");
var tuya = document.getElementById("tuya");

//线类型
var lineSize = document.getElementById("lineSize");
var line = document.getElementById("line");
var square = document.getElementById("square");
var circular = document.getElementById("circular");

//颜色风格
var color = document.getElementById("color");
var frontColor =document.getElementById("frontColor");
var straw = document.getElementById("straw");//吸管
var font = document.getElementById("font");
var eraser =document.getElementById("eraser");

//功能
var cancelPrev =document.getElementById("cancelPrev");
var redo = document.getElementById("redo");
var clearSceen = document.getElementById("clearSceen");
var download =document.getElementById("download");
var saveImg = document.getElementById("saveImg");

var penType = [pencil,pen,brush,tuya];
var lineType = [lineSize,line,square,circular];
var colorType = [color,frontColor,straw,font,eraser];
var funcType = [cancelPrev,redo,clearSceen,download,saveImg];

//设置canvas绘图环境
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


//事件兼容写法
function addEventHander(obj,eventName,hander,type){
    if (document.attachEvent){
        obj.attachEvent("on"+eventName,hander);
	} else if(document.addEventListener) {
		obj.addEventListener(eventName,hander,type);
	}
}


//绑定事件
addEventHander(penType[0],"click",Pencil,false);
addEventHander(penType[1],"click",Pen,false);
addEventHander(penType[2],"click",Brush,false);
addEventHander(penType[3],"click",Tuya,false);
addEventHander(lineType[0],"click",LineSize,false);
addEventHander(lineType[1],"click",Line,false);
addEventHander(lineType[2],"click",Square,false);
addEventHander(lineType[3],"click",Circular,false);
addEventHander(colorType[0],"click",Color,false);
addEventHander(colorType[1],"click",FrontColor,false);
addEventHander(colorType[2],"click",Straw,false);
addEventHander(colorType[3],"click",Font,false);
addEventHander(colorType[4],"click",Eraser,false);
addEventHander(funcType[0],"click",Redo,false);
addEventHander(funcType[1],"click",CancelPrev,false);
addEventHander(funcType[2],"click",ClearSceen,false);
addEventHander(funcType[3],"click",Download,false);
addEventHander(funcType[4],"click",Saveimg,false);

//状态设置函数

function setStatus(Arr,num,type){
	for (var i = 0;i < Arr.length; i++) {
		if (i == num) {
			if (type == 1) {
				Arr[i].style.background = "#49a4db";
			} else{
				Arr[i].style.border = "1px solid #fff"; 
			}
		} else{
			if (type == 1) {
				Arr[i].style.background = "#ccc";
			} else{
				Arr[i].style.border = "1px solid #000"; 
			}
		}
	}
}

//设置初始值 
//默认选择pencil
Pencil();


//对应函数

function Pencil(){
	setStatus(penType,0,1);
	var flag = 0;//设置标志位 检测鼠标是否按下
	canvas.onmousedown = function(e){
	  //获取当前鼠标相对于canvas起始点(0,0)坐标
	  //获取鼠标相对于页面顶端距离
	  e = window.event || e;
	  var startX = e.pageX - this.offsetLeft;
	  var startY = e.pageY - this.offsetTop;
	  //alert(startX + "|"+startY);
	  ctx.beginPath();
	  ctx.moveTo(startX,startY);
	  flag = 1;
	}
	
	//鼠标移动的时候 不同的绘图（获取鼠标的位置）
	canvas.onmousemove = function(e){
	  e = window.event || e;
	  var endX = e.pageX - this.offsetLeft;
	  var endY = e.pageY - this.offsetTop;
	  //判断鼠标是否按下
	  if(flag){
	     //移动的时候设置路径并画图
	    ctx.lineTo(endX,endY);
	    ctx.stroke();
	  }
	  
	 
	}
	//鼠标抬起的时候结束绘图
	canvas.onmouseup = function(){
	  flag = 0;
	}
	
	//鼠标 出canvas取消画图操作
	canvas.onmouseout = function(){
	  flag = 0;
	}
}
function Pen(){
	setStatus(penType,1,1);
}
function Brush(){
	setStatus(penType,2,1);
}
function Tuya(){
	setStatus(penType,3,1);
}
function LineSize(){
	setStatus(lineType,0,1);
}
function Line(){
	setStatus(lineType,1,1);
}
function Square(){
	setStatus(lineType,2,1);
}
function Circular(){
	setStatus(lineType,3,1);
}
function Color(){
	setStatus(colorType,0,1);
}
function FrontColor(){
	setStatus(colorType,1,1);
}
function Straw(){
	setStatus(colorType,2,1);
}
function Font(){
	setStatus(colorType,3,1);
}
function Eraser(){
	setStatus(colorType,4,1);
}
function Redo(){
	setStatus(funcType,0,1);
}
function CancelPrev(){
	setStatus(funcType,1,1);
}
function ClearSceen(){
	setStatus(funcType,2,1);
}
function Download(){
	setStatus(funcType,3,1);
}
function Saveimg(){
	setStatus(funcType,4,1);
}

//画图步骤
/**
 * 开始绘图路径 ctx.beginPath()
 * 设置绘图的开始点 ctx.moveTo(); 鼠标按下的时候
 * 绘制不同的点 ctx.lineTo();//鼠标移动的时候
 * 绘制不同的点 ctx.lineTo();
 * 绘制不同的点 ctx.lineTo();
 * 结束绘图路径 ctx.closePath();
 * 用画笔画出路径 ctx.stroke(); 鼠标移动的时候
 * 结束绘图的时候 鼠标抬起
 */

