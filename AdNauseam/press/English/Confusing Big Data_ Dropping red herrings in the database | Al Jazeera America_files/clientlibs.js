var ads=[];
var googletag=googletag||{};
googletag.cmd=googletag.cmd||[];
(function(){var a=document.createElement("script");
a.async=true;
a.type="text/javascript";
var c="https:"==document.location.protocol;
a.src=(c?"https:":"http:")+"//www.googletagservices.com/tag/js/gpt.js";
var b=document.getElementsByTagName("script")[0];
b.parentNode.insertBefore(a,b)
})();
googletag.cmd.push(function(){googletag.pubads().enableSingleRequest();
googletag.enableServices()
});
$(function(){setInterval(function(){if(googletag.pubads){googletag.pubads().refresh(ads)
}},doubleClickAdUnitRefresh)
});