/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens.
 */
( function( $ ) {

	$html = $( 'html' ),
	$overlay = $( '.body-overlay' );

    $overlay.on( 'click', function( e ) {
      $html.removeClass( 'menu-opened' );
      fadeOverlay();
    });

    $( '.menu-toggle' ).on( 'click', function( e ) {
      e.preventDefault();
      $html.toggleClass( 'menu-opened' );
      fadeOverlay();
    });

    function fadeOverlay() {
      if( $html.hasClass( 'menu-opened' ) ) {
        $overlay.fadeIn( 200 );
      }
      else {
        $overlay.fadeOut( 200 );
      }
    };


	/* Search Bar Toggling in the Nav Menu */
    $( '.search-toggle' ).on( 'click', function( e ) {
      var $input = $( '.site-header form input' );

      if( $html.hasClass( 'search-opened' ) && $input.val() === '' ) {
        e.preventDefault();
        $input.focus();
      }
      else if( ! $html.hasClass( 'search-opened' ) ) {
        e.preventDefault();
        $html.addClass( 'search-opened' );
        $input.focus();
      }
    });

    $( '.search-form input' ).on( 'blur', function( e ) {
      e.preventDefault();
      if( e.relatedTarget === null && $html.hasClass( 'search-opened' ) && $( this ).val() === '') {
        $html.removeClass( 'search-opened' );
      }
    });

    $( '.nav-wrapper' ).on( 'click', function( e ) {
      if( ! $html.hasClass( 'search-opened' ) && $( this ).prop( 'class' ) == $( e.target ).prop( 'class' ) ) {
        e.preventDefault();
        $html.toggleClass( 'search-opened' ).find( '.site-header form input' ).focus();
      }
    });

} )( jQuery );