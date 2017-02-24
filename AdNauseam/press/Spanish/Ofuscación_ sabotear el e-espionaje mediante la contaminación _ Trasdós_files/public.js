/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    function converted(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            return config.json ? JSON.parse(s) : s;
        } catch(er) {}
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                config.raw ? key : encodeURIComponent(key),
                '=',
                config.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        var result = key ? undefined : {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = decode(parts.join('='));

            if (key && key === name) {
                result = converted(cookie);
                break;
            }

            if (!key) {
                result[name] = converted(cookie);
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== undefined) {
            // Must not alter options, thus extending a fresh object...
            $.cookie(key, '', $.extend({}, options, { expires: -1 }));
            return true;
        }
        return false;
    };

}));

/**
 * AJAXified commenting system
 *
 * @see inspired by http://www.makeuseof.com/tag/ajaxify-wordpress-comments/
 */

jQuery('document').ready(function(jQuery)
{
    var commentform = jQuery('#commentform'); // find the comment form
    commentform.prepend('<div id="comment-status" ></div>'); // add info panel before the form to provide feedback or errors
    var statusdiv = jQuery('#comment-status'); // define the infopanel

    function proccErrorMessage(result)
    {
        var message = result.match(/<body [\s\S]*>([\s\S]*)<\/body>/);
        var errorMessage = message[0].replace(/(\r\n|\n|\r)/gm,"").replace(/<\/body>/, '').replace(/<body.*?>/, '');
        statusdiv.html(errorMessage).addClass('ajax-error').removeClass('ajax-success');
        jQuery(document).scrollTop(jQuery('#comment-status').offset().top );
    }

    commentform.submit(function()
    {
        //serialize and store form data in a variable
        var formdata = commentform.serialize();
        //Add a status message
        statusdiv.html('<p>Processing...</p>');
        //Extract action URL from commentform
        var formurl = commentform.attr('action');
        //Post Form with data
        jQuery.ajax(
            {
                type: 'post',
                url: formurl,
                data: formdata,
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    proccErrorMessage(XMLHttpRequest.responseText);
                },
                success: function(data, textStatus)
                {
                    if (textStatus == "success")
                    {
                        var comment = data.comment;
                        if (jQuery.type(comment) === 'undefined')
                        {
                            proccErrorMessage(data);
                        }
                        else
                        {
                            var comment_date = data.comment_date;
                            statusdiv.html('<p>Gracias por tu comentario.</p>').addClass('ajax-success').removeClass('ajax-error');
                            jQuery('.commentlist:first').append(htmlComment(comment, comment_date));
                            setTimeout(function () {
                                jQuery(document).scrollTop(jQuery('#comment-' + comment.comment_ID).offset().top);
                            }, 300);

                            // Erase comment box
                            commentform.find('textarea[name=comment]').val('');
                        }
                    }
                    else
                    {
                        statusdiv.html('<p>Ha habido un error. Por favor, vuelve a intentarlo más adelante</p>').addClass('ajax-error').removeClass('ajax-success');
                    }
                }
            });
        // Refresh recaptcha
        grecaptcha.reset();
        return false;

    });
});

function htmlComment(comment, comment_date)
{
    var commentContent = comment.comment_content.replace(/(\r\n|\n|\r)/gm, '</p><p>');
    return  '<li class="comment ajax-new-comment depth-1" id="li-comment-' + comment.comment_ID + '">' +
    '<div id="comment-' + comment.comment_ID + '">' +
    '<div class="comment-author vcard">' +
    '<cite class="fn"><a href="' + comment.comment_author_url + '" rel="external nofollow" class="url">' + comment.comment_author + '</a></cite>' +
    '<span class="says"></span>' +
    '</div>' +
    '<p>' + commentContent + '</p>' +
    '<p class="meta"><a href="#comment-' + comment.comment_ID + '">' + comment_date + '</a></p>' +
    '</div>' +
    '</li>';
}

/** Social buttons **/

SocialShareCallbacks = {};

function SocialSharer(permalink, text, idSelector, rssfeed) {

    // Atributes
    this.permalink = permalink;
    this.text = text;
    this.selector = idSelector;
    this.jqObject = jQuery('#' + idSelector);
    this.rssfeed = rssfeed;

}

