/*
Copyright 2006-2016 Netvibes, a Dassault Systèmes company.
All rights reserved.
*/

/*
global _
 */
define('App/Core/Utils', [ // eslint-disable-line no-unused-expressions
    'UWA/Core',
    'UWA/Utils',
    'UWA/Fx',
    'UWA/Class/Promise',
    'App/Context'
], function (Core, UWAUtils, Fx, Promise, Context) {
    'use strict';

    var Utils = {};

    /**
     * Return the informations related to the abbreviated form of
     * the given number (ie: the final number & the unit).
     *
     * @param  {Number} number
     * @return {Object} Contains :
     *                  `value` (Number) The abbreviated value
     *                  `unit` (String) The computed unit
     *                  `orig` (Number) The original number
     */
    function _getAbbrInfos(number) {
        var origNumber = number;
        var units = ['', 'K', 'M', 'B'];
        var unit = '';

        for (var i = 0, l = units.length; i < l; i++) {
            unit = units[i];
            if (number < 1000 || i === l - 1) {
                break;
            } else {
                number = number / 1000;
            }
        }

        return {
            orig: origNumber,
            value: number,
            unit: unit
        };
    }

    /**
     * Set a value in an object, following the rules of the query syntax:
     * If name == 'foo[bar]', the object will be updated like {foo: {bar: value}}
     * If name == 'biz[]', the object will be updated like {biz: [value]}
     */
    function setValue(object, name, value) {
        var match = name.match(/^(.+?)((?:\[.*?\])*)$/);
        var keys;
        if (match) {
            keys = [match[1]];
            match[2].replace(/\[(.*?)\]/g, function (_, key) {
                keys.push(key);
            });
        }
        else {
            keys = [name];
        }
        var dest = object;
        keys.forEach(function (key, i) {
            if (i < keys.length - 1) {
                var nextIsEmpty = keys[i + 1] === '';
                if (Array.isArray(dest)) {
                    var tmp = nextIsEmpty ? [] : {};
                    dest.push(tmp);
                    dest = tmp;
                } else {
                    if (!dest[key]) {
                        dest[key] = nextIsEmpty ? [] : {};
                    }
                    dest = dest[key];
                }
            } else if (Array.isArray(dest)) {
                dest.push(value);
            } else {
                dest[key] = value;
            }
        });
    }

    Utils.getInputsValue = function (form) {
        var result = {};
        form.getElements('input, select, textarea').filter(function (el) {
            return el.name && !el.disabled && el.type !== 'submit' && el.type !== 'reset' && el.type !== 'file';
        }).forEach(function (el) {
            var value;
            var name = el.name;
            if (el.getTagName() === 'select') {
                value = UWAUtils.toArray(el.options).filter(function (option) {
                    return option.selected;
                }).map(function (option) {
                    return option.value;
                });
                if (name.slice(-2) === '[]') {
                    name = name.slice(0, -2);
                } else {
                    value = value[0];
                }
            } else if (el.type === 'radio' || el.type === 'checkbox') {
                value = el.checked ? el.value : undefined;
            } else {
                value = el.value;
            }
            if (value !== undefined) {
                setValue(result, name, value);
            }
        });
        return result;
    };

    Utils.isAbsoluteURL = function (url) {
        return !!(/^(?:https?:)?\/\//).test(url);
    };

    Utils.cutUTF8Bytes = function (str, index, length) {
        if (str) {
            var bytes = encodeURIComponent(str)
            .match(/%..|./g)
            .slice(index, isFinite(length) ? index + length : undefined);

            while (true) {  // eslint-disable-line no-constant-condition
                try {
                    str = decodeURIComponent(bytes.join(''));
                    break;
                } catch (e) {
                    bytes.pop();
                }
            }
        }

        return str;
    };

    Utils.uniqueID = (function () {
        var key = 0,
            pow = Math.pow(32, 4);
        return function (prefix) {
            key++;
            var id = (Math.random() * pow | 0) * pow + key;
            return (prefix || 'u') + ('0000' + id.toString(32)).slice(-8);
        };
    }());

    Utils.getNext = function (list, current, options) {
        // Options
        var condition = options && options.condition;
        var reverse = options && options.reverse;
        var loop = options && options.loop;

        // Cache length
        var length = list.length;

        // Initalize the first index
        var index = list.indexOf(current);
        var count;

        if (index < 0) {
            index = reverse ? length : -1;
        }

        // Iterate at most n-1 times, because we don't want to return the same item again.
        for (count = 0; count < length - 1; count++) {
            index += reverse ? -1 : 1;

            // If the index is out of bound
            if (index < 0 || index >= length) {
                if (loop) {
                    // loop index
                    index = (index + length) % length;
                } else {
                    return;
                }
            }

            if (!condition || condition(list[index], index)) {
                return list[index];
            }
        }
    };

    Utils.getVar = (function () {
        var queries = UWAUtils.parseQuery(UWAUtils.parseUrl(location).query);

        return function (name) {
            return queries[name];
        };
    }());

    Utils.debounce = function (fct, delay, context) {
        var timeout;
        return function () {
            clearTimeout(timeout);
            var arr = [context || this];
            arr.push.apply(arr, arguments);
            timeout = setTimeout(fct.bind.apply(fct, arr), delay);
        };
    };

    /**
     * Produce a function which will ensure the promise-builder `fct` method is
     * invoked only if resulting promise is not pending (ie: not initialized
     * or already settled).
     *
     * @param  {Function} fct A function which *must* return a Promise.
     * @param  {Object} [context] Context used to invoke the `fct`
     *
     * @return {Function} Debounced function to call instead of the original `fct` one.
     */
    Utils.debouncePromise = function(fct, context) {
        var isPending = false;

        return function() {
            if (!isPending) {
                isPending = true;
            } else {
                return Promise.reject('Already pending');
            }

            var resultPromise = fct.call(context);

            resultPromise.fin(function() {
                isPending = false;
            });

            return resultPromise;
        };
    };

    Utils.asyncForEach = function (array, fn, options) {
        var context = options && options.context;
        var iterations = options && options.iterations || 500;
        var index = 0;
        var timeout;

        function asyncForEachRunner() {
            var max = Math.min(array.length, index + iterations);
            for (; index < max; index++) {
                fn.call(context, array[index], index);
            }
            if (index !== array.length) {
                timeout = setTimeout(asyncForEachRunner, 5);
            }
        }

        timeout = setTimeout(asyncForEachRunner, 5);

        return function () {
            clearTimeout(timeout);
        };
    };

    Utils.forEachProperty = function (object, fn, context) {
        var property;
        for (property in object) {
            if (Core.owns(object, property)) {
                fn.call(context, object[property], property, object);
            }
        }
    };

    Utils.getObjectValues = function (object) {
        return Object.keys(object).map(function (key) { return object[key]; });
    };

    Utils.mapSplat = function (array, fn, context) {
        var result = [];
        array.forEach(function (value, index, obj) {
            result.push.apply(result, fn.call(context, value, index, obj));
        });
        return result;
    };

    Utils.unique = function (array, hash) {
        var i, l;
        var u = {};
        var result = [];
        if (!hash) {
            hash = String;
        }
        for (i = 0, l = array.length; i < l; i++) {
            var currentHash = hash(array[i]);
            if (!u.hasOwnProperty(currentHash)) {
                result.push(array[i]);
                u[currentHash] = true;
            }
        }
        return result;
    };

    /**
     * Build a new object containing the key/value pairs from the given obj
     * using the keys provided.
     *
     * @example
     * var dummy = { hello: 'world', answer: 42 };
     * _pick(dummy, 'answer'); //{answer: 42}
     * _pick(dummy, ['answer']); //{answer: 42}
     *
     * @param  {Object} obj Object from which we will pick the values
     * @param  {...String|String[]} keys Attributes name to pick from the obj
     *                                   as N arguments or as an array.
     *
     * @return {Object} Resulting object after the pick process
     */
    Utils.pick = function(obj, keys) {
        var result = {};

        if (!obj) {
            return result;
        }

        if (!Core.is(keys, 'array')) {
            keys = Array.prototype.slice.call(arguments, 1);
        }

        keys.forEach(function(value) {
            if (value in obj) {
                result[value] = obj[value];
            }
        });

        return result;
    };

    //match = globToRegExp("*{uwa,www}.netvibes.com*").test('http://uwa.netvibes.com/test.php'); // true
    Utils.globToRegExp = function (glob) {
        var regexString = glob.escapeRegExp().replace(/\\\*/g, '.*')
        .replace(/\\\?/g, '.')
        .replace(/\\\{/g, '(')
        .replace(/\\\}/g, ')')
        .replace(/,/g, '|');

        return new RegExp('^' + regexString + '$');
    };

    Utils.counterAdd = function (a, b) {
        if (a === true || b === true) {
            return true;
        }
        return parseInt(a, 10) + parseInt(b, 10);
    };

    /* ******  end to obsoletize ********** */
    /*
    Method: getStaticUrl
        Returns the static url for the given ressource relative url.
    */
    Utils.getStaticUrl = function (url, options) {
        if (url.lastIndexOf(Context.Config.urls.startpage, 0) === 0) {
            // Legacy check in case a tab icon in example
            // was served by the startpage instead of the CDN
            url = url.slice(Context.Config.urls.startpage.length);
        }
        if (url && !Utils.isAbsoluteURL(url)) {
            url = Context.Config.urls.cdn + url;
        }
        if (url.startsWith(Context.Config.urls.cdn) && (!options || options.version !== false) && !/[&?]v=/.test(url)) {
            url += (url.contains('?') ? '&v=' : '?v=') + Context.Config.version.js;
        }
        return url;
    };

    Utils.BLANK_IMAGE_URL = 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

    /**
    * Return favicon url
    * @param p - p could be a string (url) or a feed object
    * @return string url
    */
    Utils.getFaviconUrl = function (p, full) {
        if (!p || !Context.Config.urls.storage) {
            return '';
        }

        if (!full) {
            p = 'http://' + UWAUtils.parseUrl(p).domain;
        }

        // Do not url encode "p" because apache is buggy when it's encoded
        return Context.Config.urls.storage + '/favicon/' + p;
    };

    Utils.createIcon = function (name, title, width, height, html) {
        if (typeof html === "undefined") {
            return Core.createElement('img', {
                'src': Utils.getStaticUrl('/img/s.gif'),
                'class': 'icon ' + name,
                'alt': title,
                'title': title,
                'width': width,
                'height': height
            });
        }
        return '<img src="' + Utils.getStaticUrl('/img/s.gif') + '" width="' + width + '" height="' + height + '" class="icon ' + name + '" alt="' + title + '" title="' + title + '" />';
    };

    Utils.createCloseIcon = function (idPrefix, eClass, title) {
        if (!idPrefix) {
            throw new Error('Utils.createCloseIcon: idPrefix is mandatory');
        }

        return Core.createElement('div', {
            'id' : idPrefix + 'CloseButtonContainer',
            'class' : 'uwa-icon uwa-icon-only delete nv-close-icon ' + (eClass || ''),
            title: title || _("Close")
        });
    };

    /**
    * Formats a number to be nicer to read
    */
    Utils.formatCounterNumber = function (number) {
        if (number === true) {
            return "●";
        }

        if (number >= 1000) {
            return '1K+';
        }

        return String(number);
    };

    /**
     * @param  {Number} number
     * @param  {Object} options
     * @param  {Boolean} [options.abbreviate=true]
     * @param  {Boolean} [options.separateThousands=true]
     * @param  {Number} [options.numDigitAfterComma]
     * @param  {Number[]} [options.closeNumbers] Used to compute the precision to
     *                                           differentiate the number compared to
     *                                           the close numbers.
     *
     * @return {String}
     */
    Utils.formatHumanNumber = function (number, options) {
        if (!options) {
            options = {};
        }
        var sign = '';
        var unit = '';
        var integer = '';
        var decimal = '';
        var i, l;
        var closeNumbers = options.closeNumbers || [];

        // Number is not a number ?! send it back the the caller !
        if (!Core.is(number, 'number')) {
            return number;
        }

        if (number < 0) {
            sign = '-';
            number = -number;
        }

        integer = String(Math.floor(number));
        decimal = String(number).match(/(\.\d+)?$/)[0].slice(1);

        if (options.abbreviate !== false) {
            var abbrNumber = _getAbbrInfos(number);
            var decDigits;

            number = abbrNumber.value;
            unit = abbrNumber.unit;

            integer = String(Math.floor(number));
            // Default decDigits = decimal digits needed to get 3 significant digits
            decDigits = 3 - integer.length;

            if (closeNumbers.length) {
                // We have to process each closeNumber to find the one
                // which induce the biggest precision.
                closeNumbers.forEach(function(closeNumber) {
                    var abbrClose = _getAbbrInfos(closeNumber);

                    closeNumber = abbrClose.value;

                    // Comparison can be done only on identical unit.
                    if (abbrClose.unit === abbrNumber.unit) {
                        // Build a padded version of the numbers, ready to be compared
                        //       12.2 = 0000000000000000012.2000000000
                        // 123456.123 = 0000000000000123456.1230000000
                        var paddedNumber = ('0'.repeat(20) + number.toFixed(10)).slice(-30);
                        var paddedClose = ('0'.repeat(20) + closeNumber.toFixed(10)).slice(-30);

                        var minDecDigits = 0;
                        var decPointPos = 0;

                        // Compare the char. 1 to 1 to detect the first divergence
                        for (i = 0, l = paddedNumber.length; i < l; i++) {
                            // We must keep track of the decimal point position
                            if (paddedNumber[i] === '.') {
                                decPointPos = i;
                            }

                            // Divergence found ?
                            if (paddedNumber[i] !== paddedClose[i]) {
                                if (decPointPos) {
                                    // Compute the minimum decimal digits needed regarding
                                    // the divergence position & the dec. point pos.
                                    minDecDigits = i - decPointPos;
                                }

                                // Nervemind if decimal point was found or not, process
                                // can be interrupted right now
                                break;
                            }
                        }

                        // Do we have to use the computed minimum dec. digits ?
                        if (decDigits < minDecDigits) {
                            decDigits = minDecDigits;
                        }
                    }
                });
            }

            // Extract the decimal part to display using the number of decimal digits
            decimal = String(number).match(/(\.\d+)?$/)[0].substr(1, decDigits);
        }

        if (options.separateThousands !== false) {
            var newInteger = '';
            for (i = 0, l = integer.length; i < l; i += 3) {
                newInteger = integer.slice(-i - 3, -i || l) + (i ? ' ' + newInteger : '');
            }
            integer = newInteger;
        }

        if (options.numDigitAfterComma) {
            decimal = decimal.slice(0, options.numDigitAfterComma);
        }

        return sign + integer + (decimal ? '.' + decimal : '') + unit;
    };

    // loc file not included for 'en_US'
    if (typeof window._ !== 'function') {
        window._ = function (s) { // keep this syntax for Opera
            return s;
        };
    }

    /**
     * @param  {Object} parent the given elements' container
     * @param  {Object} elements list to be processed
     */

    Utils.responsiveHideElement = function (parent, elements) {
        var elementsHeight = function() {
            /*
            /!\ the first element visible margin-top property won't be included in scrollheight.
            replace it by padding-topor margin-bottom.
            if you cant, prefer map-reducing current visible elements with their outerHeight
            */
            return elements[0].getParent().scrollHeight;
        };

        // reverse list to prepare context : reduce or increase
        elements = parent.clientHeight > elementsHeight() ? elements : elements.reverse();
        elements.forEach(function(item) {
            // context : crease as true means element need to be increased, false mean need to be decreased
            var crease = parent.clientHeight > elementsHeight();
            // recalculate disposable space to fit current item height
            var hasEnoughtSpace = parent.clientHeight - elementsHeight() > item.getDimensions().outerHeight;
            // adding content according of disposable space
            if (crease && hasEnoughtSpace) {
                item.show();
            // removing content according of prereversed list direction
            } else if (!crease) {
                item.hide();
            }
        });
    };

    if (window.App) {
        window.App.Utils = Utils;
    }

    return Utils;
});
