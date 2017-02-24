/*
Copyright 2006-2016 Netvibes, a Dassault Systèmes company.
All rights reserved.
*/

/* global _ */

define('App/ModuleUtils/Runner', [
    'UWA/Core',
    'App/ModuleUtils/Deducer',
    'App/Context',
    'App/Api/Util'
], function (Core, Deducer, Context, ApiUtil) {
    'use strict';

    function displayError(widget) {
         widget.body.empty();
            widget.body.grab(
                Core.createElement('div', {
                    'class' : 'uwa-message uwa-icon error'
                }).setContent(
                    _("Failed to load the application:")
                    + " "
                    + ApiUtil.getErrorMessage(Context.getFailureCode())
                )
            );
    }

    function run(widget, options) {
        var name = Deducer.getName(widget.getUrl());

        // Display error message in case of failure code in 3dd except if :
        // - Module is displayed in preview (aka "Transien") and error is related to ownership failure
        var isAllowedError = Context.isIn3DDPreview() && Context.getFailureCode() === 'bootstrap_8001';
        if (Context.isIn3DDashboard() && Context.getFailureCode() && !isAllowedError) {
            displayError(widget);
            return; //Abort the run process
        }

        // Widget aliases
        switch (name) {
            case 'SmartFilter':
                name = 'RssReader';
                break;
            case 'YahooMail':
            case 'NumericableMail':
            case 'AolMail':
            case 'MacMail':
            case 'Hotmail':
                name = 'PopMail';
                break;
        }

        require(['App/Modules/' + name + '/Main'], function (widgetModule) {
            widgetModule.run(widget, options);
        });
    }

    return {
        run: run
    };
});
