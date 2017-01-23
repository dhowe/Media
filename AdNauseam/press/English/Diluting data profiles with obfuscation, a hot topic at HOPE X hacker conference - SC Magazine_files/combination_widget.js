

function dsqComboTab(tab) {
	document.getElementById('dsq-combo-people').style.display = "none";
	document.getElementById('dsq-combo-popular').style.display = "none";
	document.getElementById('dsq-combo-recent').style.display = "none";
	document.getElementById('dsq-combo-tab-people').className = "dsq-combo-tab";
	document.getElementById('dsq-combo-tab-popular').className = "dsq-combo-tab";
	document.getElementById('dsq-combo-tab-recent').className = "dsq-combo-tab";

	document.getElementById('dsq-combo-' + tab).style.display = "block";
	document.getElementById('dsq-combo-tab-' + tab).className = "dsq-combo-tab dsq-active";
}

document.write(' \
<style type="text/css" media="screen">\
	 #dsq-combo-widget ul,\
	 #dsq-combo-widget li,\
	 #dsq-combo-widget ol,\
	 #dsq-combo-widget div,\
	 #dsq-combo-widget p,\
	 #dsq-combo-widget a,\
	 #dsq-combo-widget cite,\
	 #dsq-combo-widget img {\
	 border: 0;\
	 padding: 0;\
	 margin: 0;\
	 float: none;\
	 text-indent: 0;\
	 background: none;\
	 }\
	 #dsq-combo-widget ul,\
	 #dsq-combo-widget li,\
	 #dsq-combo-widget ol {\
	 list-style-type: none;\
	 list-style-image: none;\
	 background: none;\
	 display: block;\
	 }\
	 #dsq-combo-widget #dsq-combo-content ul,\
	 #dsq-combo-widget #dsq-combo-content li,\
	 #dsq-combo-widget #dsq-combo-content ol,\
	 #dsq-combo-widget #dsq-combo-content div,\
	 #dsq-combo-widget #dsq-combo-content p,\
	 #dsq-combo-widget #dsq-combo-content a,\
	 #dsq-combo-widget #dsq-combo-content cite,\
	 #dsq-combo-widget #dsq-combo-content img {\
	 border: 0;\
	 padding: 0;\
	 margin: 0;\
	 float: none;\
	 text-indent: 0;\
	 background: none;\
	 }\
	 #dsq-combo-widget #dsq-combo-content ul,\
	 #dsq-combo-widget #dsq-combo-content li,\
	 #dsq-combo-widget #dsq-combo-content ol {\
	 list-style-type: none;\
	 list-style-image: none;\
	 background: none;\
	 display: block;\
	 }\
	 .dsq-clearfix:after {\
	 content:".";\
	 display: block;\
	 height: 0;\
	 clear: both;\
	 visibility: hidden;\
	 }\
	 /* end reset */\
	 #dsq-combo-widget { ;\
	 text-align: left;\
	 }\
	 #dsq-combo-widget #dsq-combo-tabs {\
	 float: left;\
	 }\
	 #dsq-combo-widget #dsq-combo-content {\
	 position: static;\
	 }\
	 #dsq-combo-widget #dsq-combo-content h3 {\
	 float: none;\
	 text-indent: 0;\
	 background: none;\
	 padding: 0;\
	 border: 0;\
	 margin: 0 0 10px 0;\
	 font-size: 16px;\
	 }\
	 #dsq-combo-widget #dsq-combo-tabs li {\
	 display: inline;\
	 float: left;\
	 margin-right: 2px;\
	 padding: 0px 5px;\
	 text-transform: uppercase;\
	 }\
	 #dsq-combo-widget #dsq-combo-tabs li a {\
	 text-decoration: none;\
	 font-weight: bold;\
	 font-size: 10px;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-box {\
	 margin: 0 0 20px;\
	 padding: 12px;\
	 clear: both;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-box li {\
	 padding-bottom: 10px;\
	 margin-bottom: 10px;\
	 overflow: hidden;\
	 word-wrap: break-word;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-avatar {\
	 float: left;\
	 height: 48px;\
	 width: 48px;\
	 margin-right: 15px;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-box cite {\
	 font-weight: bold;\
	 font-size: 14px;\
	 }\
	 span.dsq-widget-clout {\
	 background-color:#FF7300;\
	 color:#FFFFFF;\
	 padding:0pt 2px;\
	 }\
	 #dsq-combo-logo { text-align: right; }\
	 /* Blue */\
	 #dsq-combo-widget.blue #dsq-combo-tabs li.dsq-active { background: #E1F3FC; }\
	 #dsq-combo-widget.blue #dsq-combo-content .dsq-combo-box { background: #E1F3FC; }\
	 #dsq-combo-widget.blue #dsq-combo-tabs li { background: #B5E2FD; }\
	 #dsq-combo-widget.blue #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #B5E2FD; }\
	 /* Grey */\
	 #dsq-combo-widget.grey #dsq-combo-tabs li.dsq-active { background: #f0f0f0; }\
	 #dsq-combo-widget.grey #dsq-combo-content .dsq-combo-box { background: #f0f0f0; }\
	 #dsq-combo-widget.grey #dsq-combo-tabs li { background: #ccc; }\
	 #dsq-combo-widget.grey #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #ccc; }\
	 /* Green */\
	 #dsq-combo-widget.green #dsq-combo-tabs li.dsq-active { background: #f4ffea; }\
	 #dsq-combo-widget.green #dsq-combo-content .dsq-combo-box { background: #f4ffea; }\
	 #dsq-combo-widget.green #dsq-combo-tabs li { background: #d7edce; }\
	 #dsq-combo-widget.green #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #d7edce; }\
	 /* Red */\
	 #dsq-combo-widget.red #dsq-combo-tabs li.dsq-active { background: #fad8d8; }\
	 #dsq-combo-widget.red #dsq-combo-content .dsq-combo-box { background: #fad8d8; }\
	 #dsq-combo-widget.red #dsq-combo-tabs li { background: #fdb5b5; }\
	 #dsq-combo-widget.red #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #fdb5b5; }\
	 /* Orange */\
	 #dsq-combo-widget.orange #dsq-combo-tabs li.dsq-active { background: #fae6d8; }\
	 #dsq-combo-widget.orange #dsq-combo-content .dsq-combo-box { background: #fae6d8; }\
	 #dsq-combo-widget.orange #dsq-combo-tabs li { background: #fddfb5; }\
	 #dsq-combo-widget.orange #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #fddfb5; }\
	 </style>\
	 <div id="dsq-combo-widget" class="blue">\
	 <ul id="dsq-combo-tabs">\
	 <li id="dsq-combo-tab-people" ><a href="#" onclick="dsqComboTab(\'people\'); return false">People</a></li>\
	 <li id="dsq-combo-tab-recent" class="dsq-active"><a href="#" onclick="dsqComboTab(\'recent\'); return false">Recent</a></li>\
	 <li id="dsq-combo-tab-popular" ><a href="#" onclick="dsqComboTab(\'popular\'); return false">Popular</a></li>\
	 </ul>\
	 <div id="dsq-combo-content">\
	 <div id="dsq-combo-people" class="dsq-combo-box" style="display:none">\
	 <h3>Top Commenters</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/pfretty/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/2300/5582/avatar92.jpg?1422480859">\
	 </a>\
	 <cite><a href="https://disqus.com/by/pfretty/">Peter Fretty</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;158 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/Kent_Dorfman/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/860/7794/avatar92.jpg?1339512639">\
	 </a>\
	 <cite><a href="https://disqus.com/by/Kent_Dorfman/">Kent_Dorfman</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;39 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_9J3050PvQt/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/7249/4137/avatar92.jpg?1435896138">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_9J3050PvQt/">Boot</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;27 posts</div>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="http://disqus.com"><img src="//a.disquscdn.com/1445639464/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 <div id="dsq-combo-recent" class="dsq-combo-box" >\
	 <h3>Recent Comments</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/haymarket-cdcb8b76160c4436e988bfbab44767d1/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/1445639464/images/noavatar92.png"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/haymarket-cdcb8b76160c4436e988bfbab44767d1/">Don Turnblade</a>\
	 <span class="dsq-widget-comment"><p>The Comodo CA is really weak. I was able to make one in less than 5 minutes after installing a trial version of Comodo Dragon. The Email accounts I created for validation of my identity accept...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.scmagazine.com/fraudsters-exploit-weak-ssl-certificate-security-to-set-up-hundreds-of-phishing-sites/article/444711/">Fraudsters exploit weak SSL certificate security to set up hundreds of phishing sites</a>&nbsp;&middot;&nbsp;<a href="http://www.scmagazine.com/fraudsters-exploit-weak-ssl-certificate-security-to-set-up-hundreds-of-phishing-sites/article/444711/#comment-2306941022">1 week ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/haymarket-2fedd4a742dcc7d67392602e33390770/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/1445639464/images/noavatar92.png"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/haymarket-2fedd4a742dcc7d67392602e33390770/">Scott Plante</a>\
	 <span class="dsq-widget-comment"><p>The references in the article to SHA-2 should be SHA-256.</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.scmagazine.com/breaking-sha-1-cheaper-closer-than-imagined-researchers-say/article/444418/">Researchers say SHA-1 will soon be broken, urge migration to SHA-2</a>&nbsp;&middot;&nbsp;<a href="http://www.scmagazine.com/breaking-sha-1-cheaper-closer-than-imagined-researchers-say/article/444418/#comment-2305709613">2 weeks ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/haymarket-54094b085a504bdf5335165dcbcf2554/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/1445639464/images/noavatar92.png"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/haymarket-54094b085a504bdf5335165dcbcf2554/">mark osborn</a>\
	 <span class="dsq-widget-comment"><p>the worst thing is that they pay to have their system tested then when vulnerabilitys are found nothing is done about it for ages or they loose something important to them.</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.scmagazine.com/dhs-ciso-wants-repercussions-for-workers-who-fall-for-security-scams/article/439962/">DHS CISO wants repercussions for workers who fall for security scams</a>&nbsp;&middot;&nbsp;<a href="http://www.scmagazine.com/dhs-ciso-wants-repercussions-for-workers-who-fall-for-security-scams/article/439962/#comment-2305462180">2 weeks ago</a></p>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="http://disqus.com"><img src="//a.disquscdn.com/1445639464/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 <div id="dsq-combo-popular" class="dsq-combo-box" style="display:none">\
	 <h3>Most Discussed</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.scmagazine.com/campaign-injecting-spyware-and-unwanted-apps-into-wordpress-sites/article/441299/">Campaign injecting spyware and unwanted apps into WordPress sites</a>\
	 <p class="dsq-widget-meta">1 comment &middot; 4 weeks ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.scmagazine.com/google-looks-to-raise-the-cost-of-being-a-cybercrimal/article/441147/">Google looks to raise the cost of being a cybercrimal</a>\
	 <p class="dsq-widget-meta">1 comment &middot; 4 weeks ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.scmagazine.com/xhamster-targeted-by-same-group-that-launched-malvertising-campaign-against-yahoo-and-other-major-sites/article/441154/">xHamster targeted in another malvertising campaign </a>\
	 <p class="dsq-widget-meta">1 comment &middot; 1 month ago</p>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="http://disqus.com"><img src="//a.disquscdn.com/1445639464/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 </div>\
	 </div>\
');
