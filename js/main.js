	
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
var tuya = document.getElementById("tuya");
var lineSize = document.getElementById("lineSize");

//线类型

var line = document.getElementById("line");
var square = document.getElementById("square");
var circular = document.getElementById("circular");
var poly = document.getElementById("poly");
var squareFill = document.getElementById("squareFill");
var circularFill = document.getElementById("circularFill");
var polyFill = document.getElementById("polyFill");

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

var penType = [pencil,pen,tuya,lineSize];
var lineType = [line,square,circular,poly,squareFill,circularFill,polyFill];
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
addEventHander(penType[2],"click",Tuya,false);
addEventHander(penType[3],"click",LineSize,false);
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
addEventHander(funcType[0],"click",Redo,false);
addEventHander(funcType[1],"click",CancelPrev,false);
addEventHander(funcType[2],"click",ClearSceen,false);
addEventHander(funcType[3],"click",Download,false);
addEventHander(funcType[4],"click",Saveimg,false);

//状态设置函数

/*function setStatus(Arr,num,type){
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
*/
//设置初始值 
//默认选择pencil
Pencil();


//对应函数

function Pencil(){
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

	//setStatus(penType,0,1);
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
	//setStatus(penType,1,1);
}

function Tuya(){
	//setStatus(penType,3,1);
}
function LineSize(){
	//setStatus(lineType,0,1);
}
function Line(){
	//setStatus(lineType,1,1);
/**
 * 画直线分析：
 * 鼠标点击下去的时候获取直线的开始点
 * 鼠标抬起的时候获取直线的结束点
 * 鼠标移出画布的时候不做任何操作
 */
	canvas.onmousedown = function(e){
		e = e || window.event;
		//获取起始点坐标 相对canvas画布
		//浏览器距离页面顶端距离 e.pageX e.pageY
		//当前画布相对于页面顶端 左端距离 canvas.offsetTop canvas.offsetLeft
		
		//计算当前鼠标相对于canvas画布的距离
		var startX = e.pageX - this.offsetLeft;
		var startY = e.pageY - this.offsetTop;
		//设置直线的开始点
		ctx.beginPath();
		ctx.moveTo(startX,startY);

	}
	canvas.onmousemove = null;//注销其他工具注册的事件
	canvas.onmouseout = null;
	
	//鼠标抬起的时候
	canvas.onmouseup = function(e){
		//计算鼠标抬起时鼠标相对画布的坐标
		var endX = e.pageX - this.offsetLeft;
		var endY = e.pageY - this.offsetTop;
		
		//设置路径 链接开始和结束点 进行绘图
		ctx.lineTo(endX,endY);
		ctx.closePath();
		ctx.stroke();
	}

}
//设置矩形 全局变量
var rectX = 0;
var rectY = 0;

