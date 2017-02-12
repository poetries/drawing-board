//事件兼容写法

function addEventHander(obj,eventName,hander,type){
    if (document.attachEvent){
        obj.attachEvent("on"+eventName,hander);
	} else if(document.addEventListener) {
		obj.addEventListener(eventName,hander,type);
	}
}
function addClassAndRemoveClass(obj) {
	$(obj).click(function(){
		$(this).addClass("active")
			.siblings()
			.removeClass("active");
	});
}
function getId(id){
	return document.getElementById(id);
}
