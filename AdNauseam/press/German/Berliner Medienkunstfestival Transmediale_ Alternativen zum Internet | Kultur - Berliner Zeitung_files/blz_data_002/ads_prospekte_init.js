//vars
function rotate_teaser(){	
	setTimeout(function(){
		// vars
		refheight = jQuery(".teaser .cover").outerWidth() + 20;		
		//init moving		
		movedown();			
	
		
		// toggle prev, next
		jQuery(".teaser").mouseover(function(){
			if(jQuery(".teaser .cover").length > 1){
				clearInterval(scrollrefs);
			}
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
	},1000);
}

//move functions
function movedown(){	
	if(jQuery(".teaser .cover").length > 1){	
		scrollrefs = setInterval(function(){
			//animate	
			jQuery(".teaser").stop().animate({ 
		        marginLeft: "-="+ refheight +"px"
		    }, 800, function() {		    	
	    		//clone element
	    		jQuery(".teaser .cover").first().clone().appendTo(".teaser");
	    		//remove cloned element
	    		jQuery(".teaser .cover").first().remove();
	    		//place first element on 0
	    		jQuery(".teaser").css("marginLeft",0);
	    		
	    		//count view of first cover after animation	
	    		if(iTeaser < jQuery(".teaser .cover").length / 2){			    	
	    			iTeaser = iTeaser + 1;
	    		}
	    		
	    	});
		},6000);
	} else {
		//count view of first and only cover			    				
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
        marginLeft: "+="+ refheight +"px"
	}, 800, function(){
		//count view of first cover after animation			    				
		
	});
}

function moveupones(){
	clearInterval(scrollrefs);
	jQuery(".teaser").stop().animate({ 
        marginLeft: "-="+ refheight +"px"	       
    }, 800, function(){
    	 //count view of first cover after animation			    				
		
    	//clone element
    	jQuery(".teaser .cover").first().clone().appendTo(".teaser");
    	//remove cloned element
		jQuery(".teaser .cover").first().remove();
		//place first element on 0
		jQuery(".teaser").css("marginLeft",0);
	});
}