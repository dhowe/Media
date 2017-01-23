/*global jQuery*/
/*exported IAPP_ads*/

/**
 * IAPP Ads module
 */
var IAPP_ads = (function($) {

	var module = {};
	var ads = [];
	
	module.i = 0;

	module.endpoint = '/ads/';

	module.init = function() {
		
		// initially hide all adds
		$('.iapp-ad').hide();
		module.render();

	};

	module.render = function() {		

		// check if leadertiles
		var $leadertiles = $('.iapp-ad-leadertile').find('.dfad');
		var $tiles = $('.iapp-ad-tile, .iapp-ad-tile-career-central, .iapp-ad-tile-videos-page').find('.dfad');
		var n = $('#iapp-more-news-wrapper').children().size();
		if($leadertiles.size() > 0 || $tiles.size() > 0) {
			// Leadertile + Tiles			
			$leadertile = $leadertiles.eq(0).clone().show().removeClass('dfad').addClass('dfad-post');	
			if($('#job-board .article-text').find('p').size() > 2) {				
				$('#job-board .article-text').find('p').eq(3).after($leadertile);
				$('#job-board .article-text').find('p').each(function(k,v) {
					if( (k+1) % 10 == 0 && module.i < 3 ) {	// after every 5th paragraph
						var $tile = $('.iapp-ad-tile').find('.dfad').eq(module.i).clone().show().removeClass('dfad').addClass('dfad-post');
						$(this).append($tile);
						module.i++;
					}					
				});
			}					
		} 
		if( ($leadertiles.size() > 0 || $tiles.size() > 0) && n > 0) {
			// Leaderboard + Tiles
			
			if(module.i == 0) {
				// leaderboard
				var $ad = $('.iapp-ad-leaderboard').find('.dfad').eq(0).clone().show();
				if($ad.size() > 0) {
					$('#iapp-more-news-wrapper').find('article').eq(module.i).after($ad);
				}
				var $lead_ad = $('.iapp-ad-leaderboard-career-central').find('.dfad').eq(0).clone().show();
				if($lead_ad.size() > 0) {
					$('#jobs-intro').find('article').eq(module.i).after($lead_ad);
				}	
				var $vid_lead = $('.iapp-ad-leaderboard-videos-page').find('.dfad').eq(0).clone().show();
				if($vid_lead.size() > 0) {
					$('#iapp-more-news-wrapper').find('article').eq(module.i).before($vid_lead);
				}					
			}
			// insert tile ads after every 6th article
			$('.iapp-ad-tile, .iapp-ad-tile-career-central, .iapp-ad-tile-videos-page').find('.dfad').each(function(k,v) {			
				if(module.i < 3 && k == module.i && (module.i*6+5) < n) {				
					var $tile = $(this).clone().show();
					$('#iapp-more-news-wrapper').find('article').eq(module.i * 6 + 5).after($tile);
					module.i++;				
				}
			});
		}		
	}

	return module;

})(jQuery);
