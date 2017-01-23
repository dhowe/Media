if (!window.$ADP) {
    $ADP = {}
}
$ADP.Registry = $ADP.Registry || {
    data: {},
    wait: 2000,
    LAST: "LAST",
    MAIN: "MAIN",
    POPUP: "POPUP",
    FRIENDLY_IFRAME: "FRIENDLY_IFRAME",
    FOREIGN_IFRAME: "FOREIGN_IFRAME",
    POSTMESSAGE_SEARCH: "POSTMESSAGE_SEARCH",
    header: '<strong class="adp-header-strong">Informationen zu nutzungsbasierter Online-Werbung</strong><br/>In der vorliegenden Anzeige werden Ihre Nutzungsdaten anonym erhoben bzw. verwendet, um Werbung f&uuml;r Sie zu optimieren. Wenn Sie keine nutzungsbasierte Werbung mehr von den hier gelisteten Anbietern erhalten wollen, k&ouml;nnen Sie die Datenerhebung beim jeweiligen Anbieter direkt deaktivieren. Eine Deaktivierung bedeutet nicht, dass Sie k&uuml;nftig keine Werbung mehr erhalten, sondern lediglich, dass die Auslieferung der konkreten Kampagne nicht anhand anonym erhobener Nutzungsdaten ausgerichtet ist.',
    footer: 'Wenn Sie mehr &uuml;ber nutzungsbasierte Online-Werbung erfahren wollen, klicken Sie <a href="http://meine-cookies.org" target="_blank">hier</a>. Dort k&ouml;nnen Sie dar&uuml;ber hinaus auch bei weiteren Anbietern die Erhebung der Nutzungsinformationen deaktivieren bzw. aktivieren und den Status der Aktivierung bei unterschiedlichen Anbietern <a href="http://meine-cookies.org/cookies_verwalten/praeferenzmanager-beta.html" target="_blank">einsehen</a>.',
    publisherInfo: undefined,
    register: function(b, a) {
        this._register(b, a, false)
    },
    _register: function(b, a, e) {
        if (!a) {
            a = {}
        }
        if (!this.data[b]) {
            this.data[b] = {
                items: []
            }
        }
        var c = {};
        for (var d in a) {
            switch (d) {
                case "domId":
                    this.data[b][d] = a[d];
                    break;
                case "header":
                case "footer":
                case "title":
                case "text":
                case "url":
                case "linkText":
                case "usePopup":
                case "renderCloseButton":
                    c[d] = a[d];
                    break;
                default:
                    break
            }
        }
        if (!e) {
            this.data[b].items.push(c)
        } else {
            this.data[b].items.unshift(c)
        }
    },
    unregister: function(a) {
        if (!this.data[a]) {
            return
        }
        delete this.data[a]
    },
    getById: function(a) {
        var b = [];
        if (this.data[a]) {
            b = this.data[a].items || []
        }
        return b
    },
    pullById: function(a) {
        var b = this.getById(a);
        this.unregister(a);
        return b
    },
    getDOMId: function(a) {
        if (this.data[a]) {
            return this.data[a].domId
        }
    },
    hasId: function(a) {
        return this.data[a] ? true : false
    },
    setPublisherInfo: function(a) {
        if (typeof this.publisherInfo === "undefined") {
            this.publisherInfo = a
        }
    },
    checkParentAccess: function(d) {
        var c;
        var a = function(g) {
            try {
                return Boolean(g.$ADP)
            } catch (f) {
                return false
            }
        };
        try {
            if (d.parent.location.href == undefined) {
                c = this.FOREIGN_IFRAME
            } else {
                if (a(d.parent)) {
                    c = this.FRIENDLY_IFRAME
                } else {
                    c = this.POSTMESSAGE_SEARCH
                }
            }
        } catch (b) {
            c = this.FOREIGN_IFRAME
        }
        return c
    },
    getWindowChain: function(d) {
        if (!this.data[d].windowChain) {
            var f = this.checkParentAccess(window.parent);
            var a = {
                1: {
                    type: f,
                    window: window,
                    parent: window.parent
                }
            };
            if (window != window.parent) {
                var b = true;
                var c = 2;
                var e = window.parent;
                var f;
                while (b) {
                    if (e == e.parent) {
                        f = this.checkParentAccess(e.parent);
                        a[c] = {
                            type: f,
                            window: e
                        };
                        b = false
                    } else {
                        f = this.checkParentAccess(e.parent);
                        a[c] = {
                            type: f,
                            window: e,
                            parent: e.parent
                        };
                        e = e.parent
                    }
                    c++
                }
                if (window.opener) {
                    f = this.checkParentAccess(window.opener);
                    a[c] = {
                        type: f,
                        window: window,
                        parent: window.opener
                    }
                }
            } else {
                if (window.opener) {
                    f = this.checkParentAccess(window.opener);
                    a[2] = {
                        type: f,
                        window: window,
                        parent: window.opener
                    }
                }
            }
            this.data[d].windowChain = a
        }
        return this.data[d].windowChain
    },
    checkAndReducePostMessageCounter: function(a) {
        this.data[a].postMessageCounter--;
        if (this.data[a].postMessageCounter == 0) {
            clearTimeout(this.data[a].postMessageTimeout);
            this.submitPrivacy(a)
        }
    },
    registerParentItems: function(a, b) {
        if (!b) {
            b = []
        }
        if (!this.data[a]) {
            return
        }
        if (this.data[a].iframeSearch && this.data[a].iframeSearch.timeoutId) {
            clearTimeout(this.data[a].iframeSearch.timeoutId)
        }
        b.reverse();
        for (var c in b) {
            $ADP.Registry._register(a, b[c], true)
        }
    },
    createPlayer: function(e, a) {
        if (!a) {
            a = {}
        }
        var d = a.header || this.header;
        var c = a.footer || this.footer;
        var h = this.publisherInfo || "";
        var b = a.domId;
        var g = a.position || "top-right";
        var j = a.usePopup || true;
        var i = a.renderCloseButton == false ? false : true;
        if (!this.data[e]) {
            this.data[e] = {
                domId: null,
                items: []
            }
        }
        if (b) {
            this.data[e].domId = b
        }
        b = this.getDOMId(e);
        var f = $ADP.Player(e, {
            domId: b,
            position: g,
            header: d,
            footer: c,
            publisherInfo: h,
            usePopup: j,
            renderCloseButton: i
        });
        f.inject();
        this.data[e].player = f;
        return f
    },
    generateId: function() {
        var a;
        do {
            a = parseInt(Math.random() * 100000000)
        } while (this.hasId(a));
        return a
    },
    messageHandler: function(b) {
        try {
            var c = $ADP.Message.parse(b.data),
                f = b.source,
                d = "";
            if (f == window) {
                return null
            }
            switch (c.type) {
                case $ADP.Message.types.pullOBA:
                    d = $ADP.Registry.getById(c.data);
                    $ADP.Message.send(f, $ADP.Message.types.pullOBA_ACK, {
                        id: c.data,
                        items: d
                    });
                    break;
                case $ADP.Message.types.unRegOBA:
                    d = $ADP.Registry.unregister(c.data);
                    break;
                case $ADP.Message.types.pullOBA_ACK:
                    if (c.data.id && c.data.items && c.data.items.length) {
                        $ADP.Registry.registerParentItems(c.data.id, c.data.items);
                        $ADP.Message.send(f, $ADP.Message.types.unRegOBA, c.data.id);
                        $ADP.Registry.checkAndReducePostMessageCounter(c.data.id)
                    }
                    break
            }
        } catch (a) {
            $ADP.Util.log("Received Message", b, " Rejected ", a)
        }
    },
    getItems: function(b) {
        var e = this.data[b].items;
        var c = [];
        for (var a = 0; a < e.length; a++) {
            if (e[a].usePopup == false) {
                this.data[b].player.usePopup = false
            }
            if (e[a].renderCloseButton == false) {
                this.data[b].player.renderCloseButton = false
            }
            var d = $ADP.PrivacyInfo(e[a]);
            if (d.isValid()) {
                c.push(d)
            }
        }
        return c
    },
    collectPrivacy: function(d) {
        var j = true;
        if (this.data[d].items && this.data[d].items.length) {
            for (var c in this.data[d].items) {
                if (this.data[d].items[c].usePopup == false) {
                    j = false
                }
            }
        }
        if (j) {
            if (this.data[d].player.popup) {
                this.data[d].player.popup.close()
            }
            try {
                var h = "adp_info_" + Math.floor(Math.random() * 100001);
                popwin = window.open("", h, "width=400,height=500,scrollbars=yes,location=0,menubar=0,toolbar=0,status=0")
            } catch (b) {
                popwin = window.open("about:blank")
            }
            this.data[d].player.popup = popwin
        }
        if (this.data[d].player.items && this.data[d].player.items.length) {
            this.submitPrivacy(d)
        } else {
            var a = this.getWindowChain(d);
            var l = [];
            for (var g in a) {
                var f;
                if (!a[g].parent || a[g].parent == window) {} else {
                    if (a[g].type == this.FOREIGN_IFRAME || a[g].type == this.POSTMESSAGE_SEARCH) {
                        l.push(a[g])
                    } else {
                        if (a[g].window && a[g].window.name) {
                            try {
                                f = $ADP.Util.JSON.parse($ADP.Util.atob(a[g].window.name.replace(/^[^-]+\-([A-Za-z0-9\+\/]+=?=?=?)$/, "$1")))
                            } catch (b) {}
                        }
                        if (!f) {
                            try {
                                f = a[g].parent.$ADP.Registry.getById(d)
                            } catch (b) {}
                        }
                        if (f.length) {
                            $ADP.Registry.registerParentItems(d, f)
                        }
                    }
                }
            }
            if (l && l.length) {
                if (window.postMessage) {
                    this.initByPostMessage(d, l)
                } else {
                    this.initByWindowName(d, l)
                }
            } else {
                this.submitPrivacy(d)
            }
        }
    },
    initByPostMessage: function(a, b) {
        for (k in b) {
            if (this.data[a].postMessageCounter) {
                this.data[a].postMessageCounter++
            } else {
                this.data[a].postMessageCounter = 1
            }
            $ADP.Message.send(b[k].parent, $ADP.Message.types.pullOBA, a)
        }
        this.data[a].postMessageTimeout = setTimeout(function() {
            $ADP.Registry.submitPrivacy(a)
        }, 1000)
    },
    initByWindowName: function(b, d) {
        for (k in d) {
            if (!d[k].window.name) {
                return
            }
            try {
                var c = $ADP.Util.JSON.parse($ADP.Util.atob(d[k].window.name.replace(/^[^-]+\-([A-Za-z0-9\+\/]+=?=?=?)$/, "$1")));
                if (c.length) {
                    this.registerParentItems(b, c)
                }
            } catch (a) {}
        }
        this.submitPrivacy(b)
    },
    submitPrivacy: function(a) {
        if (!this.data[a] && !this.data[a].player) {
            return
        }
        if (!this.data[a].player.items || this.data[a].player.items.length) {
            this.data[a].player.items = this.getItems(a)
        }
        this.data[a].player.showPrivacy.apply(this.data[a].player, [])
    },
    playerCmd: function(c, b, a) {
        if (!b) {
            return
        }
        if (!this.data[c] && !this.data[c].player) {
            return
        }
        if (!a) {
            a = []
        }
        this.data[c].player.items = this.getItems(c);
        if (typeof this.data[c].player[b] == "function") {
            this.data[c].player[b].apply(this.data[c].player, a)
        }
    },
    init: function() {
        if (window.addEventListener) {
            window.addEventListener("message", $ADP.Registry.messageHandler, false)
        } else {
            if (window.attachEvent) {
                window.attachEvent("onmessage", $ADP.Registry.messageHandler)
            }
        }
    }
};
if (!$ADP.Player) {
    $ADP.Player = function(b, a) {
        return this instanceof $ADP.Player ? this.init(b, a) : new $ADP.Player(b, a)
    };
    $ADP.Player.prototype = {
        attempts: 0,
        maxAttempt: 50,
        init: function(b, a) {
            this.id = b;
            this.domId = a.domId;
            this.header = a.header;
            this.footer = a.footer;
            this.publisherInfo = a.publisherInfo;
            this.position = a.position || "top-right";
            this.usePopup = !!a.usePopup;
            this.renderCloseButton = !!a.renderCloseButton;
            this.popup = !!a.popup
        },
        getId: function() {
            return this.id
        },
        getDOMId: function() {
            return this.domId
        },
        getPosition: function() {
            return this.position || "top-right"
        },
        getHeader: function() {
            return (this.header || "Datenschutzbestimmungen")
        },
        getFooter: function() {
            return (this.footer || "")
        },
        getPublisherInfo: function() {
            return (this.publisherInfo || "")
        },
        getPrivacyButtonText: function() {
            return $ADP.sas.localize.getText("privacy")
        },
        getCloseButtonText: function() {
            return $ADP.sas.localize.getText("close")
        },
        usePopupForPrivacyInfo: function() {
            return this.usePopup == false ? false : true
        },
        renderCloseButtonForPrivacyInfo: function() {
            return this.renderCloseButton ? true : false
        },
        hasPrivacyInfo: function() {
            return Boolean(this.items.length)
        },
        getPrivacyInfos: function() {
            return this.items
        },
        getPopup: function() {
            return this.popup
        },
        getPrivacyInfos: function() {
            return this.items
        },
        inject: function() {
            var d = this.getId();
            var b = this.getDOMId();
            var e = this.getPosition();
            if (!d) {
                return
            }
            if (!b) {
                if (window == window.top && document.body) {
                    return
                }
                var c = document.createElement("DIV");
                c.id = b = "iframe-button-" + Math.round(Math.random() * 9999);
                document.body.insertBefore(c, document.body.firstChild)
            }
            var a = c || document.getElementById(b);
            if (a) {
                a.innerHTML = '<div id="adp-wrapper-' + d + '" class="adp-wrapper adp-' + e + '" style="z-index:2499999;" onmouseover="this.className += \' adp-admarker-hover\';" onmouseout="this.className = this.className.replace(/adp-admarker-hover/, \'\');"><div id="adp-admarker-' + d + '" class="adp-admarker" ><div id="adp-admarker-icon-' + d + '" class="adp-admarker-icon adp-' + e + '" onClick="$ADP.Registry.collectPrivacy(\'' + d + '\');"></div><div id="adp-admarker-text-' + d + '" class="adp-admarker-text adp-' + e + '"  onClick="$ADP.Registry.collectPrivacy(\'' + d + '\');">' + this.getPrivacyButtonText() + "</div></div>"
            } else {
                if (this.attempts > this.maxAttempts) {
                    $ADP.Util.log("Too many attempts for " + d + ", " + b);
                    return
                } else {
                    ++this.attempts;
                    var f = this;
                    setTimeout(function() {
                        f.inject()
                    }, 100)
                }
            }
        },
        getPanelHTML: function() {
            var m = this.getId();
            var o = this.getPosition();
            var f = this.getHeader();
            var d = this.getFooter();
            var q = this.getPublisherInfo();
            var b = this.getCloseButtonText();
            var l = this.getPrivacyInfos();
            var s = this.usePopupForPrivacyInfo();
            var a = !s ? "$ADP.Registry.playerCmd(\'" + m + "\','hidePrivacy');" : "window.close();";
            var r = this.renderCloseButtonForPrivacyInfo();
            var p = "";
            for (var h = 0; h < l.length; h++) {
                var j = l[h];
                try {
                    p += j.render() + "<br />\n"
                } catch (c) {}
            }
            var n = "";
            n = n.concat('<div class="adp-panel-wrapper">');
            if (f != "") {
                n = n.concat('<div class="adp-panel-header">' + f + "</div>")
            }
            if (q != "") {
                n = n.concat('<div class="adp-panel-publisherinfo">' + q + "</div>")
            }
            n = n.concat('<div class="adp-panel-info">' + p + "</div>");
            if (d != "") {
                n = n.concat('<div class="adp-panel-footer">' + d + "</div>")
            }
            n = n.concat("</div>");
            var g = "";
            if (!s || (s && r)) {
                g += '<div id="adp-panel-close-' + m + '" class="adp-panel-close" onClick="' + a + '">' + b + "</div>"
            }
            g += n;
            return g
        },
        showPrivacy: function() {
            if ($ADP.sas.isMobile.any()) {
                window.open($ADP.sas.localize.getLink());
                return
            }
            var f = this.getPosition();
            var b = this.getId();
            var j = this.usePopupForPrivacyInfo();

            function g() {
                var l = document.getElementById("adp-panel-" + b);
                if (!l) {
                    var m = document.getElementById("adp-wrapper-" + b);
                    if (!m) {
                        return
                    }
                    var l = document.createElement("DIV");
                    l.id = "adp-panel-" + b;
                    l.className = "adp-panel adp-" + f;
                    l.display = "block";
                    l.innerHTML = this.getPanelHTML();
                    m.appendChild(l)
                } else {
                    l.style.display = "block"
                }
            }
            if (!j) {
                var d = this.getPopup();
                if (d) {
                    d.close()
                }
                g.apply(this)
            } else {
                var i = "Privacy Information";
                var h = document.styleSheets;
                var e = this.getPopup();
                if (!e) {
                    g.apply(this)
                } else {
                    var c = e.document;
                    window.popwin = e;
                    c.write("<!doctype html><html><head><title>" + i + "</title>");
                    for (var a in h) {
                        if (h[a].href) {
                            c.write('<link rel="stylesheet" href="' + h[a].href + '">')
                        }
                    }
                    c.write('</head><body class="adp-popup"><div class="adp-wrapper"><div class="adp-panel">');
                    c.write(this.getPanelHTML());
                    c.write("</div></div></body></html>");
                    c.close();
                    e.focus()
                }
            }
        },
        hidePrivacy: function() {
            var a = this.getId();
            var b = document.getElementById("adp-panel-" + a);
            if (b) {
                b.style.display = "none"
            }
        }
    }
}
if (!$ADP.PrivacyInfo) {
    $ADP.PrivacyInfo = function(a) {
        return this instanceof $ADP.PrivacyInfo ? this.init(a) : new $ADP.PrivacyInfo(a)
    };
    $ADP.PrivacyInfo.prototype = {
        init: function(a) {
            this.valid = a.title && a.linkText && a.url ? true : false;
            this.title = a.title;
            this.text = a.text;
            this.url = a.url;
            this.linkText = a.linkText;
            this.usePopup = !!a.usePopup
        },
        getTitle: function() {
            return this.title
        },
        getText: function() {
            return this.text
        },
        getURL: function() {
            return this.url
        },
        getLinkText: function() {
            return this.linkText
        },
        isValid: function() {
            return this.valid ? true : false
        },
        usePopup: function() {
            return this.usePopup ? true : false
        },
        render: function() {
            var d = $ADP.Util.safeString(this.getTitle());
            var c = $ADP.Util.safeString(this.getText());
            var a = $ADP.Util.safeString(this.getLinkText());
            var e = $ADP.Util.safeString(this.getURL());
            var b = "";
            if (a) {
                b += a
            }
            if (e) {
                b = '<a href="' + e + '" target="_blank">' + b + "</a>"
            }
            if (b) {
                b += "<br />"
            }
            if (c) {
                b = c + "<br />" + b
            }
            if (d) {
                b = '<div class="adp-info-header">' + d + "</div>" + b
            }
            return b
        }
    }
}
$ADP.Message = $ADP.Message || {
    types: {
        nomsg: "NULL",
        pullOBA: "ADP.Registry.pullOBA",
        pullOBA_ACK: "ADP.Registry.pullOBA_ACK",
        unRegOBA: "ADP.Registry.unRegOBA",
        unRegOBA_ACK: "ADP.Registry.unRegOBA_ACK"
    },
    create: function(d, a) {
        var c = {
            type: d,
            data: a
        };
        try {
            if ($ADP.Util.JSON && typeof $ADP.Util.JSON.stringify == "function") {
                return $ADP.Util.JSON.stringify(c)
            }
        } catch (b) {}
        return '{"type":"NULL"}'
    },
    parse: function(a) {
        try {
            if ($ADP.Util.JSON && typeof $ADP.Util.JSON.parse == "function") {
                return $ADP.Util.JSON.parse(a)
            }
        } catch (b) {}
        return $ADP.Message.create("NULL", {})
    },
    send: function(d, f, a) {
        try {
            if (d && d.postMessage) {
                var c = $ADP.Message.create(f, a);
                d.postMessage(c, "*")
            }
        } catch (b) {}
    }
};
$ADP.Util = $ADP.Util || {
    JSON: window.JSON || {
        stringify: function(b, c) {
            function a(e) {
                var h = new Array(e.length);
                for (var f = 0, g = e.length; f < g; f++) {
                    h[f] = d(e[f])
                }
                return h
            }

            function d(e, f, g) {
                for (f in (g = e == "" + {} && []) && e) {
                    g.push(d(f) + ":" + d(e[f]))
                }
                return "" + e === e ? '"' + e.replace(/[\x00-\x19\\]/g, function(h) {
                    return "\\x" + h.charCodeAt().toString(16)
                }) + '"' : e && e.length ? "[" + a(e) + "]" : g ? "{" + g + "}" : e
            }
            return d(b)
        },
        parse: function(jsonstr) {
            var JSON_object = null;
            try {
                JSON_object = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(jsonstr.replace(/"(\\.|[^"\\])*"/g, ""))) && eval("(" + jsonstr + ")")
            } catch (e) {}
            return JSON_object
        }
    },
    btoa: function(f, g, h, i, j) {
        for (g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = j = ""; f.charAt(i | 0) || (g = "=", i % 1); j += g.charAt(63 & h >> 8 - i % 1 * 8)) {
            h = h << 8 | f.charCodeAt(i -= -0.75)
        }
        return j
    },
    atob: function(f, a, e, i, h, g, j) {
        for (h = g = j = "", a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; e = f.charAt(j++); ~e && (i = g % 4 ? i * 64 + e : e, g++ % 4) ? h += String.fromCharCode(255 & i >> (-2 * g & 6)) : 0) {
            e = a.indexOf(e)
        }
        return h
    },
    log: function() {
        try {
            if (window.top.location.search && window.top.location.search.match(/adpdebug/)) {
                $ADP.Util.log.history = $ADP.Util.log.history || [];
                $ADP.Util.log.history.push(arguments);
                if (typeof console != "undefined") {
                    console.log(Array.prototype.slice.call(arguments))
                }
            }
        } catch (a) {}
    },
    safeString: function(a) {
        var b = a;
        b = b.split("<").join("&lt;");
        b = b.split(">").join("&gt;");
        return b
    },
    createIframeName: function(a) {
        var b = "";
        if (!window.postMessage) {
            b = $ADP.Util.btoa($ADP.Util.JSON.stringify($ADP.Registry.pullById(a)))
        }
        return b
    }
};
$ADP.getVersion = $ADP.getVersion || function() {
    return {
        major: "1",
        minor: "6",
        patch: "0",
        stage: "RC1"
    }
};
/*if (!$ADP.init) {
    $ADP.init = function() {
        $ADP.Registry.init()
    };
    $ADP.init()
}*/
if (typeof(waitForFile) != "undefined") {
    if (waitForFile) {
        $ADP.sas.addObas(sas_obaInfos)
    }
}