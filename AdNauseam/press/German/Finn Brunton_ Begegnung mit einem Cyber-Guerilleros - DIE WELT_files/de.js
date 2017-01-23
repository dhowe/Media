define("xoz/videoplayer/core/Config", [], function() {
    var Config = function() {};
    return Config.prototype.getLayout = function(key, fallback) {
        var module = com.xoz.config.layouts[key];
        return "undefined" == typeof module ? "undefined" == typeof fallback ? !1 : (this.logInfo("falling back to layout '" + fallback + "' from unknown layout '" + key + "'"), this.getLayout(fallback)) : {
            layout_name: key,
            module: module
        };
    }, Config.prototype.getLabel = function(key, category, fallback) {
        var category_object = com.xoz.config.labels[category];
        if ("undefined" != typeof category_object) {
            var result_value = category_object[key];
            if ("undefined" != typeof result_value) return result_value;
        }
        return fallback;
    }, Config.prototype.getConfigValue = function(key, category, fallback) {
        var category_object = com.xoz.config.defaults[category];
        if ("undefined" != typeof
            category_object) {
            var result_value = category_object[key];
            if ("undefined" != typeof result_value) return result_value;
        }
        return this.logWarn('No config value found for "' + key + '" in "' + category + '"! using fallback "' + fallback + '"'), fallback;
    }, Config.prototype.loadCssFile = function(css_file, callback) {
        var css_url = com.xoz.config.css_files[css_file];
        callback = callback || function() {}, com.xoz.events.publish("videoplayer/css/load", css_url, callback);
    }, Config.prototype.guid = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
            return v.toString(16);
        });
    }, new Config;
}), define("xoz/videoplayer/core/Logging", [ "xoz/videoplayer/core/Config" ], function(config) {
    var Logging = function() {
        this.config = config, this.applyLogging(config, "videoplayer/core/Config"
        ), this.setLogLevel(this.config.getConfigValue("log_level", "default", Logging.LEVEL_ALL));
        if (typeof console == "undefined") {
            var empty_function = function() {};
            this.console = {}, this.console.log = empty_function, this.console.error = empty_function, this.console.info = empty_function, this.console.debug = empty_function, this.console.trace = empty_function;
        } else this.console = console, typeof this.console.log == "object" ? (this.console.trace = function() {
            console.log(arguments);
        }, this.console.debug = function() {
            console.log(arguments);
        }) : this.console.trace = function() {
            this.console.log.apply(this, arguments);
        };
    };
    return Logging.prototype.logWithPrefix = function(prefix, log_type, args) {
        var i = 0, logging_exclude_length = Logging.exclude.length;
        for (i = 0; i < logging_exclude_length; i++) if (prefix.match(Logging.exclude[i])) return;
        var logging_include_length =
            Logging.include.length;
        for (i = 0; i < logging_include_length; i++) if (prefix.match(Logging.include[i])) {
            var args_two = Array.prototype.slice.apply(args);
            args_two.unshift("[" + prefix + "]"), typeof console[log_type] == "function" ? console[log_type].apply(console, args_two) : console[log_type](args_two);
            return;
        }
    }, Logging.prototype.logTrace = function() {
        Logging.level >= Logging.LEVEL_TRACE && com.xoz.logger.logWithPrefix(this.logging_prefix, "log", arguments);
    }, Logging.prototype.logDebug = function() {
        Logging.level >= Logging.LEVEL_DEBUG && com.xoz.logger.logWithPrefix(this.logging_prefix, "log", arguments);
    }, Logging.prototype.logInfo = function() {
        Logging.level >= Logging.LEVEL_INFO && com.xoz.logger.logWithPrefix(this.logging_prefix, "info", arguments);
    }, Logging.prototype.logWarn = function() {
        Logging.level >= Logging.LEVEL_WARN && com.xoz.logger.logWithPrefix(this.logging_prefix
            , "warn", arguments);
    }, Logging.prototype.logError = function() {
        Logging.level >= Logging.LEVEL_ERROR && com.xoz.logger.logWithPrefix(this.logging_prefix, "error", arguments);
    }, Logging.prototype.addTracing = function(included_names, excluded_names) {
        var that = this, excluded_logging_names = [ "logTrace", "logError", "logDebug", "logWarn", "logInfo", "addTracing" ];
        excluded_names = excluded_names || [];
        if (!included_names) {
            included_names = [];
            for (var key in this) this.hasOwnProperty(key) && typeof this[key] == "function" && excluded_names.indexOf(key) === -1 && excluded_logging_names.indexOf(key) === -1 && included_names.push(key);
        }
        included_names.forEach(function(function_name) {
            var original_function = that[function_name];
            that[function_name] = function() {
                return that.trace(function_name, arguments), original_function.apply(that, arguments);
            }
            ;
        });
    }, Logging.prototype.applyLogging = function(element, class_name) {
        element.logging_prefix = class_name;
        var logging_functions = [ "logTrace", "logError", "logDebug", "logWarn", "logInfo", "addTracing" ];
        for (var i = 0; i < logging_functions.length; i++) {
            var function_name = logging_functions[i];
            element[function_name] = element[function_name] || this[function_name];
        }
    }, Logging.LEVEL_ALL = 127, Logging.LEVEL_TRACE = 6, Logging.LEVEL_LOG = 5, Logging.LEVEL_DEBUG = 5, Logging.LEVEL_INFO = 4, Logging.LEVEL_WARN = 3, Logging.LEVEL_ERROR = 2, Logging.LEVEL_FATAL = 1, Logging.LEVEL_OFF = 0, Logging.prototype.setLogLevel = function(log_level) {
        Logging.level = log_level;
    }, Logging.include = [ /.*/ ], Logging.exclude = [], new Logging;
}), define("xoz/videoplayer/core/BrowserDetection", [ "xoz/videoplayer/core/Logging", "xoz/videoplayer/core/Config" ], function(logging, config) {
    var BrowserDetection =
        function() {
            logging.applyLogging(this, "videoplayer/core/BrowserDetection"), this.config = config;
        };
    return BrowserDetection.prototype.hasUserFlash = function() {
        if (!0 === this.config.getConfigValue("enable", "flash_detection", !1)) {
            var player_version = !0;
            !0 === this.isIE() ? player_version = this.getActiveXFlashObjectVersion() : player_version = this.getFlashPluginVersion();
            if (!1 === player_version) return !1;
            var player_version_values = player_version.split(","), require_version_values = this.config.getConfigValue("version", "flash_detection", "10.1").split("."), require_version = parseFloat(this.config.getConfigValue("version", "flash_detection", "10.1")), flash_version = parseFloat(player_version_values[0] + "." + player_version_values[1]);
            return !1 === isNaN(require_version) && !1 === isNaN(flash_version) && flash_version >= require_version ? !0 : (this.logError("Flash version not found or to old ! Found: " +
                flash_version + " Require: " + require_version), !1);
        }
        return !0;
    }, BrowserDetection.prototype.getFlashPluginVersion = function() {
        if (navigator.plugins) for (var i = 0; i < navigator.plugins.length; i++) {
            var plugin = navigator.plugins[i], plugin_string = plugin.name + plugin.description;
            if (plugin_string.indexOf("Shockwave") != -1 && plugin_string.indexOf("Flash") != -1) return plugin_string.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
        }
        return !1;
    }, BrowserDetection.prototype.getActiveXFlashObjectVersion = function() {
        try {
            var obj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            if (typeof obj != "undefined") return (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
        } catch (e) {
            return !1;
        }
        return !1;
    }, BrowserDetection.prototype.isIE = function() {

        return navigator.userAgent.match(/MSIE (\d+\.\d+);/i) !== null;
    }, BrowserDetection.prototype.isIE7 = function() {
        return navigator.userAgent.match(/MSIE (7.\d+);/i) !== null;
    }, BrowserDetection.prototype.isIE8 = function() {
        return navigator.userAgent.match(/MSIE 8.[\d];/i) !== null;
    }, BrowserDetection.prototype.isIE10 = function() {
        return navigator.userAgent.match(/MSIE 10.[\d];/i) !== null;
    }, BrowserDetection.prototype.isTouchIE = function() {
        return this.isIE() && navigator.userAgent.match(/Touch/i) !== null;
    }, BrowserDetection.prototype.isMobileIE10 = function() {
        if (!0 === this.isIE10()) {
            var player_version = this.getActiveXFlashObjectVersion();
            if (!1 === player_version || this.isTouchIE()) return !0;
        }
        return !1;
    }, BrowserDetection.prototype.isMac = function() {
        return navigator.userAgent.match(/Mac OS X/i) !== null;
    }, BrowserDetection.prototype.isIPad = function(
        ) {
        return navigator.userAgent.match(/iPad/i) !== null;
    }, BrowserDetection.prototype.isIPhone = function() {
        return navigator.userAgent.match(/iPhone/i) !== null;
    }, BrowserDetection.prototype.isIOS = function() {
        return this.isIPhone() || this.isIPad();
    }, BrowserDetection.prototype.isAndroid = function() {
        return navigator.userAgent.match(/Android/i) !== null;
    }, BrowserDetection.prototype.isMobile = function() {
        return this.isIOS() || this.isAndroid();
    }, BrowserDetection.prototype.isIOS7 = function() {
			return navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i)!==null;
	}, BrowserDetection.prototype.isChrome = function() {
        return navigator.userAgent.match(/Chrome/i) !== null;
    }, BrowserDetection.prototype.isFirefox = function() {
        return navigator.userAgent.match(/Firefox/i) !== null;
    }, BrowserDetection.prototype.isSafari = function() {
        return !this.isChrome() && navigator.userAgent.match(/Safari/i) !== null;
    }, BrowserDetection.prototype.isAndroid = function() {
        return navigator.userAgent.match(/Android/i
        ) !== null;
    }, BrowserDetection.prototype.useHtmlPlayer = function() {
        return !0 === this.isMobile() || this.isMobileIE10() ? !0 : !this.hasUserFlash() && this.canPlayH264Video() ? !0 : !0 === this.isIE10() ? this.config.getConfigValue("ie10", "use_html5_player", !1) : !0 === this.isIE() ? this.config.getConfigValue("ie", "use_html5_player", !1) : !0 === this.isChrome() ? this.config.getConfigValue("chrome", "use_html5_player", !1) : !0 === this.isFirefox() ? this.config.getConfigValue("firefox", "use_html5_player", !1) : !0 === this.isSafari() ? this.config.getConfigValue("safari", "use_html5_player", !1) : !1;
    }, BrowserDetection.prototype.canPlayH264Video = function() {
        if (window.Modernizr && Modernizr.video) return Modernizr.video.h264;
        var video = document.createElement("video");
        return video && video.canPlayType ? video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') : "";
    }, new BrowserDetection;
}), define("xoz/videoplayer/core/Events"
    , [ "xoz/videoplayer/core/Logging" ], function(logging) {
        var Events = function() {
            logging.applyLogging(this, "videoplayer/core/Events"), this.events = {};
        };
        return Events.prototype.publish = function(event_name) {
            if (!this.events[event_name]) return !1;
            var args = [];
            for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
            this.logDebug("publish", event_name, args);
            for (var i = 0, len = this.events[event_name].length; i < len; i++) this.events[event_name][i].apply(this, args);
        }, Events.prototype.subscribe = function(event_name, callback) {
            this.events[event_name] || (this.events[event_name] = []), this.events[event_name].push(callback), this.logTrace("subscribe", event_name);
        }, Events.prototype.unsubscribe = function(event_name, callback) {
            if (!this.events[event_name]) return !1;
            if (callback) for (var i = 0, len = this.events[event_name].length; i < len; i++) this.events[event_name
                ][i] === callback && this.events[event_name].splice(i, 1); else this.events[event_name] = null, delete this.events[event_name];
            this.logDebug("unsubscribe", event_name);
        }, Events;
    }), define("xoz/videoplayer/core/Videoplayer", [ "xoz/videoplayer/core/BrowserDetection", "xoz/videoplayer/core/Config", "xoz/videoplayer/core/Events" ], function(browser_detection, config, Events) {
    var Core = function() {
        com.xoz.logger.applyLogging(this, "videoplayer/core/Videoplayer"), this.logDebug("create a core object"), this.events_class = Events, this.config = config, this.browser_detection = browser_detection, this.instances = {}, this.bindEvents(), this.version = "Version:5.2 Revision:3344 Tag:2014-01-09_09-21";
    };
    return Core.prototype.getVersion = function() {
        return this.version;
    }, Core.prototype.getInstance = function(video_id) {
        var instance = this.instances[video_id];
        return instance ? instance : (this.logError("Instance not found with id "
            , video_id), !1);
    }, Core.prototype.initVideoplayer = function(video_object, use_xml_picture, use_old_channel_xml) {
        var that = this;
        try {
            if (0 == video_object instanceof jQuery) {
                if ("string" != typeof video_object) {
                    this.logError(video_object, " is not a valid string or jquery element");
                    return;
                }
                video_object = jQuery(video_object);
                if ("undefined" == typeof video_object.get(0)) {
                    this.logError("No element found with the id: ", video_object.selector);
                    return;
                }
            }
            this.logDebug("init a new videoplayer with: ", video_object);
            var revolver_count = video_object.attr("data-revolver_count");
            ("undefined" == typeof revolver_count || 0 === revolver_count.length) && video_object.attr("data-revolver_count", 0);
            var xml_src = video_object.attr
                ("data-video");
            if ("undefined" != typeof xml_src && xml_src.length > 0) {
                !0 === use_xml_picture && video_object.data("replace_image", !0);
                var data_layout_attr = video_object.attr("data-layout"), layout_configuration = this.config.getLayout(data_layout_attr, this.config.getConfigValue("layout", "default", "widget")), video_id = video_object.attr("id");
                if ("undefined" == typeof this.instances[video_id]) {
                    var preview_image = video_object.find("> img"), wrapper = jQuery('<div class="video_wrapper"></div>');
                    preview_image.length ? (preview_image.wrap(wrapper), wrapper = preview_image.parent()) : video_object.prepend(wrapper), this.instances[video_id] = {
                        ready_for_initlized: !1,
                        is_ready: !1,
                        video_id: video_id,
                        layout: layout_configuration.layout_name,
                        dom_element: video_object
                        ,
                        wrapper_element: wrapper,
                        events: new this.events_class,
                        xml_data: !1,
                        xml_string: !1,
                        use_old_channel_xml: use_old_channel_xml || !1,
                        xml_src: xml_src,
                        controls: !1,
                        endscreen: {
                            is_endscreen_enabled: !0,
                            is_endscreen_active: !1,
                            endscreen_function: !1,
                            errorscreen_function: !1
                        },
                        tracker: {
                            ivw: !1,
                            webtrekk: !1,
                            google_analytics: !1,
                            remtrack: !1,
                            vast_preroll: !1,
                            vast_postroll: !1
                        },
                        preview_image: !1,

                        html5_instance: !1,
                        flash_instance: !1,
                        start_timecode: !1
                    };
                } else {
                    if (!1 === this.instances[video_id].ready_for_initlized) return;
                    this.instances[video_id].use_old_channel_xml = use_old_channel_xml || !1;
                }
                var loaderDiv = '<div class="loader"><div class="spinner"></div></div>', play_button = jQuery(video_object).find(".play");
                play_button.after(loaderDiv), play_button.addClass("hide"), this.instances[video_id].layout === "bundesliga" ? require([ "xozVideoplayerBundesliga" ], function() {
                    com.xoz.events.publish("videoplayer/xml/load", video_id, "video", xml_src);
                }) : com.xoz.events.publish("videoplayer/xml/load", video_id, "video", xml_src);
            } else this.logWarn("No video xml found for Object:", video_object);
        } catch (exception) {
            this.logError("An error has occurred: " +
                exception.message, exception.stack);
        }
    }, Core.prototype.registerAll = function() {
        var context = jQuery("body");
        this.registerForContext(context);
    }, Core.prototype.registerForContext = function(context) {
        var that = this;
        "object" == typeof context && "undefined" != typeof context.jquery ? context.find(".videoplayer").each(function(index, video_object) {
            var $video_object = jQuery(video_object);
            !0 !== $video_object.data("initialized") ? that.initVideoplayer(jQuery(video_object)) : that.logWarn("video", $video_object.attr("id"), "is already initialized");
        }) : this.logError("context is not a jQuery Object");
    }, Core.prototype.bindEvents = function() {
        var that = this;
        jQuery(window).on("resize", function() {
            that.handleResize();
        }), com.xoz.events.subscribe("videoplayer/register/all", function() {
            that.registerAll();
        }), com.xoz.events.subscribe("videoplayer/register/context"
            , function(video_object, xml_src) {
                "object" == typeof video_object && "undefined" != typeof video_object.jquery && (video_object.attr("data-video", xml_src), that.registerForContext(video_object.parent()));
            }), com.xoz.events.subscribe("videoplayer/xml/loaded", function(video_id, xml_type, xml_data, xml_string) {
            that.logInfo("XML loaded:", video_id, xml_data), that.browser_detection.isIOS() && that.config.getConfigValue("enable_ios_autoplay", "default", !0) && (xml_data.autoplay = "true");
            var video_instance = that.instances[video_id];
            if ("undefined" == typeof video_instance || !1 === video_instance.is_ready) {
                "undefined" != typeof video_instance && (video_instance.xml_data = xml_data, video_instance.xml_string = xml_string);
                var layout_configuration = that.config.getLayout(video_instance.layout);
                that.createControls(video_instance.dom_element, xml_data, layout_configuration);

            } else {
                var old_channel_data = !1, is_endscreen_enabled = !1, revolver_time = !1;
                !0 === video_instance.use_old_channel_xml && (old_channel_data = video_instance.xml_data.channel, revolver_time = video_instance.xml_data.end.revolver_time, is_endscreen_enabled = video_instance.endscreen.is_endscreen_enabled), video_instance.xml_data = xml_data, video_instance.xml_string = xml_string;
                for (var tracker_name in video_instance.tracker) {
                    var tracker = video_instance.tracker[tracker_name];
                    tracker.prepareTrackingFunction && tracker.prepareTrackingFunction();
                }
                that.createInstance(video_instance.dom_element, xml_data, video_instance.controls), !1 !== old_channel_data && (video_instance.xml_data.channel = old_channel_data, video_instance.endscreen.is_endscreen_enabled = is_endscreen_enabled, video_instance.xml_data.end.revolver_time = revolver_time);
            }
        }),
            com.xoz.events.subscribe("videoplayer/remove/instance", function(video_id) {
                that.removeInstance(video_id);
            }), com.xoz.events.subscribe("videoplayer/create/player", function(video_id, timecode) {
            if (timecode) {
                var video_instance = that.instances[video_id];
                video_instance && (video_instance.start_timecode = timecode);
            }
            that.createPlayer(video_id);
        }), com.xoz.events.subscribe("videoplayer/video/finish", function(event_data) {
            var video_instance = that.getVideoInstanceForObjectOrId(event_data.id);
            video_instance.events.publish("videoplayer/video/finished"), that.showEndscreen(event_data.id);
        }), com.xoz.events.subscribe("videoplayer/video/replay", function(event_data) {
            that.replayVideo(event_data.id, event_data.start_timecode);
        }), com.xoz.events.subscribe("videoplayer/video/error", function(event_data) {
            that.showErrorScreen(
                event_data.id, event_data.type);
        }), com.xoz.events.subscribe("videoplayer/video/endscreen/disable", function(event_data) {
            that.disableEndscreen(event_data.id);
        });
    }, Core.prototype.createPlayer = function(video_id) {
        var that = this, video_instance = this.instances[video_id] || !1;
        !1 !== video_instance ? (this.resize(video_instance), !0 === this.browser_detection.useHtmlPlayer() ? that.createPlaylist(video_id, function(playlist) {
            require([ "xoz/videoplayer/core/Video" ], function(Videoplayer) {
                video_instance.html5_instance = new Videoplayer(video_instance.xml_data, video_instance.events, video_instance.dom_element, playlist, video_instance.controls, video_instance.start_timecode), video_instance.controls.setPlayer(video_instance.html5_instance);
            }, function(error) {
                that.logError("Error while loading module", error.requireModules, error, error.stack);
            });
        })
            : require([ "xoz/videoplayer/core/Flash" ], function(Videoplayer) {
            video_instance.flash_instance = new Videoplayer(video_instance, video_instance.controls, video_instance.start_timecode), video_instance.controls.setPlayer(video_instance.flash_instance);
        }, function(error) {
            that.logError("Error while loading module", error.requireModules, error, error.stack);
        })) : this.logError("video id not found");
    }, Core.prototype.createPlaylist = function(video_id, callback) {
        var that = this, video_instance = this.instances[video_id];
        if (video_instance) {
            var xml_data = video_instance.xml_data;
            require([ "xoz/videoplayer/core/VideoPlaylist" ], function(VideoPlaylist) {
                var playlist = new VideoPlaylist;
                "undefined" != typeof xml_data.vast && "undefined" != typeof xml_data.vast.preroll && xml_data.vast.preroll.error !== !0 && (that.logDebug("adding Vast preroll video: ", xml_data.vast
                    .preroll.src), playlist.addVideo(xml_data.vast.preroll.src, "vast_preroll")), "undefined" != typeof xml_data.bumper && "undefined" != typeof xml_data.bumper.preroll && xml_data.bumper.preroll.error !== !1 && playlist.addVideo(xml_data.bumper.preroll.src, "preroll");
                var subtitle_src = !1;
                "undefined" != typeof xml_data.subtitle && "true" === xml_data.subtitle.status && "undefined" != typeof xml_data.subtitle.url && (subtitle_src = xml_data.subtitle.url);
                var is_live_stream = !1;
                "undefined" != typeof xml_data.duration && (1 == xml_data.duration || -1 == xml_data.duration || 1e3 == xml_data.duration) && (is_live_stream = !0);
                var video_src_field = xml_data.src, video_src_field2 = xml_data.src2;
                that.browser_detection.isIOS() && xml_data.srcHLS && (video_src_field2 = video_src_field, video_src_field = xml_data.srcHLS);
                var video = playlist.addVideo(video_src_field, "main", video_src_field2
                    , subtitle_src, is_live_stream);
                "undefined" != typeof xml_data.bumper && "undefined" != typeof xml_data.bumper.postroll && xml_data.bumper.postroll.error !== !1 && playlist.addVideo(xml_data.bumper.postroll.src, "postroll"), "undefined" != typeof xml_data.vast && "undefined" != typeof xml_data.vast.postroll && xml_data.vast.postroll.error !== !0 && (that.logDebug("adding Vast postroll video: ", xml_data.vast.postroll.src), playlist.addVideo(xml_data.vast.postroll.src, "vast_postroll")), !1 === video ? that.showErrorScreen(video_id, "invalid") : callback(playlist);
            }, function(error) {
                that.logError("Error while loading playlist module", error.requireModules, error.stack);
            });
        } else this.logError("video id not found");
    }, Core.prototype.createInstance = function(video_object, xml_data, controls) {
        var video_id = video_object.attr("id"), xml_src = this.instances[video_id].xml_src, video_instance = this.instances
            [video_id], endscreen_function = xml_data.end && xml_data.end.end_function ? xml_data.end.end_function : !1, errorscreen_function = xml_data.end && xml_data.end.error_function ? xml_data.end.error_function : !1, endscreen_enabled = xml_data.end && xml_data.end.status == "true" ? !0 : !1;
        video_instance.is_ready = !0, video_instance.xml_data = xml_data, video_instance.xml_src = xml_src, video_instance.controls = controls, video_instance.start_timecode = !1, video_instance.endscreen = {
            is_endscreen_active: !1,
            endscreen_function: endscreen_function,
            errorscreen_function: errorscreen_function,
            is_endscreen_enabled: endscreen_enabled
        };
        var layout_configuration = this.config.getLayout(video_instance.layout);
        video_object.addClass(layout_configuration.layout_name), video_instance.preview_image = this.checkPreviewImage(video_object, xml_data);
        var that = this;
        setTimeout(function() {
            var size =
                that.getPlayerType(video_object.width());
            video_object.attr("data-player-size", size), video_object.addClass(size);
        }, 200), video_object.data("initialized", !0), com.xoz.events.publish("videoplayer/initialized"), video_object.find(".loader").remove(), video_object.addClass("initialized"), video_object.find(".play").removeClass("hide"), video_instance.preview_image.off(window.com.xoz.click_event).on(window.com.xoz.click_event, function(event) {
            event.preventDefault(), video_object.trigger("mousemove"), video_instance.preview_image.off(window.com.xoz.click_event),
                video_instance.tracker.ivw.onUserInitiate(),
                video_instance.controls.initializePlayer();
        }), "true" == video_object.attr("data-autoplay") && (xml_data.autoplay = "true", video_object.removeAttr("data-autoplay")), "true" == xml_data.autoplay && video_instance.controls.initializePlayer();
    }, Core.prototype.removeInstance = function(video_id) {
        this.instances[video_id].dom_element.remove(), this.instances[video_id] = null, delete
            this.instances[video_id];
    }, Core.prototype.checkPreviewImage = function(video_object, xml_data) {
        var src = "", wrapper = video_object.find(".video_wrapper"), preview_image = wrapper.find("> img") || wrapper.prepend(jQuery("<img/>"));
        return video_object.data("replace_image") && (src = xml_data.img || this.config.getConfigValue("preview_image", "fallback", ""), preview_image.attr("src", src)), preview_image;
    }, Core.prototype.getXMLString = function(video_id) {
        this.logDebug("calling getXMLString");
        var video_instance = this.instances[video_id];
        return "undefined" != typeof video_instance ? (this.logDebug("video instance found"), "undefined" !== video_instance.xml_string ? (this.logDebug("xml_string found: " + video_instance.xml_string), video_instance.xml_string) : "no xml_string found") : "no video_instance found";
    }, Core.prototype.disableEndscreen = function(video_id) {
        var video_instance = this.getInstance(video_id);

        return video_instance ? (video_instance.endscreen.is_endscreen_enabled = !1, !0) : !1;
    }, Core.prototype.createControls = function(video_object, xml_data, layout_configuration) {
        var that = this, control_modules = [ "xoz/videoplayer/core/Controls", "xoz/videoplayer/modules/tracker/Ivw", "xoz/videoplayer/modules/tracker/Tracker", "xoz/videoplayer/modules/tracker/Vast" ];
        control_modules.push(layout_configuration.module), require(control_modules, function(Controls, IvwTracker, Tracker, VastTracker, ControlLayout) {
            var like_url = !1;
            xml_data.share && xml_data.share.status && xml_data.share.bookmarks.Facebook && (like_url = xml_data.share.bookmarks.Facebook.url);
            var video_instance = that.getVideoInstanceForObjectOrId(video_object.attr("id")), control_layout = new ControlLayout, controls = new Controls(video_instance, video_instance.events, video_instance.xml_data, video_object, control_layout, like_url);
            that.config.loadCssFile
            (layout_configuration.layout_name, function() {
                controls.controls_element.removeClass("hide");
            }), xml_data.ivw && xml_data.tracking && xml_data.tracking == "true" && (video_instance.tracker.ivw = new IvwTracker(video_instance.events, video_object, xml_data.ivw)), video_instance.tracker.webtrekk = new Tracker(video_instance, "track", "webtrekk"), video_instance.tracker.google_analytics = new Tracker(video_instance, "google_analytics", "google_analytics"), video_instance.tracker.remtrack = new Tracker(video_instance, "remtrack", "remtrack"), that.config.getConfigValue("enable", "vast_ads", !1) && ("undefined" != typeof xml_data.vast && "undefined" != typeof xml_data.vast.preroll && xml_data.vast.preroll.error !== !0 && (video_instance.tracker.vast_preroll = new VastTracker(video_instance, xml_data.vast.preroll, "vast_preroll", "vast_preroll")), "undefined" != typeof xml_data.vast && "undefined" != typeof xml_data.vast.postroll && xml_data.vast.postroll.error !== !0 &&
                (video_instance.tracker.vast_postroll = new VastTracker(video_instance, xml_data.vast.postroll, "vast_postroll", "vast_postroll"))), that.createInstance(video_object, xml_data, controls);
        }, function(error) {
            that.logError("Error while loading module", error.requireModules, error, error.stack);
        });
    }, Core.prototype.replayVideo = function(video_id, timecode) {
        var video_instance = this.instances[video_id];
        "undefined" != typeof video_instance && (video_instance.start_timecode = timecode ? timecode : !1, !0 === video_instance.endscreen.is_endscreen_active && video_instance.endscreen.instance.destroy(), video_instance.endscreen.instance = !1, video_instance.endscreen.is_endscreen_active = !1, video_instance.controls.restore(), video_instance.controls.initializePlayer());
    }, Core.prototype.showEndscreen = function(video_id) {
        var video_instance = this.getInstance(video_id);
        if (video_instance) {
            video_instance.
                ready_for_initlized = !0, !1 !== video_instance.html5_instance && (video_instance.html5_instance.destroy(), video_instance.html5_instance = !1), !1 !== video_instance.flash_instance && (video_instance.flash_instance.destroy(), video_instance.flash_instance = !1);
            if ("true" == video_instance.xml_data.autorepeat) {
                this.createPlayer(video_id);
                return;
            }
            if (this.getPlayerType(video_instance.dom_element.width()) === "micro" || !video_instance.endscreen.is_endscreen_enabled) this.showStartscreen(video_id); else if (video_instance.endscreen.endscreen_function) {
                var end_function = video_instance.endscreen.endscreen_function.replace("%DOM_ID%", '"' + video_id + '"').replace("%VIDEO_ID%", '"' + video_instance.xml_data.id + '"');
                eval(end_function), video_instance.dom_element.removeClass("playing");
            } else if (video_instance.endscreen.is_endscreen_enabled && !video_instance.is_endscreen_active
                ) {
                video_instance.controls.destroy(!0);
                var endscreen_module = "bundesliga" === video_instance.layout ? "xoz/videoplayer/modules/bundesliga/Endscreen" : "xoz/videoplayer/modules/screens/End", that = this;
                require([ endscreen_module ], function(Endscreen) {
                    var endscreen = new Endscreen(video_instance);
                    that.resize(video_instance), "function" == typeof endscreen.showEndscreen && endscreen.showEndscreen(), video_instance.endscreen.instance = endscreen, video_instance.endscreen.is_endscreen_active = !0, video_instance.dom_element.removeClass("playing"), video_instance.dom_element.addClass("endscreen");
                });
            }
        }
    }, Core.prototype.showErrorScreen = function(video_id, type) {
        type = typeof type == "string" && type != "" ? type.toLowerCase() : null;
        var video_instance = this.getInstance(video_id);
        if (video_instance) {
            var config_error_prefix =
                type ? type + "_" : "", error_top_line = this.config.getLabel(config_error_prefix + "top_line", "error", "Ein Fehler ist aufgetreten."), error_bottom_line = this.config.getLabel(config_error_prefix + "bottom_line", "error", "Bitte laden Sie das Video neu.");
            video_instance.events.publish("video/track/error", type || "unknown"), video_instance.ready_for_initlized = !0, !1 !== video_instance.controls && video_instance.controls.destroy(!0), !1 !== video_instance.html5_instance && (video_instance.html5_instance.destroy(), video_instance.html5_instance = !1), !1 !== video_instance.flash_instance && (video_instance.flash_instance.destroy(), video_instance.flash_instance = !1), video_instance.dom_element.find(".loader").remove();
            if (video_instance.endscreen.errorscreen_function) {
                video_instance.dom_element.removeClass("playing");
                var error_function = video_instance.endscreen.errorscreen_function.replace("%DOM_ID%", '"' + video_id + '"')
                    .replace("%VIDEO_ID%", '"' + video_instance.xml_data.id + '"').replace("%ERROR_TOP_LINE%", '"' + error_top_line + '"').replace("%ERROR_BOTTOM_LINE%", '"' + error_bottom_line + '"').replace("%TYPE%", '"' + (type || "unknown") + '"');
                eval(error_function);
                return;
            }
            var errorscreen_module = "bundesliga" == video_instance.layout ? "xoz/videoplayer/modules/bundesliga/Errorscreen" : "xoz/videoplayer/modules/screens/End", that = this;
            require([ errorscreen_module ], function(Errorscreen) {
                var errorscreen = new Errorscreen(video_instance);
                that.resize(video_instance), video_instance.endscreen.instance = errorscreen, video_instance.endscreen.is_endscreen_active = !0, video_instance.dom_element.removeClass("playing"), video_instance.dom_element.addClass("endscreen"), errorscreen.createErrorscreen(type, error_top_line, error_bottom_line);
            });
        }
    }, Core.prototype.handleResize =
        function() {
            for (var instance_name in this.instances) {
                var instance = this.instances[instance_name];
                this.resize(instance);
            }
        }, Core.prototype.resize = function(instance) {
        var width = instance.dom_element.width();
        if (width != 0) {
            var size = this.getPlayerType(width), old_size = instance.dom_element.attr("data-player-size") || "";
            old_size !== size && (instance.dom_element.removeClass(old_size), instance.dom_element.attr("data-player-size", size), instance.dom_element.addClass(size));
        }
    }, Core.prototype.getPlayerType = function(video_width) {
        var type = "micro";
        return video_width >= 809 ? type = "buehne" : video_width >= 577 && video_width < 809 ? type = "artikel" : video_width >= 279 && video_width < 577 && (type = "mini"), type;
    }, Core.prototype.getVideoIdForObject = function(video_object) {
        if ("object" == typeof video_object && "undefined" != typeof video_object
            .jquery) {
            var id = video_object.attr("id") || !1;
            if (!1 !== id) return id;
            this.logError("No id found for ", video_object);
        } else this.logError(video_object, " is not a jQuery Object");
        return !1;
    }, Core.prototype.getVideoInstanceForObjectOrId = function(video_object_or_id) {
        var video_id = !1;
        return "Object" == typeof video_object_or_id ? video_id = this.getVideoIdForObject(video_object_or_id) : "string" == typeof video_object_or_id && (video_id = video_object_or_id), !1 === video_id || "undefined" == typeof this.instances[video_id] ? (this.logError("found no Video Object for ", video_object_or_id), !1) : this.instances[video_id];
    }, Core.prototype.getPlayerInstance = function(video_instance) {
        return video_instance.html5_instance || video_instance.flash_instance;
    }, Core.prototype.showStartscreen = function(video_object_or_id) {
        var video_instance = this.getVideoInstanceForObjectOrId(video_object_or_id
        );
        !1 !== video_instance && (video_instance.controls.destroy(), video_instance.controls.is_preview = !0, !0 === video_instance.endscreen.is_endscreen_active && (video_instance.endscreen.instance.destroy(), video_instance.endscreen.instance = null, video_instance.endscreen.is_endscreen_active = !1, video_instance.dom_element.find(".play").removeClass("hide")), video_instance.dom_element.removeClass("playing"), video_instance.dom_element.find(".play").removeClass("pause"), !1 !== video_instance.html5_instance && (video_instance.html5_instance.destroy(), video_instance.html5_instance = !1), !1 !== video_instance.flash_instance && (video_instance.flash_instance.destroy(), video_instance.flash_instance = !1));
    }, Core.prototype.reinitializeVideo = function(video_object_or_id, video_xml, countRevolver, use_old_channel_xml, playlistConfiguration) {
        var video_instance = this.getVideoInstanceForObjectOrId(video_object_or_id);
        if (!1 !== video_instance) {
            if ("string" != typeof video_xml || 0 ==
                video_xml.length) {
                this.logError("No valid video.xml found ", video_xml);
                return;
            }
            var dataAutoplay = (playlistConfiguration && typeof playlistConfiguration.autoplay != 'undefined') ? playlistConfiguration.autoplay : true;
            video_instance.showTerminationButton = (playlistConfiguration && typeof playlistConfiguration.showTerminationButton != 'undefined') ? playlistConfiguration.showTerminationButton : false;
            video_instance.xml_src = video_xml;
            video_instance.dom_element.attr("data-video", video_xml);
            video_instance.dom_element.data("initialized", !1);
            video_instance.dom_element.attr("data-autoplay", dataAutoplay);
            countRevolver = countRevolver || 0;
            video_instance.dom_element.attr("data-revolver_count", countRevolver);
            this.showStartscreen(video_object_or_id);
            video_instance.controls.restore();
            use_old_channel_xml = use_old_channel_xml || !1;
            this.initVideoplayer(video_instance.dom_element, !0, use_old_channel_xml);
        }
    }, Core.prototype.replay = function(video_object_or_id) {
        var video_instance = this.getVideoInstanceForObjectOrId(video_object_or_id);
        if (!1 !== video_instance) {
            this.showStartscreen(video_object_or_id);
            var video_id = video_instance.dom_element.attr("id");
            com.xoz.events.publish("videoplayer/create/player"
                , video_id);
        }
    }, Core.prototype.pause = function(video_object_or_id) {
        var video_instance = this.getVideoInstanceForObjectOrId(video_object_or_id);
        !1 !== video_instance && this.getPlayerInstance(video_instance).pause();
    }, Core.prototype.resume = function(video_object_or_id) {
        var video_instance = this.getVideoInstanceForObjectOrId(video_object_or_id);
        !1 !== video_instance && this.getPlayerInstance(video_instance).play();
    }, Core.prototype.stop = function(video_object_or_id) {
        var video_instance = this.getVideoInstanceForObjectOrId(video_object_or_id);
        !1 !== video_instance && this.getPlayerInstance(video_instance).stop();
    }, Core.prototype.isPlaying = function(video_object_or_id) {
        var video_instance = this.getVideoInstanceForObjectOrId(video_object_or_id);
        return !1 !== video_instance && this.getPlayerInstance(video_instance) ? this.getPlayerInstance(video_instance).isPlaying() : !1;
    }, Core.prototype.cleanVideoplayerForNextPlaylistItem = function(video_object_or_id) {
        var video_instance = this.getVideoInstanceForObjectOrId(video_object_or_id);
        if (video_instance) {
            video_instance.ready_for_initlized = !0, !1 !== video_instance.html5_instance && (video_instance.html5_instance.destroy(), video_instance.html5_instance = !1), !1 !== video_instance.flash_instance && (video_instance.flash_instance.destroy(), video_instance.flash_instance = !1);
        }
    }, Core
        ;
}), define("xoz/videoplayer/core/XmlLoader", [ "xoz/videoplayer/core/Config", "xoz/videoplayer/core/BrowserDetection" ], function(config, browser_detection) {
    var XmlLoader = function() {
        com.xoz.logger.applyLogging(this, "videoplayer/core/XmlLoader");
        var that = this;
        this.loaded_xmls = [], this.parsed_xmls = [], this.config = config, this.browser_detection = browser_detection, com.xoz.events.subscribe("videoplayer/xml/load", function(video_id, xml_type, xml_src) {
            "undefined" == typeof that.loaded_xmls[xml_src] ? (that.logInfo("load XML file: ", xml_src), that.loadXmlFile(xml_src, function(xml, xml_string) {
                xml ? that.parseXml(xml, function(xml_data) {
                    that.parsed_xmls[xml_src] = xml_data, that.loaded_xmls[xml_src] = xml_string, com.xoz.events.publish("videoplayer/xml/loaded", video_id, xml_type, xml_data, xml_string);
                }) : xml_type == "video" && com.xoz.events.publish("videoplayer/video/error"
                    , {
                        id: video_id
                    });
            })) : (that.logDebug("XML found in cache: ", xml_src), com.xoz.events.publish("videoplayer/xml/loaded", video_id, xml_type, that.parsed_xmls[xml_src], that.loaded_xmls[xml_src]));
        });
    };
    return XmlLoader.prototype.parseXml = function(xml, callback) {
        xml = jQuery(xml), xml.find("video").length > 0 ? this.parseVideoXml(xml, callback) : this.logError("Unknown XML type", xml);
    }, XmlLoader.prototype.parseVideoXml = function(xml_data, callback) {
        this.logDebug("Call parseVideoXml");
        var that = this, video_data = !1;
        jQuery(xml_data).find("video").each(function() {
            var bumper_preroll_xml = !1, bumper_postroll_xml = !1, channel_xml = !1, vast_xml = !1, $this = jQuery(this);
            video_data = {
                config_type: "video",
                src: $this.attr("src"),
                src2: $this.attr("src2"),
                srcHLS: $this.attr("srcHLS")
                ,
                img: $this.attr("img"),
                title: $this.attr("title"),
                dachzeile: $this.attr("dachzeile"),
                ueberschrift: $this.attr("ueberschrift"),
                id: $this.attr("id"),
                autoplay: $this.attr("autoplay"),
                autorepeat: $this.attr("autorepeat"),
                ivw: $this.attr("ivw"),
                remtrack: $this.attr("remtrack"),
                track: $this.attr("track"),
                google_analytics: $this.attr("google_analytics"),
                tracking: $this.attr("tracking"),
                date: $this.attr("date"),
                duration: $this.attr("duration") || 0,
                text: $this.attr("text"),
                mute: "true" == $this.attr("mute") ? !0 : !1,
                hdDefault: $this.attr("hdDefault")
            }, jQuery(xml_data).find("text").each(function() {
                jQuery.extend(video_data, {
                    text: jQuery(this).text()

                });
            });
            var ad_texts = jQuery(xml_data).find("adTimerText");
            jQuery.extend(video_data, {
                ad_texts: {
                    micro_player: ad_texts.attr("microPlayer") || "WEITER IN %TIME% SEKUNDEN",
                    preroll: ad_texts.attr("preroll") || "VIDEO BEGINNT IN %TIME% SEKUNDEN",
                    termination: ad_texts.attr("termination") || "Abspielen beenden",
                    postroll: ad_texts.attr("postroll") || "WERBUNG ENDET IN %TIME% SEKUNDEN"
                }
            }), jQuery(xml_data).find("video share").each(function() {
                var $this = jQuery(this), share = {
                    status: "false" == $this.attr("status") ? !1 : !0,
                    deeplink: $this.attr("deeplink"),
                    embed: $this.attr("embed"),
                    bookmarks: {}
                }, bookmarks = {};
                jQuery(xml_data).find("video share bookmark").each(function(index) {
                    var $this = jQuery(this), bookmark = {
                        url: $this.attr
                            ("url"),
                        title: $this.attr("title"),
                        icon: $this.attr("icon")
                    };
                    share.bookmarks[bookmark.title] = bookmark;
                }), jQuery.extend(video_data, {
                    share: share
                });
            }), jQuery(xml_data).find("video end").each(function() {
                var $this = jQuery(this), end = {
                    status: $this.attr("status"),
                    xml: $this.attr("xml"),
                    url: $this.attr("url"),
                    more: $this.attr("more"),
                    end_function: $this.attr("end_function"),
                    error_function: $this.attr("error_function"),
                    revolver_time: $this.attr("revolvertime")
                };
                jQuery.extend(video_data, {
                    end: end
                });
            }), jQuery(xml_data).find("comment").each(function() {
                var $this = jQuery
                (this), comment = {
                    counterbde: $this.attr("counterbde"),
                    status: $this.attr("status")
                };
                jQuery.extend(video_data, {
                    comment: comment
                });
            }), jQuery(xml_data).find("video subtitle").each(function() {
                var $this = jQuery(this), subtitle = {
                    status: $this.attr("status"),
                    url: $this.attr("url")
                };
                jQuery.extend(video_data, {
                    subtitle: subtitle
                });
            }), jQuery(xml_data).find("video geo").each(function() {
                var geo = {
                    img: jQuery(this).attr("img")
                };
                jQuery.extend(video_data, {
                    geo: geo
                });
            }), jQuery(xml_data).find("video restrict").each(function() {
                var restrict = {
                    age: jQuery(this).attr("age"
                    )
                };
                jQuery.extend(video_data, {
                    restrict: restrict
                });
            }), jQuery(xml_data).find("video mail").each(function() {
                var mail = {
                    link: jQuery(this).attr("link")
                };
                jQuery.extend(video_data, {
                    mail: mail
                });
            }), jQuery(xml_data).find("video bundesliga").each(function() {
                var $this = jQuery(this), status = $this.attr("status"), game_timeline = $this.find("game_timeline").text();
                status = "true" == status ? !0 : !1, jQuery.extend(video_data, {
                    bundesliga: {
                        status: status,
                        game_timeline: game_timeline
                    }
                });
            });
            var flash_detection_elements = jQuery(xml_data).find("flash_detection");
            if (flash_detection_elements.length > 0) jQuery(
                xml_data).find("flash_detection").each(function() {
                    var $this = jQuery(this), flash_detection = {
                        enable: $this.attr("enable"),
                        version: $this.attr("version")
                    };
                    jQuery.extend(video_data, {
                        flash_detection: flash_detection
                    });
                }); else {
                var flash_detection = {
                    enable: "true",
                    version: "10.1"
                };
                jQuery.extend(video_data, {
                    flash_detection: flash_detection
                });
            }
            if (that.browser_detection.useHtmlPlayer() && that.config.getConfigValue("enable", "vast_ads", !1)) {
                var default_ad_src = jQuery(xml_data).find("video > ad").attr("xml"), premium_ads = {};
                jQuery(xml_data).find("video ads ad").each(function() {
                    var $this = jQuery(this);
                    premium_ads
                        [$this.attr("club")] = $this.attr("xml");
                });
                var ad_src = that.getUserAdSource(default_ad_src, premium_ads);
                vast_xml = that.getVastURls(ad_src);
            }
            jQuery(xml_data).find("video bumper").each(function() {
                var $this = jQuery(this);
                $this.attr("preroll") != null && $this.attr("preroll").length > 0 && (bumper_preroll_xml = $this.attr("preroll")), $this.attr("postroll") != null && $this.attr("postroll").length > 0 && (bumper_postroll_xml = $this.attr("postroll"));
            }), video_data.end != null && video_data.end.xml != null && (channel_xml = video_data.end.xml);
            if (!bumper_preroll_xml && !bumper_postroll_xml && !channel_xml && !vast_xml.preroll && !vast_xml.postroll) {
                callback(video_data);
                return;
            }
            if (vast_xml.preroll || vast_xml.postroll) {
                jQuery.extend(video_data, {
                    vast:
                    {}
                });
                var timeout = setTimeout(function() {
                    vast_xml.preroll = !1, vast_xml.postroll = !1;
                    var error = {
                        error: !0
                    };
                    jQuery.extend(video_data.vast, {
                        preroll: error
                    }), jQuery.extend(video_data.vast, {
                        postroll: error
                    }), timeout = null, that.logDebug("VAST timeout ..."), !bumper_preroll_xml && !bumper_postroll_xml && !channel_xml && callback(video_data);
                }, that.config.getConfigValue("timeout", "vast_ads", 1e4));
                vast_xml.preroll && that.loadXmlFile(vast_xml.preroll, function(vast_preroll_xml) {
                    if (timeout !== null) {
                        var vast_preroll_data = {
                            impressions: [],
                            events: {}
                        };
                        that.parseVastXml
                        (vast_preroll_xml, vast_preroll_data, function(vast_data) {
                            vast_data = vast_preroll_xml ? vast_data : {
                                error: !0
                            }, jQuery.extend(video_data.vast, {
                                preroll: vast_data
                            }), vast_xml.preroll = !1, !bumper_preroll_xml && !bumper_postroll_xml && !channel_xml && !vast_xml.postroll && (clearTimeout(timeout), callback(video_data));
                        });
                    }
                }), vast_xml.postroll && that.loadXmlFile(vast_xml.postroll, function(vast_postroll_xml) {
                    if (timeout !== null) {
                        var vast_postroll_data = {
                            impressions: [],
                            events: {}
                        };
                        that.parseVastXml(vast_postroll_xml, vast_postroll_data, function(vast_data) {
                            vast_data = vast_postroll_xml ?
                                vast_data : {
                                error: !0
                            }, jQuery.extend(video_data.vast, {
                                postroll: vast_data
                            }), vast_xml.postroll = !1, !bumper_postroll_xml && !bumper_postroll_xml && !channel_xml && !vast_xml.preroll && (clearTimeout(timeout), callback(video_data));
                        });
                    }
                });
            }
            bumper_preroll_xml && that.loadXmlFile(bumper_preroll_xml, function(bumper_data) {
                video_data.bumper = video_data.bumper || {}, bumper_data = bumper_data ? that.parseBumperXml(bumper_data) : {
                    error: !0
                }, jQuery.extend(video_data.bumper, {
                    preroll: bumper_data
                }), bumper_preroll_xml = !1, !bumper_postroll_xml && !channel_xml && !vast_xml.preroll && !vast_xml.postroll && (clearTimeout(timeout), callback(video_data));
            }), bumper_postroll_xml &&
                that.loadXmlFile(bumper_postroll_xml, function(bumper_data) {
                    video_data.bumper = video_data.bumper || {}, bumper_data = bumper_data ? that.parseBumperXml(bumper_data) : {
                        error: !0
                    }, jQuery.extend(video_data.bumper, {
                        postroll: bumper_data
                    }), bumper_postroll_xml = !1, !bumper_preroll_xml && !channel_xml && !vast_xml.preroll && !vast_xml.postroll && (clearTimeout(timeout), callback(video_data));
                }), channel_xml && that.loadXmlFile(channel_xml, function(channel_data) {
                channel_data || (video_data.end.status = "false"), channel_data = channel_data ? that.parseChannelXml(channel_data) : {
                    error: !0
                }, jQuery.extend(video_data, {
                    channel: channel_data
                }), channel_xml = !1, !bumper_preroll_xml && !bumper_postroll_xml && !vast_xml.preroll && !vast_xml.postroll && (clearTimeout(timeout), callback(video_data
                ));
            });
        });
    }, XmlLoader.prototype.parseChannelXml = function(xml_data) {
        this.logDebug("Call parseChannelXml");
        var videos = [];
        return jQuery(xml_data).find("video").each(function(index) {
            var $this = jQuery(this), video_data = {
                xml: $this.attr("xml"),
                img: $this.attr("img"),
                title: $this.attr("title"),
                ueberschrift: $this.attr("ueberschrift"),
                text: $this.attr("text"),
                duration: $this.attr("duration"),
                date: $this.attr("date"),
                rating: $this.attr("rating"),
                time: $this.attr("time"),
                timestamp: $this.attr("timestamp"),
                url: $this.attr("url"),
                away_team_logo: $this.attr("away_team_logo"),
                away_team_logo_format: $this.attr("away_team_logo_format"),
                home_team_logo: $this.attr("home_team_logo"),

                home_team_logo_format: $this.attr("home_team_logo_format"),
                had_revolver: !1
            };
            videos[index] = video_data;
        }), {
            video: videos
        };
    }, XmlLoader.prototype.parseBumperXml = function(xml_data) {
        this.logDebug("Call parseBumperXml");
        var video_data = {};
        return jQuery(xml_data).find("video").each(function() {
            var $this = jQuery(this);
            video_data = {
                src: $this.attr("src"),
                img: $this.attr("img"),
                id: $this.attr("id"),
                autoplay: $this.attr("autoplay"),
                ivw: $this.attr("ivw"),
                track: $this.attr("track"),
                title: $this.attr("title"),
                duration: $this.attr("duration")
            };
        }), video_data;
    }, XmlLoader.prototype.parseVastXml = function(xml_data, vast_data, vast_callback) {
        var that = this;
        this.logDebug("Call parseVastXml"
        );
        var $xml_data = jQuery(xml_data);
        vast_data = this.parseVastTrackingXml(xml_data, vast_data);
        if ($xml_data.find("VAST Wrapper").length > 0 || $xml_data.find("VideoAdServingTemplate Wrapper").length > 0) {
            var vast_url = jQuery.trim($xml_data.find("wrapper VASTAdTagURI").text());
            this.loadXmlFile(vast_url, function(vast_xml) {
                vast_xml && that.parseVastXml(vast_xml, vast_data, vast_callback);
            });
        } else {
            var src_tag = $xml_data.find('InLine MediaFile[type="video/mp4"]').first(), ad_src = jQuery.trim(src_tag.text());
            if (!src_tag.length || ad_src == "") this.logDebug('"InLine MediaFile[type="video/mp4"]" nicht gefunden in VAST'), this.logError("Keine AD SRC gefunden in VAST XML!"), vast_data.error = !0; else {
                vast_data.src = ad_src;
                var click_through = $xml_data.find("InLine VideoClicks ClickThrough URL").first();
                click_through.length ||
                    (click_through = $xml_data.find("InLine VideoClicks ClickThrough")), vast_data.click_through = jQuery.trim(click_through.text());
            }
            vast_callback(vast_data);
        }
    }, XmlLoader.prototype.parseVastTrackingXml = function(xml_data, vast_data) {
        var $xml_data = jQuery(xml_data);
        return $xml_data.find("Impression").each(function() {
            var $this = jQuery(this);
            if ($this.find("URL").length) $this.find("URL").each(function() {
                var url = $this.find("URL").length ? $this.find("URL").text() : $this.text();
                vast_data.impressions.push(jQuery.trim(url));
            }); else {
                var url = $this.find("URL").length ? $this.find("URL").text() : $this.text();
                vast_data.impressions.push(jQuery.trim(url));
            }
        }), $xml_data.find("TrackingEvents Tracking").each(function() {
            var $this = jQuery(this), event_type = $this.attr("event").toLowerCase(),
                url = $this.find("URL").length ? $this.find("URL").text() : $this.text();
            vast_data.events[event_type] = vast_data.events[event_type] || [], vast_data.events[event_type].push(jQuery.trim(url));
        }), vast_data;
    }, XmlLoader.prototype.getUserAdSource = function(default_src, premium_srcs) {
        var ad_src = default_src;
        try {
            for (var id in premium_srcs) if (de.bild.user.userHasClub(id)) {
                ad_src = premium_srcs[id];
                break;
            }
        } catch (error) {
            this.logWarn("Bild API de.bild.user.userHasClub is not available or xml data is invalid!", error);
        }
        return ad_src;
    }, XmlLoader.prototype.getVastURls = function(ad_src) {
        var vast_url = {};
        if ("string" == typeof ad_src) {
            window.sas_tmstp || (window.sas_tmstp = Math.round(Math.random() * 1e10));
            var preroll_format_id = this.config.getConfigValue("preroll_format_id", "vast_ads", "")
                , postroll_format_id = this.config.getConfigValue("postroll_format_id", "vast_ads", ""), page_name = ad_src.substring(ad_src.indexOf("(") + 1, ad_src.indexOf(")"));
            ad_src = "http://ww251.smartadserver.com/gcall?siteid=21009&pgname=[pagename]&fmtid=[format]&tmstp=[timestamp]&visit=M&tgt=uag_html5", ad_src = ad_src.replace("[pagename]", page_name).replace("[timestamp]", window.sas_tmstp), vast_url.preroll = jQuery.trim(ad_src.replace("[format]", preroll_format_id)), vast_url.postroll = jQuery.trim(ad_src.replace("[format]", postroll_format_id));
        }
        return vast_url;
    }, XmlLoader.prototype.loadXmlFile = function(xml_file, callback, timeout) {
        var that = this;
        jQuery.ajax({
            type: "GET",
            url: xml_file,
            dataType: "text",
            timeout: timeout || 0,
            success: function(xml_string) {
                callback(jQuery.parseXML(xml_string), xml_string);
            },
            error: function(error
                ) {
                that.logError("Cannot load xml ", xml_file, arguments), callback();
            }
        });
    }, XmlLoader;
}), define("xoz/videoplayer/core/CssLoader", [], function() {
    var CssLoader = function() {
        com.xoz.logger.applyLogging(this, "videoplayer/core/CssLoader");
        var that = this;
        com.xoz.events.subscribe("videoplayer/css/load", function(css_file, callback) {
            callback = callback || function() {};
            var css_file_url = window.com.xoz.config.baseUrl + css_file;
            that.loadStyleSheet(css_file_url, callback);
        });
    };
    return function(GLOBAL, WIN) {
        var ERROR_TIMEOUT = 15e3, HEAD = WIN.document.getElementsByTagName("head")[0], ID_PREFIX = "stylesheet-", READYSTATE_INTERVAL = 10, callbacks = {}, count = 0, cssRules, loaded = {}, queue = {}, sheet;
        function loadStyleSheet(path, fn, scope) {
            addCallback(path, fn, scope);
            if (queue[path]) return GLOBAL;

            if (loaded[path] && inDoc(loaded[path].id)) return fireStyleSheetLoaded(path, !0, loaded[path]), GLOBAL;
            var el = createStyleSheet(path), id, interval_id = setTimeout(partial(onError, path), ERROR_TIMEOUT), timeout_id = setInterval(partial(checkStyleSheetLoaded, path), READYSTATE_INTERVAL);
            return queue[path] = {
                el: el,
                interval: interval_id,
                path: path,
                timeout: timeout_id
            }, "onload" in el && (el.onload = partial(_handleOnLoad, path)), "onreadystatechange" in el && (el.onreadystatechange = partial(_handleReadyState, path)), id = setTimeout(function() {
                clearTimeout(id), id = null, HEAD.appendChild(el);
            }, 1), GLOBAL;
        }
        function _handleOnLoad(path) {
            var o = queue[path];
            return this[sheet][cssRules].length ? onLoad(o) : onError(path);
        }
        function _handleReadyState(path) {
            (this.readyState == "complete" ||
                this.readyState == "loaded") && _handleOnLoad.call(this, path);
        }
        function addCallback(path, fn, scope) {
            if (!isFunc(fn)) return;
            callbacks[path] || (callbacks[path] = []), callbacks[path].push({
                fn: fn,
                scope: scope
            });
        }
        function checkStyleSheetLoaded(path) {
            var o = queue[path], el;
            if (!o) return !1;
            el = o.el;
            try {
                el[sheet] && el[sheet][cssRules].length && onLoad(o);
            } catch (e) {
                return !1;
            }
        }
        function clear(o) {
            delete queue[o.path], clearInterval(o.interval), clearTimeout(o.timeout);
            var el = o.el;
            "onload" in el && (el.onload = null), "onreadystatechange" in el && (el.onreadystatechange = null);
        }
        function createStyleSheet(path) {
            var el = document.createElement("link");
            return el.id =
                ID_PREFIX + ++count, el.setAttribute("href", path), el.setAttribute("rel", "stylesheet"), el.setAttribute("type", "text/css"), sheet || (cssRules = "cssRules", sheet = "sheet", sheet in el || (cssRules = "rules", sheet = "styleSheet")), el;
        }
        function fireStyleSheetLoaded(path, success, el) {
            var cbs = callbacks[path], o;
            if (!cbs) return;
            while (o = cbs.shift()) fireCallback(o.fn, o.scope, success, el);
        }
        function fireCallback(fn, scope, success, el) {
            fn.call(scope || WIN, success, el);
        }
        function inDoc(id) {
            return !!WIN.document.getElementById(id);
        }
        function isFunc(fn) {
            return typeof fn == "function";
        }
        function onError(path) {
            var o = queue[path], el = o.el;
            clear(o), HEAD.removeChild(el), fireStyleSheetLoaded(path, !1, el);
        }
        function onLoad(o) {
            var el = o.el, path = o.path;

            clear(o), loaded[path] = el, fireStyleSheetLoaded(path, !0, el);
        }
        function partial() {
            var slice = Array.prototype.slice, args = slice.call(arguments), fn = args.shift();
            return args.length ? function() {
                return fn.apply(this, args.concat(slice.call(arguments)));
            } : fn;
        }
        GLOBAL.loadStyleSheet = loadStyleSheet;
    }(CssLoader.prototype, window), CssLoader;
}), require([ "xoz/videoplayer/core/Videoplayer", "xoz/videoplayer/core/Logging", "xoz/videoplayer/core/XmlLoader", "xoz/videoplayer/core/CssLoader", "xoz/videoplayer/core/Events" ], function(Videoplayer, logging, XmlLoader, CssLoader, Events) {
    window.com.xoz.click_event = "ontouchstart" in window ? "touchstart" : "click", window.com.xoz.logger = logging, window.com.xoz.flash_logger = {}, logging.applyLogging(window.com.xoz.flash_logger, "videoplayer/flashplayer"), window.com.xoz.events = new Events, window.com.xoz.videoplayer = new Videoplayer
        , window.com.xoz.xml_loader = new XmlLoader, window.com.xoz.css_loader = new CssLoader, jQuery(document).trigger("xoz/videoplayer/ready");
}), define("de.xoz.videoplayer.welt.core", function() {}), define("xoz/videoplayer/core/Social", [ "xoz/videoplayer/core/Logging", "xoz/videoplayer/core/Config" ], function(logging, config) {
    var Social = function() {
        logging.applyLogging(this, "videoplayer/core/Social"), this.config = config, this.is_enable = this.config.getConfigValue("enable_social_module", "default", !1);
    };
    return Social.prototype.getTwitterButton = function(data) {
        if (!1 === this.is_enable) return !1;
        data = data || {};
        var url = decodeURIComponent(data.url) || location.href, count = data.count || "button_count", button = jQuery('<div class="social-button twitter clearfix"><button class="social-lever" data-target-sb="twitter"></button><a href="#" class="sb-placeholder" data-sb-type="twitter" data-href="' + url + '" data-class="twitter-share-button" data-count="' +
            count + '" style="display: block; "></a>' + '<div class="sb-to-fill" style="display: block; "></div>' + "</div>");
        return button;
    }, Social.prototype.getFacebookButton = function(data) {
        if (!1 === this.is_enable) return !1;
        data = data || {};
        var url = data.url || location.href, count_layout = data.count_layout || "button_count", button = jQuery('<div class="social-button fblike clearfix"><button class="social-lever" data-target-sb="fblike"></button><a href="#" class="sb-placeholder" data-sb-type="facebook" data-href="' + url + '" data-action="like" data-layout="' + count_layout + '"></a>' + '<div class="sb-to-fill" style="display: none; "></div>' + "</div>");
        return button;
    }, Social.prototype.getGooglePlusButton = function(data) {
        if (!1 === this.is_enable) return !1;
        data = data || {};
        var url = data.url || location.href, annotation = data.annotation || "bubble", button = jQuery('<div class="social-button gplus clearfix"><button class="social-lever" data-target-sb="gplus"></button><a href="" class="sb-placeholder" data-sb-type="gplus" data-href="' +
            url + '" data-class="g-share" data-annotation="' + annotation + '"></a>' + '<div class="sb-to-fill" style="display: none; "></div>' + "</div>");
        return button;
    }, Social.prototype.initButtons = function(wrapper_element) {
        try {
            de.bild.social.initSocialButtons(wrapper_element);
        } catch (exception) {
            this.logError("Error while calling de.bild.social.initSocialButtons()", exception);
        }
    }, new Social;
}), define("xoz/videoplayer/core/Controls", [ "xoz/videoplayer/core/Social", "xoz/videoplayer/core/BrowserDetection" ], function(social, browser_detection) {
    var Controls = function(video_instance, events, xml_data, dom_element, layout, like_url) {
        var that = this;
        com.xoz.logger.applyLogging(this, "videoplayer/core/Controls"), layout.applyLayout(this), this.like_url = like_url || !1, this.social = social, this.browser_detection = browser_detection, this.video_instance = video_instance, this.events = events, this
            .xml_data = xml_data, this.dom_element = dom_element, this.video_id = dom_element.attr("id"), this.player = null, this.comercial_buttons = [], this.current_time = "00:00", this.current_time_number = 0, this.duration = 0, this.is_preview = !0, this.is_live_modus = !1, this.is_comercial = !1, this.controls_element = this.createControls(dom_element), this.bindControls(), this.bindEvents(), this.current_time_element = this.dom_element.find(".current-time"), this.duration_element = this.dom_element.find(".duration"), xml_data.duration && this.setDuration(xml_data.duration / 1e3), this.pressed_fullscreen = !1, this.pressed_hq = !1, this.is_fullscreen_active = !1, this.events.subscribe("video/event/loadedmetadata", function(event_object) {
            that.setDuration(event_object.duration);
        });
        var data = {
            hq: !1,
            subtitle: !1
        };
        this.events.publish("video/controls/setup/buttons", data), (1 == this.xml_data.duration || -1 == this.xml_data
            .duration || 1e3 == this.xml_data.duration) && this.setLiveModus(!0), this.browser_detection.isMac() && this.browser_detection.isFirefox() && jQuery('<div class="btn-fullscreen-exit"></div>').appendTo(dom_element).on(com.xoz.click_event, function() {
            that.leaveFullscreen();
        });
    };
    return Controls.prototype.setPlayer = function(player_instance) {
        this.player = player_instance;
    }, Controls.prototype.callPlayer = function(method, agument) {
        this.player !== null && typeof this.player[method] == "function" && this.player[method](agument);
    }, Controls.prototype.initializePlayer = function(timecode) {
        !0 === this.is_preview ? (this.setLiveModus(!1), com.xoz.events.publish("videoplayer/create/player", this.video_id, timecode),
            jQuery(document).trigger("xoz/videoplayer/initPlayer", [this.video_instance.video_id]),
            this.video_instance.events.publish("video/play/first", {
            id: this.video_instance.video_id
        }), this.is_preview = !1, this.browser_detection.isMobile() && this.dom_element.addClass("idle")) : !0 ===
            this.play_pause_button.hasClass("playing") ? (this.play_pause_button.removeClass("playing"), this.big_play_button_element.removeClass("pause"), this.callPlayer("pause")) : (this.play_pause_button.addClass("playing"), this.big_play_button_element.addClass("pause"), this.callPlayer("play"));
    }, Controls.prototype.bindAdditionalButtons = function() {}, Controls.prototype.setLiveModus = function(status) {
        "boolean" == typeof status && (this.is_live_modus = status, !0 === this.is_live_modus ? (this.updateProgressbar(0, 100, !0), this.updateProgressbar(100, 100, !1), this.updateCurrentTime(0, 100), this.dom_element.addClass("live")) : this.dom_element.removeClass("live"));
    }, Controls.prototype.initializeComercial = function() {
        this.comercial_time = this.dom_element.find(".comercial-time");
        this.comercial_text = this.dom_element.find(".comercial-text");
        this.comercial_text_preroll = this.dom_element.find(".preroll-text");
        this.comercial_text_normal = this.dom_element.find(".normal-text");
    }, Controls.prototype.enableComercialMode = function(adText, duration) {
        duration = duration || 0;
        adText = adText.replace("%TIME%", '<span class="comercial-time">' + String(duration) + "</span>");
        this.controls_element.addClass("comercial");
        this.dom_element.addClass("comercial");
        this.is_comercial = !0;
        this.big_play_button_element.addClass("hide");
        this.comercial_text_normal.html(adText).removeClass("hide");
        this.comercial_time = this.comercial_text_normal.find(".comercial-time");
		jQuery(".fix_overlay").show();
		
        /**
         *  OA-4826: Added option of interrupt a preroll in a revolverload video
         */
        if (typeof this.video_instance.showTerminationButton !== 'undefined' && this.video_instance.showTerminationButton === true) {
            this.comercial_text_normal.append('<span class="commercial-termination">' + this.video_instance.xml_data.ad_texts.termination + ' <span class="x-icon"></span></span>');
            this.commercial_abortion_container = this.comercial_text_normal.find(".commercial-termination");

            var currentVideoPlayer = this;
            this.commercial_abortion_container.on('click', function (clickEvent) {
                var videoId = currentVideoPlayer.video_id;
				
                var xmlSrc = currentVideoPlayer.video_instance.xml_src;
                if (xmlSrc.indexOf('autoplay=true') > -1) {
                    xmlSrc = xmlSrc.replace('autoplay=true', 'autoplay=false');
                } else {
                    xmlSrc += (xmlSrc.indexOf('?') > -1) ? '&autoplay=false' : '?autoplay=false';
                }

                com.xoz.videoplayer.cleanVideoplayerForNextPlaylistItem(videoId);
                com.xoz.videoplayer.reinitializeVideo(videoId, xmlSrc, 0, false, {autoplay: false, showTerminationButton: true});

                if (typeof wt !== 'undefined' && 'function' === typeof wt.sendinfo) {
                    wt.sendinfo({linkId: 'video_interruptPreroll'});
                }

                clickEvent.stopPropagation();
            });
        }

        jQuery(this.comercial_buttons).each(function(index, element) {
            !1 === element.hasClass("hide") && (element.attr("data-hide", "comercial"), element.addClass("hide"));
        });
        this.comercial_duration = -1;
        this.comercial_text.removeClass("hide");
    }, Controls.prototype.updateComercialTime = function(current_time) {
        this.comercial_time.html(current_time), -1 === this.comercial_duration && (this.comercial_duration = current_time), this.updateCurrentTime
            (-current_time + this.comercial_duration, this.comercial_duration);
    }, Controls.prototype.disableComercialMode = function() {
        this.controls_element.removeClass("comercial"), this.dom_element.removeClass("comercial"), this.is_comercial = !1, this.comercial_text.addClass("hide"), this.big_play_button_element.removeClass("hide"), jQuery(this.comercial_buttons).each(function(index, element) {
            "comercial" === element.attr("data-hide") && (element.attr("data-hide", ""), element.removeClass("hide"));
        }), this.resetControls(), this.big_play_button_element.addClass("pause");
    }, Controls.prototype.bindEvents = function() {
        var that = this;
        this.events.subscribe("video/event/clicked", function() {
			that.initializePlayer();
        }), this.controls_element.hover(function() {
            that.dom_element.addClass("hover-controls");
        }, function() {
            that.dom_element.removeClass("hover-controls");
        });
    }, Controls
        .prototype.bindControls = function() {
        this.bindLikeButton(), this.bindFullscreenButton(), this.bindMuteButton(), this.bindPlayButtons(), this.bindAdditionalButtons(), this.bindProgressbar(), this.bindBigPlayButton(), this.bindHdButton(), this.initializeComercial(), this.bindButtons(), this.prepareComercialMode(), this.bindSubtitleButton();
    }, Controls.prototype.bindFullscreenButton = function() {
        var that = this;
        this.fullscreen_button = this.controls_element.find(".fullscreen"), this.fullscreen_button.on(window.com.xoz.click_event, function() {
            !1 === that.is_preview && (that.is_fullscreen_active ? that.leaveFullscreen() : that.enterFullscreen());
            if (!1 === that.pressed_fullscreen) {
                that.pressed_fullscreen = !0;
                var tracking_data = that.getTrackingObject();
                that.events.publish("video/track/fullscreen", tracking_data), that.player && that.player.video_object && that.player.video_object
                    .position && that.events.publish("video/track/" + that.player.video_object.video_position + "/fullscreen", {});
            }
        });
        var fullscreen_change_function = function() {
            that.logDebug("onFullscreenChange"), that.is_fullscreen_active && !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && that.leaveFullscreen();
        };
        this.dom_element.on("fullscreenchange", fullscreen_change_function), jQuery(document).on("mozfullscreenchange", fullscreen_change_function), this.dom_element.on("webkitfullscreenchange", fullscreen_change_function);
    }, Controls.prototype.leaveFullscreen = function() {
        this.logDebug("leaveFullscreen"), this.is_fullscreen_active = !1, this.fullscreen_button.removeClass("active"), this.dom_element.removeClass("fullscreen"), document.cancelFullScreen && document.documentElement.requestFullscreen ? document.cancelFullScreen() : document.mozCancelFullScreen && document.documentElement
            .mozRequestFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.documentElement.webkitRequestFullscreen ? document.webkitCancelFullScreen() : (this.dom_element.removeClass("browser-fullscreen"), this.logDebug("Fullscreen API not available"), jQuery(document.body).off("keydown.videoplayer")), com.xoz.events.publish("videoplayer/fullscreen/leave", this.video_id);
    }, Controls.prototype.enterFullscreen = function() {
        var that = this;
        this.logDebug("enterFullscreen"), this.is_fullscreen_active = !0, this.fullscreen_button.addClass("active"), this.dom_element.addClass("fullscreen"), document.documentElement.requestFullscreen ? this.dom_element[0].requestFullscreen() : document.documentElement.mozRequestFullScreen ? this.dom_element[0].mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen ? this.dom_element[0].webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : (this.dom_element.addClass("browser-fullscreen"), this
            .logDebug("Fullscreen API not available"), jQuery(document.body).on("keydown.videoplayer", function(event) {
            event.keyCode == 27 && (that.leaveFullscreen(), event.stopPropagation());
        })), com.xoz.events.publish("videoplayer/fullscreen/enter", this.video_id);
    }, Controls.prototype.bindMuteButton = function() {
        var that = this;
        this.mute_button = this.controls_element.find(".mute"), this.mute_button.on(window.com.xoz.click_event, function() {
            !0 === that.mute_button.hasClass("muted") ? (that.callPlayer("unmute"), that.mute_button.removeClass("muted")) : (that.callPlayer("mute"), that.mute_button.addClass("muted"));
        });
    }, Controls.prototype.updateVolume = function(volume, muted) {}, Controls.prototype.bindBigPlayButton = function() {}, Controls.prototype.bindSubtitleButton = function() {
        var that = this;
        this.subtitle_button = this.dom_element.find(".subtitle"), this.comercial_buttons.push(this.subtitle_button
        ), this.subtitle_button.on(window.com.xoz.click_event, function() {
            !0 === that.subtitle_button.hasClass("active") ? (that.subtitle_button.removeClass("active"), that.callPlayer("disableSubtitles")) : (that.subtitle_button.addClass("active"), that.callPlayer("enableSubtitles"));
        });
    }, Controls.prototype.bindHdButton = function() {
        var that = this;
        this.hd_button = this.dom_element.find(".hd"), this.hd_button.enabled = !0, this.comercial_buttons.push(this.hd_button), "undefined" !== this.xml_data.hdDefault && "true" === this.xml_data.hdDefault && that.hd_button.addClass("active"), this.events.subscribe("video/controls/enable_hd_button", function() {
            that.hd_button.enabled = !0;
        }), this.hd_button.on(window.com.xoz.click_event, function() {
            if (!0 === that.hd_button.enabled) {
                that.hd_button.enabled = !1;
                if (!1 === that.pressed_hq) {
                    var tracking_data = that.getTrackingObject
                        ();
                    that.events.publish("video/track/hq", tracking_data), that.pressed_hq = !0;
                }
                !0 === that.hd_button.hasClass("active") ? (that.hd_button.removeClass("active"), that.callPlayer("enableHd")) : (that.hd_button.addClass("active"), that.callPlayer("disableHd"));
            }
        });
    }, Controls.prototype.bindButtons = function() {
        var that = this;
        this.bildde_button = this.dom_element.find(".bildde"), this.comercial_buttons.push(this.bildde_button), this.comercial_buttons.push(this.play_pause_button), this.comercial_buttons.push(this.big_play_button_element), this.events.subscribe("video/controls/setup/buttons", function(event_object) {
            "undefined" != typeof event_object.hq && (!0 === event_object.hq ? that.hd_button.removeClass("hide") : that.hd_button.addClass("hide")), "undefined" != typeof event_object.subtitle && (!0 === event_object.subtitle ? that.subtitle_button.removeClass("hide") : that.subtitle_button
                .addClass("hide")), "undefined" != typeof event_object.like && (!0 === event_object.like ? that.like_button.removeClass("hide") : that.like_button.addClass("hide")), that.events.publish("video/controls/changed");
        });
    }, Controls.prototype.bindLikeButton = function() {
        var that = this;
        this.like_button = this.dom_element.find(".like");
        if (!1 === this.like_url) this.like_button.addClass("hide"); else {
            this.comercial_buttons.push(this.like_button);
            var facebook_button = this.social.getFacebookButton({
                url: this.like_url
            });
            !1 !== facebook_button ? (this.share_container = jQuery('<div class="share-container hide"></div>'), this.share_container.append(facebook_button), this.share_container.append(jQuery('<div class="share-container-background"></div>')), this.dom_element.append(this.share_container), this.social.initButtons(this.dom_element), this.share_container.mouseleave(function(event)
            {
                that.removeShareFrame();
            }), this.share_container.mouseenter(function(event) {
                that.showShareFrame();
            }), this.like_button.mouseenter(function(event) {
                that.showShareFrame();
            }), this.like_button.mouseleave(function(event) {
                that.removeShareFrame();
            }), this.events.subscribe("video/controls/hide/like", function(event_object) {
                that.like_button.addClass("hide");
            }), this.events.subscribe("video/controls/show/like", function(event_object) {
                that.like_button.removeClass("hide");
            })) : this.like_button.addClass("disable");
        }
    }, Controls.prototype.showShareFrame = function() {
        this.share_container.removeClass("hide"), clearTimeout(this.share_container_timer);
    }, Controls.prototype.removeShareFrame = function() {
        var that = this;
        this.share_container_timer = setTimeout(function() {

            that.share_container.addClass("hide");
        }, 3e3);
    }, Controls.prototype.bindPlayButtons = function() {
        var that = this;
        this.play_pause_button = this.controls_element.find(".play-pause-toggle"), this.big_play_button_element = this.dom_element.find(".play"), jQuery([ this.big_play_button_element[0], this.play_pause_button[0] ]).on(window.com.xoz.click_event, function(event) {
            that.logDebug("big play button clicked"), event.preventDefault(), event.stopPropagation(),
				that.video_instance.tracker.ivw.onUserInitiate(),
                that.initializePlayer();
        }), this.events.subscribe("video/event/play", function() {
            jQuery(document).trigger("xoz/videoplayer/playing");
            that.play_pause_button.addClass("playing"), that.big_play_button_element.addClass("pause");
            that.dom_element.removeClass("paused");
        }), this.events.subscribe("video/event/pause", function() {
            that.play_pause_button.removeClass("playing"), that.big_play_button_element.removeClass("pause");
            that.dom_element.addClass("paused");
        }), this.events.subscribe("videoplayer/video/finished", function() {
            that.big_play_button_element.removeClass
                ("pause"), that.resetControls();
        }), this.events.subscribe("video/comercial/enable", function(event_object) {
            that.enableComercialMode(event_object.adText, event_object.duration);
        }), this.events.subscribe("video/comercial/disable", function() {
            that.disableComercialMode();
        }), this.events.subscribe("video/comercial/timeupdate", function(event_object) {
            that.updateComercialTime(event_object.duration);
        }), this.events.subscribe("video/livemodus/enable", function() {
            that.setLiveModus(!0);
        }), this.events.subscribe("video/livemodus/disable", function() {
            that.setLiveModus(!1);
        }), this.events.subscribe("video/controls/marker_clicked", function(event_object) {
            that.video_instance.endscreen.is_endscreen_active ? com.xoz.events.publish("videoplayer/video/replay", {
                id: that.video_id,
                start_timecode: event_object.current_time
            }) : !0 ===
                that.is_preview ? that.initializePlayer(event_object.current_time) : that.events.publish("video/controls/timeupdate", {
                current_time: event_object.current_time,
                marker: !0
            });
            var data = {
                percent: Math.round(event_object.current_time / that.duration * 100),
                duration: that.duration,
                marker_type: event_object.type,
                marker_minute: event_object.minute
            };
            that.events.publish("video/track/event_marker", data);
        });
    }, Controls.prototype.bindProgressbar = function() {
        var that = this;
        this.progress_bar_play = this.dom_element.find(".progress-bar-play"), this.progress_bar_slider = this.dom_element.find(".progress-bar-slider"), this.progress_bar_load = this.dom_element.find(".progress-bar-load"), this.progress_bar_background = this.dom_element.find(".progress-bar-background"), this.video_progress_bar = this.dom_element.find(".progress-bar"
        );
        var mouse_handle_function = function(event) {
            if (!1 === that.is_preview && !1 === that.is_comercial && !1 === that.is_live_modus) {
                var percent = that.getClickPosition(event, that.video_progress_bar, !0);
                that.progress_bar_play.css("width", percent * 100 + "%");
                var current_time = that.duration * percent;
                that.callPlayer("seek", current_time);
            }
        };
        this.video_progress_bar.on(window.com.xoz.click_event, mouse_handle_function);
        var document_element = jQuery(document);
        this.video_progress_bar.on("mousedown", function() {
            document_element.on("mousemove", mouse_handle_function);
        }), document_element.on("mouseup", function() {
            document_element.off("mousemove", mouse_handle_function);
        }), this.events.subscribe("video/event/timeupdate", function(event_object) {
            !1 === that.is_live_modus && (that.updateCurrentTime(
                event_object.current_time, event_object.duration), that.callPlayer("updateTime", event_object.current_time));
        }), this.events.subscribe("video/event/bufferupdate", function(event_object) {
            !1 === that.is_live_modus && that.updateProgressbar(event_object.buffered, event_object.duration, !1);
        });
    }, Controls.prototype.updateCurrentTime = function(current_time, duration) {
        if (!0 === isNaN(current_time) || 0 > current_time || !0 === isNaN(duration) || 0 > duration) {
            this.logWarn("the current_time or the duration is not a number or smaller then 0. current_time:", current_time, "duration:", duration);
            return;
        }
        var current_time_formated = this.formatTime(current_time);
        this.current_time = current_time_formated, this.current_time_number = current_time, this.current_time_element.html(current_time_formated), this.updateProgressbar(current_time, duration, !0);
    }, Controls.prototype.formatTime = function(
        time) {
        if (!1 === isNaN(time)) {
            var seconds = Math.floor(time % 60), minutes = Math.floor(time / 60);
            return seconds < 10 && (seconds = "0" + seconds), minutes < 10 && (minutes = "0" + minutes), minutes + ":" + seconds;
        }
        return "00.00";
    }, Controls.prototype.updateProgressbar = function(time, duration, is_time_update) {
        var percent = time / duration * 100;
        !0 === isNaN(percent) ? percent = 0 : percent > 100 && (percent = 100), !0 === is_time_update ? (this.progress_bar_play.css("width", percent + "%"), this.progress_bar_slider.css("left", percent + "%")) : this.progress_bar_load.css("width", percent + "%");
    }, Controls.prototype.getClickPosition = function(event, element, is_horizontal) {
        "undefined" == typeof is_horizontal && (is_horizontal = !1);
        var offset = element.offset(), total = 0, click_position = 0;
        !0 === is_horizontal ? (total = element.width(), click_position = event.pageX - offset
            .left) : (total = element.height(), click_position = event.pageY - offset.top);
        var percent = click_position / total;
        return !1 === is_horizontal && (percent = 1 - percent), 1 < percent ? 1 : 0 > percent ? 0 : percent;
    }, Controls.prototype.setDuration = function(duration) {
        if (!0 === isNaN(duration) || 0 > duration) {
            this.logWarn("Duration is not a number or smaller then 0. Get:", duration);
            return;
        }
        this.duration = duration, this.duration_element.html(this.formatTime(duration));
    }, Controls.prototype.prepareComercialMode = function() {}, Controls.prototype.resetControls = function() {
        this.progress_bar_play.attr("style", ""), this.progress_bar_slider.attr("style", ""), this.progress_bar_load.attr("style", ""), this.big_play_button_element.removeClass("pause"), this.updateCurrentTime(0, this.duration), (!this.xml_data.hdDefault || "true" !== this.xml_data.hdDefault) && this.hd_button.removeClass("active"
        );
    }, Controls.prototype.destroy = function(hide_controls) {
        hide_controls = hide_controls || !1, this.resetControls(), !0 === hide_controls && (this.big_play_button_element.addClass("hide"), this.controls_element.addClass("hide"));
        if (this.is_fullscreen_active) {
            if (document.mozCancelFullScreen && document.documentElement.mozRequestFullScreen) {
                var position = 0, that = this, $parent = this.dom_element.parent();
                $parent.children().each(function(index, element) {
                    element === that.dom_element[0] && (position = index);
                }), that.dom_element.detach(), position === 0 ? $parent.prepend(that.dom_element) : $parent.children().eq(position - 1).after(that.dom_element), this.logDebug("MOZ cancelFullScreen Hack applied");
            }
            this.leaveFullscreen();
        }
        this.is_preview = !1;
    }, Controls.prototype.restore = function() {
        this.play_pause_button.removeClass
            ("playing"), this.controls_element.removeClass("hide"), this.is_preview = !0;
    }, Controls.prototype.getTrackingObject = function() {
        return {
            percent: this.current_time_number / this.duration * 100,
            duration: this.duration
        };
    }, Controls;
}), define("xoz/videoplayer/core/VideoPlaylist", [], function() {
    var VideoPlaylist = function() {
        this.playlist = [], this.video_index = 0;
    };
    return VideoPlaylist.prototype.addVideo = function(video_src, video_position, alternative_src, subtitle_src, is_live_stream) {
        !video_src && alternative_src && (video_src = alternative_src, alternative_src = !1), "undefined" == typeof subtitle_src && (subtitle_src = !1), "boolean" != typeof is_live_stream && (is_live_stream = !1);
        var video = {
            source: this.getVideoObject(video_src),
            alternative_source: this.getVideoObject(alternative_src),
            video_position: video_position,
            subtitle_src
                : subtitle_src,
            is_live_stream: is_live_stream
        };
        return !video.source && !video.alternative_source ? !1 : (this.playlist.push(video), video);
    }, VideoPlaylist.prototype.getVideoObject = function(source) {
        if (!source) return !1;
        var video_type = this.getVideoType(source);
        return {
            url: source,
            type: video_type.filetype,
            hd: !1
        };
    }, VideoPlaylist.prototype.getVideoType = function(src) {
        if (!src) return !1;
        var match = src.match(/\.([^\.]+)$/);
        if (match && match[1]) {
            var ext = match[1].toLowerCase();
            return ext == "ogv" ? {
                filetype: "video/ogg",
                isHDPossible: !1
            } : ext == "m3u8" || ext == "smil" ? {
                filetype: "video/mp4",
                isHDPossible: !0
            } : ext == "webm" ? {
                filetype: "video/webm",
                isHDPossible: !1
            }
                : {
                filetype: "video/mp4",
                isHDPossible: !1
            };
        }
        return !1;
    }, VideoPlaylist.prototype.getLength = function() {
        return this.playlist.length;
    }, VideoPlaylist.prototype.getNextVideo = function() {
        var video_object = this.playlist[this.video_index];
        return video_object ? (this.video_index++, video_object) : !1;
    }, VideoPlaylist;
}), define("xoz/videoplayer/core/Flash", [ "xoz/videoplayer/core/Config", "xoz/videoplayer/core/BrowserDetection" ], function(config, browser_detection) {
    var Flash = function(video_instance, controls, start_timecode) {
        var that = this;
        com.xoz.logger.applyLogging(this, "videoplayer/core/Flash"), this.config = config, this.browser_detection = browser_detection, this.video_instance = video_instance, this.events = video_instance.events, this.dom_element = video_instance.dom_element, this.wrapper = video_instance.wrapper_element, this.video_id = video_instance
            .video_id, this.controls = controls, this.start_timecode = start_timecode, this.volume = .5, this.muted = !1, this.subtitle = !1, this.cachebusting = browser_detection.isIE8() ? !0 : !1, this.dom_element.addClass("playing"), this.dom_element.addClass("flash"), this.$flash_object = null, this.flash_object = null;
        if (!1 === this.browser_detection.hasUserFlash()) {
            var data = {
                type: "flash",
                id: this.video_id
            };
            com.xoz.events.publish("videoplayer/video/error", data);
            return;
        }
        this.dom_element.hover(function() {
            that.dom_element.addClass("hover");
        }, function() {
            that.dom_element.removeClass("hover");
        }), that.dom_element.on("mousemove keydown scroll", function() {
            clearTimeout(that.idleTimer), that.idleState == 1 && that.dom_element.removeClass("idle"), that.idleState = !1, that.idleTimer = setTimeout(function() {
                that
                    .dom_element.addClass("idle"), that.idleState = !0;
            }, 2e3);
        }), this.subtitle = !1, "undefined" != typeof this.video_instance.xml_data.subtitle && "true" === this.video_instance.xml_data.subtitle.status && "undefined" != typeof this.video_instance.xml_data.subtitle.url && require([ "xoz/videoplayer/core/Subtitle" ], function(Subtitle) {
            that.subtitle = new Subtitle(that.dom_element, that.video_id, that.video_instance.xml_data.subtitle.url);
        }), this.events.subscribe("videoplayer/flashplayer/ready", function() {
            that.doCall("SET_XML", {
                xml: that.video_instance.xml_string
            }), that.video_instance.xml_data.mute && that.mute();
        }), this.initializeFlashElement(), this.events.publish("video/track/play", {
            percent: 0,
            duration: parseInt(this.video_instance.xml_data.duration / 1e3)
        });
    };
    return Flash.prototype.initializeFlashElement = function() {
        this.logInfo
            ("initializeFlashElement");
        var that = this, movie_url = window.com.xoz.config.baseUrl + this.config.getConfigValue("url", "flash_player", "BildTvMain_test.swf");
        movie_url = this.cachebusting ? this.injectCacheBuster(movie_url) : movie_url;
		var flashvars = "";
		for (var q in window.com.xoz.config.flashvars) {
			if (window.com.xoz.config.flashvars.hasOwnProperty(q)) {
				flashvars += "&" + q + '=' + window.com.xoz.config.flashvars[q];
			}
		}
        if (window.com.xoz.adblocker && window.com.xoz.adblocker.hasOwnProperty('homadconfig')) {
            flashvars += "&homadconfig=" + window.com.xoz.adblocker.homadconfig;
        }

        var player_id = "videoplayer_" + this.video_id, player_name = "videoplayer_name_" + this.video_id, timecode_param = this.start_timecode ? "&time=" + this.start_timecode : "", flash_vars = "id=" + this.video_id + flashvars + timecode_param, codebase_attribute = this.browser_detection.isIE() ? ' codeBase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,1,00,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' : "";
        this.logDebug("injection html"), this.$flash_object = jQuery('<object type="application/x-shockwave-flash" data="' + movie_url + '" id="' + player_id + '" name="' + player_name + '" ' + codebase_attribute + ">" + '<param name="movie" value="' + movie_url + '"/>' + '<param name="FlashVars" value="' +
            flash_vars + '"/>' + '<param name="allowFullScreen" value="true"/>' + '<param name="quality" value="high"/>' + '<param name="allowScriptAccess" value="always" />' + '<param name="wmode" value="opaque" />' + "</object>"), this.wrapper.prepend(this.$flash_object), this.wrapper.addClass("flash-container"), this.flash_object = this.$flash_object.get(0), this.$flash_object.off(window.com.xoz.click_event).on(window.com.xoz.click_event, function(event) {
            event.preventDefault(), that.dom_element.trigger("mousemove"), that.events.publish("video/event/clicked");
        }), this.browser_detection.isMac() && this.browser_detection.isFirefox() && (this.fix_overlay = jQuery('<div class="fix_overlay"></div>'), this.wrapper.append(this.fix_overlay), this.fix_overlay.off(window.com.xoz.click_event).on(window.com.xoz.click_event, function(event) {
            event.preventDefault(), that.dom_element.trigger("mousemove"), that.events.publish("video/event/clicked"), that.doCall("AD_CLICK");

        })), this.addControlsListener(), this.events.publish("video/event/play"), this.controls.updateVolume(this.volume, this.muted);
    }, Flash.prototype.injectCacheBuster = function(movie_url) {
        var buster = "", suffix = this.config.getConfigValue("no_cache_suffix", "flash_player", ".bild.swf");
        return movie_url.search(suffix) === -1 ? (buster = "?flashcachebuster=" + this.config.guid(), movie_url += buster) : (buster = ",flashcachebuster=" + this.config.guid() + suffix, movie_url = movie_url.replace(suffix, buster)), this.logDebug("rewritten url: " + movie_url), movie_url;
    }, Flash.prototype.play = function() {
        this.doCall("RESUME");
    }, Flash.prototype.pause = function() {
        this.doCall("PAUSE");
    }, Flash.prototype.mute = function() {
        this.muted = !0, this.doCall("VOLUME_OFF"), this.controls.updateVolume(this.volume, this.muted);
    }, Flash.prototype.unmute = function() {
        this.muted = !1, this.doCall("VOLUME_ON"), this.controls.updateVolume
            (this.volume, this.muted);
    }, Flash.prototype.seek = function(time) {
        this.doCall("SEEK", {
            seekTime: time
        });
    }, Flash.prototype.setVolume = function(volume) {
        this.doCall("VOLUME_UPDATE", {
            volume: volume
        }), this.volume = volume, 0 !== this.volume && (this.muted = !1), this.controls.updateVolume(this.volume, this.muted);
    }, Flash.prototype.volumeUp = function(volume_difference) {
        this.doCall("VOLUME_UP", {
            volumeChange: volume_difference
        }), this.calculateVolume(volume_difference), this.controls.updateVolume(this.volume, this.muted);
    }, Flash.prototype.volumeDown = function(volume_difference) {
        this.doCall("VOLUME_DOWN", {
            volumeChange: volume_difference
        }), this.calculateVolume(-volume_difference), this.controls.updateVolume(this.volume, this.muted);
    }, Flash.prototype.enableSubtitles = function() {
        this.doCall("SUBTITLE_ON"), this.subtitle && this
            .subtitle.show();
    }, Flash.prototype.disableSubtitles = function() {
        this.doCall("SUBTITLE_OFF"), this.subtitle && this.subtitle.hide();
    }, Flash.prototype.enableHd = function() {
        this.doCall("HD_ON");
    }, Flash.prototype.disableHd = function() {
        this.doCall("HD_OFF");
    }, Flash.prototype.updateTime = function(time) {
        this.subtitle && this.subtitle.updateTime(time);
    }, Flash.prototype.addControlsListener = function() {
        var that = this;
        this.events.subscribe("video/controls/timeupdate", function(event_object) {
            that.doCall("SEEK", {
                seekTime: event_object.current_time
            });
        });
    }, Flash.prototype.calculateVolume = function(volume_change) {
        this.volume += volume_change, !0 === isNaN(this.volume) ? this.volume = 0 : 1 < this.volume ? this.volume = 1 : 0 > this.volume && (this.volume = 0);
    }, Flash.prototype.doCall = function(call_key, parameter) {
        try {

            this.logInfo("Call FLash player: ", call_key, parameter), "undefined" == typeof parameter ? this.flash_object.apiCall(call_key) : this.flash_object.apiCall(call_key, parameter);
        } catch (exception) {
            this.logError("Error while flash api call: ", call_key, parameter), !1 === this.cachebusting && (this.logInfo("... trying to reinitialize flash with cachebuster"), this.cachebusting = !0, this.removeMarkup(), this.initializeFlashElement());
        }
    }, Flash.prototype.destroy = function() {
        this.removeMarkup(), this.events.unsubscribe("videoplayer/flashplayer/ready"), this.events.unsubscribe("video/controls/timeupdate"), this.dom_element.off("mousemove keydown scroll mouseenter mouseleave"), clearTimeout(this.idleTimer), this.dom_element.removeClass("idle hover"), this.fix_overlay && this.fix_overlay.remove();
    }, Flash.prototype.removeMarkup = function() {
        !1 !== this.subtitle && (this.subtitle.destroy(), this.subtitle = null), null !== this.$flash_object &&
            (this.$flash_object.remove(), this.$flash_object = null, this.flash_object = null), this.wrapper.removeClass("flash-container");
    }, Flash.prototype.isPlaying = function() {
        return this.flash_object.askForPlayingStatus();
    }, Flash;
}), define("xoz/videoplayer/core/Subtitle", [], function() {
    var Subtitle = function(dom_element, video_id, source_file, track_element) {
        com.xoz.logger.applyLogging(this, "videoplayer/core/Subtitle"), this.dom_element = dom_element, this.track_element = track_element || !1, this.source_file = source_file || !1, this.video_id = video_id, this.entries = [], this.last_entry = !1, this.last_update_time = !1, this.element = !1, this.createSubtitleElement(), this.loadSubtitle();
    };
    return Subtitle.prototype.destroy = function() {
        this.element.remove();
    }, Subtitle.prototype.show = function() {
        this.element.removeClass("hide");
    }, Subtitle.prototype.hide = function() {
        this.element.addClass("hide");

    }, Subtitle.prototype.loadSubtitle = function() {
        var that = this;
        if (!1 === this.source_file) {
            this.logWarn("No Subtitle File !");
            return;
        }
        jQuery.ajax({
            url: this.source_file,
            success: function(data) {
                that.parseText(data);
            },
            error: function() {
                that.logError("cannot load subtitle src", that.source_file);
            }
        });
    }, Subtitle.prototype.updateTime = function(time) {
        this.last_update_time !== time && (this.last_update_time = time, this.updateSubtitle(time));
    }, Subtitle.prototype.createSubtitleElement = function() {
        this.element = jQuery('<div class="subtitle unselectable hide"></div>'), this.dom_element.append(this.element);
    }, Subtitle.prototype.trim = function(string) {
        return string.toString().replace(/^\s+/, "").replace(/\s+$/, "");
    }, Subtitle.prototype.parseText = function(text) {

        var lines = text.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var line = this.trim(lines[i]);
            if (0 < line.length) {
                var subtitle_entry = {
                    id: line
                }, times = this.parseTimes(this.trim(lines[++i]));
                subtitle_entry.start = times.start, subtitle_entry.stop = times.stop;
                var text = this.trim(lines[++i]), text_line;
                while (0 < (text_line = this.trim(lines[++i])).length) text += "<br/>" + text_line;
                subtitle_entry.text = text;
            }
            this.entries.push(subtitle_entry);
        }
    }, Subtitle.prototype.parseTimes = function(text) {
        if (0 === text.length) return this.logWarn("No Time found"), !1;
        var time_strings = text.split(" --> ");
        return 2 !== time_strings.length ? (this.logWarn(time_strings, "is not a valid time string"), !1) : {
            start: this.getSecondsFromTimeString(time_strings
                [0]),
            stop: this.getSecondsFromTimeString(time_strings[1])
        };
    }, Subtitle.prototype.getSecondsFromTimeString = function(time) {
        var seconds = 0, times = time.split(":");
        seconds += parseInt(times[0]) * 60 * 60, seconds += parseFloat(times[1]) * 60;
        var time_seconds = times[2].split(/\.|,/);
        return seconds += parseFloat(time_seconds[0]), seconds;
    }, Subtitle.prototype.updateSubtitle = function(current_time) {
        var entry = this.getEntry(current_time);
        !1 !== entry && this.element.html(entry.text);
    }, Subtitle.prototype.getEntry = function(time) {
        if (!1 !== this.last_entry) {
            if (this.last_entry.start <= time && this.last_entry.stop >= time) return this.last_entry;
            this.last_entry = !1, this.element.html("");
        }
        for (var i = 0; i < this.entries.length; i++) {
            var entry = this.entries[i];
            if (entry.start <= time && entry.stop >= time) return this
                .last_entry = entry, entry;
        }
        return !1;
    }, Subtitle;
}), define("xoz/videoplayer/core/Video", [ "xoz/videoplayer/core/Config", "xoz/videoplayer/core/BrowserDetection" ], function(config, browser_detection) {
    var Video = function(xml_data, events, dom_element, playlist, controls, start_timecode) {
        com.xoz.logger.applyLogging(this, "videoplayer/core/Video"), this.config = config, this.browser_detection = browser_detection, this.xml_data = xml_data, this.playlist = playlist, this.events = events, this.dom_element = jQuery(dom_element), this.wrapper = dom_element.find(".video_wrapper"), this.video_id = this.dom_element.attr("id"), this.controls = controls, this.start_timecode = start_timecode, this.initializeEventListeners(), this.initializeVideoElement(), this.try_alternative_source = !0, this.last_timeupdate_tracking_call = 0, this.timeupdate_intervall = this.config.getConfigValue("timeupdate_intervall", "tracking", 10), this.video_is_paused = !1, this.has_tracked_init = !1
            , this.has_tracked_video_start = !1, this.has_tracked_clip_start = !1, this.dom_element.addClass("playing"), this.subtitle = !1;
        var that = this;
        this.dom_element.hover(function() {
            that.dom_element.addClass("hover");
        }, function() {
            that.dom_element.removeClass("hover");
        }), that.dom_element.on("mousemove keydown scroll", function() {
            clearTimeout(that.idleTimer), that.idleState == 1 && that.dom_element.removeClass("idle"), that.idleState = !1, that.idleTimer = setTimeout(function() {
                that.dom_element.addClass("idle"), that.idleState = !0;
            }, 2e3);
        });
    };
    return Video.prototype.initializeEventListeners = function() {
        var that = this;
        com.xoz.events.subscribe("videoplayer/video/play", function(data) {
            that.browser_detection.isIOS() && data.video_id != that.video_id && that.$video_element.attr("controls", "controls");
        });
    }, Video.prototype
        .loadNextVideo = function() {
        this.video_object = this.playlist.getNextVideo();
        if (!this.video_object) return !1;
        this.has_tracked_clip_start = !1, this.loadVideo(this.video_object.source);
    }, Video.prototype.loadVideo = function(video) {
        if (this.isAdClip()) {
            this.video_object.time_events = [ {
                type: "/firstquartile",
                trigger: .25
            }, {
                type: "/midpoint",
                trigger: .5
            }, {
                type: "/thirdquartile",
                trigger: .75
            } ];
            var ad_text = "vast_preroll" == this.video_object.video_position ? this.xml_data.ad_texts.preroll : this.xml_data.ad_texts.postroll;
            this.controls.enableComercialMode(ad_text);
        } else this.controls.disableComercialMode();
        if (!this.isMainClip()) {
            var data = {
                hq: !1,
                subtitle: !1
            };
            this.events
                .publish("video/controls/setup/buttons", data), this.events.publish("video/livemodus/disable");
        } else this.setUpButtons(video);
        this.$video_element.attr("src", video.url), this.$video_element.attr("type", video.type), this.video_element.load();
    }, Video.prototype.setUpButtons = function(video) {
        var that = this, data = {
            hq: !1,
            subtitle: !1
        };
        !1 !== this.video_object.subtitle_src && (data.subtitle = !0, this.addSubtitle(this.video_object.subtitle_src)), video.hd && (data.hq = !0), !0 === this.video_object.is_live_stream && this.events.publish("video/livemodus/enable"), this.events.publish("video/controls/setup/buttons", data), this.$video_element.off(window.com.xoz.click_event).on(window.com.xoz.click_event, function(event) {
            that.dom_element.trigger("mousemove");
            if (!that.browser_detection.isMobile()) {
                event.preventDefault();
                if (that.isAdClip()) {

                    var url = that.GetAdClickThroughUrl();
                    url && (that.logDebug("open ad popup: ", url), window.open(url, "_blank"));
                } else that.events.publish("video/event/clicked");
            }
        });
    }, Video.prototype.addSubtitle = function(subtitle_src) {
        var that = this, subtitle = jQuery('<track kind="subtitles" src="' + subtitle_src + '" srclang="en" label="English">');
        this.$video_element.append(subtitle), require([ "xoz/videoplayer/core/Subtitle" ], function(Subtitle) {
            that.subtitle = new Subtitle(that.dom_element, that.video_id, subtitle_src, subtitle);
        });
    }, Video.prototype.initializeVideoElement = function() {
        var that = this;
        this.video_object = this.playlist.getNextVideo();
        if (!this.video_object) {
            com.xoz.events.publish("videoplayer/video/error", {
                id: this.video_id
            });
            return;
        }
        this.$video_element = jQuery("<video />"
        ), this.video_element = this.$video_element.get(0), this.$video_element.attr("src", this.video_object.source.url), this.$video_element.attr("type", this.video_object.source.type), this.$video_element.attr("autoplay", "autoplay"), this.browser_detection.isMobile() && (this.dom_element.addClass("native"), this.$video_element.attr("controls", "controls"), this.$video_element.attr("poster", this.wrapper.find("> img").attr("src")), this.fix_overlay = jQuery('<div class="fix_overlay"></div>'), this.fix_overlay.css("height", this.wrapper.outerHeight() - 45), this.wrapper.append(this.fix_overlay), this.fix_overlay.off(window.com.xoz.click_event).on(window.com.xoz.click_event, function(event) {
			
			if(!that.browser_detection.isIOS7() && that.video_element.currentTime <= 0){
				that.video_element.load();
				that.videoInitalized=1;
			}
			if (that.isAdClip() && that.video_element.currentTime != 0) {
                var url = that.GetAdClickThroughUrl();
				if(url){
					if(!that.browser_detection.isIOS() || that.browser_detection.isIOS7()){
						that.logDebug("open ad popup: ", url);
						window.open(url, "_blank");
					}
				}
            } else {
				if(that.browser_detection.isIOS7() && that.video_element.currentTime != 0) {
					that.fix_overlay.hide();
					that.$video_element.attr("controls","controls");
				}
			}
        })),this.browser_detection.isIOS() && !this.browser_detection.isIOS7() && this.fix_overlay.on("click",function(evt){
			if (that.isAdClip() && that.video_element.currentTime != 0 && that.GetAdClickThroughUrl()) {
				var a = document.createElement('a');
					a.setAttribute("href", that.GetAdClickThroughUrl());
					a.setAttribute("target", "_blank");

					var dispatch = document.createEvent("HTMLEvents");
					dispatch.initEvent("click", true, true);
					a.dispatchEvent(dispatch);
			} else {
				if(that.videoInitalized === 1 && that.video_element.currentTime != 0){
					that.fix_overlay.hide();
					that.$video_element.attr("controls","controls");
					that.videoInitalized=0;
				}
				
			}
		}), this.loadVideo
            (this.video_object.source), this.setUpButtons(this.video_object.source), this.wrapper.prepend(this.video_element), this.addVideoListener(), this.addControlsListener(), this.$video_element.trigger("volumechange"), this.xml_data.mute && this.mute(), setTimeout(function() {
				that.play();
        }, 100);
    }, Video.prototype.play = function() {
        this.video_element.play();
    }, Video.prototype.pause = function() {
        this.video_element.pause();
    }, Video.prototype.mute = function() {
        this.video_element.muted = !0, this.events.publish("video/track/" + this.video_object.video_position + "/mute", {});
    }, Video.prototype.unmute = function() {
        this.video_element.muted = !1, this.events.publish("video/track/" + this.video_object.video_position + "/unmute", {});
    }, Video.prototype.seek = function(time) {
        this.last_timeupdate_tracking_call = Math.round(time + (this.last_timeupdate_tracking_call - this.video_element.currentTime)), this.video_element
            .currentTime = time;
    }, Video.prototype.setVolume = function(volume) {
        this.video_element.volume = this.prepareVolume(volume);
    }, Video.prototype.volumeUp = function(volume_difference) {
        this.video_element.volume = this.prepareVolume(this.video_element.volume + volume_difference), this.$video_element.trigger("volumechange");
    }, Video.prototype.volumeDown = function(volume_difference) {
        this.video_element.volume = this.prepareVolume(this.video_element.volume - volume_difference), this.$video_element.trigger("volumechange");
    }, Video.prototype.enableSubtitles = function() {
        this.subtitle && this.subtitle.show();
    }, Video.prototype.disableSubtitles = function() {
        this.subtitle && this.subtitle.hide();
    }, Video.prototype.addControlsListener = function() {
        var that = this;
        this.events.subscribe("video/controls/timeupdate", function(event_object) {
            event_object.marker && that.video_object.video_position != "main" ?
                that.start_timecode = event_object.current_time : that.seek(event_object.current_time);
        });
    }, Video.prototype.prepareVolume = function(volume) {
        return 1 < volume ? 1 : 0 > volume ? 0 : volume;
    }, Video.prototype.addVideoListener = function() {
        var that = this;
        this.$video_element.on("timeupdate", function() {
            var current_time = that.video_element.currentTime, duration = that.video_element.duration, fired = [], time_events = that.video_object.time_events || [];
            jQuery.each(time_events, function(i, event) {
                current_time >= duration * event.trigger && (that.events.publish("video/track/" + that.video_object.video_position + event.type, {}), fired.push(i));
            }), jQuery.each(fired, function(i, index_to_delete) {
                time_events.splice(index_to_delete, 1);
            });
            if (that.isAdClip() && duration && current_time) that.controls.updateComercialTime(Math.round(duration - current_time
            )); else {
                that.subtitle && that.subtitle.updateTime(current_time), that.controls.updateCurrentTime(current_time, parseInt(duration));
                var timeupdate_interval = {
                    begin: that.last_timeupdate_tracking_call + that.timeupdate_intervall,
                    end: that.last_timeupdate_tracking_call + that.timeupdate_intervall + 1
                };
                current_time >= timeupdate_interval.begin && current_time <= timeupdate_interval.end && (that.last_timeupdate_tracking_call = current_time, that.events.publish("video/track/timeupdate", that.getTrackingObject()));
            }
        }), this.$video_element.on("progress", function() {
            that.browser_detection.isIOS() && that.video_element.readyState != 0 && ((that.isAdClip() && (that.videoInitalized===1 || that.browser_detection.isIOS7())) ? that.$video_element.removeAttr("controls") : !that.$video_element.hasAttribute("controls") && that.$video_element.attr("controls", "controls"));
			
            var buffered = that.video_element.buffered;
            if (0 < buffered.length) {

                var end = buffered.end(buffered.length - 1);
                that.controls.updateProgressbar(parseInt(end), parseInt(that.video_element.duration), !1);
            }
        }), this.$video_element.on("ended", function() {
            that.video_is_paused = !1, that.events.publish("video/track/" + that.video_object.video_position + "/complete", {}), !1 === that.loadNextVideo() && (com.xoz.events.publish("videoplayer/video/finish", {
                id: that.video_id
            }), that.events.publish("video/track/complete", that.getTrackingObject()));
        }), this.$video_element.on("error", function(event) {
            that.logError("Error while playback of ", that.$video_element.attr("src")), "main" === that.video_object.video_position ? !that.try_alternative_source || !that.video_object.alternative_source ? com.xoz.events.publish("videoplayer/video/error", {
                id: that.video_id
            }) : (that.try_alternative_source = !1, that.loadVideo(that.video_object.alternative_source
            )) : !1 === that.loadNextVideo() && (com.xoz.events.publish("videoplayer/video/finish", {
                id: that.video_id
            }), that.events.publish("video/track/complete", that.getTrackingObject()));
        }), this.$video_element.on("play", function(event) {
            that.$video_element.parent().is(that.wrapper) || (that.logInfo("adblock fix: readd video element to wrapper"), that.wrapper.append(that.$video_element)), that.events.publish("video/event/play"), com.xoz.events.publish("videoplayer/video/play", {
                video_id: that.video_id
            }), that.video_is_paused && (that.events.publish("video/track/resume", that.getTrackingObject()), that.events.publish("video/track/" + that.video_object.video_position + "/resume", {}), that.video_is_paused = !1), that.has_tracked_init || (that.events.publish("video/track/play", {
                percent: 0,
                duration: parseInt(that.xml_data.duration / 1e3)
            }), that.has_tracked_init = !0)
                , !that.has_tracked_clip_start && that.isAdClip() && (that.events.publish("video/track/" + that.video_object.video_position + "/start", {}), that.has_tracked_clip_start = !0);
            if (!that.has_tracked_video_start && that.isMainClip()) {
                var tracking_data = that.getTrackingObject();
                tracking_data.percent = 0, that.events.publish("video/track/start", tracking_data), that.has_tracked_video_start = !0;
            }
        }), this.$video_element.on("pause", function(event) {
            if (that.isAdClip()) {
                that.video_element.play();
                return;
            }
            that.events.publish("video/event/pause"), that.video_is_paused = !0;
            var tracking_data = that.getTrackingObject();
            100 !== tracking_data.percent && (that.events.publish("video/track/" + that.video_object.video_position + "/pause", {}), that.events.publish("video/track/pause", tracking_data));
        }), this.$video_element.on("volumechange"
            , function(event) {
                that.controls.updateVolume(parseFloat(that.video_element.volume), that.video_element.muted);
            }), this.$video_element.on("loadedmetadata", function(event) {
            that.controls.setDuration(that.video_element.duration), that.video_object.video_position == "main" && that.start_timecode && (that.seek(that.start_timecode), that.start_timecode = null);
        });
    }, Video.prototype.destroy = function() {
        !1 !== this.subtitle && (this.subtitle.destroy(), this.subtitle = null), this.dom_element.off("mousemove keydown scroll mouseenter mouseleave"), clearTimeout(this.idleTimer), this.dom_element.removeClass("idle hover"), this.$video_element.remove(), this.fix_overlay && this.fix_overlay.remove();
    }, Video.prototype.isPlaying = function() {
        return !0 === this.is_preview || !0 === this.video_is_paused ? !1 : !0;
    }, Video.prototype.isMainClip = function() {
        return "main" == this.video_object.video_position;
    }, Video
        .prototype.isAdClip = function() {
        return "vast_preroll" == this.video_object.video_position || "vast_postroll" == this.video_object.video_position;
    }, Video.prototype.GetAdClickThroughUrl = function() {
        return "vast_preroll" == this.video_object.video_position ? this.xml_data.vast.preroll.click_through : "vast_postroll" == this.video_object.video_position ? this.xml_data.vast.postroll.click_through : "";
    }, Video.prototype.getTrackingObject = function() {
        return {
            percent: this.video_element.currentTime / this.video_element.duration * 100,
            duration: this.video_element.duration
        };
    }, Video;
}), define("xoz/videoplayer/modules/tracker/Ivw", [], function() {
    var IvwTracker = function(events, dom_element, tracking_function) {
        var that = this;
        com.xoz.logger.applyLogging(this, "videoplayer/tracker/Ivw"), this.dom_element = dom_element, this.events = events, this.video_id = this.dom_element.attr("id"), this
            .tracking_function = tracking_function;
        this.onUserInitiate = function(){
            that.trackIvw();
        };
        var replace_values = [ ";", "%20", "javascript:void%", "javascript:void", "%20" ];
        jQuery(replace_values).each(function(index, value) {
            that.tracking_function = that.tracking_function.replace(value, "");
        }), this.tracking_function = this.tracking_function.replace("%COOKIE%", "''"), this.tracking_function = this.tracking_function.replace("%SEARCH%", "''"), this.events.subscribe("video/track/play", function(event_object) {
            // uncommented due OA-7200. Tracking ivw on initialisation triggered by user
            //that.trackIvw();
        }), this.events.subscribe("video/track/pause", function(event_object) {
            // uncommented due OA-7200. Tracking ivw on initialisation triggered by user
            //that.trackIvw();
        });
    };
    return IvwTracker.prototype.trackIvw = function() {
        try {
            this.function_name = this.function_name || this.tracking_function.substr(0, this.tracking_function.indexOf("(")), eval("typeof " + this.function_name + " == 'function'") ? eval(this.tracking_function) : this.logError('Tracking function "' + this.function_name + '" not found'
            );
        } catch (error) {
            this.logError("Try to eval the function", this.tracking_function);
        }
    }, IvwTracker;
}), define("xoz/videoplayer/modules/tracker/Tracker", [], function() {
    var Tracker = function(video_instance, tracking_function, tracker_name) {
        com.xoz.logger.applyLogging(this, "videoplayer/tracker/Tracker - " + tracker_name), this.video_instance = video_instance, this.events = video_instance.events, this.video_id = this.video_instance.video_id, this.tracking_function_key = tracking_function;
        var status = this.prepareTrackingFunction();
        !0 === status && this.bindEvents();
    };
    return Tracker.prototype.prepareTrackingFunction = function() {
        var that = this;
        this.revolver_mode = !1;
        if (this.video_instance.xml_data.tracking != "true") return this.logDebug("Tracking is disabled for instance ", this.video_id), !1;
        this.tracking_function = this.video_instance.xml_data[this.tracking_function_key
            ];
        if ("undefined" == typeof this.tracking_function) return this.logDebug("Tracking Function not found in the xml file", this.tracking_function), !1;
        var revolver_count = this.video_instance.dom_element.attr("data-revolver_count") || 0;
        revolver_count = isNaN(revolver_count) ? 0 : revolver_count, 0 < revolver_count ? (this.revolver_mode = !0, this.tracking_function = this.tracking_function.replace("%REVOLVER%", revolver_count), this.tracking_function = this.tracking_function.replace("%revolverloadautoplay%", revolver_count)) : (this.tracking_function = this.tracking_function.replace("%REVOLVER%", 0), this.tracking_function = this.tracking_function.replace("%revolverloadautoplay%", 0)), "undefined" != typeof this.video_instance.xml_data.autoplay && "true" == this.video_instance.xml_data.autoplay ? "bundesliga" == this.video_instance.layout ? this.tracking_function = this.tracking_function.replace("%AUTOPLAY%", "'PlayAutoBL'") : this.tracking_function = this.tracking_function
            .replace("%AUTOPLAY%", "'Autoplay'") : this.tracking_function = this.tracking_function.replace("%AUTOPLAY%", "'false'");
        var replace_values = [ ";", "%20", "javascript:void%", "javascript:void", "%20" ];
        return jQuery(replace_values).each(function(index, value) {
            that.tracking_function = that.tracking_function.replace(value, "");
        }), this.tracking_function = this.tracking_function.replace("%COOKIE%", "''"), this.tracking_function = this.tracking_function.replace("%SEARCH%", "''"), !0;
    }, Tracker.prototype.bindEvents = function() {
        var that = this;
        this.events.subscribe("video/track/set_revovlerload", function(event_object) {
            that.prepareTrackingFunction();
        }), this.events.subscribe("video/track/play", function(event_object) {
            var event_name = "'PLAY'";
            !0 === that.revolver_mode && (event_name = "'PlayAutoRev'"), that.trackEvent(event_name, event_object.percent, event_object.duration);

        }), this.events.subscribe("video/track/pause", function(event_object) {
            that.trackEvent("'PAUSE'", event_object.percent, event_object.duration);
        }), this.events.subscribe("video/track/timeupdate", function(event_object) {
            var current_time = Math.round(event_object.duration / 100 * event_object.percent);
            if (current_time && current_time <= 0) {
                that.logWarn("Abort tracking of timeupdate, illegal values:", event_object);
                return;
            }
            that.trackEvent("'TIMEUPDATE'", event_object.percent, event_object.duration);
        }), this.events.subscribe("video/track/start", function(event_object) {
            that.trackEvent("'START'", event_object.percent, event_object.duration);
        }), this.events.subscribe("video/track/resume", function(event_object) {
            that.trackEvent("'RESUME'", event_object.percent, event_object.duration);
        }), this.events.subscribe("video/track/complete",
            function(event_object) {
                var duration = that.video_instance.xml_data.duration;
                duration = duration ? duration / 1e3 : 0, that.trackEvent("'COMPLETE'", 100, duration);
            }), this.events.subscribe("video/track/fullscreen", function(event_object) {
            that.trackEvent("'FULLSCREEN'", event_object.percent, event_object.duration);
        }), this.events.subscribe("video/track/hq", function(event_object) {
            that.trackEvent("'HQ'", event_object.percent, event_object.duration);
        }), this.events.subscribe("video/track/event_marker", function(event_object) {
            that.trackEvent("'JUMPLABEL'", event_object.percent, event_object.duration, event_object.marker_type);
        }), this.events.subscribe("video/track/error", function(error_type) {
            that.trackEvent("'error'", 0, 0, "", error_type);
        });
    }, Tracker.prototype.trackEvent = function(event, percent, duration, event_marker, error_type) {
        event_marker =
            event_marker || "", error_type = error_type || "", !0 === isNaN(percent) && (this.logWarn("percent is not number", percent), percent = 0), !0 === isNaN(duration) && (this.logWarn("duration is not number", duration), duration = 0), duration = Math.round(duration / 100 * percent);
        try {
            var track_function = this.tracking_function;
            track_function = track_function.replace("%EVENT%", event), track_function = track_function.replace("%fehler%", "'" + error_type + "'"), track_function = track_function.replace("%PERCENT%", Math.round(percent)), track_function = track_function.replace("%DURATION%", Math.round(duration)), track_function = track_function.replace("%JUMP_LABEL%", "'" + event_marker + "'"), track_function = track_function.replace(/\%\w+\%/g, ""), this.function_name = this.function_name || this.tracking_function.substr(0, this.tracking_function.indexOf("(")), eval("typeof " + this.function_name + " == 'function'") ? eval(track_function) : (this.logError('Tracking function "' +
                this.function_name + '" not found'), this.logDebug(track_function));
        } catch (error) {
            this.logError("Try to eval the function", this.tracking_function);
        }
    }, Tracker;
}), define("xoz/videoplayer/modules/tracker/Vast", [], function() {
    var VastTracker = function(video_instance, tracking_data, tracker_name, position) {
        com.xoz.logger.applyLogging(this, "videoplayer/tracker/Tracker - " + tracker_name), this.video_instance = video_instance, this.events = video_instance.events, this.video_id = this.video_instance.video_id, this.track_impressions = tracking_data.impressions || [], this.track_events = tracking_data.events || {}, this.status = this.prepareTrackingFunction();
        var that = this;
        !0 === this.status && that.bindEvents(position);
    };
    return VastTracker.prototype.prepareTrackingFunction = function() {
        return this.video_instance.xml_data.tracking != "true" ? (this.logDebug("Tracking is disabled for instance ", this
            .video_id), !1) : !0;
    }, VastTracker.prototype.bindEvents = function(position) {
        var that = this;
        this.events.subscribe("video/track/" + position + "/start", function(event_object) {
            that.trackEvent("start");
        }), this.events.subscribe("video/track/" + position + "/pause", function(event_object) {
            that.trackEvent("pause");
        }), this.events.subscribe("video/track/" + position + "/resume", function(event_object) {
            that.trackEvent("resume");
        }), this.events.subscribe("video/track/" + position + "/mute", function(event_object) {
            that.trackEvent("mute");
        }), this.events.subscribe("video/track/" + position + "/unmute", function(event_object) {
            that.trackEvent("umute");
        }), this.events.subscribe("video/track/" + position + "/firstquartile", function(event_object) {
            that.trackEvent("firstquartile");
        }), this.events.subscribe("video/track/" + position + "/midpoint"
            , function(event_object) {
                that.trackEvent("midpoint");
            }), this.events.subscribe("video/track/" + position + "/thirdquartile", function(event_object) {
            that.trackEvent("thirdquartile");
        }), this.events.subscribe("video/track/" + position + "/complete", function(event_object) {
            that.trackEvent("complete");
        }), this.events.subscribe("video/track/" + position + "/fullscreen", function(event_object) {
            that.trackEvent("fullscreen");
        });
    }, VastTracker.prototype.trackEvent = function(event) {
        var that = this;
        event === "start" && this.track_impressions && this.track_impressions.length > 0 && jQuery.each(this.track_impressions, function(i, impression_url) {
            that.track(impression_url, "impression");
        });
        var track_events = this.track_events[event];
        track_events && track_events.length > 0 && jQuery.each(track_events, function(i, event_url) {
            that.track
                (event_url, event);
        });
    }, VastTracker.prototype.track = function(url, event) {
        this.logDebug("Track event:", event, url);
        var image = new Image;
        image.src = url;
    }, VastTracker;
}), define("xoz/videoplayer/modules/controls/Welt", [], function() {
    var WeltControls = function() {
        com.xoz.logger.applyLogging(this, "videoplayer/controls/Welt");
    };
    return WeltControls.prototype.applyLayout = function(element) {
        for (var property in this) "applyLayout" !== property && (element[property] = this[property]);
    }, WeltControls.prototype.bindAdditionalButtons = function() {
        this.volumebar();
    }, WeltControls.prototype.updateVolume = function(volume, muted) {
        1 == muted || 0 == volume ? (this.mute_button.addClass("muted"), this.volume_slider.css("height", "100%"), this.volume_slider_icon.css("top", "100%")) : (this.mute_button.removeClass("muted"), this.volume_slider.css("height", 100 - volume * 100 + "%"), this
            .volume_slider_icon.css("top", 100 - volume * 100 + "%"));
    }, WeltControls.prototype.volumebar = function() {
        var that = this;
        this.volume_el = this.dom_element.find(".box-volume"), this.volume_box = this.dom_element.find(".volume-slider"), this.volume_slider = this.dom_element.find(".volume-slider-foreground"), this.volume_slider_icon = this.dom_element.find(".slider"), this.mute_button.on("hover", function(event) {
            that.mute_button.hasClass("muted") || (event.type === "mouseenter" ? that.volume_el.removeClass("hide") : event.type === "mouseleave" && setTimeout(function() {
                that.volume_el.hasClass("hover") || that.volume_el.fadeOut(100, function() {
                    that.volume_el.addClass("hide"), that.volume_el.removeAttr("style");
                });
            }, 100));
        }), this.mute_button.on(window.com.xoz.click_event, function(event) {
            that.mute_button.hasClass("muted") ? that.volume_el.fadeOut(100, function(
                ) {
                that.volume_el.addClass("hide"), that.volume_el.removeAttr("style");
            }) : that.volume_el.removeClass("hide");
        }), this.volume_el.on("hover", function(event) {
            that.volume_el.toggleClass("hover"), event.type === "mouseleave" && that.volume_el.fadeOut(100, function() {
                that.volume_el.addClass("hide"), that.volume_el.removeAttr("style");
            });
        });
        var onVolumeChange = function(event) {
            var volume = that.getClickPosition(event, that.volume_box, !1);
            that.volume_slider.css("height", 100 - volume * 100 + "%"), that.volume_slider_icon.css("top", 100 - volume * 100 + "%"), that.callPlayer("setVolume", volume);
        }, document_element = jQuery(document);
        this.volume_el.on("mousedown", function() {
            document_element.on("mousemove.controls.welt", onVolumeChange), document_element.one("mouseup", function() {
                document_element.off("mousemove.controls.welt"
                );
            });
        });
    }, WeltControls.prototype.createControls = function(dom_element) {
        var controls = jQuery('<div class="controls unselectable hide"><button class="play-pause-toggle"></button><div class="progress-bar"><div class="progress-bar-background"></div><div class="progress-bar-load"></div><div class="progress-bar-play"></div><div class="progress-bar-slider"></div></div><button class="fullscreen"></button><button class="mute"></button><div class="comercial-text hide"><span class="normal-text">Gleich geht\'s weiter</span></div><span class="time-display"><span class="live-text">Live</span><time class="current-time">0:00</time><span class="time-seperator">/</span><time class="duration">0:00</time></span><div class="box-volume hide"><div class="box-background"></div><div class="volume-slider round-corners"><div class="volume-slider-foreground" style="height: 50%"></div><div class="slider" style="top: 50%"></div></div></div></div>');
        return dom_element.
            append(controls), controls;
    }, WeltControls;
});;
