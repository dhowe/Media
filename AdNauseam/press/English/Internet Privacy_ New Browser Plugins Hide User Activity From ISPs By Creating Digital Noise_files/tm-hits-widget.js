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
      $('#most_read_widget').html(' \
<ul class="most-popular-list"> \
        <li class="item item-1 clearfix"> \
                                <div class="item-link"> \
          <a href="http://www.ibtimes.com/tad-cummins-daughter-breaks-silence-alleged-elizabeth-thomas-kidnapping-2533663?utm_source=internal&utm_campaign=most_read&utm_medium=most_read1">Tad Cummins&#039; Daughter Discusses Alleged Kidnapping</a>        </div> \
              </li> \
        <li class="item item-2 clearfix"> \
                                <div class="item-link"> \
          <a href="http://www.ibtimes.com/how-did-erin-moran-die-happy-days-stars-cause-death-not-immediately-known-2529308?utm_source=internal&utm_campaign=most_read&utm_medium=most_read2">Erin Moran Dies At 56</a>        </div> \
              </li> \
        <li class="item item-3 clearfix"> \
                                <div class="item-link"> \
          <a href="http://www.ibtimes.com/facebook-responds-live-video-killing-allegedly-19-year-old-serena-mckay-murder-2531408?utm_source=internal&utm_campaign=most_read&utm_medium=most_read3">Facebook Responds To Live Video That Allegedly Shows Serena McKay Murder</a>        </div> \
              </li> \
        <li class="item item-4 clearfix"> \
                                <div class="item-link"> \
          <a href="http://www.ibtimes.com/administrative-professionals-day-2017-quotes-10-ways-say-thank-you-your-assistants-2529397?utm_source=internal&utm_campaign=most_read&utm_medium=most_read4">Top 10 Quotes On Administrative Professionals Day</a>        </div> \
              </li> \
        <li class="item item-5 clearfix"> \
                                <div class="item-link"> \
          <a href="http://www.ibtimes.com/jinger-duggars-big-announcement-followed-familys-adorable-jana-update-2534641?utm_source=internal&utm_campaign=most_read&utm_medium=most_read5">Jinger Duggar Joins Instagram, Twitter</a>        </div> \
              </li> \
  </ul> \
 \
');
    })(jq191);
  }

  loadScript('http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', jQueryLoadCallback);
})();
