/*global jQuery, Cookies, IAPP_messaging*/
/*exported IAPP_shopping*/

/**
 * the IAPP_shopping module hijacks add-to-cart links and creates
 * an AJAX-driven experience where applicable
 *
 * relies on Scott Hamper's Cookies lib, inclucded in iapp.base.js
 *
 * @param  {jQuery} $ cast jQuery to the $
 * @return {object}   returns module per the pattern
 */
var IAPP_shopping = (function($) {
	'use strict';

	var module = {};

	module.options = {
		items_in_cart: 0,	// should this be initialized on login? read from a cookie?

		cart_selector: '.cart',
		cart_add_attribute: 'iapp-add-to-cart',
		iapp_product_header : '.iapp-product-header',
		iapp_product_details : '.iapp-product-details',
		iapp_product_short_desc : '.iapp-product-short-desc',
		item_id_prefix: 'iapp_item_',
		api_root: '/api/cart/',

		//cart_selector: '.nav-cart-mod',
		cart_active_class: 'nav-cart-isactive',

		cart_count_selector: '.nav-cart-count-text',

		cart_add_selector: '.iapp-add-to-cart',
		cart_remove_selector: '.iapp-remove-from-cart'
	};

	// nav-cart-isactive nav-message-isactive

	module.addToCart = function(action, guid) {
		module.post(module.options.api_root + action + '/' + guid);
	};

	module.removeFromCart = function(guid) {
		module.post(module.options.api_root + 'r/' + guid);
		$('#' + module.options.item_id_prefix + guid).remove();
	};

	module.post = function(endpoint) {
		$.post(endpoint, function(response) {

			var cart = response.data,
				messages = response.messages;

			// console.log(response);

			if(cart.count > 0) {
				Cookies.set('iapp-cart-count', cart.count);
			} else {
				Cookies.expire('iapp-cart-count');
			}
			module.updateCartIcon();

			if(messages.error.length !== 0) {
				IAPP_messaging.post({title: 'Error', body: messages.error[0]});
			}
		});
	};

	module.updateCartIcon = function() {
		var item_count = Cookies.get('iapp-cart-count');

		if(item_count) {
			$(module.options.cart_count_selector).text(item_count);
			$('body').addClass(module.options.cart_active_class);
		} else {
			$('body').removeClass(module.options.cart_active_class);
		}
	};

	module.toggleProductDetails = function() {
		alert(module.options.iapp_product_header);
	};

	/*
		updateStateDropdowns()
		> updates state dropdown list on shipping/payment pages
	*/
	module.updateStateDropdowns = function() {
		var country = $('#adr_country :selected').val();
		$('#adr_state').empty();
		var msg = '';
		$(module.states).find('[class="' + country + '"]').each(function(){
			msg += $(this).html();
			$('#adr_state').append($(this).clone());
		});

		if(country === "UNITED STATES"){
			if(!$("#ship_method option[value='1ac01e24-e2dd-4f54-a2d1-443482171aaa']").length) {
				$('#ship_method').append(new Option('USPS Priority Mail ($10)','1ac01e24-e2dd-4f54-a2d1-443482171aaa'));
			}
		}else{
			$("#ship_method option[value='1ac01e24-e2dd-4f54-a2d1-443482171aaa']").remove();
			$(".error").html("Note: Only USPS Express Mail is available to your country.");
		}
	};

	module.update_bundle_price = function() {
		var total = 0;
		$('.iapp-bundle').find('input:checked').each(function(){
			total += parseFloat($(this).data("price"));
		});		
		var dplaces = (total == parseInt(total, 10)) ? 0 : 2;
		total = '' + total.toFixed(dplaces);		
		$('.iapp-bundle-price').html(total);
	}

	/**
	 * The init method will kick off our listeners.
	 *
	 * @param {array} options is an object that can override default selectors and classes
	 */
	module.init = function(options) {

		$.extend(this.options, options);
		var opts = this.options,
			item_data = null;

		module.updateCartIcon();

		$(opts.cart_add_selector).on('click', function(event) {
			// item_data = $(this).data();
			// module.addToCart(item_data.iappShoppingAction, item_data.iappProductId);
			// event.preventDefault();
		});

		$(opts.cart_remove_selector).on('click', function(event) {
			// item_data = $(this).data();
			// // console.log(item_data);
			// module.removeFromCart(item_data.iappIvd);
			// event.preventDefault();
		});

		// state list
		module.states = $('#adr_state').clone();
		$('#adr_country').on('change', function(){
			module.updateStateDropdowns();
		});
		module.updateStateDropdowns();

		// hide product details
		$(module.options.iapp_product_details).hide();
		$(module.options.iapp_product_header).click(function(e){
			e.preventDefault();
			// console.log($(this).closest('.list-item').children(module.options.iapp_product_details).size());
			$(this).closest('.list-item').children(module.options.iapp_product_details).slideToggle(200);
			$(this).closest('.list-item').children(module.options.iapp_product_short_desc).toggle();
		});

		// show 10 results by default
		$('.results').hide();
		$('.results:lt(10)').show();

		// show all results
		$('.show-all').click(function(r){
			r.preventDefault();
			$(this).hide();
			$('.results').show();
		});

		/* 
			Ensures event registrations have at least one session selected  
			Requires iapp-event class
		*/
		$('form.iapp-event').not('.iapp-bundle').submit(function(e){
			if($('.iapp-session').size() > 0 && $('.iapp-session:checked').size() == 0) {
				IAPP_notifications.post("error","You must choose at least one session!");
				e.preventDefault();
			}
		});
		
		/* Bundle - The Magic */
		$('.iapp-bundle').submit(function(e){    			
			var bundle = {};    			
			bundle.membership = {};
			bundle.products = [];
			bundle.events = [];    			
			$('.iapp-membership:checked').each(function(){    				
				bundle.membership.id = $(this).attr("id");
				bundle.membership.key = $(this).val();
				bundle.membership.price = $(this).data("price");    				
			});
			$('.iapp-product:checked').each(function(){
				var product = {};
				product.id = $(this).attr("id");
				product.key = $(this).val();
				product.price = $(this).data("price");
				bundle.products.push(product);
			});
			$('.iapp-event:checked').each(function(){
				var evt = {};
				evt.id = $(this).attr("id");
				evt.key = $(this).val();
				evt.fee = $(this).data("price-id");
				evt.price = $(this).data("price");
				evt.sessions = [];
				$('.iapp-session:checked').each(function(){
					if($(this).data("event") == evt.id || $(this).data("event") == evt.key) {
						var session = {};    						
						session.fee = $(this).val();
						session.price = $(this).data("price");
						evt.sessions.push(session);
					}
				});
				bundle.events.push(evt);
			});    			
			$('#bundle').val(objprint(bundle, true));

		});

		$('.iapp-event').click(function(e){
			// uncheck prep sessions
			if($(this).hasClass("iapp-bundle-prep")){
    			//$('.iapp-bundle-prep-session').uncheck();
    			//$('.iapp-bundle-prep-session').disable();    				
			}
			var checked = $(this).prop("checked");
			var id = $(this).attr("id");
			if(checked) {
				$('.iapp-session').filter('[data-event="' + id + '"],[data-parent="' + id + '"]').check();    				
				$('.iapp-session').filter('[data-event="' + id + '"],[data-parent="' + id + '"]').not('.iapp-cbt').not('[data-optional="0"]').enable();

			} else {
				$('.iapp-session').filter('[data-event="' + id + '"],[data-parent="' + id + '"]').uncheck();
				$('.iapp-session').filter('[data-event="' + id + '"],[data-parent="' + id + '"]').disable();
			}
		});

		// update price
		$('.iapp-bundle').find('input').click(function(){
			module.update_bundle_price();
		});
		module.update_bundle_price();

		/* End Bundle */

		// CBT Terms
		$('.button-cbt').click(function(e){
			if($('.cbt-terms-and-conditions').not(':checked').size() > 0){
				e.preventDefault();
				IAPP_notifications.post("error", "You must agree to the terms and conditions.", false);				
			}					
		});

	};

	return module;

})(jQuery);
