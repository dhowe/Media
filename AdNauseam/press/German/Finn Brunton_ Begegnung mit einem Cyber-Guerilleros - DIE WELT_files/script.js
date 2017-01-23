/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2012 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.2
 *
 */
(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        
        // Ensure compatibility with older configuration
        options.event = 'release';
        
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "release",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            finished        : null,
            queue_size      : 3,
            idle_threshold   : 300,
            timeout_interval : 2000 
        };

        function update() {
            var counter = 0;
      
            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit; 
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed; 
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
//        if (0 === settings.event.indexOf("scroll")) {
//            $container.bind(settings.event, function(event) {
//                return update();
//            });
//        }
        
        $container.bind(settings.event, function(event) {
            return update();
        });        

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {
                            $self
                                .hide()
                                .attr("src", $self.data(settings.data_attribute))
                                [settings.effect](settings.effect_speed);
                            self.loaded = true;

                            //$self.data('loading', false);

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.data(settings.data_attribute));
                        $self.data('loading', true);
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function(event) {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function(event) {
            update();
        });
              
        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        (function() {
            update();
            
            var scrolling = false;
            
            $window.scroll(function(e){
              
              if(scrolling)
                return;
              
              scrolling = true;
              
              setTimeout(function(){
                
                scrolling = false;
                
                $container.trigger('release')
                
              }, settings.idle_threshold);
              
            });

            var timeout = setInterval(function() {
        
              var i = settings.queue_size;
              
              if(scrolling)
                return;
              
              elements.each(function(){
                var $this = $(this);
                
                i = Math.max(i-1, -1);
            
                if( !$this.data('loading') && i >= 0 ){
                  
                  $this.trigger('appear');
                  
                }                
                
              });

              if(elements.length == 0){
                
                window.clearTimeout(timeout);     
                
                if (typeof settings.finished == 'function') {
                  settings.finished.call(this);
                }
                
              }
      
            }, settings.timeout_interval);            
            
        })();
        
        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.height() + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };
    
    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };
        
    $.abovethetop = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };
    
    $.leftofbegin = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[':'], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);

/* 
 * NOTE: The following code should eventually go somewhere outside of
 * this library source file.
 */
!(function(){
  
  // select images to be affected
  $imgs = $("img[data-original]");
  
  if($imgs.length > 0 && typeof asms != "undefined" && typeof asms.config != "undefined" && typeof asms.config.lazyloading == "object") {
  // apply lazyloader on them
    $imgs.lazyload(asms.config.lazyloading);
  }

})()
;/**
 * Lightbox
 *
 * Script to open a div container to display content on top of the page
 * Specify a selector to search for valid links to get the lightbox content via ajax
 *
 * Use init methode to create click handler
 *
 * Example: lightbox.init('#lightbox', '.articleMultimediaRelations .tsrImg', 900, 'lightboxSimple');
 *
 * Hint: There are three usecases for the lightbox to get content:
 *             1. Fetch content via ajax e. g. for pictures, slideshows etc.
 *             2. Add content via moving html elements e. g. for email popup
 *             3. Add a message text via function variable used for abo logout
 *
 * @author Steve Junker <steve.junker@axelspringer.de>
 */
var lightbox = (function($) {
    var isInit = false;

    var options = {
        lightboxId : '#lightbox',
        parameter : 'config=lightbox',
        parameterSimple : 'config=lightboxSimple',
        socMedMail : '.socialMedia .email a',
        socMedMailPopup : '#sendArticlePopup',
        selector : '',
        fadeSpeed : 400,
        topSpace : 50,
        lightboxWidth : 700,
        loadingError : '<div class="error"><span class="message">#error# - Inhalt konnte nicht geladen werden.</span></div>',
        lightboxEvent: 'lightboxFadeOutReady'
    };

    var events = {
        onPreLoad: null,
        onLoaded: null,
        onError: null,
        onShow: null,
        onHide: null
    };

    function getContent(url, width) {
        var eventInfo = {
            url: url,
            width: width
        }

        if(events.onPreLoad && typeof events.onPreLoad == 'function') {
            events.onPreLoad(eventInfo);
        }

        var lbContent = $('.lbContent');

        lbContent.addClass('loading').css('background-position-x',(width-2-27)/2);
        lbContent.empty();
        appendCloseButton('.lbContent');
        show(width);
        $(options.lightboxId).fadeIn(options.fadeSpeed);

        $.ajax({
            type : 'GET',
            url : url,
            error : function(jqXHR, textStatus, errorThrown) {
                var messageHtml = options.loadingError.replace(/#error#/, errorThrown);
                show(messageHtml, width);
                if(events.onError == null) {
                    events.onError(jqXHR, textStatus, errorThrown);
                }
            },
            success : function(data) {
                if(undefined != data && false != data && 0 < data.length) {
                    $('.lbContent').removeClass('loading');
                    $('.lbContent').append(data);
                }

                renderSocialButtons();

                var lightboxSlideshow = $('.slideshow.lightbox', options.lightboxId);

                // Add keypress functionality for slideshow
                if (0 < lightboxSlideshow.length) {
                    $(document).on('keydown', function(e) {
                        if(e.keyCode == 39 || e.keyCode == 75) {
                            $('.next', lightboxSlideshow).click();
                            return true;
                        }
                        if(e.keyCode == 37 || e.keyCode == 74) {
                            $('.prev', lightboxSlideshow).click();
                            return true;
                        }
                        if(e.keyCode == 27 || e.keyCode == 81) {
                            hide();
                        }
                    });
                }

                if(events.onLoaded && typeof events.onLoaded == 'function') {
                    events.onLoaded(eventInfo);
                }
            }
        });
    }

    /**
     * Hides lightbox and removes elements after fade out has finished
     */
    function hide() {
        $(options.lightboxId).fadeOut(options.fadeSpeed, function() {
            // move popup from lightbox to body
            $(options.socMedMailPopup).appendTo('body').hide();
            $('.lbContent').empty();

            // event trigger for redirection possibility
            $(options.lightboxId).trigger(options.lightboxEvent);
        });
        if(events.onHide && typeof events.onHide == 'function') {
            events.onHide();
        }
    }

    /**
     * Calculates width and sets space from top for the lightbox
     */
    function show(width) {
        var ww = $(window).width();
        var scrollTop = $(window).scrollTop();
        var top = options.topSpace + scrollTop;
        var w = Math.round((ww - width) / 2);
        $('.lbContent').css({
            'left' : w + 'px',
            'top' : top,
            'width' : width
        });
        if(events.onShow && typeof events.onShow == 'function') {
            events.onShow();
        }
    }

    /**
     * Appends close html elements and events
     */
    function appendCloseButton(element) {
        var controls = '<div class="lbControls"><a class="close" href="#"><span>Schließen</span></a></div>';
        $(element).append(controls);

        // add close functionality
        $('.close', options.lightboxId).click(function(event) {
            event.preventDefault();
            hide();
        });
    }

    function extendLightboxHtml() {
        var content = '<div class="lbContent"></div>';
        var overlay = '<div class="lbOverlay"></div>';

        $(options.lightboxId).append(overlay).append(content);

        // close functionality for overlay click
        $('.lbOverlay').click(function(event) {
            event.preventDefault();
            hide();
        });
    }

    /**
     * Checks for correct lightbox link
     * It as to be an internal ('/' as first char) or same domain
     *
     * @param string href
     *
     * @returns boolean
     */
    function isCorrectHref(href) {
        if(href == undefined) {
            return false;
        }
        if (false !== href
            && 0 < href.length
            && '#' != href
            && ('/' == href[0] || -1 != href.search(document.domain)))
        {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Initalization methode for the lightbox
     *
     * @param lightboxId Lightbox CSS ID
     * @param seletor JQuery CSS selectors
     * @param width Defines the lightbox width
     * @param type lightbox or lightboxSimple
     */
    return {
        init : function(lightboxId, selector, width, type, pEvents) {
            $.extend(events, pEvents);

            // abort if static page
            if(0 < $('link[href*="static.css"]').length) {
                return;
            }

            if (undefined == lightboxId || 0 == lightboxId.length) {
                lightboxId = options.lightboxId;
            }

            $(lightboxId).hide();

            // set selector
            if (undefined == selector || 0 == selector.length) {
                // return 'Selector has to be set';
            } else {
                options.selector = selector;
            }

            // set width
            if (undefined == width || false === width || 0 == width.length) {
                width = options.lightboxWidth;
            }

            // set parameter
            var parameter = options.parameter;

            if (undefined != type && false !== type && 0 < type.length) {
                switch(type) {
                    case 'lightboxSimple':
                        parameter = options.parameterSimple;
                        break;
                    case 'lightbox':
                    default:
                        parameter = options.parameter;
                        break;
                }
            }

            if (false === isInit) {
                extendLightboxHtml();
                isInit = true;
            }

            if(undefined != selector) {
                // scan for url and open lightbox
                $(options.selector).live('click', function(event) {
                       event.preventDefault();
                    event.stopPropagation();

                    // try to get self href
                    var href = $(this).attr('href');

                    // find children with href
                    if (undefined == href || false === isCorrectHref(href)) {
                        // find first correct href
                        $('a[href!="#"][href!=""]', this).each(function(index) {
                               var url = $(this).attr('href');

                            if(true === isCorrectHref(url)) {
                                href = url;
                                return false;
                            }
                        });

                        var url = $(this).data("lbRef");
                        if(true === isCorrectHref(url)) {
                            href = url;
                        }
                    }

                    if (undefined != href && true === isCorrectHref(href)) {
                        // '?' was not found
                        if (-1 == href.indexOf('?')) {
                            href += '?' + parameter;
                        // '?' was found so a parameter exists just add the lightbox parameter
                        } else {
                            href += '&' + parameter;
                        }
                        getContent(href, width);
                    } else {
                        return ('Lightbox could not find a link for "' + $(this).attr('class') + '"');
                    }
                });
            }
        },
        setSelector : function(selector) {
            if(0 < selector.length) {
                options.selector = selector;
            }
        },
        getOptions : function() {
            return options;
        },
        /**
         * The social media send an email form does not use ajax requests
         * We just copy the div elements into lbContent
         */
        showMailForm : function() {
            if (false === isInit) {
                return 'Lightbox has to be initalized first.';
            }

            // remove old content
            $('.lbContent').empty();

            // move popup content to lbContent and make it visible
            $(options.socMedMailPopup).appendTo('.lbContent').show();

            // add buttons and functionality
            appendCloseButton('.lbContent');

            show(options.lightboxWidth);

            $(options.lightboxId).fadeIn(options.fadeSpeed);
        },

        showMessageBox : function(message, redirect) {
            if (false === isInit) {
                return 'Lightbox has to be initalized first.';
            }

            if (0 < message.length) {
                // remove old content
                $('.lbContent').empty();

                // add buttons and functionality
                appendCloseButton('.lbContent');

                show(options.lightboxWidth);

                $('.lbContent').append(message);

                $(options.lightboxId).fadeIn(options.fadeSpeed);
            }

            if (undefined !== redirect && 0 < redirect.length) {
              // event listener
              $(options.lightboxId).on(options.lightboxEvent, function() {
                window.location = redirect;
              });
            }
        },

        showLtkLightbox: function(url, width) {
            if (false === isInit) {
                return 'Lightbox has to be initalized first.';
            }

            if (undefined == url || false === isCorrectHref(url)) {
                return false;
            }

            getContent(url, width);

            //$(options.lightboxId).fadeIn(options.fadeSpeed);
        }
    };
})(jQuery);
;/* jQuery UI Accordion 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *    jquery.ui.core.js
 *    jquery.ui.widget.js
 */(function(a,b){a.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:!0,clearStyle:!1,collapsible:!1,event:"click",fillSpace:!1,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:!1,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var b=this,c=b.options;b.running=0,b.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"),b.headers=b.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){c.disabled||a(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){c.disabled||a(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){c.disabled||a(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){c.disabled||a(this).removeClass("ui-state-focus")}),b.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");if(c.navigation){var d=b.element.find("a").filter(c.navigationFilter).eq(0);if(d.length){var e=d.closest(".ui-accordion-header");e.length?b.active=e:b.active=d.closest(".ui-accordion-content").prev()}}b.active=b._findActive(b.active||c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"),b.active.next().addClass("ui-accordion-content-active"),b._createIcons(),b.resize(),b.element.attr("role","tablist"),b.headers.attr("role","tab").bind("keydown.accordion",function(a){return b._keydown(a)}).next().attr("role","tabpanel"),b.headers.not(b.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide(),b.active.length?b.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):b.headers.eq(0).attr("tabIndex",0),a.browser.safari||b.headers.find("a").attr("tabIndex",-1),c.event&&b.headers.bind(c.event.split(" ").join(".accordion ")+".accordion",function(a){b._clickHandler.call(b,a,this),a.preventDefault()})},_createIcons:function(){var b=this.options;b.icons&&(a("<span></span>").addClass("ui-icon "+b.icons.header).prependTo(this.headers),this.active.children(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected),this.element.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.children(".ui-icon").remove(),this.element.removeClass("ui-accordion-icons")},destroy:function(){var b=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"),this.headers.find("a").removeAttr("tabIndex"),this._destroyIcons();var c=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");(b.autoHeight||b.fillHeight)&&c.css("height","");return a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments),b=="active"&&this.activate(c),b=="icons"&&(this._destroyIcons(),c&&this._createIcons()),b=="disabled"&&this.headers.add(this.headers.next())[c?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(b){if(!(this.options.disabled||b.altKey||b.ctrlKey)){var c=a.ui.keyCode,d=this.headers.length,e=this.headers.index(b.target),f=!1;switch(b.keyCode){case c.RIGHT:case c.DOWN:f=this.headers[(e+1)%d];break;case c.LEFT:case c.UP:f=this.headers[(e-1+d)%d];break;case c.SPACE:case c.ENTER:this._clickHandler({target:b.target},b.target),b.preventDefault()}if(f){a(b.target).attr("tabIndex",-1),a(f).attr("tabIndex",0),f.focus();return!1}return!0}},resize:function(){var b=this.options,c;if(b.fillSpace){if(a.browser.msie){var d=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}c=this.element.parent().height(),a.browser.msie&&this.element.parent().css("overflow",d),this.headers.each(function(){c-=a(this).outerHeight(!0)}),this.headers.next().each(function(){a(this).height(Math.max(0,c-a(this).innerHeight()+a(this).height()))}).css("overflow","auto")}else b.autoHeight&&(c=0,this.headers.next().each(function(){c=Math.max(c,a(this).height("").height())}).height(c));return this},activate:function(a){this.options.active=a;var b=this._findActive(a)[0];this._clickHandler({target:b},b);return this},_findActive:function(b){return b?typeof b=="number"?this.headers.filter(":eq("+b+")"):this.headers.not(this.headers.not(b)):b===!1?a([]):this.headers.filter(":eq(0)")},_clickHandler:function(b,c){var d=this.options;if(!d.disabled){if(!b.target){if(!d.collapsible)return;this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header),this.active.next().addClass("ui-accordion-content-active");var e=this.active.next(),f={options:d,newHeader:a([]),oldHeader:d.active,newContent:a([]),oldContent:e},g=this.active=a([]);this._toggle(g,e,f);return}var h=a(b.currentTarget||c),i=h[0]===this.active[0];d.active=d.collapsible&&i?!1:this.headers.index(h);if(this.running||!d.collapsible&&i)return;var j=this.active,g=h.next(),e=this.active.next(),f={options:d,newHeader:i&&d.collapsible?a([]):h,oldHeader:this.active,newContent:i&&d.collapsible?a([]):g,oldContent:e},k=this.headers.index(this.active[0])>this.headers.index(h[0]);this.active=i?a([]):h,this._toggle(g,e,f,i,k),j.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header),i||(h.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected),h.next().addClass("ui-accordion-content-active"));return}},_toggle:function(b,c,d,e,f){var g=this,h=g.options;g.toShow=b,g.toHide=c,g.data=d;var i=function(){if(!!g)return g._completed.apply(g,arguments)};g._trigger("changestart",null,g.data),g.running=c.size()===0?b.size():c.size();if(h.animated){var j={};h.collapsible&&e?j={toShow:a([]),toHide:c,complete:i,down:f,autoHeight:h.autoHeight||h.fillSpace}:j={toShow:b,toHide:c,complete:i,down:f,autoHeight:h.autoHeight||h.fillSpace},h.proxied||(h.proxied=h.animated),h.proxiedDuration||(h.proxiedDuration=h.duration),h.animated=a.isFunction(h.proxied)?h.proxied(j):h.proxied,h.duration=a.isFunction(h.proxiedDuration)?h.proxiedDuration(j):h.proxiedDuration;var k=a.ui.accordion.animations,l=h.duration,m=h.animated;m&&!k[m]&&!a.easing[m]&&(m="slide"),k[m]||(k[m]=function(a){this.slide(a,{easing:m,duration:l||700})}),k[m](j)}else h.collapsible&&e?b.toggle():(c.hide(),b.show()),i(!0);c.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur(),b.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()},_completed:function(a){this.running=a?0:--this.running;this.running||(this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""}),this.toHide.removeClass("ui-accordion-content-active"),this.toHide.length&&(this.toHide.parent()[0].className=this.toHide.parent()[0].className),this._trigger("change",null,this.data))}}),a.extend(a.ui.accordion,{version:"1.8.18",animations:{slide:function(b,c){b=a.extend({easing:"swing",duration:300},b,c);if(!b.toHide.size())b.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},b);else{if(!b.toShow.size()){b.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},b);return}var d=b.toShow.css("overflow"),e=0,f={},g={},h=["height","paddingTop","paddingBottom"],i,j=b.toShow;i=j[0].style.width,j.width(j.parent().width()-parseFloat(j.css("paddingLeft"))-parseFloat(j.css("paddingRight"))-(parseFloat(j.css("borderLeftWidth"))||0)-(parseFloat(j.css("borderRightWidth"))||0)),a.each(h,function(c,d){g[d]="hide";var e=(""+a.css(b.toShow[0],d)).match(/^([\d+-.]+)(.*)$/);f[d]={value:e[1],unit:e[2]||"px"}}),b.toShow.css({height:0,overflow:"hidden"}).show(),b.toHide.filter(":hidden").each(b.complete).end().filter(":visible").animate(g,{step:function(a,c){c.prop=="height"&&(e=c.end-c.start===0?0:(c.now-c.start)/(c.end-c.start)),b.toShow[0].style[c.prop]=e*f[c.prop].value+f[c.prop].unit},duration:b.duration,easing:b.easing,complete:function(){b.autoHeight||b.toShow.css("height",""),b.toShow.css({width:i,overflow:d}),b.complete()}})}},bounceslide:function(a){this.slide(a,{easing:a.down?"easeOutBounce":"swing",duration:a.down?1e3:200})}}})})(jQuery);;/*!
 * jQuery UI Mouse 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *    jquery.ui.widget.js
 */(function(a,b){var c=!1;a(document).mouseup(function(a){c=!1}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent")){a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation();return!1}}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(b){if(!c){this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;if(!e||f||!this._mouseCapture(b))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==!1;if(!this._mouseStarted){b.preventDefault();return!0}}!0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0;return!0}},_mouseMove:function(b){if(a.browser.msie&&!(document.documentMode>=9)&&!b.button)return this._mouseUp(b);if(this._mouseStarted){this._mouseDrag(b);return b.preventDefault()}this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b));return!this._mouseStarted},_mouseUp:function(b){a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b));return!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(a){return this.mouseDelayMet},_mouseStart:function(a){},_mouseDrag:function(a){},_mouseStop:function(a){},_mouseCapture:function(a){return!0}})})(jQuery);;/* jQuery UI Slider 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *    jquery.ui.core.js
 *    jquery.ui.mouse.js
 *    jquery.ui.widget.js
 */(function(a,b){var c=5;a.widget("ui.slider",a.ui.mouse,{widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function(){var b=this,d=this.options,e=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",g=d.values&&d.values.length||1,h=[];this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(d.disabled?" ui-slider-disabled ui-disabled":"")),this.range=a([]),d.range&&(d.range===!0&&(d.values||(d.values=[this._valueMin(),this._valueMin()]),d.values.length&&d.values.length!==2&&(d.values=[d.values[0],d.values[0]])),this.range=a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(d.range==="min"||d.range==="max"?" ui-slider-range-"+d.range:"")));for(var i=e.length;i<g;i+=1)h.push(f);this.handles=e.add(a(h.join("")).appendTo(b.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(a){a.preventDefault()}).hover(function(){d.disabled||a(this).addClass("ui-state-hover")},function(){a(this).removeClass("ui-state-hover")}).focus(function(){d.disabled?a(this).blur():(a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),a(this).addClass("ui-state-focus"))}).blur(function(){a(this).removeClass("ui-state-focus")}),this.handles.each(function(b){a(this).data("index.ui-slider-handle",b)}),this.handles.keydown(function(d){var e=a(this).data("index.ui-slider-handle"),f,g,h,i;if(!b.options.disabled){switch(d.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:d.preventDefault();if(!b._keySliding){b._keySliding=!0,a(this).addClass("ui-state-active"),f=b._start(d,e);if(f===!1)return}}i=b.options.step,b.options.values&&b.options.values.length?g=h=b.values(e):g=h=b.value();switch(d.keyCode){case a.ui.keyCode.HOME:h=b._valueMin();break;case a.ui.keyCode.END:h=b._valueMax();break;case a.ui.keyCode.PAGE_UP:h=b._trimAlignValue(g+(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.PAGE_DOWN:h=b._trimAlignValue(g-(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(g===b._valueMax())return;h=b._trimAlignValue(g+i);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(g===b._valueMin())return;h=b._trimAlignValue(g-i)}b._slide(d,e,h)}}).keyup(function(c){var d=a(this).data("index.ui-slider-handle");b._keySliding&&(b._keySliding=!1,b._stop(c,d),b._change(c,d),a(this).removeClass("ui-state-active"))}),this._refreshValue(),this._animateOff=!1},destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"),this._mouseDestroy();return this},_mouseCapture:function(b){var c=this.options,d,e,f,g,h,i,j,k,l;if(c.disabled)return!1;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),d={x:b.pageX,y:b.pageY},e=this._normValueFromMouse(d),f=this._valueMax()-this._valueMin()+1,h=this,this.handles.each(function(b){var c=Math.abs(e-h.values(b));f>c&&(f=c,g=a(this),i=b)}),c.range===!0&&this.values(1)===c.min&&(i+=1,g=a(this.handles[i])),j=this._start(b,i);if(j===!1)return!1;this._mouseSliding=!0,h._handleIndex=i,g.addClass("ui-state-active").focus(),k=g.offset(),l=!a(b.target).parents().andSelf().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:b.pageX-k.left-g.width()/2,top:b.pageY-k.top-g.height()/2-(parseInt(g.css("borderTopWidth"),10)||0)-(parseInt(g.css("borderBottomWidth"),10)||0)+(parseInt(g.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(b,i,e),this._animateOff=!0;return!0},_mouseStart:function(a){return!0},_mouseDrag:function(a){var b={x:a.pageX,y:a.pageY},c=this._normValueFromMouse(b);this._slide(a,this._handleIndex,c);return!1},_mouseStop:function(a){this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(a,this._handleIndex),this._change(a,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1;return!1},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(a){var b,c,d,e,f;this.orientation==="horizontal"?(b=this.elementSize.width,c=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(b=this.elementSize.height,c=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),d=c/b,d>1&&(d=1),d<0&&(d=0),this.orientation==="vertical"&&(d=1-d),e=this._valueMax()-this._valueMin(),f=this._valueMin()+d*e;return this._trimAlignValue(f)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values());return this._trigger("start",a,c)},_slide:function(a,b,c){var d,e,f;this.options.values&&this.options.values.length?(d=this.values(b?0:1),this.options.values.length===2&&this.options.range===!0&&(b===0&&c>d||b===1&&c<d)&&(c=d),c!==this.values(b)&&(e=this.values(),e[b]=c,f=this._trigger("slide",a,{handle:this.handles[b],value:c,values:e}),d=this.values(b?0:1),f!==!1&&this.values(b,c,!0))):c!==this.value()&&(f=this._trigger("slide",a,{handle:this.handles[b],value:c}),f!==!1&&this.value(c))},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("change",a,c)}},value:function(a){if(arguments.length)this.options.value=this._trimAlignValue(a),this._refreshValue(),this._change(null,0);else return this._value()},values:function(b,c){var d,e,f;if(arguments.length>1)this.options.values[b]=this._trimAlignValue(c),this._refreshValue(),this._change(null,b);else{if(!arguments.length)return this._values();if(!a.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(b):this.value();d=this.options.values,e=arguments[0];for(f=0;f<d.length;f+=1)d[f]=this._trimAlignValue(e[f]),this._change(null,f);this._refreshValue()}},_setOption:function(b,c){var d,e=0;a.isArray(this.options.values)&&(e=this.options.values.length),a.Widget.prototype._setOption.apply(this,arguments);switch(b){case"disabled":c?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.propAttr("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.propAttr("disabled",!1),this.element.removeClass("ui-disabled"));break;case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":this._animateOff=!0,this._refreshValue();for(d=0;d<e;d+=1)this._change(null,d);this._animateOff=!1}},_value:function(){var a=this.options.value;a=this._trimAlignValue(a);return a},_values:function(a){var b,c,d;if(arguments.length){b=this.options.values[a],b=this._trimAlignValue(b);return b}c=this.options.values.slice();for(d=0;d<c.length;d+=1)c[d]=this._trimAlignValue(c[d]);return c},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b,d=a-c;Math.abs(c)*2>=b&&(d+=c>0?b:-b);return parseFloat(d.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var b=this.options.range,c=this.options,d=this,e=this._animateOff?!1:c.animate,f,g={},h,i,j,k;this.options.values&&this.options.values.length?this.handles.each(function(b,i){f=(d.values(b)-d._valueMin())/(d._valueMax()-d._valueMin())*100,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",a(this).stop(1,1)[e?"animate":"css"](g,c.animate),d.options.range===!0&&(d.orientation==="horizontal"?(b===0&&d.range.stop(1,1)[e?"animate":"css"]({left:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({width:f-h+"%"},{queue:!1,duration:c.animate})):(b===0&&d.range.stop(1,1)[e?"animate":"css"]({bottom:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({height:f-h+"%"},{queue:!1,duration:c.animate}))),h=f}):(i=this.value(),j=this._valueMin(),k=this._valueMax(),f=k!==j?(i-j)/(k-j)*100:0,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",this.handle.stop(1,1)[e?"animate":"css"](g,c.animate),b==="min"&&this.orientation==="horizontal"&&this.range.stop(1,1)[e?"animate":"css"]({width:f+"%"},c.animate),b==="max"&&this.orientation==="horizontal"&&this.range[e?"animate":"css"]({width:100-f+"%"},{queue:!1,duration:c.animate}),b==="min"&&this.orientation==="vertical"&&this.range.stop(1,1)[e?"animate":"css"]({height:f+"%"},c.animate),b==="max"&&this.orientation==="vertical"&&this.range[e?"animate":"css"]({height:100-f+"%"},{queue:!1,duration:c.animate}))}}),a.extend(a.ui.slider,{version:"1.8.18"})})(jQuery);;/*!
 * jQuery Selectbox plugin 0.2
 *
 * Copyright 2011-2012, Dimitar Ivanov (http://www.bulgaria-web-developers.com/projects/javascript/selectbox/)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * Date: Tue Jul 17 19:58:36 2012 +0300
 */
(function ($, undefined) {
    var PROP_NAME = 'selectbox',
        FALSE = false,
        TRUE = true;
    /**
     * Selectbox manager.
     * Use the singleton instance of this class, $.selectbox, to interact with the select box.
     * Settings for (groups of) select boxes are maintained in an instance object,
     * allowing multiple different settings on the same page
     */
    function Selectbox() {
        this._state = [];
        this._defaults = { // Global defaults for all the select box instances
            classHolder: "ui-selectbox",
            classHolderDisabled: "sbHolderDisabled",
            classSelector: "ui-selector",
            classOptions: "ui-autocomplete ui-menu",
            classOptionsItem: "ui-menu-item",
            classGroup: "sbGroup",
            classSub: "sbSub",
            classDisabled: "ui-state-disabled",
            classToggleOpen: "ui-state-open",
            classToggle: "ui-toggle",
            classFocus: "ui-state-hover",
            speed: 200,
            effect: "slide", // "slide" or "fade"
            onChange: null, //Define a callback function when the selectbox is changed
            onOpen: null, //Define a callback function when the selectbox is open
            onClose: null //Define a callback function when the selectbox is closed
        };
    }

    $.extend(Selectbox.prototype, {
        /**
         * Is the first field in a jQuery collection open as a selectbox
         *
         * @param {Object} target
         * @return {Boolean}
         */
        _isOpenSelectbox: function (target) {
            if (!target) {
                return FALSE;
            }
            var inst = this._getInst(target);
            return inst.isOpen;
        },
        /**
         * Is the first field in a jQuery collection disabled as a selectbox
         *
         * @param {HTMLElement} target
         * @return {Boolean}
         */
        _isDisabledSelectbox: function (target) {
            if (!target) {
                return FALSE;
            }
            var inst = this._getInst(target);
            return inst.isDisabled;
        },
        /**
         * Attach the select box to a jQuery selection.
         *
         * @param {HTMLElement} target
         * @param {Object} settings
         */
        _attachSelectbox: function (target, settings) {
            if (this._getInst(target)) {
                return FALSE;
            }
            var $target = $(target),
                self = this,
                inst = self._newInst($target),
                sbHolder, sbSelector, sbToggle, sbOptions,
                s = FALSE, optGroup = $target.find("optgroup"), opts = $target.find("option"), olen = opts.length;

            $target.attr("sb", inst.uid);

            $.extend(inst.settings, self._defaults, settings);
            self._state[inst.uid] = FALSE;
            $target.hide();

            function closeOthers() {
                var key, sel,
                    uid = this.attr("id").split("_")[1];
                for (key in self._state) {
                    if (key !== uid) {
                        if (self._state.hasOwnProperty(key)) {
                            sel = $("select[sb='" + key + "']")[0];
                            if (sel) {
                                self._closeSelectbox(sel);
                            }
                        }
                    }
                }
            }

            sbHolder = $("<div>", {
                "id": "sbHolder_" + inst.uid,
                "class": inst.settings.classHolder,
                "tabindex": $target.attr("tabindex")
            });

            sbSelector = $("<a>", {
                "id": "sbSelector_" + inst.uid,
                "href": "#",
                "class": inst.settings.classSelector,
                "click": function (e) {
                    e.preventDefault();
                    closeOthers.apply($(this), []);
                    var uid = $(this).attr("id").split("_")[1];
                    if (self._state[uid]) {
                        self._closeSelectbox(target);
                    } else {
                        self._openSelectbox(target);
                    }
                }
            });

            sbToggle = $("<a>", {
                "id": "sbToggle_" + inst.uid,
                "href": "#",
                "class": inst.settings.classToggle,
                "click": function (e) {
                    e.preventDefault();
                    closeOthers.apply($(this), []);
                    var uid = $(this).attr("id").split("_")[1];
                    if (self._state[uid]) {
                        self._closeSelectbox(target);
                    } else {
                        self._openSelectbox(target);
                    }
                }
            });
            sbToggle.appendTo(sbHolder);

            sbOptions = $("<ul>", {
                "id": "sbOptions_" + inst.uid,
                "class": inst.settings.classOptions,
                "css": {
                    "display": "none"
                }
            });

            $target.children().each(function(i) {
                var that = $(this), li, config = {};
                if (that.is("option")) {
                    getOptions(that);
                } else if (that.is("optgroup")) {
                    li = $("<li>");
                    $("<span>", {
                        "text": that.attr("label")
                    }).addClass(inst.settings.classGroup).appendTo(li);
                    li.appendTo(sbOptions);
                    if (that.is(":disabled")) {
                        config.disabled = true;
                    }
                    config.sub = true;
                    getOptions(that.find("option"), config);
                }
            });

            function getOptions () {
                var sub = arguments[1] && arguments[1].sub ? true : false,
                    disabled = arguments[1] && arguments[1].disabled ? true : false;
                arguments[0].each(function (i) {
                    var that = $(this), child;
                    var position = that.index();


                    li = $("<li>", {"class": inst.settings.classOptionsItem});

                    if (that.is(":selected")) {
                        sbSelector.text(that.text());
                        s = TRUE;
                    }

                    // first item
                    if (0 == position) {
                        li.addClass('first');
                    }

                    if (0 != position % 2) {
                        li.addClass('odd');
                    }

                    // last item
                    if (position === olen - 1) {
                        li.addClass("last");
                    }

                    if (!that.is(":disabled") && !disabled) {
                        child = $("<a>", {
                            "href": "#" + that.val(),
                            "rel": that.val()
                        }).text(that.text()).bind("click.sb", function (e) {
                            if (e && e.preventDefault) {
                                e.preventDefault();
                            }
                            var t = sbToggle,
                                 $this = $(this),
                                uid = t.attr("id").split("_")[1];
                            self._changeSelectbox(target, $this.attr("rel"), $this.text());
                            self._closeSelectbox(target);
                        }).bind("mouseover.sb", function () {
                            var $this = $(this);
                            $this.parent().siblings().find("a").removeClass(inst.settings.classFocus);
                            $this.addClass(inst.settings.classFocus);
                        }).bind("mouseout.sb", function () {
                            $(this).removeClass(inst.settings.classFocus);
                        });
                        if (sub) {
                            child.addClass(inst.settings.classSub);
                        }
                        if (that.is(":selected")) {
                            child.addClass(inst.settings.classFocus);
                        }
                        child.appendTo(li);
                    } else {
                        child = $("<span>", {
                            "text": that.text()
                        }).addClass(inst.settings.classDisabled);
                        if (sub) {
                            child.addClass(inst.settings.classSub);
                        }
                        child.appendTo(li);
                    }
                    li.appendTo(sbOptions);
                });
            }

            if (!s) {
                sbSelector.text(opts.first().text());
            }

            $.data(target, PROP_NAME, inst);

            sbHolder.data("uid", inst.uid).bind("keydown.sb", function (e) {
                var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0,
                    $this = $(this),
                    uid = $this.data("uid"),
                    inst = $this.siblings("select[sb='"+uid+"']").data(PROP_NAME),
                    trgt = $this.siblings(["select[sb='", uid, "']"].join("")).get(0),
                    $f = $this.find("ul").find("a." + inst.settings.classFocus);
                switch (key) {
                    case 37: //Arrow Left
                    case 38: //Arrow Up
                        if ($f.length > 0) {
                            var $next;
                            $("a", $this).removeClass(inst.settings.classFocus);
                            $next = $f.parent().prevAll("li:has(a)").eq(0).find("a");
                            if ($next.length > 0) {
                                $next.addClass(inst.settings.classFocus).focus();
                                $("#sbSelector_" + uid).text($next.text());
                            }
                        }
                        break;
                    case 39: //Arrow Right
                    case 40: //Arrow Down
                        var $next;
                        $("a", $this).removeClass(inst.settings.classFocus);
                        if ($f.length > 0) {
                            $next = $f.parent().nextAll("li:has(a)").eq(0).find("a");
                        } else {
                            $next = $this.find("ul").find("a").eq(0);
                        }
                        if ($next.length > 0) {
                            $next.addClass(inst.settings.classFocus).focus();
                            $("#sbSelector_" + uid).text($next.text());
                        }
                        break;
                    case 13: //Enter
                        if ($f.length > 0) {
                            self._changeSelectbox(trgt, $f.attr("rel"), $f.text());
                        }
                        self._closeSelectbox(trgt);
                        break;
                    case 9: //Tab
                        if (trgt) {
                            var inst = self._getInst(trgt);
                            if (inst/* && inst.isOpen*/) {
                                if ($f.length > 0) {
                                    self._changeSelectbox(trgt, $f.attr("rel"), $f.text());
                                }
                                self._closeSelectbox(trgt);
                            }
                        }
                        var i = parseInt($this.attr("tabindex"), 10);
                        if (!e.shiftKey) {
                            i++;
                        } else {
                            i--;
                        }
                        $("*[tabindex='" + i + "']").focus();
                        break;
                    case 27: //Escape
                        self._closeSelectbox(trgt);
                        break;
                }
                e.stopPropagation();
                return false;
            }).delegate("a", "mouseover", function (e) {
                $(this).addClass(inst.settings.classFocus);
            }).delegate("a", "mouseout", function (e) {
                $(this).removeClass(inst.settings.classFocus);
            });

            sbSelector.appendTo(sbHolder);
            sbOptions.appendTo(sbHolder);
            sbHolder.insertAfter($target);

            $("html").live('mousedown', function(e) {
                e.stopPropagation();
                $("select").selectbox('close');
            });
            $([".", inst.settings.classHolder, ", .", inst.settings.classSelector].join("")).mousedown(function(e) {
                e.stopPropagation();
            });
        },
        /**
         * Remove the selectbox functionality completely. This will return the element back to its pre-init state.
         *
         * @param {HTMLElement} target
         */
        _detachSelectbox: function (target) {
            var inst = this._getInst(target);
            if (!inst) {
                return FALSE;
            }
            $("#sbHolder_" + inst.uid).remove();
            $.data(target, PROP_NAME, null);
            $(target).show();
        },
        /**
         * Change selected attribute of the selectbox.
         *
         * @param {HTMLElement} target
         * @param {String} value
         * @param {String} text
         */
        _changeSelectbox: function (target, value, text) {
            var onChange,
                inst = this._getInst(target);
            if (inst) {
                onChange = this._get(inst, 'onChange');
                $("#sbSelector_" + inst.uid).text(text);
            }
            value = value.replace(/\'/g, "\\'");
            $(target).find("option[value='" + value + "']").attr("selected", TRUE);
            if (inst && onChange) {
                onChange.apply((inst.input ? inst.input[0] : null), [value, inst]);
            } else if (inst && inst.input) {
                inst.input.trigger('change');
            }
        },
        /**
         * Enable the selectbox.
         *
         * @param {HTMLElement} target
         */
        _enableSelectbox: function (target) {
            var inst = this._getInst(target);
            if (!inst || !inst.isDisabled) {
                return FALSE;
            }
            $("#sbHolder_" + inst.uid).removeClass(inst.settings.classHolderDisabled);
            inst.isDisabled = FALSE;
            $.data(target, PROP_NAME, inst);
        },
        /**
         * Disable the selectbox.
         *
         * @param {HTMLElement} target
         */
        _disableSelectbox: function (target) {
            var inst = this._getInst(target);
            if (!inst || inst.isDisabled) {
                return FALSE;
            }
            $("#sbHolder_" + inst.uid).addClass(inst.settings.classHolderDisabled);
            inst.isDisabled = TRUE;
            $.data(target, PROP_NAME, inst);
        },
        /**
         * Get or set any selectbox option. If no value is specified, will act as a getter.
         *
         * @param {HTMLElement} target
         * @param {String} name
         * @param {Object} value
         */
        _optionSelectbox: function (target, name, value) {
            var inst = this._getInst(target);
            if (!inst) {
                return FALSE;
            }
            //TODO check name
            inst[name] = value;
            $.data(target, PROP_NAME, inst);
        },
        /**
         * Call up attached selectbox
         *
         * @param {HTMLElement} target
         */
        _openSelectbox: function (target) {
            var inst = this._getInst(target);
            //if (!inst || this._state[inst.uid] || inst.isDisabled) {
            if (!inst || inst.isOpen || inst.isDisabled) {
                return;
            }
            var    el = $("#sbOptions_" + inst.uid),
                viewportHeight = parseInt($(window).height(), 10),
                offset = $("#sbHolder_" + inst.uid).offset(),
                scrollTop = $(window).scrollTop(),
                height = el.prev().height(),
                diff = viewportHeight - (offset.top - scrollTop) - height / 2,
                onOpen = this._get(inst, 'onOpen');
            el.css({
                "top": height + "px",
                "maxHeight": (diff - height) + "px"
            });
            inst.settings.effect === "fade" ? el.fadeIn(inst.settings.speed) : el.slideDown(inst.settings.speed);
            $("#sbToggle_" + inst.uid).addClass(inst.settings.classToggleOpen);
            this._state[inst.uid] = TRUE;
            inst.isOpen = TRUE;
            if (onOpen) {
                onOpen.apply((inst.input ? inst.input[0] : null), [inst]);
            }
            $.data(target, PROP_NAME, inst);
        },
        /**
         * Close opened selectbox
         *
         * @param {HTMLElement} target
         */
        _closeSelectbox: function (target) {
            var inst = this._getInst(target);
            //if (!inst || !this._state[inst.uid]) {
            if (!inst || !inst.isOpen) {
                return;
            }
            var onClose = this._get(inst, 'onClose');
            inst.settings.effect === "fade" ? $("#sbOptions_" + inst.uid).fadeOut(inst.settings.speed) : $("#sbOptions_" + inst.uid).slideUp(inst.settings.speed);
            $("#sbToggle_" + inst.uid).removeClass(inst.settings.classToggleOpen);
            this._state[inst.uid] = FALSE;
            inst.isOpen = FALSE;
            if (onClose) {
                onClose.apply((inst.input ? inst.input[0] : null), [inst]);
            }
            $.data(target, PROP_NAME, inst);
        },
        /**
         * Create a new instance object
         *
         * @param {HTMLElement} target
         * @return {Object}
         */
        _newInst: function(target) {
            var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1');
            return {
                id: id,
                input: target,
                uid: Math.floor(Math.random() * 99999999),
                isOpen: FALSE,
                isDisabled: FALSE,
                settings: {}
            };
        },
        /**
         * Retrieve the instance data for the target control.
         *
         * @param {HTMLElement} target
         * @return {Object} - the associated instance data
         * @throws error if a jQuery problem getting data
         */
        _getInst: function(target) {
            try {
                return $.data(target, PROP_NAME);
            }
            catch (err) {
                throw 'Missing instance data for this selectbox';
            }
        },
        /**
         * Get a setting value, defaulting if necessary
         *
         * @param {Object} inst
         * @param {String} name
         * @return {Mixed}
         */
        _get: function(inst, name) {
            return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
        }
    });

    /**
     * Invoke the selectbox functionality.
     *
     * @param {Object|String} options
     * @return {Object}
     */
    $.fn.selectbox = function (options) {

        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == 'string' && options == 'isDisabled') {
            return $.selectbox['_' + options + 'Selectbox'].apply($.selectbox, [this[0]].concat(otherArgs));
        }

        if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string') {
            return $.selectbox['_' + options + 'Selectbox'].apply($.selectbox, [this[0]].concat(otherArgs));
        }

        return this.each(function() {
            typeof options == 'string' ?
                $.selectbox['_' + options + 'Selectbox'].apply($.selectbox, [this].concat(otherArgs)) :
                $.selectbox._attachSelectbox(this, options);
        });
    };

    $.selectbox = new Selectbox(); // singleton instance
    $.selectbox.version = "0.2";
})(jQuery);;/**
 * jQuery Validation Plugin 1.9.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			options && options.debug && window.console && console.warn( "nothing selected, can't validate, returning nothing" );
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data(this[0], 'validator');
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr('novalidate', 'novalidate');

		validator = new $.validator( options, this[0] );
		$.data(this[0], 'validator', validator);

		if ( validator.settings.onsubmit ) {

			var inputsAndButtons = this.find("input, button");

			// allow suppresing validation by adding a cancel class to the submit button
			inputsAndButtons.filter(".cancel").click(function () {
				validator.cancelSubmit = true;
			});

			// when a submitHandler is used, capture the submitting button
			if (validator.settings.submitHandler) {
				inputsAndButtons.filter(":submit").click(function () {
					validator.submitButton = this;
				});
			}

			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug )
					// prevent form submit to be able to see console output
					event.preventDefault();

				function handle() {
					if ( validator.settings.submitHandler ) {
						if (validator.submitButton) {
							// insert a hidden input as a replacement for the missing submit button
							var hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
						}
						validator.settings.submitHandler.call( validator, validator.currentForm );
						if (validator.submitButton) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}

				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}

		return validator;
	},
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() {
        if ( $(this[0]).is('form')) {
            return this.validate().form();
        } else {
            var valid = true;
            var validator = $(this[0].form).validate();
            this.each(function() {
				valid &= validator.element(this);
            });
            return valid;
        }
    },
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function(attributes) {
		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function(index, value) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function(command, argument) {
		var element = this[0];

		if (command) {
			var settings = $.data(element.form, 'validator').settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				staticRules[element.name] = existingRules;
				if (argument.messages)
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				break;
			case "remove":
				if (!argument) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function(index, method) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}

		var data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.metadataRules(element),
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.staticRules(element)
		), element);

		// make sure required is at front
		if (data.required) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}

		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function(a) {return !$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function(a) {return !!$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function(a) {return !a.checked;}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.validator.format = function(source, params) {
	if ( arguments.length == 1 )
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		};
	if ( arguments.length > 2 && params.constructor != Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor != Array ) {
		params = [ params ];
	}
	$.each(params, function(i, n) {
		source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
};

$.extend($.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function(element, event) {
			this.lastActive = element;

			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				this.settings.unhighlight && this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				this.addWrapper(this.errorsFor(element)).hide();
			}
		},
		onfocusout: function(element, event) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function(element, event) {
			if ( element.name in this.submitted || element == this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function(element, event) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted )
				this.element(element);
			// or option elements, check parent select in that case
			else if (element.parentNode.name in this.submitted)
				this.element(element.parentNode);
		},
		highlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).addClass(errorClass).removeClass(validClass);
			} else {
				$(element).addClass(errorClass).removeClass(validClass);
			}
		},
		unhighlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).removeClass(errorClass).addClass(validClass);
			} else {
				$(element).removeClass(errorClass).addClass(validClass);
			}
		}
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function(settings) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		accept: "Please enter a value with a valid extension.",
		maxlength: $.validator.format("Please enter no more than {0} characters."),
		minlength: $.validator.format("Please enter at least {0} characters."),
		rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
		range: $.validator.format("Please enter a value between {0} and {1}."),
		max: $.validator.format("Please enter a value less than or equal to {0}."),
		min: $.validator.format("Please enter a value greater than or equal to {0}.")
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = (this.groups = {});
			$.each(this.settings.groups, function(key, value) {
				$.each(value.split(/\s/), function(index, name) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function(key, value) {
				rules[key] = $.validator.normalizeRule(value);
			});

			function delegate(event) {
				var validator = $.data(this[0].form, "validator"),
					eventType = "on" + event.type.replace(/^validate/, "");
				validator.settings[eventType] && validator.settings[eventType].call(validator, this[0], event);
			}
			$(this.currentForm)
			       .validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, " +
						"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
						"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
						"[type='week'], [type='time'], [type='datetime-local'], " +
						"[type='range'], [type='color'] ",
						"focusin focusout keyup", delegate)
				.validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

			if (this.settings.invalidHandler)
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() {
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend({}, this.errorMap);
			if (!this.valid())
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valid();
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element );
			if ( result ) {
				delete this.invalid[element.name];
			} else {
				this.invalid[element.name] = true;
			}
			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function(errors) {
			if(errors) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function(element) {
					return !(element.name in errors);
				});
			}
			this.settings.showErrors
				? this.settings.showErrors.call( this, this.errorMap, this.errorList )
				: this.defaultShowErrors();
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() {
			if ( $.fn.resetForm )
				$( this.currentForm ).resetForm();
			this.submitted = {};
			this.lastElement = null;
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass );
		},

		numberOfInvalids: function() {
			return this.objectLength(this.invalid);
		},

		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj )
				count++;
			return count;
		},

		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},

		valid: function() {
			return this.size() == 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element.name == lastActive.name;
			}).length == 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// select all valid inputs inside the form (no submit or reset buttons)
			return $(this.currentForm)
			.find("input, select, textarea")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				!this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) )
					return false;

				rulesCache[this.name] = true;
				return true;
			});
		},

		clean: function( selector ) {
			return $( selector )[0];
		},

		errors: function() {
			return $( this.settings.errorElement + "." + this.settings.errorClass, this.errorContext );
		},

		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.currentElements = $([]);
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $(element).rules();
			var dependencyMismatch = false;
			for (var method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {
					var result = $.validator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );

					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result == "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result == "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}

					if( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
						 + ", check the '" + rule.method + "' method", e);
					throw e;
				}
			}
			if (dependencyMismatch)
				return;
			if ( this.objectLength(rules) )
				this.successList.push(element);
			return true;
		},

		// return the custom message for the given element and validation method
		// specified in the element's "messages" metadata
		customMetaMessage: function(element, method) {
			if (!$.metadata)
				return;

			var meta = this.settings.meta
				? $(element).metadata()[this.settings.meta]
				: $(element).metadata();

			return meta && meta.messages && meta.messages[method];
		},

		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor == String
				? m
				: m[method]);
		},

		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined)
					return arguments[i];
			}
			return undefined;
		},

		defaultMessage: function( element, method) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customMetaMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message == "function" ) {
				message = message.call(this, rule.parameters, element);
			} else if (theregex.test(message)) {
				message = jQuery.format(message.replace(theregex, '{$1}'), rule.parameters);
			}
			this.errorList.push({
				message: message,
				element: element
			});

			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},

		addWrapper: function(toToggle) {
			if ( this.settings.wrapper )
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			return toToggle;
		},

		defaultShowErrors: function() {
			for ( var i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				this.showLabel( error.element, error.message );
			}
			if( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if (this.settings.success) {
				for ( var i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if (this.settings.unhighlight) {
				for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},

		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},

		showLabel: function(element, message) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// check if we have a generated label, replace the message then
				label.attr("generated") && label.html(message);
			} else {
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr({"for":  this.idOrName(element), generated: true})
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length )
					this.settings.errorPlacement
						? this.settings.errorPlacement(label, $(element) )
						: label.insertAfter(element);
			}
			if ( !message && this.settings.success ) {
				label.text("");
				typeof this.settings.success == "string"
					? label.addClass( this.settings.success )
					: this.settings.success( label );
			}
			this.toShow = this.toShow.add(label);
		},

		errorsFor: function(element) {
			var name = this.idOrName(element);
    		return this.errors().filter(function() {
				return $(this).attr('for') == name;
			});
		},

		idOrName: function(element) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		validationTargetFor: function(element) {
			// if radio/checkbox, validate first element in group instead
			if (this.checkable(element)) {
				element = this.findByName( element.name ).not(this.settings.ignore)[0];
			}
			return element;
		},

		checkable: function( element ) {
			return /radio|checkbox/i.test(element.type);
		},

		findByName: function( name ) {
			// select by name and filter by form for performance over form.find("[name=...]")
			var form = this.currentForm;
			return $(document.getElementsByName(name)).map(function(index, element) {
				return element.form == form && element.name == name && element  || null;
			});
		},

		getLength: function(value, element) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) )
					return this.findByName(element.name).filter(':checked').length;
			}
			return value.length;
		},

		depend: function(param, element) {
			return this.dependTypes[typeof param]
				? this.dependTypes[typeof param](param, element)
				: true;
		},

		dependTypes: {
			"boolean": function(param, element) {
				return param;
			},
			"string": function(param, element) {
				return !!$(param, element.form).length;
			},
			"function": function(param, element) {
				return param(element);
			}
		},

		optional: function(element) {
			return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
		},

		startRequest: function(element) {
			if (!this.pending[element.name]) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},

		stopRequest: function(element, valid) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0)
				this.pendingRequest = 0;
			delete this.pending[element.name];
			if ( valid && this.pendingRequest == 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest == 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			}
		},

		previousValue: function(element) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}

	},

	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		dateDE: {dateDE: true},
		number: {number: true},
		numberDE: {numberDE: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},

	addClassRules: function(className, rules) {
		className.constructor == String ?
			this.classRuleSettings[className] = rules :
			$.extend(this.classRuleSettings, className);
	},

	classRules: function(element) {
		var rules = {};
		var classes = $(element).attr('class');
		classes && $.each(classes.split(' '), function() {
			if (this in $.validator.classRuleSettings) {
				$.extend(rules, $.validator.classRuleSettings[this]);
			}
		});
		return rules;
	},

	attributeRules: function(element) {
		var rules = {};
		var $element = $(element);

		for (var method in $.validator.methods) {
			var value;
			// If .prop exists (jQuery >= 1.6), use it to get true/false for required
			if (method === 'required' && typeof $.fn.prop === 'function') {
				value = $element.prop(method);
			} else {
				value = $element.attr(method);
			}
			if (value) {
				rules[method] = value;
			} else if ($element[0].getAttribute("type") === method) {
				rules[method] = true;
			}
		}

		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
			delete rules.maxlength;
		}

		return rules;
	},

	metadataRules: function(element) {
		if (!$.metadata) return {};

		var meta = $.data(element.form, 'validator').settings.meta;
		return meta ?
			$(element).metadata()[meta] :
			$(element).metadata();
	},

	staticRules: function(element) {
		var rules = {};
		var validator = $.data(element.form, 'validator');
		if (validator.settings.rules) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},

	normalizeRules: function(rules, element) {
		// handle dependency check
		$.each(rules, function(prop, val) {
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) {
				delete rules[prop];
				return;
			}
			if (val.param || val.depends) {
				var keepRule = true;
				switch (typeof val.depends) {
					case "string":
						keepRule = !!$(val.depends, element.form).length;
						break;
					case "function":
						keepRule = val.depends.call(element, element);
						break;
				}
				if (keepRule) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});

		// evaluate parameters
		$.each(rules, function(rule, parameter) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});

		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() {
			if (rules[this]) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			if (rules[this]) {
				rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
			}
		});

		if ($.validator.autoCreateRanges) {
			// auto-create ranges
			if (rules.min && rules.max) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if (rules.minlength && rules.maxlength) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		// To support custom messages in metadata ignore rule methods titled "messages"
		if (rules.messages) {
			delete rules.messages;
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function(data) {
		if( typeof data == "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function(name, method, message) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message != undefined ? message : $.validator.messages[name];
		if (method.length < 3) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function(value, element, param) {
			// check if dependency is met
			if ( !this.depend(param, element) )
				return "dependency-mismatch";
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			case 'input':
				if ( this.checkable(element) )
					return this.getLength(value, element) > 0;
			default:
				return $.trim(value).length > 0;
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function(value, element, param) {
			if ( this.optional(element) )
				return "dependency-mismatch";

			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] )
				this.settings.messages[element.name] = {};
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;

			param = typeof param == "string" && {url:param} || param;

			if ( this.pending[element.name] ) {
				return "pending";
			}
			if ( previous.old === value ) {
				return previous.valid;
			}

			previous.old = value;
			var validator = this;
			this.startRequest(element);
			var data = {};
			data[element.name] = value;
			$.ajax($.extend(true, {
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				success: function(response) {
					validator.settings.messages[element.name].remote = previous.originalMessage;
					var valid = response === true;
					if ( valid ) {
						var submitted = validator.formSubmitted;
						validator.prepareElement(element);
						validator.formSubmitted = submitted;
						validator.successList.push(element);
						validator.showErrors();
					} else {
						var errors = {};
						var message = response || validator.defaultMessage( element, "remote" );
						errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
						validator.showErrors(errors);
					}
					previous.valid = valid;
					validator.stopRequest(element, valid);
				}
			}, param));
			return "pending";
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function(value, element, param) {
			var length = this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function(value, element) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function(value, element) {
			return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function(value, element) {
			return this.optional(element) || /^\d+$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			// accept only spaces, digits and dashes
			if (/[^0-9 -]+/.test(value))
				return false;
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				var nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9)
						nDigit -= 9;
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) == 0;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/accept
		accept: function(value, element, param) {
			param = typeof param == "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
			return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function(value, element, param) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param).unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
				$(element).valid();
			});
			return value == target.val();
		}

	}

});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
;(function($) {
	var pendingRequests = {};
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter(function(settings, _, xhr) {
			var port = settings.port;
			if (settings.mode == "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		var ajax = $.ajax;
		$.ajax = function(settings) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if (mode == "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				return (pendingRequests[port] = ajax.apply(this, arguments));
			}
			return ajax.apply(this, arguments);
		};
	}
})(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
;(function($) {
	// only implement if not provided by jQuery core (since 1.4)
	// TODO verify if jQuery 1.4's implementation is compatible with older jQuery special-event APIs
	if (!jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener) {
		$.each({
			focus: 'focusin',
			blur: 'focusout'
		}, function( original, fix ){
			$.event.special[fix] = {
				setup:function() {
					this.addEventListener( original, handler, true );
				},
				teardown:function() {
					this.removeEventListener( original, handler, true );
				},
				handler: function(e) {
					arguments[0] = $.event.fix(e);
					arguments[0].type = fix;
					return $.event.handle.apply(this, arguments);
				}
			};
			function handler(e) {
				e = $.event.fix(e);
				e.type = fix;
				return $.event.handle.call(this, e);
			}
		});
	};
	$.extend($.fn, {
		validateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
})(jQuery);
;/*! Idle Timer v1.0.1 2014-03-21 | https://github.com/thorst/jquery-idletimer | (c) 2014 Paul Irish | Licensed MIT */
!function(a){a.idleTimer=function(b,c){var d;"object"==typeof b?(d=b,b=null):"number"==typeof b&&(d={timeout:b},b=null),c=c||document,d=a.extend({idle:!1,timeout:3e4,events:"mousemove keydown wheel DOMMouseScroll mousewheel mousedown touchstart touchmove MSPointerDown MSPointerMove"},d);var e=a(c),f=e.data("idleTimerObj")||{},g=function(b){var d=a.data(c,"idleTimerObj")||{};d.idle=!d.idle,d.olddate=+new Date;var e=a.Event((d.idle?"idle":"active")+".idleTimer");a(c).trigger(e,[c,a.extend({},d),b])},h=function(b){var d=a.data(c,"idleTimerObj")||{};if(null==d.remaining){if("mousemove"===b.type){if(b.pageX===d.pageX&&b.pageY===d.pageY)return;if("undefined"==typeof b.pageX&&"undefined"==typeof b.pageY)return;var e=+new Date-d.olddate;if(200>e)return}clearTimeout(d.tId),d.idle&&g(b),d.lastActive=+new Date,d.pageX=b.pageX,d.pageY=b.pageY,d.tId=setTimeout(g,d.timeout)}},i=function(){var b=a.data(c,"idleTimerObj")||{};b.idle=b.idleBackup,b.olddate=+new Date,b.lastActive=b.olddate,b.remaining=null,clearTimeout(b.tId),b.idle||(b.tId=setTimeout(g,b.timeout))},j=function(){var b=a.data(c,"idleTimerObj")||{};null==b.remaining&&(b.remaining=b.timeout-(+new Date-b.olddate),clearTimeout(b.tId))},k=function(){var b=a.data(c,"idleTimerObj")||{};null!=b.remaining&&(b.idle||(b.tId=setTimeout(g,b.remaining)),b.remaining=null)},l=function(){var b=a.data(c,"idleTimerObj")||{};clearTimeout(b.tId),e.removeData("idleTimerObj"),e.off("._idleTimer")},m=function(){var b=a.data(c,"idleTimerObj")||{};if(b.idle)return 0;if(null!=b.remaining)return b.remaining;var d=b.timeout-(+new Date-b.lastActive);return 0>d&&(d=0),d};if(null===b&&"undefined"!=typeof f.idle)return i(),e;if(null===b);else{if(null!==b&&"undefined"==typeof f.idle)return!1;if("destroy"===b)return l(),e;if("pause"===b)return j(),e;if("resume"===b)return k(),e;if("reset"===b)return i(),e;if("getRemainingTime"===b)return m();if("getElapsedTime"===b)return+new Date-f.olddate;if("getLastActiveTime"===b)return f.lastActive;if("isIdle"===b)return f.idle}return e.on(a.trim((d.events+" ").split(" ").join("._idleTimer ")),function(a){h(a)}),f=a.extend({},{olddate:+new Date,lastActive:+new Date,idle:d.idle,idleBackup:d.idle,timeout:d.timeout,remaining:null,tId:null,pageX:null,pageY:null}),f.idle||(f.tId=setTimeout(g,f.timeout)),a.data(c,"idleTimerObj",f),e},a.fn.idleTimer=function(b){return this[0]?a.idleTimer(b,this[0]):this}}(jQuery);;/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: DE
 */
jQuery.extend(jQuery.validator.messages, {
	required: "Dieses Feld ist ein Pflichtfeld.",
	maxlength: jQuery.validator.format("Geben Sie bitte maximal {0} Zeichen ein."),
	minlength: jQuery.validator.format("Geben Sie bitte mindestens {0} Zeichen ein."),
	rangelength: jQuery.validator.format("Geben Sie bitte mindestens {0} und maximal {1} Zeichen ein."),
	email: "Geben Sie bitte eine gültige E-Mail Adresse ein.",
	url: "Geben Sie bitte eine gültige URL ein.",
	date: "Bitte geben Sie ein gültiges Datum ein.",
	number: "Geben Sie bitte eine Nummer ein.",
	digits: "Geben Sie bitte nur Ziffern ein.",
	equalTo: "Bitte denselben Wert wiederholen.",
	range: jQuery.validator.format("Geben Sie bitten einen Wert zwischen {0} und {1}."),
	max: jQuery.validator.format("Geben Sie bitte einen Wert kleiner oder gleich {0} ein."),
	min: jQuery.validator.format("Geben Sie bitte einen Wert größer oder gleich {0} ein."),
	creditcard: "Geben Sie bitte ein gültige Kreditkarten-Nummer ein."
});;$(document).ready(function() {
	// Clear input field
	$('input.text.field').focus(function(){
		if($(this).val() === $(this).prop('defaultValue')) {
			$(this).val('');
		}
	});

	// Set old value if input is empty
	$('input.text.field').blur(function(){
		var newValue = $(this).val();
		if ('' === newValue) {
			$(this).val($(this).prop('defaultValue'));
		} 
	});
	// Do something on enter keypress
	$('input.text.field').keypress(function (event) {
		if (event.keyCode === 13) {
		//Start search if value is ok
			if($(this).val().length > 0 && $(this).val() !== $(this).prop('defaultValue')) {
				// submit form
			}
		}	
	});
});;/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var mustache = {};

    factory(mustache);

    root.Mustache = mustache; // <script>
  }
}(this, function (mustache) {

  var Object_toString = Object.prototype.toString;
  var isArray = Array.isArray || function (object) {
    return Object_toString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;
  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }
  
  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    if (!template)
      return [];

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags(tags) {
      if (typeof tags === 'string')
        tags = tags.split(spaceRe, 2);

      if (!isArray(tags) || tags.length !== 2)
        throw new Error('Invalid tags: ' + tags);

      openingTagRe = new RegExp(escapeRegExp(tags[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tags[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tags[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n')
            stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view == null ? {} : view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function (name) {
    var cache = this.cache;

    var value;
    if (name in cache) {
      value = cache[name];
    } else {
      var context = this, names, index;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          while (value != null && index < names.length)
            value = value[names[index++]];
        } else {
          value = context.view[name];
        }

        if (value != null)
          break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null)
      tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function (tokens, context, partials, originalTemplate) {
    var buffer = '';

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    var self = this;
    function subRender(template) {
      return self.render(template, context, partials);
    }

    var token, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
        value = context.lookup(token[1]);

        if (!value)
          continue;

        if (isArray(value)) {
          for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
            buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
          }
        } else if (typeof value === 'object' || typeof value === 'string') {
          buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else if (isFunction(value)) {
          if (typeof originalTemplate !== 'string')
            throw new Error('Cannot use higher-order sections without the original template');

          // Extract the portion of the original template that the section contains.
          value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

          if (value != null)
            buffer += value;
        } else {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '^':
        value = context.lookup(token[1]);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0))
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);

        break;
      case '>':
        if (!partials)
          continue;

        value = isFunction(partials) ? partials(token[1]) : partials[token[1]];

        if (value != null)
          buffer += this.renderTokens(this.parse(value), context, partials, value);

        break;
      case '&':
        value = context.lookup(token[1]);

        if (value != null)
          buffer += value;

        break;
      case 'name':
        value = context.lookup(token[1]);

        if (value != null)
          buffer += mustache.escape(value);

        break;
      case 'text':
        buffer += token[1];
        break;
      }
    }

    return buffer;
  };

  mustache.name = "mustache.js";
  mustache.version = "0.8.1";
  mustache.tags = [ "{{", "}}" ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

}));
;(function ($) { // Anonyme Funktion ausführe, Scope setzen, Variablen "verstecken"
	var options = {};
	var Background = function (e, o) { // Hintergrundbox-Klasse

		this.init = function (e, o) { // Konstruktor
			var sel,con,close,bg,track;
			var defaults = {
				"selector": 'li',
				"content": '.popup',
				"close": '.close'
			}
			options = jQuery.extend(defaults, o); // Eigene Optionen mit Defaults zusammenführen
			sel = options.selector;
			con = options.content;
			close = options.close;
			track = options.track;
			bg = $(e); // Referenz self
			if (!bg) { // Keine Hintergrundbox gefunden -> Abbrechen
				return false;
			}
			// Options auslesen und zwischenspeichern
			url = options.url;
			if(url == '') {
				return false;
			}
			$(sel+"[id*=bg]",bg).click( function(event) {
				if(event.target == this) {
					$(sel,bg).not(this).removeClass("active");
					$(this).toggleClass("active");
					if (typeof(getCounters) != "undefined") {
						getCounters(track);
					}
				}
			});
			$(close,bg).click( function(event) {
				event.stopPropagation();
				$(sel,bg).removeClass("active");
			});
		};
		this.init(e, o); // Konstruktor
	};
	$.fn.WON_BackgroundPlugin = function (options) { // jQuery.fn um Plugin erweitern
		options = options || {};
		return this.each( function () { // This returnen, um jQuery-Chainability zu sichern
			new Background($(this), options) // neues Objekt erzeugen
		});
	};
})(jQuery);
;asms.general.ece.widgets.disqus = (function($) {

  /* Config
   *
   * Boolean:
   * disqussion        -> discussion article, disqus area always shown, no toggle button
   *
   */

  var cfg = {
    disqussion    : false,
    wt_identifier : '_disqus_openclose_'
  };


  /** function showDisqusThread
   * - show Disqus Thread
   * - hide Disqus Button
   * - disable dimming effect on modul header
   *
   * @change CCIESC-7103: sjunker: Webtrekk call
   * @change OA-1446: isavchen: Webtrekk neue Version
   */
  function showDisqusThread() {
    jQuery(".disqus.articleComments .header").removeClass("dimmed").unbind("click");
    jQuery("#dsqButton").addClass("hidden");
    jQuery(".disqusWrapper").css({height:"auto"});

    if (typeof wt !== "undefined" && 'function' === typeof wt.sendinfo) {
        wt.sendinfo({linkId:cfg.wt_identifier});
    }
  }


  /* function
   * - read URL hash
   * - call showDisqusThread() if there is a hash
   */
  function readUrlHash() {
    if (document.location.hash.indexOf("#") != -1) {
      showDisqusThread();
    }
  }

  /* function
   * if it's a discussion article:
   * - hide toggle button
   * - call showDisqusThread()
   */
  function setDisqussion() {
    if (cfg.disqussion) {
      showDisqusThread();
    }
  }

  var methods = {
    init : function(config) {
      // extends cfg with asms.config
      cfg = jQuery.extend(cfg, config || {});

      // hide button on discussion
      setDisqussion();

      // click function for toggle button inside the Disqus widget
      jQuery("#dsqButton").click(function(){showDisqusThread()});
      jQuery(".disqus.articleComments .header").click(function(){showDisqusThread()});

      // click function for article comment link
      // .commentCount -> WON
      // .socMedArtComment a -> BMO
      jQuery("#viewport.article .commentCount, #viewport.article .socMedArtComment a, #viewport.article .disqus-counter a").each(function(){ $(this).click(function() {showDisqusThread();} )});

      // show Disqus if there is a hash
      readUrlHash();
    }
  }

  return methods;

})(jQuery);;/**
 * Election Widget functionality
 * Reads the data from a json object
 *
 * @author Steve Junker <steve.junker@axelspringer.de>,
 *         Bastian Melhorn <bastian.mehlhorn@axelspringer.de> (Linechart),
 *         Mucha, Viktor <viktor.mucha@axelspringer.de> (Barchart)
 *
 * @uses jQuery, jQuery ui, jQuery ui slider, jQuery tools tabs, jQuery ui combobox
 *       asms.addZero, asms.getDaysBetween, asms.formatDate
 */
asms.general.ece.widgets.election = (function($, window, document, undefined) {
    var options = {
        "dataUrl"  : "",
        "dataJson" : {
            "timelineDays"      : "394",
            "timelineStartDate" : 1330606598238,
            "timelineEndDate"   : 1364730998238,
            "surveys"           : [],
            "parties"           : []
        },
        "selector"       : '.election',
        "scalarSelector" : '.scalar',
        "slider"         : {
            "fadeSpeed" : 300,
            "delay"     : 400
        },
        "barChart" : {
            "article" : {
                "height"          : 295, // svg height
                "width"           : 580, // svg width
                "xOffset"         : 26,  // left space to first bar
                "overlayOffset"   : 40,  // gap between bar and overlay
                "barWidth"        : 50,  // width of one bar
                "barGap"          : 25,  // space between bars
                "xLegendFontSize" : "11px"
            },
            "section" : {
                "height"          : 295,
                "width"           : 940,
                "xOffset"         : 64,
                "overlayOffset"   : 40,
                "barWidth"        : 60,
                "barGap"          : 50,
                "xLegendFontSize" : "13px"
            },
            "design" : {
               "fvePctBg"        : '#F5FAFC',
               "xLegendColor"    : "#222",
               "overlayBgColor"  : "#FFF"
            }
        },
        "lineChart" : {
            "article" : {
                "maxPerc" : 50,
                "width"   : 600,
                "height"  : 270,
                "padding" : {
                    "top"    : 10,
                    "left"   : 35,
                    "bottom" : 60,
                    "right"  : 10
                }
            },
            "section" : {
                "maxPerc" : 50,
                "width"   : 949,
                "height"  : 270,
                "padding" : {
                    "top"    : 10,
                    "left"   : 35,
                    "bottom" : 60,
                    "right"  : 10
                }
            }
        }
    };

    var $widget, $slider, view, map;
    var instituteIndex = 0; // index from table row class

    var offsetLabel,  // Abstand zur Beschriftung
        bars, // Balkenreferenz
        r,  // Raphael
        yMax, // Maximalwert auf Y-Achse
        parties,  // Farbkonfiguration der Balken
        offsetY, // Abstand Container -> eigentlichem Diagramm
        barYgap, // y-Abstand zwischen Prozentlinien
        barMax, // Höhe des eigentlichen Diagramms
        barData = [];  // Balkendatensätze

    var linechart = undefined;
    var drawnElements = undefined;

    /**
     * Returns the nearest map data position where index is not -1
     *
     * @param int slider value
     *
     * @return int
     */
    function getNearestIndex(value) {
        var downValue = false;
        var upValue = false;

        var _sliderTimeline = options.barChart.sliderTimeline;

        // look into the future
        var i;
        for (i = value; i < _sliderTimeline.length; i++) {
            if (-1 != _sliderTimeline[i].index) {
                upValue = i;
                break;
            }
        }

        // look into the past
        for (i = value; i > 0; i--) {
            if (-1 != _sliderTimeline[i].index) {
                downValue = i;
                break;
            }
        }

        if (false === downValue) {
            return upValue;
        }

        if (false === upValue) {
            return downValue;
        }

        // future over past
        if (upValue <= downValue) {
            return upValue;
        } else {
            return downValue;
        }
    }

    function initBarchart(config) {
        $container = $('.chart.bar', $widget)[0];
        barYgap = 40; // space between rows
        offsetY = 55;
        offsetLabel = 40;
        barMax = config.height - offsetLabel - offsetY;
        yMax = 50;
        bars = [];
        r = Raphael($container, config.width, config.height);
        r.setViewBox(0, 0, config.width, config.height, true);
        paintChartAxisY(config);
    }

    function paintChartAxisY() {
        for (var o = 0; o < 5; o++) {
            var positionY = o * barYgap + offsetY;
            var percent = yMax - o * 10;
            r.text(30, positionY, getPercentFromHeight(barMax - (o * barYgap)) + " %").attr({
                "text-anchor" : "end",
                "font-size" : "11px",
                "font-family" : "Arial",
                "fill" : "#222"
            });
            r.path("M35," + positionY + "H940").attr({
                "stroke-dasharray" : "-",
                stroke : "#ccc",
                "stroke-width" : "1"
            });
        }
        positionY += 20;
        // 5% background
        var rect = r.rect(35, positionY, 905, 20).attr({
            stroke : "none",
            fill : options.barChart.design.fvePctBg
        });
        $(rect.node).css({
            "pointer-events" : "none"
        });
        debug = rect;
        // 5% upper line
        r.path("M35," + positionY + "H940").attr({
            "stroke-dasharray" : "-",
            stroke : "#ccc",
            "stroke-width" : "1"
        });
        // 5% text
        r.text(30, positionY, "5 %").attr({
            "text-anchor" : "end",
            "font-family" : "Arial",
            "fill" : "#222"
        });
        positionY += 20;
        // bottom line
        r.path("M35," + positionY + "H940").attr({
            stroke : "#ececec",
            "stroke-width" : 1
        });
    }

    function calcBarX(i, Dpx, apx, bwv, bsv) {
        if (Dpx < 1 || bwv < 1 || bsv < 1 || i < 0) {
            return [];
        }

        function barStart(k) {
            var sum = 0;
            if (i > 1) {
                sum = (k - 1) * (Dpx - 2 * apx) * (1 / ((1 + bsv / bwv) * i) + bsv / ((bwv + bsv) * (i - 1)));
            }
            sum += apx;
            sum = parseInt(sum + .5);
            return sum;
        }
        function barEnd(k) {
            var sum = 0;
            if (i < 2) {
                sum = Dpx - apx;
            } else {
                sum = (Dpx - 2 * apx) * (1 / ((1 + bsv / bwv) * i) * k + (bsv / ((bwv + bsv) * (i - 1))) * (k - 1));
                sum += apx;
            }
            sum = parseInt(sum + .5);
            return sum;
        }

        var barX = [];

        for ( var idx = 1; idx <= i; idx++) {
            var start = barStart(idx);
            var end = barEnd(idx);
            barX.push({
                s : start,
                e : end,
                bw : end - start
            });
        }
        return barX;
    }


    function _initBars(config) {
        var _coodOffsetX = 35;

        var _nBars = options.dataJson.parties.length - 1; // Anzahl Balken
        var _parties = options.dataJson.parties;

        var _data = options.dataJson.surveys[0].values[0];
        var _barData = new Array();
        for (var o = 0; o < _data.results.length; o++) {
            _barData[o] = {};
            _barData[o].value = _data.results[o].value * 1;
            _barData[o].difference = _data.results[o].difference;
        }

        var _bars = calcBarX(_parties.length, config.width - _coodOffsetX, 40, 5, 2);

        for (var i = 0; i <= _nBars; i++) {
            bars[i] = {};

            // x-Legend
            r.text(_bars[i].s + _coodOffsetX + (_bars[i].bw / 2), config.height - 28, _parties[i].name.toUpperCase()).attr({
                "fill" : options.barChart.design.xLegendColor,
                "text-anchor" : "middle",
                "font-size" : config.xLegendFontSize
            });

            var overlayBgWidth = 80;
            var overlayBgheight = 47;

            var overlayX = _bars[i].s + _coodOffsetX + (_bars[i].bw / 2) - (overlayBgWidth / 2);
            var overlayY = config.height - offsetLabel - config.overlayOffset - parseInt(getBarheightFromPercent(_barData[i].value < 0 ? 0 : _barData[i].value));

            // overlay background
            bars[i].overlayBg = r.rect(overlayX, overlayY - 13, overlayBgWidth, overlayBgheight).attr({
                stroke : 'none',
                fill : options.barChart.design.overlayBgColor,
                opacity : 0
            });


            // the bar
            bars[i].rect = r.rect(_bars[i].s + _coodOffsetX, config.height - offsetLabel, _bars[i].bw, 0).attr({
                stroke : 'none',
                fill : _parties[i].color
            }).animate({
                height : parseInt(getBarheightFromPercent(_barData[i].value < 0 ? 0 : _barData[i].value)),
                y : config.height - offsetLabel - parseInt(getBarheightFromPercent(_barData[i].value < 0 ? 0 : _barData[i].value))
            }, 1000, ">").data("id", i);
            bars[i].rect.node.setAttribute("class", "bar");


            // bar value
            var overlayText = undefined;
            if(_barData[i].value < 0) {
                overlayText = "-";
            } else {
                overlayText = _barData[i].value.toString().replace(".", ",") + " %";
            }

            bars[i].overlay = r.text(_bars[i].s + _coodOffsetX + (_bars[i].bw / 2), overlayY, overlayText).attr({
                "font-size" : "23px",
                "font-family" : "Georgia",
                fill : _parties[i].color,
                opacity : 0
            });
            // bar value difference
            bars[i].difference = r.text(_bars[i].s + _coodOffsetX + (_bars[i].bw / 2), overlayY + 25, "(" + _barData[i].difference + "*)").attr({
                "font-size" : "11px",
                "font-family" : "Arial",
                fill : "#222",
                opacity : 0
            });

            bars[i].rect.hover(function() {
                var dataID = this.data("id");
                bars[dataID].overlayBg.animate({"opacity": 1}, 200, ">");
                bars[dataID].overlay.animate({"opacity": 1}, 200, ">");
                bars[dataID].difference.animate({"opacity": 1}, 200, ">");
            },function() {
                var dataID = this.data("id");
                bars[dataID].overlayBg.animate({"opacity": 0}, 200, ">");
                bars[dataID].overlay.animate({"opacity": 0}, 200, ">");
                bars[dataID].difference.animate({"opacity":0},200,">");
            });
        }
    }

    function getPercentFromHeight(height) {
        var percent = height / ((barMax) / yMax);
        return percent;
    }

    function getBarheightFromPercent(percent) {
        var height = ((barMax) / yMax) * percent;

        return height;
    }

    function updateBars(index, institute, config) {
        var _data;
        if ("undefined" != typeof institute) {
            _data = options.dataJson.surveys[index].values[institute];
        } else {
            _data = options.dataJson.surveys[index].values[0];
        }

        var _barData = new Array();
        for (var o = 0; o < _data.results.length; o++) {
            _barData[o] = {};
            _barData[o].value = _data.results[o].value * 1;
            _barData[o].difference = _data.results[o].difference;
        }

        var _nBars = options.dataJson.parties.length - 1; // Anzahl Balken

        if (bars.length > 0) {
            for (var i = 0; i <= _nBars; i++) {
                var overlayY = config.height - offsetLabel - config.overlayOffset - parseInt(getBarheightFromPercent(_barData[i].value < 0 ? 0 : _barData[i].value));

                bars[i].rect.animate({
                    height : parseInt(getBarheightFromPercent(_barData[i].value < 0 ? 0 : _barData[i].value)),
                    y : config.height - offsetLabel - parseInt(getBarheightFromPercent(_barData[i].value < 0 ? 0 : _barData[i].value))
                }, 1000, ">");
                bars[i].overlayBg.animate({
                    y : overlayY - 13
                }, 1000, ">");

                var overlayText = undefined;
                if(_barData[i].value < 0) {
                    overlayText = "-";
                } else {
                    overlayText = _barData[i].value.toString().replace(".", ",") + " %";
                }

                bars[i].overlay.attr("text", overlayText).animate({
                    y : overlayY
                }, 1000, ">");
                bars[i].difference.attr("text", "(" + _barData[i].difference + "*)").animate({
                    y : overlayY + 25
                }, 1000, ">");
            }
        }
    }

    /**
     * Returns the type of view
     *
     * @return string article|section
     */
    function getViewType() {
        if (true === $widget.hasClass('electionTrendArticle')) {
            return 'article';
        } else {
            return 'section';
        }
    }

    /**
     * Generates a map that contains the date as timestamp
     * and the index of the survey position with the same date
     * e.g. map = [{"date":1364730998238, "index": -1},
     *             {"date":1364730998238, "index": 2}
     *            ]
     *
     * @return array of objects
     */
    function generateMap() {
        var map = [];
        var date = new Date(options.dataJson.timelineStartDate);

        for (var days = 0; days <= options.dataJson.timelineDays; days++) {
            date.setDate(date.getDate() + 1);
            var index = getSurveyByDate(date);

            map.push({
                "date" : date.getTime(),
                "index" : index
            });
        }

        return map;
    }

    /**
     * Iterates through the map to find the first object
     * where the survey index is not -1 and returns the map index
     *
     * @param array The map
     *
     * @return int
     */
    function getLatestSurveyIndex() {
        var sliderTimeline = options.barChart.sliderTimeline;

        if(sliderTimeline.length == 0) {
            return undefined;
        }

        var sliderValue = sliderTimeline.length - 1;

        // find the survey index in the map
        while (0 != sliderTimeline[sliderValue].index
               && 0 <= sliderValue
        ) {
            sliderValue--;
        }

        return sliderValue;
    }

    /**
     * Interates through the survey list
     * and returns the survey index where the dates are equal
     *
     * @uses asms.formatDate
     * @param datetime
     *
     * @return int
     */
    function getSurveyByDate(date) {
        for (var index in options.dataJson.surveys) {
            if (asms.formatDate(date) == options.dataJson.surveys[index].date) {
                return index;
            }
        }
        return -1;
    }

    /**
     * Get institute index from classes
     * e. g. class="even current institute_0 i_emnid"
     *
     * @param string value
     *
     * @return int
     */
    function getInstituteIndexFromString(value) {
        var index = value.match(/institute_(\d+)/);

        if (null !== index
            && "string" === typeof index[1]
        ) {
            return parseInt(index[1]);
        }

        return 0;
    }

    /**
     * Get institute uniqueName from classes
     * e. g. class="even current institute_0 i_emnid"
     *
     * @param string value
     *
     * @return string
     */
    function getInstituteUniqueNameFromString(value) {
        var instituteUniqueName = value.match(/i_(\w+)/);

        if (null !== instituteUniqueName
            && "string" === typeof instituteUniqueName[1]
        ) {
            return instituteUniqueName[1];
        }

        return "";
    }

    // --- Linechart ---------------------------------------------------------
    // # Documentation:
    // # https://as-wiki.axelspringer.de/display/sccmulti/Liniendiagramm
    // -----------------------------------------------------------------------

    var LinechartClass = function(asms, jqElem, linechartOpt) {
        var _linechartOpt = $.extend(true, {
            startYear : 2013,
            startMonth : 0,
            numberOfMonths : 13,
            maxPerc : 50,
            width: 800,
            height: 680,
            padding : {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            },
            data : undefined
        }, linechartOpt);

        var _that = this;
        var _paper = undefined;
        var _drawnElements = undefined;
        var _coodDrawn = false;
        var _jqElem = jqElem;

        // --- private methods ---
        function calcLinechartTimeline() {
            var timeline = new Array();
            var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            var numberOfMonthsProcessed = 0;
            var currentYear = _linechartOpt.startYear;

            var start = undefined;
            var end = undefined;
            var days = undefined;

            while (numberOfMonthsProcessed < _linechartOpt.numberOfMonths) {
                if (numberOfMonthsProcessed == 0) {
                    start = _linechartOpt.startMonth;
                    end = _linechartOpt.startMonth + _linechartOpt.numberOfMonths - numberOfMonthsProcessed < 12 ? _linechartOpt.startMonth + _linechartOpt.numberOfMonths - numberOfMonthsProcessed : 12;
                } else {
                    start = 0;
                    end = _linechartOpt.numberOfMonths - numberOfMonthsProcessed < 12 ? _linechartOpt.numberOfMonths - numberOfMonthsProcessed : 12;
                }
                for (var i = start; i < end; i++) {
                    numberOfMonthsProcessed++;

                    if (i == 1) {
                        days = daysInMonth[i] + (isLeapYear(currentYear) ? 1 : 0);
                    } else {
                        days = daysInMonth[i];
                    }

                    timeline.push({
                        month : i,
                        year : currentYear,
                        days : days
                    });
                }
                currentYear++;
            }
            _linechartOpt["timeline"] = timeline;
        }

        function calcLinechartCood() {
            if (_linechartOpt.numberOfMonths == undefined || _linechartOpt.numberOfMonth < 1) {
                return;
            }

            _linechartOpt["cood"] = {
                width: _linechartOpt.width - _linechartOpt.padding.left - _linechartOpt.padding.right,
                height: _linechartOpt.height - _linechartOpt.padding.top - _linechartOpt.padding.bottom
            };

            _linechartOpt.cood["pxPerMonth"] = _linechartOpt.cood.width / (_linechartOpt.numberOfMonths - 1);
            _linechartOpt.cood["pxPerPerc"] = _linechartOpt.cood.height / _linechartOpt.maxPerc;

            for(var i = 0; i < _linechartOpt.timeline.length; i++) {
                _linechartOpt.timeline[i]["x"] = calcPxFromDate(_linechartOpt.timeline[i].year, _linechartOpt.timeline[i].month, 1);
            }
            _linechartOpt.timeline[_linechartOpt.timeline.length -1]["x"] = _linechartOpt.cood.width;
        };

        function isLeapYear(year) {
            return ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0)));
        }

        function calcPxFromDate(dateYear, dateMonth, dateDay) {
            if (dateYear < _linechartOpt.startYear) {
                return undefined;
            }
            if (_linechartOpt.startYear == dateYear && _linechartOpt.startMonth > dateMonth) {
                return undefined;
            }
            if (dateDay < 1) {
                return undefined;
            }
            if (_linechartOpt.numberOfMonths < 2) {
                return undefined;
            }
            if (_linechartOpt.cood == undefined || _linechartOpt.timeline == undefined) {
                return undefined;
            }

            var cood = _linechartOpt.cood;
            var timeline = _linechartOpt.timeline;

            var monthCount = undefined;
            for(var i=0; i < timeline.length; i++) {
                if(timeline[i].year == dateYear && timeline[i].month == dateMonth) {
                    monthCount = i;
                    break;
                }
            }

            // date is not within the range of timeline
            if(monthCount == undefined || monthCount == timeline.length -1 && dateDay > 1) {
                return undefined;
            }

            var result = undefined;

            try {
                if (dateDay - 1 == 0) {
                    result = cood.pxPerMonth * monthCount;
                } else {
                    result = cood.pxPerMonth * monthCount + (dateDay - 1) / timeline[monthCount].days * cood.pxPerMonth;
                }
            } catch (e) {
                return undefined;
            }

            if (isNaN(result)) {
                return undefined;
            }
            return parseInt(result + (result % 1 != 0 ? 1 : 0));
        }

        function calcDateFromPx(x) {
            if(isNaN(x)) {
                return undefined;
            }

            if (_linechartOpt.cood == undefined || _linechartOpt.timeline == undefined) {
                return undefined;
            }

            var pxPerMonth = _linechartOpt.cood.pxPerMonth;
            var monthCount = parseInt(x / pxPerMonth);

            if (monthCount >= _linechartOpt.timeline.length) {
                return undefined;
            }

            var yearCount = parseInt((monthCount + _linechartOpt.startMonth) / 12);

           // var pxDaysInMonth = x - pxPerMonth * monthCount;
            var pxPerDayInMonth = pxPerMonth / (_linechartOpt.timeline[monthCount].days);

            var day = (parseInt((x - pxPerMonth * monthCount) / pxPerDayInMonth) + 1);

            return {
                year : _linechartOpt.startYear + yearCount,
                month : (_linechartOpt.startMonth + monthCount) % 12,
                day : day
            };
        }

        function calcPxFromPerc(perc) {
            return Math.round(_linechartOpt.cood.pxPerPerc * perc);
        }

        function checkCoodLimits() {
            var cood = _linechartOpt.cood;
            if (cood.pxPerMonth == undefined) {
                throw {
                    name : "PxPerMonthIsUndefined",
                    message : "pxPerMonth is undefined"
                };
            }

            if (cood.pxPerMonth < 31) {
                throw {
                    name : "xAxisToSmall",
                    message : "xAxis to small. The minimum width is " + (_linechartOpt.numberOfMonths - 1) * 31
                };
            }

            if (cood.pxPerPerc == undefined) {
                throw {
                    name : "PxPerPercIsUndefined",
                    message : "pxPerPerc is undefined"
                };
            }
            if (_linechartOpt.maxPerc == 0) {
                throw {
                    name : "MaxPercIsNero",
                    message : "linechart.maxPerc is 0"
                };
            }
            if (isNaN(cood.pxPerPerc)) {
                throw {
                    name : "PxPerPercIsNaN",
                    message : "pxPerPerc is NaN. linechart.maxPerc: " + _linechartOpt.maxPerc
                };
            }
            if (cood.pxPerPerc < 1) {
                throw {
                    name : "yAxisToSmall",
                    message : "yAxis to small. The minimum height is " + _linechartOpt.maxPerc
                };
            }

            return true;
        }

        /**
         * TODO Merge width asms.formatDate
         *
         * Comment: OK, but not yet!

        var dateToString = function(year, month, day, opt) {
            var options = $.extend({
                monthInString : false
            }, opt);

            var str = undefined;

            str = asms.addZero(day);

            if (options.monthInString) {
                str += " " + asms.getMonthName(month, 'long') + " ";
            } else {
                str += asms.addZero(month + 1);
            }

            str += year;

            return str;
        };
         */

        function dateToString(year, month, day, opt) {
            var _opt = $.extend({
                monthInString : false
            }, opt);

            var str = undefined;
            if (day < 10) {
                str = "0" + day;
            } else {
                str = day;
            }

            if (_opt.monthInString) {
                var monthStr = [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ];
                str += " " + monthStr[month] + " ";
            } else {
                if((month + 1) < 10) {
                    str += ".0" + (month + 1) + ".";
                } else {
                    str += (month + 1) + ".";
                }
            }
            str += year;

            return str;
        }

        function filterDataByInstitute(jsonData, filterInstitute) {
            if(jsonData == undefined || filterInstitute == undefined) {
                return undefined;
            }

            var survayData = jsonData.surveys;
            var parties = jsonData.parties;

            if(survayData == undefined || ! Array.isArray(survayData)) {
                return undefined;
            }

            var _filter = undefined;
            if(Array.isArray(filterInstitute)) {
                _filter = filterInstitute;
            } else if(typeof(filterInstitute) == "string") {
                _filter = new Array(filterInstitute);
            }

            filteredIntitutes = new Object();

            var i = 0;
            for(; i < _filter.length; i++) {
                filteredIntitutes[_filter[i]] = undefined;
            }

            var survayDataPerDay = undefined;

            for(i = 0; i < survayData.length; i++) {
                survayDataPerDay = undefined;

                for(var j = 0; j < survayData[i].values.length; j++) {
                    for(var k = 0; k < _filter.length; k++) {
                        if(_filter[k] == survayData[i].values[j].uniqueName) {

                            if(survayDataPerDay == undefined) {
                                survayDataPerDay = new Object();
                            }
                            if(survayDataPerDay[_filter[k]] == undefined) {
                                survayDataPerDay[survayData[i].values[j].uniqueName] = {
                                    values: new Array(survayData[i].values[j].results),
                                    name: survayData[i].values[j].institute,
                                    date: survayData[i].date
                                };
                            } else {
                                survayDataPerDay[_filter[k]].values.push(survayData[i].values[j].results);
                            }
                        }
                    }
                }

                if(survayDataPerDay != undefined) {
                    var filteredIntitute = undefined;
                    var survay = undefined;

                    for (key in survayDataPerDay) {
                        filteredIntitute = filteredIntitutes[key];
                        survay = survayDataPerDay[key];

                        if(filteredIntitute== undefined) {
                            filteredIntitute = {
                                    name: undefined,
                                    survays: []
                            };
                            filteredIntitutes[key] = filteredIntitute;
                        }

                        var item = {
                            date: survay.date,
                            values: survay.values
                        };
                        filteredIntitute.survays.push(item);
                        if(filteredIntitute.name == undefined && survay.name != undefined) {
                            filteredIntitute.name = survay.name;
                        }
                    }
                }
            }

            filteredIntitutes["orderOfParties"] = new Array( );

            for(i = 0; i < parties.length; i++) {
                filteredIntitutes.orderOfParties.push(parties[i].uniqueName);
            }

            return filteredIntitutes;
        }

        // Ignoriert Values, wenn es mehr als eine Umfrage, eines Institutes am gleichen Tag gibt
        function filterPartyValues(instituteData, filterParty) {
            if(instituteData == undefined || typeof(instituteData) != "object" || filterParty == undefined) {
                return undefined;
            }

            var _filter = undefined;
            if(Array.isArray(filterParty)) {
                _filter = filterParty;
            } else if(typeof(filterParty) == "string") {
                _filter = new Array(filterParty);
            }

            var filteredParties = new Object();

            var i = 0;
            for(; i < _filter.length; i++) {
                filteredParties[_filter[i]] = {
                    index : undefined,
                    values: []
                };
            }

            for(i = 0; i < instituteData.survays.length; i++) {
                for(var j = 0; j < instituteData.survays[i].values[0].length; j++) {

                    var value = {
                            date : stringToDate(instituteData.survays[i].date),
                            d : instituteData.survays[i].date,
                            v : instituteData.survays[i].values[0][j].value,
                            r : {}
                            // Hier Logik
                            //r : {
                            //    "spd" : 4,
                            //    "afd" : 5
                            //}
                            // Ende Hier Logik
                    };
                    filteredParties[_filter[j]].values.push(value);
                    filteredParties[_filter[j]].index = j;
                }
            }

            for(var i = 0; i < _filter.length; i++) {
                if(filteredParties[_filter[i]].values.length == 0) {
                    filteredParties[_filter[i]] = undefined;
                    continue;
                }
                filteredParties[_filter[i]].values.reverse();

                // Neu Für Prozenzanzeige unten
                for(var j = 0; j < filteredParties[_filter[i]].values.length; j++) {
                    var val = filteredParties[_filter[i]].values[j];

                    for(var k = 0; k < _filter.length; k++) {
                        if(i == k) {
                            continue;
                        }

                        for(var l = 0; l < filteredParties[_filter[k]].values.length; l++) {
                            if(val.d != filteredParties[_filter[k]].values[l].d) {
                                continue;
                            }

                            val.r[_filter[k]] = filteredParties[_filter[k]].values[l].v;
                        }
                    }
                }
            }


            return filteredParties;
        }

        function getMaxPerc(partiesData) {
            var max = 0;
            var partyData = undefined;
            for(key in partiesData) {
                partyData = partiesData[key];
                for(var i = 0; i < partyData.values.length; i++) {
                    if(partyData.values[i].v > max) {
                        max = partyData.values[i].v;
                    }
                }
            }
            return max;
        }

        function getNextPercDecate(perc) {
            var p = perc / 10.;
            return p - parseInt(p) == 0 ? perc + 10 : Math.ceil(p) * 10;
        }

        // drawing functionality
        var SvgPointClass = function(x, y, command) {
            var _x = x;
            var _y = y;
            var _command = command;

            this.getX = function() {
                return _x;
            };

            this.setX = function(x) {
                _x = x;
            };

            this.getY = function() {
                return _y;
            };

            this.setY = function(y) {
                _y = y;
            };

            this.getCoommand = function() {
                return _command;
            };

            this.setCoommand = function(command) {
                _command = command;
            };

            this.toString = function() {
                return _command + " " + _x + " " + _y;
            };
        };

        function toSvgPathString(pointArray) {
            var svgPathString = "";
            for(var i=0; i < pointArray.length; i++) {
                if(i != 0) {
                    svgPathString += " ";
                }
                svgPathString += pointArray[i].toString();
            }
            return svgPathString;
        };

        function transformPoints(pointArray) {
            for(var i=0; i < pointArray.length; i++) {
                transformPoint(pointArray[i]);
            }
        };

        function transformPoint(point) {
            var top = undefined;
            var left = undefined;

            if(_linechartOpt.padding == undefined) {
                top = 0,
                left = 0;
            } else {
                top = _linechartOpt.padding.top,
                left = _linechartOpt.padding.left;
            }

            point.setY(top + _linechartOpt.cood.height - point.getY());
            point.setX(left + point.getX());
            return point;
        };

        function calcHoverBorders(survayData) {
            var hoverBorders = new Array();

            var date = undefined;
               var pxOldDate = px = diff = point = undefined;

            for(var i=0; i < survayData.surveys.length; i++) {
                date = stringToDate(survayData.surveys[i].date);
                px = calcPxFromDate(date.year, date.month, date.day);

                if(px == undefined) {
                    continue;
                }

                if(pxOldDate == undefined) {
                    pxOldDate = px;
                    hoverBorders.push(0);
                    continue;
                }

                if(px - pxOldDate < 0) {
                       // console.log("calcHoverBorders() - negative value");
                    continue;
                }

                point = pxOldDate + Math.round((px - pxOldDate) / 2.);
                if(point > _linechartOpt.cood.width) {
                    // console.log("calcHoverBorders() - point: " + point + " out of range, linechart.cood.width: " + _linechartOpt.cood.width);
                    continue;
                }

                hoverBorders.push({
                    x : point,
                    elem: []
                });
                pxOldDate = px;
            }

            hoverBorders.push(_linechartOpt.cood.width);
            return hoverBorders;
        }

           /**
         * TODO Merge width asms.formatDate
         */
           function stringToDate(dateString) {
            var dateSplit = dateString.split(".");
            var date = {
                year : parseInt(dateSplit[2]),
                month : parseInt(dateSplit[1][0] == "0" ? dateSplit[1].substring(1, 2) : dateSplit[1]) -1,
                day : parseInt(dateSplit[0][0] == "0" ? dateSplit[0].substring(1, 2) : dateSplit[0])
            };
            return date;
        }

        function drawCood() {
            var pointArray = undefined;
                var lines = undefined;
                var rect = undefined;
                var text = undefined;
            var p1 = undefined;
            var p2 = undefined;
               var path = undefined;

               var currentYear = -1;

            // ticks: x labels
            var monthStr;
            if(_linechartOpt.cood.pxPerMonth < 22) {
                monthStr = [ "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D" ];
            } else if(_linechartOpt.cood.pxPerMonth < 35) {
                monthStr = [ "Jan", "Feb", "Mrz", "Apr", "Mai", "Jui", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ];
            } else if(_linechartOpt.cood.pxPerMonth < 58) {
                monthStr = [ "Jan", "Feb", "März", "April", "Mai", "Juni", "Juli", "Aug", "Sep", "Okt", "Nov", "Dez" ];
               } else {
                monthStr = [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ];
            }

            // ticks: percent lines
            var pxPerc0Y = calcPxFromPerc(0);
            var pxPerc5Y = calcPxFromPerc(5);
            var pxPerc10Y = calcPxFromPerc(10);
            var pxPerc20Y = calcPxFromPerc(20);
            var pxPerc30Y = calcPxFromPerc(30);
            var pxPerc40Y = calcPxFromPerc(40);
            var pxPerc50Y = calcPxFromPerc(50);

            pointArray = new Array();
            pointArray.push(new SvgPointClass(0, pxPerc5Y));
            transformPoints(pointArray);

            rect = _paper.rect(pointArray[0].getX(), pointArray[0].getY(), _linechartOpt.cood.width, pxPerc5Y - pxPerc0Y);
            rect.attr("stroke", "#eef1ea");
            rect.attr("fill", "#f5fafc");

            pointArray = new Array();
            pointArray.push(new SvgPointClass(-1, pxPerc5Y, "M"));
            pointArray.push(new SvgPointClass(_linechartOpt.cood.width + 1, pxPerc5Y, "L"));
            pointArray.push(new SvgPointClass(-1, pxPerc10Y, "M"));
            pointArray.push(new SvgPointClass(_linechartOpt.cood.width + 1, pxPerc10Y, "L"));
            pointArray.push(new SvgPointClass(-1, pxPerc20Y, "M"));
            pointArray.push(new SvgPointClass(_linechartOpt.cood.width + 1, pxPerc20Y, "L"));
            pointArray.push(new SvgPointClass(-1, pxPerc30Y, "M"));
            pointArray.push(new SvgPointClass(_linechartOpt.cood.width + 1, pxPerc30Y, "L"));
            pointArray.push(new SvgPointClass(-1, pxPerc40Y, "M"));
            pointArray.push(new SvgPointClass(_linechartOpt.cood.width + 1, pxPerc40Y, "L"));
            pointArray.push(new SvgPointClass(-1, pxPerc50Y, "M"));
            pointArray.push(new SvgPointClass(_linechartOpt.cood.width + 1, pxPerc50Y, "L"));
            transformPoints(pointArray);

            lines = _paper.path(toSvgPathString(pointArray));
            lines.attr({
                "stroke-width": "1",
                "stroke" : "#ccc",
                "stroke-dasharray" : "-"
            });

            // ticks: percent lables
               var pointPerc5 = pointArray[0];
            var pointPerc10 = pointArray[2];
            var pointPerc20 = pointArray[4];
            var pointPerc30 = pointArray[6];
            var pointPerc40 = pointArray[8];
            var pointPerc50 = pointArray[10];

            var yShift = -18;
            text = _paper.text(pointPerc5.getX() + yShift +3, pointPerc5.getY(), "5%");
            // Workaround: Raphael has problems to calculate the correct y position
            $(text.node).find("tspan").attr("dy", 0);

            text = _paper.text(pointPerc10.getX() + yShift, pointPerc10.getY(), "10%");
            $(text.node).find("tspan").attr("dy", 0);

            text = _paper.text(pointPerc20.getX() + yShift, pointPerc20.getY(), "20%");
            $(text.node).find("tspan").attr("dy", 0);

            text = _paper.text(pointPerc30.getX() + yShift, pointPerc30.getY(), "30%");
            $(text.node).find("tspan").attr("dy", 0);

            text = _paper.text(pointPerc40.getX() + yShift, pointPerc40.getY(), "40%");
            $(text.node).find("tspan").attr("dy", 0);

            text = _paper.text(pointPerc50.getX() + yShift, pointPerc50.getY(), "50%");
            $(text.node).find("tspan").attr("dy", 0);

            // ticks: x axis
            pointArray = new Array();
            yShift = -11;
            for(var i=0; i< _linechartOpt.timeline.length; i++) {
                p1 = transformPoint(new SvgPointClass(_linechartOpt.timeline[i].x, 0, "M"));
                p2 = transformPoint(new SvgPointClass(_linechartOpt.timeline[i].x, -5, "L"));

                pointArray.push(p1);
                pointArray.push(p2);

                if(i < _linechartOpt.timeline.length -1) {
                    text = _paper.text(p2.getX(), p2.getY() - yShift, monthStr[_linechartOpt.timeline[i % 12].month]);
                    text.attr({
                        "text-anchor" : "start",
                        "font-weight": "bold"
                    });
                    // Workaround: Raphael has problems to calculate the correct y position
                    $(text.node).find("tspan").attr("dy", 0);

                    // ticks: x year
                    if(currentYear != _linechartOpt.timeline[i].year) {
                        currentYear = _linechartOpt.timeline[i].year;

                        text = _paper.text(p2.getX(), p2.getY() - yShift + 12, currentYear);
                        text.attr({
                            "text-anchor" : "start",
                            "fill" : "#a7afb4"
                        });
                        // Workaround: Raphael has problems to calculate the correct y position
                        $(text.node).find("tspan").attr("dy", 0);
                    }
                }
            }

            // line: x axis
            p1 = transformPoint(new SvgPointClass(0, 0, "M"));
            p2 = transformPoint(new SvgPointClass(_linechartOpt.cood.width, 0, "L"));

               pointArray.push(p1);
            pointArray.push(p2);
            lines = _paper.path(toSvgPathString(pointArray));
            lines.attr({
                "stroke-width" : "1",
                "stroke" : "#aaa"
            });

            _coodDrawn = true;
        }

        // --- priv methods ---

        this.getOptions = function() {
            return _linechartOpt;
        };
        this.setOptions = function(opt) {
            _linechartOpt = $.extend(true, _linechartOpt, opt || {});
        };

        this.clearLines = function() {
            if(_drawnElements == undefined || !Array.isArray(_drawnElements)) {
                return;
            }

            for(var i=0; i < _drawnElements.length; i++) {
                _drawnElements[i].remove();
            }
        };

        this.updateLines = function(firstInstitute, drawingOpt) {
            this.clearLines();

            var _drawLines = this.drawLines;

            var institutes = filterDataByInstitute(_linechartOpt.data.dataJson, firstInstitute);
            var partyData = filterPartyValues(institutes[firstInstitute], institutes.orderOfParties);
            var hoverBoders = calcHoverBorders(_linechartOpt.data.dataJson);

            if(_coodDrawn == undefined || !_coodDrawn) {
                if(_jqElem != undefined && _jqElem.length > 0) {
                    _paper = new Raphael(jqElem[0], _linechartOpt.width, _linechartOpt.height);
                       drawCood();
                    //setTimeout(function() {
                        _drawLines(partyData, drawingOpt, hoverBoders);
                    //}, 100);
                }

            } else {
                //setTimeout(function() {
                    _drawLines(partyData, drawingOpt, hoverBoders);
                //}, 300);
            }
        };

        this.drawLines = function(data, drawingOpt, hoverBoders) {
            function setTimelineMarker(x, withAnimation, date) {
                var animation = (withAnimation != undefined && withAnimation) ? true : false;

                var monthStrThreeLetter = [ "Jan", "Feb", "Mrz", "Apr", "Mai", "Jui", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ];
                var p1 = transformPoint(new SvgPointClass(x, -1));
                var elem = _dateLineCoodRect.data("timelineDateline");
                var newPath = "M" + p1.getX() + "," + (p1.getY() - _linechartOpt.cood.width) + "L" + p1.getX() + "," + (p1.getY() + 35)

                if(animation) {
                    elem.animate({path:newPath}, 100);
                } else {
                    elem.node.setAttribute("d", newPath);
                }

                 elem = _dateLineCoodRect.data("timelineDatelineDate");
                var dateForMarker = undefined;

                if(date == undefined) {
                    dateForMarker = calcDateFromPx(x);
                } else {
                    dateForMarker = date;
                }

                if(dateForMarker == undefined) {
                    return;
                }

                elem.attr("text", dateForMarker.day + ". " + monthStrThreeLetter[dateForMarker.month % 12] + " " + dateForMarker.year);
                if(x < _linechartOpt.padding.left + _linechartOpt.cood.width - 95) {
                    if(animation) {
                        elem.animate({
                            "x" : p1.getX()
                        }, 100);
                    } else {
                        elem.attr("x", p1.getX());
                    }
                }
            }

            _drawnElements = new Array();
              var _dateLineCoodRect = undefined;

            if(data == undefined || typeof(data) != "object") {
                return;
            }

            var partyData = undefined;
            var perc = undefined;
            var date = undefined;
            var x = undefined;
            var y = undefined;
            var i = undefined;
            var point = undefined;
            var circle = undefined;
            var circleHover = undefined;
            var marker = undefined;
            var text = undefined;

            var p1 = undefined;
            var p2 = undefined;
            var lines = undefined;

            var markerLabelWidth = 50;
            var markerLabelHeight = 24;
            var markerLabelShiftX = 6;
            var markerLabelShiftY = 6;

            var circleHoverSize = 8;

            var pointArray = undefined;
            var isFirstPointDrawn = undefined;

            var rPaths = {};

            for(party in data) {
                pointArray = new Array();
                partyData = data[party];

                if(partyData == undefined) {
                    continue;
                }

                isFirstPointDrawn = false;

                for(i = 0; i < partyData.values.length; i++) {
                    perc = partyData.values[i].v;
                    date = partyData.values[i].date;

                    if(perc < 0) {
                        continue;
                    }

                    x = calcPxFromDate(date.year, date.month, date.day);
                    y = calcPxFromPerc(perc);

                    if(x == undefined || y == undefined) {
                        continue;
                    }

                    point = transformPoint(new SvgPointClass(x, y, isFirstPointDrawn ? "L" : "M"));
                    isFirstPointDrawn = true;
                    pointArray.push(point);
                }

                // draw party lines
                partyPath = _paper.path(toSvgPathString(pointArray));
                partyPath.attr({
                    "stroke-width" : 2,
                    "opacity" : 1,
                    "stroke" : drawingOpt[partyData.index].color,
                    "cursor" : "default"
                   });
                partyPath.node.setAttribute("class", "line");
                rPaths[party] = partyPath;

                _drawnElements.push(partyPath);

                pointArray = new Array();

                for(i = 0; i < partyData.values.length; i++) {
                    partyData.values[i]["elems"] = {
                        marker : undefined,
                        markertext : undefined,
                        circle : undefined
                    };

                    perc = partyData.values[i].v;
                    date = partyData.values[i].date;

                    if(perc < 0) {
                        continue;
                    }

                    x = calcPxFromDate(date.year, date.month, date.day);
                    y = calcPxFromPerc(perc);

                    point = transformPoint(new SvgPointClass(x, y, isFirstPointDrawn ? "L" : "M"));
                    isFirstPointDrawn = true;

                    // draw marker
                    if(x + markerLabelWidth + markerLabelShiftX > _linechartOpt.cood.width) {
                        mX = transformPoint(new SvgPointClass(_linechartOpt.cood.width - markerLabelWidth, 0)).getX();
                    } else {
                        mX = point.getX() + markerLabelShiftX;
                    }

                    mY = point.getY() - markerLabelHeight - markerLabelShiftY;

                    marker = _paper.rect(mX, mY, markerLabelWidth, markerLabelHeight);
                    marker.attr({
                        "stroke" : drawingOpt[partyData.index].color,
                        "stroke-width" : 0,
                        "opacity" : 0,
                        "fill" : "none",
                        "cursor" : "defualt"
                    });
                    marker.node.setAttribute("class", "marker");
                    _drawnElements.push(marker);
                    partyData.values[i].elems.marker = marker;

                    // draw marker text
                    text = _paper.text(mX + markerLabelShiftX + 20, mY + markerLabelShiftY + 9, perc + " %");
                    text.attr({
                        "font-size" : "15px",
                        "font-family" : "Georgia",
                        "fill" : "none",
                        "stroke-width" : 0,
                        "opacity": 1,
                        "cursor" : "defualt"
                    });
                    text.node.setAttribute("class","markertext");
                    // Workaround: Raphael has problems to calculate the correct y position
                    $(text.node).find("tspan").attr("dy", 0);

                    _drawnElements.push(text);
                    partyData.values[i].elems.text = text;

                    // draw big cilcle
                    circle = _paper.circle(point.getX(), point.getY(), 0);
                    circle.attr({
                        "stroke" : drawingOpt[partyData.index].color,
                        "stroke-width" : 2,
                        "fill" : "none",
                        "opacity": 1,
                        "cursor" : "defualt"
                    });
                    circle.node.setAttribute("class", "circle");
                    _drawnElements.push(circle);
                    partyData.values[i].elems.circle = circle;
                }
            }



            // draw timeline marker
            pointArray = new Array();
            p1 = transformPoint(new SvgPointClass(0, 1, "M"));
            p2 = transformPoint(new SvgPointClass(0, -35, "L"));
            pointArray.push(p1);
            pointArray.push(p2);
            lines = _paper.path(toSvgPathString(pointArray));
            _drawnElements.push(lines);
            lines.attr({
                "stroke-width" : 1,
                "stroke" : "#a7afb4",
                "opacity" : 0,
                "cursor" : "defualt"
            });


            yShift = 10;
            text = _paper.text(p2.getX(), p2.getY() + yShift, "");
            _drawnElements.push(text);
            text.attr({
                "text-anchor" : "start",
                "font-size" : "11px",
                "font-weight": "bold",
                "opacity" : 0,
                "cursor" : "defualt"
            });

            // Workaround: Raphael has problems to calculate the correct y position
            $(text.node).find("tspan").attr("dy", 0);

            // draw timeline rect
            p1 = transformPoint(new SvgPointClass(0, _linechartOpt.cood.height));
            _dateLineCoodRect = _paper.rect(p1.getX() , p1.getY() , _linechartOpt.cood.width +1, _linechartOpt.cood.height +1);
            _drawnElements.push(_dateLineCoodRect);
            _dateLineCoodRect.node.setAttribute("class", "coodHoverRect");


            //_dateLineCoodRect.node.setAttribute("pointer-events", "all");
            _dateLineCoodRect.attr({
                "opacity" : 0,
                "stroke" : 0,
                "fill" : "blue",
                "cursor" : "default"
            });
            _dateLineCoodRect.mousemove(function(e) {
                if(e.layerX != undefined) {
                    setTimelineMarker(e.layerX - _linechartOpt.padding.left);
                } else if(e.offsetX != undefined) {
                    setTimelineMarker(e.offsetX);
                }
            });
             _dateLineCoodRect.hover(function(e) {
                var elem = this.data("timelineDatelineDate");
                elem.attr("opacity", 1);
                /*
                elem.animate({
                    "opacity" : 1
                }, 200);
                */

                elem = this.data("timelineDateline");
                elem.attr("opacity", 1);
                /*
                elem.animate({
                    "opacity" : 1
                }, 200);
                */
            }, function(e) {
                var elem = this.data("timelineDatelineDate");
                elem.attr("opacity", 0);
                /*elem.animate({
                    "opacity" : 0
                }, 200);
                */
                elem = this.data("timelineDateline");
                elem.attr("opacity", 0);
                /*elem.animate({
                    "opacity" : 0
                }, 200);
                */
            });
            partyData["draw"] = {
                hoverRect : _dateLineCoodRect
            };

            _dateLineCoodRect.data("timelineDateline", lines);
            _dateLineCoodRect.data("timelineDatelineDate", text);

            // Zeichnen der Hover Pfade
            for(party in data) {
                pointArray = new Array();
                partyData = data[party];

                if(partyData == undefined) {
                    continue;
                }

                isFirstPointDrawn = false;

                for(i = 0; i < partyData.values.length; i++) {
                    perc = partyData.values[i].v;
                    date = partyData.values[i].date;

                    if(perc < 0) {
                        continue;
                    }

                    x = calcPxFromDate(date.year, date.month, date.day);
                    y = calcPxFromPerc(perc);

                    if(x == undefined || y == undefined) {
                        continue;
                    }

                    point = transformPoint(new SvgPointClass(x, y, isFirstPointDrawn ? "L" : "M"));
                    isFirstPointDrawn = true;
                    pointArray.push(point);
                }

                // draw party lines
                partyPath = _paper.path(toSvgPathString(pointArray));
                partyPath.attr({
                    "stroke-width" : 8,
                    "opacity" : 0,
                    "cursor" : "default"
                   });
                partyPath.node.setAttribute("class", "line");

                partyPath.data("path", rPaths[party]);

                partyPath.hover(function() {
                    var path = this.data("path");

                    path.attr({
                        "stroke-width": 4
                    });

                }, function() {
                    var path = this.data("path");

                    path.attr({
                        "stroke-width": 2
                    });
                });

                _drawnElements.push(partyPath);
            }

            pointArray = new Array();

            // console.log(data);

            for(party in data) {
                partyData = data[party];

                if(partyData == undefined) {
                    continue;
                }

                for(i = 0; i < partyData.values.length; i++) {
                    perc = partyData.values[i].v;
                    otherPartyValues = partyData.values[i].r;

                    date = partyData.values[i].date;
                    elems = partyData.values[i].elems;

                    //schleife
                    // console.log(partyData.values);

                    x = calcPxFromDate(date.year, date.month, date.day);
                    y = calcPxFromPerc(perc);

                    if(x == undefined || y == undefined) {
                        continue;
                    }

                    point = transformPoint(new SvgPointClass(x, y, i == 0 ? "M" : "L"));
                    //pointArray.push(point);

                    // small marker hover area
                    circleHover = _paper.circle(point.getX(), point.getY(), circleHoverSize);
                    circleHover.attr({
                        "opacity" : 0, // use this line to debug
                        "fill" : drawingOpt[partyData.index].color,
                        "cursor" : "defualt",
                        "stroke-width" : 4
                    });
                    circleHover.data("marker", elems.marker);
                    circleHover.data("text", elems.text);
                    circleHover.data("circle", elems.circle);
                    circleHover.data("color", drawingOpt[partyData.index].color);
                    circleHover.data("path", rPaths[party]);
                    circleHover.data("partyUniqueName", party);
                    circleHover.data("percent", perc);
                    circleHover.data("otherPartyValues", otherPartyValues);

                    circleHover.node.setAttribute("class","circleHover");
                    _drawnElements.push(circleHover);

                    var strokeWidthTimeout;

                    circleHover.hover(function() {
                        // check if circle & text is undefined
                        if (this.data("circle") != undefined) {

                            this.data("circle").attr({
                                "fill" : "white",
                                "stroke-width" : 2,
                                "stroke" : this.data("color")
                            });

                            this.data("circle").animate({r: 3}, 50);

                            /*this.data("text").attr({
                                "fill" : "white",
                                "opacity": 1
                            });*/

                            /*
                            this.data("marker").attr({
                                "fill" : this.data("color"),
                                "stroke-width" : 10,
                                "stroke" : this.data("color")
                            });
                            */

                            this.data("path").attr({
                                "stroke-width": 4
                            });

                            //this.data("marker").animate({opacity: 1}, 50);

                            $(".legend.line ." + this.data("partyUniqueName") + " span.perc").text(this.data("percent") + "%");
                            for(var otherPartyName in this.data("otherPartyValues")) {
                                var otherPartyValue = this.data("otherPartyValues")[otherPartyName];

                                if (otherPartyValue != -1) {
                                    $(".legend.line ." + otherPartyName + " span.perc").text(otherPartyValue + "%");
                                }
                            }
                        }

                        var elem = partyData.draw.hoverRect.data("timelineDateline");
                        elem.attr("opacity", 1);

                        elem = partyData.draw.hoverRect.data("timelineDatelineDate");
                        elem.attr("opacity", 1);

                        setTimelineMarker(this.attrs.cx - _linechartOpt.padding.left, false);
                    }, function() { // mouseout
                        // check if circle is undefined
                        $(".legend.line span.perc").text("");
                        if (this.data("circle") != undefined) {

                            this.data("circle").animate({r: 0}, 50);

                            this.data("text").animate({
                                "opacity": 0
                            }, 200);

                            /*this.data("text").attr({
                                "fill" : "none"
                            });*/

                            /*
                            this.data("marker").attr({
                                "fill" : "none",
                                "stroke-width" : 0
                            });
                            */

                            //this.data("marker").animate({"opacity": 0}, 50);

                            this.data("path").attr({
                                "stroke-width": 2
                            });
                        }
                    });
                }
            }
        };


        // --- init ---
        this.init = function() {
            calcLinechartTimeline();
            calcLinechartCood();

            //this.checkCoodLimits();
        }
    };

    // -------------------------------------------------------------------
    //
    // -------------------------------------------------------------------

    /**
     * Adds the tabbing functionality
     */
    var _initTabs = function() {
        // add tab functionality
        if ('function' == typeof $.fn.tabs) {
            $('.maintabs', $widget).show();

            // just a simple open and close functionality
            $('.maintabs a', $widget).each(function(index) {
                var $actualTabContent = $('.tabContent:eq(' + index + ')', $widget);
                var $actualTabLink = $(this);

                $actualTabLink.click(function(event) {
                    event.preventDefault();
                    $('.maintabs a', $widget).not($actualTabLink).removeClass('current');
                    $actualTabLink.toggleClass('current');

                    // if another tab is visble close it first
                    if (0 < $('.tabContent:visible', $widget).not($actualTabContent).length) {
                        $('.tabContent:visible', $widget).not($actualTabContent).slideUp(400, function() {
                            $actualTabContent.slideToggle();
                        });
                    // just open/close the tab
                    } else {
                        $actualTabContent.slideToggle();
                    }
                });
            });

            // add tabbing functionality
            $('.tabbingHeader .tabs', $widget).tabs('.tabbingHeaderTab');
            $('.content .tabbingGroup .tabs', $widget).tabs('.tabPane', {effect: 'fade'});
        }
    };

    /**
     * Adds the slider functionality
     */
    var _initSlider = function(config) {
        var $slider = $(options.scalarSelector, $widget);
        var _sliderTimeline = options.barChart.sliderTimeline;

        $slider.slider({
            max : options.dataJson.timelineDays
        }, {
            change : function(event, ui) {
                var mapData = _sliderTimeline[ui.value];

                // if survey index is not set get the nearest
                if (-1 == mapData.index) {
                    var sliderValue = getNearestIndex(ui.value);

                    // update the slider
                    $slider.slider('value', sliderValue);
                    mapData = _sliderTimeline[sliderValue];
                }

                var survey            = options.dataJson.surveys[mapData.index];
                var $instituteWrapper = $('.pollinstitute', $widget);

                $instituteWrapper.html('');

                $.each(survey.values, function(index, value) {
                    if (0 === index) {
                        $instituteWrapper.append('<a class="institute">' + value.institute + '</a>');
                    } else {
                        $instituteWrapper.append('<a class="separator institute">' + value.institute + '</a>');
                    }
                });

                // add click functionality for institute button
                $('.institute', $instituteWrapper).each(function(index) {
                    // set selected institute
                    if (instituteIndex == index) {
                        $(this).addClass('selected');
                    }

                    $(this).click(function(event) {
                        event.preventDefault();
                        $('.institute', $instituteWrapper).removeClass('selected');
                        $(this).addClass('selected');
                        updateBars(mapData.index, index, config);
                    });
                });

                // update infobox and slider date
                $('.polldate', $widget).text(survey.date);
                $('.ui-slider-handle .date', $widget).text(asms.formatDate(mapData.date, 'short'));

                $('.ui-slider-handle .date:hidden', $slider)
                    .fadeIn(options.slider.fadeSpeed)
                    .delay(options.slider.delay)
                    .fadeOut(options.slider.fadeSpeed);

                // draw the bars
                updateBars(mapData.index, instituteIndex, config);

                // reset instituteIndex
                instituteIndex = 0;
            },
            slide : function(event, ui) {
                var mapData = _sliderTimeline[ui.value];

                // survey index does not exist
                if (-1 == mapData.index) {
                    var sliderValue = getNearestIndex(ui.value);

                    mapData = _sliderTimeline[sliderValue];
                }

                var date = asms.formatDate(mapData.date, 'short');

                $('.ui-slider-handle .date', $slider).text(date);
            },
            stop : function() {
                $('.ui-slider-handle .date:visible', $slider).fadeOut(options.slider.fadeSpeed);
            }
        });

        var sliderValue = getNearestIndex(options.dataJson.timelineDays);
        $slider.slider('value', sliderValue);

        $('.ui-slider-handle', $slider).html('<span class="date"></span>');

        // show date on mouse event
        $('.ui-slider-handle', $slider).mousedown(function() {
            $('.date', $(this)).fadeIn(options.slider.fadeSpeed);
        }).mouseup(function() {
            $('.date', $(this)).fadeOut(options.slider.fadeSpeed);
        });

        $slider.mousedown(function() {
            $('.date', $(this)).fadeIn(options.slider.fadeSpeed);
        });

        // slider initialization complete show elements
        $('.timelinebox, .infobox').show();
    };

    /**
     * Adds the click functionality for the institute table
     */
    var _initInstituteTable = function() {
        $('.content table tr', $widget).click(function(event) {
            event.preventDefault();

            // remove the current class for all tr
            $('.content table tr', $widget).removeClass('current');

            var trClass = $(this).attr('class');
            var trDate = $(this).children('td:eq(1)').text();
            $(this).addClass('current');

            instituteIndex = getInstituteIndexFromString(trClass);

            // find the survey index in the map
            var surveyIndex = -1;
            var sliderValue = 0;

            var _sliderTimeline = options.barChart.sliderTimeline;

            for (var idx = 0; idx < _sliderTimeline.length; idx++) {
                if (trDate == asms.formatDate(_sliderTimeline[idx].date)) {
                    surveyIndex = _sliderTimeline[idx].index;
                    sliderValue = idx;
                    break;
                }
            }

            // no survey was found for this date
            if (-1 == surveyIndex) {
                return;
            }

            var instituteUniqueName = getInstituteUniqueNameFromString(trClass);
            var instituteCount = 0;

            // get the right institute index
            for (var i = 0; i < options.dataJson.surveys[surveyIndex].values.length; i++) {
                var institute = options.dataJson.surveys[surveyIndex].values[i];

                if (institute.uniqueName != instituteUniqueName) {
                    continue;
                }

                if (instituteCount == instituteIndex) {
                    instituteIndex = i;
                } else {
                    instituteCount++;
                }
            }

            var $slider = $(options.scalarSelector, $widget);
            $slider.slider('value', sliderValue);
        });
    };

    /**
     * Adds functionality for the timeline institute selectbox
     */
    var _initInstituteSelectbox = function() {
        if ('function' == typeof $.fn.selectbox) {
            $('.cbxInstitutes', $widget).selectbox({
                onChange: function (institute, inst) {
                    linechart.updateLines(institute, options.dataJson.parties);
                }
            });
        }
        /* not that pretty, do not read! */

        // navigation with table
        $('.tabContent .tabbingGroup a.tabMenuItem', $widget).click(function(e) {
            // prevent evil
            e.preventDefault();

            // set filter text
            var filterText = $(this).children('span').text().trim();

            $(".tabbingHeaderTab .institutebox .ui-selectbox a", $widget).filter(function() {
                return $(this).text() == filterText;
            }).click();
        });

        // navigation with dropdown
        $('.institutebox .ui-selectbox .ui-menu li', $widget).click(function(e) {
            // prevent evil
            e.preventDefault();

            // set filter text
            var filterText = $(this).children('a').text().trim();

            $(".tabContent .tabbingGroup a.tabMenuItem", $widget).removeClass('current');
            $(".tabContent .tabbingGroup a.tabMenuItem span", $widget).filter(function() {
                return $(this).text().trim() == filterText;
            }).parent().addClass('current');

            var indexOfCurrent = $(".tabContent .tabbingGroup a.tabMenuItem").index($(".tabContent .tabbingGroup a.tabMenuItem.current"));
            // hide all tab panes
            $(".tabPane").hide();
            // show current tab pane
            $(".tabPane").eq(indexOfCurrent).show();
        });
    };

    /**
     * Creates the linechart legend
     * TODO: Move to linechart class
     */
    var _initLinechartLegend = function() {
        var _parties = options.dataJson.parties;

        for (var index = 0; index < _parties.length; index++) {
            var _part = _parties[index];

            $('<li>', {
                style : 'border-color: ' + _part.color
            }).addClass(_part.uniqueName).append('<span>' + _part.name + '</span><span class="perc"></span>').appendTo($('.legend.line ul', $widget));
        }
    }

    /**
     * Used for normal and ajax call initialization
     *
     * @param string selector
     */
    var _initGlobal = function(selector) {
        // for each widget
        $(selector).each(function() {
            if ($.browser.msie && $.browser.version <= 8) {
                $('.election .tabbingGroup,.election  .institutebox,.election  .tabbingHeaderTab,.election  .content', $widget).remove();
                $('.election .headline').html("Dieses Feature wird in Ihrem Browser nicht unterstützt");
                $('.election .subheadline').html("Bitte aktualisieren Sie Ihren Browser - Bei Fragen können Sie sich gerne an <a href='mailto:online@welt.de'>online@welt.de</a> wenden");
            }
            else {
                $widget = $(this);

                view = getViewType();

                // set active chart config type
                var configBarChart = options.barChart[view];
                var configLineChart = options.lineChart[view];

                initBarchart(configBarChart);

                // init line chart
                linechart = new LinechartClass(
                    asms,
                    $('.chart.line', $widget), {
                        maxPerc : configLineChart.maxPerc,
                        width : configLineChart.width,
                        height : configLineChart.height,
                        padding : configLineChart.padding
                    }
                );

                _initTabs();

                if ($.browser.msie && !($.browser.version == 9 || $.browser.version == 10) ) {
                    $('.tabbingHeader .tabbingGroup .tabs .btwtimecourse', $widget).parent("li").remove();
                } else {
                    $('.tabbingHeader .tabs a.tabMenuItem.btwcurrent', $widget).click(function() {
                        var tableTabs = $('.content .tabContent:eq(0) .tabs li', $widget);

                        $(tableTabs[0]).show();
                        $(tableTabs[1]).find(".tabMenuItem").removeClass("first");
                        $(tableTabs[1]).find(".tabMenuItem").removeClass("current");
                        $(tableTabs[0]).find(".tabMenuItem").addClass("first");
                        $(tableTabs[0]).find(".tabMenuItem").addClass("current");
                    });
                    $('.tabbingHeader .tabs a.tabMenuItem.btwtimecourse', $widget).click(function() {
                        if($(this).hasClass("disabled")) {
                            $('.tabbingHeader .tabs a.tabMenuItem.btwcurrent', $widget).click();
                            return;
                        }

                        var firstInstitute = $(".institutebox .cbxInstitutes option:eq(0)").attr("value");

                        linechart.updateLines(firstInstitute, options.dataJson.parties);

                        var tableTabs = $('.content .tabContent:eq(0) .tabs li', $widget);
                        $(tableTabs[0]).hide();
                        $(tableTabs[0]).find(".tabMenuItem").removeClass("first");
                        $(tableTabs[0]).find(".tabMenuItem").removeClass("current");
                        $(tableTabs[1]).find(".tabMenuItem").addClass("first");
                        $(tableTabs[1]).find(".tabMenuItem").addClass("current");
                    });
                }
            }
        });
    };

    /**
     * Checks if data is available
     *
     * @return boolean
     */
    var _isDataAvailable = function() {
        if(!options.dataJson || !options.dataJson.surveys || !options.dataJson.parties || 0 == options.dataJson.surveys.length || 0 == options.dataJson.parties.length) {
            return false;
        } else {
            return true;
        }
    };

    var methods = null;

    methods = {
        init : function(selector, newOptions) {
            // extend options recursive
            methods.setOptions(newOptions);

            // break if jquery slider is missing
            if ('undefined' == typeof jQuery.fn.slider) {
                return 'jQuery Slider is not defined.';
            }

            if (0 == selector.length) {
                selector = options.selector;
            }

            // try to get data via ajax call
            if (0 < options.dataUrl.length) {
                $.ajax({
                    type: 'GET',
                    cache: true,
                    url: options.dataUrl,
                    jsonpCallback: 'callback',
                    contentType: 'application/json',
                    dataType: 'jsonp',
                    jsonp: false
                }).done(function(data) {
                    methods.setOptions(data);

                    // update selector if needed
                    if (undefined != data.selector) {
                        selector = data.selector;
                    }

                    var view = getViewType();
                    var configBarChart = options.barChart[view];
                    if (true === _isDataAvailable()) {
                        options.barChart["sliderTimeline"] = generateMap();

                        // add click event for "last survey"-button
                        // survey index is always 0
                        $('a.timeline', $widget).click(function(event) {
                            var latestSurveyInMapIndex = getLatestSurveyIndex();
                            var $slider = $(options.scalarSelector, $widget);
                            $slider.slider('value', latestSurveyInMapIndex);
                            event.preventDefault();
                            updateBars(0, 0, configBarChart);
                        });

                        // set the slider to last poll
                        //$('a.timeline', $widget).click();

                        _initBars(configBarChart);
                        _initSlider(configBarChart);
                        _initInstituteTable();
                        _initInstituteSelectbox();
                        _initLinechartLegend();

                        // init linechart
                        linechart.setOptions({
                            startYear : options.lineChart.startYear,
                            startMonth : options.lineChart.startMonth,
                            numberOfMonths : options.lineChart.numberOfMonths,
                            data : options
                        });
                        linechart.init();

                        $('.tabbingHeader .tabs a.tabMenuItem.btwtimecourse', $widget).removeClass("disabled");
                    }
                }).fail(function(e){
                    return 'Ajax call failed.';
                });
            // data is provided directly
            }

            _initGlobal(selector);
        },
        setOptions : function(opt) {
            // extend config recursive
            options = $.extend(true, options, opt || {});
        },
        getOptions : function() {
            return options;
        },
        LinechartClass : LinechartClass
    };

    // TODO: plaese make a general solution
    //if (asms.general.ece.unittests.enabled == true) {
    //   $.extend(true, methods, testmethods || {});
   // }

    return methods;
})(asms.jQuery(), window, document);;/**
 *
 * @author Adrian Ramin
 * @author Igor Savchenko
 *
 * @uses jQuery, Raphael, Raphael SVG Import Classic, FlexSlider 2, jQuery Waypoints
 *
 */
asms.general.ece.widgets.electionMap = (function ($, window, document) {
    var currentHoveredMap = null,
        _waypointsEnabled = false,
        _stickyHeaderInitialized = false,
        _stickyHeaderVisible = false,
    // true, if Chrome, Firefox,etc and false if IE
        _isProperBrowser = true,
    // object for mapping name of federal
        _mapsTooltipsData = null,
        _mapsFederalStateName = { B01: 'blsh', B02: 'blhh', B03: 'blni', B04: 'blhb', B05: 'blnw', B06: 'blhe', B07: 'blrp', B08: 'blbw', B09: 'blby',
            B10: 'blsl', B11: 'blbe', B12: 'blbb', B13: 'blmv', B14: 'blsn', B15: 'blst', B16: 'blth' }, // mapping for name of federal state of Germany map
        _candidateListIsLoading = false,
        _options = {
            // default style of federal state
            notHoverStyle: {
                'stroke': '#898989',
                'stroke-width': 1,
                'stroke-linejoin': 'round',
                'fill': '#E5E5E5'
            },
            // hover style of federal state
            hoverStyle: {
                'stroke': '#0871A5',
                'stroke-width': 2,
                'stroke-linejoin': 'round',
                'fill': '#7FB4C9'
            },
            // die kleine Wahlkreise auf Deutschlandskarte
            germanStateStyle: {
                'stroke': '#9ea0a2',
                'stroke-width': 0.5,
                'stroke-linejoin': 'round',
                'fill': 'none'
            },
            headerHeight: 70,
            waypoints: {
                offsetHide: -300,
                offsetDown: 300,
                offsetUp: -200
            },
            flexslider: {
                animationSpeed: 500
            },
            // time in ms for scrolling from sticky header to state div (after click in header)
            scrollDuration: 500,
            // time in ms for fading in sticky header
            fadeInDuration: 500,
            // time in ms for fading out sticky header
            fadeOutDuration: 200,
            loadListsAjaxUrl: '',
            loadMapAjaxUrl: '',
            // timeout for ajax calls (in ms)
            ajaxTimeout: 15000,
            // time in ms for fading in lists (state lists and candidate lists)
            listsFadeInDuration: 'slow'
        };


    // initialize sticky header: add tooltips
    function initHeaderTooltips() {
        // abort when tooltips are already initialized
        if (true === _stickyHeaderInitialized) {
            return;
        }

        $('.stickyHeader nav ul li').each(function () {
            var $link = $(this).find('a');

            var $tooltip = $('<div class="tooltip"></div>');
            // place tooltip under state name
            var offsetLeft = $link.position().left + $link.width() / 2 + 5;

            // place tooltip at the bottom of the header under the corresponding map
            $tooltip.css({
                'top': _options.headerHeight - 10,
                'left': offsetLeft
            });

            var title = $link.data('title');
            $tooltip.append('<div class="graficData arrowTop"><div class="arrow"></div><span class="name">' + title + '</span></div>');
            $(this).append($tooltip);
        });

        _stickyHeaderInitialized = true;
        initSmoothScrolling();
        $(".stickyHeader").last().css("display", "none");
    }

    // add click handler for every state map: when clicked on a state map the background color is changed via different css class.
    function initSmoothScrolling() {
        $('.stickyHeader nav ul li').on('click', function () {
            var stateId = $(this).find('a').attr('href');
            scrollToState(stateId);
            // default action of link will not be triggered
            return false;
        });
    }

    function scrollToState(stateId) {
        activateStateMapInHeader(stateId.substring(1, stateId.length));

        $target = $(stateId);

        // state not existing
        if (0 === $target.length) {
            return;
        }

        // scroll to clicked state
        $('html, body').stop().animate({
                // under header
                'scrollTop': $target.offset().top - _options.headerHeight - 20
            },
            {
                duration: _options.scrollDuration,
                easing: 'swing'
            });
    }

    // init flex slider for statelist pagination
    function initStateViews() {
        $('div.state').each(function () {
            var stateId = $(this).attr('id');
            initFlexslider('#' + stateId + ' .flexslider');

            $('#' + stateId + ' .backInformation').on('click', function () {
                showStatelistDiv(stateId);
            });
        });
    }

    // switch between state list and direct candidates list
    function showStatelistDiv(stateId) {
        $('#' + stateId + ' .stateLists').removeClass('hidden');
        $('#' + stateId + ' .stateCandidates').addClass('hidden');
        $('#' + stateId + ' .backInformation').addClass('invisible');
        $('#' + stateId + ' .clickInformation').addClass('hidden');
    }

    function showCandidateListDiv(stateId) {
        $('#' + stateId + ' .stateLists').addClass('hidden');
        $('#' + stateId + ' .stateCandidates').removeClass('hidden');
        $('#' + stateId + ' .backInformation').removeClass('invisible');
        $('#' + stateId + ' .clickInformation').removeClass('hidden');
    }

    function initFlexslider(cssSelector) {
        var $flexsliderDomElement = $(cssSelector);

        // check if flexslider is already initialized for given css selector
        if (true === $flexsliderDomElement.hasClass('flexsliderInitialized')) {
            return;
        }

        $flexsliderDomElement.flexslider({
            slideshow: false,
            keyboard: false,
            animationSpeed: _options.flexslider.animationSpeed,
            start: function () {
                $(cssSelector).resize();
            },
            animation: "slide",
            useOriginalNavButtons: false
        });

        $flexsliderDomElement.addClass('flexsliderInitialized');
    }

    function activateStateMapInHeader(stateId) {
        resetAllStateMapsInHeader();
        // make current map and mapname active (different color)
        $('.stickyHeader nav ul li a.' + stateId + ' span').addClass('active');
    }

    function resetAllStateMapsInHeader() {
        // remove old activated map if available
        $('.stickyHeader nav ul li span').removeClass('active');
    }

    // show or hide sticky header
    function toggleStickyHeader(show) {
        if (true === show && false === _stickyHeaderVisible) {
            _stickyHeaderVisible = true;
            $('.stickyHeader').last().css("display", "block");
            $('.stickyHeader').last().stop(true, true).animate({ opacity: 1 }, _options.fadeInDuration, function () {
            });

        } else if (false === show) {
            _stickyHeaderVisible = false;
            $('.stickyHeader').last().stop(true, true).animate({ opacity: 0 }, _options.fadeInDuration, function () {
                $('.stickyHeader').last().css("display", "none");
            });
        }
    }

    function initWaypoints() {
        $('.map').waypoint(function () {
            drawMap(this);
        }, {
            triggerOnce: true,
            offset: "100%"
        });

        // activate (change map image) state map in header for current state when scrolling downwards
        $('div.state').waypoint(function (direction) {
            if (direction === 'down') {
                toggleStickyHeader(true);
                var stateId = $(this).attr('id');
                activateStateMapInHeader(stateId);
            }
        }, {
            triggerOnce: false,
            offset: _options.waypoints.offsetDown
        });
        // activate (change map image) state map in header for current state when scrolling upwards
        $('div.state').waypoint(function (direction) {
            if (direction === 'up') {
                var stateId = $(this).attr('id');
                activateStateMapInHeader(stateId);
            }
        }, {
            triggerOnce: false,
            offset: _options.waypoints.offsetUp
        });

        // reset all state maps (show standard colored maps) in header when div for germany is in viewport
        $('div.germany').waypoint(function (direction) {
            if (direction === 'up') {
                toggleStickyHeader(false);
                resetAllStateMapsInHeader();
            }
        }, {
            triggerOnce: false,
            offset: _options.waypoints.offsetHide
        });
    }

    function toggleWaypoints() {
        var waypointAction = (_waypointsEnabled === true) ? 'enable' : 'disable';
        $('div.germany').waypoint(waypointAction);
        $('div.state').waypoint(waypointAction);
        $('div.state').waypoint(waypointAction);
        _waypointsEnabled = !_waypointsEnabled;
    }


    /**
     * ------------------------ MAPS ------------------------------------
     */
    function drawMap(map) {
        if (_options.loadMapAjaxUrl === "") {
            console.log("electionMap.js: provide loadMapAjaxUrl to show maps");
            return;
        }

        var data_map = $(map).parents(".state, .germany").attr("id");
        if (typeof(data_map) === "undefined" || data_map === null || data_map === "") {
            console.log("electionMap.js: can't find attribute 'id' to show map");
            return;
        }
        if (data_map !== "de") {
            data_map = data_map.substring(2);
        }
        var mapUrl = encodeURI(_options.loadMapAjaxUrl + "&bl=" + data_map);

        $.ajax({
            type: "GET",
            url: mapUrl,
            dataType: "xml",
            cache: true,
            success: function (svgXML) {
                onMapLoaded(svgXML, map);
            },
            error: function () {
                console.log("electionMap.js: error on loading svg maps");
            }
        });
    }

    function onMapLoaded(svgXML, map) {
        var svg = svgXML.getElementsByTagName("svg")[0];

        // extract width and heigth information of svg
        var svgWidth = svg.getAttribute("width").replace(/[A-Za-z$-]/g, "");
        var svgHeight = svg.getAttribute("height").replace(/[A-Za-z$-]/g, "");
        var polygonSet;

        if (_isProperBrowser) {
            polygonSet = svg.querySelectorAll("polygon, path");
            svg.setAttribute("viewBox", "0 0 " + svgWidth + " " + svgHeight);
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");
            $(map).prepend(svg);
        }
        else {
            var paper = Raphael(map);
            polygonSet = paper.importSVG(svgXML);
            paper.setViewBox(0, 0, svgWidth, svgHeight);
        }

        var length = polygonSet.length;
        for (var i = 0; i < length; i++) {

            var path = _isProperBrowser ? $(polygonSet[i]) : $(polygonSet[i].node);
            path.attr("vector-effect", "non-scaling-stroke");
            var name = path.attr("id");
            // fill with colors only Wahlkreise and Bundesland.
            // Elements without id in svg will not be filled with color.
            if (typeof name === "undefined" || name === "" || (name.indexOf("B") < 0 && name.indexOf("w") < 0 )) {
                path.attr(_options.germanStateStyle);
                continue;
            }

            path.attr(_options.notHoverStyle);

            path.click(onMapClick);

            path.hover(onMapMouseHover, onMapMouseOut);
        }

        map.onmousemove = onMapMouseMove;
    }

    function onMapMouseMove(event) {
        event = event || window.event;
        var tooltip = document.getElementById("mapTooltip");
        var posX = 0, posY = 0;
        if (_isProperBrowser) {
            posX = event.pageX;
            posY = event.pageY;
        } else {
            var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
            posX = event.clientX + document.body.scrollLeft;
            posY = event.clientY + top;
        }
        var wrapper = document.getElementById("pageWrapper");
        if (typeof wrapper !== "undefined") {
            posX -= wrapper.offsetLeft;
            posY -= wrapper.offsetTop;
        }
        if (tooltip) {
            tooltip.style.top = posY + 20 + "px";
            tooltip.style.left = posX + "px";
        }
    }

    function onMapClick() {
        // if click on Germany map, then scroll to clicked federal state
        if (this.id.indexOf("B") === 0) {
            var stateId = _mapsFederalStateName[this.id];
            if (typeof(stateId) !== "undefined") {
                scrollToState("#" + stateId);
            }
            return;
        }

        // if click on federal state, then show candidate list
        var state = $(this).parents(".state");
        if (state.length === 0) return;
        var district = this.id.replace(/[A-Za-z$-]/g, "");

        loadCandidateLists(state.attr("id"), district);
    }

    function onMapMouseHover() {
        if (currentHoveredMap === this) return;
        if (typeof(this.id) === "undefined" || this.id === "") {
            console.log("on hover id not found");
            return;
        }

        if (currentHoveredMap !== null) {
            $(currentHoveredMap).attr(_options.notHoverStyle);
        }

        currentHoveredMap = this;
        $(this).attr(_options.hoverStyle);

        // put polygon to front
        if (_isProperBrowser) {
            this.parentNode.appendChild(this);
        }
        showTooltip();
    }

    function showTooltip(){
        if (!initMapsHoverTooltips()) return;

        var $tooltip = $("#mapTooltip");

        if ($tooltip.length) {
            var textForTooltip = _mapsTooltipsData[this.id];
            if (!textForTooltip) {
                console.log("electionMap.js: wrong id for hovering map");
                return;
            }

            $tooltip.css("position", "absolute");
            $tooltip.find(".name").text(textForTooltip.name);
            $tooltip.find(".electionArea").text("Wahlkreis " + textForTooltip.state);
            $tooltip.find(".graficData").addClass("mapHover");
        }
    }

    function onMapMouseOut(e) {
        var target = (e.relatedTarget) ? e.relatedTarget : e.toElement;

        // remove fill color of the map only if it not "path"
        // this is hack for Germany map to avoid blinking maps while mouse move.
        if (target && target.tagName !== "path" && target.tagName !== "polygon") {
            $(this).attr(_options.notHoverStyle);

            // put polygon to back of map
            if (_isProperBrowser) {
                this.parentNode.insertBefore(this, this.parentNode.firstChild);
            }

            currentHoveredMap = null;

            // hide tooltip
            var $tooltip = $("#mapTooltip .graficData");
            if ($tooltip.length) {
                $tooltip.removeClass("mapHover");
            }
        }
    }

    function initMapsHoverTooltips() {
        if (_mapsTooltipsData) {
            return true;
        }

        if (typeof(svgMapData) === "undefined" || svgMapData === null) {
            console.log("electionMap.js: tooltip for svg maps are not defined in backend.");
            return false;
        }

        _mapsTooltipsData = {};
        var l = svgMapData.rows.length;
        for (var i = 0; i < l; i++) {
            var v = svgMapData.rows[i].values;
            _mapsTooltipsData[v[0]] = {name: v[1], state: v[2]};
        }

        svgMapData = null;
        return true;
    }


    /**
     * ------------------------ STATE LISTS ------------------------------------
     */

        // add click listener for each party in order to load their statelist
    function initStatelistClicks() {
        $('.stateInformation ul.menu').each(function () {
            var stateId = $(this).closest('div.state').attr('id');
            var $allPartyLinks = $(this).find('li a');

            $allPartyLinks.on('click', function () {
                loadStatelist(stateId, $(this).attr('data-partyId'), this, $allPartyLinks);
            });
        });
    }

    function loadStatelist(stateId, partyId, partyLinkToActivate, $allPartyLinks) {
        var $stateDiv = $('#' + stateId + ' .flexslider.' + partyId);

        // load statelist via ajax and show it
        if (0 === $stateDiv.length) {
            showAjaxLoadingGif('#' + stateId + ' .stateList');

            $.ajax({
                url: _options.loadListsAjaxUrl + '&type=list&bl=' + stateId.substring(2) + '&p=all',
                cache: true,
                async: true,
                timeout: _options.ajaxTimeout,
                dataType: 'html',
                success: function (data) {
                    hideAllStatelists(stateId);

                    $('#' + stateId + ' .stateList').html(data);
                    showStatelist(stateId, partyId, partyLinkToActivate, $allPartyLinks);
                    initFlexslider('#' + stateId + ' .stateLists .flexslider');
                },
                complete: function () {
                    hideAjaxLoadingGif('#' + stateId + ' .stateList');
                }
            });
        }
        // statelist is already in dom (make it visible)
        else
        {
            showStatelist(stateId, partyId, partyLinkToActivate, $allPartyLinks);
        }
    }

    function showStatelist(stateId, partyId, partyLinkToActivate, $allPartyLinks) {
        $allPartyLinks.removeClass('active');
        $(partyLinkToActivate).addClass('active');

        hideAllStatelists(stateId);

        var $stateDiv = $('#' + stateId + ' .flexslider.' + partyId);
        // set display to none for fadeIn function
        $stateDiv.css('display', 'none').removeClass('hidden');
        $stateDiv.fadeIn({duration: _options.listsFadeInDuration});
    }

    // hide all state lists for specific state
    function hideAllStatelists(stateId) {
        $('#' + stateId + ' .stateList .flexslider').addClass('hidden');
    }

    /**
     * ------------------------ CANDIDATE LISTS ------------------------------------
     */

        // add click listener for each year in order to show the corresponding direct candidate list
    function initYearSelectorClicks(stateId) {
        var $allYearLinks = $('#' + stateId + ' .candidateList .yearSelector a');
        $allYearLinks.on('click', function () {
            var $allSiblingLinks = $(this).siblings('a');

            // make all sibling links inactive
            $allSiblingLinks.removeClass('active');
            // make clicked link (year) active
            $(this).addClass('active');

            var districtId = $(this).closest('.candidateList').attr('data-districtId');
            showCandidateList(stateId, districtId, $(this).attr('data-year'));
        });
    }

    function loadCandidateLists(stateId, districtId) {
        var $stateDiv = $('#' + stateId + ' .stateCandidates .candidateList.w' + districtId);

        // load candidate list via ajax and show it
        if (0 === $stateDiv.length) {

            if (!_candidateListIsLoading) {
                _candidateListIsLoading = true;
                showAjaxLoadingGif('#' + stateId + ' .stateLists');

                $.ajax({
                    url: _options.loadListsAjaxUrl + '&type=district&bl=' + stateId.substring(2) + '&wk=' + districtId,
                    cache: true,
                    async: true,
                    timeout: _options.ajaxTimeout,
                    dataType: 'html',
                    success: function (data) {
                        $('#' + stateId + ' .stateCandidates').append(data);

                        hideAllCandidateLists(stateId, districtId);
                        initFlexslider('#' + stateId + ' .stateCandidates .candidateList.w' + districtId + ' .flexslider');

                        showCandidateList(stateId, districtId);
                        initYearSelectorClicks(stateId);
                    },
                    complete: function () {
                        hideAjaxLoadingGif('#' + stateId + ' .stateLists');
                        _candidateListIsLoading = false;
                    }
                });
            }
        } else
        {
            // candidate list is already in dom (make it visible)
            hideAllCandidateLists(stateId, districtId);
            initFlexslider('#' + stateId + ' .stateCandidates .candidateList.w' + districtId + ' .flexslider');
            showCandidateList(stateId, districtId);
        }
    }

    function showCandidateList(stateId, districtId, yearSelector) {
        var $stateDiv = $('#' + stateId + ' .candidateList.w' + districtId);

        // make div visible
        showCandidateListDiv(stateId);

        // show direct candidates for specific year
        if (typeof yearSelector !== 'undefined') {
            $('#' + stateId + ' .candidateList.' + districtId + ' .flexslider').addClass('hidden');

            var $candidateList = $('#' + stateId + ' .candidateList.' + districtId + ' .flexslider.' + yearSelector);

            $candidateList.css('display', 'none').removeClass('hidden');
            $candidateList.fadeIn({duration: _options.listsFadeInDuration});
        }
        // set display to none for fadeIn function
        else {
            $stateDiv.css('display', 'none').removeClass('hidden');
            $stateDiv.fadeIn({duration: _options.listsFadeInDuration});
        }
    }

    // hide all candidate lists for all districts of a state
    function hideAllCandidateLists(stateId) {
        $('#' + stateId + ' .candidateList').addClass('hidden');
    }


    /**
     * AJAX Loader: Helper methods for visualizing ajax loading state
     */
    function showAjaxLoadingGif(cssSelector) {
        var $divContainer = $(cssSelector);

        // show ajax loading gif
        $divContainer.children().wrapAll('<div class="ajaxLoaderWrapper" />');
        $divContainer.find('.ajaxLoaderWrapper').children().wrapAll('<div class="transparentDiv" />');
        $divContainer.find('.transparentDiv').css({'opacity': '0.15', 'filter': 'alpha(opacity=15)'});
        $divContainer.find('.ajaxLoaderWrapper').append('<div class="ajaxLoadingGif" />');
    }

    function hideAjaxLoadingGif(cssSelector) {
        var $divContainer = $(cssSelector);

        // remove ajax loading visualization
        $divContainer.find('.ajaxLoaderWrapper .transparentDiv').children().unwrap();
        $divContainer.find('.ajaxLoadingGif').remove();
        $divContainer.find('.ajaxLoaderWrapper').children().unwrap();
    }

    function initRegioStyle() {
        if (publicationUrl.indexOf("morgenpost") > 0 || publicationUrl.indexOf("abendblatt") > 0) {
            // default style of federal state
            _options.notHoverStyle = {
                'stroke': '#898989',
                'stroke-width': 1,
                'stroke-linejoin': 'round',
                'fill': '#E5E5E5'
            },
                // hover style of federal state
                _options.hoverStyle = {
                    'stroke': '#4A7E3E',
                    'stroke-width': 2,
                    'stroke-linejoin': 'round',
                    'fill': '#89AD80'
                },
                // die kleine Wahlkreise auf Deutschlandskarte
                _options.germanStateStyle = {
                    'stroke': '#bdbdbd',
                    'stroke-width': 0.5,
                    'stroke-linejoin': 'round',
                    'fill': 'none'
                }
        }
    }

    /* public methods */
    var methods = {
        init: function (newOptions) {
            // extend options
            _options = jQuery.extend(_options, newOptions || {});

            if (!window.console) {
                console = { log: function () {
                } };
            }
            // init tooltips in sticky header
            initHeaderTooltips();
            initRegioStyle();
            initStatelistClicks();
            initStateViews();
            initWaypoints();
            // use Raphael.js for all IE
            _isProperBrowser = $.browser && !$.browser.msie;
        }
    };

    return methods;
})(asms.jQuery(), window, document);;/**
 *
 * @author Adrian Ramin
 * @author Igor Savchenko
 *
 * @uses jQuery, FlexSlider 2
 *
 */
asms.general.ece.widgets.electionMapHD = (function ($, window, document) {
    var currentHoveredMap = null,
        currentState = null,  // id of "state" container
        _touchEvent = "touchstart", // "click"
        _mapsTooltipsData = null, // object for mapping name of federal
        _mapsFederalStateName = { B01: 'sh', B02: 'hh', B03: 'ni', B04: 'hb', B05: 'nw', B06: 'he', B07: 'rp', B08: 'bw', B09: 'by',
            B10: 'sl', B11: 'be', B12: 'bb', B13: 'mv', B14: 'sn', B15: 'st', B16: 'th' }, // mapping for name of federal state of Germany map
        _options = {
            notHoverStyle: {  // default style of federal state
                'stroke': '#898989',
                'stroke-width': 1,
                'stroke-linejoin': 'round',
                'fill': '#E5E5E5'
            },
            hoverStyle: {     // hover style of federal state
                'stroke': '#0871A5',
                'stroke-width': 2,
                'stroke-linejoin': 'round',
                'fill': '#7FB4C9'
            },
            germanStateStyle: {  // die kleine Wahlkreise auf Deutschlandskarte
                'stroke': '#9ea0a2',
                'stroke-width': 0.5,
                'stroke-linejoin': 'round',
                'fill': 'none'
            },
            flexslider: {
                animationSpeed: 500
            },
            loadListsAjaxUrl: '',
            ajaxTimeout: 15000, // timeout for ajax calls (in ms)
            listsFadeInDuration: 'slow' // time in ms for fading in lists (state lists and candidate lists)
        };


    /**
     * ------------------------ INITIALIZATION ------------------------------------
     */

    function init() {

        // init flex slider for statelist pagination
        initFlexslider('.flexslider');

        $('.toStateList').on(_touchEvent, function (e) {
            showStatelistDiv();
            e.preventDefault();
            return false;
        });

        $(".openStateButton").on(_touchEvent, openState);
        $(".zoomInformation").on(_touchEvent, onZoomButtonTap);
        $(".closeFrame").on(_touchEvent, closeZoomMapFrame);
    }

    // switch between state list and direct candidates list
    function showStatelistDiv() {
        $('.stateLists').removeClass('hidden');
        $('.stateCandidates').addClass('hidden');
        $('.toStateList').addClass('invisible');
        $('.toGermany').removeClass('hidden');
        $('.clickInformation').addClass('hidden');
    }

    function showCandidateListDiv() {
        $('.stateLists').addClass('hidden');
        $('.stateCandidates').removeClass('hidden');
        $('.toStateList').removeClass('invisible');
        $('.toGermany').addClass('hidden');
        $('.clickInformation').removeClass('hidden');
    }

    function initFlexslider(cssSelector) {
        var $flexsliderDomElement = $(cssSelector);

        // check if flexslider is already initialized for given css selector
        if (true === $flexsliderDomElement.hasClass('flexsliderInitialized')) {
            return;
        }

        $flexsliderDomElement.flexslider({
            slideshow: false,
            keyboard: false,
            animationSpeed: _options.flexslider.animationSpeed,
            start: function (slider) {
                $(cssSelector).resize();
            },
            animation: "slide",
            useOriginalNavButtons: false
        });

        $flexsliderDomElement.addClass('flexsliderInitialized');
    }

    /**
     * ------------------------ MAP ------------------------------------
     */

    /*
     TODO Variable wie "map", "state", "tooltip" können locale Variable dieser Klasse sein
     TODO anschauen wie die Karte und Tooltip aussieht, wenn der Benutzer Doppeltap ("reinzoomen") macht
     */

    function drawMap() {

        currentState = $(".state, .germany").attr("id");
        if (typeof(currentState) === "undefined" || currentState === null || currentState === "") {
            console.log("electionMap.js: can't find attribute 'id' to show map");
            return
        }
        if (currentState !== "de") currentState = currentState.substring(2);

        var svg = $(".map svg")[0];

        // extract width and heigth information of svg
        var svgWidth = svg.getAttribute("width").replace(/[A-Za-z$-]/g, "");
        var svgHeight = svg.getAttribute("height").replace(/[A-Za-z$-]/g, "");
        var polygonSet = svg.querySelectorAll("polygon, path");
        svg.setAttribute("viewBox", "0 0 " + svgWidth + " " + svgHeight);
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");

        var length = polygonSet.length;

        for (var i = 0; i < length; i++) {

            var path = $(polygonSet[i]);
            path.attr("vector-effect", "non-scaling-stroke");
            var name = path.attr("id");
            // fill with colors only Wahlkreise and Bundesland.
            // Elements without id in svg will not be filled with color.
            if (typeof name === "undefined" || name === "" || (name.indexOf("B") < 0 && name.indexOf("w") < 0 )) {
                path.attr(_options.germanStateStyle);
                continue;
            }

            path.attr(_options.notHoverStyle);

            path.on(_touchEvent, onStateSelect);
        }
    }

    function onZoomButtonTap() {
        $(".zoomMap").prepend($(".map svg"));
        $(".zoomMap").removeClass("hidden");
        hideToolTip();
    }

    function closeZoomMapFrame() {
        $(".overview .map").prepend($(".zoomMap svg"));
        $(".zoomMap").addClass("hidden");

        // deselect map
        if (currentHoveredMap !== null) {
            $(currentHoveredMap).attr(_options.notHoverStyle);
        }
        currentHoveredMap = null;
        hideToolTip();
    }

    function hideToolTip() {
        var $tooltip = $("#mapTooltip .graficData");
        if ($tooltip.length) {
            $tooltip.removeClass("mapHover");
        }
    }


    // davor war "onMapHover"
    function onStateSelect() {
        var district = this.id.replace(/[A-Za-z$-]/g, "");
        $(".openStateButton").data("target", district);

        if (currentHoveredMap === this) return;
        if (typeof(this.id) === "undefined" || this.id === "") {
            console.log("on hover id not found");
            return;
        }

        if (currentHoveredMap !== null) {
            $(currentHoveredMap).attr(_options.notHoverStyle);
        }

        currentHoveredMap = this;
        $(this).attr(_options.hoverStyle);

        // put polygon to front
        this.parentNode.appendChild(this);

        // show tooltip
        if (!initMapsHoverTooltips()) return;

        var $tooltip = $("#mapTooltip");

        if ($tooltip.length) {
            var textForTooltip = _mapsTooltipsData[this.id];
            if (!textForTooltip) {
                console.log("electionMap.js: wrong id for hovering map");
                return;
            }

            $tooltip.find(".name").text(textForTooltip.name);
            $tooltip.find(".electionArea").text("Wahlkreis " + textForTooltip.state);
            $tooltip.find(".graficData").addClass("mapHover");

            var boundRect = this.getBoundingClientRect();
            var position = {};
            position.top = boundRect.top + boundRect.height;
            position.left = boundRect.left + boundRect.width / 2 - $tooltip.width() / 2;

            // Test if element is in visible area
            var isInViewPort = position.top + $tooltip.height() < (window.innerHeight || document.documentElement.clientHeight);

            if (isInViewPort) {
                $tooltip.find(".arrow").removeClass("rotated");
            } else {
                position.top = boundRect.top - $tooltip.height();
                if (position.top < 0) position.top = 100;
                $tooltip.find(".arrow").addClass("rotated");
            }
            $tooltip.css(position);
        }
    }

    // klick auf "ANZEIGEN" der Tooltip
    function openState() {
        var target = $(this).data("target");
        if (currentState === "de") {
            document.location.href += "&bl=" + _mapsFederalStateName["B" + target];
        }
        else {
            closeZoomMapFrame();
            loadCandidateLists(target);
        }
    }

    function initMapsHoverTooltips() {
        if (_mapsTooltipsData) return true;

        if (typeof(svgMapData) === "undefined" || svgMapData === null) {
            console.log("electionMap.js: tooltip for svg maps are not defined in backend.");
            return false;
        }

        _mapsTooltipsData = {};
        var l = svgMapData.rows.length;
        for (var i = 0; i < l; i++) {
            var v = svgMapData.rows[i].values;
            _mapsTooltipsData[v[0]] = {name: v[1], state: v[2]};
        }

        svgMapData = null;
        return true;
    }


    /**
     * ------------------------ STATE LISTS ------------------------------------
     */

        // add click listener for each party in order to load their statelist
    function initStatelistClicks() {
        $('.stateInformation .menu li').each(function () {
            $(this).on(_touchEvent, function () {
                $('.menu li.active').removeClass('active');
                $(this).addClass('active');
                var selected = $(this).find("a");
                $(".stateLists .party span").text(selected.text());
                loadStatelist(selected.attr('data-partyId'));
            });
        });
    }

    function loadStatelist(partyId) {
        var $stateDiv = $('.flexslider.' + partyId);

        // load statelist via ajax and show it
        if (0 === $stateDiv.length) {
            showAjaxLoadingGif('.stateList');

            $.ajax({
                url: _options.loadListsAjaxUrl + '&type=list&bl=' + currentState + '&p=all' + "&hd=true",
                cache: true,
                async: true,
                timeout: _options.ajaxTimeout,
                dataType: 'html',
                success: function (data) {
                    hideAllStatelists();

                    $('.stateList').html(data);
                    showStatelist(partyId);
                    initFlexslider('.stateLists .flexslider');
                    makeAllExternalLinksOpenInIframe();
                },
                complete: function () {
                    hideAjaxLoadingGif('.stateList');
                }
            });
        } else  // statelist is already in dom (make it visible)
        {
            showStatelist(partyId);
            initFlexslider('.stateLists .flexslider');
        }
    }

    function showStatelist(partyId) {

        hideAllStatelists();

        var $stateDiv = $('.flexslider.' + partyId);
        // set display to none for fadeIn function
        $stateDiv.css('display', 'none').removeClass('hidden');
        $stateDiv.fadeIn({duration: _options.listsFadeInDuration});
    }

    // hide all state lists for specific state
    function hideAllStatelists() {
        $('.stateList .flexslider').addClass('hidden');
    }

    /**
     * ------------------------ CANDIDATE LISTS ------------------------------------
     */

        // add click listener for each year in order to show the corresponding direct candidate list
    function initYearSelectorClicks() {
        var $allYearLinks = $('.candidateList .yearSelector a');
        $allYearLinks.on(_touchEvent, function (e) {
            var $allSiblingLinks = $(this).siblings('a');

            // make all sibling links inactive
            $allSiblingLinks.removeClass('active');
            // make clicked link (year) active
            $(this).addClass('active');

            var districtId = $(this).closest('.candidateList').attr('data-districtId');
            showCandidateList(districtId, $(this).attr('data-year'))
        });
    }

    function loadCandidateLists(districtId) {
        var $stateDiv = $('.stateCandidates .candidateList.w' + districtId);

        // load candidate list via ajax and show it
        if (0 === $stateDiv.length) {
            showAjaxLoadingGif('.stateLists');

            $.ajax({
                url: _options.loadListsAjaxUrl + '&type=district&bl=' + currentState + '&wk=' + districtId + "&hd=true",
                cache: true,
                async: true,
                timeout: _options.ajaxTimeout,
                dataType: 'html',
                success: function (data) {
                    $('.stateCandidates').append(data);

                    hideAllCandidateLists();
                    initFlexslider('.stateCandidates .candidateList.w' + districtId + ' .flexslider');

                    showCandidateList(districtId);
                    initYearSelectorClicks();
                    makeAllExternalLinksOpenInIframe();
                },
                complete: function () {
                    hideAjaxLoadingGif('.stateLists');
                }
            });
        } else  // candidate list is already in dom (make it visible)
        {
            hideAllCandidateLists();
            initFlexslider('.stateCandidates .candidateList.w' + districtId + ' .flexslider');
            showCandidateList(districtId);
        }
    }

    function showCandidateList(districtId, yearSelector) {
        var $stateDiv = $('.candidateList.w' + districtId);

        // make div visible
        showCandidateListDiv();

        // show direct candidates for specific year
        if (typeof yearSelector !== 'undefined') {
            $('.candidateList.' + districtId + ' .flexslider').addClass('hidden');

            var $candidateList = $('.candidateList.' + districtId + ' .flexslider.' + yearSelector);

            $candidateList.css('display', 'none').removeClass('hidden');
            $candidateList.fadeIn({duration: _options.listsFadeInDuration});
        } else { // set display to none for fadeIn function
            $stateDiv.css('display', 'none').removeClass('hidden');
            $stateDiv.fadeIn({duration: _options.listsFadeInDuration});
        }
    }

    // hide all candidate lists for all districts of a state
    function hideAllCandidateLists() {
        $('.candidateList').addClass('hidden');
    }


    /**
     * AJAX Loader: Helper methods for visualizing ajax loading state
     */
    function showAjaxLoadingGif(cssSelector) {
        var $divContainer = $(cssSelector);

        // show ajax loading gif
        $divContainer.children().wrapAll('<div class="ajaxLoaderWrapper" />');
        $divContainer.find('.ajaxLoaderWrapper').children().wrapAll('<div class="transparentDiv" />');
        $divContainer.find('.transparentDiv').css({'opacity': '0.15', 'filter': 'alpha(opacity=15)'});
        $divContainer.find('.ajaxLoaderWrapper').append('<div class="ajaxLoadingGif" />')
    }

    function hideAjaxLoadingGif(cssSelector) {
        var $divContainer = $(cssSelector);

        // remove ajax loading visualization
        $divContainer.find('.ajaxLoaderWrapper .transparentDiv').children().unwrap();
        $divContainer.find('.ajaxLoadingGif').remove();
        $divContainer.find('.ajaxLoaderWrapper').children().unwrap();
    }

    /**
     * ------------------------ EXTERNAL URL FUNCTIONALITY ------------------------------------
     */
    
    function makeAllExternalLinksOpenInIframe() {
      var $aTags = $('a[target="_blank"]');

      $aTags.each(function(){
        var $link = $(this);
        var href = $link.attr('href');
        if(href) {
          $link.attr('data-href', href);
          $link.removeAttr("href");
        }
      });
      
      $aTags.on(_touchEvent, function(e) {
        e.stopPropagation();
        showIframeContainer($(this).attr('data-href'));
        return false;
      });
      
    }

    // add markup for iframe functionality
    function initIframeFunctionality() {
      makeAllExternalLinksOpenInIframe();
      
      var $externalSiteContainer = $('<div id="externalSite"><span class="close">Schlie&szlig;en</span><iframe id="externalIframe" src="about:blank"></iframe></div>');
      $('.widget.electionMap').append($externalSiteContainer);
      
      // set height of external Wrapper
      $('#externalIframe').wrap(function(){
        var $this = $(this);
        return $('<div id="scroller"/>').css({
            width: '100%',
            height: $(window).height() - $('#externalSite .close').outerHeight() + 'px',
            overflow: 'auto',
            '-webkit-overflow-scrolling': 'touch'
        });
      });
      
      // add close button click handler
      $('#externalSite span.close').on(_touchEvent, function(e) {
        e.stopPropagation();
        hideIframeContainer();
        return false;
      });
      
      makeIframeScrollable();
    }
    
    function showIframeContainer(url) {
      var $externalSiteContainer = $('#externalSite');
      var $iframe = $('#externalIframe');
      
      $iframe.attr('src', 'about:blank');
      $iframe.attr('src', url);
      
      $externalSiteContainer.show();
    }
    
    function hideIframeContainer() {
      var $externalSiteContainer = $('#externalSite');
      
      $('#externalSite').hide();
    }
    
    function makeIframeScrollable() {
      setTimeout(function () {
          var startY = 0;
          var startX = 0;
          var b = document.body;
          b.addEventListener('touchstart', function (event) {
              parent.window.scrollTo(0, 1);
              startY = event.targetTouches[0].pageY;
              startX = event.targetTouches[0].pageX;
          });
          b.addEventListener('touchmove', function (event) {
              var posy = event.targetTouches[0].pageY;
              var h = parent.document.getElementById("scroller");
              var sty = h.scrollTop;
  
              var posx = event.targetTouches[0].pageX;
              var stx = h.scrollLeft;
              h.scrollTop = sty - (posy - startY);
              h.scrollLeft = stx - (posx - startX);
              startY = posy;
              startX = posx;
          });
      }, 1000);
    }
    
    /* public methods */
    var methods = {
        init: function (newOptions) {
            // extend options
            _options = jQuery.extend(_options, newOptions || {});

            if (!window.console) {
                console = { log: function () {
                } };
            }
            initStatelistClicks();
            init();
            drawMap();
            initIframeFunctionality();
        }
    };

    return methods;
})(asms.jQuery(), window, document);;/**
 *
 * @author Igor Savchenko
 * @author Marcus Graf <marcus.graf@asideas.de>
 *
 * @uses jQuery
 *
 */

asms.general.ece.widgets.feedtransformation = (function ($, window, document, undefined) {
    var options = {
        updateAjaxUrl: "",
        oneMinute: 60000
    };

    var currentVisibleGame = null,
        conferenceTickerUpdateIntervalId = -1,
        cookieName = "tickerWidget";

    /**
     * Adds click listener for div's with team logo
     */
    function addListener() {
        $(".widget.sportevent .gameday .item").unbind("click").bind("click", function () {
            // hide game info
            if (typeof currentVisibleGame !== 'undefined' && currentVisibleGame !== null) {
                $(".widget.sportevent .gameday .item.selected").removeClass("selected");
                $("#" + currentVisibleGame).hide();
                $.removeCookie(cookieName, { path: '/' });
            }
            var selectedId = $(this).data("game-id");
            if (currentVisibleGame === selectedId) {
                currentVisibleGame = null;
            } else {
                // show game info
                currentVisibleGame = selectedId;
                $(this).addClass("selected");
                $("#" + currentVisibleGame).show();
                createCookie(currentVisibleGame);
            }
        });
        
        $(".scoreFrame .refresh").each(function () {
            this.onclick = function () {
                updateConferenceTicker();
                return false;
            }
        });
    }

    /**
     * Update the ticker
     */
    function updateConferenceTicker() {
        $.ajax({
            url: options.updateAjaxUrl,
            type: "GET",
            dataType: "html",
            success: function (data) {
                // update ticker
                if (data.indexOf('TICKER IS LIVE') > -1) {
                    setConferenceTickerUpdateInterval(options.oneMinute);
                    if (currentVisibleGame == null) {
                        openTopGame();
                    }
                }
                else if (data.indexOf('TICKER IS SOON LIVE') > -1) {
                    setConferenceTickerUpdateInterval(options.oneMinute);
                }
                else {
                    setConferenceTickerUpdateInterval(30 * options.oneMinute);
                }
                // update html
                $(".conference_ticker").html(data);
                if (typeof currentVisibleGame !== 'undefined' && currentVisibleGame !== null) {
                    show();
                }

                addListener();
            }
        });
    }

    function show() {
        $("#" + currentVisibleGame).show();
        $("[data-game-id=" + currentVisibleGame + "]").addClass("selected");
    }

    /**
     * Set the update interval of the ticker
     * @param interval
     */
    function setConferenceTickerUpdateInterval(interval) {
        // clear old
        if (conferenceTickerUpdateIntervalId != -1) {
            window.clearInterval(conferenceTickerUpdateIntervalId);
        }
// set new
        if (interval > 0) {
            conferenceTickerUpdateIntervalId = window.setInterval(updateConferenceTicker, interval);
        }
    }

    function createCookie(value, elapsedTime) { //erstellt Cookie mit Parametern Name, Wert, abgelaufene Zeit in Minuten
        var date = new Date(); // Erstelle neues Date
        var expires;
        if (elapsedTime) { //wenn abgelaufene Zeit gesetzt
            date.setTime(date.getTime() + ((120 - elapsedTime) * 6000)); // Formel da Millisekunden (120 - Abgeaufene Zeit) * 60 Sekunden * 1000 Millisekunden um Zeit zu berechnen
        }
        else {
            date.setTime(date.getTime() + 7200000); // Wenn elapsedTime leer, dann setze auf 2 Stunden auf leer
        }
        expires = "; expires=" + date.toGMTString(); // setzt Expires auf errechnetes Datum
        document.cookie = cookieName + "=" + value + expires + "; path=/"; // setzt den Cookie
    }

    function checkCookie(name) { // Liest Cookie aus
        var nameCookie = name + "="; // setzt nameCookie
        var cookies = document.cookie.split(';'); // liest sich Cookies aus
        for (var i = 0; i < cookies.length; i++) { // geht Cookie durch
            var cookie = cookies[i]; // setzt Cookie auf aktuellen wert
            while (cookie.charAt(0) == ' ') // holt sich e rsten Wert aus Cookie
                cookie = cookie.substring(1, cookie.length); // setzt Cookie auf substring
            if (cookie.indexOf(nameCookie) == 0)
                return cookie.substring(nameCookie.length, cookie.length); // gibt Cookiewert aus
        }
        return null;
    }

    function openTopGame() {
        var topgame = $(".widget.sportevent .gameday .item.topgame");
        if (topgame.length > 0) {
            currentVisibleGame = topgame.data("game-id");
            show();
        }
    }


    function redefineRefreshButton() {
        
        $(".scoreFrame").first().find("a").last().attr("href", "http://www.welt.de/118865478");
    }

    var methods = {
        init: function (newOptions) {
            // extend options
            options = jQuery.extend(options, newOptions || {});

            updateConferenceTicker();

            var cookie = checkCookie("tickerWidget");

            if (cookie !== null) {
                currentVisibleGame = cookie;
                show();
            }
            else {
                openTopGame();
            }
            addListener();
        }
    };

    return methods;
})(asms.jQuery(), window, document);
;function reloadCaptchaForms(){
	  var answer = "";
	  $.ajax({
		  type: "GET",
		  async: false,
		  url: "/escenicCaptcha?captcha=get",
		  success: function(data){
		  answer=data;
		  }
		});
		
	  	$('#captchaImage').hide();
	    $('#captchaImage').attr('src', '/escenicCaptcha?captcha='+encodeURIComponent(answer));
		$('#captchaImage').show();
		$('#captchasalt').val(answer);
}

function commitForm(callbackUrl,fehlerText,erfolgText,falschesCaptchatext,articleId){
	// use http://bassistance.de/jquery-plugins/jquery-plugin-validation/ for validation
	if ($("#form"+articleId).valid()){
	var result = $("form").serialize();
	$('#sendStatusMessage').html("");
	
	$.ajax({
		  url: callbackUrl,
		  data: result,
		  type: "post",
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data){
		    if (data == 'false' || data == '') $('#sendStatusMessage').html(fehlerText);
		    else if (data == 'wrong') $('#sendStatusMessage').html(falschesCaptchatext);
		    else if (data == 'true') $('#sendStatusMessage').html(erfolgText);
		    else $('#sendStatusMessage').html(fehlerText);
		  },
		  error: function(jqXHR, textStatus, errorThrown){
			  $('#sendStatusMessage').html(fehlerText);
		  }
		});	
	}
}
;;/*
 ------------
 Quiztool WON
 ------------

 Das Quiz besteht aus den CTs 'quiztool_article' (Quiztool: Artikel) und 'widget_quiztool' (Quiztool: Widget).
 Die Quizdaten werden komplett im Artikel editiert und vom Widget gerendert (Außer: subtitle, title, leadtext -> Ausspielung durch Story Teaser Widget).

 Beschreibung:
 -------------

 - die kompletten Quizdaten werden bei Seitenaufruf jeweils neu aus dem Escenic Content Studio (ECS) geladen
 - die gesamte Spiellogik und Spielauswertung für den aktuellen Durchgang ist hier in JS implementiert
 - die Teaser sind funktional und ermöglichen die Beantwortung der ersten Quizfrage - zum Antwortfeedback wird in die Artikelansicht gewechselt
 - die Antworten werden per AJAX-Aufruf im Mentometer gespeichert
 - der Alle-Nutzer-Vergleich erfolgt mittels AJAX-Aufruf an das Mentometer, das entsprechende Zahlen liefert

 Legende:
 --------

 - INDEX:
 Position des Answer-<div> auf der Seite bzw. der Frage/Antwort im JSON-Objekt, entspricht je der Sortierung im ECS (ohne random/shuffle!!)

 - ID:
 eindeutige ID einer Frage, Antwort in einem Quizartikel
 Besonderheit der ID einer Antwort: Frage-ID ist immer dabei!
 Im XML des Editor-Plugins, das im CT-Feld 'tools' gespeichert wird, ist die Form der Antwort-ID: '<Frage-ID>.<Antwort-ID>' (z.B.: '2.3').
 Der Request-Param aus dem Teaser nutzt diese Form: '<Frage-ID>_<Antwort-ID>' (z.B.: '2_3').
 Im JS wird diese Information allerdings auf <Antwort-ID> reduziert (z.B: '3'), da sie als Zahl genutzt wird und die Frage-ID getrennt vorliegt

 !! Wichtig !!:
 Artikel und Widget sind mehrmals auf einer Seite platzierbar, also können diese IDs und Quiz-/Widget-IDs im Page-Context NICHT als eineindeutig angesehen werden!!!
 Es ist essentiell, den Unterschied zw. ID und INDEX zu beachten und Verwechslungen zu vermeiden!

 - Schema Antwort-Div-ID:
 aID_<FrageID>_<AntwortID>_<QuizartikelID>_<QuizwidgetID>

 - Schema Weiter-Button-ID (->'Nächste-Frage-' bzw. 'Zum Ergebnis'-Button):
 qID_<FrageID>_<QuizartikelID>_<QuizwidgetID>

 - Quiztyp (quiztype):
 es gibt 3 verschiedene Quiztypen, die auch im laufenden Betrieb gewechselt werden können:
 Text-Text (texttext):  Textfragen und Textantworten
 Bild-Text (imagetext): Fragen mit Bild, Antworten nur Text
 Text-Bild (textimage): Fragen nur Text, Antworten mit Bild

 - Spielmodus (playmode):
 es gibt 2 Spielmodi, die NICHT ohne Weiteres nach dem Livegang geändert werden sollten, da die Auswertung dann verfälscht wird:
 Einfach (single) : ein Antwortversuch pro Frage
 Mehrfach (single): mehrere Antwortversuche pro Frage

 - Fragen-Bewertungs-Array:
 ---------------------------------------------------------------------------------------------------------
 Status	=	CSS			=	Bedeutung	(Farbschemata des Fortschrittsanzeigers)	Spielmodus
 ---------------------------------------------------------------------------------------------------------
 #		=	styleclass	=	description					(oriColor)		(myColor)	Für Single / Multiple
 ---------------------------------------------------------------------------------------------------------
 0		=	<leer>		=	not answered yet			(#d5dade)		(grey)		Single, Multiple
 1		=	current		=	current question			(#0871a5)		(blue)		Single, Multiple
 2		=	wrong		=	answered wrong				(#71878c)		(red)		Single
 3		=	correct		=	answered correct			(#00911b)		(green)		Single
 4		=	wrong		=	first try answered wrong	(#71878c)		(red)		Multiple
 5		=	correct		=	first try answered correct	(#00911b)		(green)		Multiple
 ---------------------------------------------------------------------------------------------------------

 */

/* [ global Functions ] */

/* 
 * get index of current question by current question-ID 
 */
function getCurrentQuestionIndex(questionsAsJsonString, currQuestionId) {
    for (var i = 0; i < questionsAsJsonString.length; i++) {
        if (questionsAsJsonString[i].questionId == currQuestionId) {
            return i;
        }
    }
}
/* 
 * /get index of current question by current question-ID 
 */


/* 
 * get index of current answer by current question-INDEX and 'question-ID.answer-ID' 
 */
function getCurrentAnswerIndex(questionsAsJsonString, currQuestionIndex, currQuestionId, currAnswerId) {
    for (var i = 0; i < questionsAsJsonString[currQuestionIndex].answers.length; i++) {
        if (questionsAsJsonString[currQuestionIndex].answers[i].answerId == currQuestionId + '.' + currAnswerId) {
            return "" + i;
        }
    }
}
/* 
 * /get index of current answer by current question-INDEX and 'question-ID.answer-ID' 
 */


/* 
 * get ID of correct answer of current question 
 */
function getTrueAnswerId(questionsAsJsonString, questionIndex) {
    for (var i = 0; i < questionsAsJsonString[questionIndex].answers.length; i++) {
        if (questionsAsJsonString[questionIndex].answers[i].correct == true) {
            return questionsAsJsonString[questionIndex].answers[i].answerId.split(".")[1];
        }
    }
}
/* 
 * /get ID of correct answer of current question 
 */


/* 
 * get <div>-INDEX of correct answer of current question 
 */
function getTrueAnswerIndex(questionsAsJsonString, questionIndex, currTrueAnswerId) {
    for (var i = 0; i < questionsAsJsonString[questionIndex].answers.length; i++) {
        if (questionsAsJsonString[questionIndex].answers[i].answerId.split(".")[1] == currTrueAnswerId) {
            return i;
        }
    }
}
/* 
 * /get <div>-INDEX of correct answer of current question 
 */


/* 
 * get ID of new current question 
 */
function getCurrentQuestionId(questionsAsJsonString, questionIndex) {
    return "" + questionsAsJsonString[questionIndex].questionId;
}
/* 
 * /get ID of new current question 
 */


/* 
 * generate an array to hold the evaluation-markers (s.o.) for all questions (array-INDEX matches question-INDEX!)
 */
function generateQuizEvaluationArray(mode, questionsAsJSON) {				// generiert das Fragen-Bewertungs-Array
    var evalQuestions = new Array(questionsAsJSON.length - 1);				// erstellt ein Array abhängig von der Anzahl der Fragen
    if (mode == "single") {													// im Single-Spielmodus = 'ein Versuch pro Frage'
        for (var i = 0; i < questionsAsJSON.length; i++) { 					// Für jede Frage...:
            if (i == 0) {													// Wenn es das erste Array-Element ist:
                evalQuestions[i] = 1; 										// setzt Array-Element auf Status = '1' (aktuell zu spielende Frage)
            } else {														// Wenn es NICHT das erste Array-Element ist:
                evalQuestions[i] = 0;										// setzt alle anderen Array-Element auf Status = '0' (noch zu beantwortende Fragen)
            }
        }
    } else if (mode == "multiple") {										// im Multiple-Spielmodus = 'mehrere Versuche pro Frage'
        for (var i = 0; i < questionsAsJSON.length; i++) { 					// Für jede Frage...:
            var evalData = {												// initialisiert eine Status-Map, die Infos zur Auswertung aufnimmt
                status: 0,													// Wert für die Status-Informationen
                answers: []													// Array für die Infos zu den Antworten
            };
            for (var ai = 0; ai < questionsAsJSON[i].answers.length; ai++) { 	// für jede Antwortmöglichkeit...:
                evalData.answers.push({ 									// ...setze:
                    tried: false,											// Wert, ob diese Antwort (bereits) geklickt wurde
                    aid: parseInt(questionsAsJSON[i].answers[ai].answerId.split(".")[1])	// ID der Antwort
                });
            }
            if (i == 0) {													// Wenn es das erste Array-Element ist:
                evalData.status = 1;										// setzt Map-Element auf Status = '1' (aktuell zu spielende Frage)
            }
            evalQuestions[i] = evalData;									// setzt die Status-Map in das Fragen-Bewertungs-Array
        }
    }
    return evalQuestions;													// Rückgabewert: Fragen-Bewertungs-Array
}
/* 
 * /generate an array to hold the evaluation-markers for all questions 
 */


/* 
 * generate a sum of the 4 rounded values in the feedback-view that always equals 100% 
 */
function getFakedPercentDistribution(mentometerData) {
    var faking100PercentHelper = new Array(4);
    var roundedValSum = 0;
    var maxRoundedVal = 0;
    var maxRoundedValPosition = 0;
    for (i = 0; i < mentometerData.length; i++) {
        faking100PercentHelper[i] = parseInt(mentometerData[i].v * 100 + 0.5);
    }
    for (i = 0; i < mentometerData.length; i++) {
        roundedValSum = roundedValSum + faking100PercentHelper[i];
    }
    for (i = 0; i < mentometerData.length; i++) {
        if (maxRoundedVal <= faking100PercentHelper[i]) {
            maxRoundedVal = faking100PercentHelper[i];
            maxRoundedValPosition = i;
        }
    }
    if (roundedValSum == 102) { // beim Testen gab es einen Fall, bei dem die Werte tatsächlich zu 102 summierten!?
        faking100PercentHelper[maxRoundedValPosition] = faking100PercentHelper[maxRoundedValPosition] - 2;
    }
    if (roundedValSum == 101) {
        faking100PercentHelper[maxRoundedValPosition] = faking100PercentHelper[maxRoundedValPosition] - 1;
    }
    if (roundedValSum == 99) {
        faking100PercentHelper[maxRoundedValPosition] = faking100PercentHelper[maxRoundedValPosition] + 1;
    }
    if (roundedValSum == 98) { // s.o.
        faking100PercentHelper[maxRoundedValPosition] = faking100PercentHelper[maxRoundedValPosition] + 2;
    }
    return faking100PercentHelper;
}
/* 
 * /generate a sum of the 4 rounded values in the feedback-view that always equals 100% 
 */


/* [ global Variable(s) ] */

var allQuizMap = new Object();	// Fragen-Bewertungs-Array definieren


/* 
 * if the quiz did start from a teaser (Aufruf -> default.jsp)
 * 		(Im Teaser wurde eine Antwort geklickt und per Parameter (z.B. 's=2_1') übergeben, 
 * 		d.h., dass zur Frage-ID=2 die Antwort-ID=1 geklickt wurde
 * 		-> Frage mit ID=2 kann irgendwo (bzgl. INDEX) im Array 'allQuizMap[currQuizId].quizJson' stehen!)
 */
function processQuizAsTeaser(param, currQuizId, currWidgetId) {
    $("#quiz .answerWrapper div.answer").each(function () {
        if (param != "null") {								// sinnvoll bei Nutzung des 'Quiz neu beginnen'-Links
            var divId = $(this).attr("id"); 				// setzen der aktuellen ("geklickten") Antwort-Div-ID (Bsp.: aID_0_1_100225500_100225498)
            var arrIds = divId.split("_"); 					// splittet div-ID in Bestandteile, um die Quiz-IDs zu ermitteln  (Schema: siehe oben) // Steve splittermetode??
            var currQuestionId = arrIds[1];					// setzen der ID der aktuellen Frage
            var currAnswerId = arrIds[2]; 					// setzen der ID der geklickten Antwort
            var compId = arrIds[1] + "_" + arrIds[2];		// Antwort-ID entsprechend der Form des Request-Parameters (z.B.: '1_1'), nicht des XML des Fragen/Antworten-Editors (Bsp.: '1.1')
            if (param == compId) {																						// Wenn der Request-Param der geklickten Antwort entspricht:
                var currQuestionIndex = getCurrentQuestionIndex(allQuizMap[currQuizId].quizJson, currQuestionId);		// ermitteln des INDEX im 'questions'-JSON
                if (currQuestionIndex != 0) {																			// Wenn die aktuelle Frage nicht an Position '0' steht, wird sie im 'questions'-JSON dorthin getauscht
                    var temp = allQuizMap[currQuizId].quizJson[0];
                    allQuizMap[currQuizId].quizJson[0] = allQuizMap[currQuizId].quizJson[currQuestionIndex];			///// @TODO: sollte nicht mehr passieren, da shuffle optimiert: Mischen jetzt ohne Pos 0 ( -> Testen, ob das so ist!!)
                    allQuizMap[currQuizId].quizJson[currQuestionIndex] = temp;
                }
                var nextButton = $("#quiztool_" + currQuizId + " .nextbutton:eq(0)");									// ermitteln der Weiter-Button-ID (z.B.: 'qID_3_100230592_100230566')
                var split = nextButton.attr("id").split("_");															// ermitteln der ID-Bestandteile
                var newNextButtonId = split[0] + "_" + currQuestionId + "_" + split[2] + "_" + split[3];				// generieren der Weiter-Button-ID entsprechend der aktuell gespielten Frage
                nextButton.attr("id", newNextButtonId);																	// setzen der neuen Weiter-Button-ID
                processSelectedAnswer(this, currQuestionId, currAnswerId, currQuizId, currWidgetId);					// verarbeiten der geklickten Antwort
            }
        }
    });
}
/* 
 * /if the quiz did start from a teaser (Aufruf -> default.jsp)  
 */


/* 
 * process clicked answer 
 */
function processSelectedAnswer(jqFuncParam_clickedElem, currQuestionId, currAnswerId, currQuizId, currWidgetId) {

    /* [ Properties ] */
    var currEvalArray = allQuizMap[currQuizId].quizEvalArray;															// setzt das Fragen-Bewertungs-Array
    var questionsAsJsonString = allQuizMap[currQuizId].quizJson;														// setzt das Frage-Antwort-JSON-Objekt ('questions'-JSON)
    var currQuestionIndex = getCurrentQuestionIndex(questionsAsJsonString, currQuestionId);								// ermitteln des Index der aktuellen Frage im 'questions'-JSON (Div-Index = JSON-Index)  
    var currAnswerIndex = getCurrentAnswerIndex(questionsAsJsonString, currQuestionIndex, currQuestionId, currAnswerId);	// ermitteln des Positions-Index des <div.answer> = Answer-Index im 'questions.question'-JSON der aktuell geklickten Antwort
    var currTrueAnswerId = getTrueAnswerId(questionsAsJsonString, currQuestionIndex);									// ermitteln der korrekten Antwort-ID der aktuellen Frage   
    var currTrueAnswerIndex = getTrueAnswerIndex(questionsAsJsonString, currQuestionIndex, currTrueAnswerId);			// ermitteln des Positions-Index des <div.answer> = Answer-Index im 'questions.question'-JSON, das die korrekte Antwort rendert
    var feedbackText_correct = "Das war richtig";																		// setzt den Standard-Feedback-Text bei richtiger Antwort
    var feedbackText_wrong_single = "Das war leider falsch";															// setzt den Standard-Feedback-Text bei falscher Antwort im single-Modus
    var feedbackText_wrong_multiple = "Das war leider falsch. Bitte versuchen Sie es mit einer anderen Antwort.";		// setzt den Standard-Feedback-Text bei falscher Antwort im multiple-Modus
    var isAnswerCorrect = true;																							// Hilfsvariable zum Speichern der Korrektheit der gegebenen Antwort (default: Antwort ist richtig)
    // jQuery-Elemente (siehe default.jsp):
    var jqProgressBarElem = $("#quiztool_" + currQuizId + " .progressBar");									// div.ProgressBar in div.topLine
    var jqQuestionWrapperElem = $("#quiztool_" + currQuizId + " .questionWrapper");								// div.questionWrapper-Element
    var jqFeedbackElem = $("#quiztool_" + currQuizId + " .answerFeedback");								// div.answerFeedback-Element
    var jqFeedbackImgElem = $("#quiztool_" + currQuizId + " .answerFeedback img");							// img-Element in div.answerFeedback
    var jqQuestionImgImageElem = $("#quiztool_" + currQuizId + " .questionImg img");								// img-Element in div.questionImg in div.questionWrapper
    var jqFeedbackHeadlineElem = $("#quiztool_" + currQuizId + " .answerFeedback .headline");						// div.headline-Element in div.content in div.answerFeedback
    var jqFeedbackCustomTextElem = $("#quiztool_" + currQuizId + " .answerFeedback .content p");						// p-Element in div.content in div.answerFeedback
    var jqAnswerWrapperElem = $("#quiztool_" + currQuizId + " .answerWrapper");									// div.answerWrapper-Element
    /* [ /Properties ] */

    jqAnswerWrapperElem.addClass("nmb");	// macht .... ??!??!?!? @TODO: wozu ist das??????!????

    if ($(jqFuncParam_clickedElem).hasClass("answer")) {	// gilt NUR für Answer-Divs VOR dem Antwort-Klick (-> die Auswahl ist nicht mehr korrigierbar)
        // [ Anpassung Feedbackansicht und Quiz-Fortschrittsanzeiger]
        if (allQuizMap[currQuizId].quizType == 'imagetext') {																// Wenn Bild-Text-Quiztyp: Bild - Feedbackansicht 
            jqQuestionImgImageElem.attr("src", questionsAsJsonString[currQuestionIndex].imgUrlSmall)						// setzt den URL
                .attr("alt", questionsAsJsonString[currQuestionIndex].imgAlttext)							// setzt den alt-Text
                .attr("title", questionsAsJsonString[currQuestionIndex].imgCaption)						// setzt den title-Text
                .attr("width", questionsAsJsonString[currQuestionIndex].imgWidthSmall)					// setzt die Bildbreite
                .attr("height", questionsAsJsonString[currQuestionIndex].imgHeightSmall);					// setzt die Bildhöhe
        }
// 20121001 mwa: text-bild-Typ fällt bis auf Weiteres weg - 20121001 mwa: text-bild-Typ fällt bis auf Weiteres weg - 20121001 mwa: text-bild-Typ fällt bis auf Weiteres weg:      
//        if (allQuizMap[currQuizId].quizType == 'textimage') {																		// Wenn im Text-Bild-Quiztyp: Bild - Feedbackansicht:
//        	jqFeedbackImgElem.attr("src", questionsAsJsonString[currQuestionIndex].answers[currAnswerIndex].imgUrl)					// setzt den URL 
//                             .attr("alt", questionsAsJsonString[currQuestionIndex].answers[currAnswerIndex].imgAlttext)			// setzt den alt-Text
//                             .attr("title", questionsAsJsonString[currQuestionIndex].answers[currAnswerIndex].imgCaption)			// setzt den title-Text 
//                             .attr("width", questionsAsJsonString[currQuestionIndex].answers[currAnswerIndex].imgWidth)			// setzt die Bildbreite 
//                             .attr("height", questionsAsJsonString[currQuestionIndex].answers[currAnswerIndex].imgHeight);		// setzt die Bildhöhe 
//        }
// /20121001 mwa: text-bild-Typ fällt bis auf Weiteres weg - 20121001 mwa: text-bild-Typ fällt bis auf Weiteres weg - 20121001 mwa: text-bild-Typ fällt bis auf Weiteres weg  
        if (currAnswerId == currTrueAnswerId) {                                                 							// Wenn die geklickte Antwort RICHTIG ist:
            if (allQuizMap[currQuizId].quizMode == "single") {																// nur im Single-Modus an dieser Stelle:
                jqProgressBarElem.children("span:eq(" + (currQuestionIndex) + ")").removeClass().addClass("correct");			// passt den Quiz-Fortschrittsanzeiger an - markiert Frage als richtig beantwortet
            }
            jqFeedbackHeadlineElem.text(feedbackText_correct);																// setzt den Standard-Feedback-Text 
            jqFeedbackHeadlineElem.removeClass("wrong").addClass("correct");												// setzt die Schriftfarbe des Standard-Feedback-Text 
            jqFeedbackCustomTextElem.text(questionsAsJsonString[currQuestionIndex].feedbackRight);							// setzt den Custom-Feedback-Text
        } else { 																											// Wenn die geklickte Antwort FALSCH ist:
            isAnswerCorrect = false;																						// Hilfsvariable setzen: Antwort ist falsch
            $(jqProgressBarElem).children("span:eq(" + (currQuestionIndex) + ")").removeClass().addClass("wrong");				// passt den Quiz-Fortschrittsanzeiger an - markiert Frage als falsch beantwortet
            if (allQuizMap[currQuizId].quizMode == "multiple") {															// Wenn im Multiple-Modus:
                jqFeedbackHeadlineElem.text(feedbackText_wrong_multiple);													// setzt den Standard-Feedback-Text für mehrfach-Modus
            } else {																										// Wenn im Single-Modus:
                jqFeedbackHeadlineElem.text(feedbackText_wrong_single); 													// setzt den Standard-Feedback-Text für einfach-Modus
            }
            $(jqFeedbackHeadlineElem).removeClass("correct").addClass("wrong");												// setzt die Schriftfarbe des Standard-Feedback-Text
            jqFeedbackCustomTextElem.text(questionsAsJsonString[currQuestionIndex].feedbackFalse);							// setzt den Custom-Feedback-Text  
        }
        if (allQuizMap[currQuizId].quizType == 'texttext') {																// Wenn Text-Text-Quiztyp:
            jqFeedbackElem.css("visibility", "visible");																		// macht den Feedbackbereich sichtbar
        } else {																											// Sonst:
            jqFeedbackElem.css("display", "block");																			// macht den Feedbackbereich sichtbar
        }
        /* [ /Anpassung Feedbackansicht und Quiz-Fortschrittsanzeiger] */

        /* [ Anpassung Fragen-Bewertungs-Array ] */
        if (allQuizMap[currQuizId].quizMode == "single") {									// Wenn im Single-Modus:
            if (isAnswerCorrect) {															// Wenn die korrekte Antwort geklickt wurde: 
                currEvalArray[currQuestionIndex] = 3;										// markiert Frage als richtig beantwortet mit '3'
            } else {																		// Wenn eine falsche Antwort geklickt wurde: 
                currEvalArray[currQuestionIndex] = 2;										// markiert Frage als falsch beantwortet mit '2'
            }
        } else if (allQuizMap[currQuizId].quizMode == "multiple") {							// Wenn im Multiple-Modus:
            currEvalArray[currQuestionIndex].answers[currAnswerIndex].tried = true;			// markiert die geklickte Antwort
            if (isAnswerCorrect) {															// Wenn die richtige Antwort geklickt wurde (...was im multiple-Modus irgendwann passieren MUSS):
                var testIfAnsweredInFirstAttempt = 0;										// Hilsvariable zum Zählen der Antwortversuche
                for (i = 0; i < currEvalArray[currQuestionIndex].answers.length; i++) {		// Durchlaufen des Fragen-Bewertungs-Arrays, um die Antwortversuche zu zählen...:
                    if (currEvalArray[currQuestionIndex].answers[i].tried == true) {		// Wenn die Antwort geklickt wurde:
                        testIfAnsweredInFirstAttempt++;										// hochzählen der Hilfsvar.
                    }
                }
                if (testIfAnsweredInFirstAttempt <= 1) {									// Wenn die korrekte Antwort im 1. Versuch geklickt wurde:
                    currEvalArray[currQuestionIndex].status = 5; 							// markiert Frage als richtig beantwortet mit '5'
                    jqProgressBarElem.children("span:eq(" + (currQuestionIndex) + ")").removeClass().addClass("correct"); // passt den Quiz-Fortschrittsanzeiger an - markiert Frage als richtig beantwortet
                } else {
                    currEvalArray[currQuestionIndex].status = 4;							// markiert Frage als im 1. Versuch NICHT richtig beantwortet
                }
            }
        }
        /* [ /Anpassung Fragen-Bewertungs-Array ] */

        /* [ Ajax - Send Vote ] */
        if (allQuizMap[currQuizId].quizMode == "single") {									// Wenn im Single-Modus: 
            /* [ Ajax-Call im Single-Modus ] */
            var widgetAjaxUrl = allQuizMap[currQuizId].widgetAjaxUrl + "&type=addvote&aid=" + currQuizId + "&qid=" + currQuestionId + "&ansid=" + currAnswerId + "&pm=" + allQuizMap[currQuizId].quizMode + "&noq=" + allQuizMap[currQuizId].quizEvalArray.length;
            $.ajax({																		// Ajax-Call (asynchron) mit Parametern
                type: "POST",
                url: widgetAjaxUrl,
                dataType: "json",
                context: document.body
            }).done(function (data) {
                    var faking100PercentHelper = getFakedPercentDistribution(data);				// konstruieren einer Prozentverteilung, die in Summe genau 100% ergibt und nah am korrekten Ergebnis bleibt
                    $(".widget.quiztool .answerItem").each(function () {							// Für jedes Antwort-<div>...
                        var divId = $(this).attr("id");										// setzen der Antwort-Div-ID (Bsp.: aID_0_1_100225500_100225498)
                        var arrIds = divId.split("_");											// splittet div-ID in Bestandteile, um die Quiz-IDs zu ermitteln  (Schema: siehe oben)
                        var currAnswerId = arrIds[2];											// setzt die aktuelle Antwort-ID  (z.B.: '1')
                        for (i = 0; i < data.length; i++) {										// Für alle Werte der Ajax-Rückgabe (um den Alle-Nutzer-Vergleich für jede Antwort zu setzen)...:
                            if (data[i].aid == currAnswerId) {									// Wenn der Datensatz zum momentan betrachteten Antwort-<div> passt:
                                var percent = 0;												// Hilfsvariable zum Speichern der Prozentwerte
                                percent = faking100PercentHelper[i];							// setzt den Prozentwert des Alle-Nutzer-Vergleichs (Hinweis -> im Text-Bild-Modus wird der Wert NICHT angezeigt, siehe default.jsp)
                                $(this).children(".answerResult").empty();						// entfernt den jeweiligen Prozentwert des Alle-Nutzer-Vergleichs
                                $(this).children(".answerResult").append(percent + "%");		// setzt den neuen Prozentwert des Alle-Nutzer-Vergleichs
                                var jqCurrResultGaugeElem = $(this).next(".resultGauge");		// Hilfvariable setzen -> zum Ermitteln des Layouts (im Text-Bild-Modus befindet sich das div.resultGauge innerhalb von div.answerItem, sonst parallel dazu)
                                if (jqCurrResultGaugeElem.length == 0) {						// Wenn das Element div.resultGauge an dieser Stelle nicht existiert:
                                    jqCurrResultGaugeElem = $(this).children(".resultGauge");	// setzt das Element als Kind von div.answerResult
                                }
                                /* var jqCurrResultGaugeElem;	//// Layout jetzt (quiztype in Map) evtl. auch so bestimmbar...
                                 if (allQuizMap[currQuizId].quizType == "textimage") { jqCurrResultGaugeElem = $(this).children(".resultGauge");
                                 } else { jqCurrResultGaugeElem = $(this).next(".resultGauge"); }
                                 */
                                if (percent == 0) {												// Wenn der Prozentwert = 0 ist:
                                    jqCurrResultGaugeElem.css("width", "3px");					// setzt default-Breite des Ergebnisbalkens auf 3px
                                } else {														// Wenn der Prozentwert > 0 ist:
                                    jqCurrResultGaugeElem.css("width", percent + "%");			// setzt den Prozentwert als relative Breite des Ergebnisbalkens
                                }
                            }
                        }
                    });
                });
            /* [ /Ajax-Call im Single-Modus ] */
        } else if (allQuizMap[currQuizId].quizMode == "multiple") { 							// Wenn im Multiple-Modus:
            if (isAnswerCorrect) {																// Wenn die Antwort korrekt ist:
                var jqAnsItems = jqAnswerWrapperElem.children(".answerItem.wrong");				// jQuery-Hilfvariable für die Antwort-Elemente
                var ansId = "0";																// Hilfsvariable für die Antwort-IDs (Jetzt werden nur noch alle fehlerhaften Antworten gesucht)
                for (i = 0; i < jqAnsItems.length; i++) {										// Für alle Antworten der Frage...:
                    ansId += "," + $(jqAnsItems[i]).attr("id").split("_")[2];					// setzt einen String mit allen Antwort-IDs in der aktuell ausgespielten Reihenfolge
                }
                /* [ Ajax-Call im Multiple-Modus ] */
                var widgetAjaxUrl = allQuizMap[currQuizId].widgetAjaxUrl + "&type=addvote&aid=" + currQuizId + "&qid=" + currQuestionId + "&ansid=" + ansId + "&pm=" + allQuizMap[currQuizId].quizMode + "&noq=" + allQuizMap[currQuizId].quizEvalArray.length;
                $.ajax({																		// Ajax-Call (synchron) mit Parametern
                    type: "POST",
                    url: widgetAjaxUrl,
                    dataType: "json",
                    context: document.body,
                    async: false
                }).done(function (data) {
                        var faking100PercentHelper = getFakedPercentDistribution(data);				// konstruieren einer Prozentverteilung, die in Summe genau 100% ergibt und nah am korrekten Ergebnis bleibt
                        $(".widget.quiztool .answerItem").each(function () {							// Für jedes Antwort-<div>...
                            var divId = $(this).attr("id");										// setzen der Antwort-Div-ID (Bsp.: aID_0_1_100225500_100225498)
                            var arrIds = divId.split("_");											// splittet div-ID in Bestandteile, um die Quiz-IDs zu ermitteln  (Schema: siehe oben)
                            var currAnswerId = arrIds[2];											// setzt die aktuelle Antwort-ID  (z.B.: '1')
                            for (i = 0; i < data.length; i++) {										// Für alle Werte der Ajax-Rückgabe,
                                if (data[i].aid == currAnswerId) {									// Wenn es die aktuell geklickte Antwort ist:
                                    // @TODO: faking im multiple-Modus EVTL. nicht notwendig (-> Testen!), da interne Berechnung int nutzt -> s. de.axelspringer.asms.widget.quiztool.tags.QuiztoolMentometerManager.getPercent(...)
                                    var percent = 0;												// Hilfsvariable zum Speichern der Prozentwerte
                                    percent = faking100PercentHelper[i];							// setzt den Prozentwert des Alle-Nutzer-Vergleichs (Hinweis -> im Text-Bild-Modus wird der Wert NICHT angezeigt, siehe default.jsp)
                                    $(this).children(".answerResult").empty();						// entfernt den jeweiligen Prozentwert des Alle-Nutzer-Vergleichs
                                    $(this).children(".answerResult").append(percent + "%");		// setzt den neuen Prozentwert des Alle-Nutzer-Vergleichs
                                    var jqCurrResultGaugeElem = $(this).next(".resultGauge");		// jQuery-Hilfvariable setzen -> zum Ermitteln des Layouts (im Text-Bild-Modus befindet sich das div.resultGauge innerhalb von div.answerItem, sonst parallel dazu)
                                    if (jqCurrResultGaugeElem.length == 0) {						// Wenn das Element div.resultGauge an dieser Stelle nicht existiert:
                                        jqCurrResultGaugeElem = $(this).children(".resultGauge");	// setzt das Element als Kind von div.answerResult
                                    }
                                    if (percent == 0) {												// Wenn der Prozentwert = 0 ist:
                                        jqCurrResultGaugeElem.css("width", "3px");					// setzt default-Breite des Ergebnisbalkens auf 3px
                                    } else {														// Wenn der Prozentwert > 0 ist:
                                        jqCurrResultGaugeElem.css("width", percent + "%");			// setzt den Prozentwert als relative Breite des Ergebnisbalkens
                                    }
                                }
                            }
                        });
                    });
                /* [ /Ajax-Call im Multiple-Modus ] */
            }
        }
        /* [ /Ajax - Send Vote ] */

        /* [ Weiter-Button-Anzeige ] */
        var showNextButton = false;															// Hilfsvariable zum Speichern der Sichtbarkeit des Weiter-Buttons
        if (allQuizMap[currQuizId].quizMode == "multiple") {								// Wenn im Multiple-Modus:
            if (isAnswerCorrect) {															// Wenn die Antwort korrekt ist:
                showNextButton = true;														// bestimmen, dass Weiter-Button angezeigt werden soll
            } else if ($(jqFuncParam_clickedElem).siblings("div.correct").length > 0) {		// Wenn eine der geklickten Antworten korrekt ist:
                showNextButton = true;														// bestimmen, dass Weiter-Button angezeigt werden soll
            }
        } else if (allQuizMap[currQuizId].quizMode == "single") {							// Wenn im Single-Modus:
            showNextButton = true;															// bestimmen, dass Weiter-Button angezeigt werden soll
        }
        if (showNextButton) {																// Wenn der Weiter-Button angezeigt werden soll:
            if ((parseInt(currQuestionIndex) + 1) == currEvalArray.length) {				// Wenn die letzte Frage erreicht ist: 
                $("#quiztool_" + currQuizId + " .nextbutton span").text("Zum Ergebnis");	// anpassen der Button-Beschriftung 
            }
            $("#quiztool_" + currQuizId + " .nextbutton").css("display", "block");			// macht den Weiter-Button sichtbar
        }
        /* [ /Weiter-Button-Anzeige ] */

        /* [ Antworten markieren ] */
        if (allQuizMap[currQuizId].quizMode == "single") {																					// Wenn im Single-Modus: 
            $("#aID_" + currQuestionId + "_" + currTrueAnswerId + "_" + currQuizId + "_" + currWidgetId).removeClass("answer").addClass("correct");		// markiert die richtige Antwort (unabh. davon, ob sie geklickt wurde!)
            for (var i = 0; i < questionsAsJsonString[currQuestionIndex].answers.length; i++) { 												// Durchlaufen der Antworten, um die geklickte Antwort (u. falls 'falsch', zusätzlich die richtige) zu markieren...
                var indexCurrTrueAnswerDiv = parseInt(currTrueAnswerIndex); 																// konvertieren des INDEX der korrekten Antwort in eine Zahl 
                if (i == indexCurrTrueAnswerDiv) {																							// Wenn das <div> die korrekte Antwort enthält:
                    jqAnswerWrapperElem.find("div.resultGauge:eq(" + (i) + ")").removeClass("wro").addClass("cor"); 							// setzt die Farbe des Ergbnisbalkens (grün)
                    if (currAnswerId != currTrueAnswerId) {																					// Wenn die geklickte Antwort falsch ist:
                        $(jqFuncParam_clickedElem).addClass("wrong select");																// markiert die Antwort als falsch ('wrong') UND geklickt ('select') 
                    } else {																												// Wenn die geklickte Antwort richtig ist:
                        $(jqFuncParam_clickedElem).addClass("select");																		// markiert die Antwort als falsch ('wrong') UND geklickt ('select') 
                    }
                } else {																													// Wenn das <div> eine falsche Antwort enthält:
                    jqAnswerWrapperElem.children("div[id]:eq(" + (i) + ")").removeClass("answer").addClass("wrong");							// markiert die Antwort als falsch ('wrong')
                    if (i == currAnswerIndex) { 																							// Wenn das <div> die geklickte Antwort enthält:
                        jqAnswerWrapperElem.find("div.resultGauge:eq(" + (i) + ")").removeClass("cor").addClass("wro"); 						// setzt die Farbe des Ergbnisbalken (rot)
                    }
                }
            }
        } else if (allQuizMap[currQuizId].quizMode == "multiple") {																			// Wenn im Multiple-Modus:
            if (isAnswerCorrect) {																											// Wenn die korrekte Antwort geklickt wurde: 
                $(jqFuncParam_clickedElem).removeClass("answer").addClass("correct select");												// markiert die richtige Antwort
                $(jqFuncParam_clickedElem).siblings(".answer").addClass("fix");																// verhindert das Ändern der Antwortauswahl
                jqAnswerWrapperElem.find("div.ans-" + currAnswerId).removeClass("wro").addClass("cor");										// setzt die Farbe des Ergbnisbalkens (grün)
            } else {																														// Wenn eine falsche Antwort geklickt wurde:
                $(jqFuncParam_clickedElem).removeClass("answer").addClass("wrong select");													// markiert die Antwort als falsch ('wrong') UND geklickt ('select') 
                jqAnswerWrapperElem.find("div.ans-" + currAnswerId).removeClass("cor").addClass("wro");										// setzt die Farbe des Ergbnisbalken (rot)
            }
        }
        /* [ /Antworten markieren ] */

        /* [ Buchstaben entfernen ] */
        if (allQuizMap[currQuizId].quizMode == "single") {										// Wenn im Single-Modus: 
            var jqAnswerElems = jqAnswerWrapperElem.children(".answer,.wrong,.correct");		// jQuery-Hilfvariable für die Antwort-Elemente
            jqAnswerElems.each(function () {														// Für jedes Antwort-Element...:
                var answerCountElems = $(this).children("span.answerCount:eq(0)");				// ermittelt das jeweilige span.answerCount-Element
                answerCountElems.text("");														// entfernt die jeweilige Nummerierung
            });
        } else if (allQuizMap[currQuizId].quizMode == "multiple") {								// Wenn im Multiple-Modus:
            var jqAnswerElems = jqAnswerWrapperElem.children(".wrong,.correct");				// jQuery-Hilfvariable für die Antwort-Elemente
            jqAnswerElems.each(function () {														// Für jedes Antwort-Element...:
                var answerCountElems = $(this).children("span.answerCount:eq(0)");				// ermittelt das jeweilige span.answerCount-Element
                answerCountElems.text("");														// entfernt die jeweilige Nummerierung
            });
        }
        /* [ /Buchstaben entfernen ] */
    }
    // ENDE gilt NUR für Answer-Divs VOR dem Antwort-Klick (-> die Auswahl ist nicht mehr korrigierbar)
}
// ENDE function processSelectedAnswer(jqFuncParam_clickedElem, currQuestionId, currAnswerId, currQuizId, currWidgetId) 
/* /process clicked answer */


/* process clicked next-button */
function processNextButton(jqFuncParam_clickedNextButton, currQuestionId, currQuizId, currWidgetId) {

    /* [ Properties ] */
    var currEvalArray2 = allQuizMap[currQuizId].quizEvalArray;										// setzt das Fragen-Bewertungs-Array zu diesem Quiz
    var questionsAsJsonString = allQuizMap[currQuizId].quizJson;									// setzt das Frage-Antwort-JSON-Objekt ('questions'-JSON)
    var currQuestionIndex = getCurrentQuestionIndex(questionsAsJsonString, currQuestionId);			// ermitteln des Index der aktuellen Frage im 'questions'-JSON (Div-Index = JSON-Index)
    var resultText = "Vielen Dank für Ihre Teilnahme.";												// default-Text für den Custom-Feedback-Text
    var newCurrQuestionIndex = parseInt(currQuestionIndex) + 1;										// setzt den Index der neuen Frage
    // jQuery-Elemente (siehe default.jsp):
    var jqProgressBarElem = $("#quiztool_" + currQuizId + " .progressBar");					// div.ProgressBar in div.topLine
    var jqFeedbackElem = $("#quiztool_" + currQuizId + " .answerFeedback");				// div.answerFeedback-Element
    var jqInfolinkElem = $("#quiztool_" + currQuizId + " .infolink");						// div.infolink-Element
    var jqQuestionWrapperElem = $("#quiztool_" + currQuizId + " .questionWrapper");				// div.questionWrapper-Element
    var jqQuestionImgImageElem = $("#quiztool_" + currQuizId + " .questionImg img");				// img-Element in div.questionImg in div.questionWrapper
    var jqAnswerWrapperElem = $("#quiztool_" + currQuizId + " .answerWrapper");					// div.answerWrapper-Element
    var jqResultGaugeElem = $("#quiztool_" + currQuizId + " .answerWrapper .resultGauge");	// div.resultGauge-Element
    /* [ /Properties ] */

    /* [ Result-Page ] */
    if (newCurrQuestionIndex >= questionsAsJsonString.length) { 										// Wenn die letzte Frage erreicht ist wird auf die Endauswertung verlinkt, statt der nächsten Frage -> Result-Seite
        if (allQuizMap[currQuizId].quizMode == "single") {												// Wenn im Single-Modus:
            var correctAnswersCount = 0;																// Hilsvariable zum Zählen der korrekt gegebenen Antworten 
            for (var i = 0; i < currEvalArray2.length; i++) {												// Für alle (beantworteten) Fragen (Fragen-Bewertungs-Array)...:
                if (currEvalArray2[i] == 3) {															// Wenn die Frage richtig beantwortet wurde (Status-Code = 3 = correct im single-Modus) 
                    correctAnswersCount++;																// hochzählen der Hilfsvar. 
                }
            }
            var correctAnswersPercent = Math.round(correctAnswersCount / (currEvalArray2.length) * 100);	// ermittelt den Anteil der richtigen Antworten in Prozent
            if (correctAnswersPercent < 25) {															// Wenn der Anteil richtiger Antworten kleiner als 25% ist:
                resultText = allQuizMap[currQuizId].resultText1;										// setzt den entsprechenden Ergebnistext
            }
            if (correctAnswersPercent >= 25 && correctAnswersPercent < 50) {							// ... >= 25% und < 50% ...:
                resultText = allQuizMap[currQuizId].resultText2;										// setzt den entsprechenden Ergebnistext
            }
            if (correctAnswersPercent >= 50 && correctAnswersPercent < 75) {							// ... >= 50% und < 75% ...:
                resultText = allQuizMap[currQuizId].resultText3;										// setzt den entsprechenden Ergebnistext
            }
            if (correctAnswersPercent >= 75 && correctAnswersPercent < 95) {							// ... >= 75% und < 95% ...:
                resultText = allQuizMap[currQuizId].resultText4;										// setzt den entsprechenden Ergebnistext
            }
            if (correctAnswersPercent >= 95) {															// ... >= 95% ...:
                resultText = allQuizMap[currQuizId].resultText5;										// setzt den entsprechenden Ergebnistext
            }
            /* [ Ajax-Call ] */
            var widgetAjaxUrl = allQuizMap[currQuizId].widgetAjaxUrl + "&type=result&mode=single&rt=" + encodeURI(resultText) + "&noq=" + currEvalArray2.length + "&cac=" + correctAnswersCount + "&cap=" + encodeURI(correctAnswersPercent) + "&es=" + currEvalArray2.join(",") + "&aid=" + currQuizId;
            if (allQuizMap[currQuizId].widgetAjaxUrl.length != 0) {
                $.ajax({																				// Ajax-Call (asynchron) mit Parametern
                    url: widgetAjaxUrl,
                    context: document.body
                }).done(function (data) {
                        var widgetDiv = $(".widget.quiztool.default");

                        widgetDiv.empty();
                        widgetDiv.append(data);

                        /* [ Tracking ] */
                        var tracking = generateTrackingDataForResultPage(allQuizMap[currQuizId]);
                        if (typeof(getCounters) != "undefined") {
                            getCounters(tracking);
                        }
                        /* [ /Tracking ] */
                    });
            }
            /* [ /Ajax-Call ] */
            return;
        } else if (allQuizMap[currQuizId].quizMode == "multiple") {												// Wenn im Multiple-Modus:
            var numberOfTries = 0;																				// Hilfsvariable für das Zählen der Antwortversuche
            var evalString = [];																				// Hilfsvariable zum Speichern der Status-Codes
            var numOfWrongAnswers = currEvalArray2.length * (3);												// Hilfsvariable für die Anzahl der möglichen, falschen Antworten (immer 4 Antworten, immer eine richtig)
            var numOfWrongSelectedAnswers = 0;																	// Hilfsvariable für die Anzahl der falschen Antworten, die der Benutzer geklickt hat
            var percWrong = 0;																					// Hilfsvariable für das Verhältnis der geklickten falschen Antworten zu den möglichen, falschen Antworten
            for (var i = 0; i < currEvalArray2.length; i++) {														// Für alle (beantworteten) Fragen (Fragen-Bewertungs-Array)...:
                evalString.push(currEvalArray2[i].status);														// setzen des Status-Codes als Werte im eval-String, die in 'resulMultiple.jsp' ausgewertet werden. Folgende Werte sind möglich: Status-Code = ( 0 | 4 | 5 ) 
                for (var ai = 0; ai < currEvalArray2[i].answers.length; ai++) {									// Für alle Antworten der jeweiligen Frage...:
                    if (currEvalArray2[i].answers[ai].tried) {													// Wenn diese Antwort geklickt wurde:
                        numberOfTries++;																		// hochzählen der Hilfsvar. 
                    }
                }
            }
            /*
             // Debug-Code, um den Weg über den Tomcat zu erzwingen
             var wonIndexPos= allQuizMap[currQuizId].widgetAjaxUrl.indexOf(":8580/won/");
             if (wonIndexPos == -1) {
             var newUrl = "http://vmware.welt.de:8580/won" + allQuizMap[currQuizId].widgetAjaxUrl.substring("http://vmware.welt.de".length, allQuizMap[currQuizId].widgetAjaxUrl.length);
             allQuizMap[currQuizId].widgetAjaxUrl = newUrl;
             }
             */
            for (qi = 0; qi < currEvalArray2.length; qi++) {													// Für alle Fragen...:
                for (ai = 0; ai < currEvalArray2[qi].answers.length; ai++) {									// Für alle Antworten einer Frage...:
                    if (currEvalArray2[qi].answers[ai].tried && currEvalArray2[qi].answers[ai].aid != 0) {		// Wenn die jeweilige Antwort geklickt wurde UND die Antwort-ID NICHT '0' ist:
                        numOfWrongSelectedAnswers++;															// hochzählen der Hilfsvar.
                    }
                }
            }
            percWrong = numOfWrongSelectedAnswers / numOfWrongAnswers;											// ermittelt und setzt den Anteil der falschgegebenen Antworten
            /* [ Ajax-Call ] */
            var widgetAjaxUrl = allQuizMap[currQuizId].widgetAjaxUrl + "&type=result&mode=multiple&aid=" + currQuizId + "&noq=" + currEvalArray2.length + "&not=" + numberOfTries + "&es=" + evalString + "&pw=" + percWrong;
            if (allQuizMap[currQuizId].widgetAjaxUrl.length != 0) {
                $.ajax({																						// Ajax-Call (asynchron) mit Parametern
                    url: widgetAjaxUrl,
                    context: document.body
                }).done(function (data) {
                        var widgetDiv = $(".widget.quiztool.default");
                        widgetDiv.empty();
                        widgetDiv.append(data);

                        /* [ Tracking ] */
                        var tracking = generateTrackingDataForResultPage(allQuizMap[currQuizId]);
                        if (typeof(getCounters) != "undefined") {
                            getCounters(tracking);
                        }
                        /* [ /Tracking ] */
                    });
            }
            /* [ /Ajax-Call ] */
            return;
        }
    }
    /* [ /Result-Page ] */
    var newCurrQuestionId = getCurrentQuestionId(questionsAsJsonString, 1 * currQuestionIndex + 1);									// setzt die ID der neuen Frage
    $("#quiztool_" + currQuizId + " div.topLine > .counter > span.from").text(newCurrQuestionIndex + 1);							// schreibt die laufende Nr. der aktuellen Frage in den Fragen-Zähler   
    if (allQuizMap[currQuizId].quizMode == "single") {																				// Wenn im Single-Modus: 
        currEvalArray2[newCurrQuestionIndex] = 1;																					// markiert nächste Frage als aktuell (Fragen-Bewertungs-Array)
    } else if (allQuizMap[currQuizId].quizMode == "multiple") {																		// Wenn im Multiple-Modus: 
        currEvalArray2[newCurrQuestionIndex].status = 1;																			// markiert nächste Frage als aktuell (Fragen-Bewertungs-Array)
    }
    jqProgressBarElem.children("span:eq(" + (newCurrQuestionIndex) + ")").removeClass().addClass("current");							// passt den Quiz-Fortschrittsanzeiger an - markiert die aktuelle Frage
    if (allQuizMap[currQuizId].quizType == 'imagetext') {																			// Wenn der Bild-Text-Quiztyp gespielt wird (setzt das Bild der nächsten Frage):
        jqQuestionImgImageElem.attr("src", questionsAsJsonString[newCurrQuestionIndex].imgUrl)										// setzt den URL
            .attr("alt", questionsAsJsonString[newCurrQuestionIndex].imgAlttext)									// setzt den alt-Text
            .attr("title", questionsAsJsonString[newCurrQuestionIndex].imgCaption)								// setzt den title-Text
            .attr("width", questionsAsJsonString[newCurrQuestionIndex].imgWidth)									// setzt die Bildbreite
            .attr("height", questionsAsJsonString[newCurrQuestionIndex].imgHeight);								// setzt die Bildhöhe
    }
    jqQuestionImgImageElem.css("display", "block");																					// macht das Bild zur Frage sichtbar
    if (questionsAsJsonString[newCurrQuestionIndex].infoartikelId == -1) {															// Wenn KEIN Infoartikel vorhanden ist: 
        jqInfolinkElem.css("display", "none");																						// versteckt den Infoartikel-Link
    } else {																														// Wenn ein Infoartikel vorhanden ist: 
        jqInfolinkElem.find("a").attr("href", questionsAsJsonString[newCurrQuestionIndex].infoartikelUrl)							// setzt den Infoartikel-Link-URL
            .text(questionsAsJsonString[newCurrQuestionIndex].infoartikelTitle);							// setzt den Infoartikel-Link-Text
        jqInfolinkElem.find(".relatedArticle span").text(questionsAsJsonString[newCurrQuestionIndex].infoartikelSubtitle);			// setzt die Infoartikel-Dachzeile 
        jqInfolinkElem.show();																										// macht den Infoartikel-Link sichtbar   
    }
    jqQuestionWrapperElem.find(".question").text(questionsAsJsonString[newCurrQuestionIndex].text);									// setzt die neue Frage 
    jqAnswerWrapperElem.children("div[id]").removeClass("wrong select correct").addClass("answer");									// setzt den Antwort-<div>-Style zurück 
    jqAnswerWrapperElem.find(".fix").removeClass("fix");																			// entfernt die Markierungsfixierung der Antwortfelder
    jqAnswerWrapperElem.find("div.resultGauge").css("width", "0");																	// versteckt den Ergebnisbalken
    if (allQuizMap[currQuizId].quizType == 'texttext') {																			// Wenn Text-Text-Quiztyp:
        jqFeedbackElem.css("visibility", "hidden");																					// versteckt die Feedbackansicht
    } else {																														// Sonst:
        jqFeedbackElem.css("display", "none");																						// versteckt die Feedbackansicht
    }
    $(jqFuncParam_clickedNextButton).css("display", "none");																			// versteckt den Nächste-Frage-Button
    $(jqFuncParam_clickedNextButton).attr("id", "qID_" + newCurrQuestionId + "_" + currQuizId + "_" + currWidgetId);							// setzt die ID des Nächste-Frage-Button
//    $("#quiztool_" + currQuizId + " .answerWrapper .answerResult").empty(); 														// ALT:  die Prozentangaben
//    jqAnswerWrapperElem.find("span.answerResult").text(""); 																		// NEU (funzt): entfernt die Prozentangaben
    $("span.answerResult", jqAnswerWrapperElem).empty();																			// NEU (funzt auch): entfernt die Prozentangaben des Alle-Nutzer-Vergleichs
    jqResultGaugeElem.attr("style", "");																							// entfernt die Element-Styles der Prozentbalken
    jqResultGaugeElem.removeClass("wro cor ans-0 ans-1 ans-2 ans-3");																// entfernt die Styleklassen der Prozentbalken
    for (var i = 0; i < questionsAsJsonString[newCurrQuestionIndex].answers.length; i++) {											// Für alle Antworten der nächsten Frgae...:
        var answerindicator = i;																									// Hilfsvariable für die Antwortnummerierung (A, B , C oder D)
        if (i == 0) answerindicator = " A ";																						// setzt die Hilfsvariable für die erste Frage  (A)
        if (i == 1) answerindicator = " B ";																						// setzt die Hilfsvariable für die zweite Frage (B)
        if (i == 2) answerindicator = " C ";																						// setzt die Hilfsvariable für die dritte Frage (C)
        if (i == 3) answerindicator = " D ";																						// setzt die Hilfsvariable für die vierte Frage (D)
        jqAnswerWrapperElem.find("span.answerCount:eq(" + (i) + ")").text(answerindicator);												// setzt jeweils die Buchstaben in den <span>s mit class='answerCount'
        jqAnswerWrapperElem.find("span.answerText:eq(" + (i) + ")").text(questionsAsJsonString[newCurrQuestionIndex].answers[i].text);	// setzt jeweils die neue Antwort
        var jsonaid = questionsAsJsonString[newCurrQuestionIndex].answers[i].answerId.split(".")[1];								// ermitteln und setzen der Antwort-ID
        var answerElemId = "aID_" + newCurrQuestionId + "_" + jsonaid + "_" + currQuizId + "_" + currWidgetId;									// ermitteln der Antwort-<div>-ID
        jqAnswerWrapperElem.children("div[id]:eq(" + (i) + ")").attr("id", answerElemId); 												// setzt jeweils die neue ID des Antwort-<div>
        jqAnswerWrapperElem.find(".resultGauge:eq(" + (i) + ")").addClass("ans-" + jsonaid); 												// setzt die style-Klasse entsprechend zur Antwort-ID

        if (allQuizMap[currQuizId].quizType == 'textimage') {																				// Wenn Text-Bild-Quiztyp (setzt jeweils das neue Bild pro Antwort): 
            jqAnswerWrapperElem.find("img:eq(" + (i) + ")").attr("src", questionsAsJsonString[newCurrQuestionIndex].answers[i].imgUrl);			// setzt den URL
            jqAnswerWrapperElem.find("img:eq(" + (i) + ")").attr("alt", questionsAsJsonString[newCurrQuestionIndex].answers[i].imgAlttext);		// setzt den alt-Text
            jqAnswerWrapperElem.find("img:eq(" + (i) + ")").attr("title", questionsAsJsonString[newCurrQuestionIndex].answers[i].imgCaption);	// setzt den title-Text
            jqAnswerWrapperElem.find("img:eq(" + (i) + ")").attr("width", questionsAsJsonString[newCurrQuestionIndex].answers[i].imgWidth);		// setzt die Bildbreite
            jqAnswerWrapperElem.find("img:eq(" + (i) + ")").attr("height", questionsAsJsonString[newCurrQuestionIndex].answers[i].imgHeight);	// setzt die Bildhöhe
        }
    }
    /* [ Tracking ] */
    var tracking = generateTrackingData(allQuizMap[currQuizId], newCurrQuestionId);
    if (typeof(getCounters) != "undefined") {
        getCounters(tracking);
    }
    /* [ /Tracking ] */
} // ENDE function processNextButton(jqFuncParam_clickedNextButton, currQuestionId, currQuizId, currWidgetId) 
/* /process clicked next-button */


/* generate question-level data to be used for WebTrekk by widget-asms-tracking */
function generateTrackingData(quizData, questionId) {
    var tracking = quizData.trackingData.clone();
    var questionTitle = "";
    for (i = 0; i < quizData.quizJson.length; i++) {
        if (quizData.quizJson[i].questionId == questionId) {
            questionTitle = quizData.quizJson[i].text;
            break;
        }
    }
    var qid = parseInt(questionId);
    var qidString = "";
    if (qid < 10) {
        qidString = "0" + (qid + 1);
    } else {
        qidString = "" + (qid + 1);
    }
    tracking.customParameter10 = "Quiz Frage " + qidString;
    // for Firebug - to check the data
//    console.log(tracking);
    return tracking;
} // ENDE function generateTrackingData(quizData, questionId)
/* /generate question-level data to be used for WebTrekk by widget-asms-tracking */

function generateTrackingDataForResultPage(quizData) {
    var tracking = quizData.trackingData.clone();
    tracking.customParameter10 = "Quiz Ergebnisseite";
    // for Firebug - to check the data
//    console.log(tracking);
    return tracking;
}

/* initialize quiz */
function init_quiz(quizArticleId, quizArticleQuestionsJSON, quizArticleQuizType, quizMode, trackingData, sendInitTrack, widgetAjaxUrl, resultText1, resultText2, resultText3, resultText4, resultText5) {

    /* [ initialisieren der Map mit dem JSON-Objekt, Evaluation-Array und weiteren Einstellungen/Eigenschaften des aktuellen Quiz-Artikels ] */
    allQuizMap[quizArticleId] = {
        quizJson: quizArticleQuestionsJSON,
        quizEvalArray: generateQuizEvaluationArray(quizMode, quizArticleQuestionsJSON),
        quizType: quizArticleQuizType,
        quizMode: quizMode,
        widgetAjaxUrl: widgetAjaxUrl,
        resultText1: resultText1,
        resultText2: resultText2,
        resultText3: resultText3,
        resultText4: resultText4,
        resultText5: resultText5,
        trackingData: trackingData
    };
    /* [ /initialisieren der Map mit dem JSON-Objekt, Evaluation-Array und weiteren Einstellungen/Eigenschaften des aktuellen Quiz-Artikels ] */
    /* [ Tracking ] */
    if (sendInitTrack) {
        var currQuestionId = parseInt($("#quiztool_" + quizArticleId + " .answerItem:eq(0)").attr("id").split("_")[1]);
        var tracking = generateTrackingData(allQuizMap[quizArticleId], currQuestionId);
        if (typeof(getCounters) != "undefined") {
            getCounters(tracking);
        }
    }
    /* [ /Tracking ] */

    /* [ process clicked answer ] */
    /* @TODO: Debug-Code für den Firebug-Konsole-Befehlseditor ( -> Klick unten rechts in Kreis mit Pfeil: Befehlseditor <-> Kommandozeile umschalten) */
    // $("#quiztool_" + quizArticleId + " .answer").unbind("click");  
    /*/@TODO: Debug-Code für den Firebug-Konsole-Befehlseditor ( -> Klick unten rechts in Kreis mit Pfeil: Befehlseditor <-> Kommandozeile umschalten) */
    $("#quiztool_" + quizArticleId + " .answer").click(function () {	// d.h.: bei einem Klick - im jeweiligen Quiz - auf irgendeine Antwort
        var divId = $(this).attr("id");															// setzen der aktuellen ("geklickten") Antwort-Div-ID (Bsp.: aID_0_1_100225500_100225498)
        var arrIds = divId.split("_");															// splittet div-ID in Bestandteile, um die Quiz-IDs zu ermitteln  (Schema: siehe oben) 
        var currQuestionId = arrIds[1];														// setzen der ID der aktuellen Frage
        var currAnswerId = arrIds[2];														// setzen der ID der geklickten Antwort
        var currQuizId = arrIds[3];														// setzen der ID des Quiz-Artikels
        var currWidgetId = arrIds[4];														// setzen der ID des Quiz-Widgets
        // @TODO: Debug-Code: alert("hier!");
        // Fragen-Bewertungs-Array: Werte sind abh. vom Spielmodus 
        if (allQuizMap[currQuizId].quizMode == "multiple") {
            var questionEval = allQuizMap[quizArticleId].quizEvalArray[getCurrentQuestionIndex(allQuizMap[quizArticleId].quizJson, currQuestionId)].status;
            // wrong(4) oder correct(5) beziehen sich auf den 1. Antwortversuch!!
            if (questionEval == 4 || questionEval == 5) {
                return;
            }
        } else if (allQuizMap[currQuizId].quizMode == "single") {
            var questionEval = allQuizMap[quizArticleId].quizEvalArray[getCurrentQuestionIndex(allQuizMap[quizArticleId].quizJson, currQuestionId)];
            if (questionEval == 2 || questionEval == 3) {										// Wenn die Frage beantwortet wurde: 
                return;
            }
        }
        processSelectedAnswer(this, currQuestionId, currAnswerId, currQuizId, currWidgetId);	// verarbeiten der geklickten Antwort
    }); // ENDE jQuery:answer.click 
    /* [ /process clicked answer ] */

    /* [ process clicked next-button ] */
    /* @TODO: Debug-Code für den Firebug-Konsole-Befehlseditor ( -> Klick unten rechts in Kreis mit Pfeil: Befehlseditor <-> Kommandozeile umschalten) */
    // $("#quiztool_" + quizArticleId + " .nextbutton").unbind("click"); 
    /*/@TODO: Debug-Code für den Firebug-Konsole-Befehlseditor ( -> Klick unten rechts in Kreis mit Pfeil: Befehlseditor <-> Kommandozeile umschalten) */
    $("#quiztool_" + quizArticleId + " .nextbutton").click(function () {	// d.h.: bei einem Klick - im jeweiligen Quiz - auf den Nächste-Frage-Button...
        var divId = $(this).attr("id");											// setzen der aktuellen ("geklickten") Antwort-Div-ID (Bsp.: qID_0_100225500_100225498)
        var arrIds = divId.split("_");											// splittet div-ID in Bestandteile, um die Quiz-IDs zu ermitteln  (Schema: siehe oben) 
        var currQuestionId = arrIds[1];											// setzen der ID der aktuellen Frage
        var currQuizId = arrIds[2];											// setzen der ID des Quiz-Artikels
        var currWidgetId = arrIds[3];                                         // setzen der ID des Quiz-Widgets
        var nextStep = true;													// Hilfsvariable zum Auslösen des Weiter-Buttons
        if (allQuizMap[currQuizId].quizMode == "multiple") {					// Wenn im Multiple-Modus:
            var questionEval = allQuizMap[quizArticleId].quizEvalArray[getCurrentQuestionIndex(allQuizMap[quizArticleId].quizJson, currQuestionId)].status;	// Hilfsvariable für den Antwort-Status
            if (questionEval == 4 || questionEval == 5) { 						// Wenn die Frage vollständig (also letzendlich richtig) beantwortet wurde (5 = richtig im 1. Versuch!):
                nextStep = true;
            }
        }
        if (nextStep) {
            processNextButton(this, currQuestionId, currQuizId, currWidgetId);	// verarbeiten des geklickten Buttons 
        }
    }); // ENDE jQuery:nextbutton.click 
    /* [ /process clicked next-button ] */
} // ENDE function init_quiz(quizArticleId, quizArticleQuestionsJSON, quizArticleQuizType, quizMode, trackingData, sendInitTrack, widgetAjaxUrl, resultText1, resultText2, resultText3, resultText4, resultText5)


/* @TODO: Debug-Code für den Firebug-Konsole-Befehlseditor ( -> Klick unten rechts in Kreis mit Pfeil: Befehlseditor <-> Kommandozeile umschalten) */
//function init_quiz_advanced() {
//    init_quiz(
//        window.quizInitData.quizArticleId,
//        window.quizInitData.quizArticleQuestionsJSON,
//        window.quizInitData.quizArticleQuizType,
//        window.quizInitData.quizMode,
//        window.quizInitData.trackingData,
//        window.quizInitData.sendInitTrack,
//        window.quizInitData.widgetAjaxUrl,
//        window.quizInitData.resultText1,
//        window.quizInitData.resultText2,
//        window.quizInitData.resultText3,
//        window.quizInitData.resultText4,
//        window.quizInitData.resultText5
//    );
//}
//
//init_quiz_advanced();
/* /@TODO: Debug-Code für den Firebug-Konsole-Befehlseditor ( -> Klick unten rechts in Kreis mit Pfeil: Befehlseditor <-> Kommandozeile umschalten) */
/*/initialize quiz */;jQuery(document).ready(function($) {
    $(".share","#artAufmacher").click(function(event) {
        event.preventDefault();
        $(".socialMediaPopup","#artAufmacher").css('right','1px');
    });
    $(".share","#artEnde").click(function(event) {
        event.preventDefault();
        $(".socialMediaPopup","#artEnde").css('right','1px');
    });
    $(".share","#lightbox").click(function(event) {
        event.preventDefault();
        $(".socialMediaPopup","#lightbox").show();
    });
    $(".close",".socialMediaPopup").click(function (event) {
        event.preventDefault();
        $(".socialMediaPopup").css('right','10000px');
    });

    $('a.jQueryBookmark').click(
            function(e) {

                var bookmarkUrl = this.href;
                var bookmarkTitle = this.title;

                if (window.sidebar) { // For Mozilla Firefox Bookmark
                    window.sidebar.addPanel(bookmarkTitle, bookmarkUrl, '');
                    e.preventDefault();
                    return false;
                } else if (window.external && document.all) { // For IE Favorite
                    window.external.AddFavorite(bookmarkUrl, bookmarkTitle);
                    e.preventDefault();
                    return false;
                } else if (window.opera) { // For Opera Browsers
                    $('a.jQueryBookmark').attr('rel', 'sidebar');
                    return true;
                } else { // for other browsers which does not support
                    $('a.jQueryBookmark').attr({
                           title: 'Diese Funktion ist für Ihren Browser nicht verfügbar. Versuchen Sie es mit Ctrl+D (cmd+D) oder einem Klick auf ein eventuell vorhandenes Sternsymbol am Ende der Adressleiste.'
                       })
                       .css({opacity: .25});       // dim the button/link
                    e.preventDefault();
                    return false;
                }
        });
});

// opens the popup to send an article and initializes the captcha
function openEmailPopup() {
    updateCaptcha();
    jQuery('#sendArticlePopup .info').css('display', 'block');
    jQuery('#articleEmailSend').show();
    jQuery('#article-send-success').hide();
    jQuery("#socMedEmail-form").show();
    lightbox.showMailForm();
}

function updateCaptcha(){
  var answer = "";

  jQuery.ajax({
      type: "GET",
      async: false,
      url: "/escenicCaptcha?captcha=get",
      success: function(data){
      answer=data;
      }
    });

    jQuery('#recommendCaptchaImage').hide();
    jQuery('#recommendCaptchaImage').attr('src', '/escenicCaptcha?captcha='+encodeURIComponent(answer));
    jQuery('#recommendCaptchaImage').show();
    jQuery('#captchasalt').val(answer);
}


// jquery function for validating multiple emails
jQuery.validator.addMethod("multiemail",

    function (value, element) {
        if (this.optional(element)) {
            return true;
        }
        var emails = value.trim().split(new RegExp("\\s*[,;]\\s*", "gi"));
        var valid = true;
        for (var i = 0; i < emails.length; i++) {
            valid = valid && jQuery.validator.methods.email.call(this, emails[i], element);
        }
        return valid;
    },

    "Geben Sie bitte eine gültige E-Mail Adresse ein."
);


// sends the data for the emailpopup
function commitEmailPopup(callbackUrl,fehlerText,erfolgText,falschesCaptchatext){
    var result = jQuery('#socMedEmail-form').serialize();

    if (jQuery("#socMedEmail-form").valid()){
        jQuery.ajax({
            url: callbackUrl,
            data: result,
            type: "post",
            success: function(data){
                if (data.search('wrong') != -1) {
                    jQuery('#captchaWrong').show();
                    jQuery('#captchaWrong').html(falschesCaptchatext);
                    jQuery('#sendStatusMessage').html(falschesCaptchatext);
                } else {
                    if (data.search('true') != -1) {
                        jQuery('#sendStatusMessage').html(erfolgText);
                    } else {
                        jQuery('#sendStatusMessage').html(fehlerText);
                    }
                    jQuery('#articleEmailSend').hide();
                    jQuery('#sendArticlePopup .info').hide();
                    // get values from input fields
                    jQuery('#recipientEmail').html(jQuery('#socMedEmail-form input[name="recipient"]').val());
                    jQuery('#senderEmail').html(jQuery('#socMedEmail-form input[name="sender"]').val());
                    jQuery('#personalMessage').html(jQuery('#socMedEmail-form textarea[name="nachricht"]').val());
                    jQuery('#article-send-success').show();
                    jQuery("#socMedEmail-form").hide();
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                jQuery('#sendStatusMessage').html(fehlerText);
            }
        });
    }
}

//gplus callback function
function gplus_like_callback(parm) {
    //console.log("GLOB SCOPE gplus_like_callback with parm=" + parm);
    if(parm.state === 'on'){
        if(typeof wt !== 'undefined')
        wt.sendinfo({linkId:'_art_share_head_googleplus_'});
    }
};
var streetTracking = {
    trackRatingDoneView: function (orgTrackingData) {
        var ratingTrackingData = orgTrackingData.clone();
        ratingTrackingData.customParameter2 = "Bewerten_2";

        if (typeof(window.getCounters) === "function") {
            window.getCounters(ratingTrackingData);
        }
    },
    trackFormView: function (orgTrackingData) {
        var rateTrackingData = orgTrackingData.clone();
        rateTrackingData.customParameter2 = "Bewerten_1"; 

        $('BUTTON.openPopup.topMiddle').click(
            function () {
                if (typeof(window.getCounters) === "function") {
                    window.getCounters(rateTrackingData);
                }
            }
        );
    }
};

$('SELECT#streetRankingCategorySelect').change(
    function (evnt) {
        var $this = $(this),
            url = $this.data('baseurl');
        if ($this.val() != "") {
            window.location.href = url + $this.val();
        }
    }
);;// Author: Bastian Mehlhorn

// --- [ Dokumentation ] -----------------------------------------------------
//
// Begriffsklärung
// - Context:
//     Ein eindeutiger abstimmbarer Context besteht immer aus einer Event ID und einer Vote Object ID,
//     die in Form eines JSON Objektes gebündelt werden.
//     Beispiel: cid100230654x100230154 -> {"eventId":100230654,"voteObjId":100230154}
// - Event ID:
//     Ist die ID des Content Types "LTK Event" aus Escenic (Content Studio)
// - Vote Object ID: Ist die ID des Content Types "LTK Object" aus Escenic (Content Studio)
// - Context Key:
//     Der Context Key ist ein String, bestehend aus Event ID und Vote Object ID.
//     Beispiel: cid100230654x100230154 Die erste Zahl ist di Eventi ID und die zweite die Vote Object ID
//     Dieser Key wird für das Element "div.content" und in der JSON Struktur "json.config.voted" benötigt
//
// Funktionsweise
//
// - Jedes Widget, dass durch eine View JSP gerendert wird, ruft in $(document).ready() eine Initialisierungsfunktion auf.
//   Übergeben wird immer das JQuery Objekt der TV Kritik (CSS Klasse "tvkritik") und seine initialisierenden Daten per JSON.
// - In den Initialisierungsfunktionen wird danach das JSON mittels Local Storage (oder beim IE7 per Cookie) aktualisiert.
// - Jetzt werden die bereits abgestimmten Objekte (Personen) ermittelt und
//   - entweder (vor erneuten abgestimmten) gesperrt oder
//   - in Teasern wird das nächst mögliche Vote-Objekt ermittelt und angezeigt
// - Sind keine Objekte mehr abstimmbar, wird die Ergebnisseite angezeigt





// ---------------------------------------------------------------------------
// --- [ Global Settings ] ---------------------------------------------------
// ---------------------------------------------------------------------------

// Globales JSON, um Funktionalitäten ein- und auszuschalten
var ltkSettings = {
    debug: true,
    clientStorage: {
        enabled: true,
        cookie: {
            urlEncoding: false
        },
        localStorage: {
            urlEncoding: false
        },
        compress: {
            enabled: false,
            symbols: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        },
        format: {
            shortened: true,
            version: 1,
            versionSym: "~v",
            contextDelim: "#",
            eventDelim: "_",
            voteDelim: ",",
            voteScoreDelim: "/"
        }
    },
    lightbox: {
        width: 940,
        json: null,
        sourceLtkWidget: null,
        htmlLoaded: false,
        jsonLoaded: false
    },
    limitText: {
        assessment: 16,
        articleLink: 45,
        roleName: 35
    }, animation: {
    	enabled: false
    },
    // Dieser Beriech ist für globale Initialisierungsaufgaben im LTK Projekt verantwortlich 
    init: function () {
        this.clientStorage.compress.symbols = this.clientStorage.compress.symbols.split("");

        // init lightbox
        lightbox.init('#lightbox', null, this.lightbox.width, 'lightboxSimple', {
            onPreLoad: function(eventInfo) {

                ltkSettings.lightbox.htmlLoaded = false;
                ltkSettings.lightbox.jsonLoaded = false;
				
                var sourceLtkWidget = ltkSettings.lightbox.sourceLtkWidget;
                if(sourceLtkWidget == null) {
                    return;
                }
                var sourceJson = sourceLtkWidget.data("json");
								
                if (sourceJson.config.ajaxUrl != null && sourceJson.config.ajaxUrl.length > 0) {
                    doGetVotes(sourceJson, null, {
                        fnCbDone: function(sourceElem, json) {
                            var sourceLtkWidget = ltkSettings.lightbox.sourceLtkWidget;
                            // !!! Konkurierender Zugriff auf ltkSettings.lightbox.htmlLoaded
                            // siehe Hinweis in der Callback Funktion onLoaded()
        					
                            if (ltkSettings.lightbox.htmlLoaded) {
                                if(sourceLtkWidget == null) {
                                    return;
                                }
                                var tvKritikElem = $("#lightbox .lbContent:first .ltkWidgetLightbox:first");
                                initTvKritikLightbox(tvKritikElem, ltkSettings.lightbox.json);
                            }
                            ltkSettings.lightbox.jsonLoaded = true;
                        }
                    });
                }
            },
            // Statisches HTML ist in das lightbox div gesetzt
            onLoaded: function() {
                // !!! Konkurierender Zugriff auf ltkSettings.lightbox.jsonLoaded
                // 
                // Theoretisch läuft man hier gefahr, das 
                // die beiden Ajax Response´s so ungünstig einlaufen, dass die 
                // if Bedingung ein falschen Zustand erkennt.
                //
                // Beispiel
                // - if (ltkSettings.lightbox.jsonLoaded == false)
                //   Die if Bedingung prüft jsonLoaded und ermittelt false
                // - Ajax Response 2 (doGetVotes.fnCbDone) trifft ein, und unterbricht 
                //   die Verarbeitung dieses Responses (onLoaded)
                // - Response 2 überprüft seine if Bedingung und stellt fest:
                //   if (ltkSettings.lightbox.htmlLoaded == false)
                //   ... da Response 1 von Response 2 unterbrochen wurde
                //   --> Response 2 startet nicht die Aktualisierung der View lightbox11sp
                // - Request 1 beendet seine unterbrochene Verarbeitung, hatte bereits
                //   false ermittelt und startet ebenfalls nicht die Aktualisierung
                //   der View lightbox11sp 
				
                var sourceLtkWidget = ltkSettings.lightbox.sourceLtkWidget;
                //var sourceJson = sourceLtkWidget.data("json");
				
                if (ltkSettings.lightbox.jsonLoaded) {
                    if(ltkSettings.lightbox.json == null) {
                        return;
                    }
                    var tvKritikElem = $("#lightbox .lbContent:first .ltkWidgetLightbox:first");
                    initTvKritikLightbox(tvKritikElem, ltkSettings.lightbox.json);
                }
                ltkSettings.lightbox.htmlLoaded = true;
            },
            onHide: function() {
                ltkSettings.lightbox.htmlLoaded = true;
                ltkSettings.lightbox.jsonLoaded = true;
                ltkSettings.lightbox.sourceLtkWidget = null;
         		
                var tvKritikElem = $("#lightbox .lbContent:first .ltkWidgetLightbox:first");
                updateExternalView(tvKritikElem);
            }
        });
        
        runGarbageCollection(ltkSettings.clientStorage);
    }
};
ltkSettings.init();





// ---------------------------------------------------------------------------
// --- [ Initialisierung ] ---------------------------------------------------
// ---------------------------------------------------------------------------

// Grundsätzliche Initialisierungsmechanismus für alle Views
function initTvKritikGeneral(elem, json) {
    if(elem.data("isInitialized") != null && elem.data("isInitialized")) {
        return false;
    }

    elem.data("json", json);
    updateJsonFromClientStorage(ltkSettings.clientStorage, json);
    return true;
}

// Initialisierung View Article Element 6sp, wird von der entsprechenden JSP aufgerufen
function initTvKritikArticleElem6sp(tvKritikElem, json, scrollToTvKritikElem) {
    json.config["clickMode"] = "modul";
    json.config["widgetType"] = "articleElem6sp";    
    if(!initTvKritikGeneral(tvKritikElem, json)) {
        return false;
    }
    
    var _json = json;
    tvKritikElem.find(".footer > .btnblau").click(function () {
        doGetVotes(_json, $(this), {
            fnCbDone: function (source) {
                var tvKritikElem = getTvkritikElemByElem(source);
                showResultView(tvKritikElem, {
                    clickVoteNowButton: clickVoteNowButtonArticleElem6sp
                }); 
            }
        });
    });
    updateView(tvKritikElem);
    
    // load image entfernen, volles
    tvKritikElem.children(".introWrapper, .content, .footer").removeClass("hide");
    tvKritikElem.children(".loader").addClass("hide");
    
    // Scroll-Funktion
    if(json.config.from != null && json.config.from >= 3 && json.config.from <= 5) {
        if (scrollToTvKritikElem != null && scrollToTvKritikElem) {
            scrollToElement($("body .tvkritik:first"), {
                marginTop: 20
            });
        }
    }
    tvKritikElem.data("isInitialized", true);
    return true;
}

// Initialisierung View Article Element 12 (Bestenliste), wird von der entsprechenden JSP aufgerufen
function initTvKritikHighscore12sp(tvKritikElem, json, scrollToTvKritikElem) {
    json.config["clickMode"] = "modul";
    json.config["widgetType"] = "hishscore12sp";
    if(!initTvKritikGeneral(tvKritikElem, json)) {
        return false;
    }
    tvKritikElem.data("isInitialized", true);
    return true;
}  


// Der Aufruf der Initialisierung der LTK View Lightbox findet nicht wie die anderen in 
// der JSP statt, sondern in ltkSettings.init()
function initTvKritikLightbox(tvKritikElem, json) {
    json.config["clickMode"] = "modul";
    json.config["widgetType"] = "lightbox11sp";    
    if(!initTvKritikGeneral(tvKritikElem, json)) {
        return false;
    }
    
    var uniqueWidgetId = getUniqueLtkWidgetId(tvKritikElem);
	
    var _json = json;
    tvKritikElem.find(".footer > .btnblau").click(function () {
        doGetVotes(_json, $(this), {
            fnCbDone: function (source) {
                var tvKritikElem = getTvkritikElemByElem(source);
                showResultView(tvKritikElem, {
                    clickVoteNowButton: clickVoteNowButtonLightbox
                });
            }
        });
    });
    updateView(tvKritikElem);
    tvKritikElem.data("isInitialized", true);
    return true;
}

// Initialisierung View 3sp Modul/Teaser, wird von der entsprechenden JSP aufgerufen
function initTvKritikModul3sp(tvKritikElem, json) {
    json.config["clickMode"] = "lightbox";
    json.config["widgetType"] = "modul3sp";
    if(!initTvKritikGeneral(tvKritikElem, json)) {
        return false;
    }

    updateView(tvKritikElem);
    tvKritikElem.data("isInitialized", true);
    return true;
}

// Initialisierung View 4sp Modul/Teaser, wird von der entsprechenden JSP aufgerufen
function initTvKritikModul4sp(tvKritikElem, json) {
    json.config["clickMode"] = "teaser";
    json.config["widgetType"] = "modul4sp";
    if(!initTvKritikGeneral(tvKritikElem, json)) {
        return false;
    }

    updateView(tvKritikElem);
    tvKritikElem.data("isInitialized", true);
    return true;
}

// Initialisierung View 6sp Modul/Teaser, wird von der entsprechenden JSP aufgerufen
function initTvKritikModul6sp(tvKritikElem, json) {
    json.config["clickMode"] = "teaser";
    json.config["widgetType"] = "modul6sp";
    if(!initTvKritikGeneral(tvKritikElem, json)) {
        return false;
    }
    updateView(tvKritikElem);
    tvKritikElem.data("isInitialized", true);
    return true;
}

function initTvKritikHighscoreArticle12sp(tvKritikElem, json) {
	//if(tvKritikElem.data("isInitialized") != undefined && tvKritikElem.data("isInitialized")) {
	//	return;
	//}
	
    var _tvKritikElem = tvKritikElem;
    var _json = json;
	
    tvKritikElem.find('ul.tabs a').unbind("click");
    tvKritikElem.find(".pagination a").unbind("click");
	
    tvKritikElem.find('ul.tabs a').click(function() {
        $(this).parents('ul').find('.current').removeClass('current');
        $(this).addClass('current');
        //var _tvKritikElem = _tvKritikElem;
        $.ajax({
            url: $(this).attr("href")
        }).done(function(html) {
            _tvKritikElem.children(".content,.pagination").remove();
            _tvKritikElem.append(html);
            initTvKritikHighscoreArticle12sp(_tvKritikElem, _json);
        });
        return false;
    });
    
    //setButtonEventsHighscoreArticle12sp(tvKritikElem);
  
    tvKritikElem.find(".pagination a").click(function() {
        $(this).parents('ul').find('.current').removeClass('current');
        $(this).addClass('current');
        //var _tvKritikElem = _tvKritikElem;
        $.ajax({
            url: $(this).attr("href")
        }).done(function(html) {
            _tvKritikElem.children(".content,.pagination").remove();
            _tvKritikElem.append(html);
            initTvKritikHighscoreArticle12sp(_tvKritikElem, _json);
        });
        return false;
    });
    
    //tvKritikElem.data("isInitialized", true);
}

/*
function setButtonEventsHighscoreArticle12sp(tvKritikElem) {
	var buttons = tvKritikElem.find(".content > .data > .button");
	
	var _tvKritikElem = tvKritikElem;
	buttons.click(function() {
		var context = getContextByElem($(this));
		var contentDivElem = getContentDivElemByVoteObjId(tvKritikElem, context.voteObjId);
		var json = _tvKritikElem.data("liveEventList")[generateContextKey(context.eventId, context.voteObjId)];
				
		showVoteButtonsByVoteObjId(_tvKritikElem, context.voteObjId, null, json);
		
		console.log("click");
		console.log(context);
	});
}
*/

function initTvKritikHighscore6sp(tvKritikElem, json) {
    var _tvKritikElem = tvKritikElem;
    tvKritikElem.find('ul.tabs a').click(function() {
        $(this).parents('ul').find('.current').removeClass('current');
        $(this).addClass('current');
        //var _tvKritikElem = _tvKritikElem;
        $.ajax({
            url: $(this).attr("href")
        }).done(function(html) {
            _tvKritikElem.children(".contentWrapper").remove();
            _tvKritikElem.children(".footer").before(html);
        });
        return false;
    });
}

function initTvKritikHighscore4sp(tvKritikElem, json) {
    var _tvKritikElem = tvKritikElem;
    tvKritikElem.find('ul.tabs a').click(function() {
        $(this).parents('ul').find('.current').removeClass('current');
        $(this).addClass('current');
        //var _tvKritikElem = _tvKritikElem;
        $.ajax({
            url: $(this).attr("href")
        }).done(function(html) {
            _tvKritikElem.children(".contentWrapper").remove();
            _tvKritikElem.children(".footer").before(html);
        });
        return false;
    });
}

function initTvKritikHighscore3sp(tvKritikElem, json) {
    if(typeof tvKritikElem.accordion == "function") {
        tvKritikElem.accordion({
            header:".tab"
        });
    } else {
        tvKritikElem.children("div.tabContent:not(div.tabContent:first)").remove();
        tvKritikElem.children("div.tab:not(div.tab:first)").remove();
    }
}

// ---------------------------------------------------------------------------
// --- [ Workflow: View - Modul 6 sp ] ---------------------------------------
// ---------------------------------------------------------------------------

function updateViewModul6sp(tvKritikElem) {
    var json = tvKritikElem.data("json");
    var context = getNextVotableContext(json);
    if (context == null) {
        showModulResultView(tvKritikElem, {
            imgWidth: 140,
            imgHeight: 93,
            showArticleLink: false,
            showLightboxLink: false,
            votableObjectLimit: 3
        });
    } else {
        updateInfoByVoteObjectId(tvKritikElem, context.voteObjId, true);
        showVoteButtonsByVoteObjId(tvKritikElem, context.voteObjId, {
            callbackDoAddVoteAjaxAlways: callbackDoAddVoteAjaxAlwaysModul6sp
        });
    }
}

// --- Events ---
// Callback bei abgeschlossenem Ajax Request für add vote
function callbackDoAddVoteAjaxAlwaysModul6sp(sourceElem) {
    var json = getTvkritikElemByElem(sourceElem).data("json");
    var url =  json.config.articleUrl;
    if(json.config.mode == 5 || json.config.mode == 2) {
    	url = setUrlParameter(url, "voteMode", "5")
    }
    window.location = url;
}





// ---------------------------------------------------------------------------
// --- [ Workflow: View - Modul 4 sp ] ---------------------------------------
// ---------------------------------------------------------------------------

function updateViewModul4sp(tvKritikElem) {
    var json = tvKritikElem.data("json");
    var context = getNextVotableContext(json);
    if (context == null) {
        showModulResultView(tvKritikElem, {
            imgWidth: 63,
            imgHeight: 35,
            showLightboxLink: false,
            votableObjectLimit: 3
        });
    } else {
        updateInfoByVoteObjectId(tvKritikElem, context.voteObjId, true);
        showVoteButtonsByVoteObjId(tvKritikElem, context.voteObjId, {
            callbackDoAddVoteAjaxAlways: callbackDoAddVoteAjaxAlwaysModul4sp
        });
    }
}

// --- Events ---
// Callback bei abgeschlossenem Ajax Request für add vote nach Klick auf ein Vote Button
function callbackDoAddVoteAjaxAlwaysModul4sp(sourceElem) {
    var json = getTvkritikElemByElem(sourceElem).data("json");
    
    var url =  json.config.articleUrl;
    if(json.config.mode == 2 || json.config.mode == 4) {
    	url = setUrlParameter(url, "voteMode", "4")
    }
    window.location = url;
}





// ---------------------------------------------------------------------------
// --- [ Workflow: View - Modul 3 sp ] ---------------------------------------
// ---------------------------------------------------------------------------

function updateViewModul3sp(tvKritikElem) {
    var json = tvKritikElem.data("json");
    var context = getNextVotableContext(json);
    if (context == null) {
        showModulResultView(tvKritikElem, {
            imgWidth: 100,
            imgHeight: 66,
            showArticleLink: false,
            showLightboxLink: true,
            lightboxLinkClicked: lightboxLinkClicked3sp,
            showRules: false,
            votableObjectLimit: 3
        });
    } else {
        updateInfoByVoteObjectId(tvKritikElem, context.voteObjId, true);
        showVoteButtonsByVoteObjId(tvKritikElem, context.voteObjId, {
            callbackDoAddVoteAjaxAlways: callbackDoAddVoteAjaxAlwaysModul3sp,
            clickVoteButton: clickVoteButtonModul3sp
        });
    }
}

//--- Events ---
//Callback bei abgeschlossenem Ajax Request für add vote nach Klick auf ein Vote Button
function callbackDoAddVoteAjaxAlwaysModul3sp(sourceElem) {
    var tvKritikElem = getTvkritikElemByElem(sourceElem);
    updateView(tvKritikElem);	
    updateExternalView(tvKritikElem);
}

function clickVoteButtonModul3sp(tvKritikElem, sourceElem, events) {
    var json = tvKritikElem.data("json");
    ltkSettings.lightbox.json = $.extend(true, {}, json);
    // ltkSettings.lightbox.json = json;
    ltkSettings.lightbox.sourceLtkWidget = tvKritikElem;
    lightbox.showLtkLightbox(json.config.lightboxUrl, ltkSettings.lightbox.width);
}

function lightboxLinkClicked3sp(sourceElem) {
    var tvKritikElem = getTvkritikElemByElem(sourceElem);
    var json = tvKritikElem.data("json");
    ltkSettings.lightbox.json = $.extend(true, {}, json);
    ltkSettings.lightbox.sourceLtkWidget = tvKritikElem;
    lightbox.showLtkLightbox(json.config.lightboxUrl, ltkSettings.lightbox.width);
    return false;
}





// ---------------------------------------------------------------------------
// --- [ Workflow - View: Article Elem ] -------------------------------------
// ---------------------------------------------------------------------------

// Diese Funktion nimmt den aktuellen Zustand des JSON und zeigt entsprechend die Abstimmungs- oder die Ergebnisseite an.
function updateViewArticleElem6sp(tvKritikElem) {
    var json = tvKritikElem.data("json");
    for (var voteObjId in json.data) {
        if (!isInVotableTimeslot(json) || isAlreadyVoted(json, voteObjId)) {
            showVoteResultByVoteObjId(tvKritikElem, voteObjId, {
                clickVoteNowButton: clickVoteNowButtonArticleElem6sp
            });
        } else {
            showVoteButtonsByVoteObjId(tvKritikElem, voteObjId, {
                callbackDoAddVoteAjaxAlways: callbackDoAddVoteAjaxAlwaysArticleElem6sp
            });
        }
    }
    updateShowResultViewButton(tvKritikElem);
}

// --- Events ---
// Klick auf den Button "Jetzt bewerten" - Ergebnisseite
function clickVoteNowButtonArticleElem6sp(tvKritikElem, sourceElem) {
    var voteObjId = getContextByElem(sourceElem).voteObjId;
    showVoteButtonsByVoteObjId(tvKritikElem, voteObjId, {
        callbackDoAddVoteAjaxAlways: callbackDoAddVoteAjaxAlwaysArticleElem6sp
    });
    updateShowResultViewButton(tvKritikElem);
}

// Callback bei erfolgreichem Ajax Request für add vote
function callbackDoAddVoteAjaxAlwaysArticleElem6sp(sourceElem) {
    var tvKritikElem = getTvkritikElemByElem(sourceElem);
    
    var voteObjId = getContextByElem(sourceElem).voteObjId;
    showVoteResultByVoteObjId(tvKritikElem, voteObjId, {
        clickVoteNowButton: clickVoteNowButtonArticleElem6sp
    });

    updateShowResultViewButton(tvKritikElem);
    updateExternalView(tvKritikElem);
}





//---------------------------------------------------------------------------
//--- [ Workflow - View: Highscore ] -------------------------------------
//---------------------------------------------------------------------------

//Diese Funktion nimmt den aktuellen Zustand des JSON und zeigt entsprechend die Abstimmungs- oder die Ergebnisseite an.
function updateViewHighscore12sp(tvKritikElem) {
    var json = tvKritikElem.data("json");
    for (var voteObjId in json.data) {
        if (!isInVotableTimeslot(json) || isAlreadyVoted(json, voteObjId)) {
            showVoteResultByVoteObjId(tvKritikElem, voteObjId, {
                clickVoteNowButton: clickVoteNowButtonHighscore12sp
            });
        } else {
            showVoteButtonsByVoteObjId(tvKritikElem, voteObjId, {
                callbackDoAddVoteAjaxAlways: callbackDoAddVoteAjaxAlwaysHighscore12ps
            });
        }
    }
    updateShowResultViewButton(tvKritikElem);
}

//--- Events ---
//Klick auf den Button "Jetzt bewerten" - Ergebnisseite
function clickVoteNowButtonHighscore12sp(tvKritikElem, sourceElem) {
    var voteObjId = getContextByElem(sourceElem).voteObjId;
    showVoteButtonsByVoteObjId(tvKritikElem, voteObjId, {
        callbackDoAddVoteAjaxAlways: callbackDoAddVoteAjaxAlwaysHighscore12ps
    });
    updateShowResultViewButton(tvKritikElem);
}

//Callback bei erfolgreichem Ajax Request für add vote
function callbackDoAddVoteAjaxAlwaysHighscore12ps(sourceElem) {
    var tvKritikElem = getTvkritikElemByElem(sourceElem);
 
    var voteObjId = getContextByElem(sourceElem).voteObjId;
    showVoteResultByVoteObjId(tvKritikElem, voteObjId, {
        clickVoteNowButton: clickVoteNowButtonHighscore12sp
    });

    updateShowResultViewButton(tvKritikElem);
    updateExternalView(tvKritikElem);
}





// ---------------------------------------------------------------------------
// --- [ Workflow - View: Lightbox ] -----------------------------------------
// ---------------------------------------------------------------------------

// Diese Funktion nimmt den aktuellen Zustand des JSON und zeigt entsprechend die Abstimmungs- oder die Ergebnisseite an.
function updateViewLightbox(tvKritikElem) {
    var json = tvKritikElem.data("json");
    for (var voteObjId in json.data) {
        if (!isInVotableTimeslot(json) || isAlreadyVoted(json, voteObjId)) {
            showVoteResultByVoteObjId(tvKritikElem, voteObjId, {
                clickVoteNowButton: clickVoteNowButtonLightbox
            });
        } else {
            showVoteButtonsByVoteObjId(tvKritikElem, voteObjId, {
                callbackDoAddVoteAjaxAlways: callbackDoAddVoteAjaxAlwaysLightbox
            });
        }
    }
    updateShowResultViewButton(tvKritikElem);
}

// --- Events ---
// Klick auf den Button "Jetzt bewerten" - Ergebnisseite
function clickVoteNowButtonLightbox(tvKritikElem, sourceElem) {
    var voteObjId = getContextByElem(sourceElem).voteObjId;
    showVoteButtonsByVoteObjId(tvKritikElem, voteObjId, {
        callbackDoAddVoteAjaxAlways: callbackDoAddVoteAjaxAlwaysLightbox
    });
    updateShowResultViewButton(tvKritikElem);
}

// Callback bei erfolgreichem Ajax Request für add vote
function callbackDoAddVoteAjaxAlwaysLightbox(sourceElem) {
    var tvKritikElem = getTvkritikElemByElem(sourceElem);
	
    var voteObjId = getContextByElem(sourceElem).voteObjId;
    showVoteResultByVoteObjId(tvKritikElem, voteObjId, {
        clickVoteNowButton: clickVoteNowButtonLightbox
    });
    updateShowResultViewButton(tvKritikElem);
    updateExternalView(tvKritikElem);
}





// ---------------------------------------------------------------------------
// --- [ Workflow: General Functions ] ---------------------------------------
// ---------------------------------------------------------------------------

function updateView(tvKritikElem) {
    var json = tvKritikElem.data("json");
    if (json.config.widgetType == "articleElem6sp") {
        updateViewArticleElem6sp(tvKritikElem);
    } else if (json.config.widgetType == "highscore12sp") {
        updateViewHighscore12sp(tvKritikElem);
    } else if (json.config.widgetType == "modul3sp") {
        updateViewModul3sp(tvKritikElem);
    } else if (json.config.widgetType == "modul4sp") {
        updateViewModul4sp(tvKritikElem);
    } else if (json.config.widgetType == "modul6sp") {
        updateViewModul6sp(tvKritikElem);
    } else if (json.config.widgetType == "lightbox11sp") {
        updateViewLightbox(tvKritikElem);
    }
}

function updateExternalView(tvKritikElem) {
    if (typeof tvKritikElem === "undefined" || tvKritikElem.length === 0) return;

    var json = tvKritikElem.data("json");
    var externalLtkWidgets = $(".tvkritik.ltkEventId" + json.config.eventId).not(tvKritikElem);
    var externalJson;
    for(var i=0; i < externalLtkWidgets.length; i++) {
        externalJson = $(externalLtkWidgets[i]).data("json");
        updateJson(externalJson, json);
        updateView($(externalLtkWidgets[i]));
    }
}

// Zeigt die Vote Buttons zu einem Vote Objekt an
// tvKritikElem und voteObjId sind Pflichtparameter
function showVoteButtonsByVoteObjId(tvKritikElem, voteObjId, fnCalls, json) {
    var fns = $.extend({
        clickVoteButton: null,
        callbackDoAddVoteAjaxDone: null,
        callbackDoAddVoteAjaxFail: null,
        callbackDoAddVoteAjaxAlways: null
    }, fnCalls);

    var animate = typeof tvKritikElem.data("isInitialized") == "boolean" && ltkSettings.animation.enabled;
    var animDuration = 200;

	if(json == undefined) {
    	var json = tvKritikElem.data("json");
    }
    var contentDivElem = getContentDivElemByVoteObjId(tvKritikElem, voteObjId);
    if (contentDivElem == null) {
        return;
    }
    var ulElem = contentDivElem.children("ul");

    var ltkElementHTML = "";
    var voteLabels = json.config.voteLabels;

    for (var i = 0; i < voteLabels.length; i++) {
        ltkElementHTML += "<li><span>" + (i + 1) + "</span>" + limitText(voteLabels[i], ltkSettings.limitText.assessment) + "</li>"
    }

    // Alte Elemente entfernen
    ulElem.find("li").unbind('click').remove();
	
    if(animate) {
        ulElem.fadeOut(animDuration, function() {
            ulElem.find("li").remove();

            ulElem.addClass('vote').removeClass('result').append(ltkElementHTML);
            
    		var liElems = contentDivElem.find("ul.vote li").click(function() {
        		// Diese Funktion kümmer sich um den Ajax Call hinter dem Klick und um den
        		// Fehlerfall, wenn der Server nicht erreichbar ist.
        		clickVoteButton(tvKritikElem, $(this), {
            		callbackDoAddVoteAjaxDone: fns.callbackDoAddVoteAjaxDone,
            		callbackDoAddVoteAjaxFail: fns.callbackDoAddVoteAjaxFail,
            		callbackDoAddVoteAjaxAlways: fns.callbackDoAddVoteAjaxAlways
        		});
        		// Es kann eine Custom Funktion definiert werden, die nach dem Kick aufgerufen wird.
        		if (fns.clickVoteButton != null) {
            		fns.clickVoteButton(tvKritikElem, $(this));
        		}
    		});
            ulElem.fadeIn(animDuration);	
        });
    } else {
    	ulElem.addClass('vote').removeClass('result').append(ltkElementHTML);
    
    	var liElems = contentDivElem.find("ul.vote li").click(function() {
        	// Diese Funktion kümmer sich um den Ajax Call hinter dem Klick und um den
        	// Fehlerfall, wenn der Server nicht erreichbar ist.
        	clickVoteButton(tvKritikElem, $(this), {
            	callbackDoAddVoteAjaxDone: fns.callbackDoAddVoteAjaxDone,
            	callbackDoAddVoteAjaxFail: fns.callbackDoAddVoteAjaxFail,
            	callbackDoAddVoteAjaxAlways: fns.callbackDoAddVoteAjaxAlways
        	});
        	// Es kann eine Custom Funktion definiert werden, die nach dem Kick aufgerufen wird.
        	if (fns.clickVoteButton != null) {
            	fns.clickVoteButton(tvKritikElem, $(this));
        	}
    	});
    }


}

// Zeigt die Ergebnisseite zu einem Vote Objekt an
function showVoteResultByVoteObjId(tvKritikElem, voteObjId, fnCalls) {
    var fns = $.extend({
        showVoteNowButton: true,
        clickVoteNowButton: null
    }, fnCalls);

    var animate = typeof tvKritikElem.data("isInitialized") == "boolean" && ltkSettings.animation.enabled;
    var animDuration = 200;
	
    var json = tvKritikElem.data("json");
    var contentDivElem = getContentDivElemByVoteObjId(tvKritikElem, voteObjId);
    if (contentDivElem == null) {
        return;
    }
    var ulElem = contentDivElem.children("ul");

    var voteLabels = json.config.voteLabels;
    var voteObjData = json.data[voteObjId];

    if (voteObjData == "undefined") {
        return;
    }

    var resultHTML = "";

    for (var i=0; i < voteLabels.length; i++) {
        resultHTML += "<li>";
        resultHTML += "<span class='label'>" + limitText(voteLabels[i], ltkSettings.limitText.assessment) + "</span>";
        resultHTML += "<span class='grades'>"+ (i + 1) + "</span>";
        if(voteObjData.score[i] > -1) {
            resultHTML += "<span class='gauge'><span style='width:" + voteObjData.score[i] + "%;'></span></span>";
            resultHTML += "<span class='percent'>" + voteObjData.score[i] + " %</span>";
        } else {
            resultHTML += "<span class='gauge'><span style='width:0%;'></span></span>";
            resultHTML += "<span class='percent'>0 %</span>";
        }
        resultHTML += "</li>";
    }

    resultHTML += "<li class='average'>";
    resultHTML += "<span class='label'>Durchschnitt</span>";
    resultHTML += "<span class='ico'></span>";
    if (voteObjData.average != null && voteObjData.average > 0) {
        var avgString = voteObjData.average + "";
        var avgSplit = avgString.split(".");
        var avgLabel = "";
        avgString = avgSplit[0];
        if (avgSplit[1] != null) {
            avgString = avgString  + "," + avgSplit[1].substring(0, 1);
        } else {
            avgString = avgString  + ",0";
        }
        avgLabel = voteLabels[Math.round(voteObjData.average) -1];
        avgLabel = limitText(avgLabel, ltkSettings.limitText.assessment);
        resultHTML += "<span class='value'>" + avgLabel + " (" + avgString + ")</span>";
    } else {
        resultHTML += "<span class='value'></span>";
    }

    if (isInVotableTimeslot(json) || voteObjData.yourVote != null) {
        resultHTML += "</li>";
        resultHTML += "<li class='yourVote'>";
        resultHTML += "<span class='label'>Ihre Stimme</span>";
        resultHTML += "<span class='ico'></span>";
    
        if (!isInVotableTimeslot(json) || isAlreadyVoted(json, voteObjId)) {
            avgLabel = "";
            avgString = "";
            if (voteObjData.yourVote != null) {
                avgLabel = voteLabels[Math.round(voteObjData.yourVote)];
                avgLabel = limitText(avgLabel, ltkSettings.limitText.assessment);
                resultHTML += "<span class='value'>" + avgLabel + "</span>";
            } else {
                resultHTML += "<span class='value'></span>";
            }
        } else {
            resultHTML += "<span class='value'><a href=''>Jetzt bewerten</a></span>";
        }
    
        resultHTML += "</li>";
    }

    // Alte Elemente entfernen
	
    if(animate) {
        ulElem.fadeOut(animDuration, function() {
            ulElem.find("li").remove();
            ulElem.removeClass('vote').addClass('result').append(resultHTML);
            
        	if(fns.showVoteNowButton) {
        		$(ulElem).find(".value > a").click(function () {
            		try {
                		clickVoteNowButton(tvKritikElem, $(this));
                		if(fns.clickVoteNowButton != null) {
                    		fns.clickVoteNowButton(tvKritikElem, $(this));
                		}
            		} catch (e) {
            		}
            		return false;
        		});
    		}
            ulElem.fadeIn(animDuration);	
        });
    } else {
        ulElem.find("li").remove();
        ulElem.removeClass('vote').addClass('result').append(resultHTML);
        
        if(fns.showVoteNowButton) {
        	$(ulElem).find(".value > a").click(function () {
            	try {
                	clickVoteNowButton(tvKritikElem, $(this));
                	if(fns.clickVoteNowButton != null) {
                    	fns.clickVoteNowButton(tvKritikElem, $(this));
                	}
            	} catch (e) {
            	}
            	return false;
        	});
    	}
    }
}

function showModulResultView(tvKritikElem, options) {
    var opts = $.extend({
        imgWidth: 63,
        imgHeight: 35,
        showArticleLink: true,
        showLightboxLink: true,
        lightboxLinkClicked: null,
        showRules: true,
        votableObjectLimit: -1
    }, options);

    var json = tvKritikElem.data("json");
    var contentDivElem = tvKritikElem.find("div.content:first");
    var ltkElementHTML = "";

    ltkElementHTML += "<ul class='result'>";

    var i=0;

    for (var voteObjId in json.data) {
        if(i >= opts.votableObjectLimit) {
            break;
        }
    	
        var voteObjData = json.data[voteObjId];

        // Image
        var altText = "";
        if (voteObjData.role != null) {
            altText += voteObjData.role;
        }
        if (voteObjData.role != null && voteObjData.title != null) {
            altText += ":";
        }
        if (voteObjData.title != null) {
            altText += " " + voteObjData.title;
        }

        var titleText = "";
        if (voteObjData.title != null) {
            titleText = voteObjData.title;
        }

        var resultImageUrl = "";
        if (voteObjData.resultImageUrl != null) {
            resultImageUrl = voteObjData.resultImageUrl;
        }
        
        var contextKey = generateContextKey(json.config.eventId, voteObjId);
        ltkElementHTML += "<li class='" + contextKey + "'><div class='tsrImg'><img width='" + options.imgWidth + "' height='" + options.imgHeight + "' alt='" + altText + "' src='" + resultImageUrl + "' title='" + titleText + "' /></div>";

        if (voteObjData.role != null && voteObjData.title != null) {
            ltkElementHTML += "<span class='line'>";
        }

        if (voteObjData.role != null && opts.showRules) {
            ltkElementHTML += "<span class='role'>" + voteObjData.role + ":</span>";
        }
        if (voteObjData.title != null) {
            // rolle + name sollen max 35 Zeichen lang sein. Die Rolle ist bereits aus dem Content Studio hieraus auf 14 zeichen begrenzt.
            // ltkSettings.limitText.roleName => 35
        	
            var name = voteObjData.title;
            var badgeTextLength = voteObjData.role.length + 2 + name.length;

            if(badgeTextLength > ltkSettings.limitText.roleName) {
                //console.log(name.length - (badgeTextLength - ltkSettings.limitText.roleName));
                name = name.substring(0, name.length - (badgeTextLength - ltkSettings.limitText.roleName))
            }
			
            ltkElementHTML += "<span class='name'> " + name + " </span>";
        }
        
        ltkElementHTML += "<span class='line'>";
        if (voteObjData.average != null && voteObjData.average > 0) {
            var avgString = voteObjData.average + "";
            var avgSplit = avgString.split(".");
            var avgLabel = "";
            avgString = avgSplit[0];
            if (avgSplit[1] != null) {
                avgString = avgString  + "," + avgSplit[1].substring(0, 1);
            } else {
                avgString = avgString  + ",0";
            }
            avgLabel = json.config.voteLabels[Math.round(voteObjData.average) -1];
            avgLabel = limitText(avgLabel, ltkSettings.limitText.assessment);
            
            ltkElementHTML += "<span class='value'>" + avgString + "</span>";
            ltkElementHTML += "<span class='label'>" + avgLabel + "</span>";
        }
        ltkElementHTML += "</span>";

        if (voteObjData.role != null && voteObjData.title != null) {
            ltkElementHTML += "</span>";
        }



        ltkElementHTML += "</li>";
        i++;
    }
    
    ltkElementHTML += "</ul>";
    
    if (opts.showArticleLink && json.config.articleUrl != undefined && json.config.articleUrl != null && json.config.articleUrl.length > 0) {
        var articleTitle = "mehr";
        if (json.config.articleTitle != null) {
            articleTitle = json.config.articleTitle;
            articleTitle = limitText(articleTitle, ltkSettings.limitText.articleLink);
            
        }
        ltkElementHTML += "<a class='articleLink' href='" + json.config.articleUrl + "'><span class='ico' />" + articleTitle + "</a>";
    }

    if (opts.showLightboxLink) {
        var lightboxLink = "";
        var lightboxLabel = "Zum Ergebnis";
        ltkElementHTML += "<a class='showLightbox' href='" + lightboxLink + "'><span class='ico' />" + lightboxLabel + "</a>";
    }
    
    // Alte Elemente und css Klassen entfernen
    contentDivElem.find("ul li").remove();
    contentDivElem.children().remove();
    
    var contentDivElemAttr = contentDivElem.attr("class").split(" ");
    for (var i=0; i < contentDivElemAttr.length; i++) {
        if (isContextKey(contentDivElemAttr[i])) {
            contentDivElem.removeClass(contentDivElemAttr[i]);
        }
    }
        
    contentDivElem.append(ltkElementHTML);
    
    if(opts.lightboxLinkClicked != null) {
        contentDivElem.find("a.showLightbox").click(function() {
            var returnValue = opts.lightboxLinkClicked($(this));
            if(typeof returnValue != "boolean") {
                returnValue = true;
            }
            return returnValue;
        });
    }
}

// Aktualisiert Texte und Bilder (im HTML) zu einem Vote Objekt
function updateInfoByVoteObjectId(tvKritikElem, voteObjId, isTeaser) {
    var json = tvKritikElem.data("json");
    var voteObjData = json.data[voteObjId];

    var contentDivElem = null;
    if (isTeaser == null || !isTeaser) {
        contentDivElem = getContentDivElemByVoteObjId(tvKritikElem, voteObjId);
    } else {
        contentDivElem = tvKritikElem.children("div.content:first");
    }

    // aktualisiert content div class
    var contentDivClasses = contentDivElem.attr("class").split(" ");
    for (var i = 0; i < contentDivClasses.length; i++) {
        if (isContextKey(contentDivClasses[i])) {
            contentDivElem.removeClass(contentDivClasses[i]);
        }
    }
    contentDivElem.addClass(generateContextKey(json.config.eventId, voteObjId));

    // update badge
    var badgeElem = contentDivElem.find(".colLeft > .tsrImg > .badge:first");
    if (voteObjData.role != null) {
        badgeElem.children("span.role:first").text(voteObjData.role + ":");
    }
    if (voteObjData.title != null) {
        badgeElem.children("span.name:first").text(" " + voteObjData.title + " ");
    }

    // update image
    var imgElem = contentDivElem.find(".colLeft > .tsrImg > img:first");
    if (voteObjData.voteImageUrl != null) {
        imgElem.attr("src", voteObjData.voteImageUrl);
    }

    var altText = "";
    if (voteObjData.role != null) {
        altText += voteObjData.role;
    }
    if (voteObjData.role != null && voteObjData.title != null) {
        altText += ":";
    }
    if (voteObjData.title != null) {
        altText += " " + voteObjData.title;
    }
    imgElem.attr("alt", altText);
    
    if (voteObjData.title != null) {
        imgElem.attr("title", voteObjData.title);
    }
}

function showResultView(tvKritikElem, fnCalls) {
    var fns = $.extend({
        clickVoteNowButton: null
    }, fnCalls);
    var json = tvKritikElem.data("json");
    for (var voteObjId in json.data) {
        showVoteResultByVoteObjId(tvKritikElem, voteObjId, {
            clickVoteNowButton: fns.clickVoteNowButton
        });
    }
    updateShowResultViewButton(tvKritikElem);
}

// --- Event ---
function clickVoteButton(tvKritikElem, sourceElem, fnCalls) {
    var fns = $.extend({
        callbackDoAddVoteAjaxDone: null,
        callbackDoAddVoteAjaxFail: null,
        callbackDoAddVoteAjaxAlways: null
    }, fnCalls);
 
    var json = tvKritikElem.data("json");
    var voteObjId = getContextByElem(sourceElem).voteObjId;
    var index = getContentDivElemByVoteObjId(tvKritikElem, voteObjId).find("ul > li").index(sourceElem);
    json.data[voteObjId]["yourVote"] = index;
    addVotedToJson(json, voteObjId);
    
    // TODO: Wenn ein Ajax Request fehl schläft, muss das JSON Struktur selbstständig die Werte hoch zählen.
    doAddVote(json, sourceElem, {
        fnCbDone: fns.callbackDoAddVoteAjaxDone,
        fnCbFail: fns.callbackDoAddVoteAjaxFail,
        fnCbAlways: fns.callbackDoAddVoteAjaxAlways
    });
}

function updateShowResultViewButton(tvKritikElem) {
    var json = tvKritikElem.data("json");
    var footerButton = tvKritikElem.find(".footer .btnblau");
    var buttonTextElem = footerButton.children("span");
    
    var animate = typeof tvKritikElem.data("isInitialized") == "boolean" && ltkSettings.animation.enabled;

    var buttonTextSize1 = "103px";	// Aktualisieren
    var buttonTextSize2 = "232px";
    var buttonSize1 = "Aktualisieren";
    var buttonSize2 = "Gesamtbewertung aller Leser anzeigen";

    //open = true;
    var textOpacityDuration = 200;
    var buttonSlideDuration = 500;
    
    if (allContextKeysVoted(json) || tvKritikElem.find(".content ul.vote").length == 0) {
        if(animate && footerButton.hasClass("showVoteView")) {
            /*footerButton.fadeOut(animDuration, function() {
        		footerButton.removeClass("showVoteView").addClass("updateVoteView");
        		footerButton.children("span:first").text("Aktualisieren");
        		footerButton.fadeIn(animDuration);
    		});
    		*/
    		
            buttonTextElem.animate({
                opacity: 0
            }, textOpacityDuration, function() {
                buttonTextElem.text("");

                //console.log("slide")
                footerButton.animate({
                    width: "103px"
                }, buttonSlideDuration, function() {
                    //console.log("fade in");
                    //console.log(buttonTextElem);

                    footerButton.removeClass("showVoteView").addClass("updateVoteView");

                    buttonTextElem.text("Aktualisieren");
                    buttonTextElem.animate({
                        opacity: 1
                    }, textOpacityDuration);
                });
            });
        } else {
        	footerButton.attr("style", "width: 103px");
            footerButton.removeClass("showVoteView").addClass("updateVoteView");
            footerButton.children("span:first").text("Aktualisieren");
        }
    } else {
        if(animate && footerButton.hasClass("updateVoteView")) {
            //console.log("fade out")
            buttonTextElem.animate({
                opacity: 0
            }, textOpacityDuration, function() {
                buttonTextElem.text("");

                //console.log("slide")
                footerButton.animate({
                    width: "232px"
                }, buttonSlideDuration, function() {
                    //console.log("fade in");
                    //console.log(buttonTextElem);

                    footerButton.removeClass("updateVoteView").addClass("showVoteView");

                    buttonTextElem.text("Gesamtbewertung aller Leser anzeigen");
                    buttonTextElem.animate({
                        opacity: 1
                    }, textOpacityDuration);
                });
            });
        } else {
        	footerButton.attr("style", "width: 232px");
            footerButton.removeClass("updateVoteView").addClass("showVoteView");
            footerButton.children("span:first").text("Gesamtbewertung aller Leser anzeigen");
        }
    }
}

function clickVoteNowButton(tvKritikElem, sourceElem) {
}



// ---------------------------------------------------------------------------
// --- [ Helper ] ------------------------------------------------------------
// ---------------------------------------------------------------------------

// Mit dieser Funktion werden wird eine Abstimmung gesendet.
//
// Die folgende HTML Struktur wird erwartet:
//
// <div class=".tvkritik">
//    ...
//    <ul class="vote">
//       <li><span>1</span>Spitzenleistung/li>
//       <li> <span>2</span>Gute Performance </li>
//       ...
//    </ul>
//  </div>
//
// tvKritikElem => <div class=".tvkritik">
// sourceLiElem => <li>
//
// Die callback Funktion wird nach dem erhalt des Requests aufgerufen.
//
// Diese Funktion kann in den folgenden Views verwendet werden: - articleElem6sp -
// modul3sp - modul4sp - modul6sp
//

function doAddVote(json, source, fnCalls) {
    var fns = $.extend({
        fnCbDone: null,     // Callback Funktion, wenn Ajax Request erfolgreich war
        fnCbFail: null,     // Callback Funktion, wenn Ajax Request nicht erfolgreich war
        fnCbAlways: null    // Callback Funktion, die immer aufgerufen wird
    }, fnCalls);

    var _json = json;
    updateClientStorageFromJson(ltkSettings.clientStorage, _json);

    var liVoteObjId = getContextByElem(source).voteObjId;
    var index = source.parent("ul").children("li").index(source);
    var addVoteAjaxUrl = _json.config.ajaxUrl + "&viewType=jsonAddVote" + "&cid=" + liVoteObjId + "&i=" + index;

    $.ajax({
        url: addVoteAjaxUrl,
        type: "POST",
        dataType: "json"
    }).done(function (newJson) {
        updateJson(_json, newJson);
        if (fns.fnCbDone != null) {
            fns.fnCbDone(source, _json);
        }
    }).fail(function () {
        if (fns.fnCbFail != null) {
            fns.fnCbFail(source, _json);
        }
    }).always(function () {
        if (fns.fnCbAlways != null) {
            fns.fnCbAlways(source, _json);
        }
    });
}

// Liefert den aktuellen Stand aller Vote Objekte
function doGetVotes(json, source, fnCalls) {
    var fns = $.extend({
        fnCbDone: null,     // Callback Funktion, wenn Ajax Request erfolgreich war
        fnCbFail: null,     // Callback Funktion, wenn Ajax Request nicht erfolgreich war
        fnCbAlways: null    // Callback Funktion, die immer aufgerufen wird
    }, fnCalls);

    var _json = json;
    var getVotesAjaxUrl = _json.config.ajaxUrl + "&viewType=jsonGetVotes";

    $.ajax({
        url: getVotesAjaxUrl,
        dataType: "json"
    }).done(function (newJson) {
        updateJson(_json, newJson);
        if (fns.fnCbDone != null) {
            fns.fnCbDone(source, _json);
        }
    }).fail(function () {
        if (fns.fnCbFail != null) {
            fns.fnCbFail(source, _json);
        }
    }).always(function () {
        if (fns.fnCbAlways != null) {
            fns.fnCbAlways(source, _json);
        }
    });
}

function setUrlParameter(url, paramName, paramValue) {
	if(url == null || typeof url != "string") {
		return null;
	}
	if(paramName == null || typeof paramName!= "string") {
		return url;
	}
	
	var indexOfQm = url.indexOf("?");
	if(indexOfQm == -1) {
		if(paramValue == null || paramValue == undefined) {
			return url + "?" + paramName;
		} else {
			return url + "?" + paramName + "=" + paramValue;
		}
	}
	
	var urlSplit = url.split("?");
	var baseUrl = urlSplit[0];
	var urlParams = urlSplit[1];
	
	paramsSplit = urlParams.split("&");
	
	var paramFound = false;
	for(var i = 0; i < paramsSplit.length; i++) {
		var paramSplit = paramsSplit[i].split("=");
		
		if(paramSplit[0] == paramName) {
			if(paramSplit[1] != null) {
				paramsSplit[i] = paramSplit[0];
				
				if(paramValue != null && paramValue != undefined) {
					paramsSplit[i] += "=" + paramValue;
				}
				
				paramFound = true;
			}
		}
	}
	

	if(paramFound) {
		urlParams = "";
		for (i = 0; i < paramsSplit.length; i++) {
			if(i != 0) {
				urlParams += "&"
			}
			urlParams += paramsSplit[i];
		}
	} else {
		urlParams += "&" + paramName;
		if(paramValue != null && paramValue != undefined) {
			urlParams += "=" + paramValue;
		}
	}
	
	return baseUrl + "?" + urlParams;
}



// --- json informations request and manipulations ---
function updateJson(json, updateJson) {
    if(updateJson == null || json == null) {
        return null;
    }

    // config update
    if(json.config == undefined && updateJson.config != undefined && updateJson.config != null) {
        json["config"] = new Object();
    } 
    
    if (json.config != undefined && updateJson.config != undefined && updateJson.config != null) {
        for (var configItemUpdateJson in updateJson.config) {
            if (configItemUpdateJson == "widgetType") {
                continue;
            }
        
            if (configItemUpdateJson == "voted") {
                if (json.config["voted"] == null) {
                    json.config["voted"] = new Array();
                }
                //for (var i=0; i < updateJson.config.voted.length; i++) {
                //	if(compareContextKey())
                //    json.config.voted.push(updateJson.config.voted[i]);
                //}
                
                mergeContextKeys(json, updateJson);
                continue;
            }
            json.config[configItemUpdateJson] = updateJson.config[configItemUpdateJson];
        }
    }

    // data update
    if(json.data == undefined && updateJson.data != undefined && updateJson.data != null) {
        json["data"] = new Object();
    }
    
    if (json.data != undefined && updateJson.data != undefined && updateJson.data != null) {
        for (var updateJsonVoteObjId in updateJson.data) {
            var data = json.data[updateJsonVoteObjId];
            if (data == undefined || data == null) {
                json.data[updateJsonVoteObjId] = new Object();
            }
            var updateData = updateJson.data[updateJsonVoteObjId];

            // console.log("data <= update data: " + updateJsonVoteObjId);
            for (var updateDataKey in updateJson.data[updateJsonVoteObjId]) {
                // Die eigentliche Aktualisierung
                json.data[updateJsonVoteObjId][updateDataKey] = updateJson.data[updateJsonVoteObjId][updateDataKey];
            }
        }
    }
}

// Setzt ein Vote Objekt in der JSON Struktur auf "abgestimmt"
function addVotedToJson(json, voteObjId) {
    if(json == null || json.config == null || voteObjId == null || voteObjId < 0) {
        return;
    }
    
    var contextKey = generateContextKey(json.config.eventId, voteObjId);
    if (json.config.voted == null) {
        json.config["voted"] = new Array(contextKey);
    } else {
        for (var i=0; i < json.config.voted.length; i++) {
            if (json.config.voted[i] == contextKey) {
                return;
            }
        }
        json.config.voted.push(contextKey);
    }
}

// Überprüft ein einzelnes Vote Objekt, ob dieses bereits abgestimmt wurde
function isAlreadyVoted(json, voteObjId) {
    if(json == null || json.config == null || json.config.voted == null || voteObjId == null || voteObjId < 0) {
        return false;
    }
    var contextKey = generateContextKey(json.config.eventId, voteObjId);

    for (var i=0; i < json.config.voted.length; i++) {
        if (json.config.voted[i] == contextKey) {
            return true;
        }
    }
    return false;
}

// checks wether the current time is in between the start and end time
function isInVotableTimeslot(json) {
    if(json == null || json.config == null) {
        false;
    }
    try {
        var startdate = _parseDateString(json.config.startDate);
        var enddate = _parseDateString(json.config.endDate);
        var now = new Date();
        return (startdate < now && now < enddate);
    } catch (excp) {
        return false;
    }
}

// Diese Methode zerlegt ein Datumsstring, nach folgendem Formaten: yyyy-MM-dd hh:mm:ss
function _parseDateString(dateString) {
    var timeParts = dateString.split(/[\- \:]/);
    if(timeParts.length != 6) {
        return null;
    }
    //var date = new Date(timeParts[0], parseInt(timeParts[1]) - 1, timeParts[2], timeParts[3], timeParts[4], timeParts[5]);
    var date = new Date(timeParts[0] || 0, (parseInt(timeParts[1]) - 1) || 0, timeParts[2] || 1, timeParts[3] || 0, timeParts[4] || 0, timeParts[5] || 0);
    
    if (isNaN(date.getTime())) {
        return null;
    }
    return date;
}

// Mit der Funktion kann überprüft werden, ob der Benutzer bereits alle Vote Objekte abstimmbaren hat.
function allContextKeysVoted(json) {
    if(json == null || json.config == null || json.config.voted == null || json.config.eventId == null || json.data == null) {
        return false;
    }
        
    var voted = false;
    for (var dataItemVoteObjId in json.data) {
        voted = false;
        var dataItemContextKey = generateContextKey(json.config.eventId, dataItemVoteObjId);

        for (var i=0; i < json.config.voted.length; i++) {
            var votedItemContextKey = json.config.voted[i];
            if (dataItemContextKey == votedItemContextKey) {
                voted = true;
                break;
            }
        }
        if (!voted) {
            return false;
        }
    }
    return true;
}

// Diese Funktion liefert das nächst bewertbare Vote Objekt zurück. Die Funtion berücksichtigt dabei die Reihenfolge aus dem Content Studio
function getNextVotableContext(json) {
    if(json == null || json.config == null || json.config.order == null || json.config.eventId == null) {
        return null;
    }
    
    if (isInVotableTimeslot(json)) {
        for (var i=0; i < json.config.order.length; i++) {
            var context = getContextFromContextKey(json.config.order[i]);
            if (!isAlreadyVoted(json, context.voteObjId)) {
                return context;
            }
        }
    }
    return null;
}

// --- request and manipulate elements ---

// Diese Funktion liefert ein Content Div anhand eines übergebenen Content Keys
//
// <div class=".tvkritik">
//    ...
//    <div class="content cid100230635x100230670">
//       ...
//    </div>
//    <div class="content cid100230635x100230671">
//       ...
//    </div>
//    <div class="content cid100230635x100230672">
//       ...
//    </div>
// </div>
//
// tvKritikElem => <div class=".tvkritik">
// voteObjId => 100230671
// return <= <div class="content cid100230635x100230671">...</div>

function getContentDivElemByVoteObjId(tvKritikElem, voteObjId) {
    var contentDiv = null;
    tvKritikElem.children("div.content").each(function() {
        var elemContentClasses = $(this).attr("class").split(" ");
        for (var i = 0; i < elemContentClasses.length; i++) {
            var context = getContextFromContextKey(elemContentClasses[i]);
            if (context != null) {
                if (context.voteObjId == voteObjId) {
                    contentDiv = $(this);
                    return false;
                }
            }
        }
        return true;
    });
    return contentDiv;
}

// Liefert das root Element des Tv Kritik HTMLs. Es ist das Element, an dem das JSON gebunden ist.
function getTvkritikElemByElem(elemInTvkritik) {
    var tvkritikElem = null;
    if (elemInTvkritik.hasClass("tvkritik")) {
        tvkritikElem = elemInTvkritik;
    } else {
        tvkritikElem = elemInTvkritik.parents("div.tvkritik:first");
    }
    return tvkritikElem;
}

// Es kann irgendein HTML Element innerhalt des div.content Elementes und die methode ermittelt den
// passenden Context Key
function getContextByElem(elemInContentDiv) {
    var contentDivElem = null;
    if (elemInContentDiv.hasClass("content")) {
        contentDivElem = elemInContentDiv;
    } else {
        contentDivElem = elemInContentDiv.parents("div.tvkritik > div.content:first");
    }
    if (contentDivElem == null || contentDivElem.length == 0) {
        return null;
    }

    var elemContentClasses = contentDivElem.attr("class").split(" ");
    for (var i = 0; i < elemContentClasses.length; i++) {
        var context = getContextFromContextKey(elemContentClasses[i])
        if (context != null) {
            return context;
        }
    }
    return null;
}

// Diese Function scrollt zu ein bestimmtes HTML Element. Mittels Optionen kann eine Startverzögerung,
// die Scroll-Dauer und ein oberer Abstand zum Element (margin-top) angegeben werden.
function scrollToElement(elem, options) {
    var opts = $.extend({
        delay: 0,
        duration: 0,
        marginTop: 0
    }, options);

    var iterate = elem[0];
    var scrollToPos = 0;

    if (iterate.offsetParent) {
        do {
            scrollToPos += iterate.offsetTop;
        } while (iterate = iterate.offsetParent);
    }
    if (scrollToPos > opts.marginTop) {
        scrollToPos -= opts.marginTop;
        if (opts.delay > 0) {
            window.setTimeout(function() {
                if (opts.duration == 0) {
                    $(document).scrollTop(scrollToPos);
                } else {
                    $('html,body').animate({
                        scrollTop: scrollToPos
                    }, opts.duration);
                }
            }, opts.delay);
        } else {
            if (opts.duration == 0) {
                $(document).scrollTop(scrollToPos);
            } else {
                $('html,body').animate({
                    scrollTop: scrollToPos
                }, opts.duration);
            }
        }
    }
}

// --- request and manipulate keys ---
function generateContextKey(eventId, voteObjId) {
    return "cid" + eventId + "x" + voteObjId;
}

function getContextFromContextKey(contextKey) {
    if (contextKey.substring(0, 3) == "cid") {
        var keySplit = contextKey.substring(3, contextKey.length).split("x");
        return {
            "eventId": parseInt(keySplit[0]),
            "voteObjId": parseInt(keySplit[1])
        }
    }
    return null;
}

function isContextKey(classString) {
    if (classString.substring(0,3) == "cid") {
        return true;
    }
    return false;
}

function mergeContextKeys(firstJson, secondJson) {
    if(secondJson == null || secondJson.config == undefined || secondJson.config.voted == undefined) {
        return;
    }
    if(firstJson == undefined || firstJson == null) {
        return;
    }
    if(firstJson.config == undefined) {
        firstJson["config"] = new Object();
    }
    if(firstJson.config.voted == undefined) {
        firstJson.config["voted"] = new Array();
    }
    
    var contextKeyFoundInFirstJson;
    for(var i=0; i < secondJson.config.voted.length; i++) {
        contextKeyFoundInFirstJson = false;
        for(var j=0; j < firstJson.config.voted.length; j++) {
            if(secondJson.config.voted[i] == firstJson.config.voted[j]) {
                contextKeyFoundInFirstJson = true;
                break;
            }
        }       
        if(!contextKeyFoundInFirstJson) {
        	firstJson.config.voted.push(secondJson.config.voted[i]);
        }
    }
}

function getUniqueLtkWidgetId(tvKritikElem) {
    var classes = tvKritikElem.attr("class").split(" ");
    for(var i=0; i < classes.length; i++) {
        if(classes[i].length > 8 && classes[i].substring(0, 9) == "ltkWidget") {
            return classes[i];
        }
    }
    return null;
}

// --- text ---
function limitText(text, limit, appender) {
    if(typeof text != "string" || typeof limit != "number") {
        return null;
    }
    if(limit >= text.length) {
        return text;
    }

    if(appender != undefined && typeof appender == "string") {
        return text.substring(0, limit) + appender;
    } else {
        return text.substring(0, limit)
    }
}





// ---------------------------------------------------------------------------
// --- [ client storage ] ----------------------------------------------------
// ---------------------------------------------------------------------------

// speichert das array configVote in localstorage|cookie
function updateClientStorageFromJson(clientStorage, json, options) {
    var opts = $.extend({
        retryOnError: true,
        loadOldClientStorage: true
    }, options);	
	
    if (clientStorage.enabled) {
        var localKey = "ltkVoted";
        try {
            var oldClientStorageValue = null;
            if (opts.loadOldClientStorage) {
                oldClientStorageValue = getLocalStorage(clientStorage, localKey);
            }
            var localStorageValue = encodeClientStorageData(clientStorage, json, oldClientStorageValue);
            setLocalStorage(clientStorage, localKey, localStorageValue);
        } catch(e) {
            //console.error(e.message);
            if(e.message == "diffVersions" || e.message == "corruptLocalStorage") {
                clearLocalStorage(localKey);
                if (opts.retryOnError) {
                    updateClientStorageFromJson(clientStorage, json, {
                        retryOnError: false,
                        loadOldClientStorage: false
                    });
                }
            }
        }
    }
}

// ließt parameter localKey aud localstorage|cookie aus und gibt array zurück
function updateJsonFromClientStorage(clientStorage, json) {
    if (clientStorage.enabled) {
        var localKey = "ltkVoted";
        var localVoted = "";

        var localVotedArr = getLocalStorage(clientStorage, localKey);
        if (localVotedArr != null) {
            try {
                var csData = decodeClientStorageData(clientStorage, new Array(json), localVotedArr);
                updateJson(json, csData.jsons[0]);
            } catch(e) {
                if(e.message == "diffVersions" || e.message == "corruptLocalStorage") {
                    clearLocalStorage(localKey);
                    // sichert den altuellen Stand
                    updateClientStorageFromJson(clientStorage, json, {
                        retryOnError: false
                    });
                }
            }
        }
    }
}

function encodeClientStorageData(clientStorage, json, oldCookieValue) {
    var format = clientStorage.format;
    var compress = clientStorage.compress;

    var persistString = "";

    // Version check und eventuell schon vorhandene Einträge entfernen
    if (oldCookieValue != null && oldCookieValue.length > 0) {
        var versionSymSplit = oldCookieValue.split(format.versionSym);

        if (versionSymSplit.length < 2) {
            var message = "corrupted client storage data format. value: " + oldCookieValue
            throw "corruptLocalStorage";
        }

        var version = 0;
        if (compress.enabled) {
            version = BaseDecoder(compress, versionSymSplit[0]);
        } else {
            version = parseInt(versionSymSplit[0]);
        }

        if (format.version !== version) {
            var message = "different version numbers"
            throw "diffVersions";
        }

        oldCookieValue = versionSymSplit[1]

        // Eventuell vorhandenen Eintrag im oldCookieValue (verglichen json.config.eventId) entfernen
        var part = oldCookieValue.split(format.contextDelim);

        if (format.shortened) {
            for (var c = 0; c < part.length; c++) {
                var currEventId;

                if (compress.enabled) {
                    currEventId = BaseDecoder(compress, part[c].split(format.eventDelim)[0]);
                } else {
                    currEventId = parseInt(part[c].split(format.eventDelim)[0]);
                }

                if (currEventId == json.config.eventId) {
                    var part = part.slice(0, c).concat(part.slice(c + 1));

                    // Alter Cookie Wert ohne duplikat (json.config.eventId) erstellen
                    oldCookieValue = "";
                    for (var pi = 0; pi < part.length; pi++) {
                        if (pi != 0) {
                            oldCookieValue += format.contextDelim;
                        }
                        oldCookieValue += part[pi];
                    }
                    break;
                }
            }
        } else {
            for (var c1 = 0; c1 < part.length; c1++) {
                var currEventId = part[c1].split(format.voteDelim)[0];
                if (compress.enabled) {
                    version = BaseDecoder(compress, currEventId.split(format.eventDelim)[0]);
                } else {
                    version = parseInt(currEventId.split(format.eventDelim)[0]);
                }

                if (currEventId == json.config.eventId) {
                    // Löschen des Duplikats
                    var part = part.slice(0, c1).concat(part.slice(c1 + 1));

                    // Alter Cookie Wert ohne Duplikat (json.config.eventId) erstellen
                    oldCookieValue = "";
                    for (var pi = 0; pi < part.length; pi++) {
                        if (pi != 0) {
                            oldCookieValue += format.contextDelim;
                        }
                        oldCookieValue += part[pi];
                    }
                    break;
                }
            }
        }
    } else if (oldCookieValue != null && oldCookieValue.length < format.versionSym.length +1) {
        var message = "corrupted client storage data format. value: " + oldCookieValue;
        throw "corruptLocalStorage";
    }

    // Aufbau der neuen Speicherstandes
    var eventId = parseInt(json.config.eventId);
    if (format.shortened) {
        if (compress.enabled) {
            persistString += BaseEncoder(compress, eventId) + format.eventDelim;
        } else {
            persistString += eventId + format.eventDelim;
        }

        var contextKey = null;
        var context = null;

        for (var i = 0; i < json.config.voted.length; i++) {
            contextKey = json.config.voted[i];
            context = getContextFromContextKey(contextKey);

            if (i != 0) {
                persistString += format.voteDelim;
            }

            if (compress.enabled) {
                persistString += BaseEncoder(compress, context.voteObjId);
            } else {
                persistString +=  context.voteObjId;
            }

            if (json.data[context.voteObjId].yourVote != null) {
                var yourVote = parseInt(json.data[context.voteObjId].yourVote);
                if (compress.enabled) {
                    persistString += format.voteScoreDelim + BaseEncoder(compress, yourVote);
                } else {
                    persistString += format.voteScoreDelim + yourVote;
                }
            }
        }
    } else {
        for (var i = 0; i < json.config.voted.length; i++) {
            contextKey = json.config.voted[i];
            context = getContextFromContextKey(contextKey);

            if (i != 0) {
                persistString += format.voteDelim;
            }

            if (compress.enabled) {
                persistString += BaseEncoder(compress, eventId) + format.eventDelim;
                persistString += BaseEncoder(compress, context.voteObjId);
            } else {
                persistString += eventId + format.eventDelim + context.voteObjId;
            }

            if (json.data[context.voteObjId].yourVote != null) {
                var yourVote = parseInt(json.data[context.voteObjId].yourVote);
                if (compress.enabled) {
                    persistString += format.voteScoreDelim + BaseEncoder(compress, yourVote);
                } else {
                    persistString += format.voteScoreDelim + yourVote;
                }
            }
        }
    }

    // Neuer Speicherstand mit altern vereinen
    // Die letzte (aktuellste) Änderung steht immer vorne an. So müssen die Schleifen
    // potentiell weniger Durchläufe verarbeiten.
    if (oldCookieValue != null && oldCookieValue.length > 0) {
        if (compress.enabled) {
            persistString = BaseEncoder(compress, parseInt(format.version)) + format.versionSym + persistString + format.contextDelim +  oldCookieValue;
        } else {
            persistString = format.version + format.versionSym + persistString + format.contextDelim +  oldCookieValue;
        }
    } else {
        if (compress.enabled) {
            persistString = BaseEncoder(compress, parseInt(format.version)) + format.versionSym + persistString;
        } else {
            persistString = format.version + format.versionSym + persistString;
        }
    }

    return persistString;
}

function decodeClientStorageData(clientStorage, jsonArray, string) {
    if(typeof jsonArray != "object" && jsonArray != null || typeof string != "string") {
        return;
    }

    var loadedDatas = {
        version: null,
        jsons: []
    }

    var allJsons = jsonArray == null;
    var format = clientStorage.format;
    var compress = clientStorage.compress;

    var procString = string;

    // version split
    var versionSplit = procString.split(format.versionSym);
    var version;

    if (compress.enabled) {
        version = BaseDecoder(compress, versionSplit[0])
    } else {
        version = parseInt(versionSplit[0]);
    }

    if (version != format.version) {
        var message = "different version numbers. 'format.version': " + format.version + ", 'version': " + version;
        throw "diffVersions";
    }

    loadedDatas.version = version;

    procString = versionSplit[1];

    // context split
    var contextSplit = procString.split(format.contextDelim);

    procString = null;
    
    var numOfEventsToBeProcessed = 0;
    if(allJsons) {
        numOfEventsToBeProcessed = contextSplit.length;
    } else {
        numOfEventsToBeProcessed = jsonArray.length;
    }
    
    var startEventIndex = 0;
    for(var ija=0; ija < numOfEventsToBeProcessed; ija++) {
        var detectedEventId;
        var json = null;

        for (var i = startEventIndex; i < contextSplit.length; i++) {
            if (format.shortened) {
                var eventSplit = contextSplit[i].split(format.eventDelim);

                if (compress.enabled) {
                    detectedEventId = BaseDecoder(compress, eventSplit[0]);
                } else {
                    detectedEventId = parseInt(eventSplit[0]);
                }
	
                if(allJsons) {
                    procString = eventSplit[1];
                    startEventIndex++;
                    break;
                } else {
                    json = jsonArray[ija];
                    if (detectedEventId == json.config.eventId) {
                        procString = eventSplit[1];
                        break;
                    }
                }
            } else {
                var contextDataSplit = contextSplit[i].split(format.voteDelim);

                // event split
                if (contextDataSplit.length > 0) {
                    detectedEventId = parseInt(contextDataSplit[0].split(format.eventDelim)[0])
                } else {
                    continue;
                }
                
                if(allJsons) {
                    procString = eventSplit[1];
                    startEventIndex++;
                    break;
                } else {
                    json = jsonArray[ija];
                    if (detectedEventId == json.config.eventId) {
                        procString = contextSplit[i];
                        break;
                    }
                }
            }
        }

        if (procString == null) {
            return null;
        }

        var updateJson = {
            "config":{
                "eventId": detectedEventId
            }
        };

        var voteSplit;
        var voteScore;
        var voteObjId;
        var v;

        // vote split
        if (format.shortened) {
            voteSplit = procString.split(format.voteDelim);

            if (voteSplit.length > 0) {
                updateJson.config["voted"] = new Array();
            }

            for (v = 0; v < voteSplit.length; v++) {
                voteScoreSplit = voteSplit[v].split(format.voteScoreDelim);
            
                if (compress.enabled) {
                    voteObjId = BaseDecoder(compress, voteScoreSplit[0]);
                } else {
                    voteObjId = parseInt(voteScoreSplit[0]);
                }

                updateJson.config.voted.push(generateContextKey(detectedEventId, voteObjId));

                // vote score (your vote) split
                if (voteScoreSplit.length > 1) {
                    if (updateJson.data == null) {
                        updateJson["data"] = new Object();
                    }

                    if (compress.enabled) {
                        voteScore = BaseDecoder(compress, voteScoreSplit[1]);
                    } else {
                        voteScore = parseInt(voteScoreSplit[1]);
                    }

                    updateJson.data[voteObjId] = new Object();
                    updateJson.data[voteObjId]["yourVote"] = voteScore;
                }
            }
        } else {
            voteSplit = procString.split(format.voteDelim);

            if (voteSplit.length > 0) {
                updateJson.config["voted"] = new Array();
            }

            for (v = 0; v < voteSplit.length; v++) {
                procString = voteSplit[v].split(format.eventDelim)[1];
                var voteScoreSplit = procString.split(format.voteScoreDelim);
                voteObjId = parseInt(voteScoreSplit[0]);

                updateJson.config.voted.push(generateContextKey(detectedEventId, voteObjId));

                // vote score (your vote) split
                if (voteScoreSplit.length > 1) {
                    if (updateJson.data == null) {
                        updateJson["data"] = new Object();
                    }

                    if (compress.enabled) {
                        voteScore = BaseDecoder(compress, voteScoreSplit[1]);
                    } else {
                        voteScore = parseInt(voteScoreSplit[1]);
                    }

                    updateJson.data[voteObjId] = new Object();
                    updateJson.data[voteObjId]["yourVote"] = voteScore;
                }
            }
        }
        loadedDatas.jsons.push(updateJson);
    }
    return loadedDatas;
}

/*
function decodeClientStorageData(clientStorage, json, string) {
    var format = clientStorage.format;
    var compress = clientStorage.compress;

    var procString = string;

    // version split
    var versionSplit = procString.split(format.versionSym);
    var version;

    if (compress.enabled) {
        version = BaseDecoder(compress, versionSplit[0])
    } else {
        version = parseInt(versionSplit[0]);
    }

    if (version != format.version) {
        var message = "different version numbers. 'format.version': " + format.version + ", 'version': " + version;
        throw "diffVersions";
    }

    procString = versionSplit[1];

    // context split
    var contextSplit = procString.split(format.contextDelim);

    procString = null;

    for (var i=0; i < contextSplit.length; i++) {
        var currEventId;
        if (format.shortened) {
            var eventSplit = contextSplit[i].split(format.eventDelim);

            if (compress.enabled) {
                currEventId = BaseDecoder(compress, eventSplit[0]);
            } else {
                currEventId = parseInt(eventSplit[0]);
            }

            if (currEventId == json.config.eventId) {
                procString = eventSplit[1];
                break;
            }
        } else {
            var contextDataSplit = contextSplit[i].split(format.voteDelim);

            // event split
            if (contextDataSplit.length > 0) {
                currEventId = parseInt(contextDataSplit[0].split(format.eventDelim)[0])
            } else {
                continue;
            }
            if (currEventId == json.config.eventId) {
                procString = contextSplit[i];
                break;
            }
        }
    }

    if (procString == null) {
        return null;
    }

    var updateJson = {
        "config":{
            "eventId": json.config.eventId
        }
    };

    var voteSplit;
    var voteScore;
    var voteObjId;
    var v;

    // vote split
    if (format.shortened) {
        voteSplit = procString.split(format.voteDelim);

        if (voteSplit.length > 0) {
            updateJson.config["voted"] = new Array();
        }

        for (v = 0; v < voteSplit.length; v++) {
            voteScoreSplit = voteSplit[v].split(format.voteScoreDelim);
            
            if (compress.enabled) {
                voteObjId = BaseDecoder(compress, voteScoreSplit[0]);
            } else {
                voteObjId = parseInt(voteScoreSplit[0]);
            }

            updateJson.config.voted.push(generateContextKey(json.config.eventId, voteObjId));

            // vote score (your vote) split
            if (voteScoreSplit.length > 1) {
                if (updateJson.data == null) {
                    updateJson["data"] = new Object();
                }

                if (compress.enabled) {
                    voteScore = BaseDecoder(compress, voteScoreSplit[1]);
                } else {
                    voteScore = parseInt(voteScoreSplit[1]);
                }

                updateJson.data[voteObjId] = new Object();
                updateJson.data[voteObjId]["yourVote"] = voteScore;
            }
        }
    } else {
        voteSplit = procString.split(format.voteDelim);

        if (voteSplit.length > 0) {
            updateJson.config["voted"] = new Array();
        }

        for (v = 0; v < voteSplit.length; v++) {
            procString = voteSplit[v].split(format.eventDelim)[1];
            var voteScoreSplit = procString.split(format.voteScoreDelim);
            voteObjId = parseInt(voteScoreSplit[0]);

            updateJson.config.voted.push(generateContextKey(json.config.eventId, voteObjId));

            // vote score (your vote) split
            if (voteScoreSplit.length > 1) {
                if (updateJson.data == null) {
                    updateJson["data"] = new Object();
                }

                if (compress.enabled) {
                    voteScore = BaseDecoder(compress, voteScoreSplit[1]);
                } else {
                    voteScore = parseInt(voteScoreSplit[1]);
                }

                updateJson.data[voteObjId] = new Object();
                updateJson.data[voteObjId]["yourVote"] = voteScore;
            }
        }
    }
    return updateJson;
}
 */

function BaseEncoder(settings, decimal) {
    var symbols = settings.symbols;
    var conversion = "";
    var base = symbols.length;

    if (base > symbols.length || base <= 1) {
        return false;
    }

    if (decimal > 0) {
        while (decimal >= 1) {
            conversion = symbols[(decimal - (base * Math.floor(decimal / base)))] +
            conversion;
            decimal = Math.floor(decimal / base);
        }
    } else {
        conversion = symbols[decimal];
    }
    return conversion;
}

function BaseDecoder(settings, codesValue) {
    var symbols = settings.symbols;
    var base = symbols.length;

    var charDecValue;
    var decimal = 0;

    codesValue = "" + codesValue;

    for (var currPow=0; currPow < codesValue.length; currPow++) {
        for (var si=0; si < base; si++) {
            if (codesValue[codesValue.length - 1 - currPow] == symbols[si]) {
                charDecValue = si;
                break;
            }
        }
        decimal += charDecValue * Math.pow(base, currPow);
    }

    return decimal;
}

// Speichert einen Wert in den Client Storage. Dies kann der local storage oder
// der Cookie sein
function setLocalStorage(clientStorage, localKey, storeVoted) {
    var clientStorageValue = storeVoted;
	
    // speichern in den local storage oder in ein cookie
    if (typeof(localStorage) == 'undefined' ) {
        if (ltkSettings.clientStorage.cookie.urlEncoding) {
            clientStorageValue = escape(storeVoted);
        }
        $.cookie(localKey, clientStorageValue, {
            domain: 'welt.de',
            path: '/',
            expires: 7
        });
    } else {
        if (ltkSettings.clientStorage.localStorage.urlEncoding) {
            clientStorageValue = escape(storeVoted);
        }
        try {
            localStorage.setItem(localKey, clientStorageValue);
        } catch (e) {
        }
    }
}

// Ließt einen Wert aus den Client Storage aus. Der Client Storage kann der
// local storage oder ein Cookie sein.
function getLocalStorage(clientStorage, localKey) {
    var clientStorageValue = "";

    if (typeof(localStorage) == 'undefined') {
        if ($.cookie(localKey) != null) {
            clientStorageValue = $.cookie(localKey);
        }
        if(clientStorageValue != null && clientStorage.cookie.urlEncoding) {
            clientStorageValue = escape(clientStorageValue);
        }
    } else if (localStorage.getItem(localKey) != null) {
        clientStorageValue = localStorage.getItem(localKey);
        if(clientStorageValue != null && clientStorage.localStorage.urlEncoding) {
            clientStorageValue = escape(clientStorageValue);
        }
    }

    if (clientStorageValue != null && clientStorageValue.length > 0) {
        return clientStorageValue;
    } else {
        return null;
    }
}

// löscht den parameter localKey im localstorage|cookie
function clearLocalStorage(localKey) {
    if (typeof(localStorage) == 'undefined' ) {
        $.cookie(localKey,null,{
            domain:'welt.de',
            path:'/'
        });
    } else if (localStorage.getItem(localKey) != null) {
        localStorage.removeItem(localKey);
    }
}





// ---------------------------------------------------------------------------
// --- [ Garbage Collection ] ------------------------------------------------
// ---------------------------------------------------------------------------

function runGarbageCollection(clientStorage, fnCalls) {
    var fns = $.extend({
        fnCbDone: null,     // Callback Funktion, wenn Ajax Request erfolgreich war
        fnCbFail: null,     // Callback Funktion, wenn Ajax Request nicht erfolgreich war
        fnCbAlways: null    // Callback Funktion, die immer aufgerufen wird
    }, fnCalls);

    var localKey = "ltkVoted";
    var currentEventsUrl = window.location.protocol + "//" + window.location.host + "/?config=current_events";

    $.ajax({
        url: currentEventsUrl,
        dataType: "json"
    }).done(function (currEventsJson) {
        if(currEventsJson == undefined || typeof currEventsJson != "object" || typeof currEventsJson.events != "object") {
            if (fns.fnCbFail != null) {
                fns.fnCbFail();
            }
            return;
        }
        
        var localVotedArr = getLocalStorage(clientStorage, localKey);
        var scData = decodeClientStorageData(clientStorage, null, localVotedArr);
        
        if(scData != null) {
            var newCsJsons = new Array();
            var json;
            var i=0;
        	
            var valideEventId;
            var csDataChanged = false;
            for(i = 0; i < scData.jsons.length; i++) {
                valideEventId = false;
                for(var j=0; j < currEventsJson.events.length; j++) {
                    if(scData.jsons[i].config.eventId == currEventsJson.events[j]) {
                        valideEventId = true;
                        break;
                    }
                }
        		
                if(valideEventId == true) {
                    json = {};
                    updateJson(json, scData.jsons[i]);
                    newCsJsons.push(json);
                } else {
                    csDataChanged = true;
                }
            }
            
            if(csDataChanged && newCsJsons.length > 0) {
                clearLocalStorage(localKey);
                var localStorageValue = null;
           		
                for(i = newCsJsons.length -1; i >= 0; i--) {
                    localStorageValue = encodeClientStorageData(clientStorage, newCsJsons[i], localStorageValue);
                }
                setLocalStorage(clientStorage, localKey, localStorageValue);
            }
        }
        
        if (fns.fnCbDone != null) {
            fns.fnCbDone();
        }
    }).fail(function () {
        if (fns.fnCbFail != null) {
            fns.fnCbFail();
        }
    }).always(function () {
        if (fns.fnCbAlways != null) {
            fns.fnCbAlways();
        }
    });
};/**
 * Valuecompare Widget functionality
 * Reads the data from a json object
 *
 * TODO different data for each possible widget
 *
 * @author Steve Junker <steve.junker@axelspringer.de>
 * @version 0.3 - Set header via js removed
 *              - Select first view if no button was found
 *              - Logic for infobox visibility fixed
 *
 * @uses jQuery
 *
 * JSON Datastructure:
 *
 * {
 *   "title":"Interaktiver Wertevergleich",
 *   "views": [
 *   {
 *     "viewsources":"Quelle default",
 *     "showviewsources":true,
 *     "viewtitle":
 *     "View 1",
 *     "viewtext":"Lorem ipsum dolor",
 *     "showviewtext":true,
 *     "value1":22,
 *     "infobox1title":"Infobox Titel",
 *     "infobox1text":"Infobox Text",
 *     "value2":30,
 *     "infobox2title":"titel",
 *     "infobox2text":"text",
 *     "value3":40,
 *     "infobox3title":"titel",
 *     "infobox3text":"text",
 *     "value4":60,
 *     "infobox4title":"titel",
 *     "infobox4text":"text"
 *   }]
 * }
 */
asms.general.ece.widgets.valuecompare = (function($) {
    var options = {
        dataJson : '',
        selector : '.valuecompare',
        titleSelector : '.headline',
        subtitleSelector : '.caption',
        sourceSelector : '.source',
        buttonSelector : 'button',
        infoboxSelector : '.overlayText',
        pixelPerSecond : 80,
        movementSelector : '.imgWrapper',
        mouseX : '',
        mouseY : ''
    }

    var widget;

    /**
     * Functionality for each view button
     * Sets text and appends the animation effekt
     *
     * @param int index Button index
     */
    function valuecompareUpdateView(index) {
        // set title
        jQuery(options.titleSelector, widget).html(
                dataJson.views[index].viewtitle);

        // set subtitle
        jQuery(options.subtitleSelector, widget).html(
                dataJson.views[index].viewtext);

        // set visibility for subtitle
        jQuery(options.subtitleSelector, widget).toggle(
                dataJson.views[index].showviewtext);

        // set source
        jQuery(options.sourceSelector, widget).html(
                'Quelle: ' + dataJson.views[index].viewsources);

        // set visibility for source
        jQuery(options.sourceSelector, widget).toggle(
                dataJson.views[index].showviewsources);

        var movDir = getMovementDirection();

        jQuery('.img', widget).each(
                function(barCounter) {
                    barCounter++;

                    var scale = dataJson.views[index]['value' + barCounter];
                    var infobox = jQuery(options.infoboxSelector, this);

                    // set infobox title
                    jQuery('span', infobox).html(
                            dataJson.views[index]['infobox' + barCounter
                                    + 'title']);
                    // set infobox text
                    jQuery('p', infobox).html(
                            dataJson.views[index]['infobox' + barCounter
                                    + 'text']);

                    // set infobox visibility
                    infobox.toggleClass('alwaysHidden',
                            !dataJson.views[index]['showinfobox' + barCounter]);

                    var bar = jQuery('.value', this);
                    var barValue = jQuery('span', bar);

                    if (0 == bar.length) {
                        return;
                    }

                    // set bar text
                    barValue.text(scale + '%');

                    // set bar movement
                    // bars are moving vertical
                    if ('height' == movDir) {
                        var duration = getDuration(bar.height(), jQuery(this)
                                .height(), scale);

                        bar.stop().animate({
                            height : scale + '%'
                        }, {
                            duration : duration,
                            step : function(now) {
                                barValue.toggleClass('static',
                                        (13 > now) ? true : false);
                            }
                        });
                        // bars are moving horizontal
                    } else {
                        var duration = getDuration(bar.width(), jQuery(this)
                                .width(), scale);

                        bar.stop().animate({
                            width : scale + '%'
                        }, {
                            duration : duration
                        });
                    }
                });
    }

    /**
     * Returns the direction of the bars
     *
     * @returns string height|width
     */
    function getMovementDirection() {
        if (true === jQuery(options.movementSelector).hasClass('vertical')) {
            return 'height';
        } else {
            return 'width';
        }
    }

    /**
     * Removes .active class for all buttons
     * Adds .active class for clicked button
     */
    function setSelection(button) {
        jQuery(options.buttonSelector, widget).removeClass('active');
        jQuery(button).addClass('active');
    }

    /**
     * Returns the duration
     *
     * @param int actualValue
     * @param int containerValue
     * @param int newValue Percent value of the container height
     * @returns int
     */
    function getDuration(actualValue, containerValue, newValue) {
        var steps = 0;
        var duration = 2000;

        newValue = containerValue * newValue / 100;

        if (actualValue < newValue) {
            steps = newValue - actualValue;
        } else {
            steps = actualValue - newValue;
        }

        duration = 1000 * steps / options.pixelPerSecond;

        return duration;
    }

    var methods = {
        init : function(selector, newOptions) {
            // extend options
            options = jQuery.extend(options, newOptions || {});

            // break if data is not defined
            if (0 == options.dataJson.length) {
                return 'No data defined.';
            }

            if (0 == selector.length) {
                selector = options.selector;
            }

            // set mouse position
            $(document).mousemove( function(e) {
              mouseX = e.pageX;
              mouseY = e.pageY;
              // render bug: hide overlay if mouse leave div on top
              if (mouseY < $(".valuecompare .imgWrapper .img:eq(0)").offset().top) {
                $(".valuecompare .imgWrapper .img .overlayText").hide();
              };
            });

            // for each valuecompare widget
            jQuery(selector).each(function() {
                widget = this;

                // there is just one view and no buttons, load first view
                if (0 == jQuery(options.buttonSelector).length) {
                    valuecompareUpdateView(0);
                    return;
                }

                // for each button add functionality
                jQuery(options.buttonSelector, widget).each(function(index) {
                    jQuery(this).click(function(event) {
                        valuecompareUpdateView(index);
                        setSelection(this);
                        jQuery('.valuecompare .imgWrapper .img .overlayText').hide();
                    });

                    if (0 == index) {
                        jQuery(this).click();
                    }
                });

                // hover overlaytext
                jQuery('.valuecompare .imgWrapper .img').hover(
                  function() {
                    jQuery('.overlayText',this).stop(true,true).fadeToggle();
                  });

                // overlaytext follow mouse
                jQuery('.valuecompare .imgWrapper .img').mousemove(function(){
                  jQuery('.overlayText',this).css({
                    // mouse position x - image left offset - 31 pixel for bottom arrow left position
                    'left' : mouseX - jQuery(this).offset().left - 31,
                    // mouse position y - image top offset - 22 pixel for bottom arrow height
                    'top' : mouseY - jQuery(this).offset().top - jQuery('.overlayText',this).outerHeight() - 22
                  });
                });
            });
        }
    }

    return methods;
})(jQuery);;/**
 * jquery.als.js
 * http://als.musings.it 
 * jQuery plugin for list scrolling (any list with any content)
 * developed for http://www.musings.it and released as a freebie
 *  
 * animations: horizontal slide, vertical slide of lists
 * types of lists: images, texts, inserted as div or as ul - li
 * 
 * CONFIGURABLE PARAMETERS
 * visible_elements: number of visible elements of a list
 * scrolling_items: list scrolling step
 * orientation: list orientation ("horizontal" or "vertical")
 * circular: "yes" for infinite list scrolling, "no" on the contrary
 * autoscroll: "yes" for automatic scrolling, "no" on the contrary
 * interval: if autoscroll "yes" is the time interval between scrolling movements
 * speed: speed of the scrolling movement (in msec)
 * easing: easing function to use for the scrolling movement ("swing" or "linear")
 * direction: if autoscroll "yes" is the scrolling direction ("left","right","up","down")
 * start_from: start the scroller from a specific item (default: 0, first item)
 * 
 * CONFIGURATION EXAMPLE:
 * $("#lista").als({
 *					visible_items: 4,
 *					scrolling_items: 2,
 *					orientation: "horizontal",
 *  				circular: "yes",
 *					autoscroll: "yes",
 *					interval: 5000,
 * 					speed: 600,
 * 					easing: "linear", 
 *					direction: "right",
 * 					start_from: 0
 *				});
 * 
 * @author Federica Sibella
 * Copyright (c) 2012/14 Federica Sibella - musings(at)musings(dot)it | http://www.musings.it
 * Released with double license MIT o GPLv3.
 * Date: 2014/09/17
 * @version 1.7
 * 
 * Changelog:
 * 2014.09.17: minor bug fixes on configuration controls and timeout reset on click with autoscroll
 * 2014.06.17: minor bug fix on swipe control for non circular scrolling
 * 2014.05.21: minor bugs revisions: destroy method and touch controls revisited
 * 2014.03.24: added swipe support for touch devices
 * 2014.02.01: minor bug fixes for height and width of cross-dimension (w/ respect to ALS scrolling direction)
 * 2014.01.10: enhanced "destroy" method (no more instance ID needed); scroll speed as setting; easing option as setting
 * 2013.04.11: added "start_from" option
 * 2013.09.04: enhanced "destroy" method based on single instance
 * 2013.09.13: fixed issue on initial viewport width if items widths are different from each other and start_from != 0
 */

 
 (function($){
	/**********************************************************
	 * Variables: als (contains data of the current instance),
	 * instance (number of the current instance),
	 * methods (methods of als plugin)
	 *********************************************************/
	var als = [],
		instance = 0;
	var	methods = {
		/******************************************************
		 * plugin inizialization
		 * @param {Object} options: configuration options
		 ******************************************************/
		init: function(options) {
			this.each(function() {
				var defaults = {
					visible_items: 3,
					scrolling_items: 1,
					orientation: "horizontal",
					circular: "no",
					autoscroll: "no",
					interval: 4000,
					speed: 600,
					easing: "swing",
					direction: "left",
					start_from: 0
				},
				$obj = $(this),
				data = $obj.data("als"),
				$options = $(),
				$item = $(),
				$wrapper = $(),
				$viewport = $(),
				$prev = $(),
				$next = $(),
				num_items = 0,
				wrapper_width = 0,
				viewport_height = 0,
				wrapper_height = 0,
				initial_movement = 0,
				maxHeight = 0,
				maxWidth = 0,
				i = 0,
				j = 0,
				current = 0,
				timer = 0,
				mm = {};
				
				mm.swipeTreshold = 100,
				mm.allowedTime = 300;
				
				$options = $.extend(defaults, options);
				
				/*********************************************************************
				 * configuration controls: autoscroll option implies
				 * infinite circular scrolling
				 *********************************************************************/
				if($options.circular == "no" && $options.autoscroll == "yes")
				{
					$options.circular = "yes";
				}
				
				/*************************************
				 * checking easing option
				 *************************************/
				if($options.easing != "linear" || $options.easing != "swing")
				{
					$options.easing = "swing";
				}
				
				/***********************************************************************************
				 * define ID for the different plugin section to name them directly
				 **********************************************************************************/
				if(!$obj.attr("id") || $obj.attr("id") == "")
				{
					$obj.attr("id","als-container_" + instance);
				}
				
				$obj.attr("data-id","als-container_" + instance);
				$viewport = $obj.find(".als-viewport").attr("data-id","als-viewport_" + instance);
				$wrapper = $obj.find(".als-wrapper").attr("data-id","als-wrapper_" + instance);
				$item = $obj.find(".als-item");
				num_items = $item.size();
				
				/***************************************************************************************
				 * configuration controls: number of visible element can not be higher than 
				 * total number of list element and scrolling items can not be more
				 * than visible items
				 * start_from number can not be higher than total number of list elements
				 ***************************************************************************************/
				if($options.visible_items > num_items)
				{
					$options.visible_items = num_items - 1;
				}
				
				if($options.scrolling_items > $options.visible_items)
				{
					if($options.visible_items > 1)
					{
						$options.scrolling_items = $options.visible_items - 1;
					}
					else if($options.visible_items === 1)
					{
						$options.scrolling_items = $options.visible_items;
					} 
				}
				
				if($options.start_from > num_items - $options.visible_items)
				{
					$options.start_from = 0;
				}
				
				/******************************************************
				 * prev and next button inizialization (if present)
				 ******************************************************/
				$prev = $obj.find(".als-prev").attr("data-id","als-prev_" + instance);
				$next = $obj.find(".als-next").attr("data-id","als-next_" + instance);
				
				/*********************************************************************
				 * relative to chosen orientation I calculate width and height
				 * of the list wrapper (wrapper) and of the list viewport (viewport)
				 * @param {Object} index: internal elements index
				 *********************************************************************/
				switch($options.orientation)
				{
					case "horizontal":
					default:
						$item.each(function(index)
						{
							$(this).attr("id","als-item_" + instance + "_" + index);
							wrapper_width += $(this).outerWidth(true);
							
							if($(this).outerHeight(true) > maxHeight)
							{
								maxHeight = $(this).outerHeight(true);
							}
							
							if($options.start_from != 0)
							{
								if(j < $options.start_from)
								{
									initial_movement += $(this).outerWidth(true);
									j++;
								}
								current = $options.start_from;
							}
						});
						$wrapper.css("width", wrapper_width);
						$item.css("left", -initial_movement);
						$wrapper.css("height", maxHeight);
						$viewport.css("height", maxHeight);
						
						if($options.circular == "yes" && $options.start_from != 0)
						{
							/****************************************************
							 * must reset the hidden elements if start_from != 0
							 ****************************************************/
							for (r = 0; r < $options.start_from; r++)
							{
								var position = $item.last().position(),
									right_repos = position.left + $item.last().outerWidth(true);
								$item.eq(r).css("left", right_repos);
							}	
						}
					break;
					case "vertical":
						$item.each(function(index)
						{
							$(this).attr("id","als-item_" + instance + "_" + index);
							wrapper_height += $(this).outerHeight(true);
							
							if($(this).outerWidth(true) > maxWidth)
							{
								maxWidth = $(this).outerWidth(true);
							}
							
							if(i < $options.visible_items)
							{
								if($options.start_from == 0)
								{
									viewport_height += $(this).outerHeight(true);
									i++;
								}
								else
								{
									if(index >= $options.start_from)
									{
										viewport_height += $(this).outerHeight(true);
										i++;
									}
								}
							}
							
							if($options.start_from != 0)
							{
								if(j < $options.start_from)
								{
									initial_movement += $(this).outerHeight(true);
									j++;
								}
								current = $options.start_from;
							}
						});
						$wrapper.css("height", wrapper_height);
						$item.css("top", -initial_movement);
						$viewport.css("height", viewport_height);
						$wrapper.css("width", maxWidth);
						$viewport.css("width", maxWidth);
						
						if($options.circular == "yes" && $options.start_from != 0)
						{
							/****************************************************
							 * must reset the hidden elements if start_from != 0
							 ****************************************************/
							for (r = 0; r < $options.start_from; r++)
							{
								var position = $item.last().position(),
									bottom_repos = position.top + $item.last().outerHeight(true);
								$item.eq(r).css("top", bottom_repos);
							}	
						}
					break
				}
				/**************************************************
				 * if circular == no don't show prev button
				 * at the beginning but only if start_from == 0
				 **************************************************/
				if($options.circular == "no")
				{
					if($options.start_from == 0)
					{
						$prev.css("display","none");
					}
					if($options.visible_items + $options.start_from == num_items)
					{
						$next.css("display","none");
					}
				}
				
				
				/******************************************
				 * prev and next buttons inizialization
				 ******************************************/
				$next.on("click touchstart touchend",nextHandle);
				$prev.on("click touchstart touchend",prevHandle);
				
				
				/*****************************************
				 * initializing swipe-touch control
				 *****************************************/
				$viewport.on('touchstart', function(e) {
					if (e.originalEvent.touches == undefined) {
						var touch = e;
					} 
					else {
						var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
					}
					mm.ox = touch.pageX;
					mm.oy = touch.pageY;
					mm.startTime = new Date().getTime();
				});
				
				$viewport.on('touchmove', function(e) {
				});	
				
				$viewport.on('touchend', function(e) {
					if (e.originalEvent.touches == undefined) {
						var touch = e;
					} 
					else {
						var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
					}
					mm.dx = touch.pageX - mm.ox;
					mm.dy = touch.pageY - mm.oy;
					mm.endTime = new Date().getTime() - mm.startTime;
					
					if($options.orientation == "horizontal") {
						if(mm.dx < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
							// can scroll forth on swipe only if circular or if start_from < num_items
							if($options.circular == "yes" || $options.visible_items + $options.start_from < num_items) {
								nextHandle(e,$viewport);
							}	
						}
						else if(mm.dx > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
							// can scroll back on swipe only if circular or if start_from > 0
							if($options.circular == "yes" || $options.start_from > 0) {
								prevHandle(e,$viewport);
							}
						}
					}
					else {
						if(mm.dy < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
							// can scroll forth on swipe only if circular or if start_from < num_items
							if($options.circular == "yes" || $options.visible_items + $options.start_from < num_items) {
								nextHandle(e,$viewport);
							}
						}
						else if(mm.dy > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
							// can scroll back on swipe only if circular or if start_from > 0
							if($options.circular == "yes" || $options.start_from > 0) {
								prevHandle(e,$viewport);
							}
						}
					}
				});
				
				
				/**************************************************
				 * saving instance parameters in a variable (data)
				 * for future use
				 **************************************************/
				$obj.data('als',
				{
					container : $obj,
					instance : instance,
					options : $options,
					viewport : $viewport,
					wrapper : $wrapper,
					prev : $prev,
					next : $next,
					item : $item,
					num_items : num_items,
					wrapper_width : wrapper_width,
					wrapper_height : wrapper_height,
					viewport_height : viewport_height,
					current : current,
					timer : timer,
					mm : mm
				});
				
				data = $obj.data('als');
				als[instance] = data;
				
				/*********************************************
				 * automatic scrolling function inizialization
				 * if it is the case
				 *********************************************/
				if($options.autoscroll == "yes") 
				{
					$.fn.als('start',instance);
					$wrapper.hover(function()
					{
						$.fn.als('stop',$(this).attr("data-id"));
					},function()
					{
						$.fn.als('start',$(this).attr("data-id"));
					});
				}
				else if($options.autoscroll == "no") 
				{
					$.fn.als('stop',instance);
				}
				
				/*******************************************
				 * increasing instance number and
				 * returning als variable now inizialized
				 ******************************************/
				instance++;
				return als;
			});
		},

        goto: function (id, targetIndex) {
            id = find_instance(id);
            var data = als[id]
            data.next.off();
            data.prev.off();
            data.viewport.off("touchend");
            $.fn.als('next',id, targetIndex);
        },

		/*****************************************************
		 * step function for lists elements
		 * @param {Object} id: instance or ID of the element
		 * that calls the function
		 *****************************************************/
		next: function(id, targetIndex){
			id = find_instance(id);
			var data = als[id],
				mm = data.mm,
				k1 = 0, k2 = 0;
			/***************************************************
			 * depending on list orientation I calculate
			 * the element horizontal or vertical movement
			 ***************************************************/
			switch(data.options.orientation)
			{
				/*****************************************
				 * list orientation: horizontal
				 ****************************************/
				case "horizontal":
				default:
					var shift_left = 0;
					/************************************************
					 * depending on scrolling type I calculate
					 * the movement and the repositioning of the
					 * list elements
					 ************************************************/
					switch(data.options.circular)
					{
						/****************************
						 * infinite scrolling: no
						 ****************************/
						case "no":
                        default:

                            var scroll_item_number = data.options.scrolling_items;

                            // getting the number of item to scroll, by using "goto"-function
                            if (typeof targetIndex !== 'undefined') {

                                if (data.item.length - targetIndex > data.options.visible_items ) {
                                    scroll_item_number = targetIndex - data.current;
                                } else {
                                    scroll_item_number = data.item.length - data.options.visible_items - data.current;
                                }
                            } else if (data.item.length - data.options.visible_items <= data.current) // if last item is visible and user select "next"-button
                            {
                                $.fn.als('prev', id, 0);
                                return;
                            }

							/********************************************************************
							 * I calculate the elements' movement on the basis of the scrolling
							 * items number starting from the current index
							 ********************************************************************/
							for (k1 = data.current; k1 < data.current + scroll_item_number; k1++)
							{
								shift_left += data.item.eq(k1).outerWidth(true);
							}
							
							/****************************************************************
							 * I modify the current element on the basis of the scrolling
							 * elements number
							 ****************************************************************/
							data.current += scroll_item_number;
							
							/**********************************************
							 * I animate the scrolling elements
							 *********************************************/
							data.item.animate({
								"left": "-=" + Math.round(shift_left)
							}, data.options.speed, data.options.easing);
							/***********************************************************
							 * after the animation of all elements has finished
							 * (deferred object)
							 ***********************************************************/
							data.item.promise().done(function()
							{	/****************************************************
								 * I bind again the "click" action to the prev
								 * and next buttons (unbinded to prevent undesirable
								 * behaviour during the scrolling animation)
								 ***************************************************/
								data.next.on("click touchstart touchend",nextHandle);
								data.prev.on("click touchstart touchend",prevHandle);
								data.viewport.on('touchend', function(e) {
									if (e.originalEvent.touches == undefined) {
										var touch = e;
									} 
									else {
										var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
									}
									mm.dx = touch.pageX - mm.ox;
									mm.dy = touch.pageY - mm.oy;
									mm.endTime = new Date().getTime() - mm.startTime;
									
									if(data.options.orientation == "horizontal") {
										if(mm.dx < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll on swipe only of there are enough elements
											if (data.current + data.options.visible_items < data.num_items) {
												nextHandle(e,data.viewport);
											}
										}
										else if(mm.dx > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll back on swipe only if there are enough elements
											if(data.current > 0) {
												prevHandle(e,data.viewport);
											}
										}
									}
									else {
										if(mm.dy < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll on swipe only of there are enough elements
											if (data.current + data.options.visible_items < data.num_items) {
												nextHandle(e,data.viewport);
											}
										}
										else if(mm.dy > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll back on swipe only if there are enough elements
											if(data.current > 0) {
												prevHandle(e,data.viewport);
											}
										}
									}
								});
							});
							/**********************************************************
							 * visibility control of the prev and next buttons
							 **********************************************************/
							if(data.current > 0)
							{
								data.prev.show();
							}
							
							if (data.current + data.options.visible_items >= data.num_items) 
							{
								//data.next.hide();
							}
						break;
						/****************************
						 * infinite scrolling: yes
						 ***************************/
						case "yes":
							var memo = 0, memo_index = [];
                            var scroll_item_number = data.options.scrolling_items;

                            // getting the number of item to scroll, by using "goto"-function
                            if (typeof targetIndex !== 'undefined') {
                                scroll_item_number = (data.item.length + targetIndex - data.current) % data.item.length;
                            }
							/**************************************************************************
							 * I calculate displacement and memorize indices of the elements that 
							 * I have to move because they will be then repositioned in the queue
							 **************************************************************************/
							for (k1 = data.current; k1 < data.current + scroll_item_number; k1++)
							{
								var k3 = k1;
								/******************************************************
								 * I control if I exceed the total number of elements
								 ******************************************************/
								if(k1 >= data.num_items)
								{
									k3 = k1 - data.num_items;
								}
								shift_left += data.item.eq(k3).outerWidth(true);
								memo_index[memo]= k3;
								memo ++;
							}
							/****************************************************************
							 * edit current element as a function of the number of elements 
							 * to slide in a single step
							 ****************************************************************/
							data.current += scroll_item_number;
							
							/******************************************************
							 * I control if I exceed the total number of elements
							 ******************************************************/
							if(data.current >= data.num_items)
							{
								data.current -= data.num_items;
							}
							/***********************************************************************
							 * calculating the extent of the viewport based on the items that 
							 * will be visible after scrolling
							 ***********************************************************************/
							for (k2 = data.current; k2 < data.current + data.options.visible_items; k2++) 
							{
								var k4 = k2;
								/*****************************************************
								 * I control if I exceed the total number of elements
								 *****************************************************/
								if(k2 >= data.num_items)
								{
									k4 = k2 - data.num_items;
								}
							}
							

							/******************************************************************
							 * scrolling animation of elements and repositioning of elements 
							 * stored in the queue
							 *****************************************************************/
							data.item.animate({
								"left": "-=" + Math.round(shift_left)
							}, data.options.speed, data.options.easing);
							/***********************************************************
							 * once the animation of all the elements has finished
							 * (deferred object)
							 ***********************************************************/
							data.item.promise().done(function()
							{
								/****************************************************************************
								 * repositioning is calculated based on the location of the last element of 
								 * the list, double check if I have to move the first element
								 ****************************************************************************/
								var position = data.item.last().position(),
									right_repos = position.left + data.item.last().outerWidth(true);
								for(k5 = 0; k5 < memo_index.length; k5++)
								{
									if(memo_index[k5] == 0)
									{
										var position = data.item.last().position(),
										right_repos = position.left + data.item.last().outerWidth(true);
									}
									data.item.eq(memo_index[k5]).css("left", Math.round(right_repos));
								}
								/*********************************************
								 * re bind buttons "click" event that have 
								 * been detached from the handle to handle 
								 * properly the time of animation
								 ********************************************/
								data.next.on("click touchstart touchend",nextHandle);
								data.prev.on("click touchstart touchend",prevHandle);
								data.viewport.on('touchend', function(e) {
									if (e.originalEvent.touches == undefined) {
										var touch = e;
									} 
									else {
										var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
									}
									mm.dx = touch.pageX - mm.ox;
									mm.dy = touch.pageY - mm.oy;
									mm.endTime = new Date().getTime() - mm.startTime;
									
									if(data.options.orientation == "horizontal") {
										if(mm.dx < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											nextHandle(e,data.viewport);
										}
										else if(mm.dx > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											prevHandle(e,data.viewport);
										}
									}
									else {
										if(mm.dy < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											nextHandle(e,data.viewport);
										}
										else if(mm.dy > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											prevHandle(e,data.viewport);
										}
									}
								});
							});
						break;
					}
				break;
				
				/**************************************
				 * list orientation: vertical
				 **************************************/
				case "vertical":
					var shift_top = 0,
						viewport_height = 0;
					/************************************************
					 * depending on the type of sliding I calcule 
					 * the displacement and the repositioning of the 
					 * elements of the list
					 ************************************************/	
					switch(data.options.circular)
					{
						/****************************
						 * infinite scrolling: no
						 ***************************/
						case "no":
						default:
							/********************************************************************
							 * displacement calculation based on the number of elements to 
							 * slide in a single step
							 ********************************************************************/
							for (k1 = data.current; k1 < data.current+data.options.scrolling_items; k1++)
							{
								shift_top += data.item.eq(k1).outerHeight(true);
							}
							
							/****************************************************************
							 * I edit element current as a function of the number of elements 
							 * to slide in a single step
							 ****************************************************************/
							data.current += data.options.scrolling_items;
							
							/***********************************************************************
							 * calculating the width of the viewport on the basis of the visible 
							 * elements AFTER the sliding animation
							 ***********************************************************************/
							for (k2 = data.current; k2 < data.current + data.options.visible_items; k2++) {
								viewport_height += data.item.eq(k2).outerHeight(true);
							}
							
							/***************************************************
							 * I animate the viewport width
							 ***************************************************/
							data.viewport.animate({
								"height": viewport_height
							}, data.options.speed, data.options.easing);
							/****************************************
							 * I animate the elements scrolling
							 ****************************************/
							data.item.animate({
								"top": "-=" + shift_top
							}, data.options.speed, data.options.easing);
							/**********************************************************
							 * once the animation of all the elements has finished
							 * (deferred object)
							 **********************************************************/
							data.item.promise().done(function()
							{	/*********************************************
								 * re bind buttons "click" event that has 
								 * been detached from the handle to handle 
								 * properly the time of animation
								 ********************************************/
								data.next.on("click touchstart touchend",nextHandle);
								data.prev.on("click touchstart touchend",prevHandle);
								data.viewport.on('touchend', function(e) {
									if (e.originalEvent.touches == undefined) {
										var touch = e;
									} 
									else {
										var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
									}
									mm.dx = touch.pageX - mm.ox;
									mm.dy = touch.pageY - mm.oy;
									mm.endTime = new Date().getTime() - mm.startTime;
									
									if(data.options.orientation == "horizontal") {
										if(mm.dx < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll on swipe only of there are enough elements
											if (data.current + data.options.visible_items < data.num_items) {
												nextHandle(e,data.viewport);
											}
										}
										else if(mm.dx > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll back on swipe only if there are enough elements
											if(data.current > 0) {
												prevHandle(e,data.viewport);
											}
										}
									}
									else {
										if(mm.dy < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll on swipe only of there are enough elements
											if (data.current + data.options.visible_items < data.num_items) {
												nextHandle(e,data.viewport);
											}
										}
										else if(mm.dy > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll back on swipe only if there are enough elements
											if(data.current > 0) {
												prevHandle(e,data.viewport);
											}
										}
									}
								});
							});
							
							/****************************************************
							 * control visibility of the scroll buttons on 
							 * the basis of the current element
							 ****************************************************/
							if(data.current > 0)
							{
								data.prev.show();
							}
							
							if (data.current + data.options.visible_items >= data.num_items) 
							{
								data.next.hide();
							}
						break;
						/****************************
						 * infinite scrolling: yes
						 ****************************/
						case "yes":
							var memo = 0, memo_index = [];
							/****************************************************************
							 * displacement calculation based on the number of elements to 
							 * slide in a single step and memorization of items to reposition
							 ****************************************************************/
							for (k1 = data.current; k1 < data.current + data.options.scrolling_items; k1++)
							{
								var k3 = k1;
								/**********************************************
								 * control that the index does not exceed the 
								 * total number of the elements
								 *********************************************/
								if(k1 >= data.num_items)
								{
									k3 = k1 - data.num_items;
								}
								shift_top += data.item.eq(k3).outerHeight(true);
								memo_index[memo]= k3;
								memo ++;
							}
							/****************************************************************
							 * edit current element on the basis of the number of elements 
							 * to slide in a single step
							 ****************************************************************/
							data.current += data.options.scrolling_items;
							
							/*************************************************
							 * control that the index does not exceed the 
							 * total number of the elements
							 ************************************************/
							if(data.current >= data.num_items)
							{
								data.current -= data.num_items;
							}
							
							/******************************************************************************
							 * calculating the width of viewport on the basis of the visible elements 
							 * AFTER the scrolling
							 ******************************************************************************/
							for (k2 = data.current; k2 < data.current + data.options.visible_items; k2++) 
							{
								var k4 = k2;
								/**********************************************
								 * control that the index does not exceed the 
							 	 * total number of the elements
								 *********************************************/
								if(k2 >= data.num_items)
								{
									k4 = k2 - data.num_items;
								}
								viewport_height += data.item.eq(k4).outerHeight(true);
							}
							/*************************************************
							 * I animate the viewport width
							 *************************************************/
							data.viewport.animate({
								"height": viewport_height
							});
							
							/****************************************************************
							 * I animate the elements and reposition those previously stored
							 ***************************************************************/
							data.item.animate({
								"top": "-=" + shift_top
							});
							/************************************************************
							 * once all the elements' animations has finished
							 * (deferred object)
							 ***********************************************************/
							data.item.promise().done(function()
							{
								/************************************************************************
								 * repositioning is calculated based on the location of the last element 
								 * of the list. Take care to the repositioning of the first element 
								 * that needs to be recalculated AFTER the last was eventually relocated
								 ************************************************************************/
								var position = data.item.last().position(),
									bottom_repos = position.top + data.item.last().outerHeight(true);
								for(k5 = 0; k5 < memo_index.length; k5++)
								{
									if(memo_index[k5] == 0)
									{
										var position = data.item.last().position(),
										bottom_repos = position.top + data.item.last().outerHeight(true);
									}
									data.item.eq(memo_index[k5]).css("top", bottom_repos);
								}
								/*********************************************
								 * re bind buttons "click" event that has 
								 * been detached from the handle to handle 
								 * properly the time of animation
								 ********************************************/
								data.next.on("click touchstart touchend",nextHandle);
								data.prev.on("click touchstart touchend",prevHandle);
								data.viewport.on('touchend', function(e) {
									if (e.originalEvent.touches == undefined) {
										var touch = e;
									} 
									else {
										var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
									}
									mm.dx = touch.pageX - mm.ox;
									mm.dy = touch.pageY - mm.oy;
									mm.endTime = new Date().getTime() - mm.startTime;
									
									if(data.options.orientation == "horizontal") {
										if(mm.dx < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											nextHandle(e,data.viewport);
										}
										else if(mm.dx > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											prevHandle(e,data.viewport);
										}
									}
									else {
										if(mm.dy < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											nextHandle(e,data.viewport);
										}
										else if(mm.dy > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											prevHandle(e,data.viewport);
										}
									}
								});
							});
						break;
					}
				break;
			}
			
			/************************************
			 * save the data in als instance and
			 * return als object
			 ***********************************/
			als[id] = data;
			return als;
		},
		/*****************************************************
		 * sliding back function of the list elements
		 * @param {Object} id: instance or ID of the element
		 * that calls the function
		 *****************************************************/
		prev: function(id, targetIndex){
			id = find_instance(id);
			var data = als[id],
				mm = data.mm,
				k1 = 0, k2 = 0;
			/***************************************************
			 * depending on the orientation of the list I 
			 * calculate the horizontal or vertical displacement
			 * of the elements
			 ***************************************************/
			switch(data.options.orientation)
			{
				/***************************
				 * horizontal orientation 
				 ***************************/
				case "horizontal":
				default:
					var shift_right = 0;
					/****************************************************	
					 * depending on the type of scroll (circular or not) 
					 * I calculate the displacement and the possible 
					 * repositioning of the elements of the list
					 ****************************************************/
					switch(data.options.circular)
					{
						/*****************************
						 * circular scrolling: no
						 *****************************/
						case "no":
						default:
                            var scroll_item_number = data.options.scrolling_items;
                            // getting the number of item to scroll, by using "goto"-function
                            if (typeof targetIndex !== 'undefined') {

                                if (data.item.length - targetIndex > data.options.visible_items ) {
                                    scroll_item_number = data.current - targetIndex;
                                } else {
                                    scroll_item_number = data.current - data.item.length - data.options.visible_items;
                                }
                            }
							/***************************************************************
							 * edit the current item index as a function of the elements to 
							 * slide in a single step: edit right away so that you can do 
							 * the next steps "forward"
							 ***************************************************************/
							data.current -= scroll_item_number;
							
							/*******************************************************************
							 * calculating the displacement of the elements according to the 
							 * number of elements to slide in a single step
							 *******************************************************************/
							for (k1 = data.current; k1 < data.current+scroll_item_number; k1++)
							{
								shift_right += data.item.eq(k1).outerWidth(true);
							}
							
							/**********************************
							 * animating elements scrolling
							 **********************************/
							data.item.animate({
								"left": "+=" + shift_right
							}, data.options.speed, data.options.easing);
							/***********************************************************
							 * once all animations have finished
							 * (deferred object)
							 ***********************************************************/
							data.item.promise().done(function()
							{	/*********************************************
								 * re bind buttons "click" event that have 
								 * been detached from the handle to manage 
								 * properly the time of animation
								 ********************************************/
								data.next.on("click touchstart touchend",nextHandle);
								data.prev.on("click touchstart touchend",prevHandle);
								data.viewport.on('touchend', function(e) {
									if (e.originalEvent.touches == undefined) {
										var touch = e;
									} 
									else {
										var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
									}
									mm.dx = touch.pageX - mm.ox;
									mm.dy = touch.pageY - mm.oy;
									mm.endTime = new Date().getTime() - mm.startTime;
									
									if(data.options.orientation == "horizontal") {
										if(mm.dx < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll on swipe only of there are enough elements
											if (data.current + data.options.visible_items < data.num_items) {
												nextHandle(e,data.viewport);
											}
										}
										else if(mm.dx > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll back on swipe only if there are enough elements
											if(data.current > 0) {
												prevHandle(e,data.viewport);
											}
										}
									}
									else {
										if(mm.dy < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll on swipe only of there are enough elements
											if (data.current + data.options.visible_items < data.num_items) {
												nextHandle(e,data.viewport);
											}
										}
										else if(mm.dy > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll back on swipe only if there are enough elements
											if(data.current > 0) {
												prevHandle(e,data.viewport);
											}
										}
									}
								});
							});
							
							/**********************************************************
							 * control visibility of the scroll buttons
							 **********************************************************/
							if(data.current <= 0)
							{
								data.prev.hide();
							}
							if (data.current + data.options.visible_items < data.num_items) 
							{
								data.next.show();
							}
						break;
						/*****************************
						 * circular scrolling: yes
						 *****************************/
						case "yes":
							var memo = 0, memo_index = [];
							/***************************************************************
							 * edit the current item index as a function of the elements 
							 * to slide in a single step: edit right away so that we can do 
							 * the next steps "forward"
							 ***************************************************************/
							data.current -= data.options.scrolling_items;
							/**************************************************
							 * check if the current element has not index < 0
							 **************************************************/
							if(data.current < 0)
							{
								data.current += data.num_items;
							}
							/****************************************************************
							 * displacement calculation based on the elements to slide in a 
							 * single step and memorization of the items to reposition
							 ****************************************************************/
							for (k1 = data.current; k1 < data.current + data.options.scrolling_items; k1++)
							{
								var k3 = k1;
								/**********************************************
								 * control that the index does not exceed the 
								 * total number of the elements
								 *********************************************/
								if(k1 >= data.num_items)
								{
									k3 = k1 - data.num_items;
								}
								shift_right += data.item.eq(k3).outerWidth(true);
								memo_index[memo]= k3;
								
								memo ++;
							}
							/******************************************************************************
							 * calculating the width of the viewport on the basis of the 
							 * visible elements AFTER the scrolling
							 ******************************************************************************/
							for (k2 = data.current; k2 < data.current + data.options.visible_items; k2++) 
							{
								var k4 = k2;
								/**********************************************
								 * control that the index does not exceed the 
								 * total number of the elements
								 *********************************************/
								if(k2 >= data.num_items)
								{
									k4 = k2 - data.num_items;
								}
							}
							/************************************************************************
							 * repositioning is calculated based on the location of the first element 
							 * of the list. Special care to the repositioning of the last element 
							 * that needs to be recalculated AFTER the first was eventually relocated
							 ************************************************************************/
							var position = data.item.first().position(),
								left_repos = position.left - data.wrapper_width;

							for(k5 = 0; k5 < memo_index.length; k5++)
							{
								data.item.eq(memo_index[k5]).css("left", left_repos);
								if(memo_index[k5] == 0)
								{
									var position0 = data.item.eq(0).position(),
										new_left_repos = position0.left - data.wrapper_width;
									for(k6 = 0; k6 < k5; k6++)
									{
										data.item.eq(memo_index[k6]).css("left", new_left_repos);
									}	
								}
							}
							/************************************************************
							 * timeout of 200ms is necessary to wait before making the 
							 * scrolling animation, otherwise we can not properly manage 
							 * the repositioning of the list elements
							 ************************************************************/
							setTimeout(function() 
							{
								/*******************************
								 * list elements animation
								 *******************************/
								data.item.animate({
									"left": "+=" + shift_right
								}, data.options.speed, data.options.easing);
								/**********************************************************
								 * once all elements animations have finished
								 * (deferred object)
								 **********************************************************/
								data.item.promise().done(function()
								{	/*********************************************
									 * re bind buttons "click" event that have 
									 * been detached from the handle to manage 
									 * properly the time of animation
									 ********************************************/
									data.next.on("click touchstart touchend",nextHandle);
									data.prev.on("click touchstart touchend",prevHandle);
									data.viewport.on('touchend', function(e) {
										if (e.originalEvent.touches == undefined) {
											var touch = e;
										} 
										else {
											var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
										}
										mm.dx = touch.pageX - mm.ox;
										mm.dy = touch.pageY - mm.oy;
										mm.endTime = new Date().getTime() - mm.startTime;
										
										if(data.options.orientation == "horizontal") {
											if(mm.dx < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
												nextHandle(e,data.viewport);
											}
											else if(mm.dx > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
												prevHandle(e,data.viewport);
											}
										}
										else {
											if(mm.dy < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
												nextHandle(e,data.viewport);
											}
											else if(mm.dy > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
												prevHandle(e,data.viewport);
											}
										}
									});
								});
							}, 200);
						break;
					}	
				break;
				/*************************
				 * vertical orientation
				 ************************/
				case "vertical":
					var shift_bottom = 0,
						viewport_height = 0;
					
					switch(data.options.circular)
					{
						/*****************************
						 * circular scrolling: no
						 ****************************/
						case "no":
						default:
							/***************************************************************
							 * edit the current item index as a function of the elements to 
							 * slide in a single step: edit right away so that we can do 
							 * the next steps "forward"
							 ***************************************************************/
							data.current -= data.options.scrolling_items;
							/****************************************************************
							 * displacement calculation based on the elements to slide 
							 * in a single step
							 ****************************************************************/
							for (k1 = data.current; k1 < data.current+data.options.scrolling_items; k1++)
							{
								shift_bottom += data.item.eq(k1).outerHeight(true);
							}
							/******************************************************************************
							 * calculating the width of the viewport on the basis of the visible elements 
							 * AFTER the scrolling
							 ******************************************************************************/
							for (k2 = data.current; k2 < data.current + data.options.visible_items; k2++) 
							{
								viewport_height += data.item.eq(k2).outerHeight(true);
							}
							/***********************************************
							 * viewport width animation
							 **********************************************/
							data.viewport.animate({
								"height": viewport_height
							});
							/*****************************************
							 * list elements scrolling animation
							 *****************************************/
							data.item.animate({
								"top": "+=" + shift_bottom
							}, data.options.speed, data.options.easing);
							/**********************************************************
							 * once all elemets animations have finished
							 * (deferred object)
							 **********************************************************/
							data.item.promise().done(function()
							{
								/*********************************************
								 * re bind buttons "click" event that have 
								 * been detached from the handle to manage 
								 * properly the time of animation
								 ********************************************/
								data.next.on("click touchstart touchend",nextHandle);
								data.prev.on("click touchstart touchend",prevHandle);
								data.viewport.on('touchend', function(e) {
									if (e.originalEvent.touches == undefined) {
										var touch = e;
									} 
									else {
										var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
									}
									mm.dx = touch.pageX - mm.ox;
									mm.dy = touch.pageY - mm.oy;
									mm.endTime = new Date().getTime() - mm.startTime;
									
									if(data.options.orientation == "horizontal") {
										if(mm.dx < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll on swipe only of there are enough elements
											if (data.current + data.options.visible_items < data.num_items) {
												nextHandle(e,data.viewport);
											}
										}
										else if(mm.dx > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll back on swipe only if there are enough elements
											if(data.current > 0) {
												prevHandle(e,data.viewport);
											}
										}
									}
									else {
										if(mm.dy < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll on swipe only of there are enough elements
											if (data.current + data.options.visible_items < data.num_items) {
												nextHandle(e,data.viewport);
											}
										}
										else if(mm.dy > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
											// scroll back on swipe only if there are enough elements
											if(data.current > 0) {
												prevHandle(e,data.viewport);
											}
										}
									}
								});
							});
							/***********************************************************
							 * management of visibility of forward and backward buttons
							 **********************************************************/
							if(data.current <= 0)
							{
								data.prev.hide();
							}
							if (data.current + data.options.visible_items < data.num_items) 
							{
								data.next.show();
							}
						break;
						case "yes":
						/*****************************
						 * circular scrolling: yes
						 *****************************/
							var memo = 0, memo_index = [];
							/***************************************************************
							 * edit the current item index as a function of the elements to 
							 * slide in a single step: edit right away so that we can do 
							 * the next steps "forward"
							 ***************************************************************/
							data.current -= data.options.scrolling_items;
							/*********************************************************
							 * control that the current element has not index < 0
							 *********************************************************/
							if(data.current < 0)
							{
								data.current += data.num_items;
							}
							/********************************************************************
							 * displacement calculation based on the elements to slide in a 
							 * single step and memorization of those that have to be repositioned
							 * later
							 ********************************************************************/
							for (k1 = data.current; k1 < data.current + data.options.scrolling_items; k1++)
							{
								var k3 = k1;
								/***********************************************
								 * control that the index does not exceed the 
								 * total number of the elements
								 ***********************************************/
								if(k1 >= data.num_items)
								{
									k3 = k1 - data.num_items;
								}
								shift_bottom += data.item.eq(k3).outerHeight(true);
								memo_index[memo]= k3;
								
								memo ++;
							}
							/******************************************************************************
							 * calculating the width of the viewport on the basis of the visible elements 
							 * AFTER the scrolling
							 ******************************************************************************/
							for (k2 = data.current; k2 < data.current + data.options.visible_items; k2++) 
							{
								var k4 = k2;
								/***********************************************
								 * control that the index does not exceed the 
								 * total number of the elements
								 ***********************************************/
								if(k2 >= data.num_items)
								{
									k4 = k2 - data.num_items;
								}
								viewport_height += data.item.eq(k4).outerHeight(true);
							}
							/************************************************************************
							 * repositioning is calculated based on the location of the first element 
							 * of the list. Special care to the repositioning of the last element 
							 * that needs to be recalculated AFTER the first was eventually relocated
							 ************************************************************************/
							var position = data.item.first().position(),
								top_repos = position.top - data.wrapper_height;
								
							for(k5 = 0; k5 < memo_index.length; k5++)
							{
								data.item.eq(memo_index[k5]).css("top", top_repos);
								if(memo_index[k5] == 0)
								{
									var position0 = data.item.eq(0).position(),
										new_top_repos = position0.top - data.wrapper_height;
									for(k6 = 0; k6 < k5; k6++)
									{
										data.item.eq(memo_index[k6]).css("top", new_top_repos);
									}	
								}
							}	
							/************************************************************
							 * timeout of 200ms is necessary to wait before making the 
							 * scrolling animation, otherwise we can not properly manage 
							 * the repositioning of the list elements
							 ************************************************************/
							setTimeout(function()
							{
								/*********************************************
								 * viewport width animation
								 *********************************************/
								data.viewport.animate({
									"height": viewport_height
								}, data.options.speed, data.options.easing);
								/************************************
								 * list elements scrolling animation
								 ***********************************/
								data.item.animate({
									"top": "+=" + shift_bottom
								}, data.options.speed, data.options.easing);
								/***********************************************************
								 * once all elements animations have finished
								 * (deferred object)
								 **********************************************************/
								data.item.promise().done(function()
								{
									/*********************************************
									 * re bind buttons "click" event that have 
									 * been detached from the handle to manage 
									 * properly the time of animation
									 ********************************************/
									data.next.on("click touchstart touchend",nextHandle);
									data.prev.on("click touchstart touchend",prevHandle);
									data.viewport.on('touchend', function(e) {
										if (e.originalEvent.touches == undefined) {
											var touch = e;
										} 
										else {
											var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
										}
										mm.dx = touch.pageX - mm.ox;
										mm.dy = touch.pageY - mm.oy;
										mm.endTime = new Date().getTime() - mm.startTime;
										
										if(data.options.orientation == "horizontal") {
											if(mm.dx < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
												nextHandle(e,data.viewport);
											}
											else if(mm.dx > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
												prevHandle(e,data.viewport);
											}
										}
										else {
											if(mm.dy < -mm.swipeTreshold && mm.endTime < mm.allowedTime) {
												nextHandle(e,data.viewport);
											}
											else if(mm.dy > mm.swipeTreshold && mm.endTime < mm.allowedTime) {
												prevHandle(e,data.viewport);
											}
										}
									});
								});
							}, 200);
						break;
					}
				break;
			}
			/************************************
			 * saving als instance data and
			 * returning als object
			 ***********************************/
			als[id] = data;
			return als;
		},
		/**************************************************************
		 * start function for automatic scrolling
		 * @param {Object} id: instance or ID of the element that has
		 * called the function
		 **************************************************************/ 
		start: function(id)
		{
			id = find_instance(id);
			var data = als[id];
			/**********************************************************
			 * stopping any previous automatic scrolling
			 *********************************************************/
			if(data.timer != 0)
			{
				clearInterval(data.timer);
			}
			/************************************
			 * depending on the direction you 
			 * choose automatic scrolling begins
			 ***********************************/
			switch(data.options.direction)
			{
				/************************************************
				 * if left or up (that means "forward")
				 ************************************************/
				case "left":
				case "up":
				default:
					/************************************
					 * detachment from the handler buttons 
					 * and the animation forward start 
					 * (next function)
					 ************************************/
					data.timer = setInterval(function(){
						data.next.off();
						data.prev.off();
						data.viewport.off("touchend");
						$.fn.als('next',id);
						},data.options.interval);
				break;
				/***************************************************
				 * if right or down (that means "backward")
				 ***************************************************/
				case "right":
				case "down":
					/************************************
					 * detachment from the handler buttons 
					 * and the animation forward start 
					 * (prev function)
					 ************************************/
					data.timer = setInterval(function(){
						data.prev.off();
						data.next.off();
						data.viewport.off("touchend");
						$.fn.als('prev',id);
						},data.options.interval);
				break;
			}
			/************************************
			 * saving als instance data and
			 * returning als object
			 ***********************************/
			als[id] = data;
			return als;
		},
		/**************************************************************
		 * stop function for automatic scrolling
		 * @param {Object} id: instance or ID of the element that
		 * called the function
		 **************************************************************/ 
		stop: function(id)
		{
			id = find_instance(id);  
			var data = als[id];
			/********************************
			 * stop autoscrolling
			 *******************************/
			clearInterval(data.timer);
			/************************************
			 * saving data into als instance
			 * and returning als object
			 ***********************************/
			als[id] = data;
			return als;
		},
		/**************************************
		 * function that destroys als instance
		 **************************************/
		destroy: function()
		{
			id = find_instance($(this).attr("data-id"));  
			var data = als[id];
			data.prev.off();
			data.next.off();
			data.viewport.off();
			$.fn.als("stop",id);
         	$.removeData(data, "als");
		    this.unbind();
		    this.element = null;
        }    
	}
	
	/**************************
	 **************************
	 * service functions
	 ************************** 
	 **************************/
	
	/********************************************************************
	 * function to find the current plugin instance
	 * @param {Object} id: plugin instance od ID of the element that
	 * called the plugin
	 ********************************************************************/
	function find_instance(id)
	{
		if(typeof(id) === "string")
		{
			var position = id.indexOf("_");	
			if(position != -1)
			{
				id = id.substr(position+1);  
			}
		}
		return id
	}
	
	/****************************************************
	 * function that manages "click" action on next button
	 * @param e event, $obj object
	 ***************************************************/
	function nextHandle(e,$obj)
	{
		e.preventDefault();
		if($obj === undefined)
			$obj = $(this);
		var id = find_instance($obj.attr("data-id")),
			data = als[id];
		/*********************************************
		 * unbinding next and prev buttons so that
		 * they don't interfere with current animation
		 ********************************************/
		data.next.off();
		data.prev.off();
		data.viewport.off("touchend");
		if(data.options.autoscroll === "yes")
		{
			$.fn.als("stop",id);
		}
        if (data.options.onArrowClick) {
            data.options.onArrowClick.call();
        }
		/********************************************
		 * calling next function on this instance
		 ********************************************/
		$.fn.als("next",id);
		if(data.options.autoscroll === "yes")
		{
			$.fn.als("start",id);
		}
	}
	
	/******************************************************
	 * function that manages "click" action on prev button
	 * @param e event, $obj object
	 ******************************************************/
	function prevHandle(e,$obj)
	{
        e.preventDefault();
		if($obj === undefined)
			$obj = $(this);
		var id = find_instance($obj.attr("data-id")),
			data = als[id];
		/***********************************************
		 * unbinding next and prev buttons so that
		 * they don't interfere with current animation
		 **********************************************/	
		data.prev.off();
		data.next.off();
		data.viewport.off("touchend");
		if(data.options.autoscroll === "yes")
		{
			$.fn.als("stop",id);
		}
        if (data.options.onArrowClick) {
            data.options.onArrowClick.call();
        }
		/*********************************************
		 * calling prev function on this instance
		 *********************************************/
		$.fn.als("prev",id);
		if(data.options.autoscroll === "yes")
		{
			$.fn.als("start",id);
		}
	}
	
	/********************************************************************
	 * function that generates the plugin and instantiates its methods
	 * @param {Object} method
	 *******************************************************************/
	$.fn.als = function( method ) 
	{
	    if ( methods[method] ) 
		{
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } 
		else if ( typeof method === 'object' || ! method ) 
		{
            return methods.init.apply( this, arguments );
        }
		else 
		{
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.als' );
	    }
  	};
		
})(jQuery);;/**
 *
 * @authors Igor Savchenko and Adrian Ramin (OA-5542)
 *
 * OA-4833
 *
 * Create 3-Column playlist underneath of video container
 *
 * @uses jQuery, Mustache, jquery.als, com.xoz.videoplayer
 *
 */

asms.general.ece.widgets.videoplaylist = function (newOptions) {

    'use strict';

    var template_social = '',
        $playlistContainer,
        $errorScreen,
        $currentPlayingItem,
        $description,
        $headline,
        $timeDisplay,
        $socialMedia,
        $playlistItems,
        $playButton,
        $socialBarTemplate,
        $embedButton,
        videos,
        playingVideoId;

    var _options = {
        videoplayerId: '',        // data-id of exozet videoplayer, that currently playing. Format: "video_xxxxx"
        imageThumbFeedField: 'image-playlist', // the name of the field in JSON "recommended videos", that we receive from backend
        imageThumbDummy: '/skins/welt/gfx/nopicChannelSpecial.jpg',
        ajax: {
            feedOfPlaylistSuffix: '?config=playlist',
            feedOfCurrentArticleSuffix: '?config=playlistSameArticleFeed'
        },
        events: {
            marginalColumnRealignFor10ColumnsVideoOpener: 'de/welt/realignMarginalColumnFor10ColumnsArticleOpener'
        },
        fadeInDurationInMs: 500,    // fading time of playlist on start
        css: {
            classes: {
                content: '.content', // wrapper of elements in videoplayer widget
                errorScreen: '.videoErrorscreen',
                playButton: '.play',
                description: '.description',
                timeDisplay: '.time',
                headline: '.headline',
                playlist: '.videoPlaylist',
                itemsWrapper: '.als-wrapper', // <ul>-Container, that storing playlist items
                item: '.als-item',
                itemIsPlaying: 'isPlaying',
                socialMedia: '.social-bar .socialMedia',
                embedButton: '.social-bar button.embed'
            },
            id: {
                templateVideoItem: '#templateVideoPlaylistItem',
                templateSocialBar: '#templateSocialBar'
            }
        },
        itemHeight: 144,  // the height of scrolling element. Default width = 256px and ratio = 16/9
        videoIsPlayingText: 'Video läuft',
        webtrekk: {
            arrowClick: '_videoplaylist_arrowclick_',
            videoClick: '_videoplaylist_videoclick_'
        }
    };

    var template = "<li class='als-item' data-video-id='{{{videoID}}}'>" +
        "<img src='{{{imageSource}}}' alt='{{{title}}}' title='{{{title}}}'/>" +
        "<span class='title'>{{{title}}}</span><span class='play-button'/>" +
        "<span class='playingText'>" + _options.videoIsPlayingText + "</span></li>";

    /**
     * private functions
     */
    function _init() {

        var $videoWrapper = $('#' + _options.videoplayerId);
        var $content = $videoWrapper.parent(_options.css.classes.content);
        $playlistContainer = $content.find(_options.css.classes.playlist);

        $description = $content.find(_options.css.classes.description);
        $timeDisplay = $content.find(_options.css.classes.timeDisplay);
        $headline = $playlistContainer.siblings(_options.css.classes.headline);
        $errorScreen = $content.find(_options.css.classes.errorScreen);
        $socialMedia = $content.find(_options.css.classes.socialMedia);
        $playButton = $content.find(_options.css.classes.playButton);
        $socialBarTemplate = $(_options.css.id.templateSocialBar);
        $embedButton = $(_options.css.classes.embedButton);

        if (!$playlistContainer.length) {
            return;
        }

        Mustache.parse(template);
        if ($socialBarTemplate.length > 0) {
            template_social = $socialBarTemplate.html();
            Mustache.parse(template_social);
        }

        _getPlaylistVideosAndInitializeScroller();
    }

    function _getPlaylistVideosAndInitializeScroller() {
        var ajaxPlaylistVideosData = {},
            ajaxInitialVideoData = {};
        $.when(
                $.get($playlistContainer.data('url') + _options.ajax.feedOfPlaylistSuffix,
                    function (playlistVideosData) {
                        ajaxPlaylistVideosData = playlistVideosData;
                    }
                ),

                $.get($playlistContainer.data('url') + _options.ajax.feedOfCurrentArticleSuffix,
                    function (initialVideoData) {
                        ajaxInitialVideoData = initialVideoData;
                    }
                )

            ).
            then(function () {
                if (!ajaxPlaylistVideosData || !ajaxPlaylistVideosData.videos || !ajaxPlaylistVideosData.videos.video) {
                    return;
                }

                var allPlaylistVideos = _mergeInitialVideoWithVideoData(ajaxInitialVideoData, ajaxPlaylistVideosData);
                _parseAjaxList(ajaxPlaylistVideosData.videos.video);
                _initListScroller();
                _initClickListener();
                _registerNextVideoHandlerForRevolverload();
                _movePlaylistForFirstVideo();
            });
    }

    function _mergeInitialVideoWithVideoData(initialVideo, videoData) {
        var initialVideoId = parseInt(_options.videoplayerId.match(/\d+/g), 10).toString();
        var isCurrentVideoInPlaylist = $.grep(videoData.videos.video, function (video) {
            return video.id === initialVideoId;
        });

        // playlist already contains initial video
        if (isCurrentVideoInPlaylist.length !== 0) {
            videoData = _moveInitialVideoToFirstPositionInPlaylist(initialVideoId, videoData);
            return videoData;
        }

        videoData.videos.video.unshift(initialVideo.videos.video);

        return videoData;
    }

    function _moveInitialVideoToFirstPositionInPlaylist(initialVideoId, videoData) {
        var positionOfInitialVideo = videoData.videos.video.map(function (video) {
            return video.id;
        }).indexOf(initialVideoId);

        // initial video was not found in playlist
        if (positionOfInitialVideo === -1) {
            return videoData;
        }

        // move initial video to first position in array
        videoData.videos.video.unshift(videoData.videos.video.splice(positionOfInitialVideo, 1)[0]);

        return videoData;
    }

    function _parseAjaxList(data) {
        var html = _createPlaylistHTML(data);

        $playlistContainer.find($(_options.css.classes.itemsWrapper)).html(html);
        $playlistContainer.css('display', 'block');
        $playlistContainer.animate({
            height: _options.itemHeight
        }, {
            queue: false,
            duration: _options.fadeInDurationInMs,
            complete: function () {
                // realign marginal column, because of loading context of playlist was done with ajax
                $(document).trigger(_options.events.marginalColumnRealignFor10ColumnsVideoOpener);
                _adjustZoomLayer();
            }
        });

        $playlistItems = $playlistContainer.find(_options.css.classes.item);
    }

    // get data from JSON and use template to render the string html
    function _createPlaylistHTML(data) {
        videos = [];
        var itemsHtml = '';

        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i];

            if (item.xml && item.title && item.text && item.source) {
                var imageSource = _options.imageThumbDummy;
                if (typeof item[_options.imageThumbFeedField] === 'string' && item[_options.imageThumbFeedField].length) {
                    imageSource = item[_options.imageThumbFeedField];
                }

                var itemData = {
                    imageSource: imageSource,
                    title: item.title,
                    videoID: item.id
                };
                var add = Mustache.render(template, itemData);
                itemsHtml = itemsHtml.concat(add);

                videos.push(item);
            }
        }

        return itemsHtml;
    }

    // recalculate the height of zoom layer, if the video is in zoom mode
    function _adjustZoomLayer() {
        // get id as a number of the video, that was first initialized in Videoplayer
        var num = parseInt(_options.videoplayerId.match(/\d+/g), 10),
            zoom = asms.general.ece.widgets.inlineZoomElement;

        if (num && !isNaN(num) && typeof zoom !== 'undefined' && typeof zoom[num] !== 'undefined') {
            zoom[num].adjustZoomLayer();
        }
    }

    // main initialization of jquery.als plugin for playlist
    function _initListScroller() {
        $playlistContainer.als({
            visible_items: 3,
            scrolling_items: 1,
            circular: "yes",
            autoscroll: "no",
            onArrowClick: function () {
                _sendWebtrekkInfo(_options.webtrekk.arrowClick);
            }
        });
    }

    // on first initialisation of playlist, this moves the first video that is currently playing to left
    function _movePlaylistForFirstVideo() {
        var firstVideoId = parseInt(_options.videoplayerId.match(/\d+/g), 10);
        var pos = _getVideoPositionByVideoID(firstVideoId);
        if (pos >= 0) {
            $.fn.als("goto", $playlistContainer.data('id'), pos + 1);
        }
        var item = $playlistItems[pos];
        if (typeof item !== 'undefined') {
            _markItemAsPlaying(item);
            playingVideoId = firstVideoId;
        }
    }

    // listener for click on video item
    function _initClickListener() {
        if (!(com && com.xoz && com.xoz.videoplayer)) {
            return;
        }
        $playlistItems.each(function () {
            $(this).click(function () {

                if ($(this).hasClass(_options.css.classes.itemIsPlaying)) {
                    return;
                }

                var videoID = $(this).data('video-id');
                var videoData = _getDataByVideoID(videoID);

                _replaceVideoInformation(videoData);
                _playVideo(videoID, videoData.xml + "?endscreen=false", false, 0);
                _sendWebtrekkInfo(_options.webtrekk.videoClick);

                playingVideoId = videoID;

                _prepareTrackingForPlaylistClick(videoID);
            });
        });
    }

    function _prepareTrackingForPlaylistClick(videoID) {
        if (typeof VideoPlayer === 'undefined') {
            return;
        }
        var videoObject = VideoPlayer.getObjectByVideoId(videoID);
        if (videoObject) {
            videoObject.prepareTrackingForPlaylistClick();
        }
    }

    function _replaceVideoInformation(videoData) {
        $description.find('.text').html(videoData.text);
        $description.find('.subline').html(videoData.source);
        $timeDisplay.html(_convertTheDate(videoData["published-date"]));
        $headline.html(videoData.title);
        $playlistContainer.siblings('.kicker').html(videoData.topline);

        _resetSocialMediaButtons(videoData);
        _hideEmbedButton();
    }

    // converts date string from JSON to format "day.month.year" with leading zero
    function _convertTheDate(date) {
        var res = "";
        if (typeof date === 'string') {
            var q = new Date(date);
            res = ('0' + q.getDate()).slice(-2) + '.' + ('0' + (q.getMonth() + 1)).slice(-2) + '.' + q.getFullYear();
        }
        return res;
    }

    // change the view of playlist item if it currently playing the video
    // @param item - dom-element <li> in the playlist
    function _markItemAsPlaying(item) {
        if ($currentPlayingItem) {
            $currentPlayingItem.removeClass(_options.css.classes.itemIsPlaying);
        }
        $currentPlayingItem = $(item).addClass(_options.css.classes.itemIsPlaying);
    }

    // retrieve data about selected video from stored JSON
    function _getDataByVideoID(videoID) {
        return videos.filter(function (video) {
            return video.id == videoID;
        })[0];
    }

    // get position of selected video in the list of videos from stored JSON
    function _getVideoPositionByVideoID(videoID) {
        var pos = -1;
        if (typeof videoID === 'undefined') {
            return pos;
        }
        for (var i = 0; i < videos.length; i++) {
            var video = videos[i];
            if (videoID == video.id) {
                pos = i;
                break;
            }
        }
        return pos;
    }

    function _getNextVideo() {
        if (videos.length === 0) {
            return null;
        }

        if (typeof playingVideoId === 'undefined' || playingVideoId === null) {
            // no video from the playlist was played so far -> take the first video from the playlist
            return videos[0];
        }

        var playingVideoPosition = _getVideoPositionByVideoID(playingVideoId);
        var indexOfNextVideo;

        if (videos.length === 1) {
            // there is only one video within playlist -> next video is the same one
            indexOfNextVideo = playingVideoPosition;
        } else if (videos.length - 1 === playingVideoPosition) {
            // current playing video is the last one within playlist -> next video must be the first one
            indexOfNextVideo = 0;
        } else {
            // take the regular next video
            indexOfNextVideo = playingVideoPosition + 1;
        }

        return (typeof videos[indexOfNextVideo] !== 'undefined') ? videos[indexOfNextVideo] : null;
    }

    function _playVideo(videoId, videoUrl, showTerminationButton, revolverCount) {
        var posOfVideo = _getVideoPositionByVideoID(videoId);

        _initializeVideo($playlistContainer.data('id'), posOfVideo, videoUrl, {autoplay: true, showTerminationButton: showTerminationButton}, revolverCount);
        playingVideoId = videoId;
        $playButton.removeAttr('style');
    }

    function _initializeVideo(sourceId, targetPos, videoUrl, playlistConfiguration, revolverCount) {
        $.fn.als("goto", sourceId, targetPos + 1);

        $errorScreen.hide();

        // init video
        com.xoz.videoplayer.cleanVideoplayerForNextPlaylistItem(_options.videoplayerId);
        com.xoz.videoplayer.reinitializeVideo(_options.videoplayerId, videoUrl, revolverCount, false, {autoplay: playlistConfiguration.autoplay,
            showTerminationButton: playlistConfiguration.showTerminationButton});

        var item = $playlistItems[targetPos];
        if (typeof item !== 'undefined') {
            _markItemAsPlaying(item);
        }
    }

    function _sendWebtrekkInfo(event) {
        if (typeof wt !== 'undefined' && 'function' === typeof wt.sendinfo) {
            wt.sendinfo({linkId: event});
        }
    }

    function _registerNextVideoHandlerForRevolverload() {
        $(document).on('de/welt/playlistPlayNextVideo', function (event, videoplayerId, revolverCount) {
            if (_options.videoplayerId === videoplayerId) {
                var nextVideo = _getNextVideo();
                if (null === nextVideo) {
                    return;
                }

                _replaceVideoInformation(nextVideo);
                _playVideo(nextVideo.id, nextVideo.xml, true, revolverCount);
            }
        });
    }

    // change URL of social buttons according to selected video
    // see videoTeaserXXL.jsp
    function _resetSocialMediaButtons(data) {
        var social_html = Mustache.render(template_social, {
            'url': data.link,
            'title': data.title
        });
        $socialMedia.html(social_html);

        if (typeof renderSocialButtons === 'function') {
            renderSocialButtons();
        }
    }

    // hide embed button of initial video after different video was selected
    function _hideEmbedButton() {
        if ($embedButton.length === 0) {
            return;
        }
        $embedButton.hide();
    }

    $.extend(true, _options, newOptions || {});
    _init();

};

/*
 This listen on exozet event, on user click on video to play the video.
 The event sends the ID of playing video.
 According ID this finds the videoplayer and create a playlist for it.
 */
$(document).on('xoz/videoplayer/initPlayer', function (event, videoplayerId) {

    // the list of videos on current page, which have already have playlist initialised and visible
    asms.general.ece.widgets.videoplayer.playlistInit = asms.general.ece.widgets.videoplayer.playlistInit || [];
    var playlistExist = asms.general.ece.widgets.videoplayer.playlistInit;

    // if ID exists and not in the list of already existing playlists, than create a playlist.
    if (typeof videoplayerId === "string" && videoplayerId.length && typeof playlistExist !== "undefined" && playlistExist.indexOf(videoplayerId) === -1) {
        playlistExist.push(videoplayerId);
        new asms.general.ece.widgets.videoplaylist({
            videoplayerId: videoplayerId
        });
    }
});
;/*
 *   Favoriten des Homepage-Teams
 *   OA-5532
 */

asms.general.ece.widgets.favorites = {
    widget: {},

    init: function(headline, url) {
        'use strict';
        this.widget = $('.widget.favorites');
        this.widget.children('.header').html(headline);
        this.getData(url);
    },
    getData: function(url) {
        'use strict';
        var self = this;
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'xml',
            success: function(data) {
                self.build(data);
            },
            error: function() {
                self.widget.remove();

            }
        });
    },
    build: function(xml) {
        'use strict';
        var self = this;

        var items = $(xml).find('item');
        var favs = [$('#favorite-a'), $('#favorite-b')];
        if (items.length >= 2) {
            for (var i = 0; i < 2; i++) {
                var $item = $(items[i]),
                    imgSrc = $item.find('enclosure').attr('url').replace('w1-h1', 'w300-h147'),
                    link = $item.find('link').text(),
                    titleAndTopline = $item.find('title').text().split(':'),
                    dateTemp = $item.find('pubDate').text(),
                    date = self.formatDate(new Date(dateTemp)),
                    topline = titleAndTopline[0].trim(),
                    title = titleAndTopline[1].trim();
                $('a', favs[i]).attr('href', link);
                $('.img-wrapper a img', favs[i]).attr('src', imgSrc);
                $('.headline a', favs[i]).html(title);
                $('.ressort .time', favs[i]).html(date);
                $('.ressort .topLine', favs[i]).html(topline);
            }
        } else {
            this.widget.remove();
        }
    },
    formatDate: function(d) {
        'use strict';
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        return (day <= 9 ? '0' + day : day) + '.' + (month <= 9 ? '0' + month : month) + '.' + year;
    }
};;/**
 * Created by mvogt on 15.05.15.
 *
 * yhna - you have new articles
 */

var yhna = (function($) {

    var _options = {
        yhnaDefaultMessage1: 'DIE WELT wurde mit ',
        yhnaDefaultMessage2: ' Artikel aktualisiert.',
        yhnaDefaultMessage3: ' Artikeln aktualisiert.',
        yhnaBtnCancel: '<a id="yhnaBtnCancel" class="yhna-btn-cancel">Nicht neu laden <span class="yhna-btn-cancel-img"></span></a>',
        yhnaBtnReload: '<a id="yhnaBtnReload" class="yhna-btn-reload"><span class="yhna-btn-reload-img"></span> Neu laden</a>',
        yhnaTemplate: '<div id="yhna" class="yhna-overlay-bg"><div id="yhnaContent" class="yhna-content"></div></div>',
        yhnaMessage: '<span id="yhnaMessage" class="yhna-message"></span>',
        yhnaMessageText: '',
        yhnaDefaultContent: '',
        error: false,
        favicon: null,
        yhnaCurrentArticles: null,
        yhnaRequestedArticleList: null,
        yhnaNewArticles: null,
        yhnaNewArticlesLength: null,
        yhnaSelectorLeadarticle: $('.aufmacher span.hidden'),
        yhnaSelectorLeadCluster: $('.aufmacher').nextAll('.teaserAttachmentsCluster').find($('span.hidden')),
        yhnaSelectorTower: $('.firstGroupWrapper span.hidden'),
        yhnaAjaxHost: document.location.host,
        yhnaAjaxPath: '/?config=cat',
        yhnaLogLevel: 0,
        updateInterval: 0
    };

    function yhnaController() {
        _options.error = false;

        if (typeof(won24yhnaLogLevel) !== 'undefined') {
            _options.yhnaLogLevel = won24yhnaLogLevel;
            yhnaLogger('yhna loggong is active ...', 3);
            yhnaLogger('yhna interval: ' + pollNewArticlesIntervalMinutes + ' minutes (' + pollNewArticlesIntervalMinutes * 60 + 'seconds)', 3);
        }

        if ($('#yhna').length) {
            yhnaRequestNewArticles();
        } else {
            yhnaInit();
            yhnaRequestNewArticles();
        }
    }

    function yhnaInit() {
        yhnaLogger('fn yhnaInit', 3);
        if (typeof(currentArticleForUpdateMonitoring) == 'undefined') {
            _options.error = true;
            yhnaLogger('var currentArticleForUpdateMonitoring not defined - check sitebuilding', 2);
        } else {
            _options.yhnaCurrentArticles = currentArticleForUpdateMonitoring;
            yhnaLogger('current articles: ' + _options.yhnaCurrentArticles, 1);
        }

        if (typeof(pollNewArticlesIntervalMinutes) != 'undefined') {
            _options.updateInterval = pollNewArticlesIntervalMinutes;
        }

        if (!_options.error) {
            _options.yhnaDefaultContent = _options.yhnaBtnCancel + _options.yhnaMessage + _options.yhnaBtnReload;
            $('body').prepend(_options.yhnaTemplate);
            $('#yhnaContent').addClass('default').append(_options.yhnaDefaultContent);
            $('#yhnaBtnReload').on('click', function () {
                gtmDataLayer.push({'event':'inactiveoverlay_clickrefresh'});
            });
            $('#yhnaBtnCancel').on('click', function () {
                yhna.hide();
            });
            _options.favicon = new Favico();
        }
    }

    function yhnaGetMessageText() {
        yhnaLogger('fn yhnaGetMessageText', 3)
        var yhnaMessageText = _options.yhnaDefaultMessage1 + _options.yhnaNewArticlesLength;
        if (_options.yhnaNewArticlesLength > 1) {
            yhnaMessageText += _options.yhnaDefaultMessage3;
        } else {
            yhnaMessageText += _options.yhnaDefaultMessage2;
        }
        yhnaLogger('message text: ' + yhnaMessageText, 3);
        return yhnaMessageText;
    }

    function yhnaRequestNewArticles() {
        yhnaLogger('fn yhnaRequestNewArticles', 3);
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: 'http://' + _options.yhnaAjaxHost + _options.yhnaAjaxPath
        })
            .done(function( response ) {
                yhnaLogger('ajax request done ...', 3);
                _options.yhnaRequestedArticleList = response;
                yhnaGetNewArticle();
            })
            .fail(function() {
                yhnaLogger('ajax request failed ...', 2);
                _options.error = true;
            });
        yhnaLogger('ajax url: http://' + _options.yhnaAjaxHost + _options.yhnaAjaxPath, 2);
    }

    function yhnaGetNewArticle() {
        yhnaLogger('fn yhnaGetNewArticle', 3);
        if (!_options.error) {
            var _newArticles = [];

            jQuery.grep(_options.yhnaRequestedArticleList, function(el) {
                if (jQuery.inArray(el, _options.yhnaCurrentArticles) == -1) _newArticles.push(el);
            });

            _options.yhnaNewArticles = _newArticles;
            _options.yhnaNewArticlesLength = _options.yhnaNewArticles.length;

            yhnaLogger('### aritcle list ###', 1);
            yhnaLogger('current: ' + _options.yhnaCurrentArticles.length, 1);
            yhnaLogger(_options.yhnaCurrentArticles, 1);
            yhnaLogger('request: ' + _options.yhnaRequestedArticleList.length, 1);
            yhnaLogger(_options.yhnaRequestedArticleList, 1);
            yhnaLogger('diff: ' + _options.yhnaNewArticlesLength, 1);
            yhnaLogger(_options.yhnaNewArticles, 1);

            if (_options.yhnaNewArticlesLength > 0) {
                $('#yhnaMessage').text(yhnaGetMessageText());
                $('#yhnaBtnReload').attr('href', 'http://' + _options.yhnaAjaxHost + '/?highlight=' + yhnaArticleAsParameter() + '&wtmc=onsite.....startseiten_refresh_overlay');

                if (!_options.error) {
                    if ($('#yhna').css('display') != 'block') {
                        gtmDataLayer.push({'event':'inactiveoverlay_view'});
                    }
                    yhnaShow();
                    _options.favicon.badge(_options.yhnaNewArticlesLength);
                }
            }
        }
    }

    function yhnaGetUrlParameter(sParam) {
        yhnaLogger('fn yhnaGetUrlParameter', 3)
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }

    function yhnaArticleAsParameter() {
        yhnaLogger('fn yhnaArticleAsParameter', 3);
        var _articleIdParameter = '';
        for (var i = 0; i < _options.yhnaNewArticlesLength; i++) {
            _articleIdParameter += _options.yhnaNewArticles[i] + ',';
        }
        _articleIdParameter = _articleIdParameter.substr(0, _articleIdParameter.lastIndexOf(','));
        return _articleIdParameter;
    }

    function yhnaShow() {
        yhnaLogger('fn yhnaShow', 3);
        $('.yhna-content').css('top',Math.floor(($(window).height() - 200) / 2));
        $('#yhna').show();
    }

    function yhnaHide() {
        yhnaLogger('fn yhnaHide', 3);
        $('#yhna').hide();
        _options.favicon.reset();
        gtmDataLayer.push({'event':'inactiveoverlay_clickclose'});
    }

    function yhnaHighlightArticle() {
        yhnaLogger('fn yhnaHighlightArticle', 3);
        var _highlight = yhnaGetUrlParameter('highlight');

        if (_highlight) {
            _highlight = _highlight.split(',');
            for (i=0; i<_highlight.length; i++) {
                $('span.badge-yhna[data-articleid="'+_highlight[i]+'"]').removeClass('hidden');
            }
        }
    }

    function yhnaLogger(logString, logLevel) {
        if(typeof console === 'undefined') {
            console = {
                log: function() { }
            };
        }

        if (logLevel <= _options.yhnaLogLevel) {
            console.log(logLevel+'#'+_options.yhnaLogLevel+': '+logString);
        }
    }

    var methods = {
        main: function() {
            yhnaController();
        },
        hide: function() {
            yhnaHide();
        },
        highlight: function() {
            yhnaHighlightArticle();
        },
        logger: function(logString, logLevel) {
            yhnaLogger(logString, logLevel);
        }
    }

    return methods;

})(jQuery);

$(function() {
    if (typeof(pollNewArticlesIntervalMinutes) == 'string' && pollNewArticlesIntervalMinutes > 0) {
        $(document).idleTimer(pollNewArticlesIntervalMinutes * 60000);
    }

    if ($('#front')) {
        $(document).on("idle.idleTimer", function(event, elem, obj){
            yhna.main();
        });
    };

    yhna.highlight();

});;/**
 * Created by hmuenst1 on 25.08.15.
 *
 * ippn = in page push notification, for new article on frontpage


 * TODOs ###################################################
 * - should notification also be send on updated articles? (changed modification date?)
 * - currently notification is triggered if a new article ID is in the list of last 10 articles
        - this means: no updates if order of articles is changes
        -             no updates if article is modified
 * - strip of debugging & developer and not used anymore features...
 * - add / create push permission page, cfg.askPermissionOnLoad  = false
 * - remove push permission on load
 * - add OFF PAGE notification for chrome and
 * - how and where implement a FEATURE TOGGLE for this notification
 */

var ippn = (function ($) {

    var docHost = document.location.host;
    if (docHost.indexOf("localhost") > -1)
        docHost = "dev2.welt.de";
    var requestedNewArticles = [];
    var currentNewArticles = [];
    var diffNewArticles = [];
    var cfg = {};
    cfg.console
    cfg.askPermissionOnLoad = false;
    cfg.addPermissionButton = false;
    cfg.addButtonHandler = false;
    cfg.openNewWindow = true;
    cfg.autoSend = true;
    cfg.requestIntervall = 100; //100ms for first initial request
    cfg.hostPath = docHost;
    cfg.ajaxPath = '/?config=feeds_push_notification';
    cfg.intervallStarted = false;
    cfg.notification = {
        title: "",
        tag: "",
        body: "",
        iconUrl: "http://" + docHost + "/favicon.ico",
        icon: "http://" + docHost + "/favicon.ico",
        url: docHost,
        articleId: ""
    };

    function init() {
        checkDependencies();
        if (window.Notification) {
            //console.log("Your browser supports notifications!");
            if (hasPermission() === true) {
                if (cfg.autoSend) {
                    requestLatestArticles();
                }
                if (cfg.addButtonHandler) {
                    addButtonHandler();
                } else {
                    $("#requestPermission,#checkPermission").hide();
                    $("#result").val("Permission is = " + Notification.permission);
                }
            } else {
                askPermission();
            }
        } else {
            console.log("SORRY, your browser does not support notifications!");
        }
    }

    function checkDependencies() {
        if (typeof console === 'undefined') {
            console = {
                log: function() {}
            };
        }
        //used for tracking
        if (typeof gtmDataLayer === 'undefined') {
            gtmDataLayer = [];
        }
    }

    function requestNewArticlesWithIntervall() {
        setInterval(function() {
            requestLatestArticles();
        }, cfg.requestIntervall);
    }

    function hasPermission() {
        if (Notification.permission === "granted") {
            return true;
        } else {
            return false;
        }
    }

    function askPermission() {
        if (cfg.addPermissionButton === true) {
            $("body").append("<button style='position:absolute;left:10px;top:10px;z-index:99' id='askNotificationPermission'>Ask for notification permission</button>");
            $(document).on("click", "#askNotificationPermission", function() {
                Notification.requestPermission();
                $("#askNotificationPermission").hide();
            });
        }
        if (cfg.askPermissionOnLoad === true) {
            Notification.requestPermission();
        }
    }

    function sendNotification(articleList) {
        for (var i = 0; i < articleList.length; i++) {
            cfg.notification.body = articleList[i].title;
            cfg.notification.url = articleList[i].url + '?wtmc=notification';

            var notification = new Notification(cfg.notification.title, {
                tag: cfg.notification.tag,
                body: cfg.notification.body,
                iconUrl: cfg.notification.iconUrl, //Firefox
                icon: cfg.notification.icon //Chrome
            });
            console.log("notification SEND");

            gtmDataLayer.push({
                'event': 'notificationSend'
            });

            notification.onclick = function() {
                notification.close();
                // chrome only
                // If the window is minimized, restore the size of the window
                window.open().close();
                window.focus();
                if (cfg.openNewWindow) {
                    window.open(cfg.notification.url);
                }
                console.log("notification clicked");
                gtmDataLayer.push({
                    'event': 'notificationClicked'
                });
            }
        }
    }

    function requestLatestArticles() {
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: 'http://' + cfg.hostPath + cfg.ajaxPath + "&randomID=" + Date.now() //random parameter to refresh ajax response
        })
            .done(function(response) {
                cfg.requestIntervall = response.requestNewArticlesInterval;
                cfg.notification.title = response.notificationHeadline;
                cfg.notification.tag = response.tag;
                requestedNewArticles = response.articles;
                checkForNewArticles();
                if (cfg.intervallStarted === false) {
                    console.log("starting requestIntervall with:" + cfg.requestIntervall);
                    requestNewArticlesWithIntervall(); //now start intervall requesting
                    cfg.intervallStarted = true;
                }
            })
            .fail(function() {
                console.log("Ajax request failed");
            });
    }

    function checkForNewArticles() {
        if (currentNewArticles.length == 0) {
            currentNewArticles = requestedNewArticles; //on init set request = current
            console.log("initial article request");
        } else {
            //inArray,  does not work with objects !!!!!!!
            // $.grep(requestedNewArticles, function(el) {
            //     if ($.inArray(el, currentNewArticles) == -1) diffNewArticles.push(el);
            // });
            //check if new article objects are already in current article objects
            for (var k = 0; k < requestedNewArticles.length; k++) {
                var newArticleAlreadyInCurrentArticles = false;
                for (var i = 0; i < currentNewArticles.length; i++) {
                    if (requestedNewArticles[k].id === currentNewArticles[i].id) {
                        newArticleAlreadyInCurrentArticles = true;
                        // here we could place an additional checking of modification date of the article
                    }
                }
                if (newArticleAlreadyInCurrentArticles === false) {
                    diffNewArticles.push(requestedNewArticles[k]);
                }
            }
            currentNewArticles = requestedNewArticles;
            console.log("new articles = " + diffNewArticles.length)
            if (diffNewArticles.length > 0) {
                sendNotification(diffNewArticles);
                diffNewArticles = [];
            }
        }
    }

    function addButtonHandler() {
        $("#requestPermission").on("click", function() {
            Notification.requestPermission();
        });

        $("#checkPermission").on("click", function() {
            if (Notification.permission) {
                //Firefox
                $("#result").val(Notification.permission);
            } else {
                // Chrome
                $("#result").val(new Notification("check").permission);
            }
        });

        $("#show").on("click", function() {
            sendNotification();
        });
    }

    var methods = {
        init: function() {
            init();
        },
        sendNotification: function(articleList) {
            sendNotification(articleList);
        },
        requestLatestArticles: function() {
            requestLatestArticles();
        }
    }
    return methods;
})(jQuery);

$(function() {
    $(document).ready(function() {
        ippn.init();
    });
});;jQuery.fn.selectionSharer = function (options) {
    'use strict';

    var defaults = {
        urlToShare: '',
        facebookAppId: '53620771449',
        webtrekkID: 'selectionSharer_view',
        popupCloseUrl: 'http://'+document.location.host+'/closePopup.html',
        pictureToShare: '',
        titleToShare: '',
        standartPrefix: '"',
        standartSuffix: '"',
        standartShortener: '...',
        selectedTextConstraints: {
            minCharacterLength: 2,
            maxCharacterLength: 1000
        },
        themes: {
            middleLeft: {
                class: 'selection-sharer--theme-middle-left',
                arrowClass: 'selection-sharer__arrow-middle-right',
                leftMarginPixels: -5,
                topMarginPixels: 100
            },
            bigMiddleLeft: {
                class: 'selection-sharer--theme-middle-left',
                arrowClass: 'selection-sharer__arrow-middle-right',
                leftMarginPixels: 80-5,
                topMarginPixels: 219
            },
            topLeft: {
                class: 'selection-sharer--theme-top-left',
                arrowClass: 'selection-sharer__arrow-bottom-right',
                leftMarginPixels: 12
            }
        },
        imageSharing: {
            enabled: true,
            defaultShareText: 'Look at that beautiful image.',
            timeOutDurationInMs: 1000
        },
        animations: {
            shareIconContainer: {
                activated: true,
                fadeInDurationInMs: 500
            }
        },
        css: {
            classes: {
                xxlAufmacher: 'articleElementXXL',
                selectedTextContainer: 'selection-sharer__selected-text',
                shareIconsContainer: 'selection-sharer',
                shareTextIconsContainer: 'selection-sharer--text',
                shareImageIconsContainer: 'selection-sharer--image',
                shareImageIconsContainerActive: 'selection-sharer__image--active',
                hiddenShareIconsContainer: 'selection-sharer--hidden',
                shareIconsContainerAbsolute: 'selection-sharer__icons-container--absolute',
                icons: {
                    general: 'btn',
                    link: 'selection-sharer__icon--link',
                    facebook: 'icon-facebook',
                    twitter: 'icon-twitter',
                    gplus: 'icon-google-plus'
                },
                arrows: {
                    bottomRight: 'selection-sharer__arrow-bottom-right',
                    middleRight: 'selection-sharer__arrow-middle-right'
                }
            }
        },
        services: {
            facebook: {
                name: 'facebook',
                enabled: true,
                popupWindowSettings: {
                    enabled: true,
                    width: 600,
                    height: 480
                },
                link: 'https://www.facebook.com/dialog/feed?app_id=%APP_ID%&display=popup&description=%SHARE_TEXT%&link=%SHARE_URL%&redirect_uri=%REDIRECT_URI%&picture=%PICTURE%&name=%NAME%',
                title: 'Den markierten Text auf Facebook teilen.',
                webtrekkID: 'selectionsharer_share_facebook',
                prefixDescription: '',
                suffixDescription: '',
                showOnlyForTouchDevices: false
            },
            twitter: {
                name: 'twitter',
                enabled: true,
                popupWindowSettings: {
                    enabled: true,
                    width: 600,
                    height: 480
                },
                link: 'http://twitter.com/share?text=%SHARE_TEXT%&url=%SHARE_URL%',
                title: 'Den markierten Text auf Twitter teilen.',
                webtrekkID: 'selectionsharer_share_twitter',
                prefixDescription: '',
                suffixDescription: '',
                showOnlyForTouchDevices: false,
                maxCharacterLength: 140,
                urlShortenerCharacters: 22
            },
            gplus: {
                name: 'gplus',
                enabled: true,
                popupWindowSettings: {
                    enabled: true,
                    width: 600,
                    height: 480
                },
                link: 'https://plus.google.com/share?url=%SHARE_URL%',
                title: 'Den markierten Text per Google+ teilen.',
                webtrekkID: 'selectionsharer_share_googleplus',
                prefixDescription: '',
                suffixDescription: '',
                showOnlyForTouchDevices: false
            }
        }
    };
    var settings = jQuery.extend(true, defaults, options || {});

    function _initSelectionSharer($element) {
        $element.on('mouseup', function (event) {
            if (jQuery(event.target).hasClass(settings.css.classes.icons.general)) {
                event.preventDefault();
                return;
            }

            var successfullyInsertedContainer = _insertSelectionContainer();
            if (successfullyInsertedContainer) {
                wt.sendinfo({linkId: settings.webtrekkID});
            }
        });

        jQuery(document).on('mousedown', function (event) {
            if (jQuery(event.target).hasClass(settings.css.classes.icons.general)) {
                event.preventDefault();
                return;
            }

            _clearSelection();
            _removeAllExistingTextShareContainer($element, settings.css.classes.shareTextIconsContainer);
        });

        _registerImageSharing($element);
    }

    function _registerImageSharing($element) {
        if (false === settings.imageSharing.enabled) {
            return;
        }

        var mouseOutTimeout = null;

        $element.find('img').on('mouseenter', function () {
            var $image = jQuery(this);
            if ($image.hasClass(settings.css.classes.shareImageIconsContainerActive)) {
                return;
            }

            _clearImageMouseoutTimeout(mouseOutTimeout);

            $image.addClass(settings.css.classes.shareImageIconsContainerActive);

            var backUpPicture = settings.pictureToShare;
            settings.pictureToShare = $image.attr("src");

            var shareContainer = _insertImageHoverContainer($element);
            settings.pictureToShare = backUpPicture;
            _registerImageMouseOutListener($image, jQuery(shareContainer), mouseOutTimeout);
        });
    }

    function _clearImageMouseoutTimeout(mouseOutTimeout) {
        if (mouseOutTimeout !== null) {
            clearTimeout(mouseOutTimeout);
        }
    }

    function _getImageMouseOutTimeout(showImageShareContainer, mouseOutTimeout, $shareContainer, $image) {
        showImageShareContainer.enabled = false;

        _clearImageMouseoutTimeout(mouseOutTimeout);

        mouseOutTimeout = _startImageShareContainerTimeOut(showImageShareContainer, $shareContainer, $image);
        return mouseOutTimeout;
    }

    function _registerImageMouseOutListener($image, $shareContainer, mouseOutTimeout) {
        var showImageShareContainer = { enabled: true };

        $image.mouseout(function () {
            mouseOutTimeout = _getImageMouseOutTimeout(showImageShareContainer, mouseOutTimeout, $shareContainer, $image);
        });

        $shareContainer.mouseout(function () {
            mouseOutTimeout = _getImageMouseOutTimeout(showImageShareContainer, mouseOutTimeout, $shareContainer, $image);
        });

        $image.mouseover(function () {
            showImageShareContainer.enabled = true;
        });

        $shareContainer.mouseover(function () {
            showImageShareContainer.enabled = true;
        });
    }

    function _positionShareContainer($shareContainer, theme, $selectedElement) {
        var $shareIconsContainer = $shareContainer.find('.' + settings.css.classes.shareIconsContainerAbsolute);
        var leftMargin = $shareIconsContainer.outerWidth() * -1;
        var topMargin = $shareIconsContainer.outerHeight() * -1;

        if (typeof theme !== 'undefined' && typeof theme.class !== 'undefined') {
            var $arrowBottomRight = jQuery('<span></span>').addClass(theme.arrowClass);
            $shareIconsContainer.append($arrowBottomRight);

            $shareIconsContainer.addClass(theme.class);

            leftMargin += theme.leftMarginPixels;
        }

        if (typeof $selectedElement !== 'undefined') {
            topMargin += $selectedElement.outerHeight() / 2;
            $shareContainer.css('top', topMargin);
        }

        $shareContainer.css('left', leftMargin);
    }

    function _startImageShareContainerTimeOut(showImageShareContainer, $shareContainer, $image) {
        return setTimeout(function () {
            if (true === showImageShareContainer.enabled) {
                return;
            }
            $shareContainer.remove();

            $image.removeClass(settings.css.classes.shareImageIconsContainerActive);

            $shareContainer.unbind('mouseover mouseout');
            $image.unbind('mouseover mouseout');
        }, settings.imageSharing.timeOutDurationInMs);
    }

    function _isTouchDevice() {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    }

    function _clearSelection() {
        // all browsers, except IE before version 9
        if (window.getSelection) {
            var selection = window.getSelection();
            selection.removeAllRanges();
        }
    }

    function _selectedTextIsWellFormed(selectedText) {
        var textIsWellFormed = true;

        if (selectedText.length === 0 || selectedText.length > settings.selectedTextConstraints.maxCharacterLength || selectedText.length < settings.selectedTextConstraints.minCharacterLength) {
            return false;
        }

        return textIsWellFormed;
    }

    function _removeAllExistingTextShareContainer($element, classSelector) {
        $element.find('.' + classSelector).remove();
    }

    function _createIcon(service, cssClassesArr, selectedText) {
        var $newIcon = jQuery('<span></span>');

        for (var i = 0; i < cssClassesArr.length; i++) {
            $newIcon.addClass(cssClassesArr[i]);
        }

        var serviceLink = _getServiceLink(service, selectedText);

        return $(serviceLink).append($newIcon);
    }


    function _addPrefixAndSuffixToText(prefix, suffix, text) {
        return prefix + '' + text + '' + suffix;
    }

    function _returnWellFormedText(serviceObj, selectedText, prefix, suffix) {
        var tempText = _addPrefixAndSuffixToText(settings.standartPrefix, settings.standartSuffix, selectedText);
        tempText = _addPrefixAndSuffixToText(prefix, suffix, tempText);

        var urlShortenerCharacters = serviceObj.urlShortenerCharacters ? serviceObj.urlShortenerCharacters : 0;

        var tempTextLength = tempText.length + urlShortenerCharacters;

        if (serviceObj.maxCharacterLength && tempTextLength > serviceObj.maxCharacterLength) {

            var suffixAndPrefixLength = tempText.length - selectedText.length;
            tempText = selectedText.substring(0, serviceObj.maxCharacterLength - urlShortenerCharacters - suffixAndPrefixLength - 4);
            tempText = tempText + "...";
            tempText = _addPrefixAndSuffixToText(settings.standartPrefix, settings.standartSuffix, tempText);
            tempText = _addPrefixAndSuffixToText(prefix, suffix, tempText);
        }

        return tempText;
    }

    function _getServiceLink(serviceObj, selectedText) {
        selectedText = _returnWellFormedText(serviceObj, selectedText, serviceObj.prefixDescription, serviceObj.suffixDescription);

        // replace placeholders in href value
        var serviceLinkHref = serviceObj.link.replace('%SHARE_TEXT%', encodeURIComponent(selectedText));
        serviceLinkHref = serviceLinkHref.replace(new RegExp('%SHARE_URL%', 'g'), encodeURIComponent(settings.urlToShare));
        serviceLinkHref = serviceLinkHref.replace('%APP_ID%', settings.facebookAppId);
        serviceLinkHref = serviceLinkHref.replace('%PICTURE%', settings.pictureToShare);
        serviceLinkHref = serviceLinkHref.replace('%NAME%', settings.titleToShare);
        serviceLinkHref = serviceLinkHref.replace('%REDIRECT_URI%', encodeURIComponent(settings.popupCloseUrl));

        // stop propagation of click event (share container is maybe within another anchor link and we don't want to open that one)
        var onClick = 'onclick="event.stopPropagation();"';
        if (true === serviceObj.popupWindowSettings.enabled) {
            // open link in window popup
            onClick = ' onclick="window.open(this.href,' + '\'' + serviceObj.name + '\',' + '\'menubar=no,' + 'toolbar=no,' + 'resizable=yes,' + 'scrollbars=yes,' + '' + 'width=' + serviceObj.popupWindowSettings.width + ',' + 'height=' + serviceObj.popupWindowSettings.height + '\');' + 'event.stopPropagation(); wt.sendinfo({linkId:\'' + serviceObj.webtrekkID + '\'}); return false;"';
        }

        return '<a class="' + settings.css.classes.icons.link + '" href="' + serviceLinkHref + '" title="' + serviceObj.title + '" target="_blank"' + onClick + '></a>';
    }

    function _createSelectionSharerContainer(selectedText, containerClassesArr) {
        var $selectionSharerContainer = jQuery('<span></span>').addClass(containerClassesArr.join(' '));

        if (settings.animations.shareIconContainer.activated) {
            $selectionSharerContainer.addClass(settings.css.classes.hiddenShareIconsContainer);
        }

        var $iconContainer = jQuery('<span></span>').addClass(settings.css.classes.shareIconsContainerAbsolute);

        for (var service in settings.services) {
            if (settings.services.hasOwnProperty(service) && settings.services[service].enabled) {
                if (true === settings.services[service].showOnlyForTouchDevices) {
                    if (false === _isTouchDevice()) {
                        continue;
                    }
                }

                var $serviceIcon = _createIcon(settings.services[service], [settings.css.classes.icons.general, settings.css.classes.icons[settings.services[service].name]], selectedText);
                $iconContainer.append($serviceIcon);
            }
        }

        $selectionSharerContainer.append($iconContainer);

        return $selectionSharerContainer;
    }

    function _fadeInSelectionSharerContainer($selectionSharerContainer) {
        if (!settings.animations.shareIconContainer.activated) {
            return;
        }
        $selectionSharerContainer.animate({
            opacity: 1
        }, {
            queue: false,
            duration: settings.animations.shareIconContainer.fadeInDurationInMs
        });
    }

    function _insertImageHoverContainer($element) {
        var $image = jQuery($element.find('img')[0]);

        var imageTitle = $image.attr('title');
        var shareText = imageTitle.length === 0 ? settings.imageSharing.defaultShareText : imageTitle;

        var $selectionShareContainer = _createSelectionSharerContainer(shareText.trim(), [settings.css.classes.shareIconsContainer, settings.css.classes.shareImageIconsContainer]);
        $element.before($selectionShareContainer);

        if ($element.hasClass(settings.css.classes.xxlAufmacher)) {
            _positionShareContainer($selectionShareContainer, settings.themes.bigMiddleLeft, $image);
        } else {
            _positionShareContainer($selectionShareContainer, settings.themes.middleLeft, $image);
        }
        _registerServiceIconClickHandler($selectionShareContainer);
        _fadeInSelectionSharerContainer($selectionShareContainer);

        return $selectionShareContainer;
    }

    function _insertSelectionContainer() {
        if (!window.getSelection) {
            return false;
        }

        var selectedObject, selectedRange, selectedText;
        selectedObject = window.getSelection();
        selectedText = selectedObject.toString().trim();

        if (!_selectedTextIsWellFormed(selectedText)) {
            return false;
        }

        var parentClassName = selectedObject.getRangeAt(0).commonAncestorContainer.parentNode.className;
        if (parentClassName.length > 0 && parentClassName === settings.css.classes.shareIconsContainer) {
            return false;
        }

        // only show icons when one range is selected
        if (selectedObject.rangeCount === 1) {
            var $selectionShareContainer = _createSelectionSharerContainer(selectedText, [settings.css.classes.shareIconsContainer, settings.css.classes.shareTextIconsContainer]);

            selectedRange = selectedObject.getRangeAt(0);
            selectedRange.insertNode($selectionShareContainer[0]);

            // select the previously selected text
            selectedRange.setStartAfter($selectionShareContainer[0]);
            selectedObject.removeAllRanges();
            selectedObject.addRange(selectedRange);

            _positionShareContainer($selectionShareContainer, settings.themes.topLeft);
            _registerServiceIconClickHandler($selectionShareContainer);
            _fadeInSelectionSharerContainer($selectionShareContainer);

            return true;
        }

        return false;
    }

    function _registerServiceIconClickHandler($selectionShareContainer) {
        $selectionShareContainer.find('a').each(function () {
            jQuery(this).on('mousedown', function (event) {
                event.preventDefault();
            });
        });
    }

    return this.each(function () {
        _initSelectionSharer(jQuery(this));
    });

};;jQuery(document).ready(function () {
    $('#front .groupWrapper:first').addClass('firstGroupWrapper');

    if ($('html').attr('class').indexOf('ie') !== -1) {
        $('table tr:first-child').addClass('fstChild');
        $('table tr:odd').addClass('evenChild');
        $('table tr:last-child').addClass('lstChild');
        $('table td:first-child').addClass('fstChild');
        $('table th:first-child').addClass('fstChild');
    }
    lightbox.init('#lightbox', '.storyBodyVideoplayer, .storyBodyLeft.as_videoplayer', 620);
    lightbox.init('#lightbox', '.storyBodyImageGallery, .storyBodyLeftLightbox, .storyBodyLeft.slideshow, .storyBodyImage, a.zoom, .picture.infocus a.zoom, .register-picture-lightbox .tsrImg, .register-picture-lightbox .overlay ', 940);
    $(".multimedia .mmItem, .multimedia .tsrAM, .stories,.as_videoplayer,.slideshow").not(".relatedContents,.aufmacher,#artAufmacher,#artEnde,.teaser11wide,.disable-generate-links").GenerateLinks();

    // generate video overlay icons for articles teaser with video opener
    if (typeof( $().videoOpenerOverlayInjector()) !== 'undefined') {
        $(".videoOpener").videoOpenerOverlayInjector();
    }

    // CCIESC-6066
    var showAuthorBox = function () {
        $(this)
            .parent('.artAuthorSpan')
            .children('.artAuthorBox')
            .show();
        return false;
    };
    var hideAuthorBox = function () {
        $(this)
            .parent('.artAuthorBox')
            .hide();
        return false;
    };
    $('.artAuthorSpan > a')
        .bind('touchstart', showAuthorBox);
    $('.artAuthorBox > .artAuthorBoxClose')
        .bind('touchstart', hideAuthorBox);
    /* START, video autoplay on/off toggler */
    if ($.cookie("autoPlay") !== null && Boolean($.cookie("autoPlay"))) {
        var autoPlay = $.cookie("autoPlay");
        if(autoPlay === "false") {
            $(".videoAutoplayToggler-on").removeClass("active");
            $(".videoAutoplayToggler-off").addClass("active");
        }
    }
    $(".videoAutoplayToggler-on").click(function() {
        $.cookie("autoPlay", $(this).attr("value"), {path:"/"});
        $(this).addClass("active");
        $(".videoAutoplayToggler-off").removeClass("active");
    });
    $(".videoAutoplayToggler-off").click(function() {
        $.cookie("autoPlay", $(this).attr("value"), {path:"/"});
        $(this).addClass("active");
        $(".videoAutoplayToggler-on").removeClass("active");
    });
    /* END video autoplay on/off toggler */
});;/*
 json2.js
 2011-10-19

 Public Domain.

 NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

 See http://www.JSON.org/js.html


 This code should be minified before deployment.
 See http://javascript.crockford.com/jsmin.html

 USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
 NOT CONTROL.


 This file creates a global JSON object containing two methods: stringify
 and parse.

 JSON.stringify(value, replacer, space)
 value       any JavaScript value, usually an object or array.

 replacer    an optional parameter that determines how object
 values are stringified for objects. It can be a
 function or an array of strings.

 space       an optional parameter that specifies the indentation
 of nested structures. If it is omitted, the text will
 be packed without extra whitespace. If it is a number,
 it will specify the number of spaces to indent at each
 level. If it is a string (such as '\t' or '&nbsp;'),
 it contains the characters used to indent at each level.

 This method produces a JSON text from a JavaScript value.

 When an object value is found, if the object contains a toJSON
 method, its toJSON method will be called and the result will be
 stringified. A toJSON method does not serialize: it returns the
 value represented by the name/value pair that should be serialized,
 or undefined if nothing should be serialized. The toJSON method
 will be passed the key associated with the value, and this will be
 bound to the value

 For example, this would serialize Dates as ISO strings.

 Date.prototype.toJSON = function (key) {
 function f(n) {
 // Format integers to have at least two digits.
 return n < 10 ? '0' + n : n;
 }

 return this.getUTCFullYear()   + '-' +
 f(this.getUTCMonth() + 1) + '-' +
 f(this.getUTCDate())      + 'T' +
 f(this.getUTCHours())     + ':' +
 f(this.getUTCMinutes())   + ':' +
 f(this.getUTCSeconds())   + 'Z';
 };

 You can provide an optional replacer method. It will be passed the
 key and value of each member, with this bound to the containing
 object. The value that is returned from your method will be
 serialized. If your method returns undefined, then the member will
 be excluded from the serialization.

 If the replacer parameter is an array of strings, then it will be
 used to select the members to be serialized. It filters the results
 such that only members with keys listed in the replacer array are
 stringified.

 Values that do not have JSON representations, such as undefined or
 functions, will not be serialized. Such values in objects will be
 dropped; in arrays they will be replaced with null. You can use
 a replacer function to replace those with JSON values.
 JSON.stringify(undefined) returns undefined.

 The optional space parameter produces a stringification of the
 value that is filled with line breaks and indentation to make it
 easier to read.

 If the space parameter is a non-empty string, then that string will
 be used for indentation. If the space parameter is a number, then
 the indentation will be that many spaces.

 Example:

 text = JSON.stringify(['e', {pluribus: 'unum'}]);
 // text is '["e",{"pluribus":"unum"}]'


 text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
 // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

 text = JSON.stringify([new Date()], function (key, value) {
 return this[key] instanceof Date ?
 'Date(' + this[key] + ')' : value;
 });
 // text is '["Date(---current time---)"]'


 JSON.parse(text, reviver)
 This method parses a JSON text to produce an object or array.
 It can throw a SyntaxError exception.

 The optional reviver parameter is a function that can filter and
 transform the results. It receives each of the keys and values,
 and its return value is used instead of the original value.
 If it returns what it received, then the structure is not modified.
 If it returns undefined then the member is deleted.

 Example:

 // Parse the text. Values that look like ISO date strings will
 // be converted to Date objects.

 myData = JSON.parse(text, function (key, value) {
 var a;
 if (typeof value === 'string') {
 a =
 /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
 if (a) {
 return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
 +a[5], +a[6]));
 }
 }
 return value;
 });

 myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
 var d;
 if (typeof value === 'string' &&
 value.slice(0, 5) === 'Date(' &&
 value.slice(-1) === ')') {
 d = new Date(value.slice(5, -1));
 if (d) {
 return d;
 }
 }
 return value;
 });


 This is a reference implementation. You are free to copy, modify, or
 redistribute.
 */

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
 call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
 getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
 lastIndex, length, parse, prototype, push, replace, slice, stringify,
 test, toJSON, toString, valueOf
 */


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
                Boolean.prototype.toJSON = function (key) {
                    return this.valueOf();
                };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

                return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

            case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

                if (!value) {
                    return 'null';
                }

// Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

// Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                    v = partial.length === 0
                        ? '[]'
                        : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

// If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

// Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

                v = partial.length === 0
                    ? '{}'
                    : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());;try {
if (typeof window.localStorage == 'undefined' || typeof window.sessionStorage == 'undefined') (function () {
var Storage = function (type) {
  function createCookie(name, value, days) {
    var date, expires;

    if (days) {
      date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      expires = "; expires="+date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=",
        ca = document.cookie.split(';'),
        i, c;

    for (i=0; i < ca.length; i++) {
      c = ca[i];
      while (c.charAt(0)==' ') {
        c = c.substring(1,c.length);
      }

      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length,c.length);
      }
    }
    return null;
  }
  
  function setData(data) {
    data = JSON.stringify(data);
    if (type == 'session') {
      window.name = data;
    } else {
      createCookie('localStorage', data, 365);
    }
  }
  
  function clearData() {
    if (type == 'session') {
      window.name = '';
    } else {
      createCookie('localStorage', '', 365);
    }
  }
  
  function getData() {
    var data = type == 'session' ? window.name : readCookie('localStorage');
    return data ? JSON.parse(data) : {};
  }


  // initialise if there's already data
  var data = getData();

  return {
    length: 0,
    clear: function () {
      data = {};
      this.length = 0;
      clearData();
    },
    getItem: function (key) {
      return data[key] === undefined ? null : data[key];
    },
    key: function (i) {
      // not perfect, but works
      var ctr = 0;
      for (var k in data) {
        if (ctr == i) return k;
        else ctr++;
      }
      return null;
    },
    removeItem: function (key) {
      delete data[key];
      this.length--;
      setData(data);
    },
    setItem: function (key, value) {
      data[key] = value+''; // forces the value to a string
      this.length++;
      setData(data);
    }
  };
};

if (typeof window.localStorage == 'undefined') window.localStorage = new Storage('local');
if (typeof window.sessionStorage == 'undefined') window.sessionStorage = new Storage('session');

})();
} catch (e) {
}

;if('undefined' != typeof jQuery
    && 'function' == typeof $.prototype.autocomplete)
{

    $(function() {
        var suggestionInputSelector = '.search.simpleForm .ui-autocomplete-input';
        var suggestionFormSelector = '.search #SimpleSearchForm';

        // attach autocomplete
        
        if($(suggestionInputSelector).length == 0) {
        	return;
        }
        
        var autoComplete = $(suggestionInputSelector).autocomplete({
            minLength: 2,

            // define callback to format results
            source: function(req, add) {

                // remove not alphanumeric chars + CCIESC-4702 german special characters and space
                var term = $.trim(req.term.replace(/[^a-zA-Z0-9äöüÄÖÜß ]/g, ''));

                // pass request to server
                $.getJSON("/suggestion_service/" + term, function(data) {

                    // create array for response objects
                    var suggestions = [];

                    if (0 < data[1].length) {
                        $.each(data[1], function(key, val) {
                            var item = new Object();
                            item.value = val;
                            item.key = key;

                            item.isLast = key == data[1].length - 1;

                            suggestions.push(item);
                        });
                    }

                    //pass array to callback
                    add(suggestions);
                });
            },
            open: function(event, ui) {
                $(this).autocomplete('widget').css('z-index','445');
            },
            select: function(event, ui) {
                var value = ui.item.label;
                // remove html tags <strong>
                value = value.replace(/<\S[^><]*>/g, "");
                $(suggestionInputSelector).val(value);
                $(suggestionFormSelector).submit();
            }
        });
        
        if(autoComplete.data("autocomplete")._renderItem == undefined) {
        	return;
        }
        
        autoComplete.data("autocomplete")._renderItem = function(ul, item) {
            var listItem = $('<li></li>').data("item.autocomplete", item)
                                         .appendTo(ul);

            var inputField = $(suggestionInputSelector);
            var term = '';

            if (0 < inputField.length) {
                term = inputField.val().toLowerCase();
            }

            // search term has to be strong
            if ('undefined' != typeof item.label) {
                if (0 < term.length) {
                    item.label = item.label.replace(term, '<strong>' + term + '</strong>');
                }
                listItem.append('<a>' + item.label + '</a>');
            }

            // css class for first element
            if (0 == item.key) {
                listItem.addClass('first');
            }

            // css class for last element
            if (true === item.isLast) {
                listItem.addClass('last');
            }

            // css class for alternate coloring
            if (1 == item.key % 2) {
                listItem.addClass('odd');
            }

            return listItem;
        }
    });
}
;
jQuery(document).ready(
	function($){
		if('function'!==typeof $.cookie){
			return'Cookie function not available.';
		}
		var mAncor="#topMenu a[href*='m.welt.de']";
		var mSwitchPattern=/(ASMobileSwitch=)/g;
		var mDevicePattern=/(mdr_browser=)/g;

		/* new cookie pattern for mobile confirm popup */
		var mChoosePattern=/(ASwwwfirst=)/g;
		
		if(mSwitchPattern.test(document.cookie)==true){
			if(mDevicePattern.test(document.cookie)==true){

				if($.cookie('mdr_browser')=='mobile'){
					$(mAncor).click(function(){
						$.cookie('ASMobileSwitch',null,{
							domain:'welt.de',
							path:'/'
						});
						return true;
					});

					if($.cookie('mBanner')!='false'){
						$('<div/>',{
                            id:'mSwitch'
                        }).prependTo("body");
						var mBannerHTML="<div class=\"desktop\">Klassisch</div><div class=\"mobil\"><a href=\"http://m.welt.de\">Mobil</a></div><div class=\"hide\"><a href=\"#\">Ausblenden</a></div>";
						$('#mSwitch').html(mBannerHTML).slideDown('slow');

						$('#mSwitch .mobil a').click(function(){
							$.cookie('ASMobileSwitch',null,{
								domain:'welt.de',
								path:'/'});
							return true;
						});

						$('#mSwitch .hide a').click(function(){
							$.cookie('mBanner','false');
							$('#mSwitch').slideUp('slow');
						});
					}
				}

                /* START mobile confirm popup */
                if(mChoosePattern.test(document.cookie)==true){
                    if($.cookie('ASwwwfirst')=='target=choose'){
                        var confirmResponse = confirm('Wechseln Sie zur mobilen Ansicht dieser Seite');
                        if (confirmResponse) {
                            $.cookie('ASMobileSwitch',null,{
                                domain:'welt.de',
                                path:'/'
                            });
                            $.cookie('ASwwwfirst','target=mobile',{
                                expires: 30,
                                domain:'welt.de',
                                path:'/'
                            });
                            location.href="http://m.welt.de/";
                        } else {
                            $.cookie('ASwwwfirst','target=www',{
                                expires: 30,
                                domain:'welt.de',
                                path:'/'
                            });
                        }
                    }
                }
                /* END mobile confirm popup */

			}
		}
	}
);;
// SocialMedia Optout Ersatztext
var optoutHTML = "Sie haben die Social-Media Funktionen bei Welt Online deaktiviert.<br /> Klicken Sie <a href=\"#\" onclick=\"$.cookie('ASsocialOptout', null,{domain:'welt.de',path:'/'});location.reload();return false;\">hier</a> um die Social-Media Funktionen wieder zu aktivieren.";

// SocialMedia Optout Ersatztext - per Sectionparameter überschrieben
if (typeof (optoutpreLinkText)!= "undefined" && typeof (optoutLinkText)!="undefined" && typeof(optoutpostLinkText)!="undefined") {
    optoutHTML =  optoutpreLinkText + " <a href=\"#\" onclick=\"$.cookie('ASsocialOptout', null,{domain:'welt.de',path:'/'});location.reload();return false;\">" + optoutLinkText + "</a> " + optoutpostLinkText;
}

// SocialMedia-Optout Cookie abfragen
if ($.cookie != undefined && $.cookie('ASsocialOptout')!='true') {

// kein Optout Cookie - SocialMedia Buttons rendern
    $('.socialMedia .google, .socialMedia .fbook, .socialMedia .twitter, .socialMedia .email, .socialMedia .commentCount').show();
// Google +1 Button
    window.___gcfg={lang:'de'};(function(){var po=document.createElement('script');po.type='text/javascript';po.async = true;po.src = 'https://apis.google.com/js/plusone.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);  })();
// Twitter Button
    (function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs"));
// FB Button
    if (0 == $('.fb-root').length) {
      $('body').prepend('<div class="fb-root"></div>');
    }
    (function(d){var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}js = d.createElement('script'); js.id = id; js.async = true;js.src = "//connect.facebook.net/de_DE/all.js#xfbml=1";d.getElementsByTagName('head')[0].appendChild(js);}(document));

} else {
// SocialMedia Optout Cookie gesetzt - Ersatztext anzeigen
    $('.socialMedia .google, .socialMedia .fbook, .socialMedia .twitter, .socMedArtMarginal .email, .socialMedia .socMedIntro, .socMedArtMarginal .commentCount, a.share ').hide();
    $('a.share').css('right','10000px');
    $('.socialMedia .optoutSocMed').html(optoutHTML).show();
    $('.socMedArtMarginal .content, .socMedArtContent .content').css('height','auto');
    $('#artAufmacher.picture span.caption, #artEnde.picture span.caption ').css('padding-bottom','20px');
    $('#artAufmacher.video span.text, #artEnde.video span.text').css('padding-bottom','0');
    $('.socMedChaStage .optoutSocMed, .socMedChaMarginal .optoutSocMed').css({'border-top':'solid 1px #A7AFB4','padding-top':'10px'});


}

function renderSocialButtons() {
    // SocialMedia-Optout Cookie abfragen
    if ($.cookie != undefined && $.cookie('ASsocialOptout')!='true') {
	// Facebook
	if(typeof FB === "object") {
		FB.XFBML.parse();
	} else {
        if (0 == $('.fb-root').length) {
            $('body').prepend('<div class="fb-root"></div>');
        }
		(function(d){
			var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
			js = d.createElement('script'); js.id = id; js.async = true;
			js.src = "//connect.facebook.net/de_DE/all.js#xfbml=1";
			d.getElementsByTagName('head')[0].appendChild(js);
		}(document));
	}

	// Twitter
	if(typeof twttr === "object") {
		twttr.widgets.load();
	} else {
		(function(d,s,id) {
			var js,fjs=d.getElementsByTagName(s)[0];
			if(!d.getElementById(id)){
				js=d.createElement(s);
				js.id=id;
				js.src="//platform.twitter.com/widgets.js";
				fjs.parentNode.insertBefore(js,fjs);
			}
		}(document,"script","twitter-wjs"));
	}

	// Google+
	if(typeof gapi === "object") {
		gapi.plusone.go();
	}

    } else {
        $('.socMedMediaHead .email, .socMedMediaHead .fbook, .socMedMediaHead .twitter, .socMedMediaHead .google, .socMedMediaHead .header').hide();
    }
};$(document).scroll(function() {
/* configure scrollheight in pixel to fadeIn the stickyButton */
    var scrollHeightForDisplayingStickyButton = 400;
    var y = $(this).scrollTop();
    if (y > scrollHeightForDisplayingStickyButton) {
        $('.stickyBtnHome').fadeIn();
        adjustStickyBtn($('.stickyBtnHome'),$("#content").offset().left, "left");
    } else {
        $('.stickyBtnHome').fadeOut();
    }
});

$(window).resize(function(){
    adjustStickyBtn($('.stickyBtnHome'),$("#content").offset().left, "left");
});

function adjustStickyBtn(stickyObj, contentOffsetLeft, alignTo) {
    contentOffsetLeft = contentOffsetLeft - 113;
    if(alignTo === "right")
        contentOffsetLeft = contentOffsetLeft + $(".stickyBtnHome").height() + $("#content").width() ;
    stickyObj.css({"left":contentOffsetLeft});
};(function ($) {
		$.fn.videoOpenerOverlayInjector = function () {
			var $this = this;
			return this.each( function () {
				if ($(this).parent().css("display") == "none") {
					var tImg = $(this).parent().parent().find("img");
					var offTop = tImg.position().top;
					var cHeight = tImg.height();
					var cWidth = tImg.width();
					$(this).parent().css({
						"width": cWidth,
						"height": cHeight,
						"marginTop": offTop,
						"display": "block"
					});
				}
			});
		};
	})(jQuery);

