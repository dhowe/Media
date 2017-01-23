/*global jQuery*/
/*exported IAPP_messaging*/

/**
 * This provides messaging functionality for one and all!
 *
 * @param  {jQuery} $ cast jQuery to the $
 * @return {object}   returns module per the pattern
 */
var IAPP_messaging = (function($) {
	'use strict';

	var module = {};

	module.queue = [];

	module.options = {
		message_active_class: 'nav-message-isactive', // goes on body

		message_mod_selector: '.nav-message-mod',
		message_head_selector: '.notify-head-nav',
		message_body_selector: '.notify-text-nav',
		message_close_selector: '.nav-message-close'
	};

	module.closeMessage = function() {
		var $messageMod = $(module.options.message_mod_selector);

		$messageMod.animate({opacity: 0}, 100, function(){

			$('body').removeClass( module.options.message_active_class );
			$messageMod.css('opacity', 100);

			if(module.queue.length > 0) {
				// if there are still messages in the queue, pop the next one in!
				module.loadMessage();
			}
		});

	};

	/**
	 * [loadMessage description]
	 * @param  {string|object} message if an object, it expects title and body properties
	 * @return {null}         returns nothing if it's not going to run
	 */
	module.loadMessage = function(message) {

		if($('body').hasClass( module.options.message_active_class )) {
			// this means there's already one showing, so, uh... just do nothing.
			return;
		}

		if(typeof message === 'undefined') {
			message = module.queue.pop();
		}

		$('body').addClass( module.options.message_active_class );

		if( message.hasOwnProperty('title') ) {
			if(message.title !== '') {
				$(module.options.message_head_selector).text(message.title);
			} else {
				//console.log('FYI, message title is empty');
			}
		}

		if( message.hasOwnProperty('body') ) {
			if(message.body !== '') {
				$(module.options.message_body_selector).text(message.body);
			} else {
				//console.log('FYI, message body is empty');
			}
		}
	};

	module.post = function(message) {
		if(typeof message === 'string') {
			module.queue.push({title: '', body: message});
		} else if(typeof message === 'object') {
			module.queue.push(message);
		} else {
			//console.log('what is message?', typeof message, message);
		}

		module.loadMessage();
	}

	/**
	 * The init method will kick off our listeners.
	 *
	 * @param {array} options is an object that can override default selectors and classes
	 */
	module.init = function(options) {

		$.extend(this.options, options);
		// var opts = this.options; // uncomment when used

		$(module.options.message_close_selector).on('click', function() {
			module.closeMessage();
		})

	};

	return module;

})(jQuery);


var IAPP_notifications = (function($) {
	'use strict';

	var module = {};

	module.queue = [];

	module.options = {
		notifications_selector: '#iapp-notifications',
		template_selector: '#iapp-notification-template'
	};

	module.post = function(type, message, clear) {
		/* had code to clone template div, but would not style correctly, so appending straight html */
		if(clear == null || clear === true) {
			module.clear();
		}

		var html = '<div class="notify--sm"><div class="hex-'+ type +'-med icon-warning"><i class="icon icon-med"></i></div><p class="notify-text">'+ message +'</p></div>';		
		$(module.options.notifications_selector).append(html);	
		$('html, body').animate({ scrollTop: 0 }, 0);
	}

	module.clear = function() {
		$(module.options.notifications_selector).empty();
	}

	/**
	 * The init method will kick off our listeners.
	 *
	 * @param {array} options is an object that can override default selectors and classes
	 */
	module.init = function(options) {

		$.extend(this.options, options);
		// var opts = this.options; // uncomment when used

	};

	return module;

})(jQuery);