!(function () {

    function isFeatureEnabled(feature, featureCookie) {
        return (window.LaCommons && window.LaCommons.config && window.LaCommons.config.feature && window.LaCommons.config.feature[feature]) || readCookie(featureCookie) === "true";
    }

    function readCookie(cookieName) {
        var re = new RegExp('[; ]' + cookieName + '=([^\\s;]*)');
        var sMatch = (' ' + document.cookie).match(re);
        if (cookieName && sMatch) {
            return unescape(sMatch[1]);
        }
        return '';
    }

    var head = document.getElementsByTagName('head').item(0);

    function addOnLoad(element, callback) {
        if (element.addEventListener) {
            element.addEventListener("load", callback, false);
        } else if (element.attachEvent) {
            element.attachEvent("onload", callback);
        } else {
            element["onload"] = callback;
        }
    }

    function addElement(elementName, attributes, onLoad) {
        var element = document.createElement(elementName);
        for (var attribute in attributes) {
            if (attributes.hasOwnProperty(attribute)) {
                element.setAttribute(attribute, attributes[attribute]);
            }
        }
        if (onLoad) {
            addOnLoad(element, onLoad);
        }
        head.appendChild(element);
    }

    function isDarklaunch() {
        return (localStorage && localStorage.getItem("darklaunch") === "on") ||
            readCookie("ladarklaunch") === "on" ||
            window.location.hash.indexOf("#darklaunch") >= 0;
    }

    function loadCss(defaultHost, resource, version, cookieName) {
        var customHost = readCookie(cookieName);
        var useVersion = version && (!customHost || customHost === defaultHost);
        var path = "//" + (customHost || defaultHost) + resource + (useVersion ? ("?v=" + version) : "");

        addElement("link", {
            rel: "stylesheet",
            type: "text/css",
            href: path
        });
    }

    function loadJs(ressourceIdentifier, withCache, defaultHost, resource, version, cookieName, callback) {
        var customHost = readCookie(cookieName);
        var useVersion = version && (!customHost || customHost === defaultHost);
        var path = "//" + (customHost || defaultHost) + resource + (useVersion ? ("?v=" + version) : "");

        var scriptLoaded = false;

        if(withCache && isCacheForDomainAllowed()){
            try{
                loadOrInjectFromCache(ressourceIdentifier, path, callback);
                scriptLoaded = true;
            }catch(e){}
        }

        if(!scriptLoaded) {
            addElement("script", {
                type: "text/javascript",
                async: true,
                src: path
            }, callback);
        }
    }

    function initCommons(callback) {
        loadJs("laCommons", true, "loader.la.welt.de", "/la-commons.js", "cde0810c7c5c9220", "commonsstage", callback);
    }

    function initLiveApps() {
        if (!isFeatureEnabled("casinoEmergency", "featureCasinoEmergency")) {
            loadCss("lo.la.welt.de", "/static/css/loyal.css", "519fbc64c3c4efcd", "casinostage");
            loadJs("laCasino", true, "lo.la.welt.de", "/static/js/casino.js", "6eccd1bdaa549552", "casinostage");
        }
        loadJs("laJudge", true, "judge.la.welt.de", "/static/js/judge.js", "bcef3efd86eebddb", "judgestage");
        if (!isFeatureEnabled("communityEmergency", "featureCommunityEmergency")) {
            loadJs("laCommunity", true,"co.la.welt.de", "/js/communityweb.js", "9396c21a097f387f", "communitystage");
        }
        loadJs("laSchrotty", false, "schrotty.la.welt.de", "/js/la-schrotty.js", "fec4ac85c18947f8", "schrottystage");
        if (document.location.href.indexOf("profil.welt.de") >= 0) {
            loadJs("laProfile", false, "profil.welt.de", "/js/la-profile.js", "a94aab10497a8018", "profilestage");
        }
        loadJs("laMe", false, "me.la.welt.de", "/js/la-me.js", "825dc424c3060868", "mestage");
    }

    function initDarkLaunchApps() {
        loadJs("laVader", false, "vader.la.welt.de", "/la-vader.js", "5b86b8f95b5a4fc9", "vaderstage");
        loadJs("laHackathonVideo", false, "profil.welt.de", "/js/la-hackathon-video.js", "21c580d89d3909ba", "vhstage");
    }

    function isCacheForDomainAllowed(){
        return document.location.host === "www.welt.de" && isLocalStorageAvailable();
    }

    function isLocalStorageAvailable() {
        try {
            var x = 'la-ls';
            localStorage.setItem(x, x);
            var y = localStorage.getItem(x);
            localStorage.removeItem(x);
            return y === x;
        } catch (exception) {
            return false;
        }
    }

    function loadOrInjectFromCache(ressourceIdentifier, ressource, callback) {
        var url_version = ressource.split("?");
        var version = hash(url_version[1]);
        var cachedRessource = getRessourceFromCache(ressourceIdentifier, version);
        if (cachedRessource == null) {
            localStorage.removeItem(ressourceIdentifier);
            loadStoreAndInject(ressourceIdentifier, ressource, version, callback);
        } else {
            inject(cachedRessource, callback);
        }

    }

    function getRessourceFromCache(ressourceIdentifier, version) {
        var cacheObject = localStorage.getItem(ressourceIdentifier);
        var ressourceItem = JSON.parse(cacheObject);
        return (ressourceItem != null && ressourceItem["version"] === version) ? ressourceItem : null;
    }

    function loadStoreAndInject(ressourceIdentifier, ressource, version, callback) {
        var injectIntoPage = function (content) {
            var ressourceItem = {};
            ressourceItem["version"] = version;
            ressourceItem["script"] = content;
            localStorage.setItem(ressourceIdentifier, JSON.stringify(ressourceItem));
            inject(ressourceItem, callback);
        };
        ajaxGET(ressource + "&ajax", injectIntoPage);
    }

    function inject(ressourceItem, callback) {
        var script = document.createElement('script');
        script.innerHTML = ressourceItem.script;
        (document.body || document.head || document.documentElement).appendChild(script);
        if (typeof(callback) !== 'undefined') {
            callback();
        }
    }

    function hash(s) {
        return s.split("").reduce(function (a, b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a
        }, 0);
    }

    function ajaxGET(url, successMethod) {
        if (window.XMLHttpRequest) {
            var xhttp;
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    if (typeof successMethod === "function") {
                        successMethod(this.responseText);
                    }
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        }
    }

    //handle darklaunch bootstrap
    var darklaunch = isDarklaunch();

    initCommons(function () {
        initLiveApps();
        if (darklaunch) {
            initDarkLaunchApps();
        }
    });

    if (!darklaunch && window.location.hash.indexOf("#darklaunch") === -1) {
        window.addEventListener("hashchange", function () {
            if (window.location.hash.indexOf("#darklaunch") >= 0) {
                initCommons(function () {
                    initDarkLaunchApps();
                });
            }
        });
    }

})();
