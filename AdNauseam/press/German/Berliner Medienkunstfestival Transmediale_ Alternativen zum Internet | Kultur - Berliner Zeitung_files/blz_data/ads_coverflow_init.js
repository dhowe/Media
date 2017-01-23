function rotate_teaser(){	
	jQuery(document).ready(function(){
		
		//clone all one time 
		jQuery(".teaser .cover").clone().appendTo(jQuery(".teaser"));		
		// vars
		var refheight = jQuery(".teaser .cover").outerWidth() + 20;
	
		// move functions
		function movedown(){
			if(jQuery(".teaser .cover").length > 2){
				scrollrefs = setInterval(function(){
					//animate	
					jQuery(".teaser").stop().animate({ 
				        marginLeft: "-="+ refheight +"px",
				    }, 1000, function() {
			    		//clone element
			    		jQuery(".teaser .cover").first().clone().appendTo(".teaser");
			    		//remove cloned element
			    		jQuery(".teaser .cover").first().remove();
			    		//place first element on 0
			    		jQuery(".teaser").css("marginLeft",0);
			    	});
				},6000);
			}
		}
		
		//on click action functions
		
		function movedownones(){
			clearInterval(scrollrefs);
			//place first element on -refheight
			jQuery(".teaser").css("marginLeft","-"+ refheight +"px");
			//clone element
			jQuery(".teaser .cover").last().clone().prependTo(".teaser");
			//remove cloned element
			jQuery(".teaser .cover").last().remove();
			//animate	
			jQuery(".teaser").stop().animate({ 
		        marginLeft: "+="+ refheight +"px",
			}, 800, function(){
				//
			});
		}
	
		function moveupones(){
			clearInterval(scrollrefs);
			jQuery(".teaser").stop().animate({ 
		        marginLeft: "-="+ refheight +"px",
		    }, 800, function(){
		    	//clone element
		    	jQuery(".teaser .cover").first().clone().appendTo(".teaser");
		    	//remove cloned element
	    		jQuery(".teaser .cover").first().remove();
	    		//place first element on 0
	    		jQuery(".teaser").css("marginLeft",0);
			});
		}
		
		
	
		//init moving		
		movedown();
	
		
		// toggle prev, next
		jQuery(".teaser").mouseover(function(){
			clearInterval(scrollrefs);
		});
		jQuery(".teaser").mouseout(function(){
			 movedown();
		});
		// click prev2, next2
		jQuery("#goleft").bind("click", function(){
			movedownones();
		});
		jQuery("#goright").bind("click", function(){
			moveupones();
		});	
	});
}