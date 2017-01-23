//check domain source
var portalserv = "";
var portalshort = "";

if(window.location.hostname == "www.berliner-kurier.de"){
    portalshort = "bk";
}
else {
    portalshort = "blz";
}

//if cad loading complete append sticky cad JS
jQuery(document).ready(function(){
	portalserv = "tracking.beilagen-prospekte.de/jquery";
	//appendStickyCadJS();
	appendAdvJS();	
});

function appendAdvJS(){	
    //check for Advertorials if jQuery is loaded
    
    //if not following pages
    var editurl = location.pathname.split("/")[2].split(",")[0];    
    if(editurl != "7191238" && editurl != "10808728"){
	    if(isjQueryLoaded() == true){
	        checkAdvertorials();
	    }
	    //or append jQuery to head
	    else{
	    	var jqueryScript = document.createElement('script');
	        jqueryScript.setAttribute('src','http://'+ portalserv +'/jquery.js');
	        document.getElementsByTagName('head')[0].appendChild(jqueryScript);  
	        //wait for loading jQuery and check
	        var readyStateCheckjQuery = setInterval(function() { 
	            if(isjQueryLoaded() == true){
	            	clearInterval(readyStateCheckjQuery);
	            	checkAdvertorials(); 
	            }
	        },10);
	    }
    }
}
//make cad sticky if not google ad
function appendStickyCadJS(){	
    //check for Advertorials if jQuery is loaded
    
    //if not following pages
    var editurl = location.pathname.split("/")[2].split(",")[0];
    //define ID to make only cads with given ID sticky
    var stickyID = "StickyCAd0815";
   	if(document.getElementById(stickyID)){
   		if(isjQueryLoaded() == true){     			
	        stickyCad();
	    }
	    //or append jQuery to head
	    else{
	    	var jqueryScript = document.createElement('script');
	        jqueryScript.setAttribute('src','http://'+ portalserv +'/jquery.js');
	        document.getElementsByTagName('head')[0].appendChild(jqueryScript);  
	        //wait for loading jQuery and check
	        var readyStateCheckjQuery = setInterval(function() { 
	            if(isjQueryLoaded() == true && jQuery(stickyID).length > 0){
	            	clearInterval(readyStateCheckjQuery);
	            	stickyCad();	                
	            }
	        },10);
	    }
   	}
}

//bind scroll to window and check if Content Ad is visible
function stickyCad(repeat){
	
	//visible on screen function
	(function($){

		/**
		 * Copyright 2012, Digital Fusion
		 * Licensed under the MIT license.
		 * http://teamdf.com/jquery-plugins/license/
		 *
		 * @author Sam Sehnert
		 * @desc A small plugin that checks whether elements are within
		 *		 the user visible viewport of a web browser.
		 *		 only accounts for vertical position, not horizontal.
		 */
		$.fn.visible = function(partial,hidden){
			
		    var $t				= $(this).eq(0),
		    	t				= $t.get(0),
		    	$w				= $(window),
		    	viewTop			= $w.scrollTop(),
		    	viewBottom		= viewTop + $w.height(),
		    	_top			= $t.offset().top,
		    	_bottom			= _top + $t.height(),
		    	compareTop		= partial === true ? _bottom : _top,
		    	compareBottom	= partial === true ? _top : _bottom,
		    	clientSize		= hidden === true ? t.offsetWidth * t.offsetHeight : true;
			
			return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
	    };
	    
	})(jQuery);
	
	var isGoogle = true;	
	$cadObj = jQuery("#ContentAd");
	$cadObj.css("overflow","hidden");
	jQuery(window).unbind('scroll');
	
	
	if(jQuery("#ContentAd script").length > 0) {
		jQuery("#ContentAd script").each(function(){
			if(jQuery(this).attr("src") != undefined){
				
				if(jQuery(this).attr("src").indexOf('google') > -1 && jQuery(this).attr("src").indexOf('flashwrite') == -1){
					//console.log("script - google cad");
					isGoogle = true;
					return false;
				}
				else {
					//console.log("script - not google cad");
					isGoogle = false;	
					if(jQuery("#ContentAd iframe").attr("src") != undefined && jQuery("#ContentAd iframe").attr("id") != undefined){
						if(jQuery("#ContentAd iframe").attr("id").length > 0 && jQuery("#ContentAd iframe").attr("id").indexOf('google') > -1){			
							//console.log("iframe - google cad");
							isGoogle = true;
							return false;
						}
						else {
							//console.log("iframe - not google cad");
							isGoogle = false;	
						}
					}
				}
			}
			else {
				isGoogle = false;
			}
			
		});		
	}
	else if(repeat == "repeat"){
		isGoogle = false;
	}
	
	jQuery(window).bind("scroll", function(e){		
		//console.log("isGoogle: " + isGoogle);
		//console.log("visible: " + cadScrolledIntoView($cadObj));
		//console.log("cad length: " + $cadObj.length);
		if($cadObj.visible( true ) === false && $cadObj.length != 0 && isGoogle === false){	
			jQuery(window).unbind('scroll');
            $cadObj.slideUp("slow", function() {
	    		jQuery("#ContentAd").remove();	   		

    		    clearTimeout(jQuery.data(this, 'scrollTimer'));
    		    jQuery.data(this, 'scrollTimer', setTimeout(function() {
    		        // do something
    		        //console.log("Haven't scrolled in 3s!");
    		        showCad($cadObj);
    		    }, 1000));    		
	    	}); 
        }	
		else if(isGoogle === true) {			
			jQuery(window).unbind('scroll');
			//console.log("unbind - google cad");
		}
      
    });
}

