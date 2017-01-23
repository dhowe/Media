/**
 * Event Tracking Analytics
 * by PixelMedia
 * Copyright 2014 All Rights Reserved
 * version 0.0.2
 */
(function($) {
  if(!$) { return; }

  var domainWhitelist = [
    'iapp.org',
    'www.iapp.org',
    'privacyassociation.org',
    'www.privacyassociation.org'
  ];

  var downloadExts = [ 'pdf', 'doc', 'docx', 'xlsx', 'xls', 'zip' ];
  var formsToTrack = ".iapp-track-form, .lead-form";

  // make sure we can be loaded before gaq
  _gaq = window._gaq || [];

  var Event = function(category, action, label, value) {
    this.category = category;
    this.action = action;
    this.label = label;
    this.value = value;

    this.toGA = function() {
      var e = [];
      e.push('_trackEvent');
      this.category ? e.push(this.category):0;
      this.action ? e.push(this.action):0;
      this.label ? e.push(this.label):0;
      this.value ? e.push(this.value):0;
      return e;
    };

    return this;
  };

  var checkSocialMediaEvents = function(target) {
    if($(target).parents('#social-media').length) {
      var title = $(target).attr('title');

      if(title) {
        return new Event('Social', 'Click', title);
      } else {
        var iconAlt = $(target).find('img').eq(0).attr("alt");
        return new Event('Social', 'Click', iconAlt);
      }
    }
  };

  var checkHeroClickEvents = function(target) {
    if($(target).hasClass('hero-head-link')) {
      var href = $(target).attr('href');

      if(href) {
        return new Event('Hero', 'Click', href);
      }
    }
  };

  var domainRegex = /\:\/\/([\.\w\d_-]+)/
  var checkOutboundEvents = function(target) {
    var href = $(target).attr('href');
    var m = domainRegex.exec(href);
    var domain =  m ? m[1] : "";
    var sameDomain = (document.domain && domain.match(document.domain)) ? true : false;
    var lLabel = href;
    if($(target).children('img').attr('alt')) {
      var adSize = $(target).children('img').attr('alt');
      lLabel = adSize + ': ' + href;
    }

    if(!sameDomain && href.match(/^https?\:/i)) {
      var isWhitelisted = false;

      $.each(domainWhitelist, function(i, v) {
        if(domain === v) {
          isWhitelisted = true;
        }
      });

      if(!isWhitelisted) {
        return new Event('Outbound', 'Click', lLabel);
      }
    }
  };

  var emailRegex = /^mailto\:(.*)$/;
  var checkMailtoEvents = function(target) {
    var href = $(target).attr('href');
    var m = emailRegex.exec(href);

    if(m) {
      var email = m[1];

      return new Event('Contact', 'Email', email);
    }
  };

  var telRegex = /^tel\:(.*)$/;
  var checkTelEvents = function(target) {
    var href = $(target).attr('href');
    var m = telRegex.exec(href);

    if(m) {
      var telephone = m[1];

      return new Event('Contact', 'Call', telephone);
    }
  };

  var titleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  var filePathRegex = /\/([\w-]+)\/([\w-]+?)\.(.{1,4})$/
  var checkDownloadEvents = function(target) {
    var href = $(target).attr('href');
    var m = filePathRegex.exec(href);

    if(m) {
      var fileExt  = m[3];
      var fileBase = m[2];
      var fileFolder = m[1].replace(/\-/, ' ');
      //fileFolder = titleCase(fileFolder);
  

      if($.inArray(fileExt, downloadExts) >= 0) {
        return new Event('Download', fileFolder, fileBase + '.' + fileExt);
      }
    }
  };

  var checkFormEvents = function(target) {
    var id = $(target).attr('id');

    if (id === 'frm-contact-us') {
      return new Event('Contact', 'Form', id);
    }
    else {
      return new Event('Submit', 'Form', id);
    }
  };

  var processEvents = function(events) {
    // process first (highest priority) only
    var e = events[0];

    if (_gaq.length) {
    _gaq.push(e.toGA());
  } else if (ga.length) {
    ga('send', 'event', e.category, e.action, e.label, e.value);
  }
  };

  //onload
  $(function() {
    var formSubmit = function(ev) {
      var $this = $(this);
      var events = [];

      try {
        events.push(checkFormEvents(this));

        var events = $.map(events, function(v, i) {
          if(v) {
            return v;
          }
          return null;
        });

        if(events.length) {
          processEvents(events);
        }
      } catch(e) { }
    };
    $(document).on('submit', formsToTrack, formSubmit);

    $(document).on('click', 'a', function(ev) {
      var target = $(this).attr('target');
      var href = $(this).attr('href');
      var events = [];

      try {
        events.push(checkSocialMediaEvents(this));
        events.push(checkHeroClickEvents(this));
        events.push(checkOutboundEvents(this));
        events.push(checkMailtoEvents(this));
        events.push(checkTelEvents(this));
        events.push(checkDownloadEvents(this));

        var events = $.map(events, function(v, i) {
          if(v) {
            return v;
          }
          return null;
        });

        if(events.length) {
          processEvents(events);

          if(!target || target !== "_blank") {
            setTimeout(function() {
              location.href = href;
            }, 400);
            return false;
          }
        }
      } catch(e) { }
    });

    // intercept jwplayer "plays"
    if(window.jwplayer) {
      var hasPlayed = false;
      var hasCompleted = false;

      jwplayer('my-video').onPlay(function(prevState) {
        var events = [];

        try {
          if(!hasPlayed) {
            var videoTitle = $('div p strong').eq(0).text();

            if(!videoTitle || videoTitle === "") {
              videoTitle = this.getPlaylistItem().title;
            }

            if(location.pathname.match(/webinar/)) {
              events.push(new Event('Webinar', 'Play', videoTitle));
            } else {
              events.push(new Event('Video', 'Play', videoTitle));
            }

            hasPlayed = true;
            processEvents(events);
          } 
        } catch(e) { }
      });
      jwplayer('my-video').onComplete(function() {
        var events = [];

        try {
          if(!hasCompleted) {
            var videoTitle = $('div p strong').eq(0).text();

            if(!videoTitle || videoTitle === "") {
              videoTitle = this.getPlaylistItem().title;
            }

            if(location.pathname.match(/webinar/)) {
              events.push(new Event('Webinar', 'Complete', videoTitle));
            } else {
              events.push(new Event('Video', 'Complete', videoTitle));
            }

            hasCompleted = true;
            processEvents(events);
          } 
          
        } catch(e) {}
      });
    }
  });
})(jQuery);
