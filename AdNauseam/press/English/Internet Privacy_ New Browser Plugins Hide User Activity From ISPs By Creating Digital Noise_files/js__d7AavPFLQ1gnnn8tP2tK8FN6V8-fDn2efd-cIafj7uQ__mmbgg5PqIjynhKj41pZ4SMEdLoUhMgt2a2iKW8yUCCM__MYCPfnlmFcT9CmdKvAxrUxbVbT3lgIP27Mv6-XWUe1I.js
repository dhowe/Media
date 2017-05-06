/*
 Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
*/
(function(){var b,f;b=this.jQuery||window.jQuery;f=b(window);b.fn.stick_in_parent=function(d){var A,w,J,n,B,K,p,q,k,E,t;null==d&&(d={});t=d.sticky_class;B=d.inner_scrolling;E=d.recalc_every;k=d.parent;q=d.offset_top;p=d.spacer;w=d.bottoming;null==q&&(q=0);null==k&&(k=void 0);null==B&&(B=!0);null==t&&(t="is_stuck");A=b(document);null==w&&(w=!0);J=function(a,d,n,C,F,u,r,G){var v,H,m,D,I,c,g,x,y,z,h,l;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);I=A.height();g=a.parent();null!=k&&(g=g.closest(k));
if(!g.length)throw"failed to find stick parent";v=m=!1;(h=null!=p?p&&a.closest(p):b("<div />"))&&h.css("position",a.css("position"));x=function(){var c,f,e;if(!G&&(I=A.height(),c=parseInt(g.css("border-top-width"),10),f=parseInt(g.css("padding-top"),10),d=parseInt(g.css("padding-bottom"),10),n=g.offset().top+c+f,C=g.height(),m&&(v=m=!1,null==p&&(a.insertAfter(h),h.detach()),a.css({position:"",top:"",width:"",bottom:""}).removeClass(t),e=!0),F=a.offset().top-(parseInt(a.css("margin-top"),10)||0)-q,
u=a.outerHeight(!0),r=a.css("float"),h&&h.css({width:a.outerWidth(!0),height:u,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":r}),e))return l()};x();if(u!==C)return D=void 0,c=q,z=E,l=function(){var b,l,e,k;if(!G&&(e=!1,null!=z&&(--z,0>=z&&(z=E,x(),e=!0)),e||A.height()===I||x(),e=f.scrollTop(),null!=D&&(l=e-D),D=e,m?(w&&(k=e+u+c>C+n,v&&!k&&(v=!1,a.css({position:"fixed",bottom:"",top:c}).trigger("sticky_kit:unbottom"))),e<F&&(m=!1,c=q,null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),
h.detach()),b={position:"",width:"",top:""},a.css(b).removeClass(t).trigger("sticky_kit:unstick")),B&&(b=f.height(),u+q>b&&!v&&(c-=l,c=Math.max(b-u,c),c=Math.min(q,c),m&&a.css({top:c+"px"})))):e>F&&(m=!0,b={position:"fixed",top:c},b.width="border-box"===a.css("box-sizing")?a.outerWidth()+"px":a.width()+"px",a.css(b).addClass(t),null==p&&(a.after(h),"left"!==r&&"right"!==r||h.append(a)),a.trigger("sticky_kit:stick")),m&&w&&(null==k&&(k=e+u+c>C+n),!v&&k)))return v=!0,"static"===g.css("position")&&g.css({position:"relative"}),
a.css({position:"absolute",bottom:d,top:"auto"}).trigger("sticky_kit:bottom")},y=function(){x();return l()},H=function(){G=!0;f.off("touchmove",l);f.off("scroll",l);f.off("resize",y);b(document.body).off("sticky_kit:recalc",y);a.off("sticky_kit:detach",H);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:"",width:""});g.position("position","");if(m)return null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.remove()),a.removeClass(t)},f.on("touchmove",l),f.on("scroll",l),f.on("resize",
y),b(document.body).on("sticky_kit:recalc",y),a.on("sticky_kit:detach",H),setTimeout(l,0)}};n=0;for(K=this.length;n<K;n++)d=this[n],J(b(d));return this}}).call(this);
;/**/
(function($){
  
  $(document).ready(function(){
    
    if ($('.most-popular').length > 0 && typeof $('.most-popular').tabs != "undefined") {
      $('.most-popular').tabs();
    }
    
    $('.item-shares-wrapper').mouseenter(function() {
      $(this).find('.item-shares').addClass('hidden');
      $(this).find('.addthis_toolbox').removeClass('hidden');
    });
    
    $('.item-shares-wrapper').mouseleave(function() {
      $(this).find('.item-shares').removeClass('hidden');
      $(this).find('.addthis_toolbox').addClass('hidden');
    });
    
  });
  
})(jQuery)
;/**/
/**
 * @file Common data layer helper.
 */

