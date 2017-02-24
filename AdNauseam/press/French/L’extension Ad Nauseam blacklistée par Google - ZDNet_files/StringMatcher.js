/*
Copyright 2006-2016 Netvibes, a Dassault Systèmes company.
All rights reserved.
*/

/*global define*/

define('App/Utils/StringMatcher', [
    'UWA/Core',
    'UWA/Class',
    'UWA/Class/Options',
    'App/Core/Utils',
    'UWA/String',
    'UWA/Array'
], function (UWA, Class, Options, AppUtils) {
    'use strict';

    return Class.extend(Options, {

        options: {
            matcher: 'regexp',
            formater: 'identity'
        },

        init: function (initalMatches, options) {
            this.setOptions(options);
            this._matches = [];
            this.add(initalMatches);
        },

        add: function (match, value) {
            if (UWA.is(match, 'string') && UWA.is(value)) {
                if (match === 'fallback') {
                    this._fallback = {
                        value: value
                    };
                    return;
                }

                var existing = this._matches.detect(function (m) {
                    return m.match === match;
                });

                if (existing) {
                    existing.value = value;
                } else {
                    this._matches.push({
                        match: match,
                        value: value,
                        matcher: this._compileMatch(match)
                    });
                }
                return;
            }

            if (UWA.is(match, 'array')) {
                return match.forEach(this.add.apply.bind(this.add, this));
            }

            AppUtils.forEachProperty(match, function (v, k) {
                this.add(k, v);
            }, this);
        },

        remove: function (match) {
            if (match === 'fallback') {
                this._fallback = null;
            } else {
                this._matches = this._matches.filter(function (m) {
                    return m.match !== match;
                });
            }
        },

        match: function (subject, fallback) {
            var i, l;
            for (i = 0, l = this._matches.length; i < l; i++) {
                var match = this._matches[i].matcher.exec(subject);
                if (match) {
                    return this._format(this._matches[i].value, match);
                }
            }

            if (UWA.is(fallback)) {
                return this._format(fallback, [subject]);
            }

            if (this._fallback) {
                return this._format(this._fallback.value, [subject]);
            }
        },

        _format: function (match, values) {
            switch (this.options.formater) {
            case 'identity':
                return match;

            case 'apply':
                return match.apply(null, values);

            case 'string-format':
                return match.format.apply(match, values);

            default:
                return this.options.formater(match, values);
            }
        },

        _compileMatch: function (match) {
            switch (this.options.matcher) {
            case 'regexp':
                return new RegExp('^' + match + '$');

            case 'glob':
                return match.globToRegex();

            case 'plain':
                return { exec: function (subject) { return subject === match ? [subject] : null; }};

            default:
                return this.options.matcher;
            }
        }
    });
});