SocialSharer.prototype = {
    constructor: SocialSharer,

    init: function() {
        this.configureIntents();
    },
    configureIntents: function() {
        var permalink = this.permalink;
        var text = this.text;
        var rssfeed = this.rssfeed;
        this.jqObject.on('click', function(e) {
            var intentUrl = '';
            var jTarget = jQuery(e.target);
            e.preventDefault();
            if (jTarget.hasClass('ui-facebook-like')) {
                intentUrl = 'http://www.facebook.com/sharer.php?u=' + permalink + '&t=' + text;
            }
            if (jTarget.hasClass('ui-twitter-tweet')) {
                intentUrl = 'http://twitter.com/share?url=' + permalink + '&text=' + text + '&via=' + jTarget.data('via');
            }
            if (jTarget.hasClass('ui-google-plusone')) {
                intentUrl = 'https://plus.google.com/share?url=' + permalink;
            }
            if (jTarget.hasClass('ui-meneame-like')) {
                intentUrl = 'http://meneame.net/submit.php?url=' + permalink;
            }
            if (jTarget.hasClass('ui-feedly-like')) {
                intentUrl = 'http://cloud.feedly.com/#subscription/feed/' + rssfeed;
            }
            if (jTarget.hasClass('ui-pocket-like')) {
                intentUrl = 'http://getpocket.com/edit?url=' + permalink;
            }
            if (jTarget.hasClass('ui-tumblr-like')) {
                intentUrl = 'http://www.tumblr.com/share?url=' + permalink;
            }
            if (jTarget.hasClass('ui-linkedin-like')) {
                intentUrl = 'http://www.linkedin.com/shareArticle?mini=true&url='+permalink+'&title='+text+'&source=20minutos';
            }

            if (intentUrl != '') {

                window.open(intentUrl, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=700');
            }
            return false;
        });
    }
};

/**
 *  Responsive Ads
 */

function OAS_AD_RESPONSIVE(position)
{
    if (OAS_listpos_responsive.indexOf(position) != -1)
    {
        var index = position.indexOf('-') + 1;
        OAS_AD(position.substring(index));
    }
}

/**
 * Mobile
 */

var mobile = {};
mobile.init = function() {

    // CONFIGURE MOBILE MENU
    mobile.configureSidebarMenu();

    // SOCIAL SHARING
    var jSharing = jQuery('.ui-social-sharing');
    if (jSharing.length) {
        jSharing.on('click', '.social-more', function(e) {
            e.preventDefault();

            var jLink = jQuery(this);
            var jIcon = jLink.find('.icon-social');

            if (jIcon.hasClass('icon-social-plus')) {
                jIcon.removeClass('icon-social-plus').addClass('icon-social-minus');
                jIcon.parents('.ui-social-sharing').find('.ui-social-extra').show();
            }
            else {
                jIcon.removeClass('icon-social-minus').addClass('icon-social-plus');
                jIcon.parents('.ui-social-sharing').find('.ui-social-extra').hide();
            }
        });
    }

    // SCROLL TOP
    jQuery('.ui-scroll-top').on('click', function(e) {
        e.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, 'fast');
    });

    // Fix images width. If wider than 66% of viewport, grow them to 100% wide
    // It does not apply to Cutlass blog
    if (window.location.href.indexOf('el-bueno-de-cuttlas') < 0) {
        var jqEntry = jQuery('.entry');
        jqEntry.find('img').each(function () {
            if (jQuery(this).width() > jqEntry.width() * 0.66) {
                jQuery(this).css('width', '100%').css('height', 'auto');
            }
        });
    }
};

/**
 * Embed blog menu into 20minutos mobile leftside menu and enable ui behaviours
 */
mobile.configureSidebarMenu = function()
{
    mobile.configureSidebarMenuContent();
    mobile.enableSidebarMenuUX();
};

