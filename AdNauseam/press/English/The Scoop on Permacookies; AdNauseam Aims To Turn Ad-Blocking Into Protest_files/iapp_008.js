/*global jQuery*/
/* Conference Registration */
var IAPP_events = (function($) {

	var module = {};
	module.options = {		
	};

	// hide/show registration info / registration page
	$('.iapp-register-now').click(function(){
		$('#iapp-conference-register-info').hide();
		$('#iapp-conference-register').show();
	});

	$('.conference-registration-page').hide();
	$('.conference-registration-page:first').show();	

	$(".iapp-session-details").hide();
	$('.iapp-session-header').click(function(e){
		e.preventDefault();							
		var id = $(this).data("session");
		$("#details-" + id).slideToggle(200);
	});

	$('#btn-register-previous').click(function(){
		module.progress(-1);
	});
	$('#btn-register-next').click(function(){
		module.progress(1);
	});	

	// update questions
	$('[name^="q-"]').change(function(){
		module.updateQuestions();
	});			

	$('input[name="fee-main"]').click(function(){		
		if($('.iapp-fee:checked').size() > 0) {
			$('.reg-required').enable();
			$('#p-fees').html();								
			$('#p-fees').html($('.iapp-fee:checked').data("name"));
		} else {
			$('.reg-required').disable();
			$('.reg-required').uncheck();
			$('#p-fees').html('None selected.');
		}		
	});

	$('.iapp-session').click(function(e){

		var overlap = module.checkOverlap();
		if(overlap) {
			alert("You may not choose overlapping sessions!");
			e.preventDefault();
		}

		$('#p-sessions').html('None selected.')
		var msg = '';
		$('.iapp-session:checked').each(function(i){
			msg += '<p>'+ (i+1) + '. ' + $(this).data("name") +'</p>';
		});
		if(msg.length > 0){
			$('#p-sessions').html(msg);
		}
	});

	/* Registration Submit */
	$('#frm-conference-registration').submit(function(e){		
		//e.preventDefault();
		var valid = true;
		var errors = [];
		
		// ensure at least one session or fee is selected		
		var s = $('.iapp-session:checked').size() + $('.iapp-fee:checked').size();
		if(s <= 0){
			valid = false;
			errors.push("You must select at least 1 event fee or session.");
		}

		// temporal validation
		var overlap = module.checkOverlap();
		if(overlap && $('#etc_key').val() != 'b9543962-8eaf-4272-a997-6c9bb5ef4b2c'){
			valid = false;
			errors.push("You have selected overlapping sessions! Please correct and re-submit.");
		}
		
		// terms and conditions
		if($('.iapp-terms-and-conditions').not(':checked').size() > 0){
			valid = false;
			errors.push("You must agree to the terms and conditions.");
		}												
				
		if(!valid){
			IAPP_notifications.clear();
			$.each(errors, function(i,message) {
				IAPP_notifications.post("error", message, false);				
			});
			e.preventDefault();
		}	

	});

	/* Toggle Password Visibility for Registrant Type */
	$('#ddl-rgt_key').change(function(){		
		var show = $('#ddl-rgt_key option:selected').data('pw');
		$('.exr_password_ext').toggle(show == "1");
	});	

	$('.btn-knet-register, .btn-pah-register').click(function(e) {
		$(this).html('<img style="width: 15px; height: 15px; margin: -2px 31px;" src="/wp-content/themes/iapp/static/img/ui-img/icons/gif/green-btn-loader.GIF" />');
	});

	/* KnowledgeNet / PAH Registration */	
	$('.iapp-knowledgenet-register, .iapp-pah-register').submit(function(e){		
		e.preventDefault();		

		var evt = $(this).find("input[name='event']").val();
		var cc = $(this).find("input[name='cc-assistant']").val();
		var x = $(this).serializeArray();
		$.post("/api/connect/chapter/register", {
			evt: evt,
			cc: cc
		}, function(data){
			var id = data.data.event;
			$("#frm-" + id).hide();
			$.each(data.messages, function(i,m) {
				IAPP_notifications.post(m.type,m.body);
			});			
			//console.log(JSON.stringify(data, null, 4));						
		});
	});

	/**
	 * The init method will kick off our listeners.
	 *
	 * @param {array} options is an object that can override default selectors and classes
	 */
	module.init = function(options) {

		$.extend(this.options, options);
		// var opts = this.options; // uncomment when used
	};

	module.progress = function(to) {

		IAPP_notifications.clear();
		if(!module.validateQuestions()) {
			IAPP_notifications.post("error","Please complete all required questions.");
			return;
		}

		var size = $('.conference-registration-page').size();
		var index = $('.conference-registration-page:visible').index('.conference-registration-page');
		var newIndex = Math.min(Math.max(0, index + to), size - 1);						
		$('.conference-registration-page').hide();
		$('.conference-registration-page').eq(newIndex).show();
		$(".iapp-session-details").hide();
		
		if(index == size - 1 && to == 1){
			$('#frm-conference-registration').submit();
		}
	};

	module.updateQuestions = function() {
		// update question input
		var dMsg = '';
		var oValid = new Array();
		var oAnswers = new Array();
		
		$('[name="question[]"]').remove();
		$('[name^="q-"]').each(function(){			
			var id = $(this).attr("name").substr(2);
			var type = $(this).attr("type");
			var val = $(this).val();				
			var req = $(this).data("required");
			if(req == "0"){
				oValid[id] = oValid[id] || true;
			}else{
				oValid[id] = oValid[id] || false;
			}
			
			if(type && (type == 'checkbox' || type == 'radio')){
				if($(this).is(':checked')){
					var current = oAnswers[id];					
					if(current && current != ""){
						oAnswers[id] = oAnswers[id] + "," + val;
					}else{
						oAnswers[id] = val;
					}
					oValid[id] = true;
				}
			}else if (val != ""){
				var current = oAnswers[id];					
				if(current && current != ""){
					oAnswers[id] = oAnswers[id] + "," + val;
				}else{
					oAnswers[id] = val;
				}					
				oValid[id] = true;
			}				
		});
		
		valid = true;
		for(var k in oValid){
			valid = valid && oValid[k];
		}
		module.toggleButtons(valid);

		for(var a08_key in oAnswers) { 		
			if(a08_key.length < 36){
				continue;
			}		
			dMsg = dMsg + a08_key + "|" + oAnswers[a08_key] + "\r\n"; 				 				 
			var s = '<input type="hidden" name="question[]" value="'+ a08_key + '|' + oAnswers[a08_key] +'" />';		
			$('#frm-conference-registration').append(s);	 				
		}					
		//console.log(dMsg);		
	}

	module.toggleButtons = function(status) {		
		if(status){
			// enable buttons
		}else{
			// disable buttons
		}			
	}			

	module.validateQuestions = function() {
		var valid = true;
		var names = [];
		$('.iapp-question').each(function(){
			var n = $(this).attr("name");
			if(!names[n]){
				names.push(n);	
			}			
		});
		$.each(names, function(i,name){
			var $e = $('[name="'+ name +'"]');
			var req = $e.filter('[data-required="1"]').size() > 0;
			var val = "";
			$e.each(function(){
				var type = $(this).attr("type");
				if(type && (type == 'checkbox' || type == 'radio')){
					if($(this).is(':checked')){
						val += $(this).val();
					}
				}else{
					val += $(this).val();
				}
			});	

			valid = valid && (!req || val.length > 0);
		});

		return valid;
	}

	module.checkOverlap = function() {
		var num = $('input[name^="session-"]:checked').size();
		var overlap = false;
		try{
			for(i = 0; i < num && !overlap; i++){
				s1=parseInt($($('input[name^="session-"]:checked').get(i)).data('start'));
				e1=parseInt($($('input[name^="session-"]:checked').get(i)).data('end'));
				for(j = i+1; j < num && !overlap; j++){						
					s2=parseInt($($('input[name^="session-"]:checked').get(j)).data('start'));
					e2=parseInt($($('input[name^="session-"]:checked').get(j)).data('end'));
					overlap = s2 < e1 && s1 < e2;
				}
			}
			if(overlap && $('#etc_key').val() != 'b9543962-8eaf-4272-a997-6c9bb5ef4b2c'){
				valid = false;
				errors.push("You have selected overlapping sessions! Please correct and re-submit.");
			}
		} catch(err) {
		
		}		
		return overlap
	}

	return module;

})(jQuery);