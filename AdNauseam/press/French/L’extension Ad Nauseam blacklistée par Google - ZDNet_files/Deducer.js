/*
Copyright 2006-2016 Netvibes, a Dassault Systèmes company.
All rights reserved.
*/

/*globals define*/

define('App/ModuleUtils/Deducer', [
    'UWA/Utils',
    'UWA/String',
    'App/Context',
    'App/Core/Utils'
], function (
    UWAUtils,
    UWAString,
    Context,
    Utils
) {
    'use strict';

    function getURL(name) {
        if (Utils.isAbsoluteURL(name)) {
            return name;
        }
        var chunks = name.split('_'),
        nameStart,
        folder;

        name = chunks.pop();

        nameStart = name.unCamelCase().split('-')[0];

        name = nameStart + name.slice(nameStart.length);

        folder = chunks.join('/');
        if (folder) {
            folder += '/';
        }

        name = name + '/' + name + '.html';

        return Context.getURL('startpage', true) + '/modules/' + folder + name;
    }

    var getName = (function () {
        var parseURL = UWAUtils.parseUrl,
        validDomains = [
            parseURL(Context.Config.urls.host).domain,
            parseURL(Context.getURL('cdn', true)).domain,
            parseURL(Context.getURL('startpage', true)).domain,
            'www.netvibes.com'
        ];

        return function (url) {
            url = parseURL(url);
            var directory = url.directoryPath.slice(url.directoryPath.lastIndexOf("modules"), -1).split('/');
            var result;

            if (validDomains.indexOf(url.domain) >= 0 && directory.shift() === 'modules') {
                result = directory.map(UWAString.ucfirst).join('_');
            }

            if (result === 'Uwa') result = 'UWA'; // Only exception

            return result;
        };
    }());

    return {
        getURL: getURL,
        getName: getName
    };
});
