

$(function(){
	
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

});