(function ($) {
  Drupal.behaviors.dataLayer = {

    /**
     * The language prefix list (no blank).
     *
     * @return {array}
     */
    langPrefixes: function langPrefixes() {
      var languages = Drupal.settings.dataLayer.languages,
          langList = [];

      for (var lang in languages) {
        if (languages[lang].prefix !== '') {
          langList.push(languages[lang].prefix);
        }
      }
      return langList;

      // With Underscore.js dependency.
      //var list = _.pluck(Drupal.settings.datalayer.languages, 'prefix');
      //return _.filter(list, function(lang) { return lang });
    },

    /**
     * Drupal behavior.
     */
    attach: function() { return }

  };
})(jQuery);
;/**/
function socialnewsletterValidateEmail(email) { 
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

(function($){
  $(document).ready(function(){
    if ($('.social-follow').length > 0) {
      $( ".social-follow .icons li.mail" ).addClass('active');
      $( ".social-follow .buttons li.mail").show().addClass('active');
      
      $( ".social-follow .icons li" ).hover(function() {
        var buttonIndex = $(this).index();
        $( ".social-follow .buttons li.active" ).hide().removeClass('active');
        $( ".social-follow .buttons li").eq(buttonIndex).show().addClass('active');
        $(this).addClass('active');
        $( ".social-follow .icons li" ).not(this).removeClass('active');
      });
    }
    
    if ($('#newsletter_social_form, .newsletter_pulse_form').length > 0) {
      $('#newsletter_social_form, .newsletter_pulse_form').each(function() {
        var newsletterForm = $(this);
        newsletterForm.submit( function(e) {
          var newsletterFormURL = '/newsletter-social';
          var ty = '<div class="np-ty-text"><b>Thank you for subscribing.</b></div>';
          var processing = '<div class="processing">Processing...</div>';
          
          //for other language
          if($(".ty-message")[0]){
            ty = $(".ty-message").html();
          }
          if($(".process-message")[0]){
            processing = $(".process-message").html();
          }
          
          var emailInput = $(this).find('input[type=text]');
          if (emailInput.length > 0 && !socialnewsletterValidateEmail(emailInput.val())) {
            newsletterForm.find('.np-error').fadeIn();
            return false;
          }else{
            newsletterForm.find('.np-error').fadeOut();
          }
          var formData = $(this).serialize();
          newsletterForm.find('.np-email').html(processing);
          $.ajax({
            'type' : 'GET',
            'dataType': 'jsonp',
            'jsonpCallback': 'newsletter_social',
            'url': newsletterFormURL,
            'data': formData,
            'success': function(data) {
              newsletterForm.find('.np-email').html(ty);
            }
          });
          e.preventDefault();
        });
      });
    }
        
  });
})(jQuery);/**/

/**
 * Cookie plugin 1.0
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
;/**/
(function($){
  Drupal.behaviors.pageRefresh = {
    attach: function (context, settings) {
      setTimeout(function() {
        $.cookie('pageRefresh', document.location.href);
        window.location.reload(1);
      }, settings.refresh.refresh_time);
    }
  };
})(jQuery)
;/**/
(function( $ ) {
    $.fn.pop = function() {
        var top = this.get(-1);
        this.splice(this.length-1,1);
        return top;
    };

    $.fn.shift = function() {
        var bottom = this.get(0);
        this.splice(0,1);
        return bottom;
    };

    $.fn.sticky = function(options) {
      var element = $(this);
      if (element == undefined || element.length == 0) {
        return false;
      }
      var stickyPosition = options.stickyPosition != undefined ? options.stickyPosition : 0;
      var stickyTopOffset = options.stickyTopOffset != undefined ? options.stickyTopOffset : 0;
      var footerMeetPointOffset = options.footerMeetPointOffset != undefined ? options.footerMeetPointOffset : 0;
      var positionTopOffset = options.positionTopOffset != undefined ? options.ositionTopOffset : 0;
      var scrollTop = $(window).scrollTop();
      var winHeight = $(window).height();
      var footerHeight = (options.footer != undefined && options.footer.length > 0) ? options.footer.height() : 0;
      var headerHeight = (options.header != undefined && options.header.length > 0) ? options.header.height() : 0;
      var footerTop = (options.footer != undefined && options.footer.length > 0) ? options.footer.offset().top : scrollTop + winHeight;
      var elementHeight = element.height();
      var elementTop = scrollTop + headerHeight;
      var footerMeetPoint = footerTop - elementTop - elementHeight - footerMeetPointOffset;

      if (footerMeetPoint <= 0) {
        if (!element.hasClass('position')) {
          element.parents('.contextual-links-region').css('position', 'static');
          element.css('top', footerTop - elementHeight - positionTopOffset);
          element.addClass('position');
        }
      }
      else {
        if (element.hasClass('position')) {
          element.parents('.contextual-links-region').css('position', 'relative');
          element.css('top', '');
          element.removeClass('position');
        }
        if (scrollTop > stickyPosition - headerHeight) {
          element.addClass('sticky').css('top', headerHeight + stickyTopOffset);
        }
        else if (element.hasClass('sticky')) {
          element.removeClass('sticky');
          element.css('top', '');
        }
      }
    };

})( jQuery );

(function($) {
  $(document).ready(function() {
    
    $('.ibtmedia-form-placeholder').each(function() {
      var placeholder = $(this).find('div:first');
      var form_id = placeholder.attr('class');
      $.get('/ibtmedia_form/' + form_id, function(data) {
        placeholder.prepend(data);
        var event = form_id + '_loaded';
        $.event.trigger({
          type: event
        });
      });
    });

    $(document).bind('search_block_form_loaded', function() {
      if (typeof Drupal.behaviors.apachesolr_autocomplete != 'undefined') {
        Drupal.behaviors.apachesolr_autocomplete.attach();
      }
    });
    
  });
})(jQuery);;/**/
/**
 * Implementation of Drupal behavior.
 * disableStickyTopAd = ds0
 * disableStickyRight1 = ds1
 * disableStickyRight2 = ds2
 * disableStickyRight3 = ds3
 * initPlayerClose = ds4
 * disableStickyPlayer = ds5
 */
(function($) {
  Drupal.behaviors.lemon = {
    elements: {},
    
    attach: function (context, settings) {
      this.init();
      this.parallaxCalc();
      this.scrollTop();
      this.stickySocial();
      if (site_name == 'iDigitalTimes.com' && !is_uxab) {
        this.stickySidebar();
      }
      if (this.elements.body.el.hasClass('logged-in')) {
        return;
      }
      this.stickyHeader();
      if (!is_uxab) {
        this.stickyAds();
        this.stickyVideo();
        this.stickyMobileVideo();
      }
    },
    
    init: function () {
      if (!this.elements.length) {
        var thisObj = this;
        this.elements.window = {
          el: $(window)
        };
        this.elements.body = {
          el: $('body')
        }
        this.elements.stickyhead = {
          el: $('.stickyhead')
        }
        this.elements.header = {
          el: $('.page-header')
        }
        this.elements.pagetop = {
          el: $('.page-top')
        }
        this.elements.sidebar = {
          el: $('.page-sidebar')
        }
        this.elements.right1 = {
          el: $('#dfp-ad-right1')
        }
        this.elements.right2 = {
          el: $('#dfp-ad-right2')
        }
        this.elements.right3 = {
          el: $('#dfp-ad-right3')
        }
        this.elements.right4 = {
          el: $('#dfp-ad-right4')
        }
        this.elements.content =  {
          el: $('.article-content')
        }
        this.elements.pagebottom =  {
          el: $('.page-bottom')
        }
        this.elements.videocontent = {
          el: $('.node-article .videocontent')
        }
        this.elements.dropdown = {
          el: $('.page-header .dropdown')
        }
        this.elements.social = {
          el: $('.article-social')
        }
        this.elements.sidebar = {
          el: $('aside.sidebar')
        }

        $(document).on('recalculate', function() {
          thisObj.recalculateElements();
        });

        if (typeof googletag != 'undefined') {
          googletag.cmd.push(function() {
            googletag.pubads().addEventListener('slotRenderEnded', function (event) {
              $.event.trigger({
                type: 'recalculate'
              });
              $.event.trigger({
                type: 'reposition'
              });
            });
          });
        }

        $(window).on('scroll', function() {
          $.event.trigger({
            type: 'reposition'
          });
        });

        $(window).on('resize', function() {
          $.event.trigger({
            type: 'recalculate'
          });
          $.event.trigger({
            type: 'reposition'
          });
        });

        $(document).on('breaking_news_open breaking_news_close', function() {
          $.event.trigger({
            type: 'recalculate'
          });
          $.event.trigger({
            type: 'reposition'
          });
        });

        $.event.trigger({
          type: 'recalculate'
        });

        $.event.trigger({
          type: 'reposition'
        });
      }
    },

    recalculateElements: function () {
      var el;
      var fixed = false;
      this.elements.window.height = this.elements.window.el.height();
      this.elements.window.width = this.elements.window.el.width();
      this.elements.stickyhead = this.setItemAttributes(this.elements.stickyhead);
      this.elements.header = this.setItemAttributes(this.elements.header);
      this.elements.pagetop = this.setItemAttributes(this.elements.pagetop);
      this.elements.sidebar = this.setItemAttributes(this.elements.sidebar);
      this.elements.right1 = this.setItemAttributes(this.elements.right1);
      this.elements.right2 = this.setItemAttributes(this.elements.right2);
      this.elements.right3 = this.setItemAttributes(this.elements.right3);
      this.elements.right4 = this.setItemAttributes(this.elements.right4);
      this.elements.content = this.setItemAttributes(this.elements.content);
      this.elements.pagebottom = this.setItemAttributes(this.elements.pagebottom);
      this.elements.videocontent = this.setItemAttributes(this.elements.videocontent);
      this.elements.dropdown = this.setItemAttributes(this.elements.dropdown);
      this.elements.social = this.setItemAttributes(this.elements.social);
      this.elements.sidebar = this.setItemAttributes(this.elements.sidebar);
    },

    setItemAttributes: function (item) {
      var el;
      var fixed = false;
      var absolute = false;
      el = item.el;
      if (!el.length) {
        return item;
      }
      if (el.hasClass('fixed')) {
        fixed = true;
        el.removeClass('fixed');
      }
      if (el.hasClass('absolute')) {
        absolute = true;
        el.removeClass('absolute');
      }
      item.height = el.length ? el.outerHeight(true) : 0;
      item.width = el.length ? el.width() : 0;
      item.outerwidth = el.length ? el.outerWidth() : 0;
      item.left = el.length ? el.offset().left : 0;
      item.top = el.length ? el.offset().top : 0;
      if (fixed) {
        el.addClass('fixed');
      }
      if (absolute) {
        el.addClass('absolute');
      }
      return item;
    },

    isMobile: function () {
      return (/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));
    },
    
    parallaxCalc: function () {
      var thisObj = this;
      var body = thisObj.elements.body.el;
      if (site_name == 'Medical Daily' && body.hasClass('featured-article')) {
        $(document).on('reposition', function() {
          var parafig = $('figure.feature');
          var image_h = parafig.find('img').outerHeight();
          var arthead = $('.full-article header');
          var arthead_h = arthead.outerHeight();
          var arthead_t = image_h - arthead_h;
          var toc = $('.toc');
          var toc_t = image_h - 44;
          if(thisObj.elements.window.width > 767) {
            parafig.css('height',image_h);
            if(thisObj.elements.window.width > 991) {
              toc.css('top',toc_t);
              arthead.css('top',arthead_t);
            }
            else {
              toc.css('top','');
              arthead.css('top','');
            }
          }
          else {
            parafig.css('height','');
            toc.css('top','');
            arthead.css('top','');
          }
        });
      }
      if (site_name == 'Medical Daily' && body.hasClass('collection-article')) {
        $(document).on('reposition', function() {
          var parafig = $('figure.feature');
          var image_h = parafig.find('img').outerHeight();
          if(thisObj.elements.window.width > 767) {
            parafig.css('height',image_h).find('.image').css('height',image_h);
            $('.article-body aside').each( function(){
              var marginTop = $(this).prev('p').find('.figcaption').outerHeight() + 50;
              $(this).css('margin-top', marginTop);
            });
          }
          else {
            parafig.css('height','').find('.image').css('height','');
            $('.article-body aside').css('margin-top', '');
          }
        });
      }
    },
    
    scrollTop: function () {
      var thisObj = this;
      var body = thisObj.elements.body.el;
      var hashTagActive = '';
      var scrollElement = $('.scroll');
      if (scrollElement.length > 0) {
        if(!body.hasClass('ds0')) {
          var offset = thisObj.elements.stickyhead.height;
        }
        else {
          var offset = thisObj.elements.header.height;
        }
        scrollElement.on('click', function(event) {
          if(hashTagActive != this.hash) { //this will prevent if the user click several times the same link to freeze the scroll.
            event.preventDefault();
            //calculate destination place
            var dest = 0;
            if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
              dest = $(document).height() - $(window).height();
            }
            else {
              dest = $(this.hash).offset().top;
            }
            //go to destination
            $('html, body').animate({
              scrollTop: dest - offset
            }, 1000, 'swing');
            hashTagActive = this.hash;
          }
        });
      }
    },
    
    stickySocial: function () {
      var thisObj = this;
      var body = thisObj.elements.body.el;
      var obj = thisObj.elements.social.el;
      if (obj.length > 0) {
        $(document).on('click', '.share-toggle', function(){
          $(this).toggleClass('active').parent().toggleClass('expand');
        });
        if ($('body').hasClass('logged-in')) {
        }
          $(document).on('reposition', function() {
            if (thisObj.elements.window.width < 768 || body.hasClass('node-type-ranking-table')) {
              thisObj.unstickObj(obj);
              return;
            }
            var obj_t = thisObj.elements.social.top;
            var obj_l = thisObj.elements.social.left;
            var obj_w = thisObj.elements.social.width;
            var obj_h = thisObj.elements.social.height;
  
            var start = obj_t;
            var content_t = thisObj.elements.content.top;
            var content_h = thisObj.elements.content.height;
            var stop = content_t + content_h - obj_h - 35;
            
            if(!body.hasClass('ds0')) {    
              var offset = thisObj.elements.stickyhead.height + 35;
            }
            else {
              var offset = thisObj.elements.header.height + 35;
            }
            var st = thisObj.elements.window.el.scrollTop() + offset;
            
            if (st > start){
              if (st < stop) {
                obj.removeClass('absolute').addClass('fixed').css({
                  'top':offset,
                  'left':obj_l,
                  'width':obj_w
                });
              }
              else {
                obj.addClass('absolute').css({
                  'top':stop,
                  'left':obj_l,
                  'width':obj_w
                });
              }
            }
            else {
              thisObj.unstickObj(obj);
            }
          });
      }
    },
    
    stickyHeader: function () {
      var thisObj = this;
      var body = thisObj.elements.body.el;
      var header = thisObj.elements.header.el;
      
      if (header.length > 0) {          
        $(document).on('reposition', function(e) {
          if(body.hasClass('standard-article') || body.hasClass('featured-article') || body.hasClass('collection-article') && thisObj.isMobile() != true) {
            thisObj.triggerStickTopAd();
          }
          else {
            thisObj.fixedHeader();
          }
          if(thisObj.elements.dropdown.el.length) {
            thisObj.triggerDropdown();
          }
          if(site_name == 'International Business Times') {
            thisObj.shrinkHeader();
          }
        });
      }
    },
    
    shrinkHeader: function () {
      var thisObj = this;
      var body = thisObj.elements.body.el;
      var st = thisObj.elements.window.el.scrollTop();
      if (thisObj.elements.window.width > 767) {
        if (st > 60) {
          body.addClass('min');
        }
        else {
          body.removeClass('min');
        }
      }
      else {
        body.removeClass('min');
      }
    },
    
    triggerDropdown: function () {
      var thisObj = this;
      // mobile menu expand only on "mobile"
      var dropdown = thisObj.elements.dropdown.el;
      var dropdown_h = thisObj.elements.window.height - 61;
      if (thisObj.elements.window.width < 768) {            
        dropdown.css({
          'height': dropdown_h,
          'overflow-y': 'scroll'
        });    
      }
      else {
        dropdown.css({
          'height': '',
          'overflow-y': ''
        });
      }
    },
    
    fixedHeader: function () {
      var thisObj = this;
      var body = thisObj.elements.body.el;
      var header = thisObj.elements.header.el;
      if(site_name == 'International Business Times') {
        if (thisObj.elements.window.width > 767) {
          var header_h = 61;
        }
        else {
          var header_h = 36;
        }
      }
      else {
        var header_h = thisObj.elements.header.height;
      }
      header.addClass('fixed');
      body.css('padding-top',header_h);
    },
    
    triggerStickTopAd: function () {
      var thisObj = this;
      var body = thisObj.elements.body.el;
      var stickyhead = thisObj.elements.stickyhead.el;
      var stickhead_h = thisObj.elements.stickyhead.height;
      
      if (!body.hasClass('ds0')) {
        if($('#dfp-ad-top').hasClass('unstick')) {
          console.log('unstick top');
          body.addClass('ds0');
        }
        if (thisObj.elements.pagetop.el.length) {
          stickyhead.addClass('fixed');
          body.css('padding-top',stickhead_h);
          
          if(!$('#dfp-ad-top').hasClass('sticky')) {          
            // fallback release top ad after 15s
            setTimeout(function(){
              stickyhead.removeClass('fixed');
              thisObj.fixedHeader();
              body.addClass('ds0');
            }, 15000);
          }
        }
      }
      else {
        stickyhead.removeClass('fixed');
        thisObj.fixedHeader();
      }
    },
    
    stickyAds: function () {
      var thisObj = this;
      var body = thisObj.elements.body.el;
      if (body.hasClass('locked-content') || thisObj.isMobile() == true) {
        return;
      }
      if (body.hasClass('standard-article')) {
        $(document).on('reposition', function() {
          thisObj.standardStickyAds();
        });
      }
      if (body.hasClass('featured-article') || body.hasClass('collection-article')) {
        $(document).on('reposition', function() {
          thisObj.featuredStickyAds();
        });
      }
    },
    
    unstickObj: function (obj) {
      obj.parent().css('min-height','');
      obj.removeClass('fixed absolute').css({
        'top':'',
        'left':'',
        'width':''
      });
    },
    
    standardStickyAds: function () {
      var thisObj = this;
      var sticky1 = thisObj.elements.right1;
      var right1 = sticky1.el;
      var sticky2 = thisObj.elements.right2;
      var right2 = sticky2.el;
      var sticky3 = thisObj.elements.right3;
      var right3 = sticky3.el;
      var sticky4 = thisObj.elements.right4;
      var right4 = sticky4.el;
      if (thisObj.elements.window.width < 992) {
        thisObj.unstickObj(right1);
        thisObj.unstickObj(right2);
        thisObj.unstickObj(right3);
        thisObj.unstickObj(right4);
        return;
      }
      var body = thisObj.elements.body.el;
      
      if (!body.hasClass('ds1') && right1.hasClass('unstick')) {
        console.log('unstick r1');
        body.addClass('ds1');
      }
      if (!body.hasClass('ds2') && right2.hasClass('unstick')) {
        console.log('unstick r2');
        body.addClass('ds2');
      }
      if (!body.hasClass('ds3') && right3.hasClass('unstick')) {
        console.log('unstick r3');
        body.addClass('ds3');
      }
      if (!body.hasClass('ds4') && right4.hasClass('unstick')) {
        console.log('unstick r4');
        body.addClass('ds4');
      }
      
      var right1_t = sticky1.top;
      var right1_l = sticky1.left;
      var right1_w = sticky1.width;
      var right1_h = sticky1.height;
      
      var right2_t = sticky2.top;
      var right2_l = sticky2.left;
      var right2_w = sticky2.width;
      var right2_h = sticky2.height;
      
      var right3_t = sticky3.top;
      var right3_l = sticky3.left;
      var right3_w = sticky3.width;
      var right3_h = sticky3.height;
      
      var right4_t = sticky4.top;
      var right4_l = sticky4.left;
      var right4_w = sticky4.width;
      var right4_h = sticky4.height;
      
      if(!body.hasClass('ds0')) {    
        var offset = thisObj.elements.stickyhead.height;
        var position = offset - 14;
      }
      else {
        var offset = thisObj.elements.header.height;
        var position = offset;
      }
      var st = thisObj.elements.window.el.scrollTop() + offset;

      var start1 = right1_t + 18;
      var start2 = right2_t + 18;
      var start3 = right3_t + 18;
      var start4 = right4_t + 18;
      
      var stop1 = right2_t - right1_h;
      if (body.hasClass('node-type-picture-this')) {
        stop1 = thisObj.elements.pagebottom.top - right1_h - 40;
      }
      
      var stop2 = right3_t - right2_h;
      var stop3 = right4_t - right4_h;
      var stop4 = thisObj.elements.pagebottom.top + right4_h;
      
      // stick right1
      if (st > start1){
        if (!body.hasClass('ds1')) {
          right1.parent().css('min-height',right1_h);
          right1.addClass('fixed').css({
            'top':position,
            'left':right1_l,
            'width':right1_w
          });
        }
        if (st > stop1) {
          thisObj.unstickObj(right1);
          if (!right1.hasClass('sticky')) {
            body.addClass('ds1');
          } 
        }
      }
      else {
        thisObj.unstickObj(right1);
      }

      // stick right2
      if (st > start2){
        if (!body.hasClass('ds2')) {
          right2.parent().css('min-height',right2_h);
          right2.addClass('fixed').css({
            'top':position,
            'left':right2_l,
            'width':right2_w
          });
        }
        if (st > stop2) {
          thisObj.unstickObj(right2);
          if (!right2.hasClass('sticky')) {
            body.addClass('ds2');
          } 
        }
      }
      else {
        thisObj.unstickObj(right2);
      }

      // stick right3
      if (st > start3){
        if (!body.hasClass('ds3')) {
          right3.parent().css('min-height',right3_h);
          right3.addClass('fixed').css({
            'top':position,
            'left':right3_l,
            'width':right3_w
          });
        }
        if (st > stop3) {
          thisObj.unstickObj(right3);
          if (!right3.hasClass('sticky')) {
            body.addClass('ds3');
          } 
        }
      }
      else {
        thisObj.unstickObj(right3);
      }

      // stick right4
      if (st > start4){
        if (!body.hasClass('ds4')) {
          right4.parent().css('min-height',right4_h);
          right4.addClass('fixed').css({
            'top':position,
            'left':right4_l,
            'width':right4_w
          });
          
          if (site_name == 'iDigitalTimes.com') {
            setTimeout(function(){
              if (!right4.hasClass('sticky')) {
                body.addClass('ds4');
                thisObj.unstickObj(right4);
              } 
            }, 10000);
          }
        }
        if (st > stop4) {
          thisObj.unstickObj(right4);
          if (!right4.hasClass('sticky')) {
            body.addClass('ds4');
          } 
        }
      }
      else {
        thisObj.unstickObj(right4);
      }

    },
    
    featuredStickyAds: function () {
      var thisObj = this;
      var sticky1 = thisObj.elements.right1;
      var right1 = sticky1.el;
      var sticky2 = thisObj.elements.right2;
      var right2 = sticky2.el;
      var sticky3 = thisObj.elements.right3;
      var right3 = sticky3.el;
      var sticky4 = thisObj.elements.right4;
      var right4 = sticky4.el;
      
      if (thisObj.elements.window.width < 992) {
        thisObj.unstickObj(right1);
        thisObj.unstickObj(right2);
        thisObj.unstickObj(right3);
        thisObj.unstickObj(right4);
        return;
      }
      var body = thisObj.elements.body.el;
      
      var right1_t = sticky1.top;
      var right1_l = sticky1.left;
      var right1_w = sticky1.width;
      var right1_h = sticky1.height;
      
      var right2_t = sticky2.top;
      var right2_l = sticky2.left;
      var right2_w = sticky2.width;
      var right2_h = sticky2.height;
      
      var right3_t = sticky3.top;
      var right3_l = sticky3.left;
      var right3_w = sticky3.width;
      var right3_h = sticky3.height;
      
      var right4_t = sticky4.top;
      var right4_l = sticky4.left;
      var right4_w = sticky4.width;
      var right4_h = sticky4.height;
      
      if(!body.hasClass('ds0')) {    
        var offset = thisObj.elements.stickyhead.height;
        var position = offset - 14;
      }
      else {
        var offset = thisObj.elements.header.height;
        var position = offset;
      }
      var st = thisObj.elements.window.el.scrollTop() + offset;

      var start1 = right1_t + 18;
      var start2 = right2_t + 18;
      var start3 = right3_t + 18;
      var start4 = right4_t + 18;
      
      // Default stopping points
      var stop1 = right2_t - right1_h;
      var stop2 = right3_t - right2_h;
      var stop3 = right4_t - right3_h;
      var stop4 = thisObj.elements.pagebottom.top + right4_h;
      
      // If ad is followed by parallax, change stopping points
      var parallax2 = right2.closest('aside').nextAll('p.parallax:first');
      var parallax3 = right3.closest('aside').nextAll('p.parallax:first');
      var parallax4 = right4.closest('aside').nextAll('p.parallax:first');
      var parallax2_t = 0;
      var parallax3_t = 0;
      var parallax4_t = 0;
      
      if (parallax2.length > 0) {
        parallax2_t = parallax2.offset().top;
      }
      if (parallax3.length > 0) {
        parallax3_t = parallax3.offset().top;
      }
      if (parallax4.length > 0) {
        parallax4_t = parallax4.offset().top;
      }
      
      // if there is parallax after right2
      if (parallax2_t > 0 && parallax2_t < stop2) {
        stop2 = parallax2_t - right2_h;
      }
      // if there is parallax after right3
      if (parallax3_t > 0 && parallax3_t < stop3) {
        stop3 = parallax3_t - right3_h;
      }
      // if there is parallax after right4
      if (parallax4_t > 0 && parallax4_t < stop4) {
        stop4 = parallax4_t - right4_h;
      }
      
      // stick right1
      if (st > start1){
        right1.parent().css('min-height',right1_h);
        if (st < stop1) {
          right1.removeClass('absolute').addClass('fixed').css({
            'top':position,
            'left':right1_l,
            'width':right1_w
          });
        }
        else {
          right1.addClass('absolute').css({
            'top':stop1,
            'left':right1_l,
            'width':right1_w
          });
        }
      }
      else {
        thisObj.unstickObj(right1);
      }

      // stick right2
      if (st > start2){
        right2.parent().css('min-height',right2_h);
        if (st < stop2) {
          right2.removeClass('absolute').addClass('fixed').css({
            'top':position,
            'left':right2_l,
            'width':right2_w
          });
        }
        else {
          right2.addClass('absolute').css({
            'top':stop2,
            'left':right2_l,
            'width':right2_w
          });
        }
      }
      else {
        thisObj.unstickObj(right2);
      }

      // stick right3
      if (st > start3){
        right3.parent().css('min-height',right3_h);
        if (st < stop3) {
          right3.removeClass('absolute').addClass('fixed').css({
            'top':position,
            'left':right3_l,
            'width':right3_w
          });
        }
        else {
          right3.addClass('absolute').css({
            'top':stop3,
            'left':right3_l,
            'width':right3_w
          });
        }
      }
      else {
        thisObj.unstickObj(right3);
      }

      // stick right4
      if (st > start4){
        right4.parent().css('min-height',right4_h);
        if (st < stop4) {
          right4.removeClass('absolute').addClass('fixed').css({
            'top':position,
            'left':right4_l,
            'width':right4_w
          });
        }
        else {
          right4.addClass('absolute').css({
            'top':stop4,
            'left':right4_l,
            'width':right4_w
          });
        }
      }
      else {
        thisObj.unstickObj(right4);
      }
    },
    
    stickyVideo: function() {
      var thisObj = this;
      if (thisObj.isMobile() == true) {
        return;
      }
      var body = thisObj.elements.body.el;
      var obj = thisObj.elements.videocontent.el;
      if (thisObj.elements.videocontent.el.length) {
        $(document).on('reposition', function() {
          var closePlayer = $('.close-fusion-jwplayer');
          if (thisObj.elements.window.width < 992) {
            closePlayer.addClass('hide').hide();
            thisObj.unstickObj(obj);
            return;
          }
          
          var obj_t = thisObj.elements.videocontent.top;
          var obj_h = thisObj.elements.videocontent.height;

          var start = obj_t + obj_h/2;
          if(!body.hasClass('ds0')) {
            var offset = thisObj.elements.stickyhead.height;
          }
          else {
            var offset = thisObj.elements.header.height;
          }
          var st = thisObj.elements.window.el.scrollTop() + offset;
          
          if (st > start){
            if (!body.hasClass('ds5')) {
              obj.parent().css('min-height',obj_h);
              obj.addClass('fixed');
              closePlayer.removeClass('hide');
              if (body.hasClass('standard-article') && typeof(jwplayer("fusion_jwplayer")) != 'undefined') {
                if (jwplayer("fusion_jwplayer").getPosition() >= 1) {
                  closePlayer.show();
                }
                else {
                  if(!body.hasClass('ds6')) {
                    closePlayer.hide();
                    jwplayer("fusion_jwplayer").on('firstFrame',function(){
                      closePlayer.delay(1000).fadeIn(100);
                      body.addClass('ds6');
                    });
                  }
                }
              }
              else {
                if(!body.hasClass('ds6')) {
                  closePlayer.hide();
                  setTimeout(function(){
                    closePlayer.show();
                    body.addClass('ds6');
                  }, 30000);
                }
                else {
                  closePlayer.show();
                }
              }
              closePlayer.click(function() {
                if (body.hasClass('standard-article')) {
                  jwplayer("fusion_jwplayer").pause(true);
                }
                body.addClass('ds5');
                closePlayer.addClass('hide').hide();
                thisObj.unstickObj(obj);
                if (typeof ga != 'undefined') {
                  ga('send', 'event', 'JW Player Video', 'close button');
                }
              });
            }
          }
          else {
            closePlayer.addClass('hide').hide();
            thisObj.unstickObj(obj);
          }        
          
        });
      }
    },
    
    stickyMobileVideo: function() {
      var thisObj = this;
      if (thisObj.isMobile() != true) {
        return;
      }
      var body = thisObj.elements.body.el;
      var obj = thisObj.elements.videocontent.el.parent();
      if (thisObj.elements.videocontent.el.length) {
        $(document).on('reposition', function() {
          var closePlayer = $('.close-fusion-jwplayer');
          if (thisObj.elements.window.width > 767) {
            closePlayer.addClass('hide').hide();
            thisObj.unstickObj(obj);
            return;
          }
          var obj_t = thisObj.elements.videocontent.top;
          var obj_h = thisObj.elements.videocontent.height;

          var start = obj_t + obj_h/2;
          var offset = thisObj.elements.header.height;
          var st = thisObj.elements.window.el.scrollTop() + offset;
          
          if(body.hasClass('es5')) {
            if (st > start){
              if (!body.hasClass('ds5')) {
                obj.parent().css({
                  'min-height': obj_h,
                  'background-color': '#f7f7f7'
                });
                obj.addClass('fixed');
                closePlayer.removeClass('hide').show().click(function() {
                  jwplayer("fusion_jwplayer").pause(true);
                  body.addClass('ds5');
                  closePlayer.addClass('hide').hide();
                  thisObj.unstickObj(obj);
                  if (typeof ga != 'undefined') {
                    ga('send', 'event', 'JW Player Video', 'close button');
                  }
                });
                /*if(jwplayer("fusion_jwplayer").on('adComplete')) {
                  closePlayer.addClass('hide').hide();
                  thisObj.unstickObj(obj);
                }*/
              }
            }
            else {
              closePlayer.addClass('hide').hide();
              obj.parent().css({
                'min-height': '',
                'background-color': ''
              });
              thisObj.unstickObj(obj);
            }
          }
          
        });
      }
    },
    
    stickySidebar: function () {
      var thisObj = this;
      var body = thisObj.elements.body.el;
      $(document).on('reposition', function(e) {
        var win_w = thisObj.elements.window.width;
        var obj = thisObj.elements.sidebar.el;
        
        if (win_w < 992) {
          thisObj.unstickObj(obj);
          thisObj.compactMenu(obj);
          return;
        }
        thisObj.expandMenu(obj);
        
        var obj_t = thisObj.elements.sidebar.top;
        var dynamic_t = obj.offset().top;
        var obj_l = thisObj.elements.sidebar.left;
        var obj_w = thisObj.elements.sidebar.outerwidth;
        var obj_h = obj.find('.inner').outerHeight();
        var start = dynamic_t + obj_h;
        var header_h = thisObj.elements.header.height;
        if (thisObj.elements.pagetop.el.length > 0) {
          var dynamic_h = header_h + thisObj.elements.pagetop.height;
        }
        else {
          var dynamic_h = header_h;
        }
        
        var win_h = thisObj.elements.window.height;
        
        var st = thisObj.elements.window.el.scrollTop() + header_h;
        var sb = thisObj.elements.window.el.scrollTop() + win_h;
        
        if (st > header_h && st > dynamic_h) {
          // scroll down
          if (st >= thisObj.lastScroll) {
            if (sb >= start) {
              obj.removeClass('absolute').addClass('fixed').css({
                'top':'',
                'bottom':0,
                'left':obj_l,
                'width':obj_w
              });
            }
            else {
              obj.addClass('absolute').css({
                'top':dynamic_t,
                'bottom':'',
                'left':obj_l,
                'width':obj_w
              });
            }
          }
          // scroll up
          else {
            if (sb >= start) {
              obj.addClass('absolute').css({
                'top':dynamic_t,
                'bottom':'',
                'left':obj_l,
                'width':obj_w
              });
            }
            if (st < dynamic_t) {
              obj.removeClass('absolute').addClass('fixed').css({
                'top':header_h,
                'bottom':'',
                'left':obj_l,
                'width':obj_w
              });
            }
          }
        }        
        else {
          thisObj.unstickObj(obj);
        }
        
        thisObj.lastScroll = st;
        adjustscroll = thisObj.lastScroll;
        
      });
    },
    
    compactMenu: function (obj) {
      var thisObj = this;
      var element = obj.find('.inner');
      var win_h = thisObj.elements.window.height - 55;
      element.css({
        'height':win_h,
        'overflow-y':'scroll'
      });
    },
    
    expandMenu: function (obj) {
      var element = obj.find('.inner');
      element.css({
        'height':'',
        'overflow-y':''
      });
    }

  };
})(jQuery);
;/**/
(function($) {

  Drupal.behaviors.menuExpand = {

    attach: function (context, settings) {
      var IEversion = this.detectIE();
      if (IEversion !== false) {
        $('body').addClass('ie').addClass('ie-' + IEversion);
      }
      this.detectFFX();
      this.menuExpand();
      if(ibtmedia_device == 'desktop' && is_uxab == 0) {
        this.webfontLoader();
      }
    },

    /**
     * detect IE
     * returns version of IE or false, if browser is not Internet Explorer
     */
    detectIE: function() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
           // IE 12 (aka Edge) => return version number
           return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    },
    
    detectFFX: function() {
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('body').addClass('ffx');
      }
    },

    menuExpand: function() {
      var pageHeader = $('.page-header');
      var btnGlobal = $('.m-expand');
      var btnMenu = $('.m-expand.menu');
      var btnSubscribe = $('.header-logo .m-expand.subscribe');
      var btnEditions = $('.page-header > .header-edition .m-expand.editions');
      var targetBody = $('body');

      if (pageHeader.length > 0) {
        $('div.main').click(function() {
          btnGlobal.removeClass('active').parent().removeClass('expand');
          targetBody.removeClass('menu-expand');
        });
        pageHeader.on('click', '.header-logo .m-expand.subscribe', function(event) {
          var toggle = $(this);
          if (toggle.hasClass('active')) {
            toggle.removeClass('active').parent().removeClass('expand');
            targetBody.removeClass('menu-expand');
          }
          else {
            toggle.addClass('active').parent().addClass('expand');
            btnGlobal.not(this).removeClass('active').parent().removeClass('expand');
            targetBody.addClass('menu-expand');
          }
        });
        pageHeader.on('click', '.page-header > .header-edition .m-expand.editions', function(event) {
          var toggle = $(this);
          if (toggle.hasClass('active')) {
            toggle.removeClass('active').parent().removeClass('expand');
            targetBody.removeClass('menu-expand');
          }
          else {
            toggle.addClass('active').parent().addClass('expand');
            btnGlobal.not(this).removeClass('active').parent().removeClass('expand');
            targetBody.addClass('menu-expand');
          }
        });
        pageHeader.on('click', '.m-expand.search', function(event) {
          var toggle = $(this);
          if (toggle.hasClass('active')) {
            toggle.removeClass('active').parent().removeClass('expand');
            targetBody.removeClass('menu-expand');
          }
          else {
            toggle.addClass('active').parent().addClass('expand');
            btnGlobal.not(this).removeClass('active').parent().removeClass('expand');
            targetBody.addClass('menu-expand');
          }
        });
        pageHeader.on('click', '.m-expand.menu', function(event) {
          var toggle = $(this);
          if (toggle.hasClass('active')) {
            toggle.removeClass('active').parent().removeClass('expand');
            btnGlobal.not(this).removeClass('active').parent().removeClass('expand');
            targetBody.removeClass('menu-expand');
            if (targetBody.hasClass('social-display')) {
              targetBody.removeClass('social-display');
            }
          }
          else {
            toggle.addClass('active').parent().addClass('expand');
            btnGlobal.not(this).removeClass('active').parent().removeClass('expand');
            targetBody.addClass('menu-expand');
            if (!targetBody.hasClass('social-display')) {
              targetBody.addClass('social-display');
            }
          }
        });
        pageHeader.on('click', '.m-expand.back', function(event) {
          btnGlobal.not(this).removeClass('active').parent().removeClass('expand');
          btnMenu.addClass('active').parent().addClass('expand');
          targetBody.addClass('menu-expand');
        });
        pageHeader.on('click', '.header-nav .m-expand.subscribe', function(event) {
          btnSubscribe.parent().addClass('expand');
          btnMenu.parent().removeClass('expand');
        });
        pageHeader.on('click', '.header-nav .m-expand.editions', function(event) {
          btnEditions.parent().addClass('expand');
          btnMenu.parent().removeClass('expand');
        });
      }
    },
    
    webfontLoader:function() {
      WebFont.load({
        google: {
          families: ['Playfair Display:400,400i,700,700i', 'Source Sans Pro:400,400i,600,600i,700,700i,900']
        }
      });
    }

  };

})(jQuery);
;/**/
/**
 * Sticky elements.
 */
