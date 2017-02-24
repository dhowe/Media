
/**
 * Defines the region where an ad slot need to be displayed.
 * 
 * @param parent    element path    The ID of the division which encapsulates the start, end and ad slot element (example '#unique_id').
 * @param ad_slot   element path 	The class name of the ad slot aka the div that you want to attach to the page (example '.class_ad').
 * @param end_point element path 	The class name for the division that you want the ad slot to stop moving when it reaches the bottom (example '.class_end').
 *
 * @author Alec Arnold <aarnold@thecode.co>
 */
function hook_ad_slots( parent, ad_slot, end_point ) {

	// Convert the parameters to elements
	var $parent_element  = $( parent );
	var $ad_slot_element = $parent_element.find( ad_slot );
	var $end_element     = $parent_element.find( end_point );

	// Get the height of the ad slot - used for the offset
	var ad_height    = $ad_slot_element.height();

	// Get the division offsets 
	var end_offset    = $end_element.offset().top;

	// Get the height for the side bar
	var single_height = $( '#single', $parent_element ).height();
	var ad_slot_element_height = $ad_slot_element.height();

	// Set the ad slot offset 
	$( '#side', $parent_element ).height( single_height + 'px' );

	// Define the function that need to run when the the user reaches its original position 
	var top_funciton = function() {
		$ad_slot_element.toggleClass( 'stuck' ).removeClass( 'bottom' );
	}

	// Hook the waypoint into the ad slot
	$( '#single', $parent_element ).waypoint( top_funciton, { offset: '-41px' } );

	// Define the function that needs to run once the the user reaches the end point
	var bottom_function = function() {
		$ad_slot_element.toggleClass('bottom');
	}

	// Hook the waypoint to the bottom of the end point division
	$( '#single', $parent_element ).waypoint( bottom_function, { offset: '-' + ( $( '#single', $parent_element ).height() - '715' ) + 'px' } );

}


jQuery(document).ready(function ($) {
	
	/* Mobile drop down toggle */
	
	$( "#mobile .mobmenu" ).click(function() {
		$( "#mobiledrop" ).slideToggle( "slow").toggleClass('close');
		$(this).toggleClass('close');
	});
	
	$( "#mobile .mobsearch" ).click(function() {
		$( "#mobilesearch" ).slideToggle( "slow").toggleClass('close');
		$(this).toggleClass('close');
	});
	
	/* Sub menu toggle */
	
	$( ".dropbox ul#cats li" ).hover(function() {
		$(this).children('.sub-menu').fadeIn( "fast");
		$(this).siblings().children('.sub-menu').fadeOut();
	});
	
});

/* Select box styles */

jQuery('select').selectric();
 

/* Load drop down */

jQuery( ".hide" ).click(function() {
	$(this).hide();
	$(this).siblings(".moredrop").slideDown();
	$(this).siblings(".link").show();
});

/* Comments Drop down */

jQuery( ".showcomm" ).click(function() {
	$(this).hide();
	$(".hidden-comments").slideDown();
	$(".hidecomm").show();
	$("#comments .comment").addClass("clear");
});

jQuery( ".hidecomm" ).click(function() {
	$(this).hide();
	$(".hidden-comments").slideUp();
	$(".showcomm").show();
	$("#comments .comment").removeClass("clear");
});

jQuery( ".link" ).click(function() {
	$(this).hide();
	$(this).siblings(".moredrop").slideUp();
	$(this).siblings(".hide").show();
});


/* Mobile submenu */

jQuery( "#mobiledrop .menu-item-has-children a" ).click(function() {
	$(this).siblings(".sub-menu").slideToggle('easeInQuart');
	$(this).toggleClass('close');
});


/* Lightbox */

jQuery('a.lightbox').nivoLightbox(); 


/* Search dropdown */

jQuery( ".search a" ).click(function() {
	$('form.topsearch').fadeToggle();
	$(this).toggleClass('close');
});

/* globe dropdown */

jQuery( ".globe" ).hover(function() {
	$('.geo').fadeToggle();
});

jQuery(document).ready(function($){
	$('.listingcontrols').show();
	$('#premiumlistings').show();
	$('#premiumlistings').bxSlider({
	    auto: true,
	    autoHover: true,
	    responsive: true,
	});
});

function PopupCenterDual(url, title, w, h) {
	// Fixes dual-screen position Most browsers Firefox
	var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
	width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
	
	var left = ((width / 2) - (w / 2)) + dualScreenLeft;
	var top = ((height / 2) - (h / 2)) + dualScreenTop;
	var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
	
	// Puts focus on the newWindow
	if (window.focus) {
	newWindow.focus();
	}
}

// if no cookie

jQuery(".close").click(function() {
    $( ".featureBanner" ).slideUp( "slow" );
});


jQuery(document).ready(function ($) {
	$(function() {                  
	  $('#topFeature').waypoint(
	    function() {
	      $("#ifmob > div").toggleClass('stuck');
	    }
	  );
	  $('#postWrap').waypoint(
	    function() {
	      $("#ifmob > div").toggleClass('stuck');
	    }
	  )
	});
});

( function( $ ) {
$( document ).ready( function() {

	/* Infinte Scroll */
	jQuery('#postWrap').cleverInfiniteScroll({
		contentsWrapperSelector: '#isMarker',
		contentSelector: '.singlePost',
		contentHeight: '.white',
		nextSelector: '#scroller',
		loadImage: ''
	});

	var $commentform = $( '#commentform' );

	$( '.comment .reply' ).click( function( e ) {
		e.preventDefault();
		
		var $this = $( this );
		var comment_id = $this.data( 'comment' );
		var $replyform = $commentform.clone();
		
		var $hidden = $(  '<input type="hidden" name="comment_parent">' ).val( comment_id );
		$replyform.append( $hidden );
		$this.after( $replyform );
		
		$this.hide();
		
	} );

	$('.event-slider').bxSlider({
		auto: true,
		ticker: true,
		speed: 1500
	});

	$( '.featureBanner iframe' ).contents().find( "body a img" ).attr( "style", "width:100%;" );

} );
} )( jQuery );

