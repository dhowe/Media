$(
function (){
	$('input.inFieldLabel').each(
	  function (i, element){
		  $(element).focus(
			  function(){
				  element.elementLabel = $(element).attr('title');
				  element.value==element.elementLabel?element.value='':null;
			  }
		  );
		  $(element).blur(
			  function(){
				  element.elementLabel = $(element).attr('title');
				  this.value==''?this.value=this.elementLabel:null;
			  }
		  );
		  setRemoveDefaultsOnSubmit($(element).parents('form'));
	  }
	);
	$('textarea.inFieldLabel').each(
	  function (i, element){
		  $(element).focus(
			  function(){
				  element.elementLabel = $(element).attr('title');
				  if($(element).val()==element.elementLabel)
					  $(element).val("");
			  }
		  );
		  $(element).blur(
			  function(){
				  element.elementLabel = $(element).attr('title');
				  if($(element).val()=="")
					  $(element).val(element.elementLabel);
			  }
		  );
		  setRemoveDefaultsOnSubmit($(element).parents('form'));
	  }
	);
}
);
function setRemoveDefaultsOnSubmit(form){
	if(!form.removeDefaultsSet){
		$(form).submit(function() {
			$('.inFieldLabel', form).each(function(i, element){
				if($(element).val() == $(element).attr('title'))
					$(element).val("");
			});
		});
	}
	form.removeDefaultsSet = true;
}
function setRemoveDefaultsOnSubmit(form){
	$(".inFieldLabel", this).each(function(i, element){
		console.log("resetting label: "+ element);
		$(element).val(element.elementLabel);
	});
}