function showCad($cadObj){
	var countDivs = 0;
	$cadObj.find('script').remove();
	$cadObj.find('noscript').remove();	
	if(jQuery("#ContentAd").length == 0){ 
		var firstVisibleElem;
		var container;
		if(jQuery(".ContainerBoxenBorder").length > 0){
			container = ".ContainerBoxenBorder";
		}
		else {
			container = "#ContainerBoxen";
		}
		jQuery(container).children("div.Redaktionsmodul, div.FullBox, div.FullBoxColor").each(function(){
		    if(jQuery(this).visible()){
		         firstVisibleElem = this;
		         jQuery("<div class='FullBoxColor' id='ContentAd' style='margin-top:15px; display:none;'>" + $cadObj.html() + "</div>").insertAfter(jQuery(firstVisibleElem))
			         .slideDown("slow", function() {	
				    		setTimeout(function(){
				    			stickyCad("repeat");
				    		},500);
			     });
		         return false;
		    }
		    else {
		    	countDivs = countDivs + 1;
		    	if(countDivs == jQuery(container).children("div.Redaktionsmodul, div.FullBox, div.FullBoxColor").length){
		    		jQuery("<div class='FullBoxColor' id='ContentAd' style='margin-top:15px; display:none;'>" + $cadObj.html() + "</div>").insertAfter(jQuery(this))
			         .slideDown("slow", function() {	
				    		setTimeout(function(){
				    			stickyCad("repeat");
				    		},500);
			     });
		         return false;
		    	}
		    }
		});
	}
}

//check jQuery state function
function isjQueryLoaded(){
    try{
        var jqueryIsLoaded=jQuery;
        jQueryIsLoaded=true;
    }
    catch(err){
        var jQueryIsLoaded=false;
    }
    return jQueryIsLoaded;
}

//check if advertorials are found
function checkAdvertorials(){
    //var foundin = jQuery('span.District:contains("Anzeige")');
	var foundinBK = jQuery('div.Author:contains("bva")');
	var foundinBLZ = jQuery('div.TB_Autor:contains("bva")');
    //if is teaser overview page	
	if(dataLayer.pageType == "Kategorieseiten"){			
        jQuery("<link type='text/css' rel='stylesheet' href='http://"+ portalserv +"/assets/bva/portal-teaser-"+ portalshort +".css'>").appendTo(jQuery('head'));

    	var jsTeaser = jQuery("<script type='text/javascript' src='http://"+ portalserv +"/assets/bva/portal-teaser-"+ portalshort +".js'><\/script>");
    	jQuery('head').append(jsTeaser);
        
    }
	//if is Advertorial page
	else if (dataLayer.pageType == "Artikelseiten" && (foundinBK.length > 0 || foundinBLZ.length > 0)){	
	    if(jQuery(".ArticleSubject").text() == ""){
	    	jQuery(this).remove();
	    }	
	    jQuery("#ContainerContentLinie").before('<div class="advertorial_ad"><img alt="bva" src="http://'+ portalserv +'/assets/bva/bva-letter.gif"></div>');
	    jQuery("span.District").remove();
	    jQuery("div.Author").remove();
	    jQuery("div.TB_Autor").remove();
	    
	    jQuery(window).load(function(){
		    //remove all other stuff in left column
		    jQuery("#ContainerContent").children().not(".advertorial_ad,#ContainerContentLinie").remove();
	    });
	    
	    jQuery("<link type='text/css' rel='stylesheet' href='http://"+ portalserv +"/assets/bva/advertorial-"+ portalshort +".css'>").appendTo(jQuery('head'));
	}
    else if(jQuery("#ContainerContentLinie").length != 0){  	
    	jQuery("<script type='text/javascript' src='http://"+ portalserv +"/assets/bva/artikel-scripts-"+ portalshort +".js'><\/script>").appendTo(jQuery('head'));
    }
}

function noSDMVar(){
	var readyStateVar = setInterval(function() { 
        if(typeof(SDM_defzone) != 'undefined' && SDM_defzone != 'dumont'){
        	clearInterval(readyStateVar);      
        	var ord = window.ord || Math.floor(Math.random() * 1e16);
        	jQuery.getScript("http://ad.doubleclick.net/N7458/adj/"+ SDM_defsite +"/"+ SDM_defzone +";sz=480x100;ord=" + ord + "?", function(data, textStatus, jqxhr){
        		console.log( data ); // Data returned
        		console.log( textStatus ); // Success
        		console.log( jqxhr.status ); // 200
        		console.log( "Load was performed." );
        	});
        }
    },500);
}

function stickyNav() {
	jQuery(window).load(function(){
		//fadein opener
		jQuery("#stickynav_opener").fadeIn();
		
		//on mouse over show nav and hide opener
		jQuery("#stickynav_opener").mouseover(function(){
			jQuery("#stickynav").show();
			jQuery("#stickynav").animate({ 
		        marginBottom : "+=30px",
		    }, 800, function(){
		    	//
			});
			jQuery(this).animate({ 
		        marginBottom : "-=30px",
		    }, 300, function(){
		    	//
			});
		});
		//on mouse out show opener and hide nav
		jQuery("#stickynav").mouseleave(function(){
			jQuery(this).animate({ 
		        marginBottom : "-=30px",
		    }, 300, function(){
		    	//
			});
			jQuery("#stickynav_opener").animate({ 
		        marginBottom : "+=30px",
		    }, 800, function(){
		    	//
			});
		});
	});
	
}
