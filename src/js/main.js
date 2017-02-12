	
// 线宽类型选择
$("#header ul.tool li.line").click(function(){
	$("#header .lineType").slideDown(300);
});

$("#lineType p").click(function(){
	$(this).addClass("active")
		   .siblings()
		   .removeClass("active");
	$("#header .lineType").slideUp(500);
});


// 按钮的状态
addClassAndRemoveClass("#header ul.tool li");
addClassAndRemoveClass("#header ul.tool .lineType p");


// 注册事件
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

// 初始化
window.onload = init;

function init(){
	Pencil();// 默认选择pencil
	setLineWidth(2);// 默认线宽
	initDrag();// 初始化拖放事件
}

// 处理文件拖入事件，防止浏览器默认事件带来的重定向
function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
 }


// 判断是否图片
function isImage(type) {
	switch (type) {
	case 'image/jpeg':
	case 'image/png':
	case 'image/gif':
	case 'image/bmp':
	case 'image/jpg':
		return true;
	default:
		return false;
	}
}


 // 处理拖放文件列表
function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files;

	for (var i = 0, f; f = files[i]; i++) {
		var t = f.type ? f.type : 'n/a';
		reader = new FileReader();
		isImg = isImage(t);

		// 处理得到的图片
		if (isImg) {
			reader.onload = (function (theFile) {
				return function (e) {
					var  image = new Image();
					image.src =  e.target.result ;

					var hRatio;
					var wRatio;
					var l = 0;
					var t = 0;
					var maxWidth = 960;
					var maxHeight = 580;
					var Ratio = 1;
					var w = image.width;
					var h = image.height;
					wRatio = maxWidth / w;
					hRatio = maxHeight / h;
					// 图像大小超出绘画板大小，计算出缩放比例
					if (wRatio<1 || hRatio<1){
						Ratio = (wRatio<=hRatio?wRatio:hRatio);
					}
					// 根据比例重新设置图像大小
					if (Ratio<1){
						w = w * Ratio;
						h = h * Ratio;

					}
					// 图片居中摆放
					l = (maxWidth - w)/2;
					t = (maxHeight - h)/2;

					image.onload = function(){
						// 居中缩放
						ctx.drawImage(image , 0 ,0 , image.width , image.height , l , t , w , h);
					}

				};
			})(f)
			reader.readAsDataURL(f);
		}
	}
}

//初始化拖入效果
var initDrag= function(){
	var dragDiv  = document.getElementById("canvas");
	dragDiv.addEventListener('dragover', handleDragOver, false);
	dragDiv.addEventListener('drop', handleFileSelect, false);
}