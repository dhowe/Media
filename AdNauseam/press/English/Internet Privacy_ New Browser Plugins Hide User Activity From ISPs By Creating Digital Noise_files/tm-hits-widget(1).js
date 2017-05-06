(function(){
  /**
   * load external JavaScript
   * @see http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
   */
  function loadScript(url, callback){

      var script = document.createElement("script")
      script.type = "text/javascript";

      if (script.readyState){  //IE
          script.onreadystatechange = function(){
              if (script.readyState == "loaded" ||
                      script.readyState == "complete"){
                  script.onreadystatechange = null;
                  callback();
              }
          };
      } else {  //Others
          script.onload = function(){
              callback();
          };
      }

      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
  }

  var jQueryLoadCallback = function() {
    var jq191 = $.noConflict(true);
    (function($){
      $('#most_popular_widget').html(' \
<ul class="most-popular-list"> \
        <li class="item item-1 clearfix"> \
                                  <div class="item-image"> \
            <a href="http://www.ibtimes.com/national-day-prayer-live-stream-2017-when-where-watch-main-event-2534584"><img src="http://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/thumbnail/public/2017/05/04/national-day-prayer.jpg" alt="National Day Of Prayer 2017 Theme, Events" /></a>          </div> \
                <div class="item-link"> \
          <a href="http://www.ibtimes.com/national-day-prayer-live-stream-2017-when-where-watch-main-event-2534584?utm_source=internal&utm_campaign=most_read&utm_medium=most_read1">National Day Of Prayer 2017 Theme, Events</a>        </div> \
              </li> \
        <li class="item item-2 clearfix"> \
                                  <div class="item-image"> \
            <a href="http://www.ibtimes.com/tad-cummins-appear-court-after-arriving-tennessee-face-elizabeth-thomas-kidnapping-2534499"><img src="http://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/thumbnail/public/2017/04/21/tad-cummins.jpg" alt="Tad Cummins Transferred To Tennessee" /></a>          </div> \
                <div class="item-link"> \
          <a href="http://www.ibtimes.com/tad-cummins-appear-court-after-arriving-tennessee-face-elizabeth-thomas-kidnapping-2534499?utm_source=internal&utm_campaign=most_read&utm_medium=most_read2">Tad Cummins Transferred To Tennessee</a>        </div> \
              </li> \
        <li class="item item-3 clearfix"> \
                                  <div class="item-image"> \
            <a href="http://www.ibtimes.com/photo-baby-holding-iud-going-viral-2534949"><img src="http://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/thumbnail/public/2017/05/04/viral-baby-pic.jpg" alt="A Photo Of A Baby Holding An IUD Is Going Viral" /></a>          </div> \
                <div class="item-link"> \
          <a href="http://www.ibtimes.com/photo-baby-holding-iud-going-viral-2534949?utm_source=internal&utm_campaign=most_read&utm_medium=most_read3">A Photo Of A Baby Holding An IUD Is Going Viral</a>        </div> \
              </li> \
        <li class="item item-4 clearfix"> \
                                  <div class="item-image"> \
            <a href="http://www.ibtimes.com/why-do-people-celebrate-cinco-de-mayo-facts-history-about-mexican-holiday-2534858"><img src="http://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/thumbnail/public/2017/05/04/rtr3mzyc_0.jpg" alt="Why Do People Celebrate Cinco De Mayo?" /></a>          </div> \
                <div class="item-link"> \
          <a href="http://www.ibtimes.com/why-do-people-celebrate-cinco-de-mayo-facts-history-about-mexican-holiday-2534858?utm_source=internal&utm_campaign=most_read&utm_medium=most_read4">Why Do People Celebrate Cinco De Mayo?</a>        </div> \
              </li> \
        <li class="item item-5 clearfix"> \
                                  <div class="item-image"> \
            <a href="http://www.ibtimes.com/nancy-grace-speaks-out-following-casey-anthony-baby-drama-2534919"><img src="http://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/thumbnail/public/2013/07/09/casey-anthony.jpg" alt="Nancy Grace Talks Casey Anthony Baby Drama" /></a>          </div> \
                <div class="item-link"> \
          <a href="http://www.ibtimes.com/nancy-grace-speaks-out-following-casey-anthony-baby-drama-2534919?utm_source=internal&utm_campaign=most_read&utm_medium=most_read5">Nancy Grace Talks Casey Anthony Baby Drama</a>        </div> \
              </li> \
  </ul> \
 \
');
    })(jq191);
  }

  loadScript('http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', jQueryLoadCallback);
})();