mobile.configureSidebarMenuContent = function()
{
    var blogTitle = jQuery('.logo').find('a').attr('title');

    // Clone blog navigation menu
    var jBlogMenuElements = jQuery('#mainHeader').find('.navigation').find('ul').clone();
    jBlogMenuElements.find('li').each(function() {
        var jThis = jQuery(this);
        if (jThis.hasClass('busca')) {
            jThis.remove(); // Don't clone search box
        }

        jThis.prepend('<span class="icon icon-next"></span>');
        // Mark active element
        if (document.location.href.indexOf(jThis.find('a').attr('href')) != -1) {
            jThis.addClass('is-active');
        }
    });
    // If there are more than one active element, first one should not be active
    // This is because homepage URL is always a substring of each other section's URL
    if (jBlogMenuElements.find('.is-active').length > 1) {
        jBlogMenuElements.find('.is-active').eq(0).removeClass('is-active');
    }

    var jMenuNewElement =
        jQuery('<li class="is-active is-unfolded"><a href="#">' + blogTitle +
            '<span class="icon icon-fold ui-track" title="Mostrar/ocultar" data-trackxtn2="32"></span></a> </li>');
    jMenuNewElement
        .append(jBlogMenuElements.attr('class', 'menu menu-second'));

    // Insert blog menu items below Blog menu element
    jQuery('#mobilemenu').find('a[href$="/blogs_opinion/"]').parent().after(jMenuNewElement);
};

mobile.enableSidebarMenuUX = function()
{
    /* Layout */
    jQuery('#js-left-btn').on('click', function(e) {
        e.preventDefault();
        var jHtml = jQuery('html');
        jHtml.toggleClass('js-left');

        if (jHtml.is('.js-left'))
        {
            // http://css-tricks.com/snippets/jquery/append-site-overlay-div/
            var docHeight = jQuery(document).height();
            jQuery("#container").append('<div id="overlay"></div>');
            jQuery("#overlay").height(docHeight).on('click touchstart', function(e) {
                e.preventDefault();
                jQuery('#js-left-btn').click();
            });

            jQuery('html, body').css({
                'overflow': 'hidden'
            });

            jQuery(this).data('tracktext', 'Abrir menú');
        }
        else
        {
            jQuery("#overlay").remove();

            jQuery('html, body').css({
                'overflow': 'auto'
            });

            jQuery(this).data('tracktext', 'Cerrar menú');
        }
    });


    /* Menu */
    var jMenu = jQuery('.menu');
    jMenu.on('click', 'a[href=#], .icon', function(e) {
        e.preventDefault();
        var jMixed = jQuery(this);
        if (jMixed.is('.icon') && jMixed.parent('a[href=#]').length === 1)
        {
            return; // avoid double execution
        }

        var jLi = jMixed.parents('li');
        jLi.toggleClass('is-unfolded');

        // Scroll up
        if (jLi.is('.is-unfolded'))
        {
            var jLeft = jQuery('#left');
            var leftHeight = jLeft.height();
            var leftOffset = jLeft.scrollTop();
            var liHeight = jLi.height();
            var liVisibleOffset = jLi.position().top; // retrieve the current position of an element relative to the offset parent

            if (liHeight >= leftHeight)
            {
                jLeft.scrollTop(leftOffset + liVisibleOffset);
            }
            else if (liVisibleOffset + liHeight > leftHeight)
            {
                var increaseOffset = liVisibleOffset + liHeight - leftHeight;
                jLeft.scrollTop(leftOffset + increaseOffset);
            }
        }
    });
};

jQuery('document').ready(function(jQuery) {
    mobile.init();
});

/* iPhone */
(function(window, document, undefined) {
    var docElement = document.documentElement;
    if (navigator.userAgent.match(/iPhone|iPad/g))
    {
        docElement.className = docElement.className + ' device-ios';
    }
})(this, this.document);

/** DFP Adserver **/

