//lineType show

$(function(){
	$("#header ul.tool li.line").hover(function(){
		$(this).find(".lineType").show();
	},function(){
		$(this).find(".lineType").hide();
	});

});
