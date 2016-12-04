	
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

//线宽类型 1 3 5 8
var lineW_1 = document.getElementById("lineW_1");
var lineW_3 = document.getElementById("lineW_3");
var lineW_5 = document.getElementById("lineW_5");
var lineW_8 = document.getElementById("lineW_8");

//颜色风格
var color = document.getElementById("color");
var frontColor =document.getElementById("frontColor");
var straw = document.getElementById("straw");//吸管
var font = document.getElementById("font");
var eraser =document.getElementById("eraser");
var magnifier = document.getElementById("magnifier");

//功能
var cancelPrev =document.getElementById("cancelPrev");
var redo = document.getElementById("redo");
var clearSceen = document.getElementById("clearSceen");
var download =document.getElementById("download");
var saveImg = document.getElementById("saveImg");

var penType = [pencil,pen,tuya,lineSize];
var lineType = [line,square,circular,poly,squareFill,circularFill,polyFill];
var colorType = [color,frontColor,straw,font,eraser,magnifier];
var funcType = [cancelPrev,redo,clearSceen,download,saveImg];
var lineWidths = [lineW_1,lineW_3,lineW_5,lineW_8,];

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
addEventHander(colorType[5],"click",Magnifier,false);
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
	
}
//设置线宽函数
function LineSize(){
	for (var i = 0;i < lineWidths.lenght;i++) {
		switch (lineWidths[i]){
			case 0:
				ctx.lineWidth = 1;
				break;
			case 1:
				ctx.lineWidth = 3;
				break;
			case 2:
				ctx.lineWidth = 5;
				break;
			case 3:
				ctx.lineWidth = 8;
				break;
			default:
				ctx.lineWidth = 1;
				break;
			}
	}
	
}
function Line(){
	
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
//油漆桶功能
function FrontColor(){
	/**
	 * 分析：
	 * 鼠标点击canvas整个画布变成一种颜色
	 * 鼠标移动、抬起、移出画布不操作
	 * 
	 */
	canvas.onmousedown = function(e){
		//填充画布指定颜色 画一个填充颜色的矩形
		//ctx.fillStyle = "red";
		ctx.fillRect(0,0,1100,550);
		
	}
	
	//注销事件
	canvas.onmouseup = null;
	canvas.onmouseout = null;
	canvas.onmousemove = null;
}

//吸管函数
function Straw(){
	canvas.onmousedown =function(e){
		var e = e || window.event;
		var strawX = e.pageX - this.offsetLeft;
		var strawY = e.pageY - this.offsetTop;
		//获取该点颜色信息
		//获取图像信息的方法 getImageData(开始点x,开始点y,宽度,高度)
		//obj.data = [红,绿,蓝,透明度] 取值范围都是 0-255
		var obj = ctx.getImageData(strawX,strawY,1,1);
		var color = 'rgb('+obj.data[0]+','+obj.data[1]+','+obj.data[2]+')';
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		
		//颜色吸取完后 调用画笔工具
		Pencil();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
	canvas.onmouseup = null;
	
}
//放大镜功能
function Magnifier(){
	//用户输入数据的大小
	var scale = window.prompt("请输入要放大的百分比(只接受整型)",'100');
	
	//把数据转换成canvas画布的大小 
	var scaleW = 1090 * scale / 100;
	var scaleH = 550 * scale / 100;
	//将数据设置到HTML标签上
	canvas.style.widht = parseInt(scaleW) + "px"; 
	canvas.style.height = parseInt(scaleH) + "px"; 
}

//文本工具函数
function Font(){
	/**
	 * 功能分析
	 * 鼠标点击时触发写字的方法
	 * 鼠标移动、抬起、移出不需要操作
	 */
	canvas.onmousedown = function(e){
		var e = e || window.event;
		var textPosX = e.pageX - this.offsetLeft;
		var textPosY = e.pageY - this.offsetTop;
		//window.prompt()提示
		var userVal = window.prompt("请输入文字","");
		if (userVal != null) {
			ctx.fillText(userVal,textPosX,textPosY);
		} 
		
	}
	canvas.onmousemove = null;
	canvas.onmouseup = null;
	canvas.onmouseout = null;
}
//Eraser 全局变量
var eraserFlag = 0;//设置橡皮檫的状态标志位
function Eraser(){
	/**
	 * 橡皮功能分析：
	 * 鼠标点击的时候 擦除点击处的区域
	 * 鼠标移动的时候 随着鼠标移动 擦除移动过得地方发
	 * 鼠标抬起 取消擦除事件 
	 * 鼠标移出的时候 取消擦除事件
	 */
	
	canvas.onmousedown = function(e){
		var e = e || window.event;
		//获取鼠标相对canvas的坐标
		var eraserX = e.pageX - this.offsetLeft;
		var eraserY = e.pageY - this.offsetTop;
		//canvas 擦除方法
		ctx.clearRect(eraserX-ctx.lineWidth,eraserY-ctx.lineWidth,ctx.lineWidth*2,ctx.lineWidth*2);//擦除点开始位置
		eraserFlag = 1;
	}
	//随鼠标移动不停擦除
	canvas.onmousemove = function(e){
		var e = e || window.event;
		var eraserX = e.pageX - this.offsetLeft;
		var eraserY = e.pageY - this.offsetTop;
		// 擦除方法
		if(eraserFlag){//判断鼠标左键是否按下
			ctx.clearRect(eraserX-ctx.lineWidth,eraserY-ctx.lineWidth,ctx.lineWidth*2,ctx.lineWidth*2);//擦除
		}
		
	}
	canvas.onmouseup = function(e){
		eraserFlag = 0;//清除擦除状态位
	}
	canvas.onmouseout = function(e){
		eraserFlag = 0;
	}
}
function Redo(){
	
}
function CancelPrev(){
	
}
//清空画布
function ClearSceen(){
	ctx.clearRect(0,0,1100,550);
}
function Download(){
	/**
	 * 分析：js不能操作本地文件 
	 */
	//var imgdata = canvas.toDataURL();
	//var b64 = imgdata.substring(22);
	
	 var DataURL= canvas.toDataURL("image/png");//转换图片信息
  
	var saveFile = function(data, filename){
	    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
	    save_link.href = data;
	    save_link.download = filename;
	  
	    var event = document.createEvent('MouseEvents');
	    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    save_link.dispatchEvent(event);
	};
	
	
	  saveFile(DataURL,"canvas.png");
	
}
function Saveimg(){
	
}


