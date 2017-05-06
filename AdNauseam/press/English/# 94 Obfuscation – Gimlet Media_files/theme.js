/* gimlet js */



/* inside here is safe for jquery */
jQuery(document).ready(function( $ ) {


  // toggle transcript on show + show--all
  $(".ep__toggle").toggle(function() { 
      $(this).siblings('div.ep__trans').show();
    }, function() { 
      $(this).siblings('div.ep__trans').hide();
    }
  );


  
	// toggle transcript on ep pg
	var $transcript = jQuery('.episode__transcript');
	var $transcriptToggle = jQuery('.episode__transcriptToggle');

	function toggleTranscript() { 
		$transcript
			.toggleClass('show')
			.children()
			.toggle()
			.first()
			.show();

		if (!$transcript.hasClass('show')) {
			$transcriptToggle.text('Hide full transcript');
		} else {
			$transcriptToggle.text('View full transcript');
		}
	}

	toggleTranscript();

	$transcriptToggle.click(function() {
		toggleTranscript();
	});


	$(".home_info").toggle(function() { 
			$(this).parent().parent().find('div.show_desc').show();
		}, function() { 
			$(this).parent().parent().find('div.show_desc').hide();
		}
	);


	// members page
	$(".popup").hide();

  $("#choice_3_4_0").click(function() {
    $(".popup").show();
  })

    $("#choice_3_4_6").click(function() {
    $(".popup").show();
  })

  $(".shirt_pop").fancybox({
    wrapCSS: 'shirt_pop',
    openEffect  : 'none',
    closeEffect : 'none',
    helpers:  {
        overlay : {
            css : {
                'background-color' : 'none'
            }
        }
    }
  });

	$(".size-guide-link").fancybox({ 
		maxWidth  : 600,
		maxHeight : 400,
		fitToView : true,
		width   : '80%',
		height    : '50%',
		autoSize  : true,
		closeClick  : true,
		openEffect  : 'none',
		closeEffect : 'none',
    padding : 0
	});


	$(".close-me").click(function() {
		$(this).parent().hide();
	});

	$(".single-show .list__item").first().addClass("first");

	$(".single-show .list__item:eq(1)").before("<h2>Other episodes</h2>");

  // reco dropdown
  $.fn.ulSelect = function(){ 

    var ul = $(this);

    if (!ul.hasClass('zg-ul-select')) {
      ul.addClass('zg-ul-select');
    }
    // SVG arrow
    var arrow = '<svg id="ul-arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32"><line stroke-width="1" x1="" y1="" x2="" y2="" stroke="#888c97" opacity=""/><path d="M4.131 8.962c-0.434-0.429-1.134-0.429-1.566 0-0.432 0.427-0.432 1.122 0 1.55l12.653 12.528c0.434 0.429 1.133 0.429 1.566 0l12.653-12.528c0.432-0.429 0.434-1.122 0-1.55s-1.136-0.429-1.566-0.002l-11.87 11.426-11.869-11.424z" fill="#888c97"/></svg>';
    $('li:first-of-type', this).addClass('active') //.append(arrow);
    $(this).on('click', 'li', function(event){
      
      // Remove div#selected if it exists
      if ($('#selected--zg-ul-select').length) {
        $('#selected--zg-ul-select').remove();
      }
      ul.before('<div id="selected--zg-ul-select">');
      var selected = $('#selected--zg-ul-select');
      $('li #ul-arrow', ul).remove();
      ul.toggleClass('active');
      ul.children().removeClass('active');
      $(this).toggleClass('active');

      // recos 
      var dataid = $(this).attr('data-id');
      $('.reco__a div').removeClass("active");
      $('.reco__a div').hide();
      $('#answer-' + dataid).css('display','inline-block');
      $('#answer-' + dataid).addClass("active");       

      var selectedText = $(this).text();
      if (ul.hasClass('active')) {
        selected.text(selectedText).addClass('active')//.append(arrow);
      }
      else {
        selected.text('').removeClass('active'); 
       // $('li.active', ul).append(arrow);      
      }
      });

      // Close the faux select menu when clicking outside it 
      $(document).on('click', function(event){
        if($('ul.zg-ul-select').length) {
         if(!$('ul.zg-ul-select').has(event.target).length == 0) {
          return;
        }
        else {
          $('ul.zg-ul-select').removeClass('active');
          $('#selected--zg-ul-select').removeClass('active').text('');
          $('#ul-arrow').remove();
        } 
      }
      });
  }

    // Run
    $('#be-select').ulSelect(); 



});