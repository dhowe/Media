/*
Copyright 2006-2016 Netvibes, a Dassault Systèmes company.
All rights reserved.
*/

/*
Class: ConfirmDialog
    Modal confirm dialog with ajax capabilities replacing native window.confirm().

Arguments:
    options - (object, optional) An object with options for the dialog. See below.

Options:
    titleText - (string) Dialog title text.
    message - (string) HTML message.
    className - (string)
    autoFadeDelay - (integer) Auto fade-out delay in milliseconds (default: 1500)

Events:
    onConfirm        - (function) Fired when the user has clicked the 'confirm' button.
    onConfirmRequest - (function) Fired when a 'confirm' ajax request need to be executed.
    onDiscard        - (function) Fired when the user has clicked the 'discard' button.
    onDiscardRequest - (function) Fired when a 'discard' ajax request need to be executed.
    onOpen           - (function) Fired after the dialog has opened.
    onClose          - (function) Fired after the dialog has closed.

Example:
    [javascript]
        var confirmDialog = new ConfirmDialog({
            message: 'Do you really want to do this?',
            events: {
                onConfirm: function () {
                }
            }
        }).show();
    [/javascript]
*/

/*global App, _ */

define('App/Components/UI/ConfirmDialog', [
    'UWA/Core',
    'UWA/Class',
    'UWA/Class/Events',
    'UWA/Class/Options',
    'App/Controls/SqueezeMask'
], function (UWA, Class, Events, Options, SqueezeMask) {
    'use strict';

    function forceFocus(element, delay, max) {
        delay = delay || 20;
        max = max || 100;
        var timer,
            i = 0,
            focus = function () {
                try {
                    element.focus();
                } catch (e) {
                    // Ignore
                }
                if (i++ > max) {
                    clearInterval(timer);
                }
            };

        timer = setInterval(focus, delay);

        focus();  // direct focus
        setTimeout(focus, 1);  // async focus

        element.addEvent('focus', function onFocus() {
            clearInterval(timer);
            element.removeEvent('focus', onFocus);
        });
    }

    var ConfirmDialog = Class.extend(Events, Options, {

        options: {
            titleText: ' ',
            message: '',
            confirm: {
                text: _("Yes"),
                requestText: '',
                successText: ''
            },
            discard: {
                text: _("No"),
                requestText: '',
                successText: ''
            },
            cancelText: _("Cancel"),
            className: 'modal confirmDialog',
            autoFadeDelay: 1500,
            width: 500
        },

        init: function (options) {
            this.setOptions(options);
        },

        show: function () {
            SqueezeMask.open(this.build(), { // empty() called on applyContent
                contentTitle : this.options.titleText,
                classWindow: this.options.className,
                closeWithOverlay: false,
                size: {
                    x: this.options.width, //Window.getSize().x * 0.6,
                    y: 'auto'
                },

                onOpen: function () {
                    this.dispatchEvent('onOpen');
                }.bind(this),

                onOpened: function () {
                    if (this.confirmButton) {
                        forceFocus(this.confirmButton);
                    }
                }.bind(this),

                onClose: this.dispatchEvent.bind(this, 'onClose') // ES5 bind
            });
            return this;
        },

        _onConfirm: function (e) {
            // this.ajax may be set in onConfirmRequest callback, used in App/Premium/Publish
            if (this.ajax && this.ajax.running) {
                return;
            }

            this.confirmButton.addClass('action');
            if (this.discardButton) {
                this.discardButton.addClass('disabled').set('disabled', 'disabled');
            }
            if (this.cancelButton) {
                this.cancelButton.addClass('disabled').set('disabled', 'disabled');
            }
            if (this.options.confirm.requestText !== '') {
                this.confirmButton.value = this.options.confirm.requestText;
                if (this.options.discard) {
                    this.options.discard.successText = ''; // empty
                }
                this.dispatchEvent('onConfirmRequest');
            } else {
                this.dispatchEvent('onConfirm');
                SqueezeMask.close();
            }
            e.stop();
        },

        _onDiscard: function (e) {
            this.discardButton.addClass('action');
            this.confirmButton.addClass('disabled').set('disabled', 'disabled');
            if (this.cancelButton) {
                this.cancelButton.addClass('disabled').set('disabled', 'disabled');
            }
            if (this.options.discard.requestText !== '') {
                this.discardButton.value = this.options.discard.requestText;
                if (this.options.confirm) {
                    this.options.confirm.successText = ''; // empty
                }

                if (this.ajax && this.ajax.running) {
                    this.ajax.cancel();
                    return;
                }

                this.dispatchEvent('onDiscardRequest');
            } else {
                this.dispatchEvent('onDiscard');
                SqueezeMask.close();
            }
            e.stop();
        },

        onDialogComplete: function () {
            var content = '', timeout;
            content += '<p style="margin-bottom: 1em;">' + (this.options.confirm.successText || this.options.discard.successText) + '</p>';
            this.body.setHTML(content);
            if (this.cancelButton) {
                forceFocus(this.cancelButton.addClass('nv-primary-button').set({
                    disabled: false,
                    value: _("Close")
                }));
            }
            if (this.confirmButton) {
                this.confirmButton.destroy();
            }
            if (this.discardButton) {
                this.discardButton.destroy();
            }

            if (this.options.autoFadeDelay) {

                timeout = setTimeout(function () {
                    SqueezeMask.close();
                }, this.options.autoFadeDelay);

                SqueezeMask.addEvent('close', function onClose() {
                    SqueezeMask.removeEvent('close', onClose);
                    clearTimeout(timeout);
                });

            }
        },

        build: function () {
            var message = this.options.message,
                frame = UWA.createElement('div', {'class': 'frame'}),
                footer;
            this.body = UWA.createElement('div', {'class': 'body'}).inject(frame);
            footer = UWA.createElement('div', {'class': 'footer'}).inject(frame);

            if (typeof message === 'string') {
                this.body.set('html', message);
            } else {
                this.body.addContent(message);
            }

            // Buttons
            if (this.options.confirm.text) {
                this.confirmButton = UWA.createElement('input', {
                    'type': 'button',
                    'class': 'nv-button nv-primary-button yes',
                    'value': this.options.confirm.text,
                    'events': {
                        'click': this._onConfirm.bind(this)
                    }
                }).inject(footer);
            }

            if (this.options.discard && this.options.discard.text) {
                this.discardButton = UWA.createElement('input', {
                    'type': 'button',
                    'class': 'nv-button no',
                    'value': this.options.discard.text,
                    'events': {
                        'click': this._onDiscard.bind(this)
                    }
                }).inject(footer);
            }

            if (this.options.cancelText) {
                this.cancelButton = UWA.createElement('input', {
                    'type': 'button',
                    'class': 'nv-button cancel',
                    'value': this.options.cancelText,
                    'events': {
                        'click': function () { SqueezeMask.close(); }
                    }
                }).inject(footer);
            }

            if (this.options.morebuttons && this.options.morebuttons.length > 0) {
                this.options.morebuttons.each(function (btn) {
                    UWA.createElement('input', {
                        'type': 'button',
                        'class': 'nv-button',
                        'value': btn.text,
                        'events': {
                            'click': btn.click || function () {document.location = btn.href; }
                        }
                    }).inject(footer);
                });
            }

            return frame;
        }
    });


    ///////////////////////////////////////////////////////////////////////////////

    ConfirmDialog.DeleteWidget = ConfirmDialog.extend({

        options: {
            confirm: {
                text: _("Delete"),
                requestText: _("Deleting..."),
                successText: _("The widget has been deleted.")
            },
            discard: false,
            width: 600
        },

        init: function (module, options) {
            this.addEvents({
                onOpen: module.focus.bind(module, true),
                onClose: module.focus.bind(module, false),
                onConfirmRequest: module.remove.bind(module, true, this.onDialogComplete.bind(this))
            });

            this._parent(UWA.merge(options || {}, {
                titleText: module.getTitle().sanitizeHTML() || _("untitled"),
                message: '<p>' + _("Are you sure you want to delete this widget?") + '</p>'
            }));
        }
    });

    ConfirmDialog.error = function (message, options) {
        options = UWA.merge({
            discard: false,
            confirm: false,
            cancelText: _("Ok")
        }, options);
        options.message = message;
        return new ConfirmDialog(options).show();
    };

    if (!App.UI) { App.UI = {}; }
    App.UI.ConfirmDialog = ConfirmDialog;
    return ConfirmDialog;
});
