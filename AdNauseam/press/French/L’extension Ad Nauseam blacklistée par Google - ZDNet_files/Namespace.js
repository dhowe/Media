/*
Copyright 2006-2016 Netvibes, a Dassault Systèmes company.
All rights reserved.
*/

define('App/3DD/Utils/Namespace', [
    'UWA/Core',
    'UWA/Class'
], function (
    Core,
    UWAClass
) {
    'use strict';

    var Namespace = UWAClass.extend({
        /**
         * Use of a setter is necessary to avoid ciruclar dependency in case of
         * "standard lazy loading".
         *
         * @throws {Error} If a bridge instance is alreayd set
         *
         * @param {Bridge} bridge
         */
        setBridge: function(bridge) {
            if (this._bridge) {
                throw new Error('Unable to set bridge, an instance is already known');
            }

            this._bridge = bridge;
        },

        /**
         * @return {Bridge}
         */
        getBridge: function() {
            return this._bridge;
        },

        /**
         * @return {Object}
         */
        getBootstrap: function() {
            if (!this._bootstrap) {
                this._bootstrap = {};
            }

            return this._bootstrap;
        },

        /**
         * @return {Object}
         */
        getDashboardData: function() {
            if (!this._dashboardData) {
                this._dashboardData = {};
            }

            return this._dashboardData;
        },

        /**
         * @return {Object}
         */
        getCachedEntities: function() {
            if (!this._cachedEntities) {
                this._cachedEntities = Object.create(null);
            }

            return this._cachedEntities;
        }
    });

    /**
     * Return a facotry used to initialize the Namespace class related to
     * the given x3dPlatformId.
     *
     * @param  {String} x3dPlatformId
     * @return {Namespace}
     */
    return function(x3dPlatformId) {
        // Ensure namespace if created in parent frame
        parent.nv = parent.nv || {};

        if (!parent.nv[x3dPlatformId]) {
            parent.nv[x3dPlatformId] = new Namespace();
        }

        return parent.nv[x3dPlatformId];
    };
});
