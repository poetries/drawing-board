//事件兼容写法

function addEventHander(obj,eventName,hander,type){
    if (document.attachEvent){
        obj.attachEvent("on"+eventName,hander);
	} else if(document.addEventListener) {
		obj.addEventListener(eventName,hander,type);
	}
}