function Square(){
	//setStatus(lineType,2,1);
	/**
	 * 画矩形分析：
	 * 鼠标按下的时候 获取矩形开始点
	 * 鼠标抬起的时候，获取矩形结束点 计算矩形宽高
	 * 鼠标抬起的时候获取直线的结束点
 	 * 鼠标移出画布的时候不做任何操作
	 */
	
	canvas.onmousedown = function(e){
		e = e || window.event;
		//获取矩形左上角（对角线的开始点）
		rectX = e.pageX - this.offsetLeft;
		rectY = e.pageY - this.offsetTop;
	}
	canvas.onmouseup = function(e){
		//获取鼠标当前坐标 画出矩形
		e = e || window.event;
		var endX = e.pageX - this.offsetLeft;
		var endY = e.pageY - this.offsetTop;
		
		//计算矩形宽高
		var rectW = endX - rectX;
		var rectH = endY - rectY;
		//画出矩形
		ctx.strokeRect(rectX,rectY,rectW,rectH);//开始坐标点 宽高
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}
//画矩形填充
function SquareFill(){
	//setStatus(lineType,2,1);
	/**
	 * 画矩形分析：
	 * 鼠标按下的时候 获取矩形开始点
	 * 鼠标抬起的时候，获取矩形结束点 计算矩形宽高
	 * 鼠标抬起的时候获取直线的结束点
 	 * 鼠标移出画布的时候不做任何操作
	 */
	
	canvas.onmousedown = function(e){
		e = e || window.event;
		//获取矩形左上角（对角线的开始点）
		rectX = e.pageX - this.offsetLeft;
		rectY = e.pageY - this.offsetTop;
	}
	canvas.onmouseup = function(e){
		//获取鼠标当前坐标 画出矩形
		e = e || window.event;
		var endX = e.pageX - this.offsetLeft;
		var endY = e.pageY - this.offsetTop;
		
		//计算矩形宽高
		var rectW = endX - rectX;
		var rectH = endY - rectY;
		//画出矩形
		ctx.fillRect(rectX,rectY,rectW,rectH);//开始坐标点 宽高
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

//全局变量
var polyX = 0;
var polyY = 0;
//画三角形
function Poly(e){
	e = e || window.event;
	/**
	 * 画三角形分析：
	 * 鼠标按下去获取三角形中心点
	 * 鼠标抬起的时候获取三角形右下角的定点
	 * 鼠标移出画布和移动的时候不需要操作
	 */
	canvas.onmousedown = function(e){
		e = e || window.event;
		//获取矩形左上角（对角线的开始点）
		polyX = e.pageX - this.offsetLeft;
		polyY = e.pageY - this.offsetTop;
	}
	canvas.onmouseup = function(e){
		e = e || window.event;
		var endX = e.pageX - this.offsetLeft;
		var endY = e.pageY - this.offsetTop;
		
		//将画笔移动到右下角的定点
		ctx.beginPath();
		ctx.moveTo(endX,endY);
		//三角形左边的坐标点
		var lbX = 2 * polyX - endX;
		var lbY = endY;
		ctx.lineTo(lbX,lbY);
		//三角形第三个顶点坐标
		var tempC = 2 * (endX - polyX);
		var tempA = endX - polyX;
		var tempB = Math.sqrt(tempC*tempC - tempA*tempA);
		//计算顶点坐标
		//endY - tempB;顶点y坐标
		ctx.lineTo(polyX,endY-tempB);
		ctx.closePath();
		ctx.stroke();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

//三角形填充
function PolyFill(e){
	e = e || window.event;
	/**
	 * 画三角形分析：
	 * 鼠标按下去获取三角形中心点
	 * 鼠标抬起的时候获取三角形右下角的定点
	 * 鼠标移出画布和移动的时候不需要操作
	 */
	canvas.onmousedown = function(e){
		e = e || window.event;
		//获取矩形左上角（对角线的开始点）
		polyX = e.pageX - this.offsetLeft;
		polyY = e.pageY - this.offsetTop;
	}
	canvas.onmouseup = function(e){
		e = e || window.event;
		var endX = e.pageX - this.offsetLeft;
		var endY = e.pageY - this.offsetTop;
		
		//将画笔移动到右下角的定点
		ctx.beginPath();
		ctx.moveTo(endX,endY);
		//三角形左边的坐标点
		var lbX = 2 * polyX - endX;
		var lbY = endY;
		ctx.lineTo(lbX,lbY);
		//三角形第三个顶点坐标
		var tempC = 2 * (endX - polyX);
		var tempA = endX - polyX;
		var tempB = Math.sqrt(tempC*tempC - tempA*tempA);
		//计算顶点坐标
		//endY - tempB;顶点y坐标
		ctx.lineTo(polyX,endY-tempB);
		ctx.closePath();
		ctx.fill();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}


//全局变量
var arcX,arcY;

//画圆圈
function Circular(){
	//setStatus(lineType,3,1);
	/**
	 * 画圆分析：
	 * 鼠标按下去的时候 获取圆心
	 * 鼠标抬起的时候，获取半径，画出圆
	 * 鼠标移动，不需操作
	 * 鼠标移出画布，不需操作
	 */
	canvas.onmousedown = function(e){
		//获取圆心位置
		e = e || window.event;
		arcX = e.pageX - this.offsetLeft;
		arcY = e.pageY - this.offsetTop;
		
	}
	canvas.onmouseup = function(e){
		//获取半径
		//实际获取的是一个坐标
		e = e || window.event;
		var endX = e.pageX - this.offsetLeft;
		var endY = e.pageY - this.offsetTop;
		
		//计算半径
		var a = endX - arcX;
		var b = endY - arcY;
		var c = Math.sqrt(a*a+b*b);//c 计算半径
		
		//画图
		ctx.beginPath();
		ctx.arc(arcX,arcY,c,0,360,false);
		ctx.closePath();
		ctx.stroke();
	}
	
	//注销不需要的事件
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

//画圆形(填充)
function CircularFill(){
	//setStatus(lineType,3,1);
	/**
	 * 画圆分析：
	 * 鼠标按下去的时候 获取圆心
	 * 鼠标抬起的时候，获取半径，画出圆
	 * 鼠标移动，不需操作
	 * 鼠标移出画布，不需操作
	 */
	canvas.onmousedown = function(e){
		//获取圆心位置
		e = e || window.event;
		arcX = e.pageX - this.offsetLeft;
		arcY = e.pageY - this.offsetTop;
		
	}
	canvas.onmouseup = function(e){
		//获取半径
		//实际获取的是一个坐标
		e = e || window.event;
		var endX = e.pageX - this.offsetLeft;
		var endY = e.pageY - this.offsetTop;
		
		//计算半径
		var a = endX - arcX;
		var b = endY - arcY;
		var c = Math.sqrt(a*a+b*b);//c 计算半径
		
		//画图
		ctx.beginPath();
		ctx.arc(arcX,arcY,c,0,360,false);
		ctx.closePath();
		ctx.fill();
	}
	
	//注销不需要的事件
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}
function Color(){
	//setStatus(colorType,0,1);
}
function FrontColor(){
	//setStatus(colorType,1,1);
}
function Straw(){
	//setStatus(colorType,2,1);
}
function Font(){
	//setStatus(colorType,3,1);
}
function Eraser(){
	//setStatus(colorType,4,1);
}
function Redo(){
	//setStatus(funcType,0,1);
}
function CancelPrev(){
	//setStatus(funcType,1,1);
}
function ClearSceen(){
	//setStatus(funcType,2,1);
}
function Download(){
	//setStatus(funcType,3,1);
}
function Saveimg(){
	//setStatus(funcType,4,1);
}


