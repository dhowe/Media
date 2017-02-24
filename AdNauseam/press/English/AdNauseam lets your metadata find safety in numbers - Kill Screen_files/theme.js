/**
 * theme.js
 *
 * General scripts for the Kill Screen theme
 */


( function( $ ) {

	// Handles toggling the playlist filters for the playlist CPT archive page.

	/* Define variables */
	var filter_toggle;

	filter_toggle = $( '.selectboxit-container' );

	/* Click toggle */
	filter_toggle.click( function() {
		if ( $( this ).hasClass( 'open' ) ) {
			filter_toggle.removeClass( 'open' );
		} else {
			filter_toggle.removeClass( 'open' );
			$( this ).addClass( 'open' );
		}
	} );

	/* Comments form Overlay display */

	// show overlay
	$( ".entry-footer .article-sidebar-toggle" ).click( function( e ) {
		e.preventDefault();
		if ( ! $html.hasClass( 'sidebar-opened') ) {
			$html.toggleClass( 'sidebar-opened' );
			$overlay.fadeIn( 200 );
		}
	} );

	// hide overlay
	$( ".close-comments, .body-overlay" ).click( function( e ) {
		e.preventDefault();
		if ( $html.hasClass( 'sidebar-opened') ) {
			$html.toggleClass( 'sidebar-opened' );
			$overlay.fadeOut( 200 );
		}
	} );

	// Resize homepage Skyscraper ad container
	if ( jQuery( 'body' ).hasClass( 'home' ) ) {
		var wrapper = $( '.home .advert-wrapper.s300x600' );
		var alignment_block = $( '.article-blocks.bottom .article-block' ).first();
		var wrapper_height = parseInt( ( alignment_block.height() * 2 ) + parseInt( alignment_block.css( 'padding-bottom' ) ) );
		wrapper.css( 'height', wrapper_height );
	}

	  if ($('.notice-overlay').length) {
	    $('.notice-overlay').addClass('visible').on('click', function () {
	      $(this).fadeOut('fast');
	      Cookies.set('seen_notification', true, { expires: 7 });
	    });
	  }


} )( jQuery );
