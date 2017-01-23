/*global jQuery*/
/*exported IAPP_megamenu*/

var IAPP_megamenu = (function($) {
	'use strict';

	var module = {};

	module._closeTimeout = null;

	module.options = {

		/** container class, the element that contains all megemenu markup */
		container: '.site-nav',

		/** item class, the interactive element that would cause a sub-menu change */
		menuitem: '.iapp-mega-trigger',

		/** will be added/removed from menu items */
		menuitem_active: 'is-active',

		/** the subsection class points to hidden menu areas that will be hidden/shown */
		menumod: '.mega-menu-mod',

		/** a value of false will just use jQuerys .hide() .show() instead of add/removeClass(active) */
		menumod_active: 'mega-is-active',

		/* delay in ms for the close timeout based on cursor exit conditions */
		close_delay: 150,

		/* if disable is set to true, megamenu will shut and UI will not react to user input.
			this is meant to be used in conjunction with instant search UI. Interact with megamenu via enable() and disable() */
		disable: false
	};

	/**
	 * open will handle all of the state adjustments necessary
	 * to open the desired mega unobtrused
	 *
	 * @param  {HTML element} el
	 */
	module.open = function(el) {

		// if it's already open, do nothing
		if ($(el).hasClass(this.options.menuitem_active) || this.options.disable === true) {
			return;
		}

		this.close(); // closes all open megas

		// wipe out menu item classes, and activate el
		$(el).addClass(this.options.menuitem_active);

		// open this mega
		var id = $(el).data('mega');
		$('#' + id).css('opacity', '1.0').addClass(this.options.menumod_active);
	};

	/**
	 * close shuts down or hides all open mega entities
	 * 	if an item is active, it fades it out instead of hiding it outright
	 */
	module.close = function(fade_speed) {
		// TODO: test for args in case we only want to close _one_
		// console.log('close is being called');
		fade_speed = typeof fade_speed !== 'undefined' ? fade_speed : 100;
		var opts = this.options;
		var $open = $('.' + opts.menumod_active);

		// remove menu item classes
		$(opts.menuitem).removeClass(opts.menuitem_active);

		// special for MyIAPP menu
		$('.nav-myiapp-mod').removeClass('is-active');		
		$('.nav-myiapp-mobile').removeClass('is-active');		
		$('.js-instant-search').removeClass('js-instant-search');		

		// remove all active classes EXCEPT the one we're animating
		$(opts.menumod).not($open).removeClass(opts.menumod_active);

		$open.stop().animate({
			opacity: 0
		}, fade_speed, function() {
			$(this).removeClass(opts.menumod_active);
		});
	};

	module.enable = function() {
		this.options.disable = false;
	};

	module.disable = function() {
		this.options.disable = true;
		this.close();
	}

	/**
	 * The init method will kick off our listeners.
	 *
	 * It can use our built-in defaults (above in .options)
	 * or accept overrides via the options arg
	 *
	 * usage:
	 *
	 * 	IAPP_megamnu.init(); // uses defaults
	 *
	 *  IAPP_megamenu.init({
	 *  	container: '.mycontainer' // override container class
	 *  })
	 *
	 * @param {array} options is an object that can override default selectors and classes
	 */
	module.init = function(options) {

		$.extend(this.options, options);

		var opts = this.options,
			mega = this;

		// This toggles the class of .is-active on the .nav-items-mod
		// Hiding and showing the site nav at smaller screen sizes
		$('.nav-trigger').on('click', function(event) {
			$('.nav-items-mod').toggleClass('is-active');
			event.preventDefault();
		});

		// set top loc of mega mod
		$('.mega-menu-mod').css('top', ($('.nav-inner').outerHeight()) + 'px');

		// determine our input situation
		var isTouch = $('html').hasClass('touch'); // depends on modernizr
		var noTouch = $('html').hasClass('no-touch');

		if ((isTouch && noTouch) || isTouch) { // if hybrid or touch
			if ($(window).width() > 1100) {
				$(opts.menuitem).on('click', function(e) {
					if ($(this).hasClass(opts.menuitem_active)) {
						mega.close();
					} else {
						mega.open(e.target);
					}
					event.preventDefault();
				});

				$('.myiapp-link').on('click', function(event) {
					$('.nav-myiapp-mod').toggleClass('is-active');
					event.preventDefault();
				})

			} else {
				$('.myiapp-link').on('click', function(event) {
					$('.nav-myiapp-mod').toggleClass('is-active');
					event.preventDefault();
				})
			}

		} else { // no touch

			// if we hover over a menu item, cancel the close timer
			// 	and open the target menu mod
			$(opts.container + ' ' + opts.menuitem).on('mouseenter', function(e) {
				clearTimeout(mega._closeTimeout);
				mega.open(e.target);
				// special active treatment for iapp logo
				if ($('.nav-logo-link').hasClass('is-active')) {
					$('.nav-logo').addClass('is-active');
				} else {
					$('.nav-logo').removeClass('is-active');
				}
			});

			// if we enter a mega mod, cancel the close timer
			// added special for MyIAPP menu
			$(opts.menumod + ', .nav-myiapp-mod').on('mouseenter', function() {
				clearTimeout(mega._closeTimeout);
			});

			// if we leave the nav container OR an exposed mega mod
			// start a timer to hide the active mega mod
			$(opts.container + ',' + opts.menumod).on('mouseleave', function() {
				clearTimeout(mega._closeTimeout);
				mega._closeTimeout = setTimeout(function() {
					mega.close();
					// remove active treatment for logo
					$('.nav-logo').removeClass('is-active');
				}, opts.close_delay);
			});

			// if user scrolls while mega mod is open
			// close it
			$(window).on('scroll', function() {
				if ($('.mega-menu-mod').hasClass('mega-is-active')) {
					$('.mega-menu-mod').removeClass('mega-is-active');
					$('.nav-link, .nav-logo-link, .nav-logo').removeClass('is-active');
				}
			});

			// special for MyIAPP menu
			$('.myiapp-link').on('mouseenter', function() {
				module.close();
				$('.nav-myiapp-mod').addClass('is-active');
			}).on('mouseleave', function() {
				clearTimeout(mega._closeTimeout);
				mega._closeTimeout = setTimeout(function() {
					mega.close();
				}, opts.close_delay);
			});
		}
	};

	return module;

})(jQuery);