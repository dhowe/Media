/*
Copyright 2006-2016 Netvibes, a Dassault Systèmes company.
All rights reserved.
*/

define('App/Context', [
    'UWA/Core',
    'UWA/Data',
    'App/Plugins/Bootstrap!' // Plugin
], function (UWACore, UWAData, Bootstrap) {
    'use strict';

    var exports = {};

    exports.Config = UWACore.extend({
        front_timers: {
            idle: 1000 // 1000 seconds
        },
        version: {}
    }, Bootstrap.app.Config);

    exports.Globalization = Bootstrap.app.Globalization || {};
    exports.NPD = Bootstrap.app.NPD || false;
    exports.Page = Bootstrap.app.Page || false;
    exports.Permission = Bootstrap.app.Permission || {};
    exports.User = Bootstrap.app.User || false;
    exports.isMobile = Bootstrap.app.isMobile || false;

    /**
     * @return {Boolean}
     */
    exports.isPassportProxyAvailable = function () {
        return Boolean(UWAData.proxies && UWAData.proxies.passport);
    };

    /**
     * @return {Boolean}
     */
    exports.isAloneEnvironment = function () {
        return Boolean(window.widgetReadyCallbacks || (window.widget && window.widget.defaultData && window.widget.preferences));
    };

    /**
     * @return {Boolean}
     */
    exports.isIn3DDParentFrame = function () {
        return exports.isIn3DDashboard() && !exports.isAloneEnvironment();
    };

    /**
     * @return {Boolean}
     */
    exports.isInStartpage = function() {
        return !(exports.isAloneEnvironment() || exports.isIn3DDashboard());
    };

    /**
     * @return {Boolean}
     */
    exports.isIn3DDashboard = function () {
        return exports.isPassportProxyAvailable();
    };

    /**
     * In 3DD the widget's id begins with 'preview-' when openned with the
     * Transient compoent (ie: preview).
     *
     * @return {Boolean}
     */
    exports.isIn3DDPreview = function () {
        return Boolean(window.widget && window.widget.id && window.widget.id.contains('preview'));
    };

    /**
     * Return true if StreamApi is available (ie: current widget is not "On Premise").
     *
     * @return {Boolean}
     */
    exports.isStreamApiAvailable = function () {
        return !window.widget || window.widget.getValue('appId') !== 'NETFEOP_AP';
    };

    exports.get3DDashboardContext = function () {
        return Bootstrap.threeDDashboardContext;
    };

    exports.isDebug = function (scope) {
        return Boolean(exports.Config.debug && exports.Config.debug.indexOf(scope || 'js') >= 0);
    };

    exports.isIOSApp = function () {
        return navigator.userAgent.toLowerCase().contains('netvibes ios app');
    };

    exports.isTaggingBookmarklet = function () {
        return document.body && document.body.className.contains('nv-tagging-bookmarklet');
    };

    exports.isSmartReaderView = function () {
        return exports.Page && exports.Page.inSmartReaderView &&
            !exports.isTaggingBookmarklet() &&
            !exports.isIOSApp() &&
            !exports.isAloneEnvironment();
    };

    exports.isRTLLanguage = function () {
        return document.documentElement && document.documentElement.dir === 'rtl';
    };

    exports.isAllowed = function (permission, pageId) {
        if (!pageId) {
            pageId = exports.Page.id || 'default';
        }
        var permissions = exports.Permission[pageId] || exports.Permission['default'];
        return permissions ? permissions[permission] : false;
    };

    exports.hasTagging = function () {
        // Simple Vip does not have tagging available
        // but any user which belong to a NPD should have tagging
        // Note: App.NPD is filled when user is VIP, NPDx or Basic which belong to a NPD
        return exports.NPD && !exports.isIn3DDashboard() && (!exports.User.isVip || (exports.Page && exports.Page.isPremiumCopy));
    };

    exports.isSubscribePreview = function () {
        return Boolean(Bootstrap.app.inSubscribePreview);
    };

    /**
     * @return {Number} Return a failure code, if any
     */
    exports.getFailureCode = function() {
        return Bootstrap.failureCode;
    };

    /**
     * Returns the platform identifier of current context.
     *
     * Note: Method cannot be used in Parent frame scope, as we cannot identify
     * which platformId to use.
     *
     * @see  Bootstrap.js to check how it is set
     *
     * @throws {Error} If method is invoked from `Parent` component
     *
     * @return {String}
     */
    exports.get3DDPlatformId = function() {
        if (!Bootstrap.x3dPlatformId) {
            throw new Error('Current platformId could not be determined');
        }

        return Bootstrap.x3dPlatformId;
    };

    /**
     * Return an URL from a config key with an optional scheme forced.
     * @param String configKey  The key to look for
     */
    exports.getURL = function(configKey, forceScheme) {
        if (exports.Config.urls[configKey] === undefined) {
            throw new Error('Error, cannot retreive URL from Unkown key : "' + configKey + '" in exports.Config.urls');
        }
        var url = exports.Config.urls[configKey];
        //force scheme browser
        if (url.indexOf('//') === 0 && forceScheme === true) {
            return window.location.protocol + url;
        }
        return url;
    };

    /**
     * Return the URL corresponding to the given welcome page name
     *
     * @param String name the welcome page name
     * @return String
     */
    exports.getWelcomeURL = function (name) {
        var lang = exports.Globalization.welcomeLanguage;
        if (lang === "fr") {
            if (name === "explore/autosave") name = "explorer/autosave";
            else if (name === "pricing") name = "tarifs";
        }
        return exports.getURL("startpage") + "/" + lang + "/" + name;
    };

    exports.getWelcomeBusinessURL = function (name) {
        var lang = exports.Globalization.welcomeLanguage;
        if (lang === "fr") {
            if (name === "contact-us") name = "fr/contactez-nous";
        }
        return exports.getURL("premium_welcome") + "/" + name;
    };

    var products;
    if (!exports.User || !exports.User.products) {
        products = [];
    } else {
        products = Object.keys(exports.User.products).map(function (type) {
            var product = Object.assign({ type: type }, exports.User.products[type]);
            product.expired = Boolean(product.endedAt && !product.active);
            return product;
        });
        delete exports.User.products;
    }

    function productFilter(filter) {
        if (typeof filter === "object") {
            return function (product) {
                for (var key in filter) if (product[key] !== filter[key]) return false;
                return true;
            };
        }
        if (typeof filter === "function") {
            return filter;
        }
        return function () { return true; };
    }

    /**
     * Get a product for the user. The product returned is the first matching the "filter" argument:
     * * if it is an object, the first product matching the properties of the object will be
     * returned.
     * * if it's a function, the first product for which the function returns true will be returned
     * (like Array.prototype.detect).
     * * by default, the first product is returned (you probably don't want this).
     * @return Object
     */
    exports.getProduct = function (filter) {
        return products.detect(productFilter(filter));
    };

    /**
     * Get the first active product of the user. The product returned is the first matching the
     * "filter" argument:
     * * if it is an object, the first active product matching the properties of the object will be
     * returned.
     * * if it's a function, the first active product for which the function returns true will be
     * returned (like Array.prototype.detect).
     * * by default, the first active product is returned
     * @return Object if the product was found, else undefined
     */
    exports.getActiveProduct = function (filter) {
        var customFilter = productFilter(filter);
        return products.detect(function (p) {
            return p.active && customFilter(p);
        });
    };

    /**
     * Get the list of products for the user. The list can be filtered with the first argument:
     * * if it is an object, only products matching the properties of the object will be returned.
     * * if it's a function, only products for which the function returns true will be returned
     * (like Array.prototype.detect).
     * * by default, all products are returned.
     *
     * @param Object|Function filter
     * @return Array<Object>
     */
    exports.getProducts = function (filter) {
        return products.filter(productFilter(filter));
    };

    if (window.App) {
        window.App.Context = exports;
    }

    return exports;
});
