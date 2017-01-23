			
// Copyright 2006-2015 ClickTale Ltd., US Patent Pending
// PID: 327
// Generated on: 10/28/2015 6:04:50 AM (UTC 10/28/2015 11:04:50 AM)



window.ctlib = {};

ctlib.doLogical = function(pName) {
    if (typeof ClickTaleStop === "function" && typeof ClickTaleUploadPage === "function") {
        ClickTaleStop();
        window['ClickTaleIncludedOnDomReady'] = true;
        window['ClickTaleIncludedOnWindowLoad'] = true;
        ClickTaleUploadPage();        
        ClickTaleLogical(document.location.href);
		ClickTaleEvent(pName);	    
    }
}

ctlib.doOnlyWhen = function (toDoHandler, toCheckHandler, interval, times, failHandler) {
    if ((!toDoHandler) || (!toCheckHandler)) return;
    if (typeof interval == "undefined") interval = 1000;
    if (typeof times == "undefined") times = 20;
    if (--times < 0) {
        if (typeof failHandler === 'function') {
            failHandler();
        }
        return;
    }
    if (toCheckHandler()) {
        toDoHandler();
        return;
    }
    setTimeout(function () { ctlib.doOnlyWhen(toDoHandler, toCheckHandler, interval, times, failHandler); }, interval);
};
ctlib.doOnlyWhen(PCCmain, function () {
        if (window['jQuery'] && typeof jQuery.fn.on === 'function' && typeof jQuery.fn.one === 'function' && typeof ClickTaleIsRecording === 'function' && ClickTaleIsRecording() && typeof ga === 'function') {
            return true;
        }
        return false;
}, 250, 40);
function PCCmain() {
	try {
		jQuery('.featured-item-tag').click(function(){
			if (typeof ClickTaleEvent == "function")
				ClickTaleEvent('Wired+');
		});
		jQuery('#search').click(function(){
			if (typeof ClickTaleEvent == "function")
				ClickTaleEvent('Global Search');
		});		
		jQuery('.menu-toggle span').click(function(){
			if (typeof ClickTaleEvent == "function")
				ClickTaleEvent('Side Nav Expand');
		});		
		jQuery('.site-overlay').click(function(){
			if (typeof ClickTaleEvent == "function")
				ClickTaleEvent('Side Nav Collapse');
		});			
		jQuery('nav a').each(function(i,el){
			var elm = jQuery(el);
			var attr = elm.attr('id');
			if (typeof attr === 'undefined') {
				elm.attr('id','ctNav'+ i);
			}
		});			
		jQuery('nav a').each(function(i,el){
			var elm = jQuery(el);
			var attr = elm.attr('id');
			if (typeof attr === 'undefined') {
				elm.attr('id','ctNav'+ i);
			}
		});
		jQuery('.text-right .header-navigation').click(function(){
			if (typeof ClickTaleEvent === 'function')
				ClickTaleEvent('Article Nav');
		});	
		
		jQuery('#openHmsSignin').click(function(){
			if (typeof ClickTaleEvent === 'function')
				ClickTaleEvent("Action | Click | Login Top");
			setTimeout(function(){ ctlib.doLogical("Login Page"); },3000);
		});
		
        if (jQuery('meta[property="article:tag"]').length > 0 && typeof ClickTaleEvent === 'function')
			ClickTaleEvent('Article Page');

		jQuery('#openHmsEntitlementSignup, .abtest-login').click(function(){ 
			if (typeof(ClickTaleEvent) === 'function') ClickTaleEvent("Action | Click | Login Top");
			setTimeout(function(){ ctlib.doLogical("Login Page"); },3000);
		});
		
		jQuery('.modal-panel-content').on('click', '.modal-link.modal-toggle.btn.btn-dark', function(){ 
			if (typeof(ClickTaleEvent) === 'function') ClickTaleEvent("Action | Click | Registration");
			setTimeout(function(){ ctlib.doLogical("Registration Page"); },3000); 
		});
		
		
		jQuery('.modal-panel-content').on('click', '#signin', function(){ 
			if (typeof(ClickTaleEvent) === 'function') ClickTaleEvent("Action | Click | Login Attempt");			 
			setTimeout(function(){ 
				if (typeof(ClickTaleEvent) === 'function' && jQuery('.form-error:visible').length > 0) {
					ClickTaleEvent("Login Failure");
					if(jQuery('#ember355 form').length > 0 && typeof(ClickTaleRegisterFormSubmitFailure) === 'function') 
						ClickTaleRegisterFormSubmitFailure(jQuery('#ember355 form')[0]);
				}
			},3000);
		});
		
		jQuery('.modal-panel-content').on('click', '#createUser', function(){ 
			if (typeof(ClickTaleEvent) === 'function') ClickTaleEvent("Action | Click | Registration Attempt");			 
			setTimeout(function(){ 
				if (typeof(ClickTaleEvent) === 'function' && jQuery('.form-error:visible').length > 0) {
					ClickTaleEvent("Registration Failure");
					if(jQuery('#ember355 form').length > 0 && typeof(ClickTaleRegisterFormSubmitFailure) === 'function') 
						ClickTaleRegisterFormSubmitFailure(jQuery('#ember578 form')[0]);
				}
			},3000);
		});
		
		
		jQuery('.submenu .pseudo_open_login').click(function(){ 
			if (typeof(ClickTaleEvent) === 'function') ClickTaleEvent("Action | Click | Login Left");			
			setTimeout(function(){ ctlib.doLogical("Login Page"); },3000);
		});
		jQuery('.main-menu .abtest-shop').click(function(){ 
			if (typeof(ClickTaleEvent) === 'function') ClickTaleEvent("Action | Click | Nav Shop");			
		});
		
		setTimeout(function() {
			if (typeof ga !='undefined' && typeof ClickTaleGetUID === 'function' && ClickTaleGetUID() != null) { 
				var gtmCode = ga.getAll();
				if(gtmCode && gtmCode.length > 0 && gtmCode[0].get('name')!=""){						
					ga(gtmCode[0].get('name') + '.send', 'event', 'ClickTaleUID', ClickTaleGetUID().toString(), {'dimension16': ClickTaleGetUID().toString()}, {'nonInteraction': 1});
					ga(gtmCode[0].get('name') + '.send', 'event', 'ClickTaleSID', ClickTaleGetSID().toString(), {'dimension18': ClickTaleGetSID().toString()}, {'nonInteraction': 1});
				}
			}
		},3000);
	} catch(e) {}
};



