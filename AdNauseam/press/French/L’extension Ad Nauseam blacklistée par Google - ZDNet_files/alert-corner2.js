$(function() {

	var animTiming = 500;
	var posFromTop = 500;
	
	//$.cookie('fgCookie','fgValue');
	//console.debug($.cookie('fgCookie'));
	//$.cookie('fgCookie', null);
	
	//var hasSeenAlertCorner = $.cookie('alertCorner[delivered]');
	//console.debug($.cookie('alertCorner[delivered]'));
	//if (hasSeenAlertCorner == null) {

		$(window).scroll(function(){
			//when reaching the element with id "" we want to show the slidebox.
			//Let's get the distance from the top to the element
			
			//var distanceTop = $('#start-alert-corner').offset().top - $(window).height();
			//if  ($(window).scrollTop() > distanceTop){
			if  ($(window).scrollTop() > posFromTop){
				$('#slidebox').animate({'right':'0px'}, animTiming);
			}else {
				$('#slidebox').stop(true).animate({'right':'-430px'}, animTiming);
			}	
		});
			

		$(window).scroll(function(){
			//when reaching the element with id "" we want to hide the slidebox.
			//Let's get the distance from the top to the element
			
			var distanceTop = $('#stop-alert-corner').offset().top - $(window).height();
			if  ($(window).scrollTop() > distanceTop){
				$('#slidebox').stop(true).animate({'right':'-430px'}, animTiming);
			}	
		});


		//$('#slidebox').animate({'right':'0px'}, animTiming);

		/*
		 remove the slidebox when clicking the cross
		 */
		$('#slidebox .close').bind('click',function(){
			$(this).parent().remove();
		});
	
	//}
	
});