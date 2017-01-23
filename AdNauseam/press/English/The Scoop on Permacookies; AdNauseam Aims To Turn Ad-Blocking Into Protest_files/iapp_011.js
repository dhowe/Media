/*global jQuery*/
/*exported IAPP_ui, IAPP_tabs*/

/**
 * IAPP_tabs helper module
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
var IAPP_tabs = (function($) {

	var module = {};

	var defaults = {
		tabContainerSelector: '.iapp-tabs',
		secondaryTabContainerSelector: '.iapp-tabs-secondary',
		tabSelector: '.iapp-tab',
		contentSelector: '.iapp-content',
		contentPrefix: '#iapp-content-'
	};

	module.reset = function() {
		$(module.options.secondaryTabContainerSelector + ' .iapp-tab')
			.add(module.options.contentSelector)
			.hide();
	}

	module.init = function(opts) {

		module.options = $.extend(defaults, opts);

		// reset
		module.reset();

		$(module.options.tabSelector + ' a').on('click', function() {

			module.reset();

			var $a = $(this),
				$tab = $a.parent(),
				$ul = $tab.parent();

			// make all tabs inactive, then make this one active
			$(module.options.tabSelector).removeClass('is-active');
			$tab.addClass('is-active');

			// make parent tab active, if applicable
			var parent = $tab.data('tab-parent');
			if(parent) {
				$('#' + parent).addClass('is-active');
			}

			// show content
			var content = $tab.data('iapp-content');

			$(module.options.contentSelector).hide();
			$(module.options.contentPrefix + content).show();

			// hide, then show secondary tabs (if clicking on a parent)
			$(module.options.tabSelector + '[data-tab-parent="' + $tab.attr('id') + '"]').siblings().andSelf().show();

			// also make sure we're showing the row we actually clicked on
			$tab.siblings().andSelf().show()

			event.preventDefault();
		});

		// show the first nugget of content we have!
		$('.iapp-default-tab a').trigger('click');
	};

	return module;

})(jQuery);

/**
* IAPP_show_full helper 
*/

$('.full-results').hide();

// show all results

$('.show-full').on('click', function(a) {
	var el = $(this);
	$(el).toggleClass('active');
	if (el.text() == el.data('text-swap')) {
		el.text(el.data('text-original'));
	} else {
		el.data('text-original', el.text());
		el.text(el.data('text-swap'));
	}
	$(this).prev('.full-results').toggle();

	a.preventDefault();
});

// Expandable sections
$('.expandable').on('click', function(){
	$(this).toggleClass('expanded');
});

// Initiate FancyBox for image galleries
$('.fancybox').fancybox();

// Tooltips
tooltipInit = function() {
    var targets = $( '[rel~=tooltip]' ),
        target  = false,
        tooltip = false,
        title   = false;
 
    targets.bind( 'mouseenter', function() {
        target  = $( this );
        tip     = target.attr( 'title' );
        tooltip = $( '<div id="tooltip"></div>' );
 
        if( !tip || tip === '' )
            return false;
 
        target.removeAttr( 'title' );
        tooltip.css( 'opacity', 0 )
               .html( tip )
               .appendTo( 'body' );
 
        var init_tooltip = function() {
            if( $( window ).width() < tooltip.outerWidth() * 1.5 )
                tooltip.css( 'max-width', $( window ).width() / 2 );
            else
                tooltip.css( 'max-width', 340 );
 
            var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
                pos_top  = target.offset().top - tooltip.outerHeight() - 20;
 
            if( pos_left < 0 ) {
                pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                tooltip.addClass( 'left' );
            }
            else
                tooltip.removeClass( 'left' );
 
            if( pos_left + tooltip.outerWidth() > $( window ).width() ) {
                pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                tooltip.addClass( 'right' );
            }
            else
                tooltip.removeClass( 'right' );
 
            if( pos_top < 0 ) {
                var pos_top  = target.offset().top + target.outerHeight();
                tooltip.addClass( 'top' );
            }
            else
                tooltip.removeClass( 'top' );
 
            tooltip.css( { left: pos_left, top: pos_top } )
                   .animate( { top: '+=10', opacity: 1 }, 50 );
        };
 
        init_tooltip();
        $( window ).resize( init_tooltip );
 
        var remove_tooltip = function() {
            tooltip.animate( { top: '-=10', opacity: 0 }, 50, function() {
                $( this ).remove();
            });
 
            target.attr( 'title', tip );
        };
 
        target.bind( 'mouseleave', remove_tooltip );
        tooltip.bind( 'click', remove_tooltip );
    });
};

tooltipInit();

/**
 * BASE IAPP UI module
 *
 * to use, just create UI modules above, and initialize them here!
 * This will ship back to iapp.base.js for initialization
 */
var IAPP_ui = (function($) {

	var module = {};

	module.init = function() {

		IAPP_tabs.init();

	};

	return module;

})(jQuery);