DFPHelper = {};
DFPHelper.setupSkin = function (imageURL, clickThroughURL, bgColor, verticalOffset, bgAttachment) {
    var clickTarget = '_blank';  // _blank o _top
    if (verticalOffset == '') {
        verticalOffset = '40px'; // default vertical offset
    }
    if (bgAttachment == '') {
        bgAttachment = 'fixed';  // fixed o scroll
    }
    if (bgColor == '') {
        bgColor = '#ffffff'; // default background color
    }

    var $body = $('body');
    $body
        .addClass('ads-20m-skin')
        .css('background-image', 'url(' + imageURL + ')')
        .css('background-repeat', 'no-repeat')
        .css('background-color', bgColor)
        .css('padding', 0)
        .css('background-attachment', bgAttachment)
        .css('background-position', (verticalOffset == 'top') ? 'center top;' : 'center ' + verticalOffset);

    if (clickThroughURL != '') {
        $body.css('cursor', 'pointer');
        $('body > *').css('cursor', 'default');

        function OpenWin(page) {
            if (clickTarget=="_blank") {
                window.open(page);
            }
            else {
                document.location = page;
            }
        }
        document.onclick=function(e){var bglink=clickThroughURL;EE=e?e:event;if(!EE)return;var tg=EE.target?EE.target:EE.srcElement;if((!tg||tg.tagName!="BODY")&&tg.parentNode.tagName!="BODY")return;var BackLink=OpenWin(""+bglink);};
    }
};
DFPHelper.interstitialLayerId = 'dclk_overlay_' + Math.floor(Math.random() * 10000000000000000);
DFPHelper.closeInterstitial = function() {
    DFPHelper.hideLayer(DFPHelper.interstitialLayerId);
    DFPHelper.removeLayer(DFPHelper.interstitialLayerId);
    document.body.style.overflow = '';
};
DFPHelper.setupInterstitial = function(flashObjectUrl, iframeUrl, imageUrl, clickThroughUrl, reqFlashVersion,
    creativityWidth, creativityHeight, displayTime /*seconds*/, trackerHtml) {

    if (typeof(DoNotDisplayIA) != 'number') { // check for variable preventing multiple pop-ups from appearing

        // Go to button
        var goto20mImg = 'IRa20minutos_2.gif';
        if (document.domain.indexOf('tiempoytemperatura.es') !== -1) {
            goto20mImg = 'IRaTyT_2.gif';
        }
        else if (document.domain.indexOf('20minutos.tv') !== -1) {
            goto20mImg = 'IRa20minutosTV_2.gif';
        }
        else if (document.domain.indexOf('20minutos.com.mx') !== -1) {
            goto20mImg = 'IRa20mMx_2.gif';
        }
        else if (document.domain.indexOf('20minutos.com') !== -1) {
            goto20mImg = 'IRa20mcom_2.gif';
        }
        else if (document.domain.indexOf('esquire.es') !== -1) {
            goto20mImg = 'IRaEsquire_2.gif';
        }
        else if (document.domain.indexOf('harpersbazaar.es') !== -1) {
            goto20mImg = 'IRaHarpersBazaar_2.gif';
        }
        else if (document.domain.indexOf('forbes.es') !== -1) {
            goto20mImg = 'IRaForbes_2.gif';
        }
        else if (document.domain.indexOf('melty.es') !== -1) {
            goto20mImg = 'IRamelty.gif';
        }
        else if (document.domain.indexOf('impuestosrenta.com') !== -1) {
            goto20mImg = 'IRafr_2.gif';
        }
        else if (document.domain.indexOf('gonzoo.com') !== -1) {
            goto20mImg = 'ir-a-gonzoo.png';
        }

        var topButtons =
            '<div style="width: 990px; margin: 10px auto 20px auto; overflow: hidden;">' +
            '<div style="float: left; margin-left: 50px;">' +
            '<a href="' + clickThroughUrl + '" target="_blank" style="text-decoration:none;">' +
            '<img src="http://ads.20m.es/Inter/Visitaranunciante_2.gif" border="0">' +
            '</a>' +
            '</div>' +
            '<div style="float: right; margin-right: 50px;">' +
            '<a href="#" onclick="DFPHelper.closeInterstitial(); return false;" style="text-decoration:none">' +
            '<img border="0" src="http://ads.20m.es/Inter/' + goto20mImg + '">' +
            '</a>' +
            '</div>' +
            '</div>';


        function generateFlashHtml(flashObjectUrl, clickThroughUrl, creativityWidth, creativityHeight) {
            return '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="overlay_12345" width="' +
                creativityWidth + '" height="' + creativityHeight + '"><param name="movie" value="' + flashObjectUrl +
                '" /><param name="flashvars" value="clickTag=' + escape(clickThroughUrl) +
                '&clickTAG=' + escape(clickThroughUrl) + '&clicktag=' + escape(clickThroughUrl) +
                '" /><param name="wmode" value="transparent" /><param name="autostart" value="true" />' +
                '<param name="quality" value="high" /><param name="allowScriptAccess" value="always" />' +
                '<embed wmode="transparent" src="' + flashObjectUrl + '" flashvars="clickTag=' +
                escape(clickThroughUrl) + '&clickTAG=' + escape(clickThroughUrl) + '&clicktag=' +
                escape(clickThroughUrl) + '" swLiveConnect="true" width="' + creativityWidth +
                '" height="' + creativityHeight + '" type="application/x-shockwave-flash" quality="high" allowScriptAccess="always"><\/embed><\/object>';
        }

        function generateIframeHtml(iframeUrl, clickThroughUrl, creativityWidth, creativityHeight) {
            return '<a style="display: block;" href="' + clickThroughUrl + '" target="_blank">' +
                '<iframe width="' + creativityWidth + '" height="' + creativityHeight + '" src="' + iframeUrl + '" scrolling="no"></iframe>' +
                '</a>';
        }

        function generateImageHtml(imageUrl, clickThroughUrl, creativityWidth, creativityHeight) {
            return '<a style="display: block;" href="' + clickThroughUrl + '" target="_blank">' +
                '<img width="' + creativityWidth + '" height="' + creativityHeight + '" src="' + imageUrl+'" border="0" galleryimg="no" />' +
                '</a>';
        }

        // Select creativity
        var creativityHtml = '';
        // Flash
        if (flashObjectUrl != '') {
            // check for Flash player version
            var flashVersion=0;
            var i,a,o,p,s="Shockwave",f="Flash",t=" 2.0",u=s+" "+f,v=s+f+".",rSW=RegExp("^"+u+" (\\d+)");
            if((o=navigator.plugins)&&(p=o[u]||o[u+t])&&(a=p.description.match(rSW)))flashVersion=a[1];
            else if(!!(window.ActiveXObject))for(i=25;i>0;i--)try{if((!!(new ActiveXObject(v+v+i)))&&(flashVersion==0))flashVersion=i}catch(e){}

            if (flashVersion >= (reqFlashVersion * 1)) {
                creativityHtml = generateFlashHtml(flashObjectUrl, clickThroughUrl, creativityWidth, creativityHeight);
            }
            else {
                creativityHtml = generateImageHtml(imageUrl, clickThroughUrl, creativityWidth, creativityHeight);
            }
        }

        // Iframe
        else if (iframeUrl != '') {
            creativityHtml = generateIframeHtml(iframeUrl, clickThroughUrl, creativityWidth, creativityHeight);
        }

        // Image
        else if (imageUrl != '') {
            creativityHtml = generateImageHtml(imageUrl, clickThroughUrl, creativityWidth, creativityHeight);
        }

        var adcode =
            topButtons +
            '<div style="text-align: center; min-width: 990px;">' +
            creativityHtml +
            '</div>' +
            '<div style="position:absolute;top:0;right:0;width:1px !important;height:1px !important;visibility:hidden !important;border:none;">' +
            trackerHtml +
            '</div>';

        var iDiv = document.createElement('div');
        iDiv.id = DFPHelper.interstitialLayerId;
        iDiv.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000000000; background: white;');
        iDiv.innerHTML = adcode;
        document.getElementsByTagName('body')[0].appendChild(iDiv);
        document.body.style.overflow = 'hidden';

        if ((!isNaN(displayTime)) && (displayTime / 1 > 0)) {
            setTimeout(function() { DFPHelper.closeInterstitial(); }, displayTime * 1000);
        }

        DoNotDisplayIA = 1; // set variable preventing multiple pop-ups from appearing
    }
};
DFPHelper.hideLayer = function(layerId) {
    document.getElementById(layerId).style.display = 'none';
};
DFPHelper.removeLayer = function(layerId) {
    if (typeof(document.getElementById(layerId).remove()) == 'function') {
        document.getElementById(layerId).remove();
    }
};
