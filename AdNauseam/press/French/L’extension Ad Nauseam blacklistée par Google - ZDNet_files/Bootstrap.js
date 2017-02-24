/*
Copyright 2006-2016 Netvibes, a Dassault Systèmes company.
All rights reserved.
*/

/*globals define, widget, App*/


define('App/Plugins/Bootstrap', [
    'UWA/Core',
    'UWA/Data',
    'UWA/Utils',
    'UWA/Promise',
    'App/3DD/Utils/Namespace'
], function (UWACore, UWAData, UWAUtils, UWAPromise, Namespace) {
    "use strict";

    if (!window.App) window.App = {};

    var bootstrapData = {
        app: window.App,
        threeDDashboardContext: false,
        x3dPlatformId: null,
        failureCode: null //Filled if bootstrap process fails
    };

    var threeDDPublicApi = false;
    var CompassServices = false;
    var hasParent;
    try {
        // Check if the parent frame context is readable
        parent.foobar; // eslint-disable-line no-unused-expressions
        hasParent = true;
    } catch (e) {
        hasParent = false;
    }

    if (hasParent && parent.define && parent.define.amd && parent.define.amd.ds) {
        // prevent 3DS build script to consider this module as a dependency via static analysis
        var publicApiModule = 'DS/Dashboard/PublicAPI';
        var CompassServicesModule = 'DS/i3DXCompassServices/i3DXCompassServices';
        try {
            threeDDPublicApi = parent.require(publicApiModule);
            CompassServices = parent.require(CompassServicesModule);
        } catch (e) {
            /* not in 3DD */
        }
    }

    function load3DDashboardContext() {
        return new UWAPromise(function (resolve, reject) {
            if (!threeDDPublicApi || !CompassServices) return reject(new Error('Not in 3DD'));

            CompassServices.getPlatformServices({
                onComplete: function (data) {
                    var tenants = data.map(function(platform) {
                        return platform.platformId;
                    });

                    resolve({
                        dashboardId: threeDDPublicApi._getActiveDashboardContext().modelId,
                        owner: threeDDPublicApi._getActiveDashboardContext().owner,
                        tenants: tenants
                    });
                },
                onFailure: function () {
                    reject(new Error('Can\'t fetch tenants'));
                }
            });
        });
    }

    /**
     * Load and assign the 3D Dashboard Context
     * @return {Promise}
     */
    function retrieve3DDashboardContext() {
        return load3DDashboardContext()
        .then(function (context) {
            bootstrapData.threeDDashboardContext = context;
        })
        .fail(function () {
            bootstrapData.threeDDashboardContext = null;
        });
    }

    /**
     * Return the first available Tenant as the default one to use.
     *
     * 3D Dashboard Context should be retrieved first before using this method.
     *
     * @return {String} Tenant identifier
     */
    function getDefaultPlatformId() {
        if (bootstrapData.threeDDashboardContext) {
            return bootstrapData.threeDDashboardContext.tenants[0];
        }
    }

    /**
     * Request backend to get bootstrap data.
     *
     * @param {String} [x3dPlatformId]
     *
     * @return {Promise}
     */
    function requestBootstrap(x3dPlatformId) {
        return retrieve3DDashboardContext()
        .then(function() {
            var x3dDashboardCtx = bootstrapData.threeDDashboardContext;
            var hasDashboardChanged = false;
            var memoized;
            var bootstrap;

            // If platformId is not given and 3d context is available : use a default Tenant
            x3dPlatformId = x3dPlatformId || x3dDashboardCtx && getDefaultPlatformId();

            if (hasParent && x3dPlatformId) {
                bootstrap = Namespace(x3dPlatformId).getBootstrap();

                // Retrieve a potentially memoized bootstrap promise
                memoized = bootstrap.promise;

                hasDashboardChanged = bootstrap.dashboardId !== threeDDPublicApi._getActiveDashboardContext().modelId;
            }

            if (!memoized || hasDashboardChanged) {
                memoized = new UWAPromise(function (resolve, reject) {
                    var url = bootstrapData.app.Config.urls.startpage + '/api/dashboards/bootstrap';
                    var requestOptions = {
                        type: 'json',
                        method: 'POST',
                        timeout: false,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        onComplete: function (result) {
                            if (!UWACore.is(result) || !result.bootstrap) {
                                // If given, provide the error details
                                reject(result && result.error);
                            } else {
                                // Clear any possible previous failure code
                                bootstrapData.failureCode = null;

                                resolve(result.bootstrap);
                            }
                        },
                        onFailure: reject,
                        onTimeout: reject,
                        onCancel: reject
                    };

                    var urlParameters = {};


                    if (UWAData.proxies && UWAData.proxies.passport && x3dDashboardCtx) {
                        requestOptions.proxy = 'passport';
                        urlParameters.dashboardId = x3dDashboardCtx.dashboardId || '';
                        urlParameters.tenant = x3dPlatformId;
                    } else if (!UWAUtils.matchUrl(url, window.location)) {
                        requestOptions.proxy = 'ajax';
                    }

                    // bootsrap requires the pageId (if no dashboardId/tenant). Try to find one.
                    if (!urlParameters.pageId && window.screenshotTask) {
                        urlParameters.pageId = window.screenshotTask.module.pageId;
                    }

                    url += '?' + UWAUtils.toQueryString(urlParameters);
                    UWAData.request(url, requestOptions);
                });

                // Memoize the promise only if a platformId is given
                if (hasParent && x3dPlatformId) {
                    bootstrap.dashboardId = threeDDPublicApi._getActiveDashboardContext().modelId;
                    bootstrap.promise = memoized;
                }
            }

            return memoized;
        });
    }

    /**
     * Automatically called when module is required as a plugin
     * (by using the ! suffix)
     *
     * @param  {String}   resourceName
     * @param  {Function} req
     * @param  {Function} callback
     */
    function load() {
        var hasStartPageUrl = bootstrapData.app.Config && bootstrapData.app.Config.urls &&
            bootstrapData.app.Config.urls.startpage;
        var hasWidget = (window.widget && window.widget.preferences) || window.widgetReadyCallbacks;

        function onProcessFailure(err) {
            if (err) {
                var failureCode;

                if (err.name && err.name === 'SyntaxError') {
                    // Resposne parsing gone wrong >.<
                    failureCode = 1337;
                } else if (err.code) {
                    // Kepp the code provided by the backend
                    failureCode = err.code;
                } else {
                    // Error is unknown
                    failureCode = 1;
                }

                // Prefix failureCode with 'bootstrap_' (@see App/Api/Util)
                bootstrapData.failureCode = 'bootstrap_' + failureCode;

            }

            if (window.console) {
                window.console.error("Bootstrap loading error:", err);
            }
        }

        var promise;

        if (!hasStartPageUrl) {

            if (window.Drupal || document.body && document.body.hasAttribute("data-page")) {
                // If we don't have a startpage url, consider we are on a startpage domain and try to
                // fetch the bootstrap anyway. This is usefull for the Drupal home page.

                if (!bootstrapData.app.Config) bootstrapData.app.Config = {};
                if (!bootstrapData.app.Config.urls) bootstrapData.app.Config.urls = {};
                bootstrapData.app.Config.urls.startpage = window.location.protocol + "//" + window.location.hostname;

                promise = requestBootstrap()
                .then(function (data) {
                    Object.assign(bootstrapData.app, data.App);
                });
            } else {
                promise = UWAPromise.resolve();
            }


        } else if (threeDDPublicApi && hasWidget) {
            // On 3DD, inside a widget frame

            promise = new UWAPromise(function (resolve, reject) {

                if (widget.getValue('appId') === 'NETFEOP_AP') {
                    // Mandatory even for On Premise widgets
                    // Note: x3dPlatformId is not always filled in an OP env, wz
                    // must fallback to a default dummy value
                    bootstrapData.x3dPlatformId = widget.getValue('x3dPlatformId') || 'ON_PREMISE';

                    return reject();
                }

                if (!parent.App) {
                    // adding global var "App" (like NV) to the parent
                    // Don't use Object.assign here because IE11 does not support it and polyfill
                    // may not yet be loaded.
                    parent.App = {};
                    for (var name in App) parent.App[name] = App[name];
                }

                // Widget frame code
                // Implying Bootstrap is loaded as a plugin as a dependency of Parent
                parent.require([
                    'App/3DD/Widget/Parent',
                    'App/Plugins/Bootstrap'
                ], function(Parent, Bootstrap) {
                    retrieve3DDashboardContext() // eslint-disable-line nv/promise-terminal-method
                    .then(function() {
                        // This is required to ensure preferences are set before retrieving
                        // values from the widget (see #23207 and #23303).
                        return new UWAPromise(function (resolve) {
                            widget.addEventOnce('onLoad', resolve);
                        });
                    })
                    .then(function() {
                        // Fallback for eventual non tenantAware widget
                        if (!widget.getValue('x3dPlatformId')) {
                            // Assign the default platformId
                            widget.setValue('x3dPlatformId', getDefaultPlatformId());
                        }

                        // Set the x3dPlatformId related to current bootstrap Data
                        // (Done only in widget frame code as we cannot rely on
                        // it in Parent window code)
                        bootstrapData.x3dPlatformId = widget.getValue('x3dPlatformId');

                        // Invoke the requestBootstrap through the "parent
                        // required" component to avoid loosing promise result
                        return Bootstrap.requestBootstrap(bootstrapData.x3dPlatformId);
                    })
                    .then(function(data) {
                        // Assign retrieved App data to current bootstrapData
                        Object.assign(bootstrapData.app, data.App);

                        return Parent.init(widget);
                    })
                    .then(resolve, reject);
                });
            });

        } else if (threeDDPublicApi) {
            // On 3DD, in the parent window

            promise = requestBootstrap()
            .then(function (data) {
                // Do not modify original hash, as it may be served by
                // using exposed requestBootstrap() method.
                var dupData = UWACore.clone(data);

                // Avoid assigning any data related to NPD / Page since
                // bootstrap in Parent component should not rely on them.
                // (platformId/Tenant/Npd-agnostic)
                delete dupData.App.NPD;
                delete dupData.App.Page;
                delete dupData.App.Permission;
                Object.assign(bootstrapData.app, dupData.App);
            });

        } else if (hasWidget) {
            // Standalone Netvibes widget (ex: screenshot)

            promise = requestBootstrap()
            .then(function (data) {
                Object.assign(bootstrapData.app, data.App);
            });

        } else {
            // No need to load the bootstrap in other cases

            promise = UWAPromise.resolve();
        }

        return promise.fail(onProcessFailure);
    }

    return {
        load: function (resourceName, req, callback) {
            load().done().fin(function () { callback(bootstrapData); });
        },
        retrieve3DDashboardContext: retrieve3DDashboardContext,
        requestBootstrap: requestBootstrap
    };
});
