/*global jQuery*/
/*exported IAPP_saved*/

var IAPP_saved = (function($) {

	var module = {};

	module.options = {
		// subscriptions
		subscribeTriggerSelector: '.iapp-channel-subscribe',

		// saved content
		activeSaveClass: 'is-saved',
		saveTriggerSelector: '.tz-saveable-trigger',

		activeSaveTargetSelector: '.tz-saveable-block',

		// refactor for 2 endpoints... - pk
		endPoint: '/api/profile/saved'
	};

	/**
	 * MyIAPP channel subscriptions
	 * @param {string} channel_id a tag to be posted to the middleware
	 */
	module.addChannel = function(channel_id) {
		module.post({
			term_id: channel_id,
			action: 'add'
		}, function(response) {
			//console.log('added!', channel_id, response);
		}, '/api/profile/channels');
	};

	module.removeChannel = function(channel_id) {
		module.post({
			term_id: channel_id,
			action: 'remove'
		}, function(response) {
			//console.log('removed!', channel_id, response);
		}, '/api/profile/channels');
	};

	/**
	 * MyIAPP "saved" content management
	 * @param {int} post_id an integer post_id is passed along to
	 *                      be posted to the middleware. IAPP_message
	 *                      in the callback
	 */
	module.addPost = function(post_id) {
		module.post({
			post_id: post_id,
			action: 'add'
		}, function(response) {
			IAPP_messaging.post('Post saved to your profile!');
		});
	};

	module.removePost = function(post_id) {
		module.post({
			post_id: post_id,
			action: 'remove'
		}, function(response) {
			// no need for a message
		});
	};

	/**
	 * utility poster
	 * @param  {object}   payload contains required properties for middleware processing
	 * @param  {Function} cb      callback for the response
	 */
	module.post = function(payload, cb, endPoint) {
		//console.log('MAKIN POSTS', payload, cb, endPoint);
		if(typeof endPoint === 'undefined') {
			endPoint = module.options.endPoint;
		}
		$.post(endPoint, payload, cb);
	}

	/**
	 * simple method that pings the middleware and calls the supplied callback
	 * @param  {Function} cb
	 */
	module.fetch = function(cb) {
		$.get(module.options.endPoint, cb);
	};

	module.init = function(opts) {

		/* do not initialize for community hub */
		var ch = (window.location.href.indexOf('force.com') > 0			
			|| window.location.href.indexOf('my.iapp.org') > 0);		
		if(ch){
			return;
		}

		$.extend(module.options, opts);

		// 'channel subscriptions' listener
		$(module.options.subscribeTriggerSelector).off('click').on('click', function() {

			var data = $(this).data();

			if( !$(this).prop('checked') ) {
				module.removeChannel(data.channelSlug);
			} else {
				module.addChannel(data.channelSlug);
			}
		});
		module.initEventHandlers();

	};

	module.initSavedStyle = function() {
		module.fetch(function(response) {
			if(response) {
				$.each(response.data.saved, function(index, post_id) {
					$('#iapp_post_' + post_id).addClass(module.options.activeSaveClass);
				});
			}
		});
	}

	module.initEventHandlers = function() {
		// 'saved content' listener
		$(module.options.saveTriggerSelector).off('click').on('click', function(event) {
			var $trigger = $(this);
			var post_id = $trigger.data('iapp-post-id');
			var post_title = $(this).parent().siblings().children('h3').children('.tz-head-link').text();

			if(!$trigger.parent('.' + module.options.activeSaveClass).length) {
				module.addPost(post_id);
				ga('send', 'event', 'Save', 'Click', post_title);
			} else {
				module.removePost(post_id);
			}

			$(this).closest(module.options.activeSaveTargetSelector).toggleClass(module.options.activeSaveClass);

			event.preventDefault();

		});

		module.initSavedStyle();
	}

	return module;

})(jQuery);
