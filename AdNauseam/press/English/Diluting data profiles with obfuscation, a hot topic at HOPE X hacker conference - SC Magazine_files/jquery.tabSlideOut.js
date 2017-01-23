/*
    tabSlideOUt v1.3
    
    By William Paoli: http://wpaoli.building58.com

    To use you must have an image ready to go as your tab
    Make sure to pass in at minimum the path to the image and its dimensions:
    
    example:
    
        $('#slideOutWrapper').tabSlideOut({
                tabHandle: '.handle',                         //class of the element that will be your tab -doesnt have to be an anchor
                pathToTabImage: 'images/contact_tab.gif',     //relative path to the image for the tab
                imageHeight: '133px',                         //height of tab image
                imageWidth: '44px',                           //width of tab image   
        });

    or you can leave out these options
    and set the image properties using css
    
*/

var shouldSlideOut = 1;
var shouldSlideIn = 1;
var isSlideOutClosed = 0;

//Two new events
//scrollstart & scrollstop
(function () {

    var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);

    special.scrollstart = {
        setup: function () {

            var timer,
                handler = function (evt) {

                    var _self = this,
                        _args = arguments;

                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        jQuery.event.handle.apply(_self, _args);
                    }

                    timer = setTimeout(function () {
                        timer = null;
                    }, special.scrollstop.latency);

                };

            jQuery(this).bind('scroll', handler).data(uid1, handler);

        },
        teardown: function () {
            jQuery(this).unbind('scroll', jQuery(this).data(uid1));
        }
    };

    special.scrollstop = {
        latency: 300,
        setup: function () {

            var timer,
                    handler = function (evt) {

                        var _self = this,
                        _args = arguments;

                        if (timer) {
                            clearTimeout(timer);
                        }

                        timer = setTimeout(function () {

                            timer = null;
                            evt.type = 'scrollstop';
                            jQuery.event.handle.apply(_self, _args);

                        }, special.scrollstop.latency);

                    };

            jQuery(this).bind('scroll', handler).data(uid2, handler);

        },
        teardown: function () {
            jQuery(this).unbind('scroll', jQuery(this).data(uid2));
        }
    };

})();


