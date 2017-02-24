(function($, window, document, undefined) {
    'use strict';
    var s = document.body || document.documentElement,
        s = s.style;
    if (s.webkitFlexWrap == '' || s.msFlexWrap == '' || s.flexWrap == '') return true;
    var $list = $('.past-episodes ul.blogroll-primarylist'),
        $items = $list.find('.blogroll'),
        setHeights = function() {
            $items.css('height', 'auto');
            var perRow = Math.floor($list.width() / $items.width());
            if (perRow === null || perRow < 2) return true;
            for (var i = 0, j = $items.length; i < j; i += perRow) {
                var maxHeight = 0,
                $row = $items.slice(i, i + perRow);
                $row.each(function() {
                    var itemHeight = parseInt($(this).outerHeight());
                    if (itemHeight > maxHeight) maxHeight = itemHeight;
                });
                $row.css('height', maxHeight);
            }
        };
    setHeights();
    $(window).on('resize', setHeights);
    $list.find('img').on('load', setHeights);
})(jQuery, window, document);
(function() {
$('a.media-popup.audio').click(function(event) {
 event.preventDefault();
 var mediaID=$(this).attr('data-mediaid');
	window.open('http://www.cbc.ca/radio/popup/audio/listen.html?autoPlay=true&mediaIds=' + mediaID, 'audioclip', 'width=720,height=500,scrollbars=1,resizable=0').focus()
});
  if ($('#most-recent')[0]) {
         var radioShow = /(?:http\:\/\/)?(?:www)?.cbc\.ca\/radio\/([^\/]+)/.exec(window.location.href)[1];
         var feedId = ["asithappens","7.7280","cestlavie","7.8303","checkup","7.4934","outintheopen","7.13291","7.4934","thecurrent","7.7517","day6","7.7279","docproject","7.10064","thedebaters","7.6355","dnto","7.4982","thehouse","7.7257","ideas","7.7562","irrelevantshow","7.6297","thenextchapter","7.6036","q","7.7509","quirks","7.6445","rewind","7.5311","spark","7.6037","thesundayedition","7.7278","tapestry","7.7281","thisisthat","7.6354","undertheinfluence","7.5322","whitecoat","7.4515","wiretap","7.6065","writersandcompany","7.4935"
  ];
         var resultIndex = feedId.indexOf(radioShow, 0);
       if (resultIndex != -1) {
         //start ajax request
         var queueId = feedId[resultIndex + 1];
         var urlPath = "http://www.cbc.ca/json/cmlink/" + queueId;
         $.ajax({
             url: urlPath,
             //force to handle it as text
             dataType: "text",
             success: function(data) {
                 // get the unique ID of the page
                 //segPageId=$("meta[property='vf:unique_id']").attr('content');
                 hrefString = document.location.href ? document.location.href : document.location;
                 var segPageId = hrefString.substr(hrefString.length - 8);
				 if (segPageId.substring(0,1)!="1") {
				 var segPageId = hrefString.substr(hrefString.length - 9);
				 }
                 //parseJson function
                 var json = $.parseJSON(data);
                 var cval = 0;
                 for (var i = 0; i < 4; i++) {
         if (json.contentlist.contentitems[i].id === 'undefined') { $('#most-recent h3').text('Most Recent');	}
                     if (json.contentlist.contentitems[i].id != segPageId && cval < 3) {
                         $('#recentlist').append('<li class="promo col2"><a class="complexlink" href="' + json.contentlist.contentitems[i].url + '"><p> <img src="' + json.contentlist.contentitems[i].headlineimage.derivatives['16x9_620'].fileurl.replace("16x9_620", "4x3_460") + '" alt="' + json.contentlist.contentitems[i].headlineimage.title + '" title=""> </p><p class="promo-title complexlink-target">' + json.contentlist.contentitems[i].title + '</p><p class="promo-deck">' + json.contentlist.contentitems[i].deck + '</p></a> </li>');
                         cval++;
                     }
                 }
               $('#most-recent h3').text('Most Recent');
             }
         });
       }
     }
   if ($('div.segment-middle')[0]) {
              var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
              //console.log(w);
              if (w<769) {
                $('div.segment-middle').hide(); // fix previous style, then hide main.
                $('div.segment-middle').clone().css('height', 'auto').appendTo('div.segment-content').addClass('mobile-segments').show();
              }
     }
	if (showName === 'undefined') { var showName = null;	}
 $("#click-me").click(function(){
    $("#fixed-content li:nth-child(n+3)").toggle( "fast", function() {
	if($(this).is(':hidden')) {
	$("#click-me").html('More Stories <span> </span>');
	$("#click-me").removeClass('hide-link').addClass('show-link');
	} else {
	$("#click-me").html('Less Stories <span> </span>');
	$("#click-me").removeClass('show-link').addClass('hide-link');
	}
		});
	});
    $("li img").each(function(index) {
        $(this).removeAttr("height").removeAttr("width");
    });
	$(".episode-body img").each(function(index) {
        $(this).removeAttr("height").removeAttr("width");
    });
    $('#leadmedia img').removeAttr("height");
    var replaceImageSize = function(item, imageSize) {
        $thisItem = item;
		var match = "derivatives";
        $thisItem.each(function(index, element) {
            var imgSrc = $(this).attr("src");
            var folders = imgSrc.split("/");
            var pos = folders.indexOf(match) + 1;
            //var directories = folders.length;
            var oldDir = folders[pos];
            var newurl = imgSrc.replace(oldDir, imageSize);
            $(this).attr("src", newurl);
        });
    }
    replaceImageSize($(".show-highlights img"), "4x3_460");
    replaceImageSize($(".show-highlight-single img"), "16x9_460");
    replaceImageSize($(".topstories-primarylist img"), "16x9_620");
    replaceImageSize($(".past-episodes .blogroll img"), "4x3_620");
	if ($(".most-recent")[0]){
		replaceImageSize($(".most-recent .promo img"), "4x3_460");
	}
    $("#mobile-menu-switch").click(function() {

        $(".mobile-menu").slideToggle("fast", function() {
            $("#mobile-menu-switch").toggleClass("mobile-off").toggleClass("mobile-on");
        });

    });
    $('.r-mobile li a.drop-down').click(function() {
		 $(this).next().slideToggle("fast", function() {});
		 return false;
    });
	 $(".itunes-reveal").click(function() {
        $(".itunes-seasons").slideToggle("fast", function() {
            $(".itunes-reveal").toggleClass("idown").toggleClass("iup");
        });
    });
})();
   jQuery(function($) {   
	var replaceImageLocation = function(entryImage,show) {
	 $thisImage = entryImage;
        $thisImage.each(function(index, element) {
		var oldSrc = $(this).attr("src");
		if (oldSrc.indexOf("polopoly") <= 0) {
		var imgName = oldSrc.replace(/^.*[\\\/]/, '');
		var newPath = "http://www.cbc.ca/radio-content/archive/"+show+"/"+imgName;
		$(this).attr("src", newPath);
		 $(this).removeAttr("height").removeAttr("width");
		}
	 });
	 }
		if (showName) {
			replaceImageLocation($('[class*="mt-image"]'),showName);
		}
	if ($(".landing-primary")[0]){
	var cH=$('.landing-primary').height();
		} else {
	var cH=$('.story-primary').height();
		}
	if (screen.width > 640  &&  cH>2100 && $("#fixed-content")[0]) {
		tP=$('#fixed-content').offset().top;
		$(window).scroll(fixDiv);
		fixDiv();
	} else {tP=60000;}
        function fixDiv() {
            var cache = document.getElementById('fixed-content');
			var sHeight=cH-100;
            if ($(window).scrollTop() >= tP && $(window).scrollTop() < sHeight && cH>2100) {
				cache.style.position = 'fixed';
				cache.style.top = 0;
			}
            else {
				cache.style.position = 'relative';
				cache.style.top = 'auto';
			}
        }
        $(window).scroll(fixDiv);
        //fixDiv();
    });
	
	
