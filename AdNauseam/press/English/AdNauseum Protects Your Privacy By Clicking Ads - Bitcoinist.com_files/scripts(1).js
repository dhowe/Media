jQuery(document).ready(function($) {


	/* Prepand Admin Bar
	----------------------------------------------------- */ 
	
	$("#wpadminbar").prependTo("#header-transparent-sticky-wrapper ");



    /* Sticky - Navigation stick plugin
	----------------------------------------------------- */  

	$(".sticky-header header").sticky({
		topSpacing:0
	});
	


	/* Menu Dropdown Animation
	----------------------------------------------------- */  

	$( '#header-nav li.menu-item-has-children' ).mouseenter(function() {
		$(this).children('.sub-menu').css('display', 'block');
		$(this).children('.sub-menu').stop().animate({ opacity: 0, marginTop: "20px" }, 0);
		$(this).children('.sub-menu').stop().animate({ opacity: 1, marginTop: "0px" }, 500);
	});
    
    $( '#header-nav li.menu-item-has-children' ).mouseleave(function() {
		$(this).children('.sub-menu').animate({ opacity: 0, marginTop: "20px" }, 350, function(){
		$(this).css('display', 'none');
		});
	});

	
	
    /* Responsive Menu
	----------------------------------------------------- */

	// Add No Transition Class
	$('#responsive-side .menu-item-has-children > a').addClass( "no-transition" );
	
	//Responsive Menu Toggle
    $('#responsive-side .menu-item-has-children > a').on('click',function(e){
        e.preventDefault();

        var element = $(this).parent();
       
        if(element.children('ul').is(':visible')){
           element.children('ul').slideUp('slow'); 
           element.removeClass('open');
           
        }
        else{
            element.children('ul').slideDown('slow');   
            element.addClass('open');
        }
    });
    
    // Add Menu Class
    $('#responsive-widget .widget_nav_menu').addClass('responsive-menu'); 

	
	
	/* Scroll Down Button
	----------------------------------------------------- */ 

    $('.normal-header .scroll-down').click(function(){
	    
	    $('html, body').animate({
			scrollTop: $(this).parent().offset().top + $(this).parent().height()
		}, 1000, 'easeInOutExpo');
		
	});

	setTimeout(function() {
		$('.normal-header .scroll-down').removeClass('delay');
	}, 1100);

	
	// Sticky
	
	var $headerHeight = $("#header-transparent-sticky-wrapper").height();
	var $wrapHeight = $("#header-transparent-sticky-wrapper .wrap").height();
	var $wrapInnerHeight = $("#header-transparent-sticky-wrapper .wrap").innerHeight();
	
	var $headerPadding = $wrapInnerHeight - $wrapHeight;
	var $scrollDownSize = $headerHeight - $headerPadding;
	
	
	$('.sticky-header .scroll-down').click(function(){

	    $('html, body').animate({
			scrollTop: $(this).parent().offset().top + $(this).parent().height() - $scrollDownSize
		}, 1100, 'easeInOutExpo');
		
	});

	setTimeout(function() {
		$('.sticky-header .scroll-down').removeClass('delay');
	}, 1200);
	
	
	
	/* Sidebar Effect
	----------------------------------------------------- */ 
	
	var SidebarMenuEffects = (function() {
	
		function hasParentClass( e, classname ) {
		if(e === document) return false;
		if( classie.has( e, classname ) ) {
			return true;
		}
		return e.parentNode && hasParentClass( e.parentNode, classname );
	}
	
	// http://coveroverflow.com/a/11381730/989439
	function mobilecheck() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}
	
	function init() {
	
		var container = document.getElementById( 'st-container' ),
			buttons = Array.prototype.slice.call( document.querySelectorAll( '#responsive-menu > a' ) ),
			// event type (if mobile use touch events)
			eventtype = mobilecheck() ? 'touchstart' : 'click',
			resetMenu = function() {
				classie.remove( container, 'st-menu-open' );
			},
			bodyClickFn = function(evt) {
				if( !hasParentClass( evt.target, 'st-menu' ) ) {
					resetMenu();
					document.removeEventListener( eventtype, bodyClickFn );
				}
			};
	
		buttons.forEach( function( el, i ) {
			var effect = el.getAttribute( 'data-effect' );
	
			el.addEventListener( eventtype, function( ev ) {
				ev.stopPropagation();
				ev.preventDefault();
				container.className = 'st-container'; // clear
				classie.add( container, effect );
				setTimeout( function() {
					classie.add( container, 'st-menu-open' );
				}, 25 );
				document.addEventListener( eventtype, bodyClickFn );
			});
		} );
	
	}
	
	init();
	
	})();
    
    
    
    
    /* Search Toggle
	----------------------------------------------------- */
    
    $('#header-search a').click(function(e) {
        
        if($('#header-search a i').hasClass('fa-search')) {
            
            $('#header-search a i').removeClass('fa-search').addClass('fa-times');
        
            $('#header').animate({
                top: '0',
            }, 500);
            $('.search-container #search-toggle').css('visibility', 'visible');
            
            return false;
        } else {
            
            $('#header-search a i').removeClass('fa-times').addClass('fa-search');
        
            $('#header').animate({
                top: '-75',
            }, 500);
            //$('.search-container #search-toggle').css('visibility', 'hidden');
            
            return false;
        }
        
    });
    
    
    
    
    /* Responsive Nav Toggle
	----------------------------------------------------- */
    $('#responsive-logo a').click(function(e) {
        
        e.preventDefault();
        console.log('sad');
        $('#responsive-nav-widget').slideToggle('200');
        
    });
	
    
    
    
    
	/* Equal Height
	----------------------------------------------------- */
    if($(window).width() > 550) {
        equalheight = function(container){

            var currentTallest = 0,
                currentRowStart = 0,
                rowDivs = new Array(),
                $el,
                topPosition = 0;
            $(container).each(function() {

                $el = $(this);
                $($el).height('auto')
                topPostion = $el.position().top;

                if (currentRowStart != topPostion) {
                    for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                        rowDivs[currentDiv].height(currentTallest);
                    }
                    rowDivs.length = 0; // empty the array
                    currentRowStart = topPostion;
                    currentTallest = $el.height();
                    rowDivs.push($el);
                } else {
                    rowDivs.push($el);
                    currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
                }
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }

            });

        }

        $(window).load(function() {
            equalheight('main#content ul.posts li');
            equalheight('main#content .content-widgets');
            equalheight('.row > .eq');
            equalheight('.category-grid .eq.posts li');
            sidebarHeight = parseInt($('#sidebar.eq').css('height')) - 5;
            sidebarTwoHeight = parseInt($('#sidebar-two.eq').css('height')) - 5;
            $('#sidebar.eq').css('height', sidebarHeight);
            $('#sidebar-two.eq').css('height', sidebarTwoHeight);
        });


        $(window).resize(function(){
            equalheight('main#content ul.posts li');
            equalheight('main#content .content-widgets');
            equalheight('.row > .eq');
            equalheight('.category-grid .eq.posts li');
            sidebarHeight = parseInt($('#sidebar.eq').css('height')) - 5;
            sidebarTwoHeight = parseInt($('#sidebar-two.eq').css('height')) - 5;
            $('#sidebar.eq').css('height', sidebarHeight);
            $('#sidebar-two.eq').css('height', sidebarTwoHeight);
        });
        $('[class^=wp-load-more-posts-page]').each(function() {
			$(this).bind("DOMSubtreeModified",function(){
				equalheight('.category-grid .eq.posts li');
			});
		});
    }
	
	
	
	/* Sticky Sidebar & Ad
	----------------------------------------------------- */
	if($(window).width() <= 550) {
		adHeight = $(window).height() - 108;
	} else {
		adHeight = $(window).height() - 240;
	}
	$('.ad').css('top', adHeight);
	$('.ad').Stickyfill();
    
    
    
    
    /* Sticky Sidebar & Ad
	----------------------------------------------------- */
    $('#events-nav #events-nav-trigger').on('click', function() {
        $('#events-nav #events-nav-items').toggle();
    });
    $(window).on('click', function() {
        if (!event.target.matches('#events-nav #events-nav-trigger')) {
            $('#events-nav #events-nav-items').hide();
        } 
    });
    
    
    
    
    /* Smooth Scroll
    ----------------------------------------------------- */
    $('#kb-nav a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 90
          }, 1000);         
        }
      }
    });
    
    
    
    /* Bitcoin Tooltip
    ----------------------------------------------------- */
    $('#bitcoin-price').on('click', function(e) {
        e.preventDefault();
    });
    $('#bitcoin-price').mouseenter(function() {
        $('#bitcoin-price-tooltip').css('visibility', 'visible');
        $('#bitcoin-price-tooltip').css('display', 'block');
        $('#bitcoin-price-tooltip').css('opacity', '1');
    });
    $('#bitcoin-price-container').mouseleave(function() {
        $('#bitcoin-price-tooltip').css('visibility', 'hidden');
        $('#bitcoin-price-tooltip').css('opacity', '0');
        $('#bitcoin-price-tooltip').css('display', 'none');
    });
    
    
    
});