//Tab slideout event
(function($){
    $.fn.tabSlideOut = function(callerSettings) {
        var settings = $.extend({
            tabHandle: '.handle',
            tabSlideIn: '.handleSlideIn',
            speed: 300, 
            action: 'click',
            tabLocation: 'left',
            topPos: '200px',
            leftPos: '20px',
            fixedPosition: false,
            positioning: 'absolute',
            pathToTabImage: null,
            imageHeight: null,
            imageWidth: null,
            onLoadSlideOut: false                       
        }, callerSettings||{});

       
        settings.tabHandle = $(settings.tabHandle);
        settings.tabSlideIn = $(settings.tabSlideIn);
        var obj = this;
        if (settings.fixedPosition === true) {
            settings.positioning = 'fixed';
        } else {
            settings.positioning = 'absolute';
        }
        
        //ie6 doesn't do well with the fixed option
        if (document.all && !window.opera && !window.XMLHttpRequest) {
            settings.positioning = 'absolute';
        }
        

        
        //set initial tabHandle css
        
        if (settings.pathToTabImage != null) {
            
            settings.tabHandle.css({
            'background' : 'url('+settings.pathToTabImage+') no-repeat',
            'width' : settings.imageWidth,
            'height': settings.imageHeight
            });
        }
        
        //Set tabHandle css
        settings.tabHandle.css({ 
            'display': 'none',
            'textIndent' : '-99999px',
            'outline' : 'none',
            'position' : 'absolute'
        });

        //Set tabHandle css
        settings.tabSlideIn.css({ 
            'display': 'none',
            'textIndent' : '-99999px',
            'outline' : 'none',
            'position' : 'absolute'
        });
        
        obj.css({
            'line-height' : '1',
            'position' : settings.positioning
        });

        
        var properties = {
                    containerWidth: parseInt(obj.outerWidth(), 10) + 'px',
                    containerHeight: parseInt(obj.outerHeight(), 10) + 'px',
                    tabWidth: parseInt(settings.tabHandle.outerWidth(), 10) + 'px',
                    tabHeight: parseInt(settings.tabHandle.outerHeight(), 10) + 'px'
                };

        //set calculated css
        if(settings.tabLocation === 'top' || settings.tabLocation === 'bottom') {
            obj.css({'left' : settings.leftPos});
            settings.tabHandle.css({'right' : 0});
        }
        
        if(settings.tabLocation === 'top') {
            obj.css({'top' : '-' + properties.containerHeight});
            settings.tabHandle.css({'bottom' : '-' + properties.tabHeight});
        }

        if(settings.tabLocation === 'bottom') {
            obj.css({'bottom' : '-' + properties.containerHeight, 'position' : 'fixed'});
            settings.tabHandle.css({'top' : '-' + properties.tabHeight});
            
        }
        
        if(settings.tabLocation === 'left' || settings.tabLocation === 'right') {
            obj.css({
                'height' : properties.containerHeight
                //'top' : settings.topPos
            });   
             

            settings.tabHandle.css({'top' : 0});
        }
        
        if(settings.tabLocation === 'left') {
            obj.css({ 'left': '-' + properties.containerWidth});
            settings.tabHandle.css({'right' : '-' + properties.tabWidth});
        }

        if(settings.tabLocation === 'right') {
            obj.css({ 'right': '-' + properties.containerWidth});
            settings.tabHandle.css({'left' : '-' + properties.tabWidth});
            
            $('html').css('overflow-x', 'hidden');
        }

        //functions for animation events
        
        settings.tabHandle.click(function(event){
            event.preventDefault();
        });
        
        var slideIn = function() {
            $('#slideOutWrapper,.slide-out-div').css('display', 'block');
            if (settings.tabLocation === 'top') {
                obj.animate({top:'-' + properties.containerHeight}, settings.speed).removeClass('open');
            } else if (settings.tabLocation === 'left') {
                obj.animate({left: '-' + properties.containerWidth}, settings.speed).removeClass('open');
            } else if (settings.tabLocation === 'right') {
                obj.animate({right: '-' + properties.containerWidth}, settings.speed).removeClass('open');
            } else if (settings.tabLocation === 'bottom') {
                obj.animate({bottom: '-' + properties.containerHeight}, settings.speed).removeClass('open');
            }

        };


        
        var slideOut = function() {
            
            if (settings.tabLocation == 'top') {
                obj.animate({top:'-3px'},  settings.speed).addClass('open');
            } else if (settings.tabLocation == 'left') {
                obj.animate({left:'-3px'},  settings.speed).addClass('open');
            } else if (settings.tabLocation == 'right') {
                obj.animate({right:'-3px'},  settings.speed).addClass('open');
            } else if (settings.tabLocation == 'bottom') {
                obj.animate({bottom:'-3px'},  settings.speed).addClass('open');
            }
        };

        var clickScreenToClose = function() {
            obj.click(function(event){
                event.stopPropagation();
            });
            
            settings.tabSlideIn.click(function(){
                slideIn();
            });
        };
        
        var clickAction = function(){
            settings.tabHandle.click(function(event){
                if (obj.hasClass('open')) {
                    slideIn();
                } else {
                    slideOut();
                }
                settings.tabHandle.css('display', 'none');
                isSlideOutClosed = 0;
            });            
            
            clickScreenToClose();
        };
        
        var hoverAction = function(){
            obj.hover(
                function(){
                    slideOut();
                },
                
                function(){
                    slideIn();
                });
                
                settings.tabHandle.click(function(event){
                    if (obj.hasClass('open')) {
                        slideIn();
                    }
                });
                clickScreenToClose();
                
        };
        
        var slideOutOnLoad = function(){
            slideIn();
            setTimeout(slideOut, 500);
        };
        
        //choose which type of action to bind
        if (settings.action === 'click') {
            clickAction();            
        }
        
        if (settings.action === 'hover') {
            hoverAction();
        }
        
        if (settings.onLoadSlideOut) {
            slideOutOnLoad();
        };
        
    };
})(jQuery);



function handleScrollEvent() {

        var pageHeight = $(document).height();
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();

        //slide out at 45% from the bottom of the page
        var pendingViewLimit = ($(document).height() * 45) / 100;

        var totalView = scrollTop + windowHeight;
        var pendingView = pageHeight - totalView;

        //initialize
        shouldSlideIn = 0;

        //If scroll position is almost at the bottom (determined by pendingViewLimit)
        if (pendingView < pendingViewLimit) {

            //shouldSlideOut value , if its already slide out then we dont need to slide out again
            if (shouldSlideOut == 1) {

                shouldSlideOut = 0;

                //If the slide out was previously closed by the user, then show the click to open image
                if (isSlideOutClosed == 1) {
                    $('.handle').css('display', 'block');
                }

                //Show the slideout panel
                else {
                    $('.handle').trigger('click');
                }
            }
        }
        //We are not sliding out , so slide in the content
        else {
            shouldSlideIn = 1;
        }

        //If sliding in 
        if (shouldSlideIn == 1) {            
            $('.handleSlideIn').trigger('click');
            $('.handle').css('display', 'none');
            shouldSlideOut = 1;
        }
    }

    //Fix the slideout position on scrolling
    function fixPosition() {
        var elementHeight = $("#slideOutWrapper,.slide-out-div").height();
        $("#slideOutWrapper,.slide-out-div").css({'bottom' : '50px', 'position' : 'fixed'});
    }

    //Handle close button click on the slide out 
    function closeSlideOut() {
        $('.handleSlideIn').trigger('click');
        $('.handle').css('display', 'block');
        isSlideOutClosed = 1;
    }


    function BindEvents() {
        $(window).bind('scrollstop', handleScrollEvent);
        $(window).bind('scroll', fixPosition);
        $('.closeImage').bind('click', closeSlideOut);
    }