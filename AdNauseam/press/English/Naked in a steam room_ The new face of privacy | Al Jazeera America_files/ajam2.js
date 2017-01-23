AJAM.Views.VideoLibrarySearchView=Backbone.View.extend({initialize:function(){var d=this.$el.data("search");
var c=this.$el.data("placeholder");
var b=[];
for(var a in d){b.push({id:d[a],text:a})
}this.select2=this.$el.select2({minimumInputLength:2,placeholder:c,query:function(f){var e={results:[]};
$.each(b,function(){if(f.term.length==0||this.text.toUpperCase().indexOf(f.term.toUpperCase())>=0){e.results.push({id:this.id,text:this.text})
}});
f.callback(e)
},initSelection:function(e,f){f([])
}})
},events:{change:"triggerUpdate"},triggerUpdate:function(){this.trigger("update",this.select2.select2("val"))
},clear:function(){this.select2.select2("val","")
}});
AJAM.Views.VideoLibraryVideoView=Backbone.View.extend({tagName:"article",className:"videoLibrary-item",initialize:function(a){this.render=_.bind(this.render,this);
this.model.bind("change",this.render)
},render:function(){this.el.innerHTML=AJAM.Templates.VideoLibraryVideoTemplate(this.model.attributes);
return this
}});
AJAM.Views.VideoLibrarySelectorView=Backbone.View.extend({events:{change:"triggerUpdate"},triggerUpdate:function(){this.trigger("update",this.$el.val())
},clear:function(){this.$el.val("")
}});
AJAM.Views.VideoLibrary=Backbone.View.extend({initialize:function(){$this=this;
this.$results=this.$el.find(".videoLibrary-box");
this.$noResults=this.$el.find(".videoLibraryNoResults");
this.loadMoreWrapper=this.$el.find(".wrapper-loadMore a");
this.$loaderImg=this.$el.find(".ajax-loader");
var a=$(this.el).data("url");
this.collection=new AJAM.Collections.Videos([],{url:a});
this.collection.bind("add",this.renderAdd,this);
$this.topic="featured";
var b=this.$el.find(".topic-search")[0];
this.search=new AJAM.Views.VideoLibrarySearchView({el:b});
var c=this.$el.find(".topic-select")[0];
this.selector=new AJAM.Views.VideoLibrarySelectorView({el:c});
this.selector.on("update",function(d){$this.search.clear();
$this.changeTopic(d)
});
this.search.on("update",function(d){$this.selector.clear();
$this.changeTopic(d)
});
this.loadMore()
},events:{"click .wrapper-loadMore a":"loadMore"},changeTopic:function(a){this.collection.reset();
this.$results.empty();
this.topic=a;
this.loadMore()
},renderAdd:function(c,d){var a=new AJAM.Views.VideoLibraryVideoView({model:c});
var b=$(a.render().el);
this.$results.append(b);
picturefill()
},loadMore:function(a){_this=this;
hideElement(_this.loadMoreWrapper);
if(_this.$noResults.length){hideElement(_this.$noResults)
}showElement(_this.$loaderImg,"inline-block");
this.collection.fetch({update:true,remove:false,data:{start:this.collection.length,val:_this.topic},success:function(c,b){if(c.length<c.serverCount){showElement(_this.loadMoreWrapper,"inline-block")
}hideElement(_this.$loaderImg);
if(_this.$noResults.length&&c.serverCount==0){showElement(_this.$noResults,"inline-block")
}}})
}});
$(function(){$(".watchByTopic-box").each(function(){new AJAM.Views.VideoLibrary({el:this})
})
});
$(function(){$(".topicList .topic-search").each(function(){var b=$(this).data("placeholder");
var a=$(this).select2({placeholder:"Search for a topic",minimumInputLength:3,placeholder:b,ajax:{url:"/bin/ajam/topics.json",width:"off",dataType:"json",data:function(c,d){return{q:c,page_limit:10}
},results:function(c,e){var d={results:[]};
$.each(c,function(){d.results.push({id:this.href,text:this.title})
});
return d
}}});
$(this).change(function(){window.location=a.val()
})
})
});
(function(a){a(document).on("ajam.shorturl.loaded",function(d,c,b){a(".shareThis-container").each(function(){if(c===a(this).find(".shareThis").first().data("url")){a(this).find("input").val(b);
a(this).show()
}})
})
})(jQuery);
(function(a){a(document).on("ajam.shorturl.loaded",function(d,c,b){a(".shareDiv").each(function(){if(c===a(this).data("url")){ajam.Share.prepareShare(a(this),b)
}})
});
a(document).ready(function(){ajam.Share.loadShortUrls()
})
})(jQuery);
var ajam=window.ajam||{};
ajam.Share={shortenedUrls:{},loadShortUrls:function(){var a=this;
$(".shareDiv").each(function(){var c=$(this).data("url");
if(!(c in a.shortenedUrls)){a.shortenedUrls[c]="";
var b=$(this).data("short-url");
if(b){a.shortenedUrls[c]=b;
$(document).trigger("ajam.shorturl.loaded",[c,a.shortenedUrls[c]])
}else{window.console&&console.error("No shortened URL set for this page.")
}}})
},prepareShare:function(m,d){var i=m.attr("id");
var s=m.data("layout");
var p=m.data("description");
var r=m.data("fb-description");
var h=m.data("twitter-description");
var g=m.data("is-opinion");
var o=m.data("googlep-description");
var k=m.data("device-type");
var l=m.data("media-src");
var b=m.data("media-type");
var e=m.data("show-counts-position");
var j=m.data("subtitle");
var v=m.data("title");
var f=m.data("url");
var c=m.data("providers");
var q=m.data("button-template");
var u=m.data("button-with-count-template");
var n=g?"OPINION: ":"";
var t=new gigya.socialize.UserAction();
t.addActionLink(v,d);
t.addMediaItem({type:b,src:l,href:d});
t.setUserMessage(p);
t.setDescription(p);
t.setLinkBack(d);
t.setSubtitle(j);
t.setTitle(n+v);
if(c){var a=$.map(c.split(","),function(x){var w={provider:x};
w.userAction=t.clone();
if(x==="facebook"){w.userAction.setDescription(r?r:p)
}else{if(x==="twitter"||x==="twitter-tweet"){w.userAction.setTitle(n+(h?h:v+" via @AJAM "));
w.countURL=f
}else{if(x==="googleplus"||x==="google-plusone"){w.userAction.setDescription(o?o:p)
}}}return w
});
gigya.socialize.showShareBarUI({buttonTemplate:q,buttonWithCountTemplate:u,containerID:i,layout:s,deviceType:k,shareButtons:a,shortURLs:"never",showCounts:e,userAction:t})
}}};
(function(a){a(document).ready(function(){a(".js-shareBar--link__comments").on("click",function(d){d.preventDefault();
var c=this.hash;
var b=a(c);
a("html, body").stop().animate({scrollTop:b.offset().top},1000,"swing",function(){window.location.hash=c
})
});
FixedSticky.tests.sticky=false;
a(".js-gigya--stickyShareBarTop").fixedsticky()
})
})(jQuery);
(function(b,a,c){c(a).ready(function(){c("#submit").click(function(){var e=/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var d=c("#email").val();
if(!e.test(d)||d==""){c(".js-newsletter--error").show();
return false
}})
})
})(window,document,window.jQuery);
function loadMostShared(a){if(a.errorCode==0){if(null!=a.streams&&a.streams.length>0){$(".mostSharedList-box").each(function(){var c=$(this).data("count");
var d=$(this).find(".bullets");
for(var b=0;
b<a.streams.length&&b<c;
b++){var e=a.streams[b];
if(e.streamTitle.indexOf(" | Al Jazeera America")>-1){e.streamTitle=e.streamTitle.substring(0,e.streamTitle.length-21)
}if(e.streamURL.indexOf(window.location.host)>-1){e.streamURL="/"+e.streamURL.split("/").splice(3).join("/")
}d.append(AJAM.Templates.MostSharedListLinkTemplate(a.streams[b]))
}})
}}}$(function(){if($(".mostSharedList-box").length>0){var a={callback:loadMostShared,maxStreamAge:7};
gigya.comments.getTopStreams(a)
}});
$(function(){$("#mostActive-discussed").each(function(){new AJAM.Views.MostActiveStoriesView({el:this})
});
$("#mostActive-shared").each(function(){new AJAM.Views.MostActiveStoriesView({el:this})
});
$("#mostActive-viewed").each(function(){new AJAM.Views.MostActiveStoriesView({el:this})
})
});
AJAM.Views.MostActiveStoryView=Backbone.View.extend({initialize:function(a){this.render=_.bind(this.render,this);
this.model.bind("change",this.render)
},render:function(){this.el.innerHTML=AJAM.Templates.MostActiveStoryTemplate(this.model.attributes);
return this.el.firstElementChild
}});
AJAM.Views.MostActiveStoriesView=Backbone.View.extend({hue:0,colorMap:{},initialize:function(){var c=this.$el.data("count");
var b=this.$el.data("excluded");
var a=this.$el.data("url")+"?count="+c+"&excluded="+b.join();
this.collection=new AJAM.Collections.Articles([],{url:a});
this.$loaderImg=this.$el.find(".ajax-loader");
this.load()
},render:function(){var a=this;
a.collection.each(function(c){var b=new AJAM.Views.MostActiveStoryView({model:c});
a.$el.append(b.render())
});
picturefill();
$(".ellipsis").ellipsisAJAM()
},load:function(){var a=this;
a.collection.fetch({success:function(){a.render()
},error:function(){a.$el.html('<span class="text-error">Unable to retrieve data.</span>')
},complete:function(){hideElement(a.$loaderImg)
}})
}});
(function(a){a(document).ready(function(){a(".k2SearchInput").keydown(function(b){if(a.inArray(b.keyCode,[46,8,9,27,13,110,190])!==-1||(b.keyCode==65&&b.ctrlKey===true)||(b.keyCode>=35&&b.keyCode<=39)){return
}if((b.shiftKey||(b.keyCode<48||b.keyCode>57))&&(b.keyCode<96||b.keyCode>105)){b.preventDefault()
}});
a(".k2Search-box :button").click(function(){var d=a(this).parent().parent();
var c=d.attr("action");
var b=d.find('input[name="zip"]').val();
if(c){c+="."+b+".html";
window.top.location.href=c
}return false
})
})
})(jQuery);
$(function(){Galleria.ready(function(){resizeGalleryDescription(this);
this.bind("rescale",function(){if(!this._fullscreen.active){resizeGalleryDescription(this)
}});
this.bind("fullscreen_enter",function(){this.descriptionSizeOld=this.$("info-description").height();
this.$("info-description")[0].removeAttribute("style")
});
this.bind("fullscreen_exit",function(){this.$("info-description").height(this.descriptionSizeOld)
});
$.each($(this),function(){if(this.$("container").parent().hasClass("js-has--galleryPromotional")){this.bind(Galleria.IMAGE,function(a){if(a.index===this.getDataLength()-1){this.$("container").addClass("is-galleryPromotional--slide")
}else{this.$("container").removeClass("is-galleryPromotional--slide")
}})
}})
});
$(".galleria").each(function(){var a=$(this).data("autoplay");
if(a){a=4000
}$(this).galleria({dataConfig:function(b){return{description:$(b).next(".desc").html()}
},autoplay:a})
})
});
function resizeGalleryDescription(a){var f=a.$("info-description");
f.css("height","");
var c=f.html();
var e=0;
for(var d=0;
d<a._data.length;
d++){var b=a._data[d];
var g=b.description;
f.html(g);
if(f.height()>e){e=f.height()
}}f.html(c);
f.height(e+2)
}AJAM.Views.FeaturedVideosPlayerPlayerView=AJAM.Views.AbstractFeaturedVideoPlayerView.extend({parentEl:".featuredVideosPlayer-player",sidebarEl:".featuredVideosPlayer-secondaryShows--inner",captionEl:".featuredVideosPlayer-caption--container",hasCaption:true,initialize:function(){_.bindAll(this);
this.videoTemplate=AJAM.Views.FeaturedVideosPlayerVideoView;
this.captionTemplate=AJAM.Views.FeaturedVideosPlayerCaptionView;
this._initialize()
}});
AJAM.Views.FeaturedVideosPlayerCaptionView=Backbone.View.extend({tagName:"div",className:"featuredVideosPlayer-caption clearfix",initialize:function(a){_.bindAll(this);
this.model.bind("change",this.render)
},render:function(){this.$el.html(AJAM.Templates.FeaturedVideosPlayerCaptionTemplate(this.model.attributes));
return this
},changeModel:function(a){this.model=a;
this.render()
}});
AJAM.Views.FeaturedVideosPlayerVideoView=Backbone.View.extend({tagName:"div",className:"secondaryShows-tableRow",initialize:function(a){_.bindAll(this);
this.model.bind("change",this.render);
this.model.bind("change:playing",this.changePlaying)
},render:function(){this.$el.html(AJAM.Templates.FeaturedVideosPlayerVideoTemplate(this.model.attributes));
return this
},changePlaying:function(){if(this.model.attributes.playing){this.$el.addClass("now-playing")
}else{this.$el.removeClass("now-playing")
}return this
}});
AJAM.Views.FeaturedShowPlayerPlayerView=AJAM.Views.AbstractFeaturedVideoPlayerView.extend({parentEl:".featuredShowVideoPlayer-container",sidebarEl:".featuredShowVideoPlayer-secondaryClips",hasCaption:false,initialize:function(){_.bindAll(this);
this.videoTemplate=AJAM.Views.FeaturedShowPlayerVideoView;
this._initialize()
}});
AJAM.Views.FeaturedShowPlayerVideoView=Backbone.View.extend({tagName:"div",className:"secondaryClips-tableRow",initialize:function(a){_.bindAll(this);
this.model.bind("change",this.render);
this.model.bind("change:playing",this.changePlaying)
},render:function(){this.$el.html(AJAM.Templates.FeaturedShowPlayerVideoTemplate(this.model.attributes));
return this
},changePlaying:function(){if(this.model.attributes.playing){this.$el.addClass("now-playing")
}else{this.$el.removeClass("now-playing")
}return this
}});
AJAM.Views.DynamicStoryHighlightListStoryView=Backbone.View.extend({tagName:"article",className:"news-item media",initialize:function(a){this.render=_.bind(this.render,this);
this.model.bind("change",this.render)
},render:function(){this.el.innerHTML=AJAM.Templates.DynamicStoryHighlightListStoryTemplate(this.model.attributes);
return this
}});
AJAM.Views.DynamicStoryHighlightListStoriesView=Backbone.View.extend({hue:0,colorMap:{},initialize:function(){var a=this.$el.data("url");
this.displayByline=this.$el.data("displaybyline");
this.collection=new AJAM.Collections.Articles([],{url:a});
this.collection.bind("add",this.renderAdd,this);
this.loadMoreWrapper=this.$el.find(".wrapper-loadMore");
this.storyHolder=this.$el.find(".story-holder")[0];
this.$loaderImg=this.loadMoreWrapper.find(".ajax-loader");
this.$loadMore=this.loadMoreWrapper.find("a.sq.B");
this.loadMore()
},events:{"click .wrapper-loadMore a":"loadMore"},render:function(){var a=this;
a.collection.each(function(c){var b=new AJAM.Views.DynamicStoryHighlightListStoryView({model:c});
$(a.storyHolder).append(b.render().el)
});
picturefill()
},renderAdd:function(b,d){b.attributes.displayByline=this.displayByline;
AJAM.Utils.Story.addType(b.attributes);
var a=new AJAM.Views.DynamicStoryHighlightListStoryView({model:b});
var c=$(a.render().el);
$(this.storyHolder).append(c);
picturefill()
},loadMore:function(a){var b=this;
hideElement(b.$loadMore);
showElement(b.$loaderImg,"inline-block");
b.collection.fetch({update:true,remove:false,data:{start:this.collection.length},success:function(d,c){if(d.length<d.serverCount){showElement(b.$loadMore,"inline-block")
}},complete:function(){hideElement(b.$loaderImg)
}})
}});
$(function(){$(".dynamic.articleHighlightList-box").each(function(){var a=new AJAM.Views.DynamicStoryHighlightListStoriesView({el:this})
})
});
(function(a){a(document).ready(function(){var g="commentsDiv";
var l=a("#"+g);
if(l.length>0){var e=l.data("category-id");
var d=l.data("device-type");
var f=l.data("providers");
var b=l.data("stream-id");
var m=l.data("comments-title");
function i(){a("#commentingErrorModal").modal("show")
}var c=function(){j();
h()
};
var k=function(){j()
};
var j=function(){var p=l.find("#commentsDiv-comments");
var o=l.siblings(".gig-comments--header");
var n=o.find(".gig-comments--title");
if(p.children().length>0){n.text(m)
}else{n.text("Start the Conversation")
}};
function h(){var n=a(".gig-comments-headerLinks");
if(a(".gig-comments-headerLinks-communityGuidelines").length<=0){n.append('<span class="gig-comments-vertical-seperator">|</span><a class="gig-comments-headerLinks-communityGuidelines" href="http://america.aljazeera.com/tools/community-guidelines.html">Community Guidelines</a>')
}n.insertBefore(a(".gig-comments-commentList-header-commentsCount"))
}gigya.comments.showCommentsUI({categoryID:e,containerID:g,deviceType:d,enabledProviders:f,streamID:b,onError:i,onLoad:c,onCommentSubmitted:k,version:2})
}})
})(jQuery);
(function(a){a(document).ready(function(){a(".broadcastSchedule .local-message span").text("("+AJAM.getTimeZone()+")");
a(".broadcastScheduleData").each(function(){new AJAM.Views.BroadcastScheduleView({el:this})
})
})
})(jQuery);
AJAM.Models.BroadcastScheduleShow=Backbone.Model.extend({});
AJAM.Collections.BroadcastScheduleShows=Backbone.Collection.extend({model:AJAM.Models.BroadcastScheduleShow,initialize:function(){}});
AJAM.Views.BroadcastScheduleShowView=Backbone.View.extend({tagName:"li",className:"broadcastSchedule-show",initialize:function(){},render:function(){var d=new Date(this.model.attributes.publishDate);
var a=d.toLocaleTimeString().split(":");
var b=isNaN(parseInt(a[0]))?a[0]:parseInt(a[0]);
if(b>12){b-=12
}else{if(b===0){b=12
}}var c=(d.getHours()>=12?"pm":"am");
this.model.attributes.localTime=b+":"+a[1]+c;
this.$el=$(AJAM.Templates.BroadcastScheduleShowTemplate(this.model.attributes));
return this
}});
AJAM.Views.BroadcastScheduleView=Backbone.View.extend({tagName:"div",className:"broadcastScheduleData",initialize:function(){var a=this.$el.data("url");
this.collection=new AJAM.Collections.BroadcastScheduleShows([],{url:a});
this.$showContainer=this.$el.children(".broadcastSchedule-schedule");
this.$dayButtonContainer=this.$el.find(".broadcastSchedule-week");
var b=this;
this.collection.fetch({success:function(){b.render()
},error:function(){b.$el.siblings(".ajax-loader").css("display","none");
b.$el.html('<span class="text-error">Unable to reach broadcast service.</span>')
}})
},render:function(){var g=this;
var j="active";
var b=".day-container";
var c=new Date();
for(var e=0;
e<7;
e++){var a=$(AJAM.Templates.BroadcastScheduleDayButtonTemplate({activateSelector:b+".day-"+c.getDate(),active:e===0?j:"",date:c.getDate(),day:AJAM.Utils.Dates.dayNamesShort[c.getDay()],month:AJAM.Utils.Dates.monthNamesShort[c.getMonth()]}));
a.click(function(){var i=$(this);
i.siblings("li.day").find(".anchor").removeClass(j);
i.children(".anchor").addClass(j);
$(b).css("display","none");
var k=i.data("activate");
$(k).css("display","inherit")
});
g.$dayButtonContainer.append(a);
c=new Date(c.getFullYear(),c.getMonth(),c.getDate()+1)
}var h=null;
var d=null;
var f=false;
this.collection.each(function(l){var k=(new Date(l.attributes.publishDate)).getDate();
if(d===null||k!==d){if(h!==null){g.$showContainer.append(h);
var m=g.$dayButtonContainer.find(".day-button-"+d+" .broadcastSchedule-schedule");
m.append(h.clone())
}d=k;
h=$('<div class="day-container '+(f?"hide":"")+" day-"+d+'"></div>');
f=true
}var i=new AJAM.Views.BroadcastScheduleShowView({model:l});
h.append(i.render().$el)
});
this.$el.siblings(".ajax-loader").css("display","none");
this.$el.css("display","inherit");
return this
}});
(function(a){a(document).ready(function(){a(".broadcastOnNowData").each(function(){new AJAM.Views.BroadcastOnNowView({el:this})
})
})
})(jQuery);
AJAM.Models.BroadcastOnNowShow=Backbone.Model.extend({});
AJAM.Collections.BroadcastOnNowShows=Backbone.Collection.extend({model:AJAM.Models.BroadcastOnNowShow,initialize:function(){}});
AJAM.Views.BroadcastOnNowView=Backbone.View.extend({tagName:"div",className:"broadcastOnNowData",initialize:function(){var b=this.$el.data("url");
var a=this.$el.data("shows");
this.collection=new AJAM.Collections.BroadcastOnNowShows([],{url:b});
var c=this;
this.collection.fetch({update:true,remove:false,data:{shows:a},success:function(e,d){c.render(e)
},error:function(){hideElement(c.$el.siblings(".ajax-loader"));
c.$el.html('<span class="text-error">Unable to reach broadcast service.</span>')
}})
},render:function(h){var e=this.$el.data("b-title");
var f=this.$el.data("b-full-schedule-href");
var g=this.$el.data("b-full-schedule-display-val");
var a=h.models.length;
for(var d=0;
d<a;
d++){var b=h.models[d];
var c="";
if(d===0){b.attributes.bTitle=e;
b.attributes.bFullScheduleHref=f;
b.attributes.bFullScheduleDisplayVal=g;
c=AJAM.Templates.BroadcastOnNowOnNowTemplate(b.attributes)
}else{c=AJAM.Templates.BroadcastOnNowComingUpTemplate(b.attributes)
}this.$el.append(c)
}hideElement(this.$el.siblings(".ajax-loader"));
showElement(this.$el.find(".comingUpTemplate,.onNow"));
return this
}});
AJAM.Views.ArticleListForAuthorArticleView=Backbone.View.extend({tagName:"article",className:"articleListForAuthor-media media media-480-ignore",initialize:function(a){this.render=_.bind(this.render,this);
this.model.bind("change",this.render)
},render:function(){this.el.innerHTML=AJAM.Templates.ArticleListForAuthorArticleTemplate(this.model.attributes);
return this
}});
AJAM.Views.ArticleListForAuthorArticlesView=Backbone.View.extend({initialize:function(){var a=this.$el.data("url");
this.collection=new AJAM.Collections.Articles([],{url:a});
this.collection.bind("add",this.renderAdd,this);
this.loadMoreWrapper=this.$el.find(".wrapper-loadMore");
this.boxBody=this.$el.find(".box-body")[0];
this.$loaderImg=this.loadMoreWrapper.find(".ajax-loader");
this.$loadMore=this.loadMoreWrapper.find("a.sq.B");
this.loadMore()
},events:{"click .wrapper-loadMore a":"loadMore"},render:function(){var a=this;
a.collection.each(function(b){var c=new AJAM.Views.ArticleListForAuthorArticleView({model:b});
$(a.boxBody).append(c.render().el)
});
picturefill()
},renderAdd:function(b,d){AJAM.Utils.Story.addType(b.attributes);
var c=new AJAM.Views.ArticleListForAuthorArticleView({model:b});
var a=$(c.render().el);
$(this.boxBody).append(a);
picturefill()
},loadMore:function(a){var b=this;
hideElement(b.$loadMore);
showElement(b.$loaderImg,"inline-block");
b.collection.fetch({update:true,remove:false,data:{start:this.collection.length},success:function(d,c){if(d.length<d.serverCount){showElement(b.$loadMore,"inline-block")
}},complete:function(){hideElement(b.$loaderImg)
}})
}});
$(function(){$(".articleListForAuthor-box").each(function(){var a=new AJAM.Views.ArticleListForAuthorArticlesView({el:this})
})
});
$(function(){var b=[];
var c=document.getElementById("page_refresh_check");
var h=0;
$(".articleHighlightList").each(function(){$(this).attr("id","articleHighlightList-"+h);
b.push("articleHighlightList-"+h);
h++
});
var a=null;
if(c&&c.value=="1"){for(h=0;
h<b.length;
h++){if($.cookie(b[h])){try{var f=parseInt($.cookie(b[h]));
var k=$("#"+b[h]+" .articleHighlightList-wrapper--loadMore");
var g=0;
k.parents(".box-body").children(".news-item.hide").each(function(){if(g<f){$(this).removeClass("hide");
a=$(this)[0]
}g++
});
if(k.parents(".box-body").children(".news-item.hide").length===0){hideElement(k)
}$.removePathCookie(b[h]);
var d=parseInt(k.data("count"));
k.data("count",f+d)
}catch(l){}}}$(".articleHighlightList a").click(function(){try{if(!$(this).hasClass("sq")){var m=$(this).closest(".articleHighlightList").attr("id");
var i=parseInt($("#"+m+" .articleHighlightList-box").data("originalcount"));
var j=parseInt($("#"+m+" .articleHighlightList-wrapper--loadMore").data("count"));
if(!$.cookie(m)){$.cookie(m,j-i,{expires:1,path:window.location.pathname})
}}}catch(n){}return true
})
}if(a!==null){a.scrollIntoView(false)
}$(".articleHighlightList-wrapper--loadMore").click(function(){var r=this;
var p=$(this).data("count");
var n=$(this).data("clicked");
n=n=="true";
var j=$(this).closest(".articleHighlightList").attr("id");
if(!n){$.removePathCookie(j);
$(this).data("clicked","true")
}if(!$.cookie(j)){$.cookie(j,p,{expires:1,path:window.location.pathname})
}else{try{var o=parseInt($.cookie(j));
o+=p;
$.cookie(j,o,{expires:1,path:window.location.pathname})
}catch(q){}}var m=0;
$(this).parents(".box-body").children(".news-item.hide").each(function(){if(m<p){$(this).removeClass("hide")
}m++
});
if($(this).parents(".box-body").children(".news-item.hide").length===0){hideElement($(r))
}})
});
AJAM.Models.AjeHeadline=Backbone.Model.extend({});
AJAM.Collections.AjeHeadlines=Backbone.Collection.extend({model:AJAM.Models.AjeHeadline,initialize:function(){}});
AJAM.Views.AjeHeadlinesView=Backbone.View.extend({initialize:function(){var b=this;
var a=this.$el.data("url");
this.collection=new AJAM.Collections.AjeHeadlines([],{url:a});
this.numberOfArticles=this.$el.data("numberofarticles");
this.excludedHeadlines=this.$el.data("excludedheadlines");
this.$loaderImg=this.$el.find(".ajax-loader");
this.load();
setInterval(function(){b.collection.fetch()
},5*60*1000)
},render:function(){var b=this;
var a=0;
b.collection.each(function(d){if(a<b.numberOfArticles&&b.excludedHeadlines.indexOf(d.id)<0){var c=new AJAM.Views.AjeHeadlineView({model:d});
b.$el.append(c.render());
a++
}})
},load:function(){var a=this;
this.collection.fetch({success:function(){a.render()
},error:function(){a.$el.html('<span class="text-error">Unable to load AJE Headlines.</span>')
},complete:function(){hideElement(a.$loaderImg)
}})
}});
AJAM.Views.AjeHeadlineView=Backbone.View.extend({tagName:"div",initialize:function(a){this.render=_.bind(this.render,this);
this.model.bind("change",this.render)
},render:function(){this.el.innerHTML=AJAM.Templates.AjeHeadlineTemplate(this.model.attributes);
return this.el.firstElementChild
}});
$(function(){$(".ajeHeadlines-box").each(function(){new AJAM.Views.AjeHeadlinesView({el:this})
})
});
(function(a){Galleria.addTheme({name:"classicmod",author:"Jan-Philip Gehrcke, Galleria",css:"css",defaults:{transition:"fade",thumbCrop:"height",responsive:true,imageCrop:true,fullscreenCrop:false,height:0.75,showImagenav:true,_toggleInfo:false,slideshowInterval:4000,counterSeperator:"of"},init:function(c){Galleria.requires(1.28,"This version of Classic theme requires Galleria 1.2.8 or later");
var b=this;
b.addElement("navbar","navbarhelper","playbutton","fullscreenbutton");
b.append({container:"navbar",navbar:"navbarhelper",navbarhelper:["thumbnails-container"]});
b.append({container:"image-nav"});
b.addElement("info-close");
b.append({info:["info-close"]});
b.appendChild("stage","info");
b.addElement("info-link");
b.appendChild("stage","info-link");
a(b._target).append(b.$("info"));
b.addElement("buttonbar");
b.append({container:"buttonbar",buttonbar:["counter","playbutton","fullscreenbutton"]});
b.appendChild("container","tooltip");
b.classicplay=function(){b.setPlaytime(c.slideshowInterval);
b.playToggle()
};
var e=this.$("info-link,info-close,info-text"),f=Galleria.TOUCH,d=f?"touchstart":"click";
b.classicfullscreen=function(){b.toggleFullscreen(function(){b._carousel.set(b.getIndex())
})
};
e.hide();
b.$("info-text").show();
b.$("fullscreenbutton").click(function(g){g.preventDefault();
b.classicfullscreen()
});
b.$("playbutton").click(function(g){g.preventDefault();
b.classicplay()
});
b.bind("play",function(){this.$("playbutton").addClass("pause")
});
b.bind("pause",function(){this.$("playbutton").removeClass("pause")
});
b.bind("fullscreen_enter",function(){var h=false;
var g;
if(!b.$("container").hasClass("fullscreen")){b.$("container").addClass("fullscreen")
}b.appendChild("stage","info");
e.bind(d,function(){e.toggle()
});
e.hide();
b.$("info-link").show();
if(!f){b.$("stage").css("top","0");
g=window.setTimeout(function(){b.$("image-nav").css("background","#000000");
b.$("navbar,image-nav").animate({top:"-100px"},{duration:500,queue:false,complete:function(){h=false;
if(!b.isFullscreen()){b.$("navbar").css("top","");
b.$("image-nav").css("top","");
b.$("stage").css("top","")
}}});
b.$("buttonbar").animate({top:"-34px"},{duration:500,queue:false,complete:function(){h=false;
if(!b.isFullscreen()){b.$("buttonbar").css("top","")
}}})
},4000)
}b.$("container").mousemove(function(j){var i=j.pageY-a(window).scrollTop();
if(!f&&b.isFullscreen()){if(i<=100&&!h){window.clearTimeout(g);
b.$("navbar,image-nav").animate({top:"0"},{duration:500,queue:false,complete:function(){h=true;
if(!b.isFullscreen()){b.$("navbar").css("top","");
b.$("image-nav").css("top","");
b.$("stage").css("top","")
}}});
b.$("buttonbar").animate({top:"66px"},{duration:500,queue:false,complete:function(){h=true;
if(!b.isFullscreen()){b.$("buttonbar").css("top","")
}}})
}else{if(h&&i>100){b.$("navbar,image-nav").animate({top:"-100px"},{duration:500,queue:false,complete:function(){h=false;
if(!b.isFullscreen()){b.$("navbar").css("top","");
b.$("image-nav").css("top","");
b.$("stage").css("top","")
}}});
b.$("buttonbar").animate({top:"-34px"},{duration:500,queue:false,complete:function(){h=false;
if(!b.isFullscreen()){b.$("buttonbar").css("top","")
}}})
}}}})
});
b.bind("fullscreen_exit",function(){b.$("container").removeClass("fullscreen");
b.$("container").unbind("mousemove");
e.unbind("click");
a(b._target).append(b.$("info"));
e.hide();
b.$("info-text").show();
if(!f){b.$("navbar").css("top","");
b.$("image-nav").css("top","");
b.$("stage").css("top","");
b.$("buttonbar").css("top","");
b.$("image-nav").css("background","")
}});
b.bindTooltip({fullscreenbutton:function(){if(b.isFullscreen()){return"Exit fullscreen"
}return"Enter fullscreen"
},playbutton:function(){if(b.isPlaying()){return"Pause slideshow"
}return"Start slideshow"
}});
this.$("loader").show().css("opacity",0.4);
this.bind("thumbnail",function(g){if(!f){a(g.thumbTarget).css("opacity",0.6).parent().hover(function(){a(this).not(".active").children().stop().fadeTo(100,1)
},function(){a(this).not(".active").children().stop().fadeTo(400,0.6)
});
if(g.index===this.getIndex()){a(g.thumbTarget).css("opacity",1)
}}else{a(g.thumbTarget).css("opacity",this.getIndex()?1:0.6)
}});
this.bind("loadstart",function(g){if(!g.cached){this.$("loader").show().fadeTo(200,0.4)
}this.$("info").toggle(this.hasInfo());
a(g.thumbTarget).css("opacity",1).parent().siblings().children().css("opacity",0.6)
});
this.bind("loadfinish",function(g){this.$("loader").fadeOut(200)
})
}})
}(jQuery));