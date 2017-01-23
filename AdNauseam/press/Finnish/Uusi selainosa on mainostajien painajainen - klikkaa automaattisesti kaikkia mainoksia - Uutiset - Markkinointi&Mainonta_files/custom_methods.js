/**
 * Custom Events validation
 *
 * Copyright 2011 Talentum Oyj. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY/CONFIDENTIAL SOURCE CODE OF Talentum Oyj.
 * Use is subject to license terms.
 */

/* Custom validation */
jQuery.validator.addMethod("dateFI", function(value, element) {
    return this.optional(element) || /^\d\d?\.\d\d?\.\d\d\d\d$/.test(value);
  }, jQuery.validator.messages.dateFI
);


/* Validation for inFieldLabel-fields*/
jQuery.validator.addMethod("notDefault", function(value, element) {
    //return this.optional(element) || /^\d\d?\.\d\d?\.\d\d\d\d$/.test(value);
	return  $(element).val() != $(element).attr('title'); //$(element).val() != "" &&
  }, jQuery.validator.messages.required
);

/**
 * \w Match any word character. Equivalent to [a-zA-Z_0-9]. 
 * \W negation of the one before. e.g. !"#¤%
 * \d 0-9
 */
jQuery.validator.addMethod("postCodeFI", function(value, element) {
    return this.optional(element) || /^[\w\W]{1,10}$/.test(value);
  }, jQuery.validator.messages.postCodeFI
);

/* Pre-validates captcha */
jQuery.validator.addMethod("imageCaptchaAnswer", function(value, element) {
	var form = $('input[name="word"]').parents("form").get(0);
	//console.log(form);
	//console.log(form.captchaValidated);
	if(form.captchaValidated === true){
		//console.log("Ignored");
		return true;
	}
	$.ajax({
		  url: siteBaseUrl+"handle/checkCaptcha.jsp?word="+$('input[name="word"]').val(),
		  dataType: 'json',
		  success: function(data){
		    if(data.valid == "true"){
		      form.captchaValidated = true;
		      $(form).submit(); 
		      console.log("Success");
		    }
	      }
		});
	return  false;
  }, jQuery.validator.messages.imageCaptchaAnswer
);

/* Custom default error positioning. Special cases should be added to view's validate() options. */
jQuery.validator.setDefaults({
//  invalidHandler: function(form, validator) {
//    var errors = validator.numberOfInvalids();
//    if (errors) {
//      var message = jQuery.validator.messages.allRequired;
//      $("div.errorSummary").html('<div class="errorSummaryContent">'+message+'</div>');
//      $("div.errorSummary").show();
//    } else {
//      $("div.errorSummary").hide();
//    }
//  },
  ignoreTitle: true,
  onfocusout: false,
  errorPlacement: function(error, element) {
    if (element.attr('type') === 'radio') {
      alert(element.parent().parent().parent().get(0).tagName);
      //error.insertAfter(element.siblings('input[type="radio"][name="' + element.attr('name') + '":last'));
      error.insertAfter(element.parent().parent().parent());
    }
    else {
      error.insertAfter(element);
    }
	//error.insertAfter(element);
	error.addClass("ui-state-error");
    //console.log(element);
    //console.log(error);
  },
  highlight: function(element, errorClass, validClass) {
    $(element).addClass(errorClass).removeClass(validClass);
    var wrapper = $(element).closest("div.inputField");
    wrapper.find("span.requiredIcon").hide();
    $(wrapper).addClass(errorClass).removeClass(validClass);
  },
  unhighlight: function(element, errorClass, validClass) {
    $(element).removeClass(errorClass).addClass(validClass);
    var wrapper = $(element).closest("div.inputField");
    $(wrapper).removeClass(errorClass).addClass(validClass);
    wrapper.find("span.requiredIcon").show();
  }
});