/*
Copyright 2006-2016 Netvibes, a Dassault Systèmes company.
All rights reserved.
*/

/*global define, _, App, console*/

define('App/Api/Util', [
    'UWA/Core',
    'UWA/Class/Promise',
    'App/Context',
    'App/Utils/StringMatcher',
    'App/Components/UI/ConfirmDialog'
], function (UWA, Promise, Context, StringMatcher, ConfirmDialog) {
    'use strict';

    var importantErrorMessages = {
        'stream_204': _("Looks like no new articles have been published in the last few months. Please wait for next update."),
        'stream_403': _("You are not authorized to access to this app"),
        'stream_404': _("Feed/stream not found. Try another search."),
        'stream_600': _("Maximum number of feeds reached."),
        'stream_607': _("Invalid request."),
        'stream_652': _("Can't connect to Twitter, please try again later."),
        'stream_700': _("The URL for this feed/stream is returning an error. We'll try again later."),
        'stream_701': _("The URL for this feed/stream is invalid."),
        'stream_702': _("The URL for this feed/stream can't be reached."),
        'stream_710': _("The URL for this feed/stream is returning a blank page. We'll try again later."),
        'stream_71[13]': _("The URL for this feed/stream could not be parsed. We'll try again later."),
        'stream_900': _("Invalid MisoData file: the date is missing."),
        'stream_901': _("Invalid MisoData file: wrong date format."),
        'stream_150': _("The configuration file can't be parsed."),
        'stream_151': _("Invalid MisoData file: file is empty."),
        'stream_71001': _("Syntax error in your query. Check for incorrect syntax or missing elements."),
        'stream_71011': _("Unknown prefix. Check for incorrect spelling in your prefixes."),
        'stream_71507': _("The query contains a reference to a non-existent object (tab, widget, ...). Please update your query."),
        'stream_.*': _("Looks like this feed/stream is not valid or currently not responding. We'll try again later."),
        'module_per_tab_quota_exceeded':  _("You have reached the maximum amount of {0} apps per tab. This app cannot be added to the current tab.").format(Context.Config.account_limits.modules_per_tab),
        'module_per_dashboard_quota_exceeded': _("You have reached the maximum amount of {0} apps per dashboard. This app cannot be added to the current dashboard.").format(Context.Config.account_limits.modules_per_dashboard),
        'dashboard_quota_exceeded': _("You have reached the maximum amount of Dashboards you can add. The dashboard won't be added."),
        'tab_per_dashboard_quota_exceeded': _("You have reached the maximum amount of tabs you can add. The tab won't be added to your dashboard."),
        'readlater_quota_exceeded': _("You have reached the maximum amount of starred articles. The article won't be starred."),
        'You can\'t create a tag': _("You can't create a new tag label."),
        'Tag already exists': _("This item has already been SmartTagged with this tag. Please reload your dashboard."),
        'Invalid query: (.*)': _("The query \"{1}\" contains a syntax error"),
        'product_payment' : _("Fields and terms of sales have to be properly filled"),
        'Auth error: (.*)' : _("Authorization Required"),
        'item_already_blacklisted': _("This item has already been blacklisted. The item (and any items associated with it) will be removed from your dashboard shortly."),
        'Unable to download or parse data': _("Unable to download or parse data"),
        'bootstrap_1': _("Unknown error"),
        'bootstrap_1337': _("Syntax error"),
        'bootstrap_8000': _("User do not have the required role"),
        'bootstrap_8001': _("This app cannot be added to this dashboard because you are not Owner of this dashboard. Please go to a dashboard on which you are Owner and try again.")
    };

    var importantMatcher = new StringMatcher(importantErrorMessages, { formater: 'string-format' });
    var genericMatcher = new StringMatcher(importantErrorMessages, { formater: 'string-format' });

    genericMatcher.add({
        'http_0': _("A request has unexpectedly failed. Please check your Internet connection or contact the support."),
        'http_(\\d+)': _("An error has occurred, please try again later or contact the support [Code : HTTP {1}]"),
        fallback: _("An error has occurred, please try again later or contact the support")
    });

    var Util = {};

    Util.getErrorMessage = function (errorCode, specificMessages, ignoreGenericErrors) {
        if (UWA.is(errorCode)) {
            errorCode = String(errorCode);
        } else {
            errorCode = 'fallback';
        }

        var matcher = ignoreGenericErrors ? importantMatcher : genericMatcher;

        if (specificMessages) {
            specificMessages.fallback = matcher.match(errorCode, specificMessages.fallback);
            matcher = new StringMatcher(specificMessages, { formater: 'string-format' });
        }

        return matcher.match(errorCode);
    };

    /* String, object, object */
    Util.displayError = function (errorCode, specificMessages, callback) {
        var deferred = Promise.deferred();

        if (typeof specificMessages === 'function') {
            callback = specificMessages;
            specificMessages = null;
        }

        if (!callback) {
            callback = function () {};
        }

        // Do not display error message when page is exciting.
        if (errorCode === 'page_exiting') {
            callback(errorCode);
            deferred.reject(errorCode);
            return deferred.promise;
        }

        var message = Util.getErrorMessage(errorCode, specificMessages, true);
        if (!message) {
            console.error('Unhandled API error:', errorCode); // eslint-disable-line no-console
            callback(errorCode);
            deferred.reject(errorCode);
            return deferred.promise;
        } else {
            ConfirmDialog.error(
                UWA.String.escapeHTML(message),
                {
                    events: {
                        onClose: function() {
                            callback(errorCode);
                            deferred.reject(errorCode);
                        }
                    }
                }
            );

            return deferred.promise;
        }
    };

    Util.isOfflineError = function (e) {
        return e === 'http_0' || e === 'Network is Offline';
    };

    UWA.namespace('Api/Util', Util, App);

    return Util;
});