$(document).ready(function() {
	$('#nav .nav').setup_navigation();
});
	var keyCodeMap = {
        48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
        65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
        77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
        96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9"
}

$.fn.setup_navigation = function(settings) {

	settings = jQuery.extend({
		menuHoverClass: 'features-drop',
	}, settings);
	
	$(this).attr('role', 'menubar').find('li').attr('role', 'menuitem');
	
	var top_level_links = $(this).find('> li > a');

	$(top_level_links).next('ul')
		.attr('data-test','true')
		.attr({ 'aria-hidden': 'true', 'role': 'menu' })
		.find('a')
			.attr('tabIndex',-1);
	$(top_level_links).each(function(){
		if($(this).next('ul').length > 0)
			$(this).parent('li').attr('aria-haspopup', 'true');
	});
	$(top_level_links).hover(function(){
		$(this).closest('ul') 
			.attr('aria-hidden', 'false')
			.find('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
					.attr('tabIndex',-1);
		$(this).next('ul')
			.attr('aria-hidden', 'false')
			.addClass(settings.menuHoverClass)
			.find('a').attr('tabIndex',0);
	});
	$(top_level_links).focus(function(){
		$(this).closest('ul')
			
			.find('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
					.attr('tabIndex',-1);
		$(this).next('ul')
			.attr('aria-hidden', 'false')
			.addClass(settings.menuHoverClass)
			.find('a').attr('tabIndex',0);
	});
	$(top_level_links).keydown(function(e){
		if(e.keyCode == 37) {
			e.preventDefault();
			// This is the first item
			if($(this).parent('li').prev('li').length == 0) {
				$(this).parents('ul').find('> li').last().find('a').first().focus();
			} else {
				$(this).parent('li').prev('li').find('a').first().focus();
			}
		} else if(e.keyCode == 38) {
			e.preventDefault();
			if($(this).parent('li').find('ul').length > 0) {
				$(this).parent('li').find('ul')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex',0)
						.last().focus();
			}
		} else if(e.keyCode == 39) {
			e.preventDefault();
			// This is the last item
			if($(this).parent('li').next('li').length == 0) {
				$(this).parents('ul').find('> li').first().find('a').first().focus();
			} else {
				$(this).parent('li').next('li').find('a').first().focus();
			}
		} else if(e.keyCode == 40) {
			e.preventDefault();
			if($(this).parent('li').find('ul').length > 0) {
				$(this).parent('li').find('ul')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex',0)
						.first().focus();
			}
		} else if(e.keyCode == 13 || e.keyCode == 32) {
			// If submenu is hidden, open it
			e.preventDefault();
			$(this).parent('li').find('ul[aria-hidden=true]')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex',0)
						.first().focus();
		} else if(e.keyCode == 27) {
			e.preventDefault();
			$('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
					.attr('tabIndex',-1);
		} else {
			$(this).parent('li').find('ul[aria-hidden=false] a').each(function(){
				if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
					$(this).focus();
					return false;
				}
			});
		}
	});
	var links = $(top_level_links).parent('li').find('ul').find('a');
	$(links).keydown(function(e){
		if(e.keyCode == 38) {
			e.preventDefault();
			// This is the first item
			if($(this).parent('li').prev('li').length == 0) {
				$(this).parents('ul').parents('li').find('a').first().focus();
			} else {
				$(this).parent('li').prev('li').find('a').first().focus();
			}
		} else if(e.keyCode == 40) {
			e.preventDefault();
			if($(this).parent('li').next('li').length == 0) {
				$(this).parents('ul').parents('li').find('a').first().focus();
			} else {
				$(this).parent('li').next('li').find('a').first().focus();
			}
		} else if(e.keyCode == 27 || e.keyCode == 37) {
			e.preventDefault();
			$(this)
				.parents('ul').first()
					.prev('a').focus()
					.parents('ul').first().find('.'+settings.menuHoverClass)
						.attr('aria-hidden', 'true')
						.removeClass(settings.menuHoverClass)
						.find('a')
							.attr('tabIndex',-1);
		} else if(e.keyCode == 32) {
			e.preventDefault();
			window.location = $(this).attr('href');
		} else {
			var found = false;
			$(this).parent('li').nextAll('li').find('a').each(function(){
				if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
					$(this).focus();
					found = true;
					return false;
				}
			});	
			if(!found) {
				$(this).parent('li').prevAll('li').find('a').each(function(){
					if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
						$(this).focus();
						return false;
					}
				});
			}
		}
	});
	$(this).find('a').last().keydown(function(e){ 
		if(e.keyCode == 9) {
			// If the user tabs out of the navigation hide all menus
			$('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
					.attr('tabIndex',-1);
		}
	});
	$(document).click(function(){ $('.'+settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex',-1); });
	
	$(this).click(function(e){
		e.stopPropagation();
	});
}



function hideDiv13() {
div = document.getElementById('year2013hide');
div.style.display = "none";
div = document.getElementById('buttonhide13');
div.style.display = "none";
div = document.getElementById('buttonshow13');
div.style.display = "inline";
}

function showDiv13() {
div = document.getElementById('year2013hide');
div.style.display = "block";
div = document.getElementById('buttonshow13');
div.style.display = "none";
div = document.getElementById('buttonhide13');
div.style.display = "inline";
}

function hideDiv14() {
div = document.getElementById('year2014hide');
div.style.display = "none";
div = document.getElementById('buttonhide14');
div.style.display = "none";
div = document.getElementById('buttonshow14');
div.style.display = "inline";
}

function showDiv14() {
div = document.getElementById('year2014hide');
div.style.display = "block";
div = document.getElementById('buttonshow14');
div.style.display = "none";
div = document.getElementById('buttonhide14');
div.style.display = "inline";
}

function hideDiv15() {
div = document.getElementById('year2015hide');
div.style.display = "none";
div = document.getElementById('buttonhide15');
div.style.display = "none";
div = document.getElementById('buttonshow15');
div.style.display = "inline";
}

function showDiv15() {
div = document.getElementById('year2015hide');
div.style.display = "block";
 div = document.getElementById('buttonshow15');
div.style.display = "none";
div = document.getElementById('buttonhide15');
div.style.display = "inline";
}


function hideDiv16() {
div = document.getElementById('year2016hide');
div.style.display = "none";
div = document.getElementById('buttonhide16');
div.style.display = "none";
div = document.getElementById('buttonshow16');
div.style.display = "inline";
}

function showDiv16() {
div = document.getElementById('year2016hide');
div.style.display = "block";
div = document.getElementById('buttonshow16');
div.style.display = "none";
div = document.getElementById('buttonhide16');
div.style.display = "inline";
}