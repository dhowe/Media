/*jslint browser: true, sloppy: true, plusplus: true, nomen: true, todo: true*/
/*globals $, jQuery, console, ddsWidgetConfig */

if (!window.console) {
    var noop = function () {},
        console = {
            log: noop,
            info: noop,
            warn: noop,
            error: noop
        };
}
(function (prodOptions, devOptions) {

    var tempJQuery,
        scriptTag,
        devMode = (location.hash.indexOf("ddsdev") !== -1),
        options = (!devMode || !devOptions)? prodOptions : devOptions,
        scripts = options.scripts,
        css = options.css,
        baseUrl = options.baseUrl,
        basePath= options.basePath;

    function createDdsWidgetConfig() {
        if (typeof ddsWidgetConfig !== 'object') {
            ddsWidgetConfig = {};
        }
        if (typeof rnwWidget !== 'object') {
            rnwWidget = {};
        }
        if (typeof rnwWidget.widgets !== 'object') {
            rnwWidget.widgets = {};
        }
        if(typeof rnwWidget.widgets['bre2'] !== 'object') {
            rnwWidget.widgets['bre2'] = {};
        }
        if(typeof rnwWidget.widgets['bre2']['configurations'] !== 'object') {
            rnwWidget.widgets['bre2']['configurations'] = {};
        }
        if(typeof rnwWidget.widgets['bre2']['configurations']['woz'] !== 'object') {
            rnwWidget.widgets['bre2']['configurations']['woz'] = {};
        }

        // Set this variable so that it can be used as an IIFE argument in widget scripts.
        // This way, the widget code doesn't need to 'know' what name it has been given.
        rnwWidget.widgets.currentName = 'bre2';
    }

    function addCssTag(cssUrl) {
        var cssLink = jQueryFix('<link>', {
                rel: 'stylesheet',
                type: 'text/css',
                href: cssUrl
            });
        jQueryFix('head').append(cssLink);
    }

    function init() {
        jQueryFix(document).ready(function () {
            createDdsWidgetConfig();

            loadJavascript(scripts);
        });
    }

    function jQueryLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable

        jQueryFix = window.jQuery.noConflict(true);
        init();
    }

    function scriptLoaderHandler() {
        loadJavascript();
    }

    function addParametersToDdsWidgetConfig() {
        var epikOptions = {};epikOptions["apiendpoint"] = "https://dds-pay.getunik.net/epayment/api/step/pay/merchant/gi-w-j2axh";epikOptions["use_pay_proxy"] = "true";epikOptions["secure_cookie"] = "false";epikOptions["test_mode"] = "false";epikOptions["method"] = "POST";epikOptions["mobile_mode"] = "false";epikOptions["enable_jquery"] = "true";epikOptions["iframe_container"] = "iframe_wrapper";epikOptions["trigger_event"] = "click";epikOptions["auto_submit"] = "false";epikOptions["currency"] = "chf";epikOptions["language"] = "de";epikOptions["popup"] = "true";var baseResponseUrl=window.location.protocol + "//" + window.location.host;epikOptions.success_url=baseResponseUrl + "/widgets/bre2/ddswidget.html";epikOptions.error_url=baseResponseUrl + "/widgets/bre2/ddswidget.html";epikOptions.cancel_url=baseResponseUrl + "/widgets/bre2/ddswidget.html";epikOptions.widget_uuid="woz";epikOptions.iframe_loading_page="/widgets/bre2/ddswidget.html?ddssubmit=true";epikOptions.pollstatus_url="https://dds-widget.getunik.net/widgets/bre2/_default/pollstatus.php";epikOptions.crmc_url="https://dds-widget.getunik.net";rnwWidget.widgets["bre2"]["configurations"]["woz"].epikOptions = epikOptions;rnwWidget.widgets["bre2"]["configurations"]["woz"].baseResponseUrl = baseResponseUrl;rnwWidget.widgets["bre2"]["configurations"]["woz"].translations = {"common":{"widgetTitle":"Schnell & sicher per SMS spenden","currency":"CHF","leadText":"Spenden Sie mit Ihrem Handy. Tragen Sie Ihre Handy-Nr. und Ihren Wunschbetrag ein, und Sie erhalten ein SMS, um zu spenden. Vielen Dank.","phoneFieldLabel":"Ihre Mobilnummer +41","submitButtonText":"Ich will spenden!","secureTitle":"Ihre Daten sind sicher.","secureLinkLabel":"Datenschutz","invalidMsisdnMessage":"Die eingegebene Handynummer ist ung\u00fcltig.","invalidAmountMessage":"Bitte geben Sie einen Betrag zwischen CHF 1 und 99 ein.","back":"Zur\u00fcck zur Spendenm\u00f6glichkeit","sid":488,"keyword":"WOZ","secure_logo":"_default\/img\/lock.png","quality_logo":""},"polling":{"title":"Danke, nur noch einen Schritt","text":"Wir haben Ihre Spenden-Nachricht erhalten. In K\u00fcrze erhalten Sie ein SMS an die angegebene Handy-Nummer. Bitte best\u00e4tigen Sie dann Ihre Spende sofort per SMS (um Missbr\u00e4uche zu vermeiden). Nur dann spenden Sie f\u00fcr unsere Projekte. Wir erhalten Ihre Spende via Ihre Handy-Rechnung.","timeLeftText":"Verbleibende Zeit f\u00fcr die Best\u00e4tigung per SMS","noSmsLinkLabel":"Keine SMS erhalten?","cancelTransactionLinkLabel":"Spende abbrechen"},"secure":{"title":"Datenschutzbestimmungen","text":"Wir bieten f\u00fcr Spenden die Zahlungsm\u00f6glichkeit SMS an. Die \u00dcbermittlung der Daten erfolgt verschl\u00fcsselt. Ihre Zahlungsdaten laufen direkt \u00fcber einen externen zertifizierten Partner. Unsere Dienstleister d\u00fcrfen die Informationen ausschliesslich zur Erf\u00fcllung ihrer Aufgaben nutzen und sind verpflichtet, die schweizerischen Datenschutzbestimmungen einzuhalten."},"result":{"successText":"Vielen Dank f\u00fcr Ihre Spende.","successTitle":"Vielen Dank!","errorMessage":"Ein Fehler beim Verbinden mit dem Server ist aufgetreten. Bitte versuchen Sie es sp\u00e4ter nochmals.","declinedMessage":"Sie haben die Spende abgebrochen.","timedoutMessage":"Die Zeit zur Best\u00e4tigung der SMS ist abgelaufen."}};rnwWidget.widgets["bre2"]["configurations"]["woz"].urlToWidget = "https://dds-widget.getunik.net/widgets/bre2/";rnwWidget.widgets["bre2"]["configurations"]["woz"].merchantConfig = "gi-w-j2axh";rnwWidget.widgets["bre2"]["configurations"]["woz"].widgetName = "bre2";rnwWidget.widgets["bre2"]["configurations"]["woz"].widgetUUID = "woz";rnwWidget.widgets["bre2"]["configurations"]["woz"].widgetParams = {"common":{"scripts":["_default\/js\/epik.js","_default\/js\/widget.utils.js","_default\/js\/widget.base.js","_default\/js\/ddswidget-core.js"],"css":["_default\/css\/styles.css"],"base_url":"https:\/\/dds-widget.getunik.net","base_path":"\/widgets\/","default_lang":"de","jquery_version":"1.11.0"},"capabilities":{"has_initializer":true},"amounts":{"200":"2","500":"5","2000":"20"},"defaults":{"amount":500}};rnwWidget.widgets["bre2"]["configurations"]["woz"].legacy = {};rnwWidget.widgets["bre2"]["configurations"]["woz"].legacy = {"country":"ch","origin":"normal"};
        return rnwWidget.widgets['bre2']['configurations']['woz'];
    }

    function loadJavascript() {

        scriptUrl = scripts.shift();
        if (scriptUrl) {
            scriptUrl = baseUrl + scriptUrl;
            scriptTag = document.createElement('script');
            scriptTag.setAttribute('type', 'text/javascript');
            scriptTag.setAttribute('src', scriptUrl);
            if (scriptTag.readyState) {
                scriptTag.onreadystatechange = function () { // For old versions of IE
                    if (this.readyState === 'complete' || this.readyState === 'loaded') {
                        scriptLoaderHandler();
                    }
                };
            } else { // Other browsers
                scriptTag.onload = scriptLoaderHandler;
            }
            // Try to find the head, otherwise default to the documentElement
            (document.getElementsByTagName('head')[0]
                                || document.documentElement).appendChild(scriptTag);
        } else {
            initializeWidgets();
        }
    }

    function initializeWidgets() {
        var jsonpTemplateUrl = baseUrl + basePath + 'dds-widget-de.html?callback=?',
            parameters = addParametersToDdsWidgetConfig(),
            caps = parameters.widgetParams.capabilities || {},
            ieversion = false;

        if(devMode) {
            jsonpTemplateUrl = baseUrl + '/widgets/bre2/_default/htmlgenerator.php?callback=?&widget-uuid=woz&lang=de&dev=true';
        }
        jQueryFix.extend(parameters, {
            jsonpTemplateUrl: jsonpTemplateUrl,
            widgetBaseUrl: baseUrl,
            widgetConfigUrl: baseUrl + basePath,
            widgetDefaultUrl: baseUrl + '/widgets/bre2/_default/',
            css: css,
            scripts: scripts,
        });

        if (caps.has_initializer === true) {
            initializeWithInitializer(parameters);
        } else {
            // old way of injecting CSS
            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
                ieversion = new Number(RegExp.$1); // capture x.x portion and store as a number
            }
            if (ieversion >= 9 || ieversion === false) {
                css.push('/widgets/bre2/_default/css/radio_checkbox.css');
            }
            while(css.length > 0) {
                addCssTag(baseUrl + css.shift());
            }
            if(ddsWidgetConfig.css !== 'undefined') {
                 addCssTag(ddsWidgetConfig.css);
            }

            // old way of adding template markup independent of widget implementation
            jQueryFix.ajax({
                url: jsonpTemplateUrl,
                type: 'GET',
                cache: false,
                dataType: 'jsonp',
                jsonpCallback : 'getWidgetTemplate',
                crossDomain: true,
                success: function (data) {
                    jQueryFix(data).appendTo(jQueryFix('.dds-widget-container'));
                    window.initWidget(parameters);
                }
            });
        }
    }

    function initializeWithInitializer(widgetConfig) {
        // The 'order' variable is used as a fallback mechanism for legacy compatibility. If there are no
        // widget containers with the 'data-widget' attribute matching the current widget name, it will
        // initialize all widgent containers _without_ a data-widget attribute
        var order = ['.dds-widget-container[data-widget="' + widgetConfig.widgetName + '"]', '.dds-widget-container:not([data-widget])'],
            matches, i;

        for (i = 0; i < order.length; i++) {
            matches = jQueryFix(order[i]);
            if (matches.length > 0)
            {
                matches.each(function (index, element) {
                    // instantiate the widget using the registered initializer function
                    var instance = new window.rnwWidget.widgets[widgetConfig.widgetName].initializer(jQueryFix, jQueryFix(this), widgetConfig);
                    // store the instance - it is used from return pages to trigger response processing
                    window.rnwWidget.widgets.instances[instance.id] = instance;
                });
                break;
            }
        }
    }

    //jquery 1.9.1 patched because of http://bugs.jquery.com/ticket/13936.
    if (window.jQuery === undefined || window.jQuery.fn.jquery != '1.11.0') {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'text/javascript');
        scriptTag.setAttribute('src',
            'https://dds-widget.getunik.net/widgets/ela/_default/js/jquery-1.11.0.min.js');
        if (scriptTag.readyState) {
            scriptTag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState === 'complete' || this.readyState === 'loaded') {
                    jQueryLoadHandler();
                }
            };
        } else { // Other browsers
            scriptTag.onload = jQueryLoadHandler;
        }
        //tempJQuery = window.jQuery;

        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName('head')[0]
                            || document.documentElement).appendChild(scriptTag);
    } else {
        // The jQuery version on the window is the one we want to use
        /*jQuery = window.jQuery;
        tempJQuery = jQuery;*/
        jQueryFix = window.jQuery;
        init();
    }
    // only create a GoogleAnalytics 'ga' object if there isn't one already, otherwise this
    // would load the analytics.js script a second time which increases overall load time
    /*if (window.ga === undefined) {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    }

    // create a custom _named_ tracker for the widget tracking requests to avoid any
    // potential conflicts with existing GoogleAnalytics code on the target page
    ga('create', 'UA-688857-69', 'getunik.net', {'name': 'rnwWidgetTracker'});
    ga('rnwWidgetTracker.send', 'pageview', {'location' : window.location.protocol + '//' + window.location.hostname + window.location.pathname + window.location.search, 'page' : window.location.protocol + '//' + window.location.hostname + window.location.pathname + window.location.search});

    */
})({scripts:["/widgets/bre2/woz/js/dds-widget-de.min.js"],css:["/widgets/bre2/woz/css/dds-widget.min.css"],baseUrl:"https://dds-widget.getunik.net",basePath:"/widgets/bre2/woz/"}, {scripts:["/widgets/bre2/_default/js/epik.js","/widgets/bre2/_default/js/widget.utils.js","/widgets/bre2/_default/js/widget.base.js","/widgets/bre2/_default/js/ddswidget-core.js"],css:["/widgets/bre2/_default/css/styles.css"],baseUrl:"https://dds-widget.getunik.net",basePath:"/widgets/bre2/woz/"});

