jQuery(document).ready(function() {

	 $('#spendenX').click(function(){
      $('#spendenBanner').fadeOut();
      $.cookie('noSpende', '1', { expires: 1, path: '/' });
    });

  if($.cookie('noSpende') > null) { 
    $('#spendenBanner').hide(); 
  }
	
	//Meist gelesen append to #tabs-1
	$("li#wpp-2").appendTo("#tabs-1"); 
	   	$("li#recent-comments-4").appendTo("#tabs-2"); 
   	$("li#recent-posts-2").appendTo("#tabs-3"); 

  $(function() {
    $( "#tabs" ).tabs();
    $( "#accordion" ).accordion({ heightStyle: "content" });

  });

	  
});
