
/**
 This file is part of aprixo-CMS(R) by osite network GmbH
 Description:
 first function looks if regular expressions are supported
 if not you need the specific value "email" for the email-function chkemail !!!
 call function inside the form-tag like: onSubmit='return chkform("value1,value2,valueN")'
 if value contains regular expression "mail" the Email-function advchkemail is called
 define a standard error-message inside an hidden field like:
 	<input type="hidden" id="stdmsg" value="Your Message" />
 and an e-mail error-message like:
 	<input type="hidden" id="mailmsg" value="No valid Email!" />
**/

function regExTest(){
	var a = false;
	if (typeof(RegExp) == 'function'){
		var b = new RegExp('abc');
		if (b.test('abc') == true){
			a = true;
		}
	}
	return a;
}

function chkform(namestring){
	var reg = regExTest();
	var msg = document.getElementById("stdmsg").value;
	var values = namestring.split(",");
	var returnval=false;
	
	for (var i = 0; i < values.length; i++){
		if (document.getElementById(values[i]).value == "") {
			alert(msg);
			document.getElementById(values[i]).focus();
			return false;
		}
		if (reg == true){
			var isMail = values[i].search(/mail/);
			if (isMail != -1){
				returnval=advchkemail(values[i]);
				if (returnval==false) return false;
			}
		}
		if (reg == false){
			if (values[i] == "email") returnval=chkemail(values[i]);
			if (returnval==false) return false;
		}
	}
	return true;
}

function chkformByName(namestring){
	var reg = true;
	//var msg = 'Bitte fuelllen Sie das gekennzeichnete Feld aus!';
	if (typeof(document.getElementsByName('gui_ctr_jsmsg')[0]) != 'undefined'){
		var msg = document.getElementsByName('gui_ctr_jsmsg')[0].value;
	} else var msg = 'Please fill in marked fields!';
	var values = namestring.split(",");
	for (var i = 0; i < values.length; i++){
		var element = document.getElementsByName(values[i])[0];
		if (element.value == "") {
			alert(msg);
			element.focus();
			element.style.border = "solid red 1px";
			return false;
		}
		if (reg == true){
			var isMail = values[i].search(/mail/);
			if (isMail != -1){
				return advchkemail (values[i]);
			}
		}
		if (reg == false){
			if (values[i] == "email") return chkemail(values[i]);
		}
	}
	return true;
}

// not relevant for mi24 recommend popup
function chkemail(formvalue){
	var res = false;
	var msg = document.getElementById("mailmsg").value;
	var adress = document.getElementById(formvalue).value;

	var values = adress.split(",");
	for (var i = 0; i < values.length; i++){

		res = (values[i].search('@') >= 1 && values[i].lastIndexOf('.') > values[i].search('@') && values[i].lastIndexOf('.') >= values[i].length-5)
		
		if (res == false){
			alert(msg+' MW');
			document.getElementById(formvalue).focus();
		}
	}
	return res;
}

// relevant for mi24 recommend popup
function advchkemail(formvalue){
	var res = false;
	var msg = document.getElementById("mailmsg").value;
	var adress = document.getElementById(formvalue).value;
	
	var values = adress.split(/\s*,\s*/);
	
	for (var i = 0; i < values.length; i++){

		reg = new RegExp('^([a-zA-Z0-9\\-\\.\\_]+)' + '(\\@)([a-zA-Z0-9\\-\\.]+)' + '(\\.)([a-zA-Z]{2,4})$');
		res = (reg.test(values[i]));
	
		if (res == false){
			alert(msg+' - '+ values);
			document.getElementById(formvalue).focus();
		}
	}
	return res;
}