(function($) {

  Drupal.behaviors.stickyColumns = {

    options: {
      container: {},
      elements: []
    },

    res: null,

    attach: function (context, settings) {
      this.stickyInit();
    },

    stickyInit: function () {
      var element;
      var thisObj = this;
      this.options.container = $('.sticky-bottom');
      if (this.options.container.length == 0) {
        return;
      }

      this.options.elements = [
        {
          el: this.options.container.find('.content-left')
        },
        {
          el: this.options.container.find('.content-right')
        },
        {
          el: this.options.container.find('.content-middle')
        }
      ];
      
      this.recalculate();
      this.stickToBottom();

      $(window).on('scroll', function() {
        thisObj.stickToBottom();
      });

      $(window).on('resize', function() {
        if (thisObj.res) {
          clearTimeout(thisObj.res);
        };
        thisObj.res = setTimeout(function(){
          thisObj.recalculate();
          thisObj.stickToBottom();
        }, 100);
      });
      
      setTimeout(function() {
        thisObj.recalculate();
        thisObj.stickToBottom();
      }, 2000);

      if (typeof googletag != 'undefined') {
        googletag.cmd.push(function() {
          googletag.pubads().addEventListener('slotRenderEnded', function (event) {
            thisObj.recalculate();
            thisObj.stickToBottom();
          });
        });
      }

    },

    recalculate: function () {
      win = $(window);
      var windowWidth = win.width();
      if (windowWidth < 992) {
        return ;
      }
      var columnHeights = [];

      for (i in this.options.elements) {
        var el = this.options.elements[i].el;
        var currentPosition = el.css('position');
        el.css('position', '');
        var height = el.outerHeight(true);
        columnHeights.push(height);
        var width = el.parent().width();
        var top = el.offset().top;
        var bottom = top + height;
        this.options.elements[i].height = height;
        this.options.elements[i].top = top;
        this.options.elements[i].width = width;
        this.options.elements[i].top = top;
        this.options.elements[i].bottom = bottom;
        el.css('width', width);
        el.css('position', currentPosition);
      }

      this.options.containerHeight = Math.max.apply(Math, columnHeights);
      this.options.container.height(this.options.containerHeight);
      this.options.winHeight = $(window).height();
      this.options.containerTop = this.options.container.offset().top;
      this.options.containerHeight = this.options.container.outerHeight(true);
      this.options.containerBottom = this.options.containerTop + this.options.containerHeight;
    },

    stickToBottom: function () {
      win = $(window);
      var windowWidth = win.width();
      if (windowWidth < 992) {
        return ;
      }

      var winScrollTop = win.scrollTop();
      var options = this.options;
      var winBottom = winScrollTop + options.winHeight;

      for (i in this.options.elements) {
        var el = this.options.elements[i].el;
        var elHeight = this.options.elements[i].height;
        var elBottom = this.options.elements[i].bottom;

        if (winBottom > options.containerBottom) {
          if (el.css('position') != 'absolute') {
            el.css('position', 'absolute');
            el.css('top',  options.containerHeight - elHeight);
          }
        }
        else if (winBottom > elBottom) {
          if (el.css('position') != 'fixed') {
            el.css('position', 'fixed');
            el.css('top', 0 - elHeight + options.winHeight);
          }
        }
        else {
          if (el.css('position')) {
            el.css('position', '');
          }
        }
      }
    }

  };

})(jQuery);;/